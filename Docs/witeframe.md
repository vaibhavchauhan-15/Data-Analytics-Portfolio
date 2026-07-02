# WIREFRAMES.md — Layout & Visual Blueprint

> **Purpose:**
> Defines the visual structure of every section before development.
> This document is the single source of truth for layout, spacing, hierarchy, and responsive behavior.
>
> **Read After:** `PRD.md`
> **Read Before:** `UI_UX.md`, `COMPONENTS.md`

---

# Design Philosophy

The portfolio should feel like:

* Apple (premium storytelling)
* Linear (smooth interactions)
* Vercel (minimal & technical)
* Stripe (clean layouts)
* Raycast (perfect spacing)

Every section occupies enough vertical space to breathe.

Never cram content.

White space is part of the design.

---

# Page Flow

```
Navbar
↓

Hero
↓

About

↓

KPI Stats

↓

Skills

↓

Experience

↓

Education

↓

Certifications

↓

Featured Projects

↓

Projects

↓

Dashboard Showcase

↓

Case Studies

↓

Data Storytelling

↓

GitHub

↓

Tech Stack

↓

Achievements

↓

Contact

↓

Footer
```

---

# 1. Hero

```
┌──────────────────────────────────────────────────────────────┐

             Three.js Particle Background

        [ Open to Work • Delhi NCR / Remote ]

          Turning Raw Data
          into Business Clarity.

     Data Analyst • Python • SQL • Power BI

      [ View Work ]   [ Resume ]

 GitHub     LinkedIn     Kaggle

                    ↓

└──────────────────────────────────────────────────────────────┘
```

Desktop

* Height = 100vh
* Content centered
* Max width = 900px

Mobile

```
Badge

Heading

Subtitle

Buttons

Social

↓
```

---

# 2. About

Desktop

```
┌──────────────┬─────────────────────────────────────┐

 Avatar        ABOUT

               Heading

               Paragraph

               Paragraph

               Chips

└──────────────┴─────────────────────────────────────┘
```

Mobile

```
Avatar

Heading

Paragraph

Paragraph

Chips
```

---

# 3. KPI Stats

Desktop

```
┌──────────┬──────────┬──────────┬──────────┐

   KPI        KPI        KPI        KPI

└──────────┴──────────┴──────────┴──────────┘
```

Mobile

```
KPI      KPI

KPI      KPI
```

---

# 4. Skills

```
Analytics

□ □ □

□ □ □

Database

□ □ □

□ □ □

Programming

□ □ □

□ □ □
```

Each □ = Skill Card

---

# 5. Experience

```
│

● Internship

│

● Company

│

● Role

│

● Timeline

```

Desktop

Timeline Left

Content Right

Mobile

Timeline Full Width

---

# 6. Education

```
┌──────────────────────────────┐

University

Degree

Duration

CGPA

└──────────────────────────────┘
```

---

# 7. Certifications

Desktop

```
□

□

□
```

3-column grid

Mobile

```
□

□

□
```

---

# 8. Featured Projects

Desktop

```
┌─────────────────────────────────────────────┐

Information

Image

Buttons

└─────────────────────────────────────────────┘
```

Two large cards.

---

# 9. Projects

```
Search

All SQL Python BI Excel ML

□ □ □

□ □ □

□ □ □
```

---

# 10. Dashboard Showcase

Sticky Horizontal Scroll

```
□□□□□□□□□□□□□□□□□□□□
```

Each rectangle

=

Dashboard Card

---

# 11. Case Studies

```
Problem

↓

Analysis

↓

Solution

↓

Business Impact
```

Card Stack Layout

---

# 12. Data Storytelling

```
Chart

↓

Insight

↓

Business Decision
```

---

# 13. GitHub

```
Contribution Graph

Repo

Repo

Repo

Repo
```

---

# 14. Tech Stack

```
○ ○ ○ ○ ○ ○ ○

○ ○ ○ ○ ○ ○ ○

○ ○ ○ ○ ○ ○ ○
```

Icons only

---

# 15. Achievements

```
Achievement

Achievement

Achievement
```

Timeline

or

Cards

---

# 16. Contact

Desktop

```
┌──────────────┬────────────────────────────┐

Contact Info   Contact Form

└──────────────┴────────────────────────────┘
```

Mobile

```
Contact Info

Form
```

---

# 17. Footer

```
Logo

Links

Copyright

Back to Top
```

---

# Responsive Rules

## Desktop

≥ 1024px

* Two-column layouts
* Horizontal sections
* Sticky scroll
* Full animations

---

## Tablet

768px–1023px

* Mixed layout
* Smaller spacing
* Reduced animation intensity

---

## Mobile

<768px

* Single-column
* Vertical stacking
* Horizontal scroll only where necessary
* Simplified particle field

---

# Layout Constants

Container

```
max-width: 1280px
```

Content Width

```
max-width: 900px
```

Card Radius

```
24px
```

Section Padding

```
Desktop

160px

Tablet

120px

Mobile

80px
```

Grid Gap

```
32px
```

---

# AI Rules

* Never change the order of sections.
* Never reduce spacing to fit more content.
* Preserve full-screen hero.
* Preserve sticky sections.
* Preserve horizontal dashboard scroll.
* Maintain a premium editorial layout.
* Favor whitespace over dense layouts.
* All layouts must match these wireframes unless explicitly overridden by `PRD.md`.
