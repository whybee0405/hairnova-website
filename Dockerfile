# Hair Nova — Next.js 16 + Payload CMS 3, self-hosted on SQLite.
# Multi-stage build producing a slim standalone runtime image.

# ---- deps: install once, reused by the build stage ----
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: compile the Next.js app ----
FROM node:22-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runner: minimal runtime image ----
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

# Next.js standalone server + static assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Deployment seed snapshot: the product photography and pre-seeded SQLite schema.
# The snapshot has no admin account or session. The entrypoint copies this into the
# runtime volumes on first boot only, never overwriting existing volume data,
# so a redeploy never clobbers admin edits or new wholesale leads.
COPY deployment-seed/hairnova.db ./seed-data/hairnova.db
COPY deployment-seed/media ./seed-data/media

COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh \
  && mkdir -p /app/data/media \
  && chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
