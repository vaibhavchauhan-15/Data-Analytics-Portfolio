# TECH_SPEC.md — Architecture & Implementation

---

## 1. Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | 14.x (App Router) | Routing, SSG, ISR, API routes |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| Component lib | shadcn/ui | latest | Accessible base components |
| 3D / WebGL | Three.js + @react-three/fiber | 0.x / 8.x | Hero particle field |
| Scroll animation | GSAP + ScrollTrigger | 3.x | Complex scroll-driven animation |
| Component animation | Framer Motion | 11.x | Mount/exit, hover, card animations |
| Smooth scroll | @studio-freight/lenis | 1.x | Native-feel smooth scrolling |
| Form handling | React Hook Form + Zod | 7.x / 3.x | Contact form state + validation |
| Email | Resend | 3.x | Send contact form emails |
| Themes | next-themes | 0.x | Dark/light mode, SSR-safe |
| Icons | Lucide React | 0.x | UI icons |
| Analytics | Vercel Analytics | latest | Page views, events |
| Fonts | next/font/google | — | DM Sans, Inter, JetBrains Mono |
| Linting | ESLint + Prettier | — | Code quality |

---

## 2. Project Init

```bash
npx create-next-app@latest vaibhav-portfolio \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd vaibhav-portfolio

# GSAP (club membership needed for SplitText/DrawSVG — use free alternatives or NPM)
npm install gsap @gsap/react

# Three.js
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three

# Framer Motion
npm install framer-motion

# Lenis
npm install @studio-freight/lenis

# Form + validation
npm install react-hook-form zod @hookform/resolvers

# Email
npm install resend

# Themes
npm install next-themes

# Icons
npm install lucide-react

# Analytics
npm install @vercel/analytics

# shadcn/ui init
npx shadcn-ui@latest init
# → Style: Default, Base color: Slate, CSS variables: Yes

# shadcn components
npx shadcn-ui@latest add button card badge tabs accordion input textarea tooltip select separator
```

---

## 3. Environment Variables

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
GITHUB_TOKEN=ghp_xxxxxxxxxxxx   # optional, for higher rate limit

# .env.example (commit this, not .env.local)
RESEND_API_KEY=
GITHUB_TOKEN=
```

---

## 4. `lib/config.ts` — Site-wide feature flags and metadata

```typescript
export const SITE_CONFIG = {
  name: 'Vaibhav Chauhan',
  title: 'Data Analyst · Power BI · Python · SQL',
  email: 'vaibhav1chauhan12353@gmail.com',
  phone: '+91 9867732204',
  location: 'Delhi, India',
  linkedin: 'https://linkedin.com/in/vaibhavchauhan-15',
  github: 'https://github.com/vaibhavchauhan-15',
  kaggle: 'https://kaggle.com/vaibhavchauhan15',    // update if different
  resumeUrl: '/resume/Vaibhav_Chauhan_Resume.pdf',

  // Feature flags
  showTestimonials: true,
  showFAQ: true,
  showBlog: false,
  showKaggle: false,
  showDataStorytelling: true,

  // GitHub section
  githubUsername: 'vaibhavchauhan-15',
  githubRepoCount: 6,           // how many repos to show
}
```

---

## 5. Data Architecture

All portfolio data lives in `lib/data/`. No database — static TypeScript files. Edit here to update content.

### 5.1 `lib/data/projects.ts`

```typescript
export type ProjectCategory = 'sql' | 'python' | 'powerbi' | 'excel' | 'ml'

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  category: ProjectCategory
  featured: boolean
  techStack: string[]
  outcomes: string[]            // 3 bullet points for feature cards
  githubUrl?: string
  liveUrl?: string
  thumbnail?: string            // path under /public/assets/
  caseStudy?: boolean
  dashboardScreenshot?: string  // for Dashboard Showcase section
}

