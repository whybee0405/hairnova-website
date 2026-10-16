import type { HomePage } from '@/payload-types'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { Container } from '@/components/ui/Container'
import { InViewVideo } from '@/components/ui/InViewVideo'
import { mediaUrl } from '@/lib/media'

export function FactoryFilm({ data }: { data: HomePage }) {
  const video = data.factoryVideo
  const posterSrc = mediaUrl(data.statementImage, 'wide') ?? '/video/factory-reel-poster.jpg'
  // Poster through the Next image optimiser (WebP/AVIF at 1200px) instead of the 1600px JPEG.
  const poster = `/_next/image?url=${encodeURIComponent(posterSrc)}&w=1200&q=75`
  const steps = (data.craftSteps ?? []).map((step) => step.title)

  return (
    <section id="factory" className="factory-film" aria-labelledby="factory-title">
      <div className="factory-film-frame" data-motion="view" data-motion-range="0 0.5">
        {video ? (
          <InViewVideo src={video} poster={poster} className="factory-film-media" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="factory-film-media" loading="lazy" />
        )}
        <div className="factory-film-shade" aria-hidden="true" />
        <Container className="factory-film-copy">
          <span className="section-index" data-reveal="up">Inside the factory · Cosmo City</span>
          <h2 id="factory-title" data-reveal="up">{data.statementHeadline}</h2>
          {steps.length > 0 && (
            <ol className="factory-film-steps" data-reveal="stagger" aria-label="How a piece is made">
              {steps.map((title, i) => (
                <li key={title}><span>{String(i + 1).padStart(2, '0')}</span>{title}</li>
              ))}
            </ol>
          )}
          <Link href="/about" className="factory-film-link" data-reveal="up">Meet the people behind it <ArrowUpRight size={18} /></Link>
        </Container>
      </div>
    </section>
  )
}
