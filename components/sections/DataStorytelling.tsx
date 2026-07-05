'use client'

import { Reveal } from '@/components/shared/Reveal'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Database, Filter, BarChart3, Presentation } from 'lucide-react'

const STEPS = [
  { icon: Database, title: 'Raw Data', desc: 'Messy, incomplete transactional and product data across multiple sources.' },
  { icon: Filter, title: 'Clean & Model', desc: 'Python/Pandas pipelines, SQL transforms, and DAX modeling for reliable inputs.' },
  { icon: BarChart3, title: 'Analyze', desc: 'EDA, cohort analysis, and anomaly detection to surface the real signal.' },
  { icon: Presentation, title: 'Decide', desc: 'Clear dashboards and narratives leadership can act on with confidence.' },
]

export function DataStorytelling() {
  return (
    <section id="storytelling" className="section border-t border-border-subtle bg-dots">
      <div className="container-x">
        <SectionHeader
          eyebrow="// 10. Data Storytelling"
          title="From raw rows to the boardroom"
          description="Every project follows the same arc — data only matters when it changes a decision."
          align="center"
        />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-border-muted lg:block" />
          <div className="grid gap-8 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} className="relative text-center">
                <div className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full border border-border-muted bg-bg-elevated">
                  <step.icon className="h-7 w-7 text-accent-primary" aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-accent-primary font-mono text-xs font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
