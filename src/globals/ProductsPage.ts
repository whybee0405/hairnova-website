import type { GlobalConfig } from 'payload'

export const ProductsPage: GlobalConfig = {
  slug: 'products-page',
  label: 'Products Page',
  access: { read: () => true },
  fields: [
    { name: 'heroEyebrow', type: 'text', defaultValue: 'Catalogue' },
    { name: 'heroHeadline', type: 'text', defaultValue: 'The textures we manufacture.' },
    {
      name: 'heroSubhead',
      type: 'textarea',
      defaultValue:
        'A working view of our range. Full specifications, lengths and pricing are shared directly with wholesale buyers.',
    },
    {
      name: 'wholesaleNudge',
      type: 'text',
      defaultValue: 'Buying for a salon or store?',
    },
  ],
}
