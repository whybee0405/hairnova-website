import type { Metadata } from 'next'
import { ArrowUpRight, Factory, HandHeart, Package, Ruler, Swatches, Tag, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'

import { ProductCard } from '@/components/products/ProductCard'
import { ProductGallery, type GalleryImage } from '@/components/products/ProductGallery'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { getPayloadClient } from '@/lib/payload'
import { mediaAlt, mediaUrl } from '@/lib/media'
import { whatsappHref } from '@/lib/whatsapp'
import type { Product } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ slug: string }> }

const TYPE_LABEL: Record<NonNullable<Product['productType']>, string> = { 'hair-piece': 'Hair piece', weaving: 'Weaving', wig: 'Wig' }
const TYPE_PLURAL: Record<NonNullable<Product['productType']>, string> = { 'hair-piece': 'hair pieces', weaving: 'weaving', wig: 'wigs' }
const TEXTURE_LABEL: Record<NonNullable<Product['category']>, string> = { braid: 'Braid', curl: 'Curl', twist: 'Twist' }

async function getProduct(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}
  const image = mediaUrl(product.heroImage, 'card')
  return {
    title: product.name,
    description: product.textureNote || product.description || undefined,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${product.name} | Hair Nova`, description: product.textureNote ?? undefined, images: image ? [{ url: image }] : undefined },
  }
}

export default async function ProductDetailPage({ params }: Args) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const payload = await getPayloadClient()
  const [settings, related] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 0 }),
    payload.find({
      collection: 'products',
      where: { and: [{ id: { not_equals: product.id } }, { productType: { equals: product.productType ?? 'hair-piece' } }] },
      sort: 'order',
      limit: 4,
      depth: 1,
    }),
  ])

  const images: GalleryImage[] = [
    product.heroImage && { src: mediaUrl(product.heroImage)!, alt: mediaAlt(product.heroImage, product.name) },
    ...(product.gallery ?? []).map((g, i) => g.image && { src: mediaUrl(g.image)!, alt: mediaAlt(g.image, `${product.name}, photo ${i + 2}`) }),
  ].filter((img): img is GalleryImage => Boolean(img && img.src))

  const type = TYPE_LABEL[product.productType ?? 'hair-piece']
  const texture = product.category ? TEXTURE_LABEL[product.category] : null
  const whatsapp = whatsappHref(settings.whatsappNumber, `Hi Hair Nova, I'd like wholesale details for ${product.name}.`)

  return (
    <>
      <section className="product-detail" aria-labelledby="product-title">
        <Container>
          <nav className="product-crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/products">{type}</Link></li>
              <li aria-current="page">{product.name}</li>
            </ol>
          </nav>

          <div className="product-layout">
            <div className="load-settle">
              <ProductGallery images={images} badge={product.status === 'coming-soon' ? 'Coming soon' : null} />
            </div>

            <div className="product-info load-settle" style={{ '--reveal-delay': '.2s' } as CSSProperties}>
              <span className="section-index">{[type, texture].filter(Boolean).join(' · ')}</span>
              <h1 id="product-title">{product.name}</h1>
              {product.textureNote && <p className="product-note">{product.textureNote}</p>}
              {product.description && <p className="product-description">{product.description}</p>}

              <div className="product-buyers">
                <h2>For wholesale buyers</h2>
                <ul>
                  <li><Ruler size={20} aria-hidden="true" /><span>Available lengths and full specifications</span></li>
                  <li><Swatches size={20} aria-hidden="true" /><span>Current colour range</span></li>
                  <li><Tag size={20} aria-hidden="true" /><span>Wholesale pricing for your volumes</span></li>
                </ul>
                <p>Shared directly with salons, resellers and distributors when you request the catalogue.</p>
                <div className="product-actions">
                  <Button href="/wholesale#inquiry-form">Request wholesale catalogue <ArrowUpRight size={20} /></Button>
                  {whatsapp && (
                    <a href={whatsapp} target="_blank" rel="noopener" className="product-whatsapp">
                      <WhatsappLogo size={20} weight="fill" aria-hidden="true" /> Ask on WhatsApp
                    </a>
                  )}
                </div>
              </div>

              <ul className="product-trust" aria-label="About this product">
                <li><Factory size={20} aria-hidden="true" /><span>Made in our Cosmo City factory</span></li>
                <li><HandHeart size={20} aria-hidden="true" /><span>Finished and checked by hand</span></li>
                <li><Package size={20} aria-hidden="true" /><span>Direct from the manufacturer</span></li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {related.docs.length > 0 && (
        <section className="product-related" aria-labelledby="related-title">
          <Container>
            <div className="product-related-head" data-reveal="up">
              <h2 id="related-title">More {TYPE_PLURAL[product.productType ?? 'hair-piece']}</h2>
              <Link href="/products" className="text-link">Full catalogue <ArrowUpRight size={18} /></Link>
            </div>
            <div className="product-related-grid" data-reveal="stagger">
              {related.docs.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
