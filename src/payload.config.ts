import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { ContactMessages } from './collections/ContactMessages'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Users } from './collections/Users'
import { WholesaleInquiries } from './collections/WholesaleInquiries'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { HomePage } from './globals/HomePage'
import { ProductsPage } from './globals/ProductsPage'
import { SiteSettings } from './globals/SiteSettings'
import { TikTokConnection } from './globals/TikTokConnection'
import { WholesalePage } from './globals/WholesalePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    // Custom admin component paths (e.g. '/components/admin/...') resolve from src/.
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' - Hair Nova Admin',
    },
  },
  collections: [Users, Media, Products, WholesaleInquiries, ContactMessages],
  globals: [SiteSettings, HomePage, ProductsPage, WholesalePage, AboutPage, ContactPage, TikTokConnection],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'hairnova-dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:' + path.resolve(dirname, '../hairnova.db'),
    },
  }),
  sharp,
  cors: '*',
})
