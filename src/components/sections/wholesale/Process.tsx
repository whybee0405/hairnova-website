import type { WholesalePage } from '@/payload-types'
import type { CSSProperties } from 'react'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { StepProgress } from '@/components/ui/StepProgress'

export function Process({ data }: { data: WholesalePage }) {
  const steps = data.processSteps ?? []

  return (
    <section className="process-section">
      <div className="process-backdrop" aria-hidden="true" />
      <Container className="relative">
        <Reveal className="max-w-xl">
          <span className="section-index">Your first order</span>
          <h2>{data.processHeadline}</h2>
        </Reveal>

        <StepProgress className="process-steps" style={{ '--n': Math.max(steps.length, 1) } as CSSProperties}>
          <div className="process-track" aria-hidden="true"><span className="process-track-fill" /></div>
          <ol>
            {steps.map((step, i) => (
              <li key={step.id ?? step.title} className="step-item">
                <span className="process-dot">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </StepProgress>
      </Container>
    </section>
  )
}
