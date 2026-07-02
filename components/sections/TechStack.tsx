'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, EASE, registerGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { techStack } from '@/lib/data/techstack'

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
