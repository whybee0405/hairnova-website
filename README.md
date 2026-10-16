# Hair Nova — website

Next.js 16 (App Router) + Payload CMS 3, self-hosted on SQLite. Built to generate wholesale leads first, showcase the product catalogue second. Not an ecommerce store, no prices or invented specs anywhere on the site, matching the client's wholesale-first brand kit.

Project layout: the app lives at the repository root (`src/`, `public/`, `package.json`, ...). The local `references/` directory contains the client's raw brand/product asset dump. It is excluded from Git and the Docker build (see `.gitignore` and `.dockerignore`).

## Run it with Docker (recommended)

```bash
cp .env.example .env
# edit .env: set a real PAYLOAD_SECRET (openssl rand -base64 32), confirm WEB_PORT is free
docker compose up -d --build
```

Site on the server: `http://localhost:3090` (or whatever `WEB_PORT` you set)
Admin on the server: `http://localhost:3090/admin`

The intended external address is `http://102.202.192.19:3090`. The compose port is bound to `127.0.0.1` for server-only access, so this external address will not work until a reverse proxy or an explicitly configured public port exposes the site.

This host already runs several other Dockerized apps (or-optical, saka-dev, dainamo, hypernet, cloudia, pit-in-pos, ...) on ports in the 3020–3111 range. `3090` was free at the time this was set up; before deploying, double check with:

```bash
docker ps --format "{{.Names}}: {{.Ports}}"
```

and change `WEB_PORT` in `.env` if it's since been taken. The compose project is self-contained: its own network (`hairnova-website_default`), its own named volume (`hairnova_website_data`), its own container (`hairnova-website-web-1`), bound to `127.0.0.1` only by default, it won't collide with or be reachable outside this host unless you put a reverse proxy in front of it or change the port binding to `0.0.0.0`.

**First boot** seeds the named volume from `deployment-seed/` baked into the image (the product photography + pre-seeded catalogue and pages). The committed database contains no admin user or sessions. Visit `/admin` after first boot to create the first admin account. Every boot after that reuses what's already in the volume; a rebuild/redeploy never wipes admin edits or wholesale leads. See `docker-entrypoint.sh` if you want to see exactly how.

```bash
docker compose logs -f web      # tail logs
docker compose restart web      # restart, keeps volume data
docker compose down             # stop and remove the container (volume survives)
docker compose down -v          # stop and WIPE the volume too (rarely what you want)
```

## Run it locally without Docker

```bash
npm install
npm run dev
```

Site: http://localhost:3000
Admin: http://localhost:3000/admin

First run auto-creates `hairnova.db` (SQLite) and `media/` (uploads) at the project root, reading `PAYLOAD_SECRET`/`NEXT_PUBLIC_SERVER_URL` from the root `.env`. Nothing else to configure.

### Reseed from scratch

The Docker deployment snapshot ships seeded with products and pages, with no admin account. To reseed a clean local database, delete `hairnova.db` and `media/`, set `SEED_ADMIN_PASSWORD` in `.env`, then:

```bash
npm run seed
```

This creates the local admin login, uploads the real product photography from the local `references/` directory, uploads the five AI-placeholder craft photos, creates six products, and wires up the homepage/wholesale/about hero and craft images. The Docker image uses the committed `deployment-seed/` snapshot; updating that snapshot requires a separate, sanitized export.

**Admin login:** `admin@hairnova.local` with the password set in `SEED_ADMIN_PASSWORD` when seeding. Change any previously seeded default password in `/admin` before exposing the site to real traffic.

## What's editable in the CMS, without touching code

- **Site Settings** (global): logo, nav links, phone/email/address, social links, footer note.
- **Home / Wholesale / Our Story / Products / Contact Page** (globals): every headline, body copy, stat, FAQ item, process step and CTA label on each page.
- **Products** (collection): the texture catalogue. Add, reorder (`order` field), feature on the homepage, mark `coming-soon`, attach hero + gallery images.
- **Media**: re-upload any image. The five AI-generated placeholder images (see the table below) are flagged `isAiPlaceholder` — the site automatically shows a small "illustrative photography" caption under them. Uncheck that flag (and swap the file) once real factory photography exists, and the caption disappears on its own.
- **Wholesale Inquiries** / **Contact Messages** (collections, admin-only): every form submission lands here. This is the actual lead list, check it under Collections in `/admin`.

## Architecture notes

- **Styling**: Tailwind v4, CSS-first config in `src/app/(frontend)/globals.css`. All brand tokens (steel blue, cyan, cream, sand, charcoal, terracotta) are locked from `references/Brand Kit`, not invented.
- **Animation**: `motion/react` (Framer Motion). Scroll-reveals, a sticky scroll-story ("How it is made"), magnetic CTAs, 3D tilt on product/value cards, a clip-path hero entrance, and an ambient Ken Burns drift on full-bleed photography. Shared primitives live in `src/components/ui/` (`FullBleed`, `RevealImage`, `Magnetic`, `TiltCard`, `Marquee`, `Reveal`). Respects `prefers-reduced-motion` throughout.
- **Forms**: native React 19 `useActionState` + Next.js Server Actions (`src/app/actions/`), writing straight into Payload collections. No third-party form service, no API keys needed.
- **Images**: Payload's built-in upload collection (`sharp` resizing) with four responsive sizes per image. `next/image` everywhere, so images are responsive and lazy-loaded automatically.
- **Content freshness**: every frontend route is `force-dynamic`, server-rendered per request. An edit made in `/admin` is live on the next page load, no cache window, no redeploy.
- **Database**: SQLite via `@payloadcms/db-sqlite`. Path is `DATABASE_URI` (Docker sets this to the mounted volume) or falls back to `./hairnova.db` locally. For a production deploy at real scale, swap to `@payloadcms/db-postgres` (one config change in `src/payload.config.ts`); SQLite is the right call for a site this size and keeps hosting simple.
- **Media storage**: local filesystem, path is `MEDIA_DIR` (Docker sets this to the mounted volume) or falls back to `./media` locally.

