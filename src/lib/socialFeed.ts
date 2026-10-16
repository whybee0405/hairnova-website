import type { HomePage } from '@/payload-types'
import { mediaUrl } from '@/lib/media'

/**
 * Normalised social post. Every source (CMS-pasted links today, platform APIs
 * later) resolves to this shape, so the UI never knows where a post came from.
 */
export type SocialPost = {
  id: string
  platform: 'tiktok' | 'instagram'
  permalink: string
  /** Player URL loaded only after the visitor taps play. */
  embedUrl: string
  cover: string | null
  caption: string | null
}

type TikTokOEmbed = { title?: string; thumbnail_url?: string }

const TIKTOK_ID = /tiktok\.com\/.*\/video\/(\d+)/

/** Public oEmbed lookup, cached for an hour (TikTok cover URLs are signed and expire). */
async function tiktokOEmbed(url: string): Promise<TikTokOEmbed | null> {
  try {
    const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, {
      cache: 'force-cache',
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return null
    return (await res.json()) as TikTokOEmbed
  } catch {
    return null
  }
}

/** Source: TikTok links curated in the Home Page global. */
export async function getCuratedTikToks(videos: HomePage['tiktokVideos']): Promise<SocialPost[]> {
  const posts = await Promise.all(
    (videos ?? []).map(async (video): Promise<SocialPost | null> => {
      const id = video.url.match(TIKTOK_ID)?.[1]
      if (!id) return null
      const meta = await tiktokOEmbed(video.url)
      return {
        id,
        platform: 'tiktok',
        permalink: video.url,
        embedUrl: `https://www.tiktok.com/player/v1/${id}?autoplay=1&rel=0&music_info=0&description=0`,
        cover: meta?.thumbnail_url ?? mediaUrl(video.cover, 'card') ?? null,
        caption: video.caption || meta?.title || null,
      }
    }),
  )
  return posts.filter((post): post is SocialPost => post !== null)
}
