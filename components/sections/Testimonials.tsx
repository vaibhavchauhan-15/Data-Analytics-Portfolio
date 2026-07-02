'use client'

import { Quote } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { SITE_CONFIG } from '@/lib/config'
import { testimonials } from '@/lib/data/testimonials'

export function Testimonials() {
  if (!SITE_CONFIG.showTestimonials || testimonials.length === 0) return null

  return (
    <section id="testimonials" className="section border-t border-border-subtle">
      <div className="container-x">
        <SectionHeader eyebrow="// Testimonials" title="What people say" align="center" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="card-surface flex h-full flex-col p-6">
                <Quote className="h-6 w-6 text-accent-primary" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-border-subtle pt-4">
                  <p className="font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-muted">
                    {t.role} · {t.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
