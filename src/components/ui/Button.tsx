import Link from 'next/link'
import React from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'outlineOnDark' | 'ghostOnDark'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] px-6 py-3 text-[15px] font-semibold leading-none transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'

const variants: Record<Variant, string> = {
  primary:
    'bg-cyan-500 text-charcoal-900 border border-steel-700 hover:bg-cyan-300 hover:-translate-y-0.5',
  secondary: 'bg-steel-600 text-white hover:bg-steel-700 hover:-translate-y-0.5',
  outline: 'bg-transparent text-charcoal-900 border border-charcoal-900/25 hover:border-steel-600 hover:text-steel-700',
  outlineOnDark: 'bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10',
  ghostOnDark: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
}

type ButtonProps = {
  children: React.ReactNode
  variant?: Variant
  href?: string
  className?: string
} & (
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>)
  | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>)
)

export function Button({ children, variant = 'primary', href, className = '', ...props }: ButtonProps) {
  const classes = `btn ${variant === 'primary' ? 'btn-primary ' : ''}${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
