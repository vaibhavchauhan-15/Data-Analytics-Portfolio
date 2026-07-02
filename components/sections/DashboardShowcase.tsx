'use client'

import { useEffect, useRef } from 'react'
import { BarChart3, TrendingUp } from 'lucide-react'
import { gsap, ScrollTrigger, registerGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { dashboards } from '@/lib/data/dashboards'

export function DashboardShowcase() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const sectionEl = section.current
    const trackEl = track.current
    if (!sectionEl || !trackEl) return
    // Horizontal pin only on larger screens; mobile falls back to vertical scroll.
    if (window.innerWidth < 768) return

    registerGsap()
    const ctx = gsap.context(() => {
      const scrollDistance = trackEl.scrollWidth - window.innerWidth + 80
      if (scrollDistance <= 0) return

      gsap.to(trackEl, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionEl)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="dashboard"
      ref={section}
      className="relative overflow-hidden border-t border-border-subtle bg-bg-surface/30 py-24 md:py-0"
    >
      {/* Heading (sits above the pinned track on desktop) */}
      <div className="container-x md:absolute md:left-1/2 md:top-16 md:z-10 md:-translate-x-1/2">
        <SectionHeader
          eyebrow="// 08. Dashboard Showcase"
          title="Dashboards that drive decisions"
          align="center"
        />
      </div>

      <div className="md:flex md:h-screen md:items-center">
        <div
          ref={track}
          className="mt-12 flex flex-col gap-6 md:mt-0 md:flex-row md:gap-8 md:px-10"
        >
          {dashboards.map((dash) => (
            <article
              key={dash.id}
              className="dashboard-card container-x card-surface flex-shrink-0 bg-gradient-card p-0 md:w-[560px] md:px-0"
            >
              {/* Mock dashboard visual */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg border-b border-border-subtle bg-bg-elevated">
                <div className="absolute inset-0 bg-grid opacity-50" />
                <div className="absolute inset-0 flex items-end gap-2 p-8">
                  {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-accent-primary/40 to-accent-cyan/60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="absolute left-6 top-6 flex items-center gap-2 text-accent-glow">
                  <BarChart3 className="h-5 w-5" aria-hidden="true" />
                  <span className="font-mono text-xs">Power BI</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-text-primary">{dash.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{dash.description}</p>
                <div className="mt-4 flex items-center gap-2 text-accent-green">
                  <TrendingUp className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm font-medium">{dash.metric}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dash.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
