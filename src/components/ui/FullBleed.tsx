import React from 'react'

/**
 * Breaks a section out of the max-width container to the full viewport width.
 * Use for immersive imagery moments, not for text-heavy content.
 */
export function FullBleed({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative left-1/2 w-screen -translate-x-1/2 ${className}`}>{children}</div>
}
