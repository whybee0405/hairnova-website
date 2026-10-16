import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

import { connectWithCode, syncTikTok } from '@/lib/tiktok'

import { ADMIN_GLOBAL_PATH, STATE_COOKIE, adminUser } from '../auth'

/** TikTok redirects here after the account owner approves (or declines) access. */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const jar = await cookies()
  const expected = jar.get(STATE_COOKIE)?.value
  jar.delete({ name: STATE_COOKIE, path: '/connect/tiktok' })

  const back = (result: string) => redirect(`${ADMIN_GLOBAL_PATH}?tiktok=${encodeURIComponent(result)}`)

  if (!(await adminUser())) redirect('/admin/login')
  if (params.get('error')) back(params.get('error_description') || params.get('error') || 'declined')
  if (!expected || params.get('state') !== expected) back('the login session expired, please try again')
  const code = params.get('code')
  if (!code) back('TikTok did not return an authorisation code')

  let result = 'connected'
  try {
    await connectWithCode(code!)
    // Pull the first batch now so the admin panel and homepage are populated straight away.
    await syncTikTok().catch(() => {})
  } catch (error) {
    result = error instanceof Error ? error.message : 'unknown error'
  }
  back(result)
}
