# PRD — Vaibhav Chauhan · Data Analyst Portfolio
**Version:** 2.0  
**Owner:** Vaibhav Chauhan  
**Status:** Active  
**Goal:** Ship a premium, scroll-animated portfolio that outperforms every fresher's static resume site and converts recruiter visits into interviews.

---

## 1. Product Vision

A dark-first, single-scroll portfolio website for a 2026 B.Tech Data Science graduate targeting Data Analyst / ML Engineer roles in Delhi NCR and remote. The site must feel like a product, not a resume. Design inspiration: Linear's smoothness, Vercel's code-aesthetic, Supabase's bold dark palette. Every interaction must feel intentional.

**The one-sentence pitch for every recruiter who lands on it:**  
> "This person ships data systems, not just slides."

---

## 2. Target Audience

| Audience | What They Need to See |
|----------|----------------------|
| HR Screeners | Clean layout, resume download, contact form |
| Technical Hiring Managers | Real project outcomes, SQL/Python depth, system thinking |
| Startup Founders | Full-stack data capability, shipped products, initiative |
| Freelance Clients | Case studies, dashboard screenshots, communication clarity |

---

## 3. Section Order (Canonical)

This is the exact top-to-bottom render order. No deviations.

```
01  Navbar (fixed, persistent)
02  ScrollProgress bar (fixed, 2px top)
03  CursorGlow (fixed, desktop only)
04  Hero
05  About
06  KPI Stats (animated counters)
07  Skills
08  Experience
09  Education
10  Certifications
11  Featured Projects (2 hero cards)
12  Projects Index (tabbed + filter + search)
13  Dashboard Showcase (horizontal sticky scroll)
14  Case Studies
15  Data Storytelling
16  GitHub Activity
17  Testimonials (optional, flag-controlled)
18  Tech Stack (icon wall)
19  Achievements
20  FAQ (optional, flag-controlled)
21  Blog Index (optional, flag-controlled)
22  Contact
23  Footer
```

---

## 4. Feature Requirements

### 4.1 Must Have (MVP)

| ID | Feature | Priority |
|----|---------|----------|
| F01 | Hero with Three.js particle field | P0 |
| F02 | About section with image | P0 |
| F03 | Animated KPI counters | P0 |
| F04 | Skills grid with proficiency bars | P0 |
| F05 | Experience vertical timeline | P0 |
| F06 | Education card | P0 |
| F07 | Certifications cards | P0 |
| F08 | Featured Projects (2 cards) | P0 |
| F09 | Projects tabbed index with search | P0 |
| F10 | Dashboard Showcase (horizontal scroll) | P0 |
| F11 | Case Studies | P0 |
| F12 | GitHub Activity section | P0 |
| F13 | Tech Stack icon wall | P0 |
| F14 | Achievements | P0 |
| F15 | Contact form with email send | P0 |
| F16 | Resume PDF download | P0 |
| F17 | Light/Dark mode toggle | P0 |
| F18 | Fully responsive (mobile/tablet/desktop) | P0 |
| F19 | Scroll progress bar | P0 |
| F20 | Smooth scroll (Lenis) | P0 |

### 4.2 Should Have

| ID | Feature | Priority |
|----|---------|----------|
| F21 | Data Storytelling section | P1 |
| F22 | Testimonials (3 cards) | P1 |
| F23 | FAQ accordion | P1 |
| F24 | Cursor glow effect | P1 |
| F25 | Background color transitions on scroll | P1 |
| F26 | Section snap on mobile | P1 |
| F27 | Analytics (Vercel Analytics) | P1 |

### 4.3 Could Have (Post-MVP)

| ID | Feature | Priority |
|----|---------|----------|
| F28 | Blog / MDX posts | P2 |
| F29 | Kaggle profile card | P2 |
| F30 | Project search by tag | P2 |
| F31 | Dark-mode OG image | P2 |

---

## 5. Non-Functional Requirements

| Requirement | Target |
|------------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 100ms |
| First Load JS | < 300kB gzipped |
| Three.js bundle | Lazy loaded, not in initial chunk |
| Mobile render | No horizontal scroll, no broken layouts |
| Reduced motion | All animations disabled via `prefers-reduced-motion` |

---

## 6. Optional Section Flags

Control in `lib/config.ts`:

```typescript
export const SITE_CONFIG = {
  showTestimonials: true,
  showFAQ: true,
  showBlog: false,
  showKaggle: false,
  showDataStorytelling: true,
}
```

---

## 7. Success Criteria

- Recruiter can find resume download in under 5 seconds
- Contact form sends email within 3 seconds of submit
- Site scores ≥ 90 on all Lighthouse categories
- Zero layout breaks on iPhone SE (375px) through 4K (2560px)
- All GSAP animations fire correctly on Chrome, Firefox, Safari
- Site fully usable with keyboard only (no mouse required)