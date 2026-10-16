import type { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { mediaAlt, mediaUrl } from '@/lib/media'

export function ProductCard({ product, aspect = 'aspect-[4/5]', className = '' }: { product: Product; aspect?: string; className?: string }) {
  const image = mediaUrl(product.heroImage)
  return <Link href={`/products/${product.slug}`} className={`product-card group ${className}`}>
    <div className={`product-photo relative ${aspect}`}>
      {image && <Image src={image} alt={mediaAlt(product.heroImage, product.name)} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />}
      {product.status === 'coming-soon' && <span className="product-status">Coming soon</span>}
      <span className="product-open" aria-hidden="true"><ArrowUpRight size={22} /></span>
    </div>
    <div className="product-details"><h3>{product.name}</h3>{product.textureNote && <p>{product.textureNote}</p>}</div>
  </Link>
}
