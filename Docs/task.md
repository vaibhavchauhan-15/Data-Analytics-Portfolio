# TASKS.md — Step-by-Step Build Tasks

Ordered by dependency. Complete each task before moving to the next. Each task is small enough to implement and test in one sitting.

Status: [ ] = todo, [x] = done, [-] = in progress

---

## Phase 1: Project Setup

### 1.1 Init
- [ ] T001: Run `create-next-app` with TypeScript + Tailwind + App Router (see TECH_SPEC.md §2)
- [ ] T002: Install all dependencies from TECH_SPEC.md §2
- [ ] T003: Run `npx shadcn-ui@latest init` with Default style, Slate base
- [ ] T004: Install shadcn components: button, card, badge, tabs, accordion, input, textarea, tooltip, select, separator
- [ ] T005: Create `.env.local` from `.env.example`, add `RESEND_API_KEY`
- [ ] T006: Create `lib/config.ts` with SITE_CONFIG (fill all fields from CONTENT.md)

### 1.2 Design System
- [ ] T007: Paste all CSS custom properties from DESIGN_SYSTEM.md §1 into `styles/globals.css`
- [ ] T008: Add Google Fonts via `next/font` in `app/layout.tsx` (DM Sans, Inter, JetBrains Mono)
- [ ] T009: Add `--font-display`, `--font-body`, `--font-mono` CSS vars + apply to `body`
- [ ] T010: Configure `tailwind.config.ts` — extend theme with all CSS vars as Tailwind tokens
- [ ] T011: Add `data-theme` attribute support and light mode token overrides to `globals.css`
- [ ] T012: Add `bg-noise` texture CSS class and `bg-grid` pattern class (DESIGN_SYSTEM.md §8)

