import { TextReveal } from '@/components/magicui/text-reveal'

/** Scroll-driven word-by-word statement — a single deliberate reading moment. */
export function StatementBand() {
  return (
    <section className="border-t border-border-subtle bg-bg-surface/20">
      <TextReveal>
        I turn messy spreadsheets into decisions leaders actually trust — dashboards,
        pipelines, and models built to hold up in production.
      </TextReveal>
    </section>
  )
}
