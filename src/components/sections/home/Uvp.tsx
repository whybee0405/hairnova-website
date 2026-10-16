import type { HomePage } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { Container } from '@/components/ui/Container'
import { mediaAlt, mediaUrl } from '@/lib/media'

export function Uvp({ data }: { data: HomePage }) {
  const points = data.uvpPoints ?? []
  const photo = mediaUrl(data.uvpImage, 'hero')
  return (
    <section className="maker-bento" aria-labelledby="maker-title">
      <Container>
        <div className="maker-bento-heading">
          <div data-reveal="up"><span className="section-index">02 / Meet your maker</span><h2 id="maker-title">{data.uvpHeadline}</h2></div>
          <p data-reveal="up" style={{ '--reveal-delay': '.12s' } as CSSProperties}>{data.uvpBody}</p>
        </div>
        {points.length > 0 && <div className={`maker-bento-grid ${photo ? 'has-photo' : ''}`}>
          <article className="maker-tile maker-tile-primary" data-reveal="up">
            <span className="maker-tile-number" aria-hidden="true">01</span>
            <div><h3>{points[0].title}</h3><p>{points[0].body}</p><Link href="/about" className="text-link">The Hair Nova story <ArrowUpRight size={20} /></Link></div>
          </article>
          {photo && <figure className="maker-tile maker-tile-photo" data-reveal="mask" style={{ '--reveal-delay': '.08s' } as CSSProperties}>
            <Image src={photo} alt={mediaAlt(data.uvpImage, 'Inside the Hair Nova factory, Cosmo City')} fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover" />
            {data.uvpImageCaption && <figcaption><span className="live-dot" aria-hidden="true" />{data.uvpImageCaption}</figcaption>}
          </figure>}
          {points.length > 1 && <div className="maker-tile-stack" data-reveal="stagger" style={{ '--reveal-delay': '.12s' } as CSSProperties}>{points.slice(1).map((point, i) => <article key={point.id ?? point.title} className="maker-tile">
            <span className="maker-tile-number" aria-hidden="true">{String(i + 2).padStart(2, '0')}</span><div><h3>{point.title}</h3><p>{point.body}</p></div>
          </article>)}</div>}
        </div>}
      </Container>
    </section>
  )
}
