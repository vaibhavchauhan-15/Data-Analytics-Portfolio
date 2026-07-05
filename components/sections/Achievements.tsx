'use client'

import { Trophy } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Marquee } from '@/components/magicui/marquee'
import { HyperText } from '@/components/magicui/hyper-text'
import { achievements, type Achievement } from '@/lib/data/achievements'

const firstRow = achievements.slice(0, Math.ceil(achievements.length / 2))
const secondRow = achievements.slice(Math.ceil(achievements.length / 2))

function AchievementCard({ title, context, metric }: Achievement) {
  return (
    <figure className="relative w-72 shrink-0 overflow-hidden rounded-xl border border-border-subtle bg-bg-surface p-5 transition-colors hover:border-border-muted hover:bg-bg-surface-hover">
      <div className="flex items-start gap-4">
        <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-accent-amber/10">
          <Trophy className="h-5 w-5 text-accent-amber" aria-hidden="true" />
        </div>
        <div>
          <div className="flex flex-wrap items-baseline gap-2">
            <figcaption className="font-display text-base font-semibold text-text-primary">
              {title}
            </figcaption>
            <span className="font-mono text-xs text-accent-green">{metric}</span>
          </div>
          <p className="mt-1 text-sm text-text-secondary">{context}</p>
        </div>
      </div>
    </figure>
  )
}

export function Achievements() {
  return (
    <section id="achievements" className="section border-t border-border-subtle">
      <div className="container-x">
        <div className="flex flex-col gap-4">
          <SectionLabel>{'// 13. Achievements'}</SectionLabel>
          <HyperText
            as="h2"
            className="text-2xl font-bold leading-tight text-text-primary md:text-3xl"
            duration={900}
          >
            Receipts
          </HyperText>
        </div>
      </div>

      <div className="relative mt-12 flex w-full flex-col items-center justify-center gap-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:32s]">
          {firstRow.map((item) => (
            <AchievementCard key={item.title} {...item} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:32s]">
          {secondRow.map((item) => (
            <AchievementCard key={item.title} {...item} />
          ))}
        </Marquee>
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-bg-base to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-bg-base to-transparent" />
      </div>
    </section>
  )
}
