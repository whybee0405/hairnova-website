import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <section className="flex min-h-[60dvh] items-center py-20">
      <Container className="flex flex-col items-center gap-5 text-center">
        <span className="font-display text-6xl font-semibold text-steel-700">404</span>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Page not found</h1>
        <p className="max-w-sm text-[15px] text-charcoal-900/65">
          The page you are looking for does not exist, or may have moved.
        </p>
        <Button href="/" variant="primary">
          Back to home
        </Button>
      </Container>
    </section>
  )
}
