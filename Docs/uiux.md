# UI_UX.md — Layout & Responsiveness

All breakpoints follow Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Mobile-first. All layouts stack vertically on < 768px unless specified otherwise.

---

## Component Hierarchy

```
app/page.tsx
├── <Navbar />
├── <ScrollProgress />
├── <CursorGlow />          (desktop only, z-index: 9999)
├── <HeroSection />
│   ├── <ParticleField />   (Three.js canvas, position: absolute)
│   ├── <HeroBadge />
│   ├── <RevealText />      (H1 word-by-word reveal)
│   ├── <HeroSubhead />
│   ├── <HeroCTAs />
│   └── <HeroSocial />
├── <AboutSection />
│   ├── <SectionLabel />
│   ├── <AboutText />
│   └── <AboutImage />
├── <KPIStats />
│   └── <AnimatedCounter /> × 4
├── <SkillsSection />
│   ├── <SectionLabel />
│   └── <SkillCard /> × n  (per category)
├── <ExperienceSection />
│   ├── <SectionLabel />
│   ├── <TimelineLine />    (SVG, GSAP drawSVG)
│   └── <TimelineEntry /> × n
├── <EducationSection />
│   └── <EducationCard />
├── <CertificationsSection />
│   └── <CertCard /> × 3
├── <FeaturedProjects />
│   └── <FeatureCard /> × 2
├── <ProjectsIndex />
│   ├── <ProjectSearch />
│   ├── <ProjectTabs />
│   └── <ProjectCard /> × n
├── <DashboardShowcase />
│   └── <DashboardCard /> × n  (horizontal sticky scroll)
├── <CaseStudies />
│   └── <CaseStudyCard /> × 3
├── <DataStorytelling />
│   └── <StoryCard /> × n
├── <GitHubSection />
│   ├── <ContribGraph />
│   └── <RepoCard /> × 6
├── <Testimonials />        (flag-controlled)
│   └── <TestimonialCard /> × 3
├── <TechStack />
│   └── <TechIcon /> × n
├── <Achievements />
│   └── <AchievementCard /> × n
├── <FAQ />                 (flag-controlled)
│   └── <FAQItem /> × n
├── <ContactSection />
│   ├── <ContactInfo />
│   └── <ContactForm />
└── <Footer />
```

---

## Section Layouts

### Navbar

**Desktop (≥ 768px):**
```
[VC •]  ·  [About] [Skills] [Projects] [Contact]  ·  [Resume ↓]  [☀/🌙]
```
- Height: 64px
- Position: `fixed top-0`, full width
- Background: `transparent` → `bg-surface/80 backdrop-blur-md border-b border-subtle` after 80px scroll
- Z-index: 100

**Mobile (< 768px):**
```
[VC •]                                              [☰]
```
- Hamburger → full-screen overlay with staggered links
- Overlay: `bg-base/95 backdrop-blur-xl`, `position: fixed inset-0`
- Links: 32px, centered, stagger-in animation 50ms each

---

### Hero

**Desktop:**
```
┌─────────────────────────────────────────────────┐
│  [particle canvas - full viewport bg]           │
│                                                 │
│           [badge] Open to Work · Delhi NCR      │
│                                                 │
│      Turning Raw Data                           │
│      into Business Clarity.                     │
│                                                 │
│      Data Analyst · Python · Power BI · SQL     │
│      Building dashboards and decisions.         │
│                                                 │
│      [View My Work ↓]    [Download Resume]      │
│                                                 │
│      LinkedIn  ·  GitHub  ·  Kaggle             │
│                                                 │
│                    ↓                            │
└─────────────────────────────────────────────────┘
```
- Height: `100vh`, min-height: `700px`
- Content: centered both axes, max-width 800px
- H1: `var(--text-5xl)`, weight 800, `--tracking-tight`
- Subhead: `var(--text-xl)`, weight 400, `--text-secondary`

**Mobile:**
- H1: `var(--text-3xl)`
- Content: left-aligned, padding 24px
- Particles: reduced count (1000), no mouse interaction

---

### About

