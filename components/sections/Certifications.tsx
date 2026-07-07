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
          eyebrow="// 06. Certifications"
          title="Validated, not just claimed"
          description="Hover a card to expand it — every credential links to the verifiable certificate."
        />

        <ExpandCards cards={cards} defaultExpanded={0} className="mt-12" />
      </div>
    </section>
  )
}
