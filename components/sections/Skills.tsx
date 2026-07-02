'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { skillCategories, type Skill } from '@/lib/data/skills'
import { projects } from '@/lib/data/projects'
import { SectionHeader } from '@/components/shared/SectionHeader'

const projectTitles = new Map(projects.map((p) => [p.id, p.title]))

const pillBase =
  'group relative inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors'

function SkillPill({ skill }: { skill: Skill }) {
  const linkedIds = (skill.projects ?? []).filter((id) => projectTitles.has(id))
  const names = linkedIds.map((id) => projectTitles.get(id)!)

  const tone = skill.core
    ? 'border-accent-primary/40 bg-accent-primary/10 text-accent-glow shadow-[0_0_16px_-6px] shadow-accent-primary/40'
    : 'border-border-subtle bg-bg-elevated text-text-secondary'

  // No real project to point at → honest, non-interactive pill.
  if (linkedIds.length === 0) {
    return <span className={`${pillBase} ${tone}`}>{skill.name}</span>
  }

  const label = `${skill.name} — used in ${names.join(', ')}`
  return (
    <a
      href={`#${linkedIds[0]}`}
      aria-label={label}
      className={`${pillBase} ${tone} cursor-pointer hover:-translate-y-0.5 hover:border-border-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary`}
    >
      {skill.name}
      <ArrowUpRight className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden="true" />

      {/* Proof tooltip — real project names, no fabricated metric */}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border-muted bg-bg-elevated px-2.5 py-1.5 text-[10px] normal-case tracking-normal text-text-primary opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="text-text-muted">Used in: </span>
        {names.join(', ')}
      </span>
    </a>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section border-t border-border-subtle bg-grid">
      <div className="container-x">
        <SectionHeader
          eyebrow="// 03. Skills"
          title="The toolkit behind the analysis"
          description="From SQL optimization to BI dashboards and ML systems — a stack built for turning data into decisions."
        />

        <p className="mt-4 font-mono text-xs text-text-muted">
          <span className="text-accent-glow">◆</span> core focus
          <span className="mx-2 text-border-muted">·</span>
          linked skills jump to the project that used them
        </p>

        <div className="skills-grid mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              className="skill-card card-surface bg-gradient-card p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: ci * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="mb-5 font-display text-lg font-semibold text-text-primary">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <SkillPill key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
