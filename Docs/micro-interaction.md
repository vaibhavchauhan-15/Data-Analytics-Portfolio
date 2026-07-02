# MICRO_INTERACTIONS.md — Premium Interaction & Motion Specification

> **Purpose:**
> Defines every small interaction that makes the portfolio feel premium.
>
> These interactions should be subtle, smooth, and intentional. Never distract from the content.
>
> **Read After:** `ANIMATIONS.md`
>
> **Read Before:** `COMPONENT_STATES.md`

---

# Design Philosophy

The portfolio should feel like:

* Apple
* Linear
* Vercel
* Raycast
* Stripe

Micro interactions should communicate:

* Feedback
* Hierarchy
* Responsiveness
* Delight

Never animate just for decoration.

Every animation must have a purpose.

---

# Global Motion Rules

Duration

```text
Hover        150–250ms
Click        80–120ms
Reveal       500–700ms
Page Change  500–700ms
Loading      Infinite
```

Easing

```text
expo.out
power3.out
power2.inOut
back.out(1.6)
```

Never use:

* Bounce effects
* Cartoon animations
* Excessive rotation
* Flashing elements

---

# 1. Cursor

Desktop only.

Normal

↓

Small circle

Hover Button

↓

Grow slightly

Hover Card

↓

Soft glow

Hover Link

↓

Underline grows

Hover Image

↓

Cursor expands

Reduced Motion

↓

Disabled

---

# 2. Button Interaction

Default

↓

Flat

Hover

↓

Lift

Glow

Background brighten

Active

↓

Scale 0.98

Release

↓

Spring back

Loading

↓

Spinner rotates

Success

↓

Checkmark appears

---

# 3. Magnetic Buttons

Applies to

* Hero CTA
* Resume Button
* Contact Button

Behavior

Cursor enters

↓

Button moves

4–8px toward cursor

↓

Returns smoothly

Never exceed 8px movement.

---

# 4. Card Hover

Applies to

* Project Cards
* Dashboard Cards
* Skill Cards
* Certification Cards

Hover

↓

TranslateY(-8px)

↓

Shadow increases

↓

Border glows

↓

Image zooms

↓

Background brightens

Leave

↓

Return smoothly

---

# 5. Project Image Hover

Hover

↓

Scale

```text
1 → 1.05
```

Overlay

↓

Fade in

Buttons

↓

Slide upward

Gradient

↓

Increase opacity

---

# 6. Dashboard Hover

Hover

↓

Screenshot zoom

↓

KPI badge appears

↓

Border glows

↓

Mouse spotlight follows

---

# 7. Skill Cards

Hover

↓

Icon rotates

↓

Progress bar animates

↓

Card lifts

↓

Accent border appears

---

# 8. Navigation

Hover

↓

Underline grows

↓

Text changes to accent color

Active Link

↓

Accent

↓

Bold

↓

Animated underline

Scroll

↓

Navbar blur increases

↓

Background fades in

---

# 9. Social Icons

Hover

↓

Scale 1.15

↓

Rotate 5°

↓

Accent color

↓

Glow

Click

↓

Scale 0.95

---

# 10. Timeline

Scroll

↓

Timeline line draws

↓

Dot pulses

↓

Card slides in

Hover

↓

Card lifts

↓

Dot grows

---

# 11. KPI Counters

On Enter

↓

Count Up

↓

Underline grows

↓

Glow pulse

Never repeat animation.

Only once.

---

# 12. Contact Form

Input Focus

↓

Border glow

↓

Label color changes

Typing

↓

Cursor smooth

Submit

↓

Spinner

↓

Success animation

↓

Checkmark

Error

↓

Shake

↓

Red border

↓

Error message

---

# 13. Search Box

Focus

↓

Expand width slightly

↓

Glow

Typing

↓

Search icon animates

Results

↓

Cards fade

↓

New cards stagger in

---

# 14. Tabs

Hover

↓

Background lift

↓

Text accent

Switch

↓

Old content fades out

↓

New content fades in

↓

Indicator slides

---

# 15. Accordion

Open

↓

Chevron rotates 180°

↓

Height expands

↓

Content fades in

Close

↓

Reverse animation

---

# 16. Theme Toggle

Light

↓

Dark

Icon rotates

↓

Background transitions

↓

Glow changes

---

# 17. Hero

Page Load

↓

Particles fade in

↓

Badge appears

↓

Heading reveals word-by-word

↓

Subtitle fades

↓

Buttons scale

↓

Social links stagger

↓

Scroll indicator pulses

---

# 18. Scroll Indicator

Idle

↓

Gentle up-down movement

User Scrolls

↓

Fade out

---

# 19. Dashboard Showcase

Pinned section

↓

Horizontal movement

↓

Cards snap softly

↓

Images zoom slightly

↓

Active card glows

---

# 20. Case Studies

Cards

↓

Stack

↓

Scale slightly

↓

Next card overlaps

↓

Previous fades

---

# 21. Tech Icons

Hover

↓

Lift

↓

Rotate

↓

Tooltip appears

↓

Glow

---

# 22. GitHub Cards

Hover

↓

Border glow

↓

Language badge brightens

↓

Button slides in

---

# 23. Achievement Cards

Hover

↓

Accent border

↓

Icon bounce

↓

Shadow increases

---

# 24. Footer

Hover Links

↓

Underline grows

↓

Accent color

Back to Top

↓

Arrow moves upward

↓

Smooth scroll

---

# 25. Loading Experience

Page Load

↓

Fade from black

↓

Hero appears

↓

Particles initialize

↓

Everything reveals sequentially

No blank screens.

Always show skeletons or loaders.

---

# 26. Scroll Progress

Width increases smoothly

Never jump.

Use interpolation.

---

# 27. Image Loading

Placeholder

↓

Blur

↓

Image fades in

↓

Blur disappears

Never instantly replace images.

---

# 28. Toast Notifications

Success

* Green accent
* Check icon
* Fade in
* Auto dismiss

Error

* Red accent
* Warning icon
* Shake slightly

Position

```text
Bottom Right
```

---

# 29. Mobile Interactions

Reduce motion intensity by 40%.

Disable

* Cursor glow
* Magnetic buttons
* Mouse spotlight
* Cursor stretch

Keep

* Fade
* Slide
* Scale
* Count-up
* Scroll reveals

---

# 30. Motion Priority

Highest Priority

* Hero reveal
* Section transitions
* Dashboard scroll
* Project cards

Medium Priority

* Buttons
* Icons
* Timeline

Low Priority

* Decorative effects
* Cursor
* Background glow

Performance always takes priority over visual effects.

---

# AI Rules

* Every animation must have a purpose.
* Never animate more than one major element at the same time.
* Prefer opacity and transform animations over layout changes.
* Use GPU-accelerated properties (`transform`, `opacity`) whenever possible.
* Keep animations smooth at 60 FPS.
* Avoid excessive motion that distracts from the content.
* Disable non-essential effects on mobile and when `prefers-reduced-motion` is enabled.
* Maintain consistency in timing, easing, and interaction patterns across the entire application.
* If performance and animation conflict, prioritize performance.
