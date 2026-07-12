import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/config'

const SOCIALS = [
  { href: SITE_CONFIG.github, label: 'GitHub', Icon: Github },
  { href: SITE_CONFIG.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: `mailto:${SITE_CONFIG.email}`, label: 'Email', Icon: Mail },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-subtle bg-bg-surface">
      {/* accent line + soft glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-60" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-accent-primary/10 blur-3xl" />

      <div className="container-x relative py-16 pb-28 md:pb-32">
        {/* CTA */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-border-subtle pb-12 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-primary" />
              </span>
              Available for work
            </span>
            <h2 className="mt-4 max-w-md font-display text-3xl font-extrabold leading-tight md:text-4xl">
              Let&apos;s turn your data into <span className="text-gradient">decisions</span>.
            </h2>
          </div>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-accent-primary px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>

        {/* Body */}
        <div className="mt-12 flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <a href="#hero" className="font-display text-xl font-extrabold">
              Vaibhav<span className="text-accent-primary">.</span>
            </a>
            <p className="mt-4 text-sm text-text-secondary">
              Turning raw data into business clarity. Power BI · Python · SQL · ML.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent-primary hover:text-text-primary"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3">
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
          <p>© 2026 Vaibhav Chauhan — Data Analyst · Delhi, India</p>
          <p>Built with Next.js, GSAP, and Three.js</p>
        </div>
      </div>
    </footer>
  )
}
