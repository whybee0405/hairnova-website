import type { AboutPage } from '@/payload-types'
import { Handshake, Scissors, ShieldCheck } from '@phosphor-icons/react/dist/ssr'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

const icons = [Scissors, ShieldCheck, Handshake]

export function Values({ data }: { data: AboutPage }) {
  const points = data.valuesPoints ?? []

  return (
    <section className="values-section" aria-labelledby="values-title">
      <div className="process-backdrop" aria-hidden="true" />
      <Container className="relative">
        <Reveal className="max-w-2xl">
          <span className="section-index">Our standard</span>
          <h2 id="values-title">{data.valuesHeadline}</h2>
        </Reveal>
        <ul className="values-grid" data-reveal="stagger">
          {points.map((point, i) => {
            const Icon = icons[i % icons.length]
            return (
              <li key={point.id ?? point.title} className="value-card">
                <div className="value-card-top">
                  <span className="value-card-icon" aria-hidden="true"><Icon size={22} weight="regular" /></span>
                  <span className="value-card-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
