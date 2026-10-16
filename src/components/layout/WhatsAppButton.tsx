import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

import { whatsappHref } from '@/lib/whatsapp'

/**
 * Floating "chat on WhatsApp" button, bottom left. Pure markup + CSS: it costs
 * no client JavaScript. Number and greeting come from Site Settings; hidden
 * until a real number replaces the placeholder.
 */
export function WhatsAppButton({ number, message }: { number?: string | null; message?: string | null }) {
  const href = whatsappHref(number, message)
  if (!href) return null

  return (
    <aside aria-label="WhatsApp chat">
      <a href={href} target="_blank" rel="noopener" className="wa-float" aria-label="Chat with Hair Nova on WhatsApp">
        <span className="wa-float-icon" aria-hidden="true">
          <span className="wa-float-ring" />
          <span className="wa-float-ring wa-float-ring-late" />
          <WhatsappLogo size={28} weight="fill" />
        </span>
        <span className="wa-float-label" aria-hidden="true">
          <small>Questions about stock?</small>
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  )
}
