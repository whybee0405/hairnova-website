import type { HomePage } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/ui/Button'
import { isAiPlaceholder, mediaAlt, mediaUrl } from '@/lib/media'
import type { CSSProperties } from 'react'

const line = (text: string, i: number) => <span key={text} className="load-line"><span style={{ '--i': i } as CSSProperties}>{text}</span></span>

export function Hero({ data }: { data: HomePage }) {
  const image = mediaUrl(data.heroImage)
  const proof = isAiPlaceholder(data.statementImage) ? undefined : mediaUrl(data.statementImage, 'thumbnail')
  return (
    <section className="campaign-hero" aria-labelledby="home-title">
      <div className="campaign-copy">
        <p className="origin-line"><span /> From Johannesburg. With pride.</p>
        <h1 id="home-title">{data.heroHeadline === 'Made in South Africa, by us.' ? ['Made in', 'South Africa,', 'by us.'].map(line) : line(data.heroHeadline ?? '', 0)}</h1>
        <p className="campaign-description">{data.heroSubhead}</p>
        <div className="campaign-actions">
          <Button href={data.heroPrimaryCtaHref || '/wholesale'}>{data.heroPrimaryCtaLabel}<ArrowUpRight size={19} /></Button>
          <Link className="text-link" href={data.heroSecondaryCtaHref || '/products'}>{data.heroSecondaryCtaLabel}<ArrowUpRight size={18} /></Link>
        </div>
        <a className="hero-explore" href="#textures"><ArrowDown size={18} /><span>Good hair starts at the source.</span></a>
      </div>
      <div className="campaign-portrait" data-motion="page">
        <span className="portrait-topline">HAIR NOVA <span>NATURAL BEAUTY</span></span>
        <div className="portrait-orbit-wrap" aria-hidden="true"><div className="portrait-orbit" /></div>
        <div className="portrait-word-wrap" aria-hidden="true"><span className="portrait-word">nova</span></div>
        {image && <div className="campaign-parallax"><Image src={image} alt={mediaAlt(data.heroImage, 'Hair Nova hair texture')} fill priority sizes="(min-width: 900px) 52vw, 100vw" className="campaign-model" /></div>}
        <div className="portrait-caption"><span>Crafted here.<br />Worn your way.</span><Link href="/products" aria-label="Discover Hair Nova textures"><ArrowUpRight size={28} /></Link></div>
        {proof && <Link href="#factory" className="portrait-proof">
          <span className="portrait-proof-thumb"><Image src={proof} alt="" fill sizes="96px" className="object-cover" /></span>
          <span><small>Real factory, real people</small>See our floor in Cosmo City</span>
          <ArrowDown size={16} />
        </Link>}
        <span className="portrait-side">COSMO CITY, SOUTH AFRICA · EST. 2009</span>
      </div>
    </section>
  )
}
