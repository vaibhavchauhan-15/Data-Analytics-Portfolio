'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { KineticText } from '@/components/ui/kinetic-text'
import { useMediaQuery } from '@/lib/hooks/useInViewport'
import { FloatingPaths } from '@/components/ui/background-paths'
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'
import { SITE_CONFIG } from '@/lib/config'
import { SiPython, SiMysql, SiPandas, SiNumpy } from 'react-icons/si'
import { FaFileExcel, FaChartBar } from 'react-icons/fa'
import { ArrowRight, Download } from 'lucide-react'

/* ─── Data ───────────────────────────────────────────────────────────── */

const TECH_CHIPS = [
  'SQL',
  'Python',
  'Power BI',
  'Excel',
  'Pandas',
  'NumPy',
]

const ORBIT_ICONS = [
  { Icon: SiPython, label: 'Python', color: '#3776AB' },
  { Icon: SiMysql, label: 'SQL', color: '#4479A1' },
  { Icon: FaChartBar, label: 'Power BI', color: '#F2C811' },
  { Icon: FaFileExcel, label: 'Excel', color: '#217346' },
  { Icon: SiPandas, label: 'Pandas', color: '#150458' },
  { Icon: SiNumpy, label: 'NumPy', color: '#013243' },
]

const FLOATING_BADGES = [
  { text: 'Interactive Dashboards', delay: 0 },
  { text: '50K+ Rows Analyzed', delay: 4 },
  { text: 'Machine Learning', delay: 8 },
]

/* ─── Animation helpers ──────────────────────────────────────────────── */

const fadeUp = (delay: number, reduced = false) => ({
  initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: reduced ? 0.3 : 0.5,
    delay: reduced ? 0 : delay,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  },
})

/* ─── Component ──────────────────────────────────────────────────────── */

