---
name: vibe-y2k-web
description: Applies the Y2K Web visual style (colors, fonts, spacing, layout, motion) to the portfolio site. Use ONLY when the student names the vibe-y2k-web skill or asks for the Y2K Web vibe. Never changes the content.
---

# Vibe: Y2K Web

## Feel
A knowingly retro early-2000s web aesthetic with chrome cues, bordered modules and a slightly arcade-like interface. Suits playful portfolios that can embrace nostalgia while staying accessible.

## Design tokens
```css
:root {
  /* Colors (mode: light) */
  --color-bg: #F0F2FA;
  --color-text: #191C42;
  --color-muted: #50516D;
  --color-accent: #4C2E91;
  --color-border: #9799C4;

  /* Fonts */
  --font-heading: "Orbitron", sans-serif;
  --font-body: "Rubik", sans-serif;

  /* Shape and spacing (density: compact) */
  --radius: 4px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 30px;
  --space-5: 56px;
  --max-width: 1000px;
}
```
Google Fonts link: `<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet">`

## Layout rules
Layout: grid
- Hero: Use a large Orbitron headline with a static metallic/chrome-style text treatment, readable fallback color and fixed ornamental bevels; all heading words come from SPEC.md.
- About: Frame the real bio in a compact, hard-edged module reminiscent of a personal homepage. Avoid inventing weblog dates or entry counts.
- Projects: Place real projects in 2000s-inspired bordered modules with bold bars, minimal bevel effects and working links; grid stacks on phones.
- Contact: Put actual contact links in a classic footer module; the decorative visitor-counter motif is nonfunctional, unnumbered chrome (no fabricated visit counts).

## Components
- Hero: Orbitron chrome-feeling title with layered *static* highlight, plus original introduction text.
- Project card: Square or lightly beveled card with bright header stripe, thick 1–2px rules and sourced copy.
- Skill tags: Small retro tabs with real skill names only.
- Contact block: Classic footer module with real links; six empty seven-segment-style decorative slots can evoke a fake visitor counter without any number/visitor claim and must be aria-hidden.

## Motion
Motion: subtle. On hover/focus, translate a retro tab or project link upward 2px over 180ms and change decorative highlight opacity; no marquee or blinking. Any motion must use only `transform` and `opacity` over 150–300ms; never use `transition: all`, move elements merely because the page loads, or use more than two scroll reveals. Respect `prefers-reduced-motion`: turn off all movement and reveals.

## Do / Don't
Do:
1. Use Orbitron for display and Rubik for readable body text.
2. Suggest chrome using static bevels, light layers and text-shadow.
3. Keep the visitor-counter motif visibly decorative and non-numeric.
4. Let actual projects fill the retro panels.
5. Preserve clear mobile reading order and visible links.

Don't:
1. Fabricate page views, guestbook entries or timestamps.
2. Use a marquee, GIF-like loop or flickering links.
3. Use chrome highlights that erase text contrast.
4. Add old-school popup windows or autoplay sounds.
5. Make retro navigation controls that do nothing.

## Content rule
All text and projects come from SPEC.md. Never invent content.
