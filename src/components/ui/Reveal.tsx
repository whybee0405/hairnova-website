import React from 'react'

/*
  Scroll reveals are declarative: these wrappers only set [data-reveal], and
  <ScrollReveal /> (mounted once in the layout) plus campaign.css do the rest.
  They render on the server and ship no animation JS.
*/

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li'
  variant?: 'up' | 'mask' | 'fade'
}

export function Reveal({ children, className, delay = 0, as: Tag = 'div', variant = 'up' }: RevealProps) {
  return (
    <Tag
      className={className}
      data-reveal={variant}
      style={delay ? ({ '--reveal-delay': `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}

export function RevealStagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} data-reveal="stagger">
      {children}
    </div>
  )
}

export function RevealStaggerItem({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={className} style={style}>{children}</div>
}
