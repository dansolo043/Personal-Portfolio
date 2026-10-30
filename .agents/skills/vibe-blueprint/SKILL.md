---
name: vibe-blueprint
description: Applies the Blueprint visual style (colors, fonts, spacing, layout, motion) to the portfolio site. Use ONLY when the student names the vibe-blueprint skill or asks for the Blueprint vibe. Never changes the content.
---

# Vibe: Blueprint

## Feel
Precise and methodical, styled like an engineering drawing on blue graph paper. Suits makers, researchers and builders who want structure, measurements and annotations as visual language.

## Design tokens
```css
:root {
  /* Colors (mode: dark) */
  --color-bg: #102E4B;
  --color-text: #F1F8FF;
  --color-muted: #B8D6EA;
  --color-accent: #9CE6F9;
  --color-border: #457393;

  /* Fonts */
  --font-heading: "IBM Plex Mono", monospace;
  --font-body: "IBM Plex Sans", sans-serif;

  /* Shape and spacing (density: normal) */
  --radius: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 32px;
  --space-5: 64px;
  --max-width: 1160px;
}
```
Google Fonts link: `<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">`

## Layout rules
Layout: grid
- Hero: Use real introductory text with a technical title treatment, registration marks and a non-content line-grid drawn only in CSS.
- About: Set the provided bio inside a clear rectangular drawing panel; use fine pointer lines only to visually emphasize existing text, never invent engineering annotations.
- Projects: Frame each real project as a drafting-sheet module with measured-looking borders, a short real title and existing description. Decorative grid stays behind the text.
- Contact: Treat actual contact links as a blueprint legend/key panel in a final full-width row, without assigning invented drawing codes.

## Components
- Hero: IBM Plex Mono heading with thin dimension-line decorations and static graph paper background.
- Project card: Square framed drawing-panel card with crisp labels and real project details.
- Skill tags: Blueprint legend-like outlined tags using actual skills from SPEC.md.
- Contact block: Clean drafting-title-block treatment for true contact addresses/links only.

## Motion
Motion: none. No motion; all hover/focus states appear immediately and leave the drawing grid stationary. Any motion must use only `transform` and `opacity` over 150–300ms; never use `transition: all`, move elements merely because the page loads, or use more than two scroll reveals. Respect `prefers-reduced-motion`: turn off all movement and reveals.

## Do / Don't
Do:
1. Render blueprint grid with low-contrast CSS background lines.
2. Use white or near-white text and high-contrast cyan accents.
3. Use clean right angles and fine technical outlines.
4. Keep callout pointers attached to real content only.
5. Use monospaced display and readable sans-serif body.

Don't:
1. Invent dimensions, coordinates or engineering measurements.
2. Let grid lines run over letters at distracting opacity.
3. Use rounded bubbly cards.
4. Add animated scanning lines.
5. Render annotations smaller than readable mobile body text.

## Content rule
All text and projects come from SPEC.md. Never invent content.
