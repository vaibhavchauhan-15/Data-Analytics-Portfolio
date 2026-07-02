'use client'

import { kpiStats } from '@/lib/data/kpis'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { Reveal } from '@/components/shared/Reveal'

export function KPIStats() {
  return (
    <section id="kpi" className="relative border-t border-border-subtle bg-bg-surface/40 py-16">
      <div className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
        {kpiStats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1} className="text-center lg:text-left">
            <div className="font-display text-4xl font-extrabold text-gradient md:text-5xl">
              <AnimatedCounter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-sm font-semibold text-text-primary">{stat.label}</p>
            {stat.sublabel && (
              <p className="mt-1 font-mono text-xs text-text-muted">{stat.sublabel}</p>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
