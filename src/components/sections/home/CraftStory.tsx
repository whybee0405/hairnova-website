'use client'

import type { HomePage } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Container } from '@/components/ui/Container'
import { isAiPlaceholder, mediaAlt, mediaUrl } from '@/lib/media'

export function CraftStory({ data }: { data: HomePage }) {
  const steps = data.craftSteps ?? []
  const [active, setActive] = useState(0)
  const stepNodes = useRef<(HTMLElement | null)[]>([])
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      if (!window.matchMedia('(min-width: 1024px)').matches) return
      const middle = window.innerHeight / 2
      let nearest = 0
      let distance = Infinity
      stepNodes.current.forEach((node, i) => {
        if (!node) return
        const bounds = node.getBoundingClientRect()
        const offset = Math.abs(bounds.top + bounds.height / 2 - middle)
        if (offset < distance) { nearest = i; distance = offset }
      })
      if (distance < middle) setActive(nearest)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [steps.length])
  if (!steps.length) return null
  const activeStep = steps[active]

  return (
    <section className="craft-story" aria-labelledby="craft-title">
      <Container>
        <div className="craft-story-heading" data-reveal="up"><span className="section-index">{data.craftEyebrow}</span><h2 id="craft-title">{data.craftHeadline}</h2><p>{data.craftBody}</p></div>
        <div className="craft-story-grid">
          <figure className="craft-story-figure">
            <div className="craft-story-photo" data-reveal="mask">
              {steps.map((step, i) => {
                const image = mediaUrl(step.image)
                return image ? <div key={step.id ?? i} className={`craft-image-layer ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
                  <Image src={image} alt={i === active ? mediaAlt(step.image, step.title) : ''} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div> : null
              })}
              <div className="craft-story-caption"><span>{String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span><strong>{activeStep.title}</strong></div>
            </div>
            {isAiPlaceholder(activeStep.image) && <figcaption>Illustrative photography. Not an actual Hair Nova workshop photo.</figcaption>}
          </figure>
          <div className="craft-scroll-steps">
            {steps.map((step, i) => <article key={step.id ?? step.title} ref={node => { stepNodes.current[i] = node }} className={`craft-scroll-step ${active === i ? 'is-active' : ''}`} data-reveal="rule">
              <h3><button type="button" onClick={() => setActive(i)} aria-pressed={active === i} aria-label={`View step ${i + 1}: ${step.title}`}><span>{String(i + 1).padStart(2, '0')}</span><span>{step.title}</span></button></h3><p>{step.body}</p>
            </article>)}
            <Link href="/about" className="text-link">Our story <ArrowUpRight size={18} /></Link>
          </div>
          <div className="craft-mobile-steps">
            <div className="craft-step-selectors" aria-label="Choose a making step">{steps.map((step, i) => <button key={step.id ?? i} type="button" aria-pressed={active === i} aria-controls="craft-mobile-description" onClick={() => setActive(i)}><span>{String(i + 1).padStart(2, '0')}</span>{step.title}</button>)}</div>
            <div id="craft-mobile-description" aria-live="polite"><h3>{activeStep.title}</h3><p>{activeStep.body}</p></div>
            <Link href="/about" className="text-link">Our story <ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
