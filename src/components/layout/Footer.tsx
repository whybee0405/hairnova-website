import type { SiteSetting } from '@/payload-types'
import {
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
  TiktokLogo,
  WhatsappLogo,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { Container } from '@/components/ui/Container'

import { Logo } from './Logo'

const socialIcons = {
  Instagram: InstagramLogo,
  Facebook: FacebookLogo,
  TikTok: TiktokLogo,
  WhatsApp: WhatsappLogo,
}

export function Footer({ settings }: { settings: SiteSetting }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-charcoal-900/10 bg-charcoal-900 text-cream-100">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <Logo onDark />
          <p className="max-w-xs text-[14.5px] leading-relaxed text-cream-100/70">
            {settings?.footerNote}
          </p>
          {settings?.socials && settings.socials.length > 0 && (
            <div className="mt-2 flex gap-3">
              {settings.socials.map((social) => {
                const Icon = socialIcons[social.platform as keyof typeof socialIcons]
                return (
                  <a
                    key={social.id ?? social.url}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.platform}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream-100 transition-colors hover:border-cyan-500 hover:text-cyan-400"
                  >
                    {Icon ? <Icon size={18} weight="regular" /> : null}
                  </a>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-cream-100/75">Navigate</h2>
          <ul className="flex flex-col gap-3 text-[14.5px]">
            {settings?.navItems?.map((item) => (
              <li key={item.id ?? item.href}>
                <Link href={item.href} className="text-cream-100/80 transition-colors hover:text-cyan-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-cream-100/75">Wholesale</h2>
          <ul className="flex flex-col gap-3 text-[14.5px]">
            <li>
              <Link href="/wholesale" className="text-cream-100/80 transition-colors hover:text-cyan-400">
                Request a catalogue
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-cream-100/80 transition-colors hover:text-cyan-400">
                Browse textures
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-cream-100/80 transition-colors hover:text-cyan-400">
                Our story
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-cream-100/75">Contact</h2>
          <ul className="flex flex-col gap-3 text-[14.5px] text-cream-100/80">
            {settings?.phone && (
              <li className="flex items-start gap-2">
                <Phone size={17} className="mt-0.5 shrink-0 text-cyan-400" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-cyan-400">
                  {settings.phone}
                </a>
              </li>
            )}
            {settings?.address && (
              <li className="flex items-start gap-2">
                <MapPin size={17} className="mt-0.5 shrink-0 text-cyan-400" />
                <span>{settings.address}</span>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 text-[13px] text-cream-100/75 sm:flex-row">
          <span>&copy; {year} Hair Nova. Cosmo City, Johannesburg.</span>
          <span>Family owned, since 2009.</span>
          <a href="https://cloudia.co.za" target="_blank" rel="noopener" className="footer-credit">
            Made by <strong>CloudIA</strong> - Your Digital Growth Partner
          </a>
        </Container>
      </div>
    </footer>
  )
}
