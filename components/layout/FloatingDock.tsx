'use client'

import { useEffect, useState } from 'react'
import {
  Home,
  User,
  Sparkles,
  Briefcase,
  FolderGit2,
  BarChart3,
  Github,
  Mail,
  Download,
  type LucideIcon,
} from 'lucide-react'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/config'
import { cn } from '@/lib/utils'
import { Dock, DockIcon } from '@/components/magicui/dock'
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler'

// Map each nav href to an icon + whether it stays visible on small screens.
const ICONS: Record<string, { icon: LucideIcon; compact: boolean }> = {
  '#about': { icon: User, compact: true },
  '#skills': { icon: Sparkles, compact: false },
  '#experience': { icon: Briefcase, compact: false },
  '#projects': { icon: FolderGit2, compact: true },
  '#dashboard': { icon: BarChart3, compact: false },
  '#github': { icon: Github, compact: true },
  '#contact': { icon: Mail, compact: true },
}

export function FloatingDock() {
  const [active, setActive] = useState<string>('')

  // Active-section highlight (ported from the old Navbar).
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-2 sm:bottom-6">
      <Dock
        direction="middle"
        iconSize={40}
        iconMagnification={62}
        iconDistance={130}
        className="pointer-events-auto max-w-[calc(100vw-1rem)]"
      >
        <DockItem href="#hero" label="Home" icon={Home} active={active === 'hero'} />

        {NAV_LINKS.map((link) => {
          const meta = ICONS[link.href]
          if (!meta) return null
          return (
            <DockItem
              key={link.href}
              href={link.href}
              label={link.label}
              icon={meta.icon}
              active={active === link.href.slice(1)}
              className={meta.compact ? '' : 'hidden md:flex'}
            />
          )
        })}

        {/* Divider */}
        <div className="mx-1 h-8 w-px shrink-0 self-center bg-border-muted" aria-hidden="true" />

        <DockIcon>
          <Tooltip label="Resume">
            <a
              href={SITE_CONFIG.resumeUrl}
              download
              aria-label="Download resume"
              className="grid h-full w-full place-items-center rounded-full text-text-secondary transition-colors hover:text-accent-primary"
            >
              <Download className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          </Tooltip>
        </DockIcon>

        <DockIcon>
          <Tooltip label="Theme">
            <AnimatedThemeToggler />
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  )
}

function DockItem({
  href,
  label,
  icon: Icon,
  active,
  className,
}: {
  href: string
  label: string
  icon: LucideIcon
  active?: boolean
  className?: string
}) {
  return (
    <DockIcon className={className}>
      <Tooltip label={label}>
        <a
          href={href}
          aria-label={label}
          aria-current={active ? 'true' : undefined}
          className={cn(
            'grid h-full w-full place-items-center rounded-full transition-colors',
            active
              ? 'bg-accent-primary/15 text-accent-primary'
              : 'text-text-secondary hover:text-text-primary'
          )}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </a>
      </Tooltip>
    </DockIcon>
  )
}

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group/tip relative grid h-full w-full place-items-center">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border-subtle bg-bg-elevated px-2 py-1 text-xs font-medium text-text-primary opacity-0 shadow-md transition-opacity duration-150 group-hover/tip:opacity-100"
      >
        {label}
      </span>
    </div>
  )
}
