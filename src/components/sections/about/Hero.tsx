import type { AboutPage } from '@/payload-types'
import Image from 'next/image'

import { Container } from '@/components/ui/Container'
import { mediaAlt, mediaUrl } from '@/lib/media'
import type { CSSProperties } from 'react'

/** Editorial opener: headline and subhead side by side, then the team on the factory floor at full width. */
export function Hero({ data }: { data: AboutPage }) {
  const image = mediaUrl(data.heroImage, 'wide')
  return (
    <section className="about-hero" aria-labelledby="about-title">
      <Container>
        <div className="about-hero-head">
          <div className="load-settle">
            {data.heroEyebrow && <span className="section-index">{data.heroEyebrow}</span>}
            <h1 id="about-title">{data.heroHeadline}</h1>
          </div>
          <p className="load-settle" style={{ '--reveal-delay': '.25s' } as CSSProperties}>{data.heroSubhead}</p>
        </div>
        {image && (
          <figure className="about-hero-photo load-settle" style={{ '--reveal-delay': '.35s' } as CSSProperties}>
            <Image src={image} alt={mediaAlt(data.heroImage, 'The Hair Nova team on the factory floor')} fill priority sizes="(min-width: 1320px) 1224px, 100vw" className="object-cover" />
            <figcaption><span className="live-dot" aria-hidden="true" />The Hair Nova floor, Cosmo City</figcaption>
          </figure>
        )}
      </Container>
    </section>
  )
}
