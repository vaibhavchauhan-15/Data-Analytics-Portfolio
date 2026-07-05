import { Github, Linkedin, Mail } from 'lucide-react'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/config'

export function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-bg-surface">
      <div className="container-x py-16 pb-28 md:pb-32">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <a href="#hero" className="font-display text-xl font-extrabold">
              Vaibhav<span className="text-accent-primary">.</span>
            </a>
            <p className="mt-4 text-sm text-text-secondary">
              Turning raw data into business clarity. Power BI · Python · SQL · ML.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent-primary hover:text-text-primary"
              >
                <Github className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent-primary hover:text-text-primary"
              >
                <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent-primary hover:text-text-primary"
              >
                <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-subtle pt-8 text-xs text-text-muted md:flex-row md:items-center md:justify-between">
          <p>Built with Next.js, GSAP, and Three.js</p>
          <p>© 2026 Vaibhav Chauhan — Data Analyst · Delhi, India</p>
        </div>
      </div>
    </footer>
  )
}
