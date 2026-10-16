import type { AboutPage } from '@/payload-types'
import Image from 'next/image'

import { Container } from '@/components/ui/Container'
import { HorizontalScroll } from '@/components/ui/HorizontalScroll'
import { mediaAlt, mediaUrl } from '@/lib/media'

/** Horizontal filmstrip: pinned on desktop and driven by vertical scroll (see HorizontalScroll). */
export function FactoryGallery({ data }: { data: AboutPage }) {
  const items = (data.factoryGallery ?? []).filter((item) => mediaUrl(item.image))
  if (!items.length) return null

  return (
    <HorizontalScroll className="factory-gallery" aria-labelledby="factory-gallery-title">
      <div className="factory-gallery-sticky">
        <Container className="factory-gallery-heading">
          <span className="section-index" data-reveal="up">{data.factoryEyebrow}</span>
          <h2 id="factory-gallery-title" data-reveal="up">{data.factoryHeadline}</h2>
        </Container>
        <div className="factory-gallery-viewport hs-viewport" tabIndex={0} role="region" aria-label="Factory photos, scroll sideways">
          <ul className="factory-gallery-track hs-track">
            {items.map((item, i) => (
              <li key={item.id ?? i} className={`factory-gallery-item ${i % 3 === 1 ? 'is-tall' : ''}`}>
                <div className="factory-gallery-photo">
                  <Image src={mediaUrl(item.image, 'wide')!} alt={mediaAlt(item.image, item.caption ?? 'Inside the Hair Nova factory')} fill sizes="(min-width: 900px) 34vw, 80vw" className="object-cover" />
                </div>
                {item.caption && <p><span>{String(i + 1).padStart(2, '0')}</span>{item.caption}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HorizontalScroll>
  )
}