**Desktop (≥ 768px):**
```
┌───────────────────┬───────────────────────────────┐
│   [image/avatar]  │  // 02. ABOUT                 │
│   400 × 400px     │  Data tells stories.           │
│   rounded-2xl     │  I write the narrative.        │
│                   │                               │
│                   │  [body paragraphs]            │
│                   │                               │
│                   │  📍 Delhi  🎓 2026  💼 Open   │
└───────────────────┴───────────────────────────────┘
```
- Grid: `col-4 | col-8`
- Image: `aspect-square`, `object-cover`, rounded-2xl, subtle indigo border

**Mobile:**
- Image stacks above text
- Image: 200px × 200px, centered

---

### KPI Stats

**Desktop:**
```
┌──────────┬──────────┬──────────┬──────────┐
│    4     │   ~40%   │   30%+   │    3     │
│ Dashboards│ Speedup │ Data Fix │  Teams   │
└──────────┴──────────┴──────────┴──────────┘
```
- Full-width dark band, `py-16`
- Numbers: `var(--font-mono)`, `var(--text-4xl)`, `--accent-primary`
- Labels: `var(--text-sm)`, `--text-secondary`, uppercase, `--tracking-wider`
- Dividers: 1px vertical lines `--border-subtle` between stats

**Mobile:**
- 2×2 grid instead of 4-col row

---

### Skills

**Desktop:**
```
[eyebrow] // 04. SKILLS

[Category Label]
┌──────────┬──────────┬──────────┐
│ SkillCard│ SkillCard│ SkillCard│
├──────────┼──────────┼──────────┤
│ SkillCard│ SkillCard│ SkillCard│
└──────────┴──────────┴──────────┘

[Next Category Label]
...
```
- Cards: 3-col on desktop, 2-col on tablet, 1-col on mobile
- Card size: full width of column, height auto

**SkillCard internal layout:**
```
┌─────────────────────────┐
│ [icon 32px]  Skill Name │
│ ─────────────────────── │
│ [████████░░] 80%        │
└─────────────────────────┘
```
- padding: 20px
- Icon: left-aligned
- Progress bar: `height: 4px`, `border-radius: full`
- Bar fill color: `--accent-primary`

---

### Experience

**Desktop:**
```
[eyebrow] // 05. EXPERIENCE

│ [SVG vertical line - draws on scroll]
●  Coerror — Data Science Intern
│  Jan 2026 – Apr 2026 · Gurgaon
│  
│  • [bullet 1]
│  • [bullet 2]
│  • [bullet 3]
│  
│  [Power BI] [MySQL] [Python] [Pandas] [EDA]
```
- Timeline line: 2px, `--accent-primary` color, `left: 0`, top to bottom
- Dot: 12px circle, `--accent-primary` bg, absolute positioned on line
- Content: `padding-left: 40px`
- Entry spacing: `margin-bottom: var(--space-12)`

**Mobile:** Same layout, line runs left edge.

---

### Certifications

**Desktop:**
```
┌──────────────────┬──────────────────┬──────────────────┐
│   [Logo 48px]    │   [Logo 48px]    │   [Logo 48px]    │
│   Cert Name      │   Cert Name      │   Cert Name      │
│   Issuer         │   Issuer         │   Issuer         │
│   2023           │   2023           │   2025           │
│   [View Cert →]  │   [View Cert →]  │   [View Cert →]  │
└──────────────────┴──────────────────┴──────────────────┘
```
- 3-col on desktop, 1-col on mobile
- Card: dark bg, indigo border on hover

---

### Featured Projects

**Desktop:**
```
┌──────────────────────────────────────────────────────────┐
│  LogGuardian                    [GitHub] [Live Demo]     │
│  ─────────────────────────────────────────────────       │
│  Hybrid ML anomaly detection system                      │
│                                                          │
│  • 35% false-positive reduction                          │
│  • PostgreSQL + FastAPI backend                          │
│  • Real-time monitoring dashboard                        │
│                                               [image]    │
│  [Python] [Scikit-learn] [PostgreSQL] [FastAPI]          │
└──────────────────────────────────────────────────────────┘
```
- Full width cards (not grid), stacked vertically, 24px gap
- Image: right-aligned, `width: 40%`, `aspect-video`, blurred border glow
- Image zooms on hover (`scale: 1.05`, 300ms)
- All text: left side, `width: 60%`

