import type { WholesalePage } from '@/payload-types'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { mediaAlt, mediaUrl } from '@/lib/media'

export function WhyPartner({ data }: { data: WholesalePage }) {
  const intro = mediaUrl(data.whyImage, 'wide')
  return (
    <section className="partner-reasons">
      <Container className="partner-reasons-grid">
        <div className="partner-reasons-intro">
          <div data-reveal="up"><span className="section-index">A direct relationship</span><h2>{data.whyHeadline}</h2></div>
          {intro && (
            <figure className="partner-reasons-photo" data-reveal="mask">
              <Image src={intro} alt={mediaAlt(data.whyImage, 'Hair Nova cartons in the warehouse')} fill sizes="(min-width: 600px) 45vw, 100vw" className="object-cover" />
              <figcaption>Our warehouse, Cosmo City</figcaption>
            </figure>
          )}
        </div>
        <div data-reveal="stagger">
          {(data.whyPoints ?? []).map((point, i) => {
            // Optional per-row photo, revealed behind the row while hovered.
            const photo = mediaUrl(point.image, 'wide')
            return (
              <article key={point.id ?? point.title} className={`reason-row ${photo ? 'has-photo' : ''}`}>
                {photo && (
                  <span className="reason-row-photo" aria-hidden="true">
                    <Image src={photo} alt="" fill sizes="(min-width: 600px) 50vw, 100vw" className="object-cover" />
                  </span>
                )}
                <span className="reason-row-index">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{point.title}</h3><p>{point.body}</p></div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
