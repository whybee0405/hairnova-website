import type { Metadata } from 'next'

import { Faq } from '@/components/sections/wholesale/Faq'
import { Hero } from '@/components/sections/wholesale/Hero'
import { InquirySection } from '@/components/sections/wholesale/InquirySection'
import { Process } from '@/components/sections/wholesale/Process'
import { WhyPartner } from '@/components/sections/wholesale/WhyPartner'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Wholesale',
  description:
    'Source hairpieces, wigs, weaves and braids directly from the family-owned manufacturer in Cosmo City, Johannesburg. Request our wholesale catalogue.',
}

export default async function WholesalePage() {
  const payload = await getPayloadClient()
  const [data, settings] = await Promise.all([
    payload.findGlobal({ slug: 'wholesale-page', depth: 2 }),
    payload.findGlobal({ slug: 'site-settings', depth: 0 }),
  ])

  return (
    <>
      <Hero data={data} />
      <WhyPartner data={data} />
      <Process data={data} />
      <Faq data={data} />
      <InquirySection
        data={data}
        contact={{ phone: settings.phone, email: settings.email, address: settings.address }}
      />
    </>
  )
}
