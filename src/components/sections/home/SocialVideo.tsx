'use client'

import { Play } from '@phosphor-icons/react'
import { useState } from 'react'

import type { SocialPost } from '@/lib/socialFeed'

/**
 * Click-to-load facade: renders a cover until the visitor taps play, then swaps
 * in the platform player. Keeps third-party scripts and iframes off the
 * critical path entirely.
 */
export function SocialVideo({ post, label }: { post: SocialPost; label: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="social-card is-playing">
        <iframe
          src={post.embedUrl}
          title={label}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button type="button" className="social-card" onClick={() => setPlaying(true)} aria-label={`Play: ${label}`}>
      {post.cover ? (
        // Remote, signed TikTok CDN covers: a plain lazy img avoids proxying them through next/image.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover} alt="" loading="lazy" decoding="async" />
      ) : (
        <span className="social-card-fallback" aria-hidden="true">nova</span>
      )}
      <span className="social-card-play" aria-hidden="true"><Play size={22} weight="fill" /></span>
      {post.caption && <span className="social-card-caption">{post.caption}</span>}
    </button>
  )
}
