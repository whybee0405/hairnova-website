'use client'

import type { SiteSetting } from '@/payload-types'
import { List, X } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

import { Logo } from './Logo'

export function Header({ settings }: { settings: SiteSetting }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  // A passive listener that only re-renders when the 8px threshold is crossed.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
    }
    if (open) document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  const navItems = settings?.navItems ?? []

  return (
    <header
      className={`site-header sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? 'bg-cream-50/90 shadow-[0_1px_0_0_rgba(40,34,31,0.08)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <Container className="flex h-[76px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.id ?? item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={`text-[14.5px] font-medium transition-colors hover:text-steel-700 ${
                pathname === item.href ? 'text-steel-700' : 'text-charcoal-900/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={settings?.navCtaHref || '/wholesale'} variant="primary" className="text-[14px] px-5 py-2.5">
            {settings?.navCtaLabel || 'Request wholesale catalogue'}
          </Button>
        </div>

        <button
          ref={menuButton}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] text-charcoal-900 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={24} weight="regular" /> : <List size={24} weight="regular" />}
        </button>
      </Container>

      {/* Height animates via grid rows in CSS; `inert` keeps the closed menu out of the tab order. */}
      <div id="mobile-navigation" className={`mobile-nav lg:hidden ${open ? 'is-open' : ''}`} inert={!open}>
        <div className="mobile-nav-inner">
          <Container className="flex flex-col gap-1 py-5">
            {navItems.map((item) => (
              <Link
                key={item.id ?? item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? 'page' : undefined}
                className="rounded-[var(--radius-control)] px-3 py-3 text-[17px] font-medium text-charcoal-900 active:bg-cream-200"
              >
                {item.label}
              </Link>
            ))}
            <Button href={settings?.navCtaHref || '/wholesale'} variant="primary" className="mt-3 w-full">
              {settings?.navCtaLabel || 'Request wholesale catalogue'}
            </Button>
          </Container>
        </div>
      </div>
    </header>
  )
}
