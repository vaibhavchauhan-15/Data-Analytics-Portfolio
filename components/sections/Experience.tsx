'use client'

import { m } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { experience } from '@/lib/data/experience'

export function Experience() {
  return (
    <section id="experience" className="section border-t border-border-subtle bg-bg-surface/30">
      <div className="container-x">
        <SectionHeader
          eyebrow="// Experience"
          title="Where I turned data into outcomes"
        />

        <div className="relative mt-12 pl-8 md:pl-12">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-border-muted md:left-[11px]">
            <m.div
              className="absolute inset-0 w-px origin-top bg-gradient-brand"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
          </div>

          {experience.map((entry, i) => (
            <m.article
              key={`${entry.company}-${i}`}
              className="timeline-entry relative pb-12 last:pb-0"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Dot */}
              <span className="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-accent-primary bg-bg-base md:-left-12">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-bold text-text-primary">{entry.role}</h3>
                <Badge variant="accent">{entry.type}</Badge>
              </div>
              <p className="mt-1 text-text-secondary">
                <span className="font-semibold text-accent-glow">{entry.company}</span>
                <span className="mx-2 text-text-muted">·</span>
                {entry.location}
              </p>
              <p className="mt-1 font-mono text-xs text-text-muted">{entry.period}</p>

              <ul className="mt-5 space-y-3">
                {entry.bullets.map((bullet, bi) => (
                  <li key={bi} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-primary/60" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {entry.certificateUrl && (
                <a
                  href={entry.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View internship certificate from ${entry.company} (opens in a new tab)`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-glow transition-colors hover:text-accent-primary"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  View Internship Certificate
                </a>
              )}
            </m.article>
          ))}
        </div>
      </div>
    </section>
  )
}
