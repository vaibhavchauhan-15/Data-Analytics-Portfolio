# DESIGN_SYSTEM.md — Vaibhav Chauhan Portfolio

---

## 1. Color Tokens

All tokens defined as CSS custom properties in `styles/globals.css`. All color references in code must use these tokens — no hardcoded hex values anywhere except in this file.

### 1.1 Dark Mode (Default)

```css
:root {
  /* Backgrounds */
  --bg-base:          #060609;   /* page background */
  --bg-surface:       #0D0D14;   /* card / panel */
  --bg-surface-hover: #131320;   /* card hover state */
  --bg-elevated:      #1A1A2E;   /* modal, dropdown */

  /* Borders */
  --border-subtle:    #1E1E2E;   /* default borders */
  --border-muted:     #2A2A3E;   /* stronger border */
  --border-accent:    #6366F1;   /* focused/active border */

  /* Brand / Accent */
  --accent-primary:   #6366F1;   /* indigo — primary CTA, highlights */
  --accent-glow:      #818CF8;   /* lighter indigo for glows */
  --accent-secondary: #8B5CF6;   /* violet — secondary accent */
  --accent-green:     #10B981;   /* emerald — positive metrics, success */
  --accent-amber:     #F59E0B;   /* amber — warnings, callouts */
  --accent-red:       #EF4444;   /* error states */
  --accent-cyan:      #06B6D4;   /* tertiary accent, gradient end */

  /* Text */
  --text-primary:     #F0F0FF;   /* headings, primary body */
  --text-secondary:   #8B8BA8;   /* subheadings, labels */
  --text-muted:       #4A4A6A;   /* placeholder, disabled */
  --text-inverse:     #060609;   /* text on light bg (buttons) */

  /* Gradients */
  --gradient-brand: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%);
  --gradient-glow:  radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%);
  --gradient-card:  linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(139,92,246,0.02) 100%);
}
```

### 1.2 Light Mode

```css
[data-theme="light"] {
  --bg-base:          #FAFAFA;
  --bg-surface:       #FFFFFF;
  --bg-surface-hover: #F4F4F8;
  --bg-elevated:      #FFFFFF;

  --border-subtle:    #E4E4E7;
  --border-muted:     #D1D1DB;
  --border-accent:    #6366F1;

  --accent-primary:   #6366F1;
  --accent-glow:      #4F52C9;
  --accent-secondary: #7C3AED;
  --accent-green:     #059669;
  --accent-amber:     #D97706;
  --accent-red:       #DC2626;
  --accent-cyan:      #0891B2;

  --text-primary:     #09090B;
  --text-secondary:   #52525B;
  --text-muted:       #A1A1AA;
  --text-inverse:     #FAFAFA;

  --gradient-brand: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%);
  --gradient-glow:  radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 70%);
  --gradient-card:  linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(139,92,246,0.01) 100%);
}
```

### 1.3 Semantic Background Progression (Scroll Sections)

Used for `background-color` transitions between sections via GSAP:

```
Hero            #060609
About           #07070F
KPI Stats       #0A0A16  (slightly lighter for contrast band)
Skills          #060609
Experience      #080812
Education       #060609
Certifications  #060609
Projects        #070710
Dashboard       #0A0A16
Case Studies    #080812
GitHub          #060609
Contact         #0D0D18
```

---

## 2. Typography

### 2.1 Font Stack

```css
/* Load in app/layout.tsx via next/font/google */

--font-display: 'DM Sans', sans-serif;      /* hero, section headings */
--font-body:    'Inter', sans-serif;         /* all body text */
--font-mono:    'JetBrains Mono', monospace; /* KPI numbers, code, badges */
```

### 2.2 Type Scale

All sizes in rem. Base: 16px.

```css
--text-xs:   0.75rem;   /* 12px — labels, captions, eyebrows */
--text-sm:   0.875rem;  /* 14px — small body, nav links */
--text-base: 1rem;      /* 16px — body copy */
--text-lg:   1.25rem;   /* 20px — lead text, card descriptions */
--text-xl:   1.5rem;    /* 24px — section subheadings */
--text-2xl:  2rem;      /* 32px — section headings (H2) */
--text-3xl:  3rem;      /* 48px — large headings */
--text-4xl:  4rem;      /* 64px — hero subheading */
--text-5xl:  6rem;      /* 96px — hero H1 */
```

