import type { HomePage } from '@/payload-types'
import { Container } from '@/components/ui/Container'

export function TrustStrip({ data }: { data: HomePage }) {
  return <section className="provenance-strip" aria-label="Our origins"><Container className="provenance-inner" data-reveal="stagger">
    {(data.stats ?? []).map(stat => <div key={stat.id ?? stat.label}><span>{stat.label}</span><strong>{stat.value}</strong></div>)}
  </Container></section>
}
