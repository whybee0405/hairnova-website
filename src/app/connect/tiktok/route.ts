import { randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { authorizeUrl, tiktokConfig } from '@/lib/tiktok'

import { ADMIN_GLOBAL_PATH, STATE_COOKIE, adminUser } from './auth'

/** Starts the TikTok login. Admins only; a random state guards the callback against forgery. */
export async function GET() {
  if (!(await adminUser())) redirect(`/admin/login?redirect=${encodeURIComponent(ADMIN_GLOBAL_PATH)}`)
  if (!tiktokConfig().configured) redirect(`${ADMIN_GLOBAL_PATH}?tiktok=app-keys-missing`)

  const state = randomBytes(24).toString('hex')
  const { redirectUri } = tiktokConfig()
  ;(await cookies()).set(STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: redirectUri.startsWith('https://'),
    maxAge: 600,
    path: '/connect/tiktok',
  })
  redirect(authorizeUrl(state))
}