Responsive adjustments (mobile):
- `--text-5xl` → `3rem` on `< 768px`
- `--text-4xl` → `2.5rem` on `< 768px`
- `--text-3xl` → `2rem` on `< 768px`

### 2.3 Font Weight System

```
300 — light, decorative use only
400 — body text
500 — medium, nav items, badges
600 — semibold, card headings
700 — bold, section headings
800 — extrabold, hero H1 words
```

### 2.4 Line Height & Letter Spacing

```css
--leading-tight:  1.2;   /* headings */
--leading-snug:   1.4;   /* subheadings */
--leading-normal: 1.6;   /* body */
--leading-relaxed:1.75;  /* long-form text */

--tracking-tight:  -0.02em;  /* large display headings */
--tracking-normal:  0em;
--tracking-wide:    0.05em;  /* eyebrow labels, badges */
--tracking-wider:   0.1em;   /* all-caps labels */
```

---

## 3. Spacing System

8px base unit. All spacing is a multiple of 8.

```css
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
--space-32:  128px;
--space-40:  160px;
```

### 3.1 Section Padding

```css
/* Each section wrapper gets these vertical paddings */
.section {
  padding-top:    var(--space-32);   /* 128px desktop */
  padding-bottom: var(--space-32);
}

@media (max-width: 768px) {
  .section {
    padding-top:    var(--space-20);  /* 80px mobile */
    padding-bottom: var(--space-20);
  }
}
```

### 3.2 Container Widths

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-left:  var(--space-6);   /* 24px */
  padding-right: var(--space-6);
}

@media (max-width: 768px) {
  .container {
    padding-left:  var(--space-4);  /* 16px */
    padding-right: var(--space-4);
  }
}
```

### 3.3 Grid System

```css
/* Desktop: 12-column grid */
.grid-12 { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--space-6); }

/* Common patterns */
.col-6  { grid-column: span 6; }   /* 2-col layout */
.col-4  { grid-column: span 4; }   /* 3-col layout */
.col-3  { grid-column: span 3; }   /* 4-col layout */
.col-8  { grid-column: span 8; }   /* content + sidebar */
.col-12 { grid-column: span 12; }  /* full width */

/* Mobile: all cols collapse to span 12 */
@media (max-width: 768px) {
  [class*="col-"] { grid-column: span 12; }
}
```

---

## 4. Border Radius

```css
--radius-sm:   4px;    /* badges, chips */
--radius-md:   8px;    /* buttons, small cards */
--radius-lg:   12px;   /* project cards */
--radius-xl:   16px;   /* feature cards */
--radius-2xl:  24px;   /* hero card, modals */
--radius-full: 9999px; /* pills, avatars */
```

---

## 5. Shadows & Glow

```css
--shadow-sm:   0 1px 3px rgba(0,0,0,0.4);
--shadow-md:   0 4px 12px rgba(0,0,0,0.5);
--shadow-lg:   0 8px 32px rgba(0,0,0,0.6);

--glow-accent: 0 0 20px rgba(99,102,241,0.3), 0 0 60px rgba(99,102,241,0.1);
--glow-green:  0 0 20px rgba(16,185,129,0.3);
--glow-subtle: 0 0 40px rgba(99,102,241,0.08);
```

---

## 6. Iconography

- Primary icon library: **Lucide React** (`lucide-react`)
- Tech/brand icons: **Simple Icons** via `react-icons/si` or raw SVG from `devicon`
- Icon sizes: `16px` (inline), `20px` (buttons), `24px` (nav), `32px` (feature), `48px` (tech wall)
- All icons must have `aria-hidden="true"` when decorative

---

## 7. Component Visual States

Every interactive element must have defined styles for:

```
default → hover → focus → active → disabled
```

Focus ring: `outline: 2px solid var(--accent-primary); outline-offset: 2px;`  
Hover transition: `transition: all 200ms ease;`  
Disabled: `opacity: 0.4; cursor: not-allowed;`

---

## 8. Visual Noise & Texture

Subtle grain texture on dark backgrounds to prevent flat look:

```css
.bg-noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise pattern */
  opacity: 0.03;
  pointer-events: none;
}
```

Grid lines on data sections (CSS only, no JS):
```css
.bg-grid {
  background-image: 
    linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
  background-size: 48px 48px;
}
```