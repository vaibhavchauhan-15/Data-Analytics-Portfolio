'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Search } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { BackgroundTitle } from '@/components/shared/BackgroundTitle'
import { ProjectCard } from './ProjectCard'
import { ProjectCardStack } from './ProjectCardStack'
import {
  projects,
  categoryLabels,
  type ProjectCategory,
} from '@/lib/data/projects'

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
    <section id="projects" className="section overflow-hidden border-t border-border-subtle">
      <BackgroundTitle text="Projects" position="left" />
      <div className="container-x relative z-10">
        <SectionHeader
          eyebrow="// Featured Projects"
          title="Shipped, not just sketched"
          description="Real builds with measurable outcomes — from BI dashboards to ML anomaly detection."
        />

        {/* Featured — interactive 3D card stack (drag / swipe / arrow keys) */}
        <ProjectCardStack />

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

          <m.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </m.div>

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
