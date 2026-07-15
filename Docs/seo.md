# SEO.md — Metadata & Optimization

---

## 1. Page Metadata (`app/layout.tsx`)

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://vaibhavchauhan.dev'),  // update with real domain

  title: {
    default: 'Vaibhav Chauhan — Data Analyst | Power BI · Python · SQL · Delhi',
    template: '%s | Vaibhav Chauhan',
  },

  description:
    'Data Analyst portfolio — Power BI dashboards, Python analytics pipelines, SQL optimization, and ML systems. B.Tech Data Science, 2026. Open to roles in Delhi NCR and remote.',

  keywords: [
    'Data Analyst',
    'Data Analyst Delhi',
    'Data Analyst fresher',
    'Power BI developer',
    'Python data analyst',
    'SQL analyst',
    'Machine Learning Engineer',
    'Business Intelligence',
    'DAX',
    'Data Science portfolio',
    'Delhi NCR data analyst',
    'Vaibhav Chauhan',
  ],

  authors: [{ name: 'Vaibhav Chauhan', url: 'https://vaibhavchauhan.dev' }],

  creator: 'Vaibhav Chauhan',

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vaibhavchauhan.dev',
    siteName: 'Vaibhav Chauhan — Data Analyst',
    title: 'Vaibhav Chauhan — Data Analyst | Power BI · Python · SQL',
    description:
      'Turning raw data into business decisions. Power BI dashboards, Python pipelines, ML systems. Open to Delhi NCR / remote roles.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vaibhav Chauhan — Data Analyst Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Vaibhav Chauhan — Data Analyst',
    description: 'Power BI · Python · SQL · ML · Delhi NCR',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  manifest: '/site.webmanifest',

  alternates: {
    canonical: 'https://vaibhavchauhan.dev',
  },
}
```

---

## 2. JSON-LD Structured Data

Add to `app/layout.tsx` inside `<head>` via `<Script>` or inline `<script>`:

```typescript
// components/StructuredData.tsx
export function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vaibhav Chauhan',
    url: 'https://vaibhavchauhan.dev',
    jobTitle: 'Data Analyst',
    description: 'Data Analyst specializing in Power BI, Python, SQL, and Machine Learning. Based in Delhi, India.',
    email: 'vaibhav1chauhan12353@gmail.com',
    telephone: '+91-9867732204',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Delhi',
      addressCountry: 'IN',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Parul University',
      url: 'https://paruluniversity.ac.in',
    },
    knowsAbout: [
      'Data Analysis',
      'Power BI',
      'Python',
      'SQL',
      'Machine Learning',
      'Business Intelligence',
      'Data Visualization',
    ],
    sameAs: [
      'https://linkedin.com/in/vaibhavchauhan-15',
      'https://github.com/vaibhavchauhan-15',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Data Analyst',
      occupationalCategory: '15-2041',  // BLS code for statisticians/analysts
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

## 3. OG Image Spec

**File:** `public/og-image.png`  
**Dimensions:** 1200 × 630px  
**Design:**
```
Background: #060609 (dark)
Left side (60%):
  - Small label: "DATA ANALYST PORTFOLIO"
  - Name: "Vaibhav Chauhan" (large, white, DM Sans 700)
  - Role: "Power BI · Python · SQL · ML" (indigo)
  - Location: "Delhi, India · Open to Work" (gray)
Right side (40%):
  - Abstract data visualization graphic or indigo gradient orb
Border: subtle indigo gradient top edge
```

Create using `@vercel/og` (dynamic) or Figma/Canva (static):

```typescript
// app/api/og/route.tsx (optional — dynamic OG)
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    <div style={{ background: '#060609', width: '1200px', height: '630px', display: 'flex' }}>
      {/* OG image layout */}
    </div>,
    { width: 1200, height: 630 }
  )
}
```

---

## 4. `public/robots.txt`

```txt
User-agent: *
Allow: /

Sitemap: https://vaibhavchauhan.dev/sitemap.xml
```

---

## 5. `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://vaibhavchauhan.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Add blog posts dynamically if blog enabled
  ]
}
```

---

## 6. `public/site.webmanifest`

```json
{
  "name": "Vaibhav Chauhan — Data Analyst",
  "short_name": "VC Portfolio",
  "description": "Data Analyst portfolio — Power BI, Python, SQL, ML",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#060609",
  "theme_color": "#6366F1",
  "icons": [
    { "src": "/web-app-manifest-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "/web-app-manifest-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

---

## 7. Performance-Affecting SEO Items

| Item | Implementation |
|------|---------------|
| Core Web Vitals | See TECH_SPEC.md §11 |
| Image alt text | All `<Image>` must have descriptive `alt` |
| Semantic HTML | Use `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>` |
| Heading hierarchy | H1 (hero only), H2 (section heads), H3 (card titles), H4 (bullets) |
| Link text | No "click here" — use descriptive text |
| `lang` attribute | `<html lang="en">` |

---

## 8. Analytics Events to Track

```typescript
// Using Vercel Analytics track() or custom events

import { track } from '@vercel/analytics'

// Resume download
track('resume_download')

// Contact form submit
track('contact_form_submit', { subject: data.subject })

// Project link click
track('project_link_click', { project: project.id, type: 'github' | 'live' })

// Section scroll depth
// Use IntersectionObserver on each section → track('section_view', { section: 'projects' })
```