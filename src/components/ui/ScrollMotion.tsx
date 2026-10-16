'use client'

import { useEffect } from 'react'

/**
 * Scroll-linked depth for every browser. Elements opt in with:
 *   data-motion="page"  --p goes 0 to 1 over the first screen of scrolling
 *   data-motion="view"  --p goes 0 to 1 while the element crosses the viewport
 *                       (0 = its top meets the viewport bottom, 1 = its bottom
 *                       leaves the top); data-motion-range="a b" remaps a..b to 0..1
 * CSS reads var(--p) in transforms / clip-paths. Only custom properties are
 * written, so layout never thrashes; one rAF per scroll frame.
 */
export function ScrollMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let elements: HTMLElement[] = []
    let frame = 0

    const collect = () => { elements = Array.from(document.querySelectorAll<HTMLElement>('[data-motion]')) }

    const update = () => {
      frame = 0
      const vh = window.innerHeight
      for (const el of elements) {
        let p: number
        if (el.dataset.motion === 'page') {
          p = window.scrollY / vh
        } else {
          const rect = el.getBoundingClientRect()
          if (rect.bottom < -vh || rect.top > vh * 2) continue // far off screen, skip the write
          p = (vh - rect.top) / (vh + rect.height)
          const [a, b] = (el.dataset.motionRange ?? '0 1').split(' ').map(Number)
          p = (p - a) / (b - a)
        }
        el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4))
      }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }

    collect()
    update()
    // Client-side navigation swaps page content; pick up new elements as they mount.
    const mutations = new MutationObserver(() => { collect(); schedule() })
    mutations.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      mutations.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return null
}
