import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const REFS = path.resolve(dirname, '../../references')
const PLACEHOLDERS = path.resolve(dirname, './images/placeholders')

function fileToUpload(absPath: string) {
  const data = fs.readFileSync(absPath)
  const name = path.basename(absPath)
  const ext = path.extname(absPath).toLowerCase()
  const mimetype = ext === '.png' ? 'image/png' : ext === '.jpeg' || ext === '.jpg' ? 'image/jpeg' : 'image/png'
  return { data, mimetype, name, size: data.length }
}

async function run() {
  const payload = await getPayload({ config })

  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs > 0) {
    console.log('Seed skipped, users already exist. Database already seeded.')
    process.exit(0)
  }

  console.log('Seeding Hair Nova CMS...')

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@hairnova.local'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD
  if (!adminPassword) throw new Error('Set SEED_ADMIN_PASSWORD before running the seed script.')

  await payload.create({
    collection: 'users',
    data: { email: adminEmail, password: adminPassword, roles: ['admin'] },
  })
  console.log(`Admin user created -> ${adminEmail}`)

  async function media(
    absPath: string,
    alt: string,
    opts: { isAiPlaceholder?: boolean; caption?: string } = {},
  ) {
    const doc = await payload.create({
      collection: 'media',
      data: { alt, isAiPlaceholder: opts.isAiPlaceholder ?? false, caption: opts.caption },
      file: fileToUpload(absPath),
    })
    return doc
  }

  // Brand asset
  const logo = await media(path.join(REFS, '00-Brand-Assets/hairnova-logo-export.png'), 'Hair Nova logo')

  // AI placeholder craft imagery
  const craftHands = await media(
    path.join(PLACEHOLDERS, 'craft-hands-detail.png'),
    'Illustrative close-up of hands braiding synthetic hair fiber',
    { isAiPlaceholder: true },
  )
  const craftSectioning = await media(
    path.join(PLACEHOLDERS, 'craft-sectioning.png'),
    'Illustrative photo of hands sectioning bundles of braiding hair fiber',
    { isAiPlaceholder: true },
  )
  const craftWaterSetting = await media(
    path.join(PLACEHOLDERS, 'craft-water-setting.png'),
    'Illustrative photo of a braid being dipped in warm water to set the texture',
    { isAiPlaceholder: true },
  )
  const craftQualityCheck = await media(
    path.join(PLACEHOLDERS, 'craft-quality-check.png'),
    'Illustrative photo of a finished braid being checked beside packaging material',
    { isAiPlaceholder: true },
  )
  const craftWorkshopWide2 = await media(
    path.join(PLACEHOLDERS, 'craft-workshop-wide.png'),
    'Illustrative wide photo of a hair-braiding workshop interior',
    { isAiPlaceholder: true },
  )

  // Product photography
  const havana = [
    await media(path.join(REFS, '02-Products/Havana-Curl/havana-curl-photo-02.jpeg'), 'Havana Curl, styled high ponytail'),
    await media(path.join(REFS, '02-Products/Havana-Curl/havana-curl-photo-01.jpeg'), 'Havana Curl texture detail'),
    await media(path.join(REFS, '02-Products/Havana-Curl/havana-curl-photo-03.jpeg'), 'Havana Curl styled look'),
    await media(path.join(REFS, '02-Products/Havana-Curl/havana-curl-photo-04.jpeg'), 'Havana Curl styled look'),
  ]

  const yaki = [
    await media(
      path.join(REFS, '02-Products/Yaki-Braid/Packaging-And-Braid-Photos/yaki-braid-photo-01.png'),
      'Yaki Braid texture, waist length',
    ),
    await media(
      path.join(REFS, '02-Products/Yaki-Braid/Packaging-And-Braid-Photos/yaki-braid-photo-02.png'),
      'Yaki Braid texture detail',
    ),
    await media(
      path.join(REFS, '02-Products/Yaki-Braid/Packaging-And-Braid-Photos/yaki-braid-photo-03.png'),
      'Yaki Braid styled look',
    ),
  ]

  const frenchCurl = [
    await media(
      path.join(REFS, '02-Products/French-Curl/24-Inch/french-curl-24in-render-photo-01.png'),
      'French Curl, 24 inch length',
    ),
    await media(
      path.join(REFS, '02-Products/French-Curl/24-Inch/french-curl-24in-render-photo-02.png'),
      'French Curl texture detail',
    ),
    await media(
      path.join(REFS, '02-Products/French-Curl/14-Inch/french-curl-14in-render-photo-01.png'),
      'French Curl, 14 inch length',
    ),
  ]

  const ez2Braid = [
    await media(
      path.join(REFS, '02-Products/EZ2Braid-Straight/ez2braid-straight-render-photo-01.png'),
      'EZ 2 Braid, straight finish',
    ),
    await media(
      path.join(REFS, '02-Products/EZ2Braid-Straight/ez2braid-straight-render-photo-02.png'),
      'EZ 2 Braid texture detail',
    ),
    await media(
      path.join(REFS, '02-Products/EZ2Braid-Curly/ez2braid-curly-render-photo-01.png'),
      'EZ 2 Braid, curly finish',
    ),
  ]

  const ezLexi = [
    await media(
      path.join(REFS, '02-Products/EZ-Lexi-Braid/ez-lexi-braid-render-photo-01.png'),
      'EZ Lexi Braid texture',
    ),
    await media(
      path.join(REFS, '02-Products/EZ-Lexi-Braid/ez-lexi-braid-render-photo-02.png'),
      'EZ Lexi Braid styled look',
    ),
  ]

  const miracle = [
    await media(
      path.join(REFS, '02-Products/Miracle-Braid/miracle-braid-concept-photo-02.png'),
      'Miracle Hot Water Braid, long braids finished with curly purple ends',
    ),
    await media(
      path.join(REFS, '02-Products/Miracle-Braid/miracle-braid-concept-photo-01.png'),
      'Miracle Braid, early concept render',
      { caption: 'Early concept render. Final texture and styling to be confirmed before launch.' },
    ),
  ]

  const products = [
    {
      name: 'Havana Curl',
      slug: 'havana-curl',
      category: 'curl' as const,
      status: 'available' as const,
      featured: true,
      order: 1,
      textureNote: 'Loosely curled, voluminous, Cuban-twist texture',
      description:
        'Meet Havana Curl. A loosely curled, voluminous texture built for twist-outs and protective styles, explore it and make the look your own.',
      heroImage: havana[0].id,
      gallery: havana.slice(1).map((m) => ({ image: m.id })),
    },
    {
      name: 'Yaki Braid',
      slug: 'yaki-braid',
      category: 'braid' as const,
      status: 'available' as const,
      featured: true,
      order: 2,
      textureNote: 'Relaxed, blow-dried finish with gentle texture',
      description:
        'Yaki Braid mimics the finish of relaxed, blow-dried natural hair. A straight texture with gentle movement, hot-water set for a lasting hold.',
      heroImage: yaki[0].id,
      gallery: yaki.slice(1).map((m) => ({ image: m.id })),
    },
    {
      name: 'French Curl',
      slug: 'french-curl',
      category: 'curl' as const,
      status: 'available' as const,
      featured: true,
      order: 3,
      textureNote: 'Soft, loosely pre-styled curl, sectioned for faster installs',
      description:
        'French Curl brings a soft, loosely pre-styled curl, pre-sectioned to cut install time without losing the finished look.',
      heroImage: frenchCurl[0].id,
      gallery: frenchCurl.slice(1).map((m) => ({ image: m.id })),
    },
    {
      name: 'EZ 2 Braid',
      slug: 'ez-2-braid',
      category: 'braid' as const,
      status: 'available' as const,
      featured: true,
      order: 4,
      textureNote: 'Pre-separated, pre-fluffed, straight or curly finish',
      description:
        'EZ 2 Braid is pre-separated and pre-fluffed to speed up install time, available in a straight or curly finish for Senegalese twists and classic braids.',
      heroImage: ez2Braid[0].id,
      gallery: ez2Braid.slice(1).map((m) => ({ image: m.id })),
    },
    {
      name: 'EZ Lexi Braid',
      slug: 'ez-lexi-braid',
      category: 'braid' as const,
      status: 'available' as const,
      featured: false,
      order: 5,
      textureNote: 'Lightweight, pre-looped braiding hair',
      description:
        'EZ Lexi Braid is a lightweight, pre-looped braiding hair built for quicker, more comfortable installs.',
      heroImage: ezLexi[0].id,
      gallery: ezLexi.slice(1).map((m) => ({ image: m.id })),
    },
    {
      name: 'Miracle Hot Water Braid',
      slug: 'miracle-hot-water-braid',
      category: 'curl' as const,
      status: 'coming-soon' as const,
      featured: false,
      order: 6,
      textureNote: 'In development, texture and finish to be confirmed',
      description:
        'Miracle Hot Water Braid is in development. Details, texture and finish will be confirmed closer to launch.',
      heroImage: miracle[0].id,
      gallery: miracle.slice(1).map((m) => ({ image: m.id })),
    },
  ]

  for (const p of products) {
    await payload.create({ collection: 'products', data: p })
    console.log(`Product created: ${p.name}`)
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      logo: logo.id,
      socials: [
        { platform: 'Instagram', url: 'https://instagram.com/hairnova_southafrica' },
        { platform: 'TikTok', url: 'https://tiktok.com/@acehairmarketing_' },
        { platform: 'Facebook', url: 'https://facebook.com/HairNovaMarketingPage' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      heroImage: frenchCurl[0].id,
      craftSteps: [
        {
          title: 'Section',
          body: 'Bundles of fiber are separated and sorted by hand before a single strand is braided.',
          image: craftSectioning.id,
        },
        {
          title: 'Braid',
          body: 'Each piece is sectioned and braided by hand, the same technique whether it is one order or one hundred.',
          image: craftHands.id,
        },
        {
          title: 'Set',
          body: 'Textures that need it are finished with a hot-water set, the technique behind our Yaki and Olle lines.',
          image: craftWaterSetting.id,
        },
        {
          title: 'Check, then pack',
          body: 'Every piece is checked by hand before it is packed, the last step before it leaves Cosmo City.',
          image: craftQualityCheck.id,
        },
      ],
      statementImage: craftWorkshopWide2.id,
    },
  })

  await payload.updateGlobal({
    slug: 'wholesale-page',
    data: {
      heroImage: ezLexi[0].id,
    },
  })

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      heroImage: frenchCurl[2].id,
      craftImage: craftHands.id,
    },
  })

  console.log('Seed complete.')
  process.exit(0)
}

run().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
