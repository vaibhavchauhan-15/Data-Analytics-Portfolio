'use client'

import { Award, ShieldCheck } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid'
import { certifications } from '@/lib/data/certifications'

// Bento layout spans — first row splits 1 + 2, third cert spans full width.
const SPANS = ['lg:col-span-1', 'lg:col-span-2', 'lg:col-span-3']

export function Certifications() {
  return (
    <section id="certifications" className="section border-t border-border-subtle">
      <div className="container-x">
        <SectionHeader
          eyebrow="// 06. Certifications"
          title="Validated, not just claimed"
          description="Every credential links to the verifiable certificate."
        />

        <BentoGrid className="mt-12 auto-rows-[16rem]">
          {certifications.map((cert, i) => {
            const color = cert.color ?? 'var(--accent-primary)'
            return (
              <BentoCard
                key={cert.name}
                name={cert.name}
                description={`${cert.issuer} · ${cert.year}`}
                Icon={Award}
                href={cert.certificateUrl}
                cta="View Certificate"
                className={SPANS[i % SPANS.length]}
                background={
                  <>
                    {/* Brand-tinted glow */}
                    <div
                      className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                      style={{ background: color }}
                    />
                    {/* Accent top bar */}
                    <div className="absolute inset-x-0 top-0 h-1" style={{ background: color }} />
                    {/* Watermark */}
                    <Award
                      className="absolute -bottom-6 -right-4 h-40 w-40 opacity-[0.06] transition-transform duration-500 group-hover:scale-110"
                      style={{ color }}
                      aria-hidden="true"
                    />
                    {/* Verified pill */}
                    <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-base/60 px-2.5 py-1 font-mono text-xs text-accent-green backdrop-blur">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Verified
                    </span>
                  </>
                }
              />
            )
          })}
        </BentoGrid>
      </div>
    </section>
  )
}
