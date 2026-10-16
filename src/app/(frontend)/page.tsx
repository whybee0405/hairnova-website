import { CraftStory } from '@/components/sections/home/CraftStory'
import { FeaturedProducts } from '@/components/sections/home/FeaturedProducts'
import { FactoryFilm } from '@/components/sections/home/FactoryFilm'
import { Hero } from '@/components/sections/home/Hero'
import { TextureMarquee } from '@/components/sections/home/TextureMarquee'
import { TikTokFeed } from '@/components/sections/home/TikTokFeed'
import { TrustStrip } from '@/components/sections/home/TrustStrip'
import { Uvp } from '@/components/sections/home/Uvp'
import { WholesaleCta } from '@/components/sections/home/WholesaleCta'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [home, settings, featured, catalogue] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', depth: 2 }),
    payload.findGlobal({ slug: 'site-settings', depth: 0 }),
    payload.find({
      collection: 'products',
      where: { featured: { equals: true } },
      sort: 'order',
      limit: 4,
      depth: 1,
    }),
    payload.find({ collection: 'products', sort: 'order', limit: 50, depth: 0, select: { name: true } }),
  ])

  return (
    <>
      <Hero data={home} />
      <TrustStrip data={home} />
      <FeaturedProducts data={home} products={featured.docs} />
      <TextureMarquee items={catalogue.docs.map((p) => p.name)} />
      <Uvp data={home} />
      <FactoryFilm data={home} />
      <CraftStory data={home} />
      <TikTokFeed data={home} settings={settings} />
      <WholesaleCta data={home} />
    </>
  )
}
