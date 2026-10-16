/**
 * wa.me link for the Site Settings WhatsApp number, or null while it is unset
 * or still the all-zero placeholder, so no dead chat buttons go live.
 */
export function whatsappHref(number?: string | null, message?: string | null): string | null {
  const digits = (number ?? '').replace(/\D/g, '')
  if (digits.length < 9 || /^27?0+$/.test(digits)) return null
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}
