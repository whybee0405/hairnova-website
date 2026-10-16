import type { Metadata } from 'next'
import { Inter, Roboto_Slab } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { ScrollMotion } from '@/components/ui/ScrollMotion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { getPayloadClient } from '@/lib/payload'

import './globals.css'
import './campaign.css'
import './motion.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700'],
})

// Keep site-wide chrome (nav, footer) in step with CMS edits without a full redeploy.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'Hair Nova | Made in South Africa, by us.',
    template: '%s | Hair Nova',
  },
  description:
    'Hair Nova is a family-owned manufacturer of hairpieces, wigs, weaves and braids in Cosmo City, Johannesburg, supplying salons, resellers and distributors since 2009.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  openGraph: { type: 'website', siteName: 'Hair Nova', locale: 'en_ZA' },
  twitter: { card: 'summary_large_image' },
}

/** schema.org business details so search engines can show name, contact and location. */
function organizationJsonLd(settings: Awaited<ReturnType<typeof getSettings>>) {
  const base = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hair Nova',
    url: base,
    logo: `${base}/brand/hairnova-wordmark.webp`,
    foundingDate: '2009',
    description: 'Family-owned manufacturer of hairpieces, wigs, weaves and braids in Cosmo City, Johannesburg.',
    ...(settings?.email ? { email: settings.email } : {}),
    ...(settings?.phone ? { telephone: settings.phone } : {}),
    ...(settings?.address ? { address: { '@type': 'PostalAddress', streetAddress: settings.address, addressLocality: 'Johannesburg', addressCountry: 'ZA' } } : {}),
    sameAs: (settings?.socials ?? []).map((s) => s.url).filter(Boolean),
  }
}

async function getSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 2 })
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  return (
    <html lang="en" className={`${inter.variable} ${robotoSlab.variable}`}>
      <body className="flex min-h-dvh flex-col bg-cream-50 font-body text-charcoal-900 antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <script
          type="application/ld+json"
          // JSON.stringify output; '<' escaped so CMS text can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(settings)).replace(/</g, '\\u003c') }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-cream-50 focus:p-4">Skip to content</a>
        <Header settings={settings} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer settings={settings} />
        <ScrollReveal />
        <ScrollMotion />
        <WhatsAppButton number={settings?.whatsappNumber} message={settings?.whatsappMessage} />
      </body>
    </html>
  )
}
