# ACCESSIBILITY.md — Accessibility & Inclusive Design Specification

> **Purpose:**
> Defines accessibility requirements for the entire portfolio to ensure compliance with WCAG 2.2 AA standards while maintaining a premium user experience.
>
> This document is mandatory for every component and page.
>
> **Read After:** `DESIGN_SYSTEM.md`
>
> **Read Before:** `COMPONENT_STATES.md`

---

# Accessibility Goal

The portfolio must be:

* Accessible
* Keyboard navigable
* Screen reader friendly
* Motion safe
* High contrast
* Responsive
* Inclusive

Target

```text
WCAG 2.2 AA
```

---

# Accessibility Principles

Every feature must satisfy:

* Perceivable
* Operable
* Understandable
* Robust

Never sacrifice accessibility for animations.

---

# 1. Keyboard Navigation

Everything interactive must be keyboard accessible.

Supported Keys

```text
Tab

Shift + Tab

Enter

Space

Escape

Arrow Keys
```

---

## Tab Order

```text
Navbar

↓

Hero Buttons

↓

Social Links

↓

About

↓

Skills

↓

Projects

↓

Contact Form

↓

Footer
```

Never skip focusable elements.

---

# 2. Focus Management

Every interactive element must have a visible focus state.

Focus Ring

```css
outline: 2px solid var(--accent-primary);
outline-offset: 4px;
```

Never remove outlines using

```css
outline: none;
```

unless replaced with an accessible alternative.

---

# 3. Screen Reader Support

Every image must include

```html
alt=""
```

Examples

Good

```html
alt="Sales dashboard showing revenue growth"
```

Bad

```html
alt="image"
```

---

Icons

Decorative

```html
aria-hidden="true"
```

Informative

```html
aria-label="GitHub"
```

---

# 4. ARIA Requirements

Buttons

```html
aria-label=""
```

Navigation

```html
<nav aria-label="Main Navigation">
```

Search

```html
<input
aria-label="Search Projects"
/>
```

Timeline

```html
<section
aria-labelledby="experience-heading">
```

Accordion

Use

```text
aria-expanded

aria-controls

aria-labelledby
```

Modal

```text
role="dialog"

aria-modal="true"
```

Loading

```text
aria-busy="true"
```

Progress

```text
role="progressbar"
```

---

# 5. Color Contrast

Minimum Contrast

Text

```text
4.5 : 1
```

Large Text

```text
3 : 1
```

UI Components

```text
3 : 1
```

Never rely on color alone.

Example

Instead of

Red Border

Use

```text
Red Border

+

Error Icon

+

Error Text
```

---

# 6. Reduced Motion

Respect

```css
prefers-reduced-motion
```

When enabled

Disable

* GSAP timelines
* Particle animations
* Parallax
* Cursor glow
* Card tilt
* Floating objects

Replace with

```text
Fade

Opacity

Instant transitions
```

---

# 7. Animations

Maximum Duration

```text
600ms
```

Infinite animations

Only

* Particle drift
* Cursor glow

Never animate

* Inputs
* Form labels
* Error messages

Avoid flashing effects.

---

# 8. Forms

Every field must include

```html
<label>
```

Never rely on placeholders.

Example

Good

```text
Email

[____________]
```

Bad

```text
[Email]
```

Validation

Must include

* Icon
* Error Text
* ARIA

Example

```text
Please enter a valid email address.
```

---

# 9. Links

Every external link

```text
target="_blank"

rel="noopener noreferrer"
```

Screen Reader

```html
aria-label="Open GitHub profile in a new tab"
```

---

# 10. Images

Every image

Must have

Alt Text

Decorative

```html
alt=""
```

Meaningful

Describe

* Dashboard
* Chart
* Avatar
* Certificate

---

# 11. Buttons

Minimum Size

```text
44 × 44 px
```

Spacing

```text
8px
```

Hover

Focus

Active

Must all be different.

---

# 12. Typography

Minimum Font Size

```text
16px
```

Never use

```text
12px body text
```

Maximum Line Length

```text
75 characters
```

Line Height

```text
1.6
```

---

# 13. Responsive Accessibility

Desktop

Keyboard

Mouse

Screen Reader

Tablet

Touch

Keyboard

Mobile

Touch

Voice

Screen Reader

No horizontal scrolling.

---

# 14. Contact Form

Must support

Keyboard

Autocomplete

Validation

Screen Reader

Voice Input

Auto Focus

Error Summary

Success Announcement

Example

```text
Your message has been sent successfully.
```

Use

```html
aria-live="polite"
```

---

# 15. Loading States

Skeletons

Must be

```html
aria-hidden="true"
```

Loading Message

```html
role="status"

aria-live="polite"
```

Example

```text
Loading projects...
```

---

# 16. Error Messages

Must include

Icon

Text

ARIA

Example

```text
Unable to load GitHub repositories.

Retry
```

Never show only

```text
Error
```

---

# 17. Scroll Progress

Progress Bar

Should not interfere with screen readers.

Decorative

```html
aria-hidden="true"
```

---

# 18. Cursor Glow

Desktop Only

Decorative

```html
aria-hidden="true"
```

Must be disabled on

* Touch devices
* Screen readers
* Reduced Motion

---

# 19. Three.js Canvas

Canvas

Must include

Fallback Content

Example

```html
<canvas aria-hidden="true"></canvas>

<p class="sr-only">
Animated particle background.
</p>
```

---

# 20. Accessibility Testing

Test with

* Keyboard only
* Chrome
* Firefox
* Safari
* Edge

Screen Readers

* NVDA
* VoiceOver

Mobile

* TalkBack
* VoiceOver iOS

Accessibility Audit

* Lighthouse ≥ 95
* axe DevTools
* WAVE

---

# AI Rules

* Never remove focus outlines.
* Every interactive element must be keyboard accessible.
* Every image requires meaningful alt text or empty alt if decorative.
* Respect `prefers-reduced-motion`.
* Never use color as the only way to convey information.
* Maintain WCAG 2.2 AA compliance.
* Every form field must have a visible label.
* Every error message must be announced using `aria-live`.
* Ensure all pages are fully usable without a mouse.
* Accessibility is mandatory and must never be sacrificed for visual effects.
