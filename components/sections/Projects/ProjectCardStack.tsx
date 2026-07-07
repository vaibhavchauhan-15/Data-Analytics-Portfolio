'use client'

import { useMemo } from 'react'
import { Github } from 'lucide-react'
import { CardStack, type CardStackItem } from '@/components/ui/card-stack'
import { projects, categoryLabels, type Project } from '@/lib/data/projects'

// The stack's built-in link (bottom external-link icon) opens the active card's
// `href`; we point that at the GitHub repo so the header CTA is the repo too.
type ProjectStackItem = CardStackItem & { project: Project }

export function ProjectCardStack() {
  const items = useMemo<ProjectStackItem[]>(
    () =>
      projects.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        imageSrc: project.thumbnail,
        href: project.githubUrl,
        tag: categoryLabels[project.category],
        project,
      })),
    [],
  )

  return (
    <CardStack<ProjectStackItem>
      items={items}
      initialIndex={0}
      autoAdvance
      intervalMs={3200}
      pauseOnHover
      showDots
      className="mt-12"
      renderCard={(item, { active }) => (
        <ProjectFanCard item={item} active={active} />
      )}
    />
  )
}

function ProjectFanCard({
  item,
  active,
}: {
  item: ProjectStackItem
  active: boolean
}) {
  const { project } = item

  return (
    <div className="relative h-full w-full bg-bg-elevated">
      {/* thumbnail */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageSrc}
          alt={`${item.title} cover`}
          className="h-full w-full object-cover"
          draggable={false}
          loading="eager"
        />
      </div>

      {/* readability gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* category tag */}
      {item.tag ? (
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-accent-primary/30 bg-accent-primary/10 px-2.5 py-1 font-mono text-xs text-accent-glow backdrop-blur">
          {item.tag}
        </span>
      ) : null}

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        <h3 className="font-display text-lg font-semibold text-white">
          {item.title}
        </h3>
        {item.description ? (
          <p className="mt-1.5 line-clamp-2 text-sm text-white/80">
            {item.description}
          </p>
        ) : null}

        {/* GitHub link — only interactive on the active card */}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            // stop the click from bubbling to the card's onClick (which just re-selects)
            onClick={(e) => e.stopPropagation()}
            onPointerDownCapture={(e) => e.stopPropagation()}
            tabIndex={active ? 0 : -1}
            aria-hidden={!active}
            className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" /> View on GitHub
          </a>
        ) : null}
      </div>
    </div>
  )
}
