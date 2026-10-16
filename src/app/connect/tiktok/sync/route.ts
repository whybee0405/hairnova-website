import { syncTikTok } from '@/lib/tiktok'

import { adminUser, json, sameOrigin } from '../auth'

export async function POST() {
  if (!(await sameOrigin()) || !(await adminUser())) return json({ error: 'Not allowed' }, 403)
  try {
    return json({ videos: await syncTikTok() })
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Sync failed' }, 502)
  }
}
