# IMAGE_SPEC.md — Asset & Media Specification

> **Purpose:**
> Defines every image, icon, illustration, screenshot, video, and media asset used throughout the portfolio.
>
> This document ensures AI agents use consistent assets, dimensions, formats, and optimization techniques.
>
> **Read After:** `DESIGN_SYSTEM.md`
>
> **Read Before:** `UI_UX.md`

---

# Asset Philosophy

The portfolio should feel like a premium SaaS product.

Images should:

* Be high quality
* Use consistent aspect ratios
* Be optimized
* Never stretch
* Never pixelate
* Never use random stock photos

Prefer real project screenshots over decorative artwork.

---

# Folder Structure

```text
public/
│
├── avatar/
│   ├── profile.webp
│   └── profile-small.webp
│
├── projects/
│   ├── logguardian.webp
│   ├── sales-dashboard.webp
│   ├── indiclaw.webp
│   ├── trackzen.webp
│   └── ...
│
├── dashboards/
│   ├── dashboard-1.webp
│   ├── dashboard-2.webp
│   └── ...
│
├── certificates/
│
├── icons/
│
├── logos/
│
├── backgrounds/
│
├── seo/
│   ├── og-image.png
│   └── twitter-card.png
│
└── resume/
```

---

# Image Formats

| Asset            | Format    |
| ---------------- | --------- |
| Photos           | WebP      |
| Screenshots      | WebP      |
| Dashboard Images | WebP      |
| Hero Background  | WebP      |
| Icons            | SVG       |
| Logos            | SVG       |
| SEO Images       | PNG       |
| Favicon          | ICO + PNG |

Never use JPG unless unavoidable.

---

# Hero Section

## Background

Type

```text
Three.js Particle Canvas
```

No static hero image.

---

## Hero Avatar

Purpose

Professional profile image

Resolution

```text
1024 × 1024
```

Display Size

```text
320 × 320
```

Shape

```text
Rounded XL
```

Format

```text
profile.webp
```

---

# About Section

Avatar

```text
1024 × 1024
```

Aspect Ratio

```text
1 : 1
```

Object Fit

```text
cover
```

Border

Accent Border

Shadow

Soft

---

# Featured Projects

Every featured project requires

```text
Cover Image

Desktop Screenshot

Mobile Screenshot

Logo (Optional)
```

Resolution

```text
1600 × 900
```

Aspect Ratio

```text
16 : 9
```

Format

```text
WebP
```

---

# Project Cards

Thumbnail

```text
1200 × 675
```

Aspect Ratio

```text
16 : 9
```

Display

```text
Responsive
```

---

# Dashboard Showcase

Resolution

```text
1920 × 1080
```

Aspect Ratio

```text
16 : 9
```

Format

```text
dashboard.webp
```

Each dashboard should include

* Desktop screenshot
* Mobile screenshot (optional)

---

# Case Studies

Required Images

* Before
* After

Resolution

```text
1600 × 900
```

Layout

```text
Before → After
```

---

# GitHub Section

Repository Images

Not Required

Use

* Repository icon
* Language colors

---

# Certifications

Resolution

```text
1200 × 900
```

Display Height

```text
320px
```

Object Fit

```text
Contain
```

---

# Tech Stack Icons

Format

```text
SVG
```

Size

```text
48 × 48
```

Hover

```text
Scale

1.1
```

---

# Company Logos

Format

```text
SVG
```

Color

Monochrome

Hover

Accent Color

---

# Social Icons

Format

```text
SVG
```

Size

```text
24px
```

Stroke Width

```text
1.75
```

---

# Background Textures

Allowed

* Noise
* Grid
* Gradient
* Dot Pattern

Not Allowed

* Stock photos
* Busy illustrations
* Random graphics

---

# SEO Images

## Open Graph

Resolution

```text
1200 × 630
```

Filename

```text
og-image.png
```

---

## Twitter Card

Resolution

```text
1200 × 675
```

Filename

```text
twitter-card.png
```

---

# Resume

Format

```text
PDF
```

Filename

```text
Vaibhav_Chauhan_Resume.pdf
```

---

# Loading Strategy

Above the Fold

```text
priority={true}
```

Below the Fold

```text
loading="lazy"
```

Always use

```text
next/image
```

Never use

```text
<img>
```

unless absolutely required.

---

# Image Optimization

Quality

```text
85
```

Formats

```text
WebP
```

Responsive Sizes

Desktop

Tablet

Mobile

Use

```text
sizes=""
```

attribute for every image.

---

# Placeholder Strategy

While Loading

Show

```text
Blur Placeholder
```

or

```text
Skeleton
```

Never show empty containers.

---

# Naming Convention

Hero

```text
hero-profile.webp
```

Projects

```text
project-logguardian.webp
```

Dashboard

```text
dashboard-sales.webp
```

Certificates

```text
certificate-accenture.webp
```

Icons

```text
icon-python.svg
```

---

# AI Rules

* Never use low-resolution images.
* Never distort aspect ratios.
* Always preserve image quality.
* Always use `next/image`.
* Use SVG for every icon and logo.
* Prefer WebP for all raster assets.
* Lazy-load everything except above-the-fold content.
* Every project must include a consistent 16:9 cover image.
* Every dashboard screenshot must use the same aspect ratio.
* Use blur placeholders or skeleton loaders while assets are loading.
* Keep image naming consistent and descriptive.
