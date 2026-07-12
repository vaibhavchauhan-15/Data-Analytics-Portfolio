import { KineticText } from '@/components/ui/kinetic-text'
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'
import { SITE_CONFIG } from '@/lib/config'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-end overflow-hidden bg-hero-bg font-sora"
    >
      {/* Accent-lit, top-right-weighted gradient backdrop — pure CSS, zero
          GPU/network cost. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(120%_100%_at_85%_-10%,rgba(57,255,20,0.28),transparent_55%),radial-gradient(90%_80%_at_100%_0%,rgba(57,255,20,0.12),transparent_60%)]"
      />

      {/* Dark overlay for legibility. `pointer-events-none` so it never blocks
          interaction with the content beneath it. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />

      {/* Content — anchored bottom-left, on the top layer. */}
      <div className="relative z-10 w-full max-w-[92%] px-6 pb-28 pt-28 sm:max-w-md sm:pb-12 sm:pt-32 md:px-10 lg:max-w-2xl">
        {/* Kinetic heading — each letter thickens (with a stroke) on hover and
            nudges its neighbours. Uses the variable-axis Sora so the weight
            transition morphs smoothly instead of snapping between instances. */}
        <div
          className="mb-2 animate-fade-up opacity-0 md:mb-4"
          style={{ animationDelay: '0.2s' }}
        >
          <KineticText
            text="Vaibhav"
            className="
  bg-gradient-to-b
  from-white
  to-slate-900/10
  bg-clip-text
  text-transparent
  text-[clamp(3rem,8vw,6rem)]
  uppercase
  leading-[1.05]
  tracking-[-0.05em]
  whitespace-pre-wrap
  text-center
  [font-family:var(--font-sora-flex)]
  [font-optical-sizing:auto]
"
          />
          <KineticText
            as="span"
            text="Data Analyst"
            className="text-[clamp(2rem,6vw,4rem)] uppercase leading-[1.05] tracking-[-0.05em] text-accent-primary [font-family:var(--font-sora-flex)] [font-optical-sizing:auto]"
          />
        </div>

        <p
          className="mb-3 animate-fade-up text-[clamp(1.125rem,2.5vw,1.875rem)] font-light text-white/80 opacity-0 md:mb-6"
          style={{ animationDelay: '0.4s' }}
        >
          I turn raw data into decisions.
        </p>

        <p
          className="mb-4 animate-fade-up text-[clamp(0.875rem,1.5vw,1.25rem)] font-light text-white/60 opacity-0 md:mb-8"
          style={{ animationDelay: '0.55s' }}
        >
          Power BI dashboards built for clarity. Python pipelines that turn messy data
          into clean, trustworthy tables. SQL and ML systems designed to answer real
          business questions. All of it done right, not just fast.
        </p>

        <div
          className="flex animate-fade-up flex-wrap gap-3 font-bold opacity-0"
          style={{ animationDelay: '0.7s' }}
        >
          <a
            href="#contact"
            className="cursor-pointer rounded-sm bg-accent-primary px-6 py-3 text-sm text-accent-foreground transition-all hover:brightness-110 active:scale-[0.97] md:px-8 md:py-4"
          >
            Book a Call
          </a>
          <a
            href="#projects"
            className="cursor-pointer rounded-sm bg-white px-6 py-3 text-sm text-[#121212] transition-all hover:brightness-90 active:scale-[0.97] md:px-8 md:py-4"
          >
            My Work
          </a>
        </div>

        <div
          className="mt-4 animate-fade-up opacity-0 md:mt-6"
          style={{ animationDelay: '0.85s' }}
        >
          <div className="inline-flex items-center rounded-full border border-border-subtle bg-bg-surface/40 px-4 py-1.5 backdrop-blur transition-colors hover:bg-bg-surface/70">
            <span className="relative mr-2.5 flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-primary" />
            </span>
            <AnimatedShinyText className="text-xs font-medium">
              Open to work · {SITE_CONFIG.location} · Data Analyst
            </AnimatedShinyText>
          </div>
        </div>
      </div>
    </section>
  )
}
