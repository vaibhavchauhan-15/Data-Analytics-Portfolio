# ANIMATIONS.md — Complete Animation Spec

All animations use GSAP + ScrollTrigger unless noted. Framer Motion handles component-level mount/exit animations. Lenis handles smooth scrolling.

---

## 0. Global Setup

### 0.1 Lenis Init (`lib/lenis.ts`)

```typescript
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })

  // Connect to GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenis
}
```

### 0.2 GSAP Registration (`lib/gsap.ts`)

```typescript
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin }
```

### 0.3 Reduced Motion Guard

```typescript
// Wrap every animation
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReduced) {
  // all GSAP animations here
}
```

### 0.4 Standard Easings

```typescript
const EASE = {
  out:     'power3.out',
  inOut:   'power2.inOut',
  expo:    'expo.out',
  back:    'back.out(1.7)',
  elastic: 'elastic.out(1, 0.5)',
}
```

---

## 1. Scroll Progress Bar

**Element:** `div#scroll-progress` fixed top-0, height 2px, background `--accent-primary`  
**Method:** Vanilla JS + `requestAnimationFrame` (no GSAP — lighter)

```typescript
function updateProgress() {
  const scrolled = window.scrollY
  const total = document.body.scrollHeight - window.innerHeight
  const pct = (scrolled / total) * 100
  document.getElementById('scroll-progress')!.style.width = `${pct}%`
  requestAnimationFrame(updateProgress)
}
requestAnimationFrame(updateProgress)
```

---

## 2. Cursor Glow (Desktop Only)

**Element:** `div#cursor-glow`, position fixed, 600px × 600px radial gradient, pointer-events: none, z-index: 9999  
**Method:** Mouse move event with lerp

```typescript
let mouseX = 0, mouseY = 0
let glowX = 0, glowY = 0

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

function animateCursor() {
  glowX += (mouseX - glowX) * 0.08
  glowY += (mouseY - glowY) * 0.08
  const el = document.getElementById('cursor-glow')!
  el.style.transform = `translate(${glowX - 300}px, ${glowY - 300}px)`
  requestAnimationFrame(animateCursor)
}
animateCursor()
```

**Gradient:** `radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 65%)`

---

## 3. Hero Section Animations

### 3.1 Particle Field (Three.js)

Fires on component mount (no scroll trigger).

```typescript
// Particle parameters
const PARTICLE_COUNT = 4000            // desktop; 1000 on mobile
const SPREAD = 8                       // position spread (units)
const PARTICLE_SIZE = 0.015
const PARTICLE_COLOR = 0x6366F1        // --accent-primary
const DRIFT_SPEED = 0.0003            // orbit speed

// Mouse interaction
const MOUSE_STRENGTH = 0.3            // how far particles shift
const MOUSE_DAMPING = 0.05            // lerp speed
```

**Init sequence:**
1. t=0ms: canvas opacity 0
2. t=0ms → 800ms: canvas fades in (GSAP `opacity: 0 → 1`)
3. t=0ms: particles at `y: +200, opacity: 0` (below center)
4. t=0ms → 1500ms: particles drift up to resting positions (staggered)
5. Ongoing: slow orbital drift + mouse attraction

### 3.2 Hero Text Entrance

All fire on page load, not scroll. Timeline:

```typescript
const tl = gsap.timeline({ delay: 0.2 })

// Badge
tl.fromTo('#hero-badge',
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.6, ease: EASE.expo }
)

// H1 — word by word (SplitText)
tl.fromTo('.hero-h1 .word',
  { opacity: 0, y: 60, rotateX: -20 },
  {
    opacity: 1, y: 0, rotateX: 0,
    duration: 0.8,
    ease: EASE.expo,
    stagger: 0.06,
  },
  '-=0.3'  // overlap with badge animation
)

// Subhead
tl.fromTo('#hero-subhead',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.7, ease: EASE.out },
  '-=0.4'
)

// CTAs
tl.fromTo('.hero-cta',
  { opacity: 0, y: 20, scale: 0.95 },
  { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: EASE.back, stagger: 0.1 },
  '-=0.3'
)

// Social links
tl.fromTo('.hero-social a',
  { opacity: 0, y: 10 },
  { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
  '-=0.2'
)

// Scroll cue chevron
tl.fromTo('#scroll-cue',
  { opacity: 0 },
  { opacity: 1, duration: 0.5 },
  '-=0.1'
)
```

