import { getPayloadClient } from '@/lib/payload'
import type { SocialPost } from '@/lib/socialFeed'

/*
  TikTok Display API (Login Kit + video.list), server side only.

  Flow: an admin visits /connect/tiktok, approves on TikTok, and the callback
  stores the tokens in the admin-only `tiktok-connection` global. Access tokens
  last ~24h and are refreshed here on demand; refresh tokens last ~365 days,
  after which the account owner has to connect again.

  The endpoint bases are overridable so the flow can be exercised against a
  local mock; production never needs to set them.
*/

const AUTH_BASE = process.env.TIKTOK_AUTH_BASE || 'https://www.tiktok.com'
const API_BASE = process.env.TIKTOK_API_BASE || 'https://open.tiktokapis.com'
const SCOPES = ['user.info.basic', 'video.list']
const VIDEO_FIELDS = ['id', 'title', 'video_description', 'cover_image_url', 'share_url', 'create_time']
const FEED_TTL_MS = 15 * 60 * 1000
const REFRESH_MARGIN_MS = 5 * 60 * 1000

export const TIKTOK_CONNECTION_SLUG = 'tiktok-connection'

export function tiktokConfig() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET
  const site = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
  return {
    configured: Boolean(clientKey && clientSecret),
    clientKey: clientKey ?? '',
    clientSecret: clientSecret ?? '',
    redirectUri: `${site}/connect/tiktok/callback`,
  }
}

export function authorizeUrl(state: string) {
  const { clientKey, redirectUri } = tiktokConfig()
  const params = new URLSearchParams({
    client_key: clientKey,
    response_type: 'code',
    scope: SCOPES.join(','),
    redirect_uri: redirectUri,
    state,
  })
  return `${AUTH_BASE}/v2/auth/authorize/?${params}`
}

type TokenResponse = {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_expires_in: number
  open_id: string
  scope: string
}

async function tokenRequest(body: Record<string, string>): Promise<TokenResponse> {
  const { clientKey, clientSecret } = tiktokConfig()
  const res = await fetch(`${API_BASE}/v2/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache' },
    body: new URLSearchParams({ client_key: clientKey, client_secret: clientSecret, ...body }),
    cache: 'no-store',
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.error || !data.access_token) {
    throw new Error(`TikTok token request failed: ${data.error_description || data.error || res.status}`)
  }
  return data as TokenResponse
}

function tokenFields(t: TokenResponse) {
  const now = Date.now()
  return {
    openId: t.open_id,
    scope: t.scope,
    accessToken: t.access_token,
    accessTokenExpiresAt: new Date(now + t.expires_in * 1000).toISOString(),
    refreshToken: t.refresh_token,
    refreshTokenExpiresAt: new Date(now + t.refresh_expires_in * 1000).toISOString(),
  }
}

async function readConnection() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: TIKTOK_CONNECTION_SLUG, showHiddenFields: true, overrideAccess: true })
}

async function writeConnection(data: Record<string, unknown>) {
  const payload = await getPayloadClient()
  await payload.updateGlobal({ slug: TIKTOK_CONNECTION_SLUG, data, overrideAccess: true })
  cache.set(null)
}

/** Called by the OAuth callback with the one-time code TikTok hands back. */
export async function connectWithCode(code: string) {
  const { redirectUri } = tiktokConfig()
  const tokens = await tokenRequest({ code, grant_type: 'authorization_code', redirect_uri: redirectUri })
  let displayName: string | null = null
  try {
    const res = await fetch(`${API_BASE}/v2/user/info/?fields=open_id,display_name`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
      cache: 'no-store',
    })
    displayName = (await res.json())?.data?.user?.display_name ?? null
  } catch {
    // Display name is cosmetic; the connection still works without it.
  }
  await writeConnection({ ...tokenFields(tokens), displayName, connectedAt: new Date().toISOString(), lastError: null })
}

export async function disconnect() {
  const connection = await readConnection()
  const { clientKey, clientSecret, configured } = tiktokConfig()
  if (configured && connection.accessToken) {
    await fetch(`${API_BASE}/v2/oauth/revoke/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_key: clientKey, client_secret: clientSecret, token: connection.accessToken }),
      cache: 'no-store',
    }).catch(() => {})
  }
  await writeConnection({
    openId: null, displayName: null, scope: null, accessToken: null, accessTokenExpiresAt: null,
    refreshToken: null, refreshTokenExpiresAt: null, connectedAt: null, cachedVideos: null, lastError: null,
  })
}

