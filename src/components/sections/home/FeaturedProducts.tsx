import type { HomePage, Product } from '@/payload-types'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { ProductCard } from '@/components/products/ProductCard'
import { Container } from '@/components/ui/Container'

export function FeaturedProducts({ data, products }: { data: HomePage; products: Product[] }) {
  if (!products.length) return null
  return <section id="textures" className="texture-collection"><Container>
    <div className="collection-heading"><div data-reveal="up"><span className="section-index">01 / The collection</span><h2>{data.featuredHeadline}<span className="title-dot">.</span></h2></div>
      <div data-reveal="up" style={{ '--reveal-delay': '.12s' } as CSSProperties}><p>{data.featuredBody}</p><Link href="/products" className="text-link">View full catalogue <ArrowUpRight size={19} /></Link></div>
    </div>
    <div className="collection-grid" data-reveal="stagger">{products.map((product, index) => <div key={product.id} className="collection-item"><span className="product-index">{String(index + 1).padStart(2, '0')} / {product.category}</span><ProductCard product={product} /></div>)}</div>
    <div className="collection-note" data-reveal="rule"><span>Different textures. The same local roots.</span><span>Made for your next look.</span></div>
  </Container></section>
}
