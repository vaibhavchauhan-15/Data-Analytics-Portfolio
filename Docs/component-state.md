# COMPONENT_STATES.md — Component Behavior Specification

> **Purpose:**
> Defines every UI component's visual and interactive states. This ensures consistency across the entire portfolio and removes ambiguity for AI coding agents.
>
> **Read After:** `DESIGN_SYSTEM.md`
>
> **Read Before:** `COMPONENTS.md`

---

# Global Rules

Every interactive component **must support** these states when applicable.

```
Default

Hover

Focus

Active

Loading

Disabled

Success

Error

Empty

Skeleton
```

---

# 1. Button

## Variants

* Primary
* Secondary
* Ghost
* Outline
* Icon

---

## Default

* Background: `--accent-primary`
* White text
* Rounded Full
* Shadow: none

---

## Hover

* Slight lift (`translateY(-2px)`)
* Glow effect
* Brighten background
* Cursor pointer

Animation

```
Duration

200ms

Ease

power3.out
```

---

## Focus

* 2px Accent Border
* Visible Focus Ring
* Keyboard accessible

---

## Active

* Scale

```
0.98
```

* Remove glow

---

## Loading

Replace text

```
Download Resume
```

↓

```
Loading...
```

Show spinner

Disable clicks

---

## Disabled

* 50% opacity
* Cursor not-allowed
* No hover animation

---

## Success

Green check icon

```
Downloaded ✓
```

---

## Error

Red border

Shake animation

---

# 2. Navigation Bar

## Default

Transparent

---

## Scrolled

```
Background Blur

Border Bottom

Shadow
```

---

## Hover

Link underline grows

Text color becomes accent

---

## Active Link

Accent Color

Bold

Underline

---

## Mobile Menu

Closed

↓

Hamburger

↓

Open

↓

Fullscreen Overlay

---

# 3. Hero Buttons

Support

* Hover
* Loading
* Active

Special Effect

Magnetic hover

---

# 4. Cards

Includes

* Project Card
* Certification Card
* Skill Card
* Dashboard Card
* Achievement Card

---

## Default

Dark Surface

Rounded

Border

---

## Hover

```
TranslateY

-8px
```

Border Accent

Soft Glow

Shadow

---

## Active

```
Scale

0.98
```

---

## Loading

Skeleton Card

```
□□□□□□□□

□□□□□□□□

□□□□□□
```

---

## Empty

```
No Data Available
```

---

# 5. Project Card

States

Default

Hover

Selected

Loading

---

## Hover

Image Zoom

1.05

Background Lift

Border Glow

---

## Selected

Accent Border

Badge

```
Featured
```

---

# 6. Dashboard Card

Hover

Dashboard image zoom

Overlay fade in

Button appears

---

# 7. Skill Card

Hover

Progress bar animates

Icon rotates slightly

Card lifts

---

# 8. Timeline

## Default

Gray Line

---

## Active

Accent Line

Dot Pulse

---

## Hover

Timeline Card lifts

---

# 9. Contact Form

States

Default

Focus

Typing

Loading

Success

Error

---

## Focus

Accent Border

Focus Ring

---

## Loading

Button Spinner

Disable Inputs

---

## Success

Large Checkmark

```
Message Sent
```

---

## Error

Red Border

Validation Message

---

# 10. Input Fields

Default

Border

---

Hover

Border Brightens

---

Focus

Accent Border

Glow

---

Invalid

Red Border

Error Text

---

Disabled

Gray Background

---

# 11. Search Bar

Hover

Glow

---

Focus

Expand Width

Accent Border

---

Typing

Search Icon Animates

---

No Results

```
No Projects Found
```

---

# 12. Tabs

States

Default

Hover

Active

Disabled

---

Active

Accent Background

Bold Text

---

Hover

Background Surface Hover

---

# 13. Accordion (FAQ)

Closed

↓

Open

Smooth Height Animation

Chevron Rotates

---

# 14. Theme Toggle

Light

↓

Dark

Rotate Icon

Fade Background

---

# 15. Social Icons

Default

Gray

---

Hover

Accent Color

Lift

Glow

---

Active

Scale

0.95

---

# 16. GitHub Repo Card

Hover

Border Glow

Star Count Highlight

Button Appears

---

# 17. Tech Icons

Default

Gray

---

Hover

Accent

Rotate 5°

Tooltip

---

# 18. Scroll Indicator

Default

2px

---

Scrolling

Progress Width Increases

---

Finished

100%

---

# 19. Loader

Used For

* Initial Page
* API Requests
* Contact Form
* GitHub Fetch

Animation

```
Fade

Rotate

Pulse
```

---

# 20. Skeleton Screens

Hero

Cards

Projects

GitHub

Dashboard

Contact

Skeleton Style

```
████████

██████

██████████
```

Animated shimmer

---

# 21. Empty States

Projects

```
No Projects Available
```

GitHub

```
Unable to Load Repositories
```

Blog

```
Coming Soon
```

Testimonials

```
Available Soon
```

---

# 22. Error States

Network Error

```
Retry
```

Form Error

```
Please check your inputs.
```

GitHub Error

```
Unable to fetch repositories.
```

---

# Motion Rules

Hover Duration

```
200ms
```

Press

```
100ms
```

Loading

```
Infinite
```

Page Transition

```
600ms
```

Card Lift

```
8px
```

Glow Blur

```
20px
```

---

# AI Rules

* Every interactive component must support hover, focus, and active states.
* Never leave loading states blank.
* Always use skeleton loaders instead of empty white space.
* Every form must include success and error states.
* Preserve consistent transitions across all components.
* Reuse component variants instead of creating duplicates.
* Follow the Design System color tokens for every state.
* Do not invent new component behaviors unless explicitly documented.
