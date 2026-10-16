import type { Metadata } from 'next'

import { FactoryGallery } from '@/components/sections/about/FactoryGallery'
import { Hero } from '@/components/sections/about/Hero'
import { Story } from '@/components/sections/about/Story'
import { Values } from '@/components/sections/about/Values'
import { CtaBand } from '@/components/ui/CtaBand'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Hair Nova is family owned and Asian-South African, making hairpieces, wigs, weaves and braids in Cosmo City, Johannesburg since 2009.',
}

export default async function AboutPage() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'about-page', depth: 2 })

  return (
    <>
      <Hero data={data} />
      <Story data={data} />
      <FactoryGallery data={data} />
      <Values data={data} />

      <CtaBand
        eyebrow="Wholesale"
        title="Want to carry Hair Nova?"
        body="Stock made in our Cosmo City factory, supplied directly to your salon or store."
        image="/images/cta-cartons.webp"
        align="center"
      />
    </>
  )
}
