import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

/**
 * Closing call-to-action band: real factory photography under a steel-blue
 * gradient, or an abstract gradient when no image is given.
 */
export function CtaBand({
  eyebrow,
  title,
  body,
  cta = 'Request wholesale catalogue',
  href = '/wholesale',
  image,
  align = 'left',
}: {
  eyebrow?: string
  title: React.ReactNode
  body?: React.ReactNode
  cta?: string
  href?: string
  image?: string
  align?: 'left' | 'center'
}) {
  return (
    <section className={`cta-band ${image ? 'has-photo' : 'is-abstract'} cta-band-${align}`}>
      {image && <Image src={image} alt="" fill sizes="100vw" className="cta-band-photo" />}
      <div className="cta-band-shade" aria-hidden="true" />
      <Container className="cta-band-inner">
        <div data-reveal="up">
          {eyebrow && <span className="section-index">{eyebrow}</span>}
          <h2>{title}</h2>
          {body && <p>{body}</p>}
        </div>
        <div data-reveal="up" style={{ '--reveal-delay': '.12s' } as React.CSSProperties}>
          <Button href={href}>{cta} <ArrowUpRight size={20} /></Button>
        </div>
      </Container>
    </section>
  )
}
