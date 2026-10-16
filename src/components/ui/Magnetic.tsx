'use client'

import React, { useRef } from 'react'

/**
 * Pulls its child gently toward the cursor on hover and eases back on leave.
 * Writes a transform straight to the element (no state, no re-renders); the
 * return is a CSS transition. Use on one or two high-intent CTAs per page.
 */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const { clientX, clientY } = e
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      el.style.transition = 'transform .15s ease-out'
      el.style.transform = `translate(${(clientX - rect.left - rect.width / 2) * strength}px, ${(clientY - rect.top - rect.height / 2) * strength}px)`
    })
  }

  function handleLeave() {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.transition = 'transform .6s cubic-bezier(.16, 1, .3, 1)'
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <div ref={ref} className="inline-block" onPointerMove={handleMove} onPointerLeave={handleLeave}>
      {children}
    </div>
  )
}
