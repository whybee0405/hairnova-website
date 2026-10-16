import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Our Story Page',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'heroEyebrow', type: 'text', defaultValue: 'Our story' },
            { name: 'heroHeadline', type: 'text', defaultValue: 'Sixteen years in Cosmo City.' },
            {
              name: 'heroSubhead',
              type: 'textarea',
              defaultValue:
                'Hair Nova is family owned and Asian-South African, making hairpieces, wigs, weaves and braids since 2009.',
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Story',
          fields: [
            { name: 'storyHeadline', type: 'text', defaultValue: 'Made here, made by us' },
            {
              name: 'storyBody',
              type: 'textarea',
              defaultValue:
                'Hair Nova started in Cosmo City, Johannesburg in 2009, built around a simple idea: salons and resellers deserve a manufacturer they can reach directly, not another link in a long import chain. Since then the business has stayed family owned, Asian-South African, and local, producing hairpieces, wigs, weaves and braids for a network of salons, resellers and distributors across the country.',
            },
            { name: 'craftImage', type: 'upload', relationTo: 'media' },
            {
              name: 'milestones',
              type: 'array',
              maxRows: 6,
              fields: [
                { name: 'year', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
              defaultValue: [
                { year: '2009', label: 'Founded in Cosmo City, Johannesburg' },
                { year: 'Since', label: 'Family owned, Asian-South African' },
                { year: 'Today', label: 'Supplying salons, resellers and distributors nationwide' },
              ],
            },
          ],
        },
        {
          label: 'Factory gallery',
          fields: [
            { name: 'factoryEyebrow', type: 'text', defaultValue: 'Inside the factory' },
            { name: 'factoryHeadline', type: 'text', defaultValue: 'No stock photos. This is the floor.' },
            {
              name: 'factoryGallery',
              type: 'array',
              maxRows: 10,
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Values',
          fields: [
            { name: 'valuesHeadline', type: 'text', defaultValue: 'What stays the same on every order' },
            {
              name: 'valuesPoints',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
              defaultValue: [
                {
                  title: 'Hand-finished, every time',
                  body: 'Sectioning, setting and finishing happen by hand before a piece ever reaches a carton.',
                },
                {
                  title: 'One factory, no middlemen',
                  body: 'Everything is made in our own workshop, not sourced and relabeled.',
                },
                {
                  title: 'A direct relationship',
                  body: 'When you call Hair Nova, you reach the people who actually make your stock.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
