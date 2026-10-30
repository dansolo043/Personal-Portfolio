---
name: portfolio-structure
description: Keeps the student's portfolio website in one fixed, simple structure using plain HTML, CSS and JavaScript with no frameworks. Use whenever creating, editing, restructuring or restyling any file of the portfolio site, and whenever the student asks for a framework, library or build tool.
---

# Portfolio structure

## Goal
Every student's site has the same easy-to-follow layout, so beginners can find things and mentors can help fast.

## File layout (always)
```
public/
  index.html
  styles.css
  script.js
  assets/
```
All site files live inside `public/` because Firebase Hosting serves that folder. Do not create other top-level folders for the site. Do not rename these files.

## Rules
1. HTML: a single `index.html`. Use semantic tags: header, nav, main, section, footer. One `h1`. Headings in order (h1, h2, h3). Always include `<html lang="en">`, the charset meta tag and the viewport meta tag.
2. Sections come from SPEC.md. Typical sections: hero (name and one line), about, projects, skills, contact. Include only the sections SPEC.md has content for.
3. CSS: a single `styles.css` linked from index.html. Mobile-first: write the small-screen styles first, then widen with `min-width` media queries. Put colors, fonts and spacing in CSS variables at the top of the file. No inline styles.
4. JavaScript: a single `script.js`, loaded in the head with `<script src="script.js" defer></script>`. Use it only for small interactions (menu toggle, dark mode, scroll effects). The content must show even if JavaScript fails.
5. No frameworks or libraries: no React, Vue, Tailwind, Bootstrap, jQuery, no `npm install`, no build step. A Google Fonts link is the only external resource allowed (a vibe skill may ask for it). The one exception: a take-home vibe the student picked (`vibe-scroll-film`, `vibe-shader-world`, `vibe-3d-room`) may load the exact pinned CDN libraries listed in its Libraries section, and nothing else.
6. Accessibility basics: alt text on every image (describe what it shows), text contrast of at least 4.5:1 (3:1 for large headings), a visible focus outline on links and buttons (never remove it), link text that makes sense on its own (not "click here"), and tap targets of at least 44 by 44 px on phones. Body text at least 16px with a line height around 1.5.
7. Content comes only from SPEC.md. Never invent a bio, project, link or number. Never use content from SPEC.example.md.
8. Images go in `assets/` with short lowercase file names. Keep each image under 500 KB.
9. Spacing comes only from the spacing variables (for example `var(--space-3)`), never random pixel values. No sideways scrolling, even at 320px wide.
10. Let the student's projects lead. Avoid the generic AI look: purple gradients everywhere, heavy shadows, everything fully rounded, a big hero with no real content.

## If the student asks for something that breaks a rule
Say which rule it is and why in one or two sentences, then offer the closest option that follows it.
Example: asked for React, explain that this project uses plain HTML, CSS and JavaScript so it deploys with no setup, then build the same thing without React.

## Before you finish a change, check
- [ ] The four files are still inside `public/` with the names above
- [ ] The page works at 375px, 768px and 1280px wide
- [ ] Every image has alt text
- [ ] No placeholder text is left
