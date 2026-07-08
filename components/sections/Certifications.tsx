'use client'

import { SectionHeader } from '@/components/shared/SectionHeader'
import { ExpandCards, type ExpandCard } from '@/components/ui/expand-cards'
import { certifications } from '@/lib/data/certifications'

// Map certification data onto the expand-card shape.
const cards: ExpandCard[] = certifications.map((cert) => ({
  image: cert.image ?? '',
  title: cert.name,
  subtitle: `${cert.issuer} · ${cert.year}`,
  href: cert.certificateUrl,
  color: cert.color,
  cta: 'View Certificate',
}))

export function Certifications() {
  return (
    <section id="certifications" className="section border-t border-border-subtle">
      <div className="container-x">
        <SectionHeader
          eyebrow="// Certifications"
          title="Validated, not just claimed"
          description="Every credential links to the verifiable certificate — tap to open, or hover to expand on desktop."
        />

        <ExpandCards cards={cards} defaultExpanded={0} className="mt-12" />
      </div>
    </section>
  )
}
