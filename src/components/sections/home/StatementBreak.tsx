import type { HomePage } from '@/payload-types'
import Image from 'next/image'

import { FullBleed } from '@/components/ui/FullBleed'
import { RevealImage } from '@/components/ui/RevealImage'
import { mediaAlt, mediaUrl } from '@/lib/media'

export function StatementBreak({ data }: { data: HomePage }) {
  const imgUrl = mediaUrl(data.statementImage, 'wide')
  const imgAlt = mediaAlt(data.statementImage, 'Inside the Hair Nova workshop')

  return (
    <section className="relative">
      <FullBleed>
        <RevealImage>
          <div className="relative flex h-[62vh] min-h-[420px] w-full items-center justify-center overflow-hidden">
            {imgUrl ? (
              <Image src={imgUrl} alt={imgAlt} fill sizes="100vw" className="animate-kenburns object-cover" />
            ) : (
              <div className="h-full w-full bg-charcoal-900" />
            )}
            <div className="absolute inset-0 bg-charcoal-900/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/40 via-transparent to-charcoal-900/50" />

            <p className="relative max-w-4xl px-6 text-center font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {data.statementHeadline}
            </p>
          </div>
        </RevealImage>
      </FullBleed>
    </section>
  )
}
