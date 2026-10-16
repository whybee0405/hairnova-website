import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: () => true },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Primary navigation',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Wholesale', href: '/wholesale' },
        { label: 'Our Story', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      name: 'navCtaLabel',
      type: 'text',
      defaultValue: 'Request wholesale catalogue',
    },
    {
      name: 'navCtaHref',
      type: 'text',
      defaultValue: '/wholesale',
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', defaultValue: '+27 10 001 3676' },
        { name: 'email', type: 'email', defaultValue: 'accounts@hairnova.co.za' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'whatsappNumber',
          type: 'text',
          defaultValue: '27000000000',
          admin: { description: 'Floating WhatsApp button. International format, digits only (e.g. 27821234567). Placeholder until the real number is added.' },
        },
        {
          name: 'whatsappMessage',
          type: 'text',
          defaultValue: "Hi Hair Nova, I'd like to find out about stocking your products.",
          admin: { description: 'Pre-filled message when the chat opens.' },
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      defaultValue: 'Cosmo Business Park, Cosmo City, Johannesburg, South Africa',
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: ['Instagram', 'Facebook', 'TikTok', 'WhatsApp'],
          required: true,
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'footerNote',
      type: 'textarea',
      defaultValue:
        'Hair Nova is family owned and Asian-South African. It has made hairpieces, wigs, weaves and braids in Cosmo City, Johannesburg since 2009.',
    },
  ],
}
