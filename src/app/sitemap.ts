import type { MetadataRoute } from 'next'

import { getPayloadClient } from '@/lib/payload'

// Built per request so new products appear without a redeploy.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
  const payload = await getPayloadClient()
  const products = await payload.find({ collection: 'products', limit: 200, depth: 0, select: { slug: true, updatedAt: true } })

  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/wholesale`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.5 },
  ]
  return [
    ...pages,
    ...products.docs.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ]
}
