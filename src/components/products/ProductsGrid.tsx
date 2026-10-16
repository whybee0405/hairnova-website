'use client'

import type { Product } from '@/payload-types'
import Link from 'next/link'
import { type CSSProperties, useMemo, useState } from 'react'

import { ProductCard } from '@/components/products/ProductCard'
import { RevealStagger, RevealStaggerItem } from '@/components/ui/Reveal'

type TypeValue = NonNullable<Product['productType']> | 'all'
type TextureValue = NonNullable<Product['category']> | 'all'

const types: { label: string; plural: string; value: TypeValue }[] = [
  { label: 'All products', plural: 'products', value: 'all' },
  { label: 'Hair piece', plural: 'hair pieces', value: 'hair-piece' },
  { label: 'Weaving', plural: 'weaving', value: 'weaving' },
  { label: 'Wig', plural: 'wigs', value: 'wig' },
]

const textures: { label: string; value: TextureValue }[] = [
  { label: 'All textures', value: 'all' },
  { label: 'Braid', value: 'braid' },
  { label: 'Curl', value: 'curl' },
  { label: 'Twist', value: 'twist' },
]

export function ProductsGrid({ products }: { products: Product[] }) {
  const [type, setType] = useState<TypeValue>('all')
  const [texture, setTexture] = useState<TextureValue>('all')
  const [filtered, setFiltered] = useState(false)

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: products.length }
    for (const p of products) c[p.productType ?? 'hair-piece'] = (c[p.productType ?? 'hair-piece'] ?? 0) + 1
    return c
  }, [products])

  const ofType = useMemo(
    () => (type === 'all' ? products : products.filter((p) => (p.productType ?? 'hair-piece') === type)),
    [products, type],
  )
  // Only offer texture chips that exist within the chosen product type.
  const availableTextures = textures.filter((t) => t.value === 'all' || ofType.some((p) => p.category === t.value))
  const visible = texture === 'all' ? ofType : ofType.filter((p) => p.category === texture)
  const activeType = types.find((t) => t.value === type)!

  const chooseType = (value: TypeValue) => { setType(value); setTexture('all'); setFiltered(true) }
  const chooseTexture = (value: TextureValue) => { setTexture(value); setFiltered(true) }

  return (
    <div>
      <div className="catalogue-types" aria-label="Filter by product type">
        {types.map((t) => (
          <button
            key={t.value}
            type="button"
            aria-pressed={type === t.value}
            onClick={() => chooseType(t.value)}
            className="catalogue-type"
          >
            {t.label}
            {counts[t.value] ? (
              <span className="catalogue-type-count">{counts[t.value]}</span>
            ) : (
              <span className="catalogue-type-soon">Soon</span>
            )}
          </button>
        ))}
      </div>

      {availableTextures.length > 2 && (
        <div className="catalogue-filters mt-5 flex flex-wrap gap-2.5" aria-label="Filter by texture">
          {availableTextures.map((filter) => {
            const isActive = texture === filter.value
            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => chooseTexture(filter.value)}
                className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-150 ease-out ${
                  isActive
                    ? 'border-steel-600 bg-steel-600 text-white'
                    : 'border-charcoal-900/15 bg-transparent text-charcoal-900/70 hover:border-steel-600 hover:text-steel-700'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>
      )}

      <h2 className="sr-only">{activeType.label === 'All products' ? 'All products' : activeType.label}</h2>
      {visible.length > 0 ? (
        <RevealStagger className="mt-9 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {visible.map((product, i) => (
            <RevealStaggerItem key={`${type}-${texture}-${product.id}`} className={filtered ? 'filter-enter' : undefined} style={{ '--i': i } as CSSProperties}>
              <ProductCard product={product} />
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      ) : (
        <div className="catalogue-empty mt-9">
          <p>Our {activeType.plural} line isn&rsquo;t in the online catalogue yet.</p>
          <p>Wholesale buyers can ask us directly about current {activeType.plural} stock.</p>
          <Link href="/wholesale#inquiry-form" className="text-link">Ask about {activeType.plural}</Link>
        </div>
      )}
    </div>
  )
}
