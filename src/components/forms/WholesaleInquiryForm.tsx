'use client'

import { CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { useActionState } from 'react'

import { submitWholesaleInquiry, type WholesaleFormState } from '@/app/actions/wholesale'

const initialState: WholesaleFormState = { status: 'idle' }

const inputClasses =
  'w-full rounded-[var(--radius-control)] border border-charcoal-900/40 bg-white px-4 py-3 text-[16px] text-charcoal-900 placeholder:text-charcoal-900/35 transition-colors focus:border-steel-600 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-steel-600'

const labelClasses = 'text-[13.5px] font-semibold text-charcoal-900/80'

export function WholesaleInquiryForm() {
  const [state, formAction, pending] = useActionState(submitWholesaleInquiry, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[var(--radius-panel)] bg-cream-100 px-8 py-14 text-center">
        <CheckCircle size={40} weight="fill" className="text-cyan-600" />
        <h3 className="font-display text-xl font-semibold text-charcoal-900">Request received</h3>
        <p className="max-w-sm text-[15px] leading-relaxed text-charcoal-900/70">
          Thank you. Our team will follow up by email, usually within one to two working days, with product
          information and next steps.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="businessName" className={labelClasses}>
            Business name <span className="text-terracotta-600">*</span>
          </label>
          <input id="businessName" name="businessName" type="text" required className={inputClasses} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contactName" className={labelClasses}>
            Contact name <span className="text-terracotta-600">*</span>
          </label>
          <input id="contactName" name="contactName" type="text" required className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClasses}>
            Email <span className="text-terracotta-600">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className={labelClasses}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="country" className={labelClasses}>
            Country / city
          </label>
          <input id="country" name="country" type="text" className={inputClasses} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="businessType" className={labelClasses}>
            Business type
          </label>
          <select id="businessType" name="businessType" className={inputClasses} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option value="salon">Salon</option>
            <option value="reseller">Reseller / distributor</option>
            <option value="retail">Retail store</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="interestedLines" className={labelClasses}>
          Product lines you are interested in
        </label>
        <input
          id="interestedLines"
          name="interestedLines"
          type="text"
          placeholder="e.g. Yaki Braid, Havana Curl"
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={labelClasses}>
          Anything else we should know
        </label>
        <textarea id="message" name="message" rows={4} className={inputClasses} />
      </div>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
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
        {pending ? 'Sending...' : 'Request wholesale catalogue'}
      </button>

      <p className="text-[12.5px] text-charcoal-900/70">
        Fields marked <span className="text-terracotta-600">*</span> are required. We never share your details.
      </p>
    </form>
  )
}
