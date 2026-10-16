'use client'

import { CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { useActionState } from 'react'

import { submitContactMessage, type ContactFormState } from '@/app/actions/contact'

const initialState: ContactFormState = { status: 'idle' }

const inputClasses =
  'w-full rounded-[var(--radius-control)] border border-charcoal-900/40 bg-white px-4 py-3 text-[16px] text-charcoal-900 placeholder:text-charcoal-900/35 transition-colors focus:border-steel-600 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-steel-600'

const labelClasses = 'text-[13.5px] font-semibold text-charcoal-900/80'

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[var(--radius-panel)] bg-cream-100 px-8 py-14 text-center">
        <CheckCircle size={40} weight="fill" className="text-cyan-600" />
        <h3 className="font-display text-xl font-semibold text-charcoal-900">Message sent</h3>
        <p className="max-w-sm text-[15px] leading-relaxed text-charcoal-900/70">
          Thank you for reaching out. We will get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="c-name" className={labelClasses}>
          Name <span className="text-terracotta-600">*</span>
        </label>
        <input id="c-name" name="name" type="text" required className={inputClasses} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="c-email" className={labelClasses}>
            Email <span className="text-terracotta-600">*</span>
          </label>
          <input id="c-email" name="email" type="email" required className={inputClasses} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="c-phone" className={labelClasses}>
            Phone
          </label>
          <input id="c-phone" name="phone" type="tel" className={inputClasses} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="c-message" className={labelClasses}>
          Message <span className="text-terracotta-600">*</span>
        </label>
        <textarea id="c-message" name="message" rows={5} required className={inputClasses} />
      </div>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="c-company_website">Leave this field empty</label>
        <input id="c-company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-[var(--radius-control)] bg-terracotta-600/10 px-4 py-3 text-[14px] text-terracotta-700"
        >
          <WarningCircle size={18} className="mt-0.5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] bg-cyan-500 px-6 py-3.5 text-[15px] font-semibold text-charcoal-900 transition-[transform,background-color] duration-150 ease-out hover:bg-cyan-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}
