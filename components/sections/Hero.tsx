'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { ArrowDown, Download, Github, Linkedin, ChevronDown } from 'lucide-react'
import { gsap, ScrollTrigger, EASE, registerGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/config'
import { Badge } from '@/components/ui/Badge'

const ParticleField = dynamic(() => import('@/components/canvas/ParticleField'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-glow" />,
})

const H1_WORDS = ['Turning', 'Raw', 'Data', 'into', 'Business', 'Clarity.']

export function Hero() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.querySelectorAll('[data-animate]').forEach((n) => n.classList.add('is-ready'))
      return
    }

    registerGsap()
    const ctx = gsap.context(() => {
      el.querySelectorAll('[data-animate]').forEach((n) => n.classList.add('is-ready'))

      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo('#hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: EASE.expo })
        .fromTo(
          '.hero-word',
          { opacity: 0, y: 60, rotateX: -20 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: EASE.expo, stagger: 0.06 },
          '-=0.3'
        )
        .fromTo('#hero-subhead', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: EASE.out }, '-=0.4')
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: EASE.back, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo('.hero-social', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, '-=0.2')
        .fromTo('#scroll-cue', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1')

      // Scroll-out parallax
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set('#hero-content', { y: p * 100, opacity: 1 - p * 1.5 })
          gsap.set('#particle-canvas', { opacity: 1 - p * 0.8 })
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-noise"
    >
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow" />

      <div id="hero-content" className="container-x relative z-10 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div id="hero-badge" data-animate className="mb-8 flex justify-center">
            <Badge variant="green">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
              </span>
              Open to Work · Delhi NCR / Remote
            </Badge>
          </div>

          <h1
            className="hero-h1 font-display text-5xl font-extrabold leading-[1.05] tracking-tight"
            style={{ perspective: '1000px' }}
          >
            {H1_WORDS.map((word, i) => (
              <span
                key={i}
                data-animate
                className={
                  'hero-word mr-[0.25em] inline-block ' +
                  (i >= 4 ? 'text-gradient' : 'text-text-primary')
                }
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            id="hero-subhead"
            data-animate
            className="mx-auto mt-8 max-w-xl text-lg text-text-secondary"
          >
            Data Analyst · Python · Power BI · SQL
            <br />
            Building dashboards, pipelines, and decisions.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#projects" className="hero-cta" data-animate>
              <span className="inline-flex h-12 items-center gap-2 rounded-md bg-accent-primary px-7 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-glow">
                View My Work <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
            <a href={SITE_CONFIG.resumeUrl} download className="hero-cta" data-animate>
              <span className="inline-flex h-12 items-center gap-2 rounded-md border border-border-muted bg-bg-surface/60 px-7 text-sm font-medium text-text-primary backdrop-blur transition-all hover:border-accent-primary">
                <Download className="h-4 w-4" aria-hidden="true" /> Download Resume
              </span>
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-animate
              className="hero-social grid h-11 w-11 place-items-center rounded-full border border-border-subtle bg-bg-surface/40 text-text-secondary backdrop-blur transition-colors hover:border-accent-primary hover:text-text-primary"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-animate
              className="hero-social grid h-11 w-11 place-items-center rounded-full border border-border-subtle bg-bg-surface/40 text-text-secondary backdrop-blur transition-colors hover:border-accent-primary hover:text-text-primary"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <a
        id="scroll-cue"
        href="#about"
        data-animate
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-text-muted"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
