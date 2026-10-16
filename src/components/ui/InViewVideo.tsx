'use client'

import { useEffect, useRef } from 'react'

/**
 * Muted ambient loop that downloads nothing (not even its poster) until it
 * nears the viewport, plays only while visible, and stays on its poster for
 * reduced-motion visitors.
 */
export function InViewVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (poster && !video.poster) video.poster = poster
          if (reduce) return
          if (!video.src) video.src = src
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [src, poster])

  return <video ref={ref} className={className} muted loop playsInline preload="none" aria-hidden="true" />
}
