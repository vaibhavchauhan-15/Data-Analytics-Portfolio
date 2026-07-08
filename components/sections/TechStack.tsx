'use client'

'use client'

import { SectionHeader } from '@/components/shared/SectionHeader'
import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { useInViewport, useMediaQuery } from '@/lib/hooks/useInViewport'
import { techStack, type TechItem } from '@/lib/data/techstack'

// Split the toolbox across two counter-rotating orbits.
const outerRing = techStack.slice(0, 10)
const innerRing = techStack.slice(10)

export function TechStack() {
  const [ref, inView] = useInViewport<HTMLElement>()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  // Only spin the ring set that's actually visible for the current breakpoint,
  // and only while the section is on screen. Previously all 18 chips on both
  // the mobile and desktop layouts rotated at once, even parked offscreen.
  const mobilePaused = !inView || isDesktop
  const desktopPaused = !inView || !isDesktop

  return (
    <section
      ref={ref}
      id="tech-stack"
      className="section border-t border-border-subtle bg-bg-surface/30"
    >
      <div className="container-x">
        <SectionHeader
          eyebrow="// Tech Stack"
          title="Everything in the toolbox"
          align="center"
        />

        {/* Orbiting showcase — mobile (scaled-down radii so it fits ~320px). */}
        <div className="relative mx-auto mt-10 flex h-[300px] w-full max-w-[300px] items-center justify-center sm:hidden">
          <div className="pointer-events-none z-10 grid h-16 w-16 place-items-center rounded-full border border-border-muted bg-bg-surface/80 text-center shadow-glow-subtle backdrop-blur">
            <span className="bg-gradient-brand bg-clip-text font-display text-xs font-bold leading-tight text-transparent">
              18<br />tools
            </span>
          </div>
          <OrbitingCircles iconSize={34} radius={130} duration={26} paused={mobilePaused}>
            {outerRing.map((tech) => (
              <OrbitIcon key={tech.name} tech={tech} />
            ))}
          </OrbitingCircles>
          <OrbitingCircles iconSize={30} radius={78} duration={20} reverse speed={1.2} paused={mobilePaused}>
            {innerRing.map((tech) => (
              <OrbitIcon key={tech.name} tech={tech} />
            ))}
          </OrbitingCircles>
        </div>

        {/* Orbiting showcase — the toolbox in motion (>= sm only) */}
        <div className="relative mx-auto mt-14 hidden h-[420px] w-full max-w-[520px] items-center justify-center sm:flex">
          {/* Center brand mark */}
          <div className="pointer-events-none z-10 grid h-24 w-24 place-items-center rounded-full border border-border-muted bg-bg-surface/80 text-center shadow-glow-subtle backdrop-blur">
            <span className="bg-gradient-brand bg-clip-text font-display text-sm font-bold leading-tight text-transparent">
              18<br />tools
            </span>
          </div>

          <OrbitingCircles iconSize={44} radius={200} duration={26} paused={desktopPaused}>
            {outerRing.map((tech) => (
              <OrbitIcon key={tech.name} tech={tech} />
            ))}
          </OrbitingCircles>
          <OrbitingCircles iconSize={38} radius={120} duration={20} reverse speed={1.2} paused={desktopPaused}>
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
      // Solid surface instead of backdrop-blur: a translating blurred chip forces
      // the compositor to re-sample the backdrop every frame while it orbits.
      className="flex h-full w-full items-center justify-center rounded-full border border-border-subtle bg-bg-surface p-2 shadow-md transition-transform duration-200 hover:scale-125"
    >
      <tech.icon className="h-full w-full" style={{ color: tech.color }} aria-hidden="true" />
    </div>
  )
}