export const projects: Project[] = [
  {
    id: 'sales-ops-dashboard',
    title: 'Sales & Operations Analytics Dashboard',
    description: 'End-to-end analytics pipeline from raw transactional data to interactive Power BI dashboard.',
    category: 'powerbi',
    featured: true,
    techStack: ['Power BI', 'DAX', 'MySQL', 'Python', 'Pandas'],
    outcomes: [
      'Designed DAX measures for revenue trends, MoM growth, and customer segmentation',
      'Identified 22% revenue concentration in one product category via cohort analysis',
      'Enabled self-serve analysis for non-technical stakeholders',
    ],
    githubUrl: 'https://github.com/vaibhavchauhan-15/...',
    liveUrl: 'https://...',
    caseStudy: true,
  },
  {
    id: 'log-guardian',
    title: 'LogGuardian — Operational Anomaly Detection',
    description: 'Hybrid ML anomaly detection system on system logs using Isolation Forest + Autoencoder.',
    category: 'ml',
    featured: true,
    techStack: ['Python', 'Scikit-learn', 'PostgreSQL', 'FastAPI', 'Pandas'],
    outcomes: [
      'Reduced false-positive alert rate by ~35%, improving signal quality for ops teams',
      'Built 5 REST APIs exposing anomaly scores and trend data via FastAPI',
      'Created auditable analytics layer in PostgreSQL with time-range filtering',
    ],
    githubUrl: 'https://github.com/vaibhavchauhan-15/...',
    liveUrl: 'https://...',
    caseStudy: true,
  },
  // Add more projects here
]
```

### 5.2 `lib/data/skills.ts`

```typescript
export interface Skill {
  name: string
  category: string
  icon?: string           // devicon class OR SVG component name
  proficiency: number     // 0–100
}

export interface SkillCategory {
  label: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Analytics & BI',
    skills: [
      { name: 'Power BI', proficiency: 90 },
      { name: 'DAX & Data Modeling', proficiency: 85 },
      { name: 'Tableau', proficiency: 65 },
      { name: 'Excel', proficiency: 80 },
      { name: 'Google Sheets', proficiency: 75 },
    ],
  },
  {
    label: 'Databases & SQL',
    skills: [
      { name: 'MySQL', proficiency: 85 },
      { name: 'PostgreSQL', proficiency: 80 },
      { name: 'Query Optimization', proficiency: 80 },
      { name: 'Window Functions', proficiency: 75 },
      { name: 'CTEs', proficiency: 75 },
    ],
  },
  // ... more categories
]
```

### 5.3 `lib/data/experience.ts`

```typescript
export interface ExperienceEntry {
  role: string
  company: string
  period: string
  location: string
  type: 'full-time' | 'internship' | 'contract' | 'freelance'
  bullets: string[]
  tags: string[]
  certificateUrl?: string
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Data Science Intern',
    company: 'Coerror',
    period: 'Jan 2026 – Apr 2026',
    location: 'Gurgaon, India',
    type: 'internship',
    bullets: [
      'Designed and delivered 4 Power BI dashboards tracking core product KPIs—adopted by 3 cross-functional teams, replacing weekly manual Excel reports and saving ~5 hrs/week of analyst time.',
      'Wrote optimized MySQL queries for reporting workflows, cutting KPI dashboard refresh time by ~40% and enabling real-time business monitoring for the first time.',
      'Resolved 30%+ missing-value rate across 5+ raw datasets via Python & Pandas data-cleaning pipelines—directly improving reliability of downstream ML model inputs.',
      'Conducted deep-dive EDA across product and operations data, surfacing 3 actionable trends (seasonality, user drop-off, anomaly clusters) presented to senior leadership.',
      'Automated weekly analytical reporting workflow, reducing ad-hoc data requests by standardizing metrics definitions and delivery cadence.',
      'Partnered with engineering to define data schemas and validate pipeline outputs, ensuring analytical accuracy for KPI tracking and business reviews.',
    ],
    tags: ['Power BI', 'MySQL', 'Python', 'Pandas', 'EDA', 'FastAPI'],
    certificateUrl: undefined,  // add URL when available
  },
]
```

### 5.4 `lib/data/certifications.ts`

```typescript
export interface Certification {
  name: string
  issuer: string
  year: string
  logo?: string
  certificateUrl?: string
  color?: string
}

