'use client'

import { SectionHeader } from '@/components/shared/SectionHeader'
import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { techStack, type TechItem } from '@/lib/data/techstack'

// Split the toolbox across two counter-rotating orbits.
const outerRing = techStack.slice(0, 10)
const innerRing = techStack.slice(10)

export function TechStack() {
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
