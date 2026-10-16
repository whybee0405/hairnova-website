import type { HomePage } from '@/payload-types'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Magnetic } from '@/components/ui/Magnetic'
import type { CSSProperties } from 'react'

export function WholesaleCta({ data }: { data: HomePage }) {
  return <section className="wholesale-invitation has-photo" data-motion="view">
    <Image src="/images/cta-factory-floor.webp" alt="" fill sizes="100vw" className="invitation-photo" />
    <div className="invitation-shade" aria-hidden="true" />
    <Container className="relative">
    <div className="invitation-top" data-reveal="rule"><span>For salons. For resellers. For your business.</span><span>LET’S GROW TOGETHER</span></div>
    <div className="invitation-main"><h2 data-reveal="up">{data.wholesaleCtaHeadline}</h2><div data-reveal="up" style={{ '--reveal-delay': '.15s' } as CSSProperties}><p>{data.wholesaleCtaBody}</p><Magnetic strength={0.25}><Button href="/wholesale">{data.wholesaleCtaButtonLabel}<ArrowUpRight size={20} /></Button></Magnetic></div></div>
  </Container></section>
}
