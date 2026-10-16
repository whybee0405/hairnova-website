import type { GlobalConfig } from 'payload'

export const WholesalePage: GlobalConfig = {
  slug: 'wholesale-page',
  label: 'Wholesale Page',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'heroEyebrow', type: 'text', defaultValue: 'Wholesale' },
            {
              name: 'heroHeadline',
              type: 'text',
              defaultValue: 'Source directly from the manufacturer.',
            },
            {
              name: 'heroSubhead',
              type: 'textarea',
              defaultValue:
                'Hairpieces, wigs, weaves and braids, made in Cosmo City, Johannesburg since 2009. Request our wholesale catalogue and a member of our team will follow up.',
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Why partner',
          fields: [
            { name: 'whyHeadline', type: 'text', defaultValue: 'Why salons and resellers stock Hair Nova' },
            { name: 'whyImage', type: 'upload', relationTo: 'media', admin: { description: 'Real warehouse or packaging photo beside the reasons.' } },
            {
              name: 'whyPoints',
              type: 'array',
              maxRows: 6,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Shown behind this row while a visitor hovers over it.' },
                },
                {
                  name: 'icon',
                  type: 'select',
                  options: ['factory', 'package', 'handshake', 'clock', 'shield', 'leaf'],
                  defaultValue: 'factory',
                },
              ],
              defaultValue: [
                {
                  title: 'One factory, one standard',
                  body: 'Every order ships from the same Cosmo City workshop, so quality does not drift between batches.',
                  icon: 'factory',
                },
                {
                  title: 'Built for repeat ordering',
                  body: 'Clear product lines and consistent packaging make reordering straightforward for your team.',
                  icon: 'package',
                },
                {
                  title: 'A direct relationship',
                  body: 'You deal with the people who make the product, not an import agent several steps removed.',
                  icon: 'handshake',
                },
                {
                  title: 'Local lead times',
                  body: 'Manufactured in South Africa, which means shorter, more predictable turnaround than overseas import stock.',
                  icon: 'clock',
                },
                {
                  title: 'Family owned since 2009',
                  body: 'Sixteen years in the same category, under the same ownership.',
                  icon: 'shield',
                },
              ],
            },
          ],
        },
        {
          label: 'Process',
          fields: [
            { name: 'processHeadline', type: 'text', defaultValue: 'How it works' },
            {
              name: 'processSteps',
              type: 'array',
              maxRows: 5,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
              defaultValue: [
                {
                  title: 'Tell us about your business',
                  body: 'Share a few details about your salon, store or distribution network using the form below.',
                },
                {
                  title: 'We send product information',
                  body: 'Our team follows up with the current catalogue, available lines and next steps for your region.',
                },
                {
                  title: 'Place your first order',
                  body: 'Once details are confirmed, we get your first order into production.',
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            { name: 'faqHeadline', type: 'text', defaultValue: 'Questions buyers ask' },
            {
              name: 'faqItems',
              type: 'array',
              maxRows: 10,
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
              defaultValue: [
                {
                  question: 'Where is Hair Nova based?',
                  answer:
                    'Our workshop is in Cosmo Business Park, Cosmo City, Johannesburg. We manufacture locally rather than importing finished stock.',
                },
                {
                  question: 'Who do you supply?',
                  answer:
                    'Salons, resellers and distributors. If you are buying for your own retail or salon business, the form below is the right place to start.',
                },
                {
                  question: 'Do you ship outside South Africa?',
                  answer:
                    'Tell us your location in the form and our team will confirm what is possible for your region.',
                },
                {
                  question: 'What happens after I submit the form?',
                  answer:
                    'A member of our team reviews every inquiry and follows up by email or phone with product information and next steps.',
                },
              ],
            },
          ],
        },
        {
          label: 'Form',
          fields: [
            { name: 'formHeadline', type: 'text', defaultValue: 'Request the wholesale catalogue' },
            {
              name: 'formIntro',
              type: 'textarea',
              defaultValue:
                "Tell us about your business below. We reply to every inquiry, usually within one to two working days.",
            },
          ],
        },
      ],
    },
  ],
}
