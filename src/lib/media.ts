import type { Media } from '@/payload-types'

type MediaLike = Media | number | null | undefined

type SizeName = 'thumbnail' | 'card' | 'wide' | 'hero'

export function mediaUrl(media: MediaLike, size?: SizeName): string | undefined {
  if (!media || typeof media === 'number') return undefined
  if (size && media.sizes?.[size]?.url) return media.sizes[size].url ?? undefined
  return media.url ?? undefined
}

export function mediaAlt(media: MediaLike, fallback = ''): string {
  if (!media || typeof media === 'number') return fallback
  return media.alt || fallback
}

export function isAiPlaceholder(media: MediaLike): boolean {
  if (!media || typeof media === 'number') return false
  return Boolean(media.isAiPlaceholder)
}

export function mediaCaption(media: MediaLike): string | undefined {
  if (!media || typeof media === 'number') return undefined
  return media.caption ?? undefined
}