### 3.3 Hero Scroll-Out

```typescript
ScrollTrigger.create({
  trigger: '#hero',
  start: 'top top',
  end: 'bottom top',
  scrub: 1,
  onUpdate: (self) => {
    const p = self.progress
    gsap.set('#hero-content', { y: p * 100, opacity: 1 - p * 1.5 })
    gsap.set('#particle-canvas', { scale: 1 + p * 0.1, opacity: 1 - p * 0.8 })
  }
})
```

---

## 4. Section Background Color Transitions

```typescript
const bgColors = [
  { section: '#hero',          color: '#060609' },
  { section: '#about',         color: '#07070F' },
  { section: '#kpi',           color: '#0A0A16' },
  { section: '#skills',        color: '#060609' },
  { section: '#experience',    color: '#080812' },
  { section: '#projects',      color: '#070710' },
  { section: '#dashboard',     color: '#0A0A16' },
  { section: '#contact',       color: '#0D0D18' },
]

bgColors.forEach(({ section, color }) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 60%',
    end: 'bottom 40%',
    onEnter: () => gsap.to('body', { backgroundColor: color, duration: 0.8, ease: EASE.inOut }),
    onEnterBack: () => gsap.to('body', { backgroundColor: color, duration: 0.8, ease: EASE.inOut }),
  })
})
```

---

## 5. Section Label Reveal

Applies to ALL `<SectionLabel>` components (eyebrow text like `// 02. ABOUT`).

```typescript
// In RevealText wrapper — fires for every section
gsap.fromTo(
  '.section-label',
  { opacity: 0, x: -20 },
  {
    opacity: 1, x: 0,
    duration: 0.6,
    ease: EASE.expo,
    scrollTrigger: {
      trigger: '.section-label',
      start: 'top 85%',
    }
  }
)
```

---

## 6. About Section

```typescript
// Image slides in from left
gsap.fromTo('#about-image',
  { x: -80, opacity: 0, rotate: -3 },
  {
    x: 0, opacity: 1, rotate: 0,
    duration: 1.0,
    ease: EASE.expo,
    scrollTrigger: { trigger: '#about', start: 'top 70%' }
  }
)

// Text blocks stagger up
gsap.fromTo('.about-text p',
  { opacity: 0, y: 40 },
  {
    opacity: 1, y: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: EASE.out,
    scrollTrigger: { trigger: '#about-text', start: 'top 75%' }
  }
)

// Chips stagger
gsap.fromTo('.about-chip',
  { opacity: 0, scale: 0.8 },
  {
    opacity: 1, scale: 1,
    duration: 0.4,
    stagger: 0.1,
    ease: EASE.back,
    scrollTrigger: { trigger: '.about-chips', start: 'top 80%' }
  }
)
```

---

## 7. KPI Stats (Animated Counters)

```typescript
// Counter runs when element enters viewport
// AnimatedCounter component uses react-intersection-observer

function animateCounter(el: Element, target: number, suffix: string) {
  gsap.fromTo(
    { val: 0 },
    {
      val: target,
      duration: 2.0,
      ease: 'power2.out',
      onUpdate: function() {
        el.textContent = Math.round(this.targets()[0].val) + suffix
      }
    }
  )
}

// Counters:
// { target: 4,   suffix: '',    label: 'Power BI Dashboards' }
// { target: 40,  suffix: '%',   label: 'Query Speedup' }
// { target: 30,  suffix: '%+',  label: 'Data Quality Fix' }
// { target: 3,   suffix: '',    label: 'Teams Impacted' }
```

