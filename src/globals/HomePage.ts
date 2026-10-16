import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroHeadline',
              type: 'text',
              defaultValue: 'Made in South Africa, by us.',
            },
            {
              name: 'heroSubhead',
              type: 'textarea',
              defaultValue:
                'A family-owned manufacturer of hairpieces, wigs, weaves and braids, supplying salons, resellers and distributors from Cosmo City, Johannesburg since 2009.',
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            {
              type: 'row',
              fields: [
                { name: 'heroPrimaryCtaLabel', type: 'text', defaultValue: 'Request wholesale catalogue' },
                { name: 'heroPrimaryCtaHref', type: 'text', defaultValue: '/wholesale' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'heroSecondaryCtaLabel', type: 'text', defaultValue: 'Explore textures' },
                { name: 'heroSecondaryCtaHref', type: 'text', defaultValue: '/products' },
              ],
            },
          ],
        },
        {
          label: 'Trust strip',
          fields: [
            {
              name: 'stats',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
              defaultValue: [
                { value: '2009', label: 'Manufacturing since' },
                { value: 'Cosmo City, JHB', label: 'Local South African factory' },
                { value: 'Family owned', label: 'Asian-South African heritage' },
              ],
            },
          ],
        },
        {
          label: 'UVP',
          fields: [
            { name: 'uvpHeadline', type: 'text', defaultValue: 'The manufacturer, not the middleman.' },
            { name: 'uvpImage', type: 'upload', relationTo: 'media', admin: { description: 'Real factory or warehouse photo shown beside the points.' } },
            { name: 'uvpImageCaption', type: 'text', defaultValue: 'Raw fibre on our factory floor, Cosmo City' },
            {
              name: 'uvpBody',
              type: 'textarea',
              defaultValue:
                'Most of what reaches salons and resellers in this category has passed through two or three hands first. Hair Nova makes it here, in Cosmo City, which means shorter lead times, consistent quality at scale, and a direct line to the people who actually produce your stock.',
            },
            {
              name: 'uvpPoints',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
              defaultValue: [
                {
                  title: 'Direct from the factory floor',
                  body: 'No import middlemen between your order and our workshop.',
                },
                {
                  title: 'Consistent at scale',
                  body: 'The same hand-finishing standard, whether it is one carton or one hundred.',
                },
                {
                  title: 'Family owned since 2009',
                  body: 'Asian-South African ownership, one factory, one standard for sixteen years.',
                },
              ],
            },
          ],
        },
        {
          label: 'Craft section',
          fields: [
            { name: 'craftEyebrow', type: 'text', defaultValue: 'How it is made' },
            { name: 'craftHeadline', type: 'text', defaultValue: 'Hands that make it.' },
            {
              name: 'craftBody',
              type: 'textarea',
              defaultValue:
                'Every piece moves through the same four stages in our Cosmo City workshop before it reaches a carton.',
            },
            {
              name: 'craftSteps',
              type: 'array',
              label: 'Process steps (scroll story)',
              minRows: 2,
              maxRows: 6,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
              ],
              defaultValue: [
                {
                  title: 'Section',
                  body: 'Bundles of fiber are separated and sorted by hand before a single strand is braided.',
                },
                {
                  title: 'Braid',
                  body: 'Each piece is sectioned and braided by hand, the same technique whether it is one order or one hundred.',
                },
                {
                  title: 'Set',
                  body: 'Textures that need it are finished with a hot-water set, the technique behind our Yaki and Olle lines.',
                },
                {
                  title: 'Check, then pack',
                  body: 'Every piece is checked by hand before it is packed, the last step before it leaves Cosmo City.',
                },
              ],
            },
          ],
        },
        {
          label: 'TikTok',
          fields: [
            { name: 'tiktokEyebrow', type: 'text', defaultValue: 'On TikTok' },
            { name: 'tiktokHeadline', type: 'text', defaultValue: 'See the textures move.' },
            {
              name: 'tiktokBody',
              type: 'textarea',
              defaultValue: 'Installs, swatches and behind-the-scenes from the Cosmo City workshop.',
            },
            {
              name: 'tiktokVideos',
              type: 'array',
              label: 'Videos',
              maxRows: 8,
              admin: {
                description:
                  'Paste links to individual TikTok videos (e.g. https://www.tiktok.com/@acehairmarketing_/video/123…). The cover and caption are pulled from TikTok automatically; the player only loads when a visitor taps play.',
              },
              fields: [
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  validate: (value: unknown) =>
                    typeof value === 'string' && /tiktok\.com\/.*\/video\/\d+/.test(value)
                      ? true
                      : 'Use a full TikTok video link containing /video/<id>.',
                },
                { name: 'caption', type: 'text', admin: { description: 'Optional. Overrides the TikTok caption.' } },
                {
                  name: 'cover',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Optional. Used if TikTok does not return a cover image.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Factory film',
          fields: [
            {
              name: 'factoryVideo',
              type: 'text',
              defaultValue: '/video/factory-reel.mp4',
              admin: { description: 'Path or URL to a short, muted MP4 loop. The statement image is used as its poster.' },
            },
            {
              name: 'statementHeadline',
              type: 'text',
              defaultValue: 'Not imported. Not relabeled. Made here.',
            },
            { name: 'statementImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Featured products',
          fields: [
            { name: 'featuredHeadline', type: 'text', defaultValue: 'Explore the textures' },
            {
              name: 'featuredBody',
              type: 'textarea',
              defaultValue: 'A working selection of what we manufacture. The full catalogue is larger.',
            },
          ],
        },
        {
          label: 'Wholesale CTA',
          fields: [
            { name: 'wholesaleCtaHeadline', type: 'text', defaultValue: 'Ready to stock Hair Nova?' },
            {
              name: 'wholesaleCtaBody',
              type: 'textarea',
              defaultValue:
                'Tell us about your business and we will send product information and a path to your first order.',
            },
            { name: 'wholesaleCtaButtonLabel', type: 'text', defaultValue: 'Request wholesale catalogue' },
          ],
        },
      ],
    },
  ],
}
