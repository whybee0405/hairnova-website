'use client'

import React, { useEffect, useRef } from 'react'

/**
 * Pins a section and slides its `.hs-track` sideways as the page scrolls down,
 * so the last item reaches the edge exactly as the pin releases. Plain scroll
 * events + transforms, so it works in every browser (CSS scroll timelines do
 * not run in Firefox). Below 900px or with reduced motion it stays a normal
 * swipeable row.
 */
export function HorizontalScroll({ children, className = '', ...rest }: React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = ref.current
    const viewport = section?.querySelector<HTMLElement>('.hs-viewport')
    const track = section?.querySelector<HTMLElement>('.hs-track')
    if (!section || !viewport || !track) return

    const enabled = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    let distance = 0
    let frame = 0

    const update = () => {
      frame = 0
      const top = section.getBoundingClientRect().top
      const travel = section.offsetHeight - window.innerHeight
      const progress = travel > 0 ? Math.min(1, Math.max(0, -top / travel)) : 0
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }

    const measure = () => {
      if (!enabled.matches) {
        section.classList.remove('is-pinned')
        section.style.height = ''
        track.style.transform = ''
        return
      }
      section.classList.add('is-pinned')
      const styles = getComputedStyle(viewport)
      const visible = viewport.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight)
      distance = Math.max(0, track.scrollWidth - visible)
      // One pixel of vertical scroll moves the strip one pixel sideways.
      section.style.height = `${window.innerHeight + distance}px`
      schedule()
    }

    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(track)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', schedule, { passive: true })
    enabled.addEventListener('change', measure)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', schedule)
      enabled.removeEventListener('change', measure)
    }
  }, [])

  return (
    <section ref={ref} className={className} {...rest}>
      {children}
    </section>
  )
}
