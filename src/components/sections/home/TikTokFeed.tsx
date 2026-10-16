import type { HomePage, SiteSetting } from '@/payload-types'
import { ArrowUpRight, TiktokLogo } from '@phosphor-icons/react/dist/ssr'

import { Container } from '@/components/ui/Container'
import { getCuratedTikToks } from '@/lib/socialFeed'
import { getTikTokPosts } from '@/lib/tiktok'

import { SocialVideo } from './SocialVideo'

const FALLBACK_PROFILE = 'https://www.tiktok.com/@acehairmarketing_'

export async function TikTokFeed({ data, settings }: { data: HomePage; settings: SiteSetting }) {
  // A connected account (TikTok Connection global) wins; curated links are the fallback.
  const posts = (await getTikTokPosts(8)) ?? (await getCuratedTikToks(data.tiktokVideos))
  const profile = settings.socials?.find((s) => s.platform === 'TikTok')?.url || FALLBACK_PROFILE
  const handle = profile.match(/@[\w.]+/)?.[0] ?? '@hairnova'

  return (
    // With no videos yet the section collapses to a compact follow strip rather than an empty band.
    <section className={`social-feed ${posts.length ? '' : 'is-compact'}`} aria-labelledby="tiktok-title">
      <Container>
        <div className="social-feed-heading">
          <div data-reveal="up">
            <span className="section-index">{data.tiktokEyebrow}</span>
            <h2 id="tiktok-title">{data.tiktokHeadline}</h2>
            {data.tiktokBody && <p>{data.tiktokBody}</p>}
          </div>
          <a href={profile} target="_blank" rel="noreferrer" className="social-follow" data-reveal="up">
            <TiktokLogo size={20} weight="fill" aria-hidden="true" />
            <span>Follow {handle}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        {posts.length > 0 && (
          <div className="social-track" data-reveal="stagger">
            {posts.map((post, i) => (
              <SocialVideo key={post.id} post={post} label={post.caption ?? `Hair Nova on TikTok, video ${i + 1}`} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
