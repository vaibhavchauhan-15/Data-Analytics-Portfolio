'use client'

import { Star, GitFork, Github as GithubIcon, ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/config'
import type { GitHubRepo } from '@/lib/github'

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#E34C26',
  CSS: '#563D7C',
  'C++': '#F34B7D',
  Java: '#B07219',
}

export function GitHubSection({ repos }: { repos: GitHubRepo[] }) {
  return (
    <section id="github" className="section border-t border-border-subtle">
      <div className="container-x">
        <SectionHeader
          eyebrow="// GitHub Activity"
          title="Code is public. Look under the hood."
          description="Recent repositories — analytics pipelines, ML prototypes, and full-stack builds."
        />

        {/* Contribution graph */}
        <Reveal className="mt-12">
          <div className="card-surface overflow-x-auto p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/39ff14/${SITE_CONFIG.githubUsername}`}
              alt={`${SITE_CONFIG.name} GitHub contribution graph`}
              loading="lazy"
              className="w-full min-w-[640px]"
            />
          </div>
        </Reveal>

        {repos.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, i) => (
              <Reveal key={repo.id} delay={i * 0.06}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-surface group flex h-full flex-col p-5"
                >
                  <div className="flex items-start justify-between">
                    <GithubIcon className="h-5 w-5 text-text-secondary" aria-hidden="true" />
                    <ArrowUpRight className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 font-mono text-sm font-semibold text-text-primary">{repo.name}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-text-secondary">
                    {repo.description ?? 'No description provided.'}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: LANG_COLORS[repo.language] ?? '#39FF14' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" aria-hidden="true" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" aria-hidden="true" /> {repo.forks_count}
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-8">
            <div className="card-surface flex flex-col items-center gap-4 p-10 text-center">
              <GithubIcon className="h-8 w-8 text-text-secondary" aria-hidden="true" />
              <p className="text-text-secondary">
                Explore all repositories directly on GitHub.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-10 flex justify-center">
          <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg">
              <GithubIcon className="h-4 w-4" aria-hidden="true" /> View Full Profile
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