---

## 8. Skills Cards

```typescript
// Stagger wave: left-to-right, row by row
gsap.fromTo('.skill-card',
  { opacity: 0, y: 50 },
  {
    opacity: 1, y: 0,
    duration: 0.6,
    stagger: { amount: 0.8, from: 'start' },
    ease: EASE.expo,
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 75%',
    }
  }
)

// Proficiency bar fill (separate timeline per card)
gsap.fromTo('.skill-bar-fill',
  { width: '0%' },
  {
    width: (i, el) => el.dataset.pct + '%',
    duration: 1.2,
    ease: 'power2.out',
    stagger: 0.05,
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 70%',
    }
  }
)
```

---

## 9. Experience Timeline

```typescript
// Draw SVG line from top to bottom as user scrolls
gsap.fromTo('#timeline-line',
  { drawSVG: '0%' },
  {
    drawSVG: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '#experience',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
    }
  }
)

// Each entry fades in as line reaches it
document.querySelectorAll('.timeline-entry').forEach((entry, i) => {
  gsap.fromTo(entry,
    { opacity: 0, x: 40 },
    {
      opacity: 1, x: 0,
      duration: 0.7,
      ease: EASE.expo,
      scrollTrigger: {
        trigger: entry,
        start: 'top 80%',
      }
    }
  )
})

// Dot pulse when active
gsap.to('.timeline-dot',
  {
    scale: 1.3,
    boxShadow: '0 0 0 8px rgba(99,102,241,0.2)',
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  }
)
```

---

## 10. Certifications — Card Flip

```typescript
// Framer Motion variant (in CertCard.tsx)
const cardVariants = {
  hidden: { rotateY: -90, opacity: 0 },
  visible: (i: number) => ({
    rotateY: 0,
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    }
  })
}

// Trigger via react-intersection-observer
// style={{ perspective: '1000px' }} on parent
```

---

## 11. Featured Projects

```typescript
gsap.fromTo('.feature-card',
  { opacity: 0, y: 60, scale: 0.96 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: 0.9,
    stagger: 0.2,
    ease: EASE.expo,
    scrollTrigger: {
      trigger: '#featured-projects',
      start: 'top 75%',
    }
  }
)

// Image zoom on hover (CSS)
// .feature-card-image { transition: transform 400ms ease; }
// .feature-card:hover .feature-card-image { transform: scale(1.06); }

// Badge stagger
gsap.fromTo('.feature-card .badge',
  { opacity: 0, scale: 0.7 },
  {
    opacity: 1, scale: 1,
    stagger: 0.04,
    duration: 0.3,
    ease: EASE.back,
    scrollTrigger: {
      trigger: '.feature-card',
      start: 'top 70%',
    }
  }
)
```

---

## 12. Projects Index — Tab Switch

```typescript
// Framer Motion AnimatePresence for card grid
// When tab changes: exit → enter

const exitVariants = {
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
}
const enterVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  })
}
```

---

## 13. Dashboard Showcase (Horizontal Sticky Scroll)

```typescript
// Section height = 300vh (CSS)
// Inner container: sticky, 100vh height

const dashboardSection = document.querySelector('#dashboard-showcase')
const track = document.querySelector('#dashboard-track')
const cards = document.querySelectorAll('.dashboard-card')

const totalScrollWidth = (cards.length * 640) - window.innerWidth + 80

gsap.to(track, {
  x: -totalScrollWidth,
  ease: 'none',
  scrollTrigger: {
    trigger: dashboardSection,
    start: 'top top',
    end: `+=${totalScrollWidth}`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
  }
})

// Dashboard card scale + glow on center approach
ScrollTrigger.create({
  trigger: dashboardSection,
  start: 'top top',
  end: `+=${totalScrollWidth}`,
  scrub: 1,
  onUpdate: (self) => {
    cards.forEach((card, i) => {
      const cardCenter = (i + 0.5) / cards.length
      const dist = Math.abs(self.progress - cardCenter)
      const scale = 1 - Math.min(dist * 0.4, 0.08)
      const opacity = 1 - Math.min(dist * 2, 0.4)
      gsap.set(card, { scale, opacity })
    })
  }
})
```