**Mobile:**
- Image hidden (or shown below text, full width)

---

### Projects Index

**Layout:**
```
[Search bar                                    ]  [Filter icon]

[All] [SQL] [Python] [Power BI] [Excel] [ML]

┌──────────┬──────────┬──────────┐
│ ProjCard │ ProjCard │ ProjCard │
├──────────┼──────────┼──────────┤
│ ProjCard │ ProjCard │ ProjCard │
└──────────┴──────────┴──────────┘
```
- Tabs: scrollable horizontal on mobile
- Grid: 3-col desktop, 2-col tablet, 1-col mobile
- Card height: fixed 280px

**ProjectCard internal:**
```
┌──────────────────────────┐
│ [thumbnail / icon area]  │  ← 120px height
│──────────────────────────│
│ Project Title            │
│ Short description        │
│                          │
│ [tag] [tag] [tag]        │
│             [GH] [Demo]  │
└──────────────────────────┘
```

---

### Dashboard Showcase (Horizontal Sticky Scroll)

**Desktop behavior:**
- Section `height: 300vh` (3× viewport)
- Inner container `position: sticky; top: 0; height: 100vh`
- Cards translate horizontally as user scrolls vertically
- GSAP: `x` from `0` → `-(totalWidth - viewportWidth)` tied to scroll progress

```
[sticky viewport]
← ─────────────────────────────────────────── →
  [Dashboard 1]  [Dashboard 2]  [Dashboard 3]
      600px          600px          600px
```

Card: `width: 600px`, `height: 380px`, `flex-shrink: 0`  
Gap between cards: `40px`

**Mobile:** Converts to vertical scroll, cards 100% width.

---

### Contact

**Desktop:**
```
┌──────────────────┬────────────────────────────────┐
│  Get in Touch    │  [Name input            ]       │
│                  │  [Email input           ]       │
│  vaibhav@...     │  [Subject dropdown      ]       │
│  LinkedIn →      │  [Message textarea      ]       │
│  GitHub →        │                                 │
│                  │  [Send Message →]               │
│  [floating bg    │                                 │
│   shapes]        │                                 │
└──────────────────┴────────────────────────────────┘
```
- Grid: `col-5 | col-7`
- Left: contact info + social icons
- Right: form

**Mobile:** Left info stacks above form.

---

### Footer

```
┌───────────────────────────────────────────────────────┐
│  VC •                          Built with Next.js     │
│  Vaibhav Chauhan               GSAP · Three.js        │
│  Data Analyst · Delhi, India   © 2026                 │
│                                                       │
│  [↑ Top]  [LinkedIn]  [GitHub]  [Resume ↓]            │
└───────────────────────────────────────────────────────┘
```
- `padding: 48px 0`
- Top border: `--border-subtle`
- "Back to top" scrolls to `#hero` (Lenis `scrollTo`)

---

## Responsive Rules Summary

| Section | Desktop | Tablet (768–1023px) | Mobile (< 768px) |
|---------|---------|---------------------|------------------|
| Navbar | Full links | Full links | Hamburger |
| Hero H1 | 96px | 64px | 48px |
| About | 2-col | 2-col | Stack |
| KPI Stats | 4-col | 4-col | 2×2 grid |
| Skills | 3-col | 2-col | 1-col |
| Experience | Timeline (left) | Timeline (left) | Timeline (left) |
| Certifications | 3-col | 2-col | 1-col |
| Featured Projects | Side-by-side | Stack | Stack |
| Projects Index | 3-col | 2-col | 1-col |
| Dashboard Showcase | Horizontal sticky | Horizontal sticky | Vertical scroll |
| Contact | 2-col | 2-col | Stack |

---

## Z-index Layers

```
1     — background canvas (Three.js)
10    — section content
20    — cards, modals
50    — sticky sections
100   — navbar
200   — mobile menu overlay
500   — tooltips
9999  — cursor glow
```