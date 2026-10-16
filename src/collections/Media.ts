import path from 'path'
import type { CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'isAiPlaceholder', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for screen readers and SEO.',
      },
    },
    {
      name: 'isAiPlaceholder',
      type: 'checkbox',
      defaultValue: false,
      label: 'AI-generated placeholder',
      admin: {
        description:
          'Per the brand kit, AI-generated craft/factory imagery must be clearly labeled and replaced with real photography before commercial use. Checking this displays a small "illustrative" caption on the live site.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption shown under the image on the site.',
      },
    },
  ],
  upload: {
    staticDir: process.env.MEDIA_DIR || path.resolve(dirname, '../../media'),
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 800, height: 1000, position: 'centre' },
      { name: 'wide', width: 1600, height: 1000, position: 'centre' },
      { name: 'hero', width: 2000, height: 2500, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}