---

## 14. Case Studies — Clip-Path Wipe

```typescript
// Before/after reveal using clip-path
// Left panel = problem state, right panel = solution state

gsap.fromTo('.case-solution',
  { clipPath: 'inset(0 100% 0 0)' },
  {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.2,
    ease: EASE.expo,
    scrollTrigger: {
      trigger: '.case-study-card',
      start: 'top 65%',
    }
  }
)
```

---

## 15. Tech Stack Icon Wall

```typescript
// Random float-in with scatter stagger
gsap.fromTo('.tech-icon',
  {
    opacity: 0,
    y: () => gsap.utils.random(-30, 30),
    x: () => gsap.utils.random(-20, 20),
    scale: 0.6,
  },
  {
    opacity: 1, y: 0, x: 0, scale: 1,
    duration: 0.5,
    stagger: { amount: 1.2, from: 'random' },
    ease: EASE.back,
    scrollTrigger: {
      trigger: '#tech-stack',
      start: 'top 75%',
    }
  }
)

// Hover: lift + tooltip
// CSS: .tech-icon:hover { transform: translateY(-6px); transition: 200ms ease; }
```

---

## 16. Contact Section

```typescript
// Floating background shapes (CSS keyframes, no GSAP)
// .contact-blob { animation: float 8s ease-in-out infinite; }
// @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

// Form fades in
gsap.fromTo('#contact-form',
  { opacity: 0, y: 50 },
  {
    opacity: 1, y: 0,
    duration: 0.8,
    ease: EASE.expo,
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 70%',
    }
  }
)

// Contact info slides from left
gsap.fromTo('#contact-info',
  { opacity: 0, x: -40 },
  {
    opacity: 1, x: 0,
    duration: 0.8,
    ease: EASE.expo,
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 70%',
    }
  }
)
```

---

## 17. Text Reveal (All Section H2s)

Applies globally via `<RevealText>` component wrapper.

```typescript
// RevealText.tsx
// 1. On mount: split H2 into words via SplitText
// 2. Wrap each word in overflow-hidden span
// 3. Animate children translate from below

const split = new SplitText(ref.current, { type: 'words' })
gsap.fromTo(split.words,
  { y: '110%' },
  {
    y: '0%',
    duration: 0.7,
    stagger: 0.04,
    ease: EASE.expo,
    scrollTrigger: {
      trigger: ref.current,
      start: 'top 85%',
    }
  }
)
// Cleanup: split.revert() on unmount
```

---

## 18. Navbar Scroll Behavior

```typescript
// Pure CSS transition via scroll class toggle
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav')!
  if (window.scrollY > 80) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled')
  }
})

// CSS:
// nav { transition: background 300ms ease, border-color 300ms ease; }
// nav.scrolled { background: rgba(13,13,20,0.8); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-subtle); }
```

---

## 19. Page Load Sequence (Total)

```
0ms     — Lenis + GSAP init
50ms    — Particle field canvas opacity: 0→1 (800ms)
200ms   — Hero badge fade up
260ms   — H1 words reveal (word 1 of N)
800ms   — All H1 words visible
860ms   — Subhead fade up
1000ms  — CTAs scale in
1100ms  — Social links fade up
1200ms  — Scroll cue appears
1500ms  — All hero animations complete, scroll ready
```

---

## Animation Cleanup Rules

1. All GSAP ScrollTrigger instances: `kill()` in React `useEffect` cleanup
2. SplitText instances: `revert()` on unmount
3. Three.js renderer: `dispose()` on unmount + remove from DOM
4. Lenis: `destroy()` on app unmount
5. RAF loops: clear with returned cancel function