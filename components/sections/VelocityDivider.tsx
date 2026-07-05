'use client'

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '@/components/magicui/scroll-based-velocity'

const KEYWORDS = [
  'Power BI',
  'Python',
  'SQL',
  'Machine Learning',
  'DAX',
  'Pandas',
  'Data Storytelling',
  'FastAPI',
]

function Strip() {
  return (
    <span className="inline-flex items-center">
      {KEYWORDS.map((word) => (
        <span key={word} className="inline-flex items-center">
          <span className="mx-6">{word}</span>
          <span className="text-accent-primary">·</span>
        </span>
      ))}
    </span>
  )
}

/** Full-width scroll-velocity keyword ticker used as a section divider. */
export function VelocityDivider() {
  return (
    <section
      aria-hidden="true"
      className="relative flex w-full flex-col items-center justify-center gap-1 overflow-hidden border-y border-border-subtle bg-bg-surface/30 py-10"
    >
      <ScrollVelocityContainer className="text-3xl font-bold text-text-primary/70 md:text-5xl">
        <ScrollVelocityRow baseVelocity={5} direction={1} className="py-1">
          <Strip />
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={5} direction={-1} className="py-1">
          <Strip />
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-bg-base to-transparent" />
    </section>
  )
}
