'use client'

import { useState } from 'react'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ExpandCard {
  /** Background image URL for the card. */
  image: string
  /** Primary label (e.g. certificate name). */
  title: string
  /** Secondary label (e.g. issuer · year). */
  subtitle?: string
  /** Link opened when the card is clicked. */
  href?: string
  /** Accent color for the top bar (falls back to the theme accent). */
  color?: string
  /** Call-to-action label shown on the expanded card. */
  cta?: string
}

interface ExpandCardsProps {
  cards: ExpandCard[]
  /** Index of the card expanded by default. */
  defaultExpanded?: number
  className?: string
}

/**
 * Expand-on-hover card row. On desktop the hovered/focused card grows while the
 * others collapse to a slim spine with a vertical label; on touch/mobile the
 * cards stack as full-width tiles (hover isn't available there).
 */
export function ExpandCards({
  cards,
  defaultExpanded = 0,
  className,
}: ExpandCardsProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className={cn('w-full', className)}>
      {/* Desktop: expand-on-hover row */}
      <div className="hidden gap-2 md:flex md:items-stretch md:justify-center">
        {cards.map((card, idx) => {
          const isActive = idx === expanded
          const color = card.color ?? 'var(--accent-primary)'
          return (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setExpanded(idx)}
              onFocus={() => setExpanded(idx)}
              aria-label={`View ${card.title} certificate`}
              className="group relative h-[24rem] flex-none cursor-pointer overflow-hidden rounded-2xl border border-border-subtle transition-[width] duration-500 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-primary"
              style={{ width: isActive ? '26rem' : '5rem' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Legibility overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              {/* Accent top bar */}
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: color }} />

              {/* Collapsed vertical spine label */}
              <span
                className={cn(
                  'absolute bottom-5 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap font-mono text-xs uppercase tracking-wider text-white/90 transition-opacity duration-300 [writing-mode:vertical-rl]',
                  isActive ? 'opacity-0' : 'opacity-100'
                )}
              >
                {card.title}
              </span>

              {/* Expanded content */}
              <div
                className={cn(
                  'absolute inset-x-0 bottom-0 p-6 transition-all duration-300',
                  isActive
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-4 opacity-0'
                )}
              >
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-xs text-white backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Verified
                </span>
                <h3 className="mt-3 whitespace-nowrap text-lg font-bold text-white">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className="mt-1 whitespace-nowrap text-sm text-white/70">
                    {card.subtitle}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                  {card.cta ?? 'View Certificate'}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>
          )
        })}
      </div>

      {/* Mobile: stacked tiles */}
      <div className="flex flex-col gap-4 md:hidden">
        {cards.map((card) => {
          const color = card.color ?? 'var(--accent-primary)'
          return (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${card.title} certificate`}
              className="group relative block h-56 overflow-hidden rounded-2xl border border-border-subtle"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: color }} />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-xs text-white backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Verified
                </span>
                <h3 className="mt-2 text-lg font-bold text-white">{card.title}</h3>
                {card.subtitle && (
                  <p className="mt-1 text-sm text-white/70">{card.subtitle}</p>
                )}
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                  {card.cta ?? 'View Certificate'}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default ExpandCards
