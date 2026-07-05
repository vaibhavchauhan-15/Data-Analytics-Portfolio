'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, BarChart3, BrainCircuit, Code2, Database, type LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid'
import { ProjectCard } from './ProjectCard'
import {
  projects,
  featuredProjects,
  categoryLabels,
  type ProjectCategory,
} from '@/lib/data/projects'

const CATEGORY_ICONS: Record<ProjectCategory, LucideIcon> = {
  powerbi: BarChart3,
  ml: BrainCircuit,
  python: Code2,
  sql: Database,
}

type Tab = 'all' | ProjectCategory

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'powerbi', label: categoryLabels.powerbi },
  { id: 'ml', label: categoryLabels.ml },
  { id: 'python', label: categoryLabels.python },
  { id: 'sql', label: categoryLabels.sql },
]

export function Projects() {
  const [tab, setTab] = useState<Tab>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchTab = tab === 'all' || p.category === tab
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
      return matchTab && matchQuery
    })
  }, [tab, query])

  return (
    <section id="projects" className="section border-t border-border-subtle">
      <div className="container-x">
        <SectionHeader
          eyebrow="// 07. Featured Projects"
          title="Shipped, not just sketched"
          description="Real builds with measurable outcomes — from BI dashboards to ML anomaly detection."
        />

        {/* Featured — interactive bento */}
        <BentoGrid id="featured-projects" className="mt-12 auto-rows-[20rem] md:grid-cols-2">
          {featuredProjects.map((project) => (
            <BentoCard
              key={project.id}
              name={project.title}
              description={project.description}
              Icon={CATEGORY_ICONS[project.category]}
              href={project.liveUrl ?? project.githubUrl}
              cta={project.liveUrl ? 'View live demo' : 'View code'}
              className="col-span-3 md:col-span-1"
              background={
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.thumbnail}
                    alt=""
                    loading="lazy"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-25 transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/85 to-bg-surface/40" />
                  <span className="absolute right-5 top-5 inline-flex items-center rounded-full border border-accent-primary/30 bg-accent-primary/10 px-2.5 py-1 font-mono text-xs text-accent-glow">
                    {categoryLabels[project.category]}
                  </span>
                </>
              }
            />
          ))}
        </BentoGrid>

        {/* Index */}
        <div className="mt-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex flex-wrap gap-2"
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={
                    'rounded-full border px-4 py-2 text-sm font-medium transition-colors ' +
                    (tab === t.id
                      ? 'border-accent-primary bg-accent-primary/10 text-accent-glow'
                      : 'border-border-subtle text-text-secondary hover:border-border-muted hover:text-text-primary')
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                aria-label="Search projects"
                className="h-11 w-full rounded-md border border-border-subtle bg-bg-surface pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none"
              />
            </div>
          </div>

          <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-text-muted">
              No projects match &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
