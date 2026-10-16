import type { CollectionConfig } from 'payload'

export const WholesaleInquiries: CollectionConfig = {
  slug: 'wholesale-inquiries',
  labels: {
    singular: 'Wholesale Inquiry',
    plural: 'Wholesale Inquiries',
  },
  admin: {
    useAsTitle: 'businessName',
    defaultColumns: ['businessName', 'contactName', 'businessType', 'status', 'createdAt'],
    description: 'Leads submitted through the wholesale catalogue request form. This is the primary conversion goal of the site.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    create: () => true,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'contactName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'businessType',
      type: 'select',
      options: [
        { label: 'Salon', value: 'salon' },
        { label: 'Reseller / distributor', value: 'reseller' },
        { label: 'Retail store', value: 'retail' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'interestedLines',
      type: 'text',
      label: 'Interested product lines (optional)',
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
