import { headers } from 'next/headers'

import { getPayloadClient } from '@/lib/payload'

export const ADMIN_GLOBAL_PATH = '/admin/globals/tiktok-connection'
export const STATE_COOKIE = 'hn_tiktok_state'

/** The signed-in Payload admin for this request, or null. */
export async function adminUser() {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  return user ?? null
}

/** Rejects cross-site POSTs to the admin actions. */
export async function sameOrigin() {
  const h = await headers()
  const origin = h.get('origin')
  if (!origin) return true
  try {
    return new URL(origin).host === h.get('host')
  } catch {
    return false
  }
}

export function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}
