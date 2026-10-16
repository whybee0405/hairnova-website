import React from 'react'

/**
 * Continuous horizontal marquee, CSS-animation driven (no JS, no React state).
 * Use at most once per page, see taste guidelines.
 */
export function Marquee({ items, className = '' }: { items: string[]; className?: string }) {
  const track = [...items, ...items]

  return (
    <div className={`relative flex overflow-hidden ${className}`} aria-hidden="true">
      <div className="animate-marquee flex w-max shrink-0 items-center gap-10 pr-10">
        {track.map((item, i) => (
          <span key={i} className="shrink-0 whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
