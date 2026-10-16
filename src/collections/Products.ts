import type { CollectionConfig } from 'payload'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'productType', 'category', 'status', 'featured'],
    description:
      'The texture catalogue. No prices or invented specifications, this is a showcase for wholesale buyers and consumers, not a storefront.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            if (data?.name) return slugify(data.name)
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Coming soon', value: 'coming-soon' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature on homepage',
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers show first.' },
    },
    {
      name: 'productType',
      type: 'select',
      label: 'Product type',
      defaultValue: 'hair-piece',
      options: [
        { label: 'Hair piece', value: 'hair-piece' },
        { label: 'Weaving', value: 'weaving' },
        { label: 'Wig', value: 'wig' },
      ],
      admin: { description: 'Main catalogue category, used for the filters on the Products page.' },
    },
    {
      name: 'category',
      label: 'Texture',
      type: 'select',
      options: [
        { label: 'Braid', value: 'braid' },
        { label: 'Curl', value: 'curl' },
        { label: 'Twist', value: 'twist' },
      ],
    },
    {
      name: 'textureNote',
      type: 'text',
      label: 'Texture, one line',
      admin: { description: 'e.g. "Soft, loosely curled, voluminous"' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (D2C voice, warm and descriptive, no material or performance claims)',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
