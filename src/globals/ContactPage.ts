import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  access: { read: () => true },
  fields: [
    { name: 'heroHeadline', type: 'text', defaultValue: 'Get in touch' },
    {
      name: 'heroSubhead',
      type: 'textarea',
      defaultValue:
        'General questions, press, or anything that is not a wholesale inquiry: reach us directly below.',
    },
    {
      name: 'wholesaleNudge',
      type: 'textarea',
      defaultValue: 'Looking to stock Hair Nova? Use the wholesale catalogue request instead, it reaches our sales team directly.',
    },
  ],
}
