import type { Metadata } from 'next'
import { ArrowUpRight, Envelope, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import type { CSSProperties } from 'react'

import { ContactForm } from '@/components/forms/ContactForm'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { getPayloadClient } from '@/lib/payload'
import { whatsappHref } from '@/lib/whatsapp'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Call, email or visit Hair Nova in Cosmo City, Johannesburg, or send us a message.',
}

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const [data, settings] = await Promise.all([
    payload.findGlobal({ slug: 'contact-page', depth: 0 }),
    payload.findGlobal({ slug: 'site-settings', depth: 0 }),
  ])

  const whatsapp = whatsappHref(settings.whatsappNumber, settings.whatsappMessage)
  const methods = [
    settings.phone && { icon: Phone, label: 'Call us', value: settings.phone, href: `tel:${settings.phone.replace(/\s+/g, '')}` },
    settings.email && { icon: Envelope, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
    whatsapp && { icon: WhatsappLogo, label: 'WhatsApp', value: 'Chat with our team', href: whatsapp, external: true },
    settings.address && {
      icon: MapPin,
      label: 'Visit',
      value: settings.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`,
      external: true,
    },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href: string; external?: boolean }[]

  return (
    <section className="contact-page" aria-labelledby="contact-title">
      <Container>
        <div className="contact-head load-settle">
          <span className="section-index">Contact</span>
          <h1 id="contact-title">{data.heroHeadline}</h1>
          <p>{data.heroSubhead}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-side">
            <ul className="contact-methods load-settle" style={{ '--reveal-delay': '.15s' } as CSSProperties}>
              {methods.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a href={href} className="contact-method" {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
                    <span className="contact-method-icon" aria-hidden="true"><Icon size={20} /></span>
                    <span className="contact-method-text"><small>{label}</small>{value}</span>
                    <ArrowUpRight size={18} className="contact-method-arrow" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            {data.wholesaleNudge && (
              <div className="cta-mini p-6 load-settle" style={{ '--reveal-delay': '.25s' } as CSSProperties}>
                <p className="text-[14.5px] leading-relaxed">{data.wholesaleNudge}</p>
                <div className="mt-4">
                  <Button href="/wholesale" variant="primary" className="text-[13.5px] px-4 py-2.5">Go to wholesale</Button>
                </div>
              </div>
            )}
          </div>

          <div className="contact-form-card load-settle" style={{ '--reveal-delay': '.2s' } as CSSProperties}>
            <h2>Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
