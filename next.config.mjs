import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
