'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillCategories, type Skill } from '@/lib/data/skills'
import { SectionHeader } from '@/components/shared/SectionHeader'

function SkillRow({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">{skill.name}</span>
        <span className="font-mono text-xs text-text-muted">{skill.proficiency}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
        <motion.div
          className="h-full rounded-full bg-gradient-brand"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.proficiency}%` } : {}}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.05 * index }}
        />
      </div>
    </div>
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

        <div className="skills-grid mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillRow key={skill.name} skill={skill} index={si} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
