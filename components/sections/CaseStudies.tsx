'use client'

import { m } from 'framer-motion'
import { AlertTriangle, Lightbulb, Target } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { caseStudies } from '@/lib/data/casestudies'

export function CaseStudies() {
  return (
    <section id="case-studies" className="section border-t border-border-subtle">
      <div className="container-x">
        <SectionHeader
          eyebrow="// Case Studies"
          title="Problem → approach → outcome"
          description="The thinking behind the metrics — how each result was actually achieved."
        />

        <div className="mt-12 space-y-6">
          {caseStudies.map((study, i) => (
            <m.article
              key={study.id}
              className="case-study-card card-surface overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid gap-px bg-border-subtle md:grid-cols-2">
                {/* Problem */}
                <div className="bg-bg-surface p-6 md:p-8">
                  <div className="flex items-center gap-2 text-accent-amber">
                    <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    <span className="font-mono text-xs uppercase tracking-wider">Problem</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{study.problem}</p>
                </div>

                {/* Solution (clip-path wipe) */}
                <m.div
                  className="case-solution bg-bg-surface p-6 md:p-8"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 text-accent-green">
                    <Lightbulb className="h-4 w-4" aria-hidden="true" />
                    <span className="font-mono text-xs uppercase tracking-wider">Approach</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{study.approach}</p>
                </m.div>
              </div>

              {/* Footer: title + outcome */}
              <div className="flex flex-col gap-4 border-t border-border-subtle p-6 md:flex-row md:items-center md:justify-between md:p-8">
                <div>
                  <h3 className="font-display text-lg font-bold text-text-primary">{study.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {study.tools.map((tool) => (
                      <Badge key={tool} variant="outline">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-accent-green/30 bg-accent-green/10 px-5 py-3">
                  <Target className="h-5 w-5 text-accent-green" aria-hidden="true" />
                  <div>
                    <p className="font-display text-lg font-bold text-accent-green">{study.metric}</p>
                    <p className="max-w-xs text-xs text-text-secondary">{study.outcome}</p>
                  </div>
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  )
}
