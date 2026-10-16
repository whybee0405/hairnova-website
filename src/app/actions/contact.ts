'use server'

import { getPayloadClient } from '@/lib/payload'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (String(formData.get('company_website') || '').trim().length > 0) {
    return { status: 'success' }
  }

  if (!name || !email || !message) {
    return { status: 'error', message: 'Please fill in your name, email and message.' }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-messages',
      data: { name, email, phone: phone || undefined, message },
    })
    return { status: 'success' }
  } catch (error) {
    console.error('Contact message submission failed', error)
    return { status: 'error', message: 'Something went wrong on our end. Please try again, or email us directly.' }
  }
}
