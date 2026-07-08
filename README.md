# Vaibhav Chauhan — Data Analyst Portfolio

A premium, dark-first, scroll-animated portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP, Spline, and Framer Motion. Visual complexity adapts to each device via an adaptive rendering engine (see below).

## Stack

- **Framework:** Next.js 14 (App Router, RSC, ISR)
- **Styling:** Tailwind CSS + CSS-variable design tokens (dark/light)
- **3D:** Spline (`@splinetool/react-spline`, lazy-loaded interactive hero scene, tier-gated)
- **Scroll animation:** GSAP + ScrollTrigger (+ SplitText / DrawSVG, free in 3.13+)
- **Component animation:** Framer Motion
- **Smooth scroll:** Lenis (wired to the GSAP ticker)
- **Forms:** React Hook Form + Zod
- **Email:** Resend (`/api/contact`)
- **Theme:** next-themes (`data-theme`)
- **Analytics:** Vercel Analytics

## Getting started

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY (optional for local)
npm run dev                  # http://localhost:3000
```

`npm run build && npm run start` for a production build.

## Environment variables

| Var | Required | Purpose |
|-----|----------|---------|
| `RESEND_API_KEY` | for live email | Sends contact-form submissions. Without it, the form succeeds but no email is sent. |
| `GITHUB_TOKEN` | optional | Raises the GitHub API rate limit for the GitHub Activity section. |
| `CONTACT_TO_EMAIL` | optional | Destination address for the contact form. Defaults to the configured email. |

## Editing content

All copy and data live in plain TypeScript — no CMS:

- `lib/config.ts` — name, links, resume URL, feature flags
- `lib/data/*.ts` — projects, skills, experience, education, certifications, KPIs, case studies, dashboards, achievements, FAQ, tech stack, testimonials

Feature flags in `lib/config.ts` (`showTestimonials`, `showFAQ`, `showDataStorytelling`, etc.) toggle optional sections.

## Assets to add (placeholders currently used)

Drop real images into `public/` (see `Docs/image-specs.md`):

- `public/avatar/profile.jpg` — profile photo (already copied from `Assets/`)
- `public/projects/*.webp` — 16:9 project covers
- `public/dashboards/*.webp` — 16:9 dashboard screenshots
- `public/resume/Vaibhav_Chauhan_Resume.pdf` — resume (already copied)

The OG image is generated dynamically at `/opengraph-image` — no static file needed.

## Structure

```
app/            layout, page (RSC), api/contact, sitemap, robots, opengraph-image
components/
  layout/       Navbar, MobileMenu, Footer, ScrollProgress, BackgroundController
  providers/    ThemeProvider, SmoothScroll (Lenis + GSAP), PerformanceProvider (device tiers)
  shared/       SectionHeader, RevealText, Reveal, AnimatedCounter, CursorGlow, ThemeToggle, SectionLabel
  sections/     Hero, About, KPIStats, Skills, Experience, Education, Certifications,
                Projects/, DashboardShowcase, CaseStudies, DataStorytelling, GitHub,
                TechStack, Achievements, Testimonials, FAQ, Contact
  ui/           Button, Badge
lib/            config, utils, fonts, gsap, github, schema, data/
styles/         globals.css (design tokens)
```

## Accessibility & performance

- All animations are disabled under `prefers-reduced-motion`.
- **Adaptive rendering engine** (`components/providers/PerformanceProvider.tsx` + `lib/performance/`): detects CPU, RAM, GPU, network, refresh rate, and input capabilities on the client, classifies the device into a tier (0 ultra-high … 4 ultra-low), and exposes it via `usePerformance()` / `useTier()`. Heavy features (Spline hero, Lenis smooth scroll, custom cursors, blur, infinite CSS loops) are gated on the tier and degrade to lightweight equivalents on low-end devices — force any tier for testing with `?perf=0`…`?perf=4`.
- Spline hero is dynamically imported (`ssr: false`), tier-gated, and pauses when offscreen; suppressed devices get a static gradient poster.
- Semantic landmarks, keyboard-navigable, focus-visible rings.
- Lighthouse targets: Performance ≥ 90, A11y ≥ 90, SEO ≥ 95.

## Deploy

Push to GitHub and import into Vercel. Add the env vars above. Enable Vercel Analytics.
