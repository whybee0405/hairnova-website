'use server'

import { getPayloadClient } from '@/lib/payload'

export type WholesaleFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitWholesaleInquiry(
  _prevState: WholesaleFormState,
  formData: FormData,
): Promise<WholesaleFormState> {
  const businessName = String(formData.get('businessName') || '').trim()
  const contactName = String(formData.get('contactName') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const country = String(formData.get('country') || '').trim()
  const businessType = String(formData.get('businessType') || '').trim()
  const interestedLines = String(formData.get('interestedLines') || '').trim()
  const message = String(formData.get('message') || '').trim()

  // Honeypot field, bots fill every input; humans never see it.
  if (String(formData.get('company_website') || '').trim().length > 0) {
    return { status: 'success' }
  }

  if (!businessName || !contactName || !email) {
    return { status: 'error', message: 'Please fill in your business name, contact name and email.' }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'wholesale-inquiries',
      data: {
        businessName,
        contactName,
        email,
        phone: phone || undefined,
        country: country || undefined,
        businessType: (businessType || undefined) as
          | 'salon'
          | 'reseller'
          | 'retail'
          | 'other'
          | undefined,
        interestedLines: interestedLines || undefined,
        message: message || undefined,
      },
    })

    return { status: 'success' }
  } catch (error) {
    console.error('Wholesale inquiry submission failed', error)
    return {
      status: 'error',
      message: 'Something went wrong on our end. Please try again, or email us directly.',
    }
  }
}