export const certifications: Certification[] = [
  {
    name: 'Data Analytics and Visualization Job Simulation',
    issuer: 'Accenture',
    year: '2023',
    color: '#A100FF',
  },
  {
    name: 'Data Structures & Algorithms',
    issuer: 'CodeHelp',
    year: '2023',
    color: '#FF6B35',
  },
  {
    name: 'Tableau Workshop',
    issuer: 'Parul University',
    year: '2025',
    color: '#E97627',
  },
]
```

### 5.5 `lib/data/kpis.ts`

```typescript
export interface KPIStat {
  prefix?: string
  target: number
  suffix?: string
  label: string
  sublabel?: string
}

export const kpiStats: KPIStat[] = [
  { target: 4,  suffix: '',    label: 'Power BI Dashboards', sublabel: 'Shipped to 3 teams' },
  { prefix: '~', target: 40, suffix: '%', label: 'Query Speed Improvement', sublabel: 'MySQL optimization' },
  { target: 30, suffix: '%+', label: 'Data Quality Fix',      sublabel: '5+ raw datasets' },
  { target: 3,  suffix: '',    label: 'Cross-functional Teams', sublabel: 'Adopted dashboards' },
]
```

---

## 6. API Routes

### `app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  subject: z.enum(['job', 'freelance', 'collab', 'other']),
  message: z.string().min(20),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to:   'vaibhav1chauhan12353@gmail.com',
      subject: `[Portfolio] ${data.subject} — from ${data.name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
      replyTo: data.email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
```

---

## 7. GitHub API Integration

```typescript
// lib/github.ts
const GITHUB_API = 'https://api.github.com'
const USERNAME = 'vaibhavchauhan-15'

export interface GitHubRepo {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  html_url: string
  updated_at: string
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=6`,
    {
      headers: {
        Authorization: process.env.GITHUB_TOKEN
          ? `Bearer ${process.env.GITHUB_TOKEN}`
          : '',
      },
      next: { revalidate: 3600 },  // ISR: revalidate every 1 hour
    }
  )
  if (!res.ok) return []
  return res.json()
}
```

Used in `app/page.tsx` as a Server Component:

```typescript
// app/page.tsx (Server Component)
import { getGitHubRepos } from '@/lib/github'

export default async function Home() {
  const repos = await getGitHubRepos()
  return (
    <>
      {/* ... other sections ... */}
      <GitHubSection repos={repos} />
    </>
  )
}
```

---

## 8. Font Loading (`app/layout.tsx`)

```typescript
import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

// Apply to <html> tag:
// className={`${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
```

---

## 9. `app/layout.tsx` Full Structure

```typescript
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import { fonts } from '@/lib/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = { /* see SEO.md */ }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 10. Three.js: Dynamic Import Pattern

```typescript
// Prevents Three.js from loading on server or initial bundle
import dynamic from 'next/dynamic'

const ParticleField = dynamic(
  () => import('@/components/canvas/ParticleField'),
  {
    ssr: false,
    loading: () => <div className="hero-canvas-placeholder" />,
  }
)
```

---

## 11. Performance Optimizations

| Optimization | Implementation |
|-------------|---------------|
| Three.js lazy load | `dynamic(() => import(...), { ssr: false })` |
| GSAP server-safe | All GSAP code in `useEffect` only |
| Images | `next/image` with `priority` on hero image |
| GitHub repos | ISR `revalidate: 3600` |
| Font loading | `next/font` with `display: swap` |
| CSS animations | `will-change: transform` on animated elements |
| Particle canvas | Paused via `IntersectionObserver` when offscreen |
| Bundle split | Each section is a React component (auto code-split by Next.js) |

---

## 12. Folder Conventions

- One component per file
- No `index.ts` barrel files (use explicit imports)
- Type definitions co-located with data (`lib/data/*.ts`)
- No global state management (context only for theme, provided by `next-themes`)
- CSS: CSS variables in `globals.css`, utility composition in Tailwind, no CSS Modules