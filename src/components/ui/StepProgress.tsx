'use client'

import React, { useEffect, useRef } from 'react'

/**
 * Drives a "how it works" progress line from scroll position: sets --progress
 * (0 to 1) on the wrapper and marks each `.step-item` reached with data-on.
 * Scroll events only, so it behaves the same in every browser. With reduced
 * motion everything is shown complete.
 */
export function StepProgress({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const steps = Array.from(root.querySelectorAll<HTMLElement>('.step-item'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    const update = () => {
      frame = 0
      let progress = 1
      if (!reduce) {
        const rect = root.getBoundingClientRect()
        const vh = window.innerHeight
        // Starts as the steps enter the lower part of the screen, completes around mid-screen.
        const start = vh * 0.85
        const end = vh * 0.45 - rect.height * 0.35
        progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)))
      }
      root.style.setProperty('--progress', progress.toFixed(3))
      const last = Math.max(1, steps.length - 1)
      steps.forEach((step, i) => step.toggleAttribute('data-on', progress >= i / last - 0.02))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return <div ref={ref} className={className} style={style}>{children}</div>
}
