import type { GlobalConfig } from 'payload'

/**
 * Admin-only store for the connected TikTok account. Tokens are `hidden`, so
 * they never leave the server through the REST/GraphQL APIs or the admin UI;
 * only src/lib/tiktok.ts reads them via the local API.
 */
export const TikTokConnection: GlobalConfig = {
  slug: 'tiktok-connection',
  label: 'TikTok Connection',
  admin: {
    description:
      'Connect the Hair Nova TikTok account so the homepage shows its latest videos automatically. While no account is connected, the curated links in Home Page → TikTok are used instead.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'connectionPanel',
      type: 'ui',
      admin: { components: { Field: '/components/admin/TikTokConnectPanel#TikTokConnectPanel' } },
    },
    { name: 'displayName', type: 'text', admin: { readOnly: true } },
    { name: 'connectedAt', type: 'date', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'lastSyncAt', type: 'date', label: 'Last synced', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'lastError', type: 'text', admin: { readOnly: true } },
    { name: 'refreshTokenExpiresAt', type: 'date', label: 'Reconnect before', admin: { readOnly: true, date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } } },
    { name: 'openId', type: 'text', hidden: true },
    { name: 'scope', type: 'text', hidden: true },
    { name: 'accessToken', type: 'text', hidden: true },
    { name: 'accessTokenExpiresAt', type: 'date', hidden: true },
    { name: 'refreshToken', type: 'text', hidden: true },
    { name: 'cachedVideos', type: 'json', hidden: true },
  ],
}
