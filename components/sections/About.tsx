'use client'

import Image from 'next/image'
import { MapPin, GraduationCap, Briefcase, Building2 } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { BackgroundTitle } from '@/components/shared/BackgroundTitle'
import { Reveal } from '@/components/shared/Reveal'
import { MorphingText } from '@/components/magicui/morphing-text'
import { m } from 'framer-motion'

const SPECIALTIES = ['Dashboards', 'Pipelines', 'ML Models', 'Clean Data', 'Insights']

const CHIPS = [
  { icon: MapPin, label: 'Delhi, India' },
  { icon: GraduationCap, label: 'Graduating 2026' },
  { icon: Briefcase, label: 'Open to Work' },
  { icon: Building2, label: 'B.Tech · Data Science' },
]

export function About() {
  return (
    <section id="about" className="section overflow-hidden border-t border-border-subtle">
      <BackgroundTitle text="About" position="left" />
      <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Image */}
        <m.div
          initial={{ opacity: 0, x: -60, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-brand opacity-20 blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-border-muted shadow-lg">
            <Image
              src="/avatar/profile.jpg"
              alt="Vaibhav Chauhan, Data Analyst"
              width={1024}
              height={1024}
              priority
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 rounded-xl border border-border-muted bg-bg-elevated px-4 py-3 shadow-lg sm:-bottom-4 sm:-right-4">
            <p className="font-mono text-xs text-text-secondary">Data Analyst</p>
            <p className="font-display text-sm font-semibold text-text-primary">Coerror &rsquo;26</p>
          </div>
        </m.div>

        {/* Text */}
        <div>
          <SectionHeader
            eyebrow="// About"
            title={
              <>
                Data tells stories.
                <br />
                <span className="text-gradient">I write the narrative.</span>
              </>
            }
          />

          <div className="about-text mt-6 space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
            <Reveal as="div">
              <p>
                B.Tech Computer Science (Data Science) graduate from Parul University, 2026. I spent
                my internship at Coerror turning messy product data into Power BI dashboards adopted
                across 3 teams — cutting report time by 40% and feeding production ML models.
              </p>
            </Reveal>
            <Reveal as="div" delay={0.08}>
              <p>
                I bridge raw datasets and the boardroom. Whether that&rsquo;s writing optimized MySQL
                queries, building anomaly detection systems in Python, or telling a story through a
                dashboard — I care about the outcome, not just the output.
              </p>
            </Reveal>
            <Reveal as="div" delay={0.16}>
              <p className="text-text-primary">
                Currently seeking Data Analyst / ML Engineer roles in Delhi NCR or remote. If
                you&rsquo;re working on data problems that matter, let&rsquo;s talk.
              </p>
            </Reveal>
          </div>

          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Specializing in
            </p>
            <MorphingText
              texts={SPECIALTIES}
              className="mx-0 h-12 max-w-none text-left text-[2rem] text-accent-primary md:h-16 md:text-[2.75rem] lg:text-[2.75rem]"
            />
          </div>

          <div className="about-chips mt-8 flex flex-wrap gap-3">
            {CHIPS.map((chip, i) => (
              <m.span
                key={chip.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-surface px-4 py-2 text-sm text-text-secondary"
              >
                <chip.icon className="h-4 w-4 text-accent-primary" aria-hidden="true" />
                {chip.label}
              </m.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
