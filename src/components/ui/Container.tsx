import React from 'react'

export function Container({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  return <Tag className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</Tag>
}