/** Returns a usable access token, refreshing it first if it is about to expire. */
async function validAccessToken(): Promise<string | null> {
  const c = await readConnection()
  if (!c.refreshToken) return null
  const expiresAt = c.accessTokenExpiresAt ? Date.parse(c.accessTokenExpiresAt) : 0
  if (c.accessToken && expiresAt - REFRESH_MARGIN_MS > Date.now()) return c.accessToken
  if (c.refreshTokenExpiresAt && Date.parse(c.refreshTokenExpiresAt) < Date.now()) {
    await writeConnection({ lastError: 'TikTok access has expired. Connect the account again.' })
    return null
  }
  const tokens = await tokenRequest({ grant_type: 'refresh_token', refresh_token: c.refreshToken })
  await writeConnection(tokenFields(tokens))
  return tokens.access_token
}

type TikTokVideo = {
  id: string
  title?: string
  video_description?: string
  cover_image_url?: string
  share_url?: string
  create_time?: number
}

function toPost(v: TikTokVideo): SocialPost {
  const caption = (v.title || v.video_description || '').trim()
  return {
    id: v.id,
    platform: 'tiktok',
    permalink: v.share_url || `https://www.tiktok.com/video/${v.id}`,
    embedUrl: `https://www.tiktok.com/player/v1/${v.id}?autoplay=1&rel=0&music_info=0&description=0`,
    cover: v.cover_image_url ?? null,
    caption: caption || null,
  }
}

// Kept on globalThis: Next bundles each route separately, so a module-level
// variable would give the homepage and the admin routes different caches and
// a disconnect or sync would not clear what the homepage serves.
type FeedCache = { at: number; posts: SocialPost[] } | null
const store = globalThis as typeof globalThis & { __hairnovaTikTokFeed?: FeedCache }
const cache = {
  get: () => store.__hairnovaTikTokFeed ?? null,
  set: (value: FeedCache) => { store.__hairnovaTikTokFeed = value },
}

/**
 * Latest videos from the connected account, or null when no account is
 * connected (callers then fall back to the curated list). Cached in memory for
 * 15 minutes; on an API failure the last good result stored in the global is
 * served instead, so a TikTok outage never empties the section.
 */
export async function getTikTokPosts(limit = 8): Promise<SocialPost[] | null> {
  if (!tiktokConfig().configured) return null
  const cached = cache.get()
  if (cached && Date.now() - cached.at < FEED_TTL_MS) return cached.posts.slice(0, limit)

  let connection
  try {
    connection = await readConnection()
  } catch {
    return null
  }
  if (!connection.refreshToken) return null

  try {
    const token = await validAccessToken()
    if (!token) throw new Error('No valid TikTok token')
    const res = await fetch(`${API_BASE}/v2/video/list/?fields=${VIDEO_FIELDS.join(',')}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ max_count: 20 }),
      cache: 'no-store',
      signal: AbortSignal.timeout(6000),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok || (body.error?.code && body.error.code !== 'ok')) {
      throw new Error(`TikTok video list failed: ${body.error?.message || body.error?.code || res.status}`)
    }
    const posts = ((body.data?.videos ?? []) as TikTokVideo[]).map(toPost)
    await writeConnection({ cachedVideos: posts, lastSyncAt: new Date().toISOString(), lastError: null })
    cache.set({ at: Date.now(), posts })
    return posts.slice(0, limit)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    await writeConnection({ lastError: message }).catch(() => {})
    const stale = Array.isArray(connection.cachedVideos) ? (connection.cachedVideos as SocialPost[]) : []
    // Back off for a minute so a failing API is not hit on every page view.
    cache.set({ at: Date.now() - FEED_TTL_MS + 60_000, posts: stale })
    return stale.length ? stale.slice(0, limit) : null
  }
}

/** Clears the cache and fetches straight away (admin "Sync now"). */
export async function syncTikTok() {
  cache.set(null)
  const posts = await getTikTokPosts(20)
  const c = await readConnection()
  if (c.lastError) throw new Error(c.lastError)
  return posts?.length ?? 0
}

/** Safe-to-expose summary for the admin panel; never includes tokens. */
export async function connectionStatus() {
  const { configured, redirectUri } = tiktokConfig()
  const c = await readConnection()
  return {
    configured,
    connected: Boolean(c.refreshToken),
    displayName: c.displayName ?? null,
    redirectUri,
    videoCount: Array.isArray(c.cachedVideos) ? c.cachedVideos.length : 0,
  }
}