## Factory photography and video

All factory, workshop and warehouse imagery is now **real**: Sony ZV-E10 photos and 4K clips shot at the Hair Nova factory (source: `D:\Social Media Content\Hair Nova\04-Manufacturing-And-Warehouse`). Photos were colour-graded for the web (exposure recovery, gentle local contrast, warm grade toward the cream palette) and the web-ready copies are kept in `references/04-Manufacturing-Web-Graded/`.

| Where | What |
|---|---|
| Home, "How it is made" | Five real stages: winding line, hot-water set, hackling comb, hand finishing, branded cartons |
| Home, factory film (`#factory`) | `public/video/factory-reel.mp4`, a 16s graded montage of six clips (720p, muted, lazy-loaded, plays only in view). Poster = Home Page → Factory film → statement image |
| Home, "Meet your maker" | Raw fibre on pallets, waiting for production |
| Our Story | Team on the packing floor (hero), hands finishing a braid (story), factory filmstrip (Our Story Page → Factory gallery) |
| Wholesale | Branded cartons (hero), EZ 2 Braid cartons beside the reasons |
| Products | Real retail packaging added to Miracle, EZ Lexi, EZ 2 Braid and Yaki galleries; Miracle's hero is now its real packaging |

The five original AI placeholders are no longer used anywhere on the site but remain in Media (flagged `isAiPlaceholder`) until someone deletes them in `/admin`.

## TikTok feed (live from the account)

The homepage TikTok section shows the latest videos from the connected TikTok account via TikTok's official **Display API** (Login Kit + `video.list`). Until an account is connected it falls back to the links pasted in **Home Page → TikTok**.

How it works: an admin opens **Admin → TikTok Connection → Connect TikTok account**, approves on TikTok, and the tokens are stored server-side in that (admin-only) global. They are never returned by the REST/GraphQL APIs. The site fetches the latest 20 videos at most every 15 minutes, refreshes the 24-hour access token by itself, and if TikTok is unreachable keeps showing the last good videos. TikTok's refresh token lasts about a year, so the panel shows a **Reconnect before** date. Code: `src/lib/tiktok.ts`, routes under `src/app/connect/tiktok/`, admin panel `src/components/admin/TikTokConnectPanel.tsx`.

One-time setup:

1. The site needs its **public HTTPS domain** first (see gap 6 below). Set `NEXT_PUBLIC_SERVER_URL` to it.
2. At [developers.tiktok.com](https://developers.tiktok.com), create an app, add **Login Kit** and the **Display API** product (scopes `user.info.basic` and `video.list`), and register the redirect URI `https://<your-domain>/connect/tiktok/callback`. TikTok reviews apps before they go live and asks for a privacy policy and terms URL on your domain.
3. Put the app's keys in `.env` as `TIKTOK_CLIENT_KEY` / `TIKTOK_CLIENT_SECRET` and run `docker compose up -d`.
4. Sign in to `/admin`, open **TikTok Connection**, click **Connect TikTok account**, and log in with the Hair Nova TikTok account.

## Known gaps to close before this goes live

1. **Factory and workshop photography**: done, real photos and video now (see above).
2. **Five catalogue SKUs have no delivered photography** (Phondo, Spring Twist, Sharnell, Italian Curl, Milano Curl) and **Curly Pop has packaging only, no product photos** — all were deliberately left out of the seeded catalogue rather than faked. Add them once real photography exists.
3. **No pricing or MOQ anywhere**, by design, per the brand kit. The wholesale form is the conversion path; pricing stays a sales conversation.
4. **Admin password** is a placeholder, change it before any real traffic hits this site.
5. **Email notifications**: wholesale/contact submissions currently only land in `/admin`, nobody gets emailed. Add a Payload email adapter (`@payloadcms/email-nodemailer` or Resend) in `src/payload.config.ts` plus a hook on both collections if the team wants an email the moment a lead comes in.
6. **HTTPS / public domain**: the compose setup binds to `127.0.0.1` on the host. Put this behind whatever reverse proxy (Traefik, nginx, Caddy) fronts the other apps on this host once there's a real domain for it, and move `NEXT_PUBLIC_SERVER_URL` to that domain.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build (expects `.next/standalone`-free local build, see `npm run build`) |
| `npm run seed` | Seed a clean database |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after changing a collection/global |
| `docker compose up -d --build` | Build and run in Docker |
| `docker compose logs -f web` | Tail container logs |
| `docker compose down` | Stop the container (keeps the data volume) |
