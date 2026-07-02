'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { categoryLabels, type Project } from '@/lib/data/projects'

export function FeatureCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      id={project.id}
      className="feature-card group card-surface flex scroll-mt-24 flex-col overflow-hidden"
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-bg-elevated">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.thumbnail}
          alt={`${project.title} cover`}
          loading="lazy"
          className="feature-card-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-surface/60 via-transparent to-transparent" />
        <div className="absolute left-5 top-5">
          <Badge variant="accent">{categoryLabels[project.category]}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-text-primary">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{project.description}</p>

        <ul className="mt-5 space-y-2.5">
          {project.outcomes.map((outcome, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-text-secondary">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-green" aria-hidden="true" />
              {outcome}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="badge">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex gap-3 border-t border-border-subtle pt-5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              <Github className="h-4 w-4" aria-hidden="true" /> Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent-glow transition-colors hover:text-accent-primary"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
