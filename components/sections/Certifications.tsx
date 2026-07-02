'use client'

import { motion } from 'framer-motion'
import { Award, ExternalLink, ShieldCheck } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { certifications } from '@/lib/data/certifications'

export function Certifications() {
  return (
    <section id="certifications" className="section border-t border-border-subtle">
      <div className="container-x">
        <SectionHeader
          eyebrow="// 06. Certifications"
          title="Validated, not just claimed"
          description="Every credential links to the verifiable certificate."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3" style={{ perspective: '1000px' }}>
          {certifications.map((cert, i) => (
            <motion.article
              key={cert.name}
              className="group card-surface relative flex flex-col overflow-hidden p-6"
              initial={{ rotateY: -90, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: cert.color ?? 'var(--accent-primary)' }}
              />

              <div className="flex items-start justify-between">
                <div
                  className="grid h-12 w-12 place-items-center rounded-lg"
                  style={{ backgroundColor: `${cert.color ?? '#6366F1'}1a` }}
                >
                  <Award className="h-6 w-6" style={{ color: cert.color ?? '#6366F1' }} aria-hidden="true" />
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-accent-green">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Verified
                </span>
              </div>

              <h3 className="mt-5 font-display text-base font-semibold leading-snug text-text-primary">
                {cert.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-medium text-text-secondary">{cert.issuer}</p>
                <p className="font-mono text-xs text-text-muted">{cert.year}</p>
              </div>

              <div className="mt-5 flex-1" />

              {cert.certificateUrl && (
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${cert.name} certificate from ${cert.issuer} (opens in a new tab)`}
                  className="mt-2 inline-flex items-center gap-2 border-t border-border-subtle pt-4 text-sm font-medium text-accent-glow transition-colors hover:text-accent-primary"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  View Certificate
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
