import Image from 'next/image'
import Link from 'next/link'

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return <Link href="/" aria-label="Hair Nova home" className="shrink-0"><Image src={onDark ? '/brand/hairnova-wordmark-white.webp' : '/brand/hairnova-wordmark.webp'} alt="Hair Nova, Natural Beauty" width={168} height={54} priority={!onDark} className="h-auto w-[150px] sm:w-[168px]" /></Link>
}
