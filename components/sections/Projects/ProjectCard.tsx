'use client'

import { forwardRef } from 'react'
import { m } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { categoryLabels, type Project } from '@/lib/data/projects'

// forwardRef is required: AnimatePresence's popLayout mode wraps each child in
// PopChild, which passes a ref to the immediate child to measure it on exit.
export const ProjectCard = forwardRef<HTMLElement, { project: Project; index: number }>(
  function ProjectCard({ project, index }, ref) {
  return (
    <m.article
      ref={ref}
      // Featured projects already own this anchor via their FeatureCard; avoid a duplicate id.
      id={project.featured ? undefined : project.id}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="card-surface group flex h-full scroll-mt-24 flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border-subtle bg-bg-elevated">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.thumbnail}
          alt={`${project.title} cover`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute right-3 top-3">
          <ArrowUpRight className="h-5 w-5 text-text-secondary transition-colors group-hover:text-accent-primary" aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5">
      <Badge variant="accent" className="w-fit">{categoryLabels[project.category]}</Badge>

      <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="font-mono text-xs text-text-secondary">
            {tech}
          </span>
        )).reduce((acc: React.ReactNode[], el, i) => {
          if (i > 0) acc.push(<span key={`sep-${i}`} className="text-text-muted">·</span>)
          acc.push(el)
          return acc
        }, [])}
      </div>

      <div className="mt-5 flex gap-3 border-t border-border-subtle pt-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" /> Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-glow transition-colors hover:text-accent-primary"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Live
          </a>
        )}
      </div>
      </div>
    </m.article>
  )
})
