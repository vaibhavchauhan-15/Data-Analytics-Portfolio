'use client'

import { Trophy } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { achievements } from '@/lib/data/achievements'

export function Achievements() {
  return (
    <section id="achievements" className="section border-t border-border-subtle">
      <div className="container-x">
        <SectionHeader eyebrow="// 13. Achievements" title="Receipts" />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="card-surface flex h-full items-start gap-4 p-5">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-accent-amber/10">
                  <Trophy className="h-5 w-5 text-accent-amber" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-display text-base font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs text-accent-green">{item.metric}</span>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">{item.context}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
