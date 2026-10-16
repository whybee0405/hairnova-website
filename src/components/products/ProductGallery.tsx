'use client'

import Image from 'next/image'
import { useState } from 'react'

export type GalleryImage = { src: string; alt: string }

/**
 * Main image with a thumbnail rail; thumbnails are buttons, so it works by
 * keyboard too. Only photos that have been shown (or are about to be, on
 * hover/focus of a thumbnail) are mounted, so extra photos never compete with
 * the first one while the page loads.
 */
export function ProductGallery({ images, badge }: { images: GalleryImage[]; badge?: string | null }) {
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]))
  const prime = (i: number) => setMounted((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))
  const show = (i: number) => { prime(i); setActive(i) }

  if (!images.length) return <div className="product-gallery-main bg-sand-200" />

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        {images.map((img, i) =>
          mounted.has(i) ? (
            <Image
              key={img.src}
              src={img.src}
              alt={i === active ? img.alt : ''}
              aria-hidden={i !== active}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className={`product-gallery-image ${i === active ? 'is-active' : ''}`}
            />
          ) : null,
        )}
        {badge && <span className="product-gallery-badge">{badge}</span>}
        {images.length > 1 && <span className="product-gallery-count" aria-hidden="true">{active + 1} / {images.length}</span>}
      </div>
      {images.length > 1 && (
        <ul className="product-gallery-thumbs" aria-label="Product photos">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => show(i)}
                onPointerEnter={() => prime(i)}
                onFocus={() => prime(i)}
                aria-pressed={i === active}
                aria-label={`Show photo ${i + 1}: ${img.alt}`}
              >
                <Image src={img.src} alt="" fill sizes="96px" className="object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
