'use client'

import { useEffect, useState } from 'react'
import { Menu, Download } from 'lucide-react'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/config'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-300',
          scrolled
            ? 'border-b border-border-subtle bg-bg-base/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <a
            href="#hero"
            aria-label="Vaibhav Chauhan — home"
            className="group inline-flex items-end font-display text-lg font-extrabold leading-none tracking-tight text-text-primary"
          >
            <video
              src="/logovideo.webm"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="logo-video block h-[1.15em] w-auto select-none"
            />
            <span className="-ml-[0.06em]">aibhav</span>
            <span className="text-accent-primary">.</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active === link.href.slice(1)
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={SITE_CONFIG.resumeUrl}
              download
              className="hidden h-10 items-center gap-2 rounded-md bg-accent-primary px-4 text-sm font-medium text-white transition-all hover:shadow-glow sm:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-md border border-border-subtle text-text-secondary lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
