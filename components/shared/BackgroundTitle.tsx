'use client'

import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

type Position = 'left' | 'center' | 'right'

interface BackgroundTitleProps {
  /** The word to blow up behind the section (e.g. "Projects"). */
  text: string
  /** Horizontal anchor. Left/right push a letter off-screen for the clipped look. */
  position?: Position
  className?: string
}

// "Ghost typography": the word emerges from darkness rather than just sitting at
// low opacity. Two layers do the work:
//  - The fill is `--bg-title-fill` (globals.css) clipped to the glyphs via
//    background-clip: text — a theme-aware gradient (soft white in dark, charcoal
//    in light) that fades down the letters. Top ~half carries the luminance.
//  - MASK dissolves the whole span: vertically it's fully visible to 45%, fades
//    through 75%, gone by ~88% (no hard cut); horizontally the trailing
//    characters melt off the right edge.
// A sub-pixel blur softens the whole thing into the background.
const MASK =
  'linear-gradient(to bottom, #000 0%, #000 45%, rgba(0,0,0,.55) 75%, transparent 88%), linear-gradient(to right, #000 0%, #000 82%, transparent 100%)'

/**
 * Oversized ghost section title that sits *behind* the content and drifts on
 * scroll (parallax). Decorative only — hidden from the a11y tree.
 *
 * Clipping is real, not faked: the wrapper's `overflow-hidden` crops the
 * oversized span, `position` shoves a letter past the edge, and the mask fades
 * what's left. The wrapper is `z-0`, so give the section's content wrapper
 * `relative z-10` to layer it on top (same pattern the Hero uses).
 */
export function BackgroundTitle({ text, position = 'left', className }: BackgroundTitleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // Rides native scroll → works with Lenis for free (Lenis drives window scroll).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Title travels against the foreground → parallax depth. Frozen for reduced motion.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['18%', '-18%'])
  const x = position === 'center' ? '-50%' : 0

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
    >
      <m.span
        // x/y both go through Framer so Tailwind translate can't clobber the transform.
        style={{
          x,
          y,
          willChange: 'transform',
          // Theme-aware fill fades down the glyphs (emerging-from-dark look).
          backgroundImage: 'var(--bg-title-fill)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          maskImage: MASK,
          WebkitMaskImage: MASK,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
          filter: 'blur(0.6px)',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'absolute top-0 block whitespace-nowrap font-display font-black uppercase leading-[0.8]',
          'tracking-[-0.06em] [font-size:clamp(12rem,18vw,18rem)]',
          position === 'left' && 'left-[2%]',
          position === 'right' && 'right-[-4%]',
          position === 'center' && 'left-1/2',
          className
        )}
      >
        {text}
      </m.span>
    </div>
  )
}
