'use client'

import { useEffect } from 'react'

/**
 * One IntersectionObserver for every [data-reveal] element on the page. The
 * motion itself lives in CSS (campaign.css), so sections stay server
 * components and no animation library is needed for scroll reveals.
 *
 * Content is only hidden once `html.reveal-ready` is set, and anything already
 * in the viewport is marked visible first (via a data attribute, so React
 * re-renders of className never undo it), so first-screen content is never
 * concealed and nothing stays hidden if JS fails.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.remove('reveal-ready')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-in', '1')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )

    const register = (el: Element) => {
      if (el.hasAttribute('data-in') || (el as HTMLElement).dataset.revealBound) return
      ;(el as HTMLElement).dataset.revealBound = ''
      const variant = el.getAttribute('data-reveal')
      if (variant === 'stagger' || variant === 'letters') {
        Array.from(el.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)))
      }
      const rect = el.getBoundingClientRect()
      if (!root.classList.contains('reveal-ready') && rect.top < window.innerHeight && rect.bottom > 0) {
        // On screen at first paint: show as-is, no entrance (avoids a visible-hidden-visible flicker).
        el.setAttribute('data-in', '0')
        return
      }
      observer.observe(el)
    }

    const scan = (scope: ParentNode) => {
      if (scope instanceof Element && scope.matches('[data-reveal]')) register(scope)
      scope.querySelectorAll('[data-reveal]').forEach(register)
    }

    scan(document)
    root.classList.add('reveal-ready')

    // New pages, filtered grids and other client-rendered nodes join the observer as they mount.
    const mutations = new MutationObserver((records) => {
      for (const record of records) record.addedNodes.forEach((node) => node instanceof Element && scan(node))
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [])

  return null
}
