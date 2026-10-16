import type { WholesalePage } from '@/payload-types'
import Image from 'next/image'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { mediaAlt, mediaUrl } from '@/lib/media'

/**
 * Full-bleed photo with the copy on the right. A landscape image whose subject
 * sits in its left half (the branded carton) stays clear on the left, while the
 * overlay deepens behind the text. Below 900px the photo becomes a band above
 * the copy so text never covers the subject.
 */
export function Hero({ data }: { data: WholesalePage }) {
  const image = mediaUrl(data.heroImage)
  return (
    <section className="partner-hero" aria-labelledby="wholesale-title">
      {image && (
        <div className="partner-hero-media">
          <Image src={image} alt={mediaAlt(data.heroImage, 'Hair Nova branded cartons in the warehouse')} fill priority sizes="100vw" className="partner-hero-photo" />
          <div className="partner-hero-shade" aria-hidden="true" />
        </div>
      )}
      <Container className="partner-hero-inner">
        <div className="partner-copy">
          <span className="section-index">{data.heroEyebrow}</span>
          <h1 id="wholesale-title">{data.heroHeadline}</h1>
          <p>{data.heroSubhead}</p>
          <Button href="#inquiry-form">Request wholesale catalogue <ArrowUpRight size={20} /></Button>
          <span className="partner-origin">COSMO CITY, JOHANNESBURG / SINCE 2009</span>
        </div>
      </Container>
    </section>
  )
}
