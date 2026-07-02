'use client'

import { GraduationCap, MapPin } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { Badge } from '@/components/ui/Badge'
import { education } from '@/lib/data/education'

export function Education() {
  return (
    <section id="education" className="section border-t border-border-subtle">
      <div className="container-x">
        <SectionHeader eyebrow="// 05. Education" title="Academic foundation" />

        <Reveal className="mt-10">
          <div className="card-surface flex flex-col gap-6 bg-gradient-card p-8 md:flex-row md:items-center">
            <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-xl border border-border-muted bg-bg-elevated">
              <GraduationCap className="h-8 w-8 text-accent-primary" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-bold text-text-primary">
                  {education.university}
                </h3>
                <Badge variant="accent">{education.specialization}</Badge>
              </div>
              <p className="mt-2 text-text-secondary">{education.degree}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-text-muted">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {education.location}
              </p>
            </div>
            <p className="font-mono text-sm text-text-secondary">{education.period}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