export function Hero() {
  const reduced = useReducedMotion() ?? false
  // Below `sm` the Analytics Workspace is hidden — skip its infinite animations.
  const isMobile = useMediaQuery('(max-width: 639px)')
  const staticMotion = reduced || isMobile

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-white font-sora dark:bg-neutral-950"
    >
      {/* Background paths — reduced opacity so they don't compete */}
      <div aria-hidden="true" className="absolute inset-0 z-0 opacity-50 dark:opacity-40">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Fade-out mask on left side so paths don't cross text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white via-white/80 to-transparent dark:from-neutral-950 dark:via-neutral-950/80 lg:via-transparent lg:dark:via-transparent"
        style={{ width: '55%' }}
      />

      {/* Subtle accent glow — top right only */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[radial-gradient(80%_80%_at_90%_-10%,rgba(57,255,20,0.18),transparent_55%)] opacity-70 dark:opacity-100"
      />

      {/* Main content — asymmetric bottom padding lifts content above the fixed dock */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-32 pt-24 sm:px-8 sm:pb-36 sm:pt-28 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* ─── Left: Text content ─── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Availability badge */}
            <motion.div {...fadeUp(0.1, reduced)} className="mb-5 sm:mb-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-border-subtle bg-white/60 px-4 py-2 backdrop-blur-md dark:bg-black/35 dark:border-white/10">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-primary" />
                </span>
                <AnimatedShinyText className="text-xs font-medium sm:text-sm">
                  Available for Full-Time
                </AnimatedShinyText>
                <span className="hidden text-xs text-neutral-500 dark:text-white/50 sm:inline">
                  · {SITE_CONFIG.location}
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div {...fadeUp(0.2, reduced)} className="mb-2">
              <KineticText
                text="Vaibhav"
                className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-500/40 bg-clip-text text-transparent text-[clamp(3.5rem,9vw,6.5rem)] uppercase leading-[1] tracking-[-0.04em] [font-family:var(--font-sora-flex)] [font-optical-sizing:auto] dark:from-white dark:via-white dark:to-white/30 justify-center lg:justify-start"
              />
            </motion.div>

            {/* Role */}
            <motion.div {...fadeUp(0.3, reduced)} className="mb-4 sm:mb-5">
              <KineticText
                as="span"
                text="Data Analyst"
                className="text-[clamp(1.75rem,5vw,3.5rem)] uppercase leading-[1.1] tracking-[-0.03em] text-accent-primary [font-family:var(--font-sora-flex)] [font-optical-sizing:auto] justify-center lg:justify-start"
              />
            </motion.div>

            {/* Headline — inside glass panel for readability */}
            <motion.div
              {...fadeUp(0.4, reduced)}
              className="mb-4 rounded-2xl border border-white/10 bg-white/60 px-5 py-4 backdrop-blur-md dark:bg-black/35 sm:px-6 sm:py-5"
            >
              <p className="text-[clamp(1rem,2vw,1.375rem)] font-light leading-snug text-neutral-800 dark:text-white/85">
                Transforming complex datasets into actionable business insights.
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              {...fadeUp(0.5, reduced)}
              className="mb-6 max-w-xl text-[clamp(0.875rem,1.3vw,1.05rem)] leading-relaxed text-neutral-600 dark:text-white/55"
            >
              Data Analyst specializing in SQL, Python, Excel and Power BI. I build
              dashboards, automate reporting and uncover insights that help businesses
              make faster, data-driven decisions.
            </motion.p>

            {/* Tech chips */}
            <motion.div
              {...fadeUp(0.6, reduced)}
              className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8 lg:justify-start"
            >
              {TECH_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-neutral-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur-sm transition-all hover:border-accent-primary/50 hover:bg-accent-primary/5 hover:scale-[1.04] dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-accent-primary/40 dark:hover:bg-accent-primary/10"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* CTAs — full-width stacked on mobile, inline row from sm up */}
            <motion.div
              {...fadeUp(0.7, reduced)}
              className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              {/* Primary */}
              <a
                href="#projects"
                className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent-primary px-7 py-3.5 text-sm font-bold text-accent-foreground transition-all hover:shadow-glow active:scale-[0.97] sm:w-auto"
              >
                <span className="relative z-10">View Projects</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
              </a>

              {/* Secondary */}
              <a
                href={SITE_CONFIG.resumeUrl}
                download
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-neutral-800 backdrop-blur transition-all hover:border-accent-primary hover:bg-white active:scale-[0.97] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-accent-primary dark:hover:bg-white/10 sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>

              {/* Tertiary */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-1 px-2 py-1 text-sm font-medium text-neutral-500 transition-colors hover:text-accent-primary dark:text-white/50 dark:hover:text-accent-primary sm:justify-start"
              >
                Contact Me
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>

          {/* ─── Right: Analytics Workspace ─── */}
          <motion.div
            {...fadeUp(0.4, reduced)}
            className="relative hidden items-center justify-center sm:flex lg:justify-end"
          >
            <div className="relative h-[270px] w-[270px] sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px]">
              {/* Orbit rings */}
              <div className="absolute inset-0 rounded-full border border-neutral-200/50 dark:border-white/[0.07]" />
              <div className="absolute inset-[18%] rounded-full border border-neutral-200/30 dark:border-white/[0.05]" />

              {/* Subtle glow behind center */}
              <div className="absolute inset-[25%] rounded-full bg-gradient-to-br from-accent-primary/8 via-accent-primary/4 to-transparent blur-3xl" />

              {/* Center — ID Card with photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex w-[130px] flex-col items-center rounded-2xl border border-neutral-200/70 bg-white/90 pb-4 pt-3 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/90 sm:w-[150px] sm:pb-5 sm:pt-4">
                  {/* Card hole */}
                  <div className="mb-2 h-1.5 w-6 rounded-full bg-neutral-300/60 dark:bg-white/15 sm:mb-3" />
                  {/* Photo */}
                  <div className="mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-accent-primary/30 sm:mb-3 sm:h-20 sm:w-20">
                    <Image
                      src="/avatar/profile.jpg"
                      alt="Vaibhav Chauhan"
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                  {/* Name */}
                  <p className="text-xs font-bold text-neutral-900 dark:text-white sm:text-sm">
                    Vaibhav
                  </p>
                  {/* Role */}
                  <p className="text-[10px] font-medium text-accent-primary sm:text-xs">
                    Data Analyst
                  </p>
                </div>
              </div>

              {/* Orbiting tech icons */}
              {ORBIT_ICONS.map((tech, index) => {
                const angle = (360 / ORBIT_ICONS.length) * index - 90
                const radius = 42
                const rad = (angle * Math.PI) / 180
                const x = 50 + radius * Math.cos(rad)
                const y = 50 + radius * Math.sin(rad)

                return (
                  <motion.div
                    key={tech.label}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={staticMotion ? undefined : { y: [0, -5, 0] }}
                    transition={
                      staticMotion
                        ? undefined
                        : {
                            duration: 3.5 + index * 0.4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.2,
                          }
                    }
                  >
                    <div className="group flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/70 bg-white/90 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:shadow-lg dark:border-white/10 dark:bg-neutral-800/90 sm:h-12 sm:w-12">
                      <tech.Icon
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        style={{ color: tech.color }}
                      />
                      {/* Tooltip */}
                      <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-neutral-900">
                        {tech.label}
                      </span>
                    </div>
                  </motion.div>
                )
              })}

              {/* Floating contextual badges */}
              {FLOATING_BADGES.map((badge, i) => {
                const positions = [
                  { top: '8%', right: '-5%' },
                  { bottom: '12%', left: '-8%' },
                  { bottom: '5%', right: '0%' },
                ]
                return (
                  <motion.div
                    key={badge.text}
                    className="absolute hidden sm:block"
                    style={positions[i]}
                    animate={staticMotion ? { opacity: 1 } : { opacity: [0, 1, 1, 0] }}
                    transition={
                      staticMotion
                        ? { duration: 0.3 }
                        : {
                            duration: 4,
                            repeat: Infinity,
                            delay: badge.delay,
                            repeatDelay: 8,
                            ease: 'easeInOut',
                          }
                    }
                  >
                    <div className="rounded-lg border border-neutral-200/60 bg-white/90 px-3 py-1.5 text-[10px] font-medium text-neutral-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-800/90 dark:text-white/70 sm:text-xs">
                      {badge.text}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
