'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, EASE, registerGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { techStack, type TechItem } from '@/lib/data/techstack'

// Split the toolbox across two counter-rotating orbits.
const outerRing = techStack.slice(0, 10)
const innerRing = techStack.slice(10)

export function TechStack() {
  const grid = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = grid.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.querySelectorAll('.tech-icon').forEach((n) => n.classList.add('is-ready'))
      return
    }
    registerGsap()
    const ctx = gsap.context(() => {
      el.querySelectorAll('.tech-icon').forEach((n) => n.classList.add('is-ready'))
      gsap.fromTo(
        '.tech-icon',
        {
          opacity: 0,
          y: () => gsap.utils.random(-30, 30),
          x: () => gsap.utils.random(-20, 20),
          scale: 0.6,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: { amount: 1.2, from: 'random' },
          ease: EASE.back,
          scrollTrigger: { trigger: el, start: 'top 80%' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="tech-stack" className="section border-t border-border-subtle bg-bg-surface/30">
      <div className="container-x">
        <SectionHeader
          eyebrow="// 12. Tech Stack"
          title="Everything in the toolbox"
          align="center"
        />

        {/* Orbiting showcase — the toolbox in motion */}
        <div className="relative mx-auto mt-14 hidden h-[420px] w-full max-w-[520px] items-center justify-center sm:flex">
          {/* Center brand mark */}
          <div className="pointer-events-none z-10 grid h-24 w-24 place-items-center rounded-full border border-border-muted bg-bg-surface/80 text-center shadow-glow-subtle backdrop-blur">
            <span className="bg-gradient-brand bg-clip-text font-display text-sm font-bold leading-tight text-transparent">
              18<br />tools
            </span>
          </div>

          <OrbitingCircles iconSize={44} radius={200} duration={26}>
            {outerRing.map((tech) => (
              <OrbitIcon key={tech.name} tech={tech} />
            ))}
          </OrbitingCircles>
          <OrbitingCircles iconSize={38} radius={120} duration={20} reverse speed={1.2}>
            {innerRing.map((tech) => (
              <OrbitIcon key={tech.name} tech={tech} />
            ))}
          </OrbitingCircles>
        </div>

        <div
          ref={grid}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7"
        >
          {techStack.map((tech) => (
            <div
              key={tech.name}
              data-animate
              className="tech-icon group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-border-subtle bg-bg-surface transition-all duration-200 hover:-translate-y-1.5 hover:border-border-muted"
            >
              <tech.icon
                className="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
                style={{ color: tech.color }}
                aria-hidden="true"
              />
              <span className="px-1 text-center font-mono text-[10px] leading-tight text-text-secondary">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** A single orbiting toolbox chip. */
function OrbitIcon({ tech }: { tech: TechItem }) {
  return (
    <div
      title={tech.name}
      className="flex h-full w-full items-center justify-center rounded-full border border-border-subtle bg-bg-surface/90 p-2 shadow-md backdrop-blur transition-transform duration-200 hover:scale-125"
    >
      <tech.icon className="h-full w-full" style={{ color: tech.color }} aria-hidden="true" />
    </div>
  )
}
