import type { AboutPage } from '@/payload-types'
import Image from 'next/image'

import { Container } from '@/components/ui/Container'
import { isAiPlaceholder, mediaAlt, mediaUrl } from '@/lib/media'

export function Story({ data }: { data: AboutPage }) {
  const image = mediaUrl(data.craftImage, 'hero')
  const milestones = data.milestones ?? []

  return (
    <section className="story-section" aria-labelledby="story-title">
      <Container className="story-grid">
        <div className="story-copy">
          <div data-reveal="up">
            <span className="section-index">Since 2009</span>
            <h2 id="story-title">{data.storyHeadline}</h2>
            <p>{data.storyBody}</p>
          </div>
          {milestones.length > 0 && (
            <ol className="story-timeline" data-reveal="stagger">
              {milestones.map((m) => (
                <li key={m.id ?? m.year}>
                  <span className="story-timeline-year">{m.year}</span>
                  <span className="story-timeline-label">{m.label}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
        {image && (
          <figure className="story-photo" data-reveal="mask">
            <Image src={image} alt={mediaAlt(data.craftImage, 'Hands at work in the Hair Nova factory')} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            {isAiPlaceholder(data.craftImage) && <figcaption>Illustrative photography</figcaption>}
          </figure>
        )}
      </Container>
    </section>
  )
}