### 1.3 Core Layout Shell
- [ ] T013: Create `app/layout.tsx` with ThemeProvider, Analytics, font classes
- [ ] T014: Create `app/page.tsx` as async Server Component (fetches GitHub repos)
- [ ] T015: Create `lib/gsap.ts` — register ScrollTrigger, SplitText, DrawSVGPlugin
- [ ] T016: Create `lib/lenis.ts` — Lenis init + GSAP ticker connection
- [ ] T017: Create `lib/fonts.ts` — export combined font class string
- [ ] T018: Create `lib/github.ts` — GitHub API fetch with ISR
- [ ] T019: Create `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)

---

## Phase 2: Global UI Components

### 2.1 Shared Components
- [ ] T020: Create `components/shared/SectionLabel.tsx` (eyebrow label, COMPONENTS.md §3)
- [ ] T021: Create `components/shared/ThemeToggle.tsx` (sun/moon, uses next-themes)
- [ ] T022: Create `components/shared/AnimatedCounter.tsx` (GSAP count-up, intersection observer)
- [ ] T023: Create `components/shared/RevealText.tsx` (GSAP SplitText word reveal wrapper)
- [ ] T024: Create `components/shared/CursorGlow.tsx` (mouse-follow gradient, desktop only)

### 2.2 UI Primitives
- [ ] T025: Create `components/ui/Badge.tsx` — 5 variants (COMPONENTS.md §3)
- [ ] T026: Create `components/ui/Button.tsx` — 4 variants + loading state
- [ ] T027: Verify shadcn Input, Textarea, Select render correctly with CSS vars

### 2.3 Layout Components
- [ ] T028: Create `components/layout/ScrollProgress.tsx` — fixed 2px bar (ANIMATIONS.md §1)
- [ ] T029: Create `components/layout/Navbar.tsx` — desktop layout, transparent → blur on scroll
- [ ] T030: Add mobile hamburger state to Navbar with useState
- [ ] T031: Create `components/layout/MobileMenu.tsx` — full-screen overlay, staggered links
- [ ] T032: Create `components/layout/Footer.tsx`
- [ ] T033: Wire Navbar active link highlight via IntersectionObserver on section IDs
- [ ] T034: Implement "Resume ↓" button download (anchor tag with `download` attr pointing to `/public/resume/`)

---

## Phase 3: Data Files

- [ ] T035: Create `lib/data/projects.ts` with all project entries (fill from CONTENT.md)
- [ ] T036: Create `lib/data/skills.ts` with all skill categories (fill from CONTENT.md)
- [ ] T037: Create `lib/data/experience.ts` with Coerror entry (fill from CONTENT.md)
- [ ] T038: Create `lib/data/certifications.ts` with 3 certs
- [ ] T039: Create `lib/data/kpis.ts` with 4 KPI stats
- [ ] T040: Create `lib/data/achievements.ts`
- [ ] T041: Create `lib/data/testimonials.ts` (can be empty array initially)
- [ ] T042: Create `lib/data/faq.ts` with 5+ questions (fill from CONTENT.md)
- [ ] T043: Create `lib/data/techstack.ts` with all tech icons list

---

## Phase 4: Section Components (Layout Only — No Animations Yet)

### 4.1 Hero
- [ ] T044: Create `components/canvas/ParticleField.tsx` — Three.js setup, basic point cloud renders
- [ ] T045: Add mouse interaction to ParticleField
- [ ] T046: Add IntersectionObserver pause/resume to ParticleField
- [ ] T047: Create `components/sections/Hero.tsx` — layout with all elements (badge, H1, subhead, CTAs, social)
- [ ] T048: Dynamic import ParticleField with `ssr: false` in Hero

### 4.2 About
- [ ] T049: Create `components/sections/About.tsx` — 2-col layout, image + text

### 4.3 KPI Stats
- [ ] T050: Create `components/sections/KPIStats.tsx` — 4-col stat bar using AnimatedCounter

### 4.4 Skills
- [ ] T051: Create `components/sections/Skills/SkillCard.tsx` — icon + name + proficiency bar
- [ ] T052: Create `components/sections/Skills/index.tsx` — category groups + card grid

### 4.5 Experience
- [ ] T053: Create `components/sections/Experience/TimelineEntry.tsx` — dot + content + tags
- [ ] T054: Create `components/sections/Experience/index.tsx` — SVG timeline line + entries

### 4.6 Education & Certifications
- [ ] T055: Create `components/sections/Education.tsx` — single university card
- [ ] T056: Create `components/sections/Certifications/CertCard.tsx`
- [ ] T057: Create `components/sections/Certifications/index.tsx` — 3-col grid

### 4.7 Projects
- [ ] T058: Create `components/sections/Projects/FeatureCard.tsx` — 2-panel card with image
- [ ] T059: Create `components/sections/Projects/FeaturedProjects.tsx` — 2 FeatureCards
- [ ] T060: Create `components/sections/Projects/ProjectCard.tsx` — fixed-height grid card
- [ ] T061: Create `components/sections/Projects/ProjectSearch.tsx` — input with debounce
- [ ] T062: Create `components/sections/Projects/ProjectTabs.tsx` — shadcn Tabs
- [ ] T063: Create `components/sections/Projects/ProjectsIndex.tsx` — tabs + search + filtered grid
- [ ] T064: Implement client-side filter logic in ProjectsIndex (filter by category + search term)

### 4.8 Dashboard Showcase
- [ ] T065: Create `components/sections/Dashboard/DashboardCard.tsx` — 600px fixed-width card
- [ ] T066: Create `components/sections/Dashboard/index.tsx` — horizontal flex container, 300vh height section

### 4.9 Case Studies
- [ ] T067: Create `components/sections/CaseStudies/CaseStudyCard.tsx` — split before/after card
- [ ] T068: Create `components/sections/CaseStudies/index.tsx`

### 4.10 Data Storytelling
- [ ] T069: Create `components/sections/DataStorytelling.tsx`

### 4.11 GitHub
- [ ] T070: Create `components/sections/GitHub/RepoCard.tsx`
- [ ] T071: Create `components/sections/GitHub/index.tsx` — contribution graph embed + repo grid

### 4.12 Tech Stack
- [ ] T072: Create `components/sections/TechStack/TechIcon.tsx` — icon + tooltip
- [ ] T073: Create `components/sections/TechStack/index.tsx` — icon wall grid

### 4.13 Achievements
- [ ] T074: Create `components/sections/Achievements.tsx`

### 4.14 Optional Sections
- [ ] T075: Create `components/sections/Testimonials.tsx` (check SITE_CONFIG.showTestimonials)
- [ ] T076: Create `components/sections/FAQ/FAQItem.tsx` using shadcn Accordion
- [ ] T077: Create `components/sections/FAQ/index.tsx` (check SITE_CONFIG.showFAQ)

### 4.15 Contact
- [ ] T078: Create `components/sections/Contact/ContactForm.tsx` — RHF + Zod form
- [ ] T079: Create `components/sections/Contact/ContactInfo.tsx` — links + social
- [ ] T080: Create `components/sections/Contact/index.tsx` — 2-col layout
- [ ] T081: Create `app/api/contact/route.ts` — Resend email handler
- [ ] T082: Test contact form end-to-end (submit → receive email)

### 4.16 Compose Page
- [ ] T083: Import and compose all section components in `app/page.tsx` in canonical order (PRD.md §3)
- [ ] T084: Add section IDs to all sections (`id="hero"`, `id="about"`, etc.)
- [ ] T085: Verify page renders without errors in dev mode

---

## Phase 5: Animations

- [ ] T086: Init Lenis in root layout via `useEffect` in a `<LenisProvider>` client component
- [ ] T087: Init GSAP + ScrollTrigger in `lib/gsap.ts`, import in layout
- [ ] T088: Add `ScrollProgress` bar animation (ANIMATIONS.md §1)
- [ ] T089: Add `CursorGlow` mouse-follow to layout (desktop only guard)
- [ ] T090: Add Hero text entrance timeline (ANIMATIONS.md §3.2)
- [ ] T091: Add Hero scroll-out parallax (ANIMATIONS.md §3.3)
- [ ] T092: Add section background color transitions (ANIMATIONS.md §4)
- [ ] T093: Add SectionLabel scroll-triggered reveal to all instances (ANIMATIONS.md §5)
- [ ] T094: Add About image + text animations (ANIMATIONS.md §6)
- [ ] T095: Wire AnimatedCounter to KPI Stats section
- [ ] T096: Add Skills cards stagger + proficiency bar fill (ANIMATIONS.md §8)
- [ ] T097: Add Experience timeline SVG draw + entry reveals (ANIMATIONS.md §9)
- [ ] T098: Add Certifications card flip (Framer Motion — ANIMATIONS.md §10)
- [ ] T099: Add Featured Projects scroll reveal + image hover zoom (ANIMATIONS.md §11)
- [ ] T100: Add Projects tab-switch AnimatePresence animation (ANIMATIONS.md §12)
- [ ] T101: Add Dashboard horizontal sticky scroll (ANIMATIONS.md §13)
- [ ] T102: Add Case Studies clip-path wipe (ANIMATIONS.md §14)
- [ ] T103: Add Tech Stack scatter float-in (ANIMATIONS.md §15)
- [ ] T104: Add Contact form/info reveal (ANIMATIONS.md §16)
- [ ] T105: Apply RevealText to all H2 elements across sections
- [ ] T106: Add Navbar scroll behavior (transparent → blur, ANIMATIONS.md §18)
- [ ] T107: Add reduced motion guard to all GSAP animations

---

## Phase 6: Responsive Polish

- [ ] T108: Test and fix Navbar on mobile (hamburger menu working)
- [ ] T109: Test Hero on 375px (iPhone SE) — H1 size, layout intact
- [ ] T110: Test KPI Stats 4-col → 2×2 grid on mobile
- [ ] T111: Test Skills grid 3-col → 1-col on mobile
- [ ] T112: Test Featured Projects side-by-side → stack on mobile
- [ ] T113: Test Dashboard Showcase: horizontal sticky → vertical scroll on mobile
- [ ] T114: Test Contact 2-col → stack on mobile
- [ ] T115: Test ProjectTabs horizontal scroll on mobile (no overflow-x on page)
- [ ] T116: Fix any layout breaks on tablet (768–1023px)
- [ ] T117: Verify no horizontal scroll on any page width ≥ 320px

---

## Phase 7: Light Mode

- [ ] T118: Test light mode token overrides — all sections readable
- [ ] T119: Fix any color contrast issues in light mode (WCAG AA minimum)
- [ ] T120: Test ThemeToggle persists theme across page refreshes
- [ ] T121: Ensure Three.js particle color adapts to theme (hook into `data-theme`)
- [ ] T122: Test transition smoothness on theme toggle (300ms ease)

---

## Phase 8: SEO & Meta

- [ ] T123: Add all metadata from SEO.md to `app/layout.tsx`
- [ ] T124: Create `public/og-image.png` (1200×630px dark card with name + title)
- [ ] T125: Add JSON-LD structured data (Person schema) to layout
- [ ] T126: Add `<link rel="canonical">` to layout
- [ ] T127: Add `robots.txt` to `public/`
- [ ] T128: Add `sitemap.xml` generation via `app/sitemap.ts`
- [ ] T129: Verify OG image renders correctly (use og-image.vercel.app tester)

---

## Phase 9: Performance

- [ ] T130: Run Lighthouse audit in Chrome DevTools — note failing metrics
- [ ] T131: Fix LCP (likely hero image or font) — add `priority` to hero images
- [ ] T132: Check bundle size: `next build` → review `.next/analyze` (add `@next/bundle-analyzer`)
- [ ] T133: Verify Three.js is NOT in initial JS bundle (should be lazy-loaded)
- [ ] T134: Add `loading="lazy"` / `<Image>` to all non-hero images
- [ ] T135: Check CLS — add explicit `width`/`height` to all images
- [ ] T136: Run Lighthouse again — target ≥ 90 all categories

---

## Phase 10: QA & Launch

- [ ] T137: Full QA pass via QA_CHECKLIST.md
- [ ] T138: Test contact form in production (Resend live key)
- [ ] T139: Test resume download link
- [ ] T140: Test all GitHub repo links open correctly
- [ ] T141: Test all project GitHub/Live Demo links
- [ ] T142: Deploy to Vercel: connect GitHub repo, add env vars
- [ ] T143: Set up custom domain (optional)
- [ ] T144: Enable Vercel Analytics
- [ ] T145: Share URL — LinkedIn post + add to resume header

---

## Phase 11: Optional (Post-MVP)

- [ ] T146: Set up MDX blog (`content/blog/`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`)
- [ ] T147: Write first blog post
- [ ] T148: Add Kaggle profile card (SITE_CONFIG.showKaggle = true)
- [ ] T149: Add Testimonials content when available
- [ ] T150: Add image lightbox for dashboard screenshots (shadcn Dialog)