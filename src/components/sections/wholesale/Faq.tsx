'use client'

import type { WholesalePage } from '@/payload-types'
import { CaretDown } from '@phosphor-icons/react'
import { useId, useState } from 'react'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

export function Faq({ data }: { data: WholesalePage }) {
  const items = data.faqItems ?? []
  const uid = useId()
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <section className="faq-section">
      <Container className="max-w-3xl">
        <Reveal>
          <span className="section-index">Before you order</span>
          <h2>{data.faqHeadline}</h2>
        </Reveal>

        <div className="mt-10 flex flex-col" data-reveal="stagger">
          {items.map((item, i) => {
            const id = item.id ?? item.question
            const isOpen = openId === id
            const panelId = `${uid}-faq-${i}`
            return (
              <div key={id} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    id={`${panelId}-q`}
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="faq-question flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span>{item.question}</span>
                    <CaretDown size={18} className="faq-caret shrink-0" aria-hidden="true" />
                  </button>
                </h3>
                {/* Height animates via grid rows in CSS; `inert` keeps closed answers out of the tab order. */}
                <div id={panelId} role="region" aria-labelledby={`${panelId}-q`} className="faq-answer" inert={!isOpen}>
                  <div><p>{item.answer}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
