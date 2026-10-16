import type { Metadata } from 'next'

import { ProductsGrid } from '@/components/products/ProductsGrid'
import { Container } from '@/components/ui/Container'
import { CtaBand } from '@/components/ui/CtaBand'
import { Reveal } from '@/components/ui/Reveal'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Products',
  description: 'The textures Hair Nova manufactures, from Yaki Braid to Havana Curl, made in Cosmo City, Johannesburg.',
}

export default async function ProductsPage() {
  const payload = await getPayloadClient()
  const [data, products] = await Promise.all([
    payload.findGlobal({ slug: 'products-page', depth: 0 }),
    payload.find({ collection: 'products', sort: 'order', limit: 100, depth: 1 }),
  ])

  return (
    <>
      <section className="catalogue-intro py-16 sm:py-20">
        <Container>
          <Reveal className="load-settle max-w-2xl">
            {data.heroEyebrow && (
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-steel-700">
                {data.heroEyebrow}
              </span>
            )}
            <h1 className="mt-3 font-display text-5xl font-semibold leading-tight tracking-tight text-charcoal-900 sm:text-6xl">
              {data.heroHeadline}
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-charcoal-900/70">{data.heroSubhead}</p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <ProductsGrid products={products.docs} />
        </Container>
      </section>

      <CtaBand eyebrow="Wholesale" title={data.wholesaleNudge} image="/images/cta-packs.webp" />
    </>
  )
}
