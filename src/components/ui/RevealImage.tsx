import React from 'react'

/**
 * Photography reveal. `mount` plays a CSS entrance on first paint (image stays
 * painted, only its frame and scale settle); `scroll` wipes the frame open as it
 * enters the viewport via <ScrollReveal />.
 */
export function RevealImage({ children, className = '', delay = 0, trigger = 'scroll' }: {
  children: React.ReactNode
  className?: string
  direction?: 'bottom' | 'left' | 'right'
  delay?: number
  trigger?: 'mount' | 'scroll'
}) {
  const style = delay ? ({ '--reveal-delay': `${delay}s` } as React.CSSProperties) : undefined
  if (trigger === 'mount') return <div className={`load-settle ${className}`} style={style}>{children}</div>
  return <div className={className} data-reveal="mask" style={style}>{children}</div>
}
