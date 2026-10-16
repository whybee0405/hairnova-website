import type { WholesalePage } from '@/payload-types'
import { Envelope, MapPin, Phone } from '@phosphor-icons/react/dist/ssr'

import { WholesaleInquiryForm } from '@/components/forms/WholesaleInquiryForm'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

export function InquirySection({
  data,
  contact,
}: {
  data: WholesalePage
  contact: { phone?: string | null; email?: string | null; address?: string | null }
}) {
  return (
    <section id="inquiry-form" className="inquiry-section scroll-mt-24 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="flex flex-col gap-6">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-charcoal-900 sm:text-5xl">
            {data.formHeadline}
          </h2>
          <p className="max-w-sm text-[16px] leading-relaxed text-charcoal-900/70">{data.formIntro}</p>

          <div className="mt-2 flex flex-col gap-3 text-[14.5px] text-charcoal-900/70">
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2.5 hover:text-steel-700">
                <Phone size={18} className="text-steel-700" />
                {contact.phone}
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 hover:text-steel-700">
                <Envelope size={18} className="text-steel-700" />
                {contact.email}
              </a>
            )}
            {contact.address && (
              <span className="flex items-start gap-2.5">
                <MapPin size={18} className="mt-0.5 shrink-0 text-steel-700" />
                {contact.address}
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative border border-charcoal-900/20 bg-cream-50 p-7 sm:p-9">
          <WholesaleInquiryForm />
        </Reveal>
      </Container>
    </section>
  )
}
