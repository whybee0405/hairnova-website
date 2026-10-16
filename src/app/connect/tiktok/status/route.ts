import { connectionStatus } from '@/lib/tiktok'

import { adminUser, json } from '../auth'

export async function GET() {
  if (!(await adminUser())) return json({ error: 'Not signed in' }, 401)
  return json(await connectionStatus())
}
