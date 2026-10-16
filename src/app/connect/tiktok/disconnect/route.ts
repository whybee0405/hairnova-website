import { disconnect } from '@/lib/tiktok'

import { adminUser, json, sameOrigin } from '../auth'

export async function POST() {
  if (!(await sameOrigin()) || !(await adminUser())) return json({ error: 'Not allowed' }, 403)
  await disconnect()
  return json({ ok: true })
}
