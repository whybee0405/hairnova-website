'use client'

import { Button } from '@payloadcms/ui'
import { useCallback, useEffect, useState } from 'react'

type Status = {
  configured: boolean
  connected: boolean
  displayName: string | null
  redirectUri: string
  videoCount: number
}

/** Connect / sync / disconnect controls shown at the top of the TikTok Connection global. */
export function TikTokConnectPanel() {
  const [status, setStatus] = useState<Status | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const load = useCallback(async () => {
    const res = await fetch('/connect/tiktok/status', { cache: 'no-store' })
    setStatus(res.ok ? await res.json() : null)
  }, [])

  useEffect(() => {
    load()
    const result = new URLSearchParams(window.location.search).get('tiktok')
    if (result === 'connected') setMessage('TikTok account connected. The homepage now shows its latest videos.')
    else if (result) setMessage(`Connection did not complete: ${result}`)
  }, [load])

  async function act(path: string, done: string) {
    setBusy(true)
    setMessage(null)
    const res = await fetch(path, { method: 'POST' })
    const body = await res.json().catch(() => ({}))
    setMessage(res.ok ? done : body.error || 'Something went wrong.')
    setBusy(false)
    await load()
    if (res.ok) window.location.reload()
  }

  const box: React.CSSProperties = {
    border: '1px solid var(--theme-elevation-150)',
    borderRadius: 'var(--style-radius-m)',
    padding: '20px 24px',
    marginBottom: 'var(--base)',
    background: 'var(--theme-elevation-50)',
  }

  if (!status) return <div style={box}>Checking TikTok connection…</div>

  return (
    <div style={box}>
      {!status.configured ? (
        <>
          <strong>TikTok app keys are not set.</strong>
          <p style={{ margin: '8px 0 0' }}>
            Add <code>TIKTOK_CLIENT_KEY</code> and <code>TIKTOK_CLIENT_SECRET</code> to the server environment, and register
            this redirect URI on the TikTok developer app: <code>{status.redirectUri}</code>
          </p>
        </>
      ) : status.connected ? (
        <>
          <strong>Connected{status.displayName ? ` as ${status.displayName}` : ''}.</strong>
          <p style={{ margin: '8px 0 16px' }}>
            The homepage shows the latest videos from this account ({status.videoCount} cached), refreshed every 15 minutes.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button buttonStyle="primary" disabled={busy} onClick={() => act('/connect/tiktok/sync', 'Synced with TikTok.')}>Sync now</Button>
            <Button buttonStyle="secondary" disabled={busy} onClick={() => act('/connect/tiktok/disconnect', 'TikTok account disconnected.')}>Disconnect</Button>
          </div>
        </>
      ) : (
        <>
          <strong>No TikTok account connected.</strong>
          <p style={{ margin: '8px 0 16px' }}>
            Sign in with the Hair Nova TikTok account to show its latest videos on the homepage. Until then, the curated links
            in Home Page → TikTok are shown.
          </p>
          <Button el="anchor" url="/connect/tiktok" buttonStyle="primary">Connect TikTok account</Button>
        </>
      )}
      {message && <p style={{ margin: '14px 0 0', fontWeight: 600 }}>{message}</p>}
    </div>
  )
}
