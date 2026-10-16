import { Marquee } from '@/components/ui/Marquee'

export function TextureMarquee({ items }: { items: string[] }) {
  if (items.length === 0) return null

  return (
    <div className="texture-marquee">
      <Marquee items={items} />
    </div>
  )
}
