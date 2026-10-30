---
name: vibe-cad-workspace
description: Restyles the portfolio site as a 3D CAD modelling workspace (look, layout and motion). Use ONLY when the student names the vibe-cad-workspace skill or asks for the CAD Workspace vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: major
  tags: "mechanical, engineering, design"
  intensity: standard
  version: "2"
---

# Vibe: CAD Workspace

## Feel and who it's for
The portfolio feels like the viewport of 3D modelling software: a light grey gradient workspace, a part tree down the side that works as the navigation, a small view cube in the corner, selection-blue highlights, dimension lines with arrowheads, numbered callout balloons and an engineering-drawing title block. Parts slide along one axis and mate into place, like an assembly. Good for mechanical engineering students who want a recruiter to see "this person thinks in assemblies".

## Must keep (this is what makes it CAD Workspace)
1. A light grey gradient workspace with graphite text. It is NOT a dark blue flat drawing (that is Blueprint).
2. A feature tree as navigation: a sidebar on desktop, a compact bottom bar on phones.
3. Selection blue for hover, focus and the current section. Orange only for dimension lines and callouts.
4. Motion is rigid: even easing, one axis at a time, no bounce, no diagonal drift. Only the view cube rotates.
5. A view cube in a corner that turns to a new face as you reach each section.

## Starting defaults (change freely)
The student can say "make the blue darker" or "use a white workspace". Their request wins.

Palette, in words: pale grey fading to a slightly darker grey for the workspace; white panels; graphite text; a medium grey for secondary text; selection blue for highlights; burnt orange for dimension lines; a light steel grey for borders.

```css
:root {
  --color-bg-top: #F4F6F8;
  --color-bg: #D9DEE4;
  --color-surface: #FFFFFF;
  --color-text: #1F2429;
  --color-muted: #4A5560;
  --color-select: #0950B8; /* dark enough for 4.5:1 on the grey workspace, not only on white */
  --color-dim: #A63F00;
  --color-border: #AAB3BD;
  --ease-tween: cubic-bezier(0.65, 0, 0.35, 1);
  --move: 600ms;
  --travel: 24px; /* how far a part travels; motion only, never spacing */
}
body { background: linear-gradient(var(--color-bg-top), var(--color-bg)) fixed; color: var(--color-text); }
```

Fonts: Barlow Semi Condensed for headings, Barlow for body, JetBrains Mono for small labels. Alternatives: Roboto Mono or Inter. Do not use the IBM Plex pair (that is Blueprint).
`<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Semi+Condensed:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`

Spacing, sizes and corner radius are your call. Corners stay square or nearly square.

## Layout ideas
- **Header / nav:** the feature tree. On desktop it is a fixed left sidebar listing the real section names as a nested list with small square "feature" icons. On phones it becomes a bottom bar, links at least 44px tall. The tree's top line may show the student's real name from SPEC.md.
- **Hero:** the name large, the intro under it, a short rule, then a dimension line with arrowheads (optional real label such as the program or year).
- **About:** the real bio in a white panel with a thin selection-blue edge.
- **Projects:** a grid of white "part" cards. Each has a numbered callout balloon (1, 2, 3 by order) joined to the card by a thin orange leader line.
- **Skills:** real skills as small mono-labelled tags, like a parts list.
- **Contact:** the real links inside a title block, a bordered grid of cells (`<dl>`). Show a cell only if SPEC.md has data for it, and drop the rest.
- **View cube:** fixed in a top corner, small, `aria-hidden="true"` and `pointer-events: none`, because it is decoration. Keep room for it so it never covers text.
- Decoration evokes the field. All text and numbers come from SPEC.md. Dimension lines carry a real label from SPEC.md or no label at all.

## Make it theirs
- The one loud thing is the exploded view with the turning cube. Everything else stays flat and quiet: thin lines, white panels, no shadows piled on cards.
- Use the student's real vocabulary. If SPEC.md names materials, tools or processes (for example PETG or 3D printing), those become the labels on tags and dimension lines. Never invent any.
- Every device carries meaning, as on a real drawing. Callout balloons are item numbers for the projects. ALL-CAPS mono labels belong only in the title block. The dimension line measures something real, or it has no label.

## Motion character
Tempo: deliberate, 450-700ms. Easing: always `var(--ease-tween)`, which starts and ends the same way, like a driven mechanism. Each part moves along ONE axis (X, Y, or Z as a scale) and stops dead in place. Never bounce, overshoot, wobble, or rotate anything except the view cube.

### 1. Page load: assembly
Hero pieces slide in along different axes and mate into place, then the name gets one selection-blue outline flash. Pure CSS, so the text is in the HTML and shows if JavaScript fails.

```html
<section class="hero" id="home" aria-labelledby="home-title">
  <h1 id="home-title" class="hero-name part-x">Sam Rivera</h1>
  <p class="part-y">The one-line intro from SPEC.md.</p>
  <p class="dim-line part-z"><span class="dim-rule"></span></p>
</section>
```
```css
@keyframes mate-x { from { transform: translateX(calc(var(--travel) * -1)); opacity: 0; } }
@keyframes mate-y { from { transform: translateY(var(--travel)); opacity: 0; } }
@keyframes mate-z { from { transform: scale(0.94); opacity: 0; } }
@keyframes select-flash { 0%, 100% { outline-color: transparent; } 40%, 60% { outline-color: var(--color-select); } }

.hero { overflow: clip; } /* parts can never cause sideways scrolling */
.part-x, .part-y, .part-z { animation: var(--move) var(--ease-tween) both; }
.part-x { animation-name: mate-x; }
.part-y { animation-name: mate-y; animation-delay: 150ms; }
.part-z { animation-name: mate-z; animation-delay: 300ms; }
.hero-name { outline: 2px solid transparent; outline-offset: 4px; animation: mate-x var(--move) var(--ease-tween) both, select-flash 900ms linear 750ms 1; }

/* Dimension line: an arrowhead at each end, a rule between, an optional real label in the middle. */
.dim-line { display: flex; align-items: center; gap: var(--space-2); color: var(--color-dim); font-family: "JetBrains Mono", monospace; }
.dim-line::before, .dim-line::after { content: ""; border: solid transparent; }
.dim-line::before { border-width: 0.3rem 0.6rem 0.3rem 0; border-right-color: var(--color-dim); }
.dim-line::after { border-width: 0.3rem 0 0.3rem 0.6rem; border-left-color: var(--color-dim); }
.dim-rule { flex: 1; height: 1px; background: var(--color-dim); }
```
With a label, put `<span class="dim-rule"></span><span class="dim-label">York University</span><span class="dim-rule"></span>` inside `.dim-line`.

### 2. Scroll: exploded view
Project cards start slightly stacked on the Y axis and separate into their grid slots as the section scrolls in. The callout balloons fade in as they settle. Cards are fully settled well before they reach the middle of the screen. Browsers without scroll-driven animation just show the cards in place.

```html
<div class="projects-grid">
  <article class="project-card"><span class="callout" aria-hidden="true"></span><h3>Project title</h3><p>Real description.</p></article>
</div>
```
```css
.projects-grid { counter-reset: part; display: grid; overflow-x: clip; }
.project-card { position: relative; counter-increment: part; background: var(--color-surface); border: 1px solid var(--color-border); }
.callout { position: absolute; top: 0; right: var(--space-3); display: flex; flex-direction: column; align-items: center; pointer-events: none; }
.callout::before { content: counter(part); display: grid; place-items: center; width: 1.75rem; height: 1.75rem; border: 1px solid var(--color-dim); border-radius: 50%; background: var(--color-surface); color: var(--color-dim); font: 500 0.875rem "JetBrains Mono", monospace; transform: translateY(-50%); }
.callout::after { content: ""; width: 1px; height: var(--space-3); background: var(--color-dim); transform: translateY(-0.875rem); } /* half the balloon, so the leader starts at its bottom edge */

@keyframes explode { from { transform: translateY(calc(var(--travel) * var(--dir, -1))); opacity: 0.6; } }
@keyframes callout-in { from { opacity: 0; } }
@supports (animation-timeline: view()) {
  .project-card { animation: explode linear both; animation-timeline: view(); animation-range: entry 0% entry 55%; }
  @media (min-width: 40em) { .project-card:nth-child(even) { --dir: 1; } } /* use the same width where the grid becomes two columns */
  .callout { animation: callout-in linear both; animation-timeline: view(); animation-range: entry 25% entry 65%; }
}
```
Give cards enough top padding for the balloon. With three projects, use one column on phones and three on wide screens (or let the last card span both columns) so no card sits alone. In a one-column phone layout every card starts a little above its slot and drops to it. In two columns the even cards start below and the odd cards above, so they separate. Keep `--travel` small so text is readable the whole time.

### 3. Hover and focus: pre-selection highlight
Edges turn selection blue in about 100ms, like hovering a face in CAD. Fast and linear, no movement.

```css
.project-card, .tag, .title-block div { transition: border-color 100ms linear, box-shadow 100ms linear; }
.project-card:hover, .project-card:focus-within { border-color: var(--color-select); box-shadow: 0 0 0 1px var(--color-select); }
a { color: var(--color-select); text-underline-offset: 3px; }
a:hover { text-decoration-thickness: 2px; }
a:focus-visible, button:focus-visible { outline: 2px solid var(--color-select); outline-offset: 2px; }
```

### 4. Navigation: tree, zoom to fit, view cube
The tree highlights the current section. Jumping uses smooth scroll, and the target does a brief "zoom to fit". The view cube turns to a new face for each section.

```html
<nav class="feature-tree" aria-label="Sections">
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#projects">Projects</a></li>
  </ul>
</nav>
<div class="view-cube" aria-hidden="true"><div class="cube" data-view="home">
  <span class="face face-front">Front</span><span class="face face-back">Back</span><span class="face face-right">Right</span>
  <span class="face face-left">Left</span><span class="face face-top">Top</span><span class="face face-bottom">Bottom</span>
</div></div>
```
```css
html { scroll-behavior: smooth; }
section[id] { scroll-margin-top: var(--space-4); }
@keyframes zoom-fit { from { transform: scale(1.02); } }
section:target { transform-origin: 50% 0; animation: zoom-fit var(--move) var(--ease-tween); }
main { overflow-x: clip; }

/* Phone: bottom bar. Desktop: left sidebar. */
:root { --tree-h: 3.5rem; } /* bar height on phones: links are 44px plus the border */
.feature-tree { position: fixed; inset: auto 0 0 0; min-height: var(--tree-h); background: var(--color-surface); border-top: 1px solid var(--color-border); }
.feature-tree ul { display: flex; justify-content: space-around; margin: 0; padding: 0; list-style: none; }
.feature-tree a { display: flex; align-items: center; min-height: 44px; padding: 0 var(--space-2); text-decoration: none; color: var(--color-text); border-bottom: 3px solid transparent; }
.feature-tree a[aria-current] { color: var(--color-select); border-bottom-color: var(--color-select); }
body { padding-bottom: var(--tree-h); } /* keep the last section clear of the bar */
@media (min-width: 60em) {
  .feature-tree { inset: 0 auto 0 0; width: 14rem; border-top: 0; border-right: 1px solid var(--color-border); }
  .feature-tree ul { flex-direction: column; justify-content: flex-start; }
  .feature-tree a { border-bottom: 0; border-left: 3px solid transparent; }
  .feature-tree a[aria-current] { border-left-color: var(--color-select); }
  main { margin-left: 14rem; }
  body { padding-bottom: 0; }
}

/* View cube: a 3D cube; faces sit on its six sides. */
.view-cube { position: fixed; top: var(--space-3); right: var(--space-3); width: 3.5rem; height: 3.5rem; perspective: 400px; pointer-events: none; }
.cube { --cube-x: -18deg; --cube-y: -28deg; position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: rotateX(var(--cube-x)) rotateY(var(--cube-y)); transition: transform var(--move) var(--ease-tween); }
.face { position: absolute; inset: 0; display: grid; place-items: center; background: var(--color-surface); border: 1px solid var(--color-select); color: var(--color-text); font: 500 0.75rem "JetBrains Mono", monospace; backface-visibility: hidden; }
.face-front { transform: translateZ(1.75rem); }
.face-back { transform: rotateY(180deg) translateZ(1.75rem); }
.face-right { transform: rotateY(90deg) translateZ(1.75rem); }
.face-left { transform: rotateY(-90deg) translateZ(1.75rem); }
.face-top { transform: rotateX(90deg) translateZ(1.75rem); }
.face-bottom { transform: rotateX(-90deg) translateZ(1.75rem); }
.cube[data-view="about"] { --cube-y: -118deg; }
.cube[data-view="projects"] { --cube-x: -90deg; --cube-y: -28deg; }
.cube[data-view="skills"] { --cube-y: -208deg; }
.cube[data-view="contact"] { --cube-y: 62deg; }
```
The `data-view` values must match the section ids; rename them to match the student's sections. If the cube's faces become real links, remove `aria-hidden` and `pointer-events: none`, and give them 44px targets.
```js
const sections = document.querySelectorAll('main section[id]');
const treeLinks = document.querySelectorAll('.feature-tree a');
const cube = document.querySelector('.cube');
// After a nav jump, keep the jumped-to link current until the visitor scrolls on their own. Without this,
// jumping to a short section selects the one after it (the middle band or the page bottom lands there).
let jumpedTo = '', jumpSeen = false;
document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', () => {
  const target = document.getElementById(a.hash.slice(1));
  if (target && target.matches('main section[id]')) { jumpedTo = target.id; jumpSeen = false; }
}));
['wheel', 'touchmove'].forEach((name) => window.addEventListener(name, () => { jumpedTo = ''; }, { passive: true }));
window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) jumpedTo = '';
});
window.addEventListener('scroll', () => { // a scrollbar drag: release once the target was on screen and has left it
  if (!jumpedTo) return;
  const box = document.getElementById(jumpedTo).getBoundingClientRect();
  if (box.bottom > 0 && box.top < window.innerHeight) jumpSeen = true;
  else if (jumpSeen) jumpedTo = '';
}, { passive: true });
function select(id) {
  id = jumpedTo || id;
  treeLinks.forEach((link) => {
    // setAttribute, not toggleAttribute: aria-current="" counts as false for screen readers.
    if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if (cube) cube.dataset.view = id;
}
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) select(entry.target.id); });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((section) => spy.observe(section));
// A short last section may never reach the middle band: at the very bottom, select it anyway.
window.addEventListener('scroll', () => {
  const last = sections[sections.length - 1];
  if (!last || window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 2) return;
  select(last.id);
}, { passive: true });
```
On phones, the fixed cube can cover text as the page scrolls: put it inside a slim fixed top bar with the student's name, or leave a gutter on the right for it.

### 5. Signature: the exploded view and the turning view cube
Projects separating into their slots, and the cube turning as you scroll. Those two are what people remember. Keep both exactly as rigid as above.

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```
Everything is already visible and in place; the cube still changes face, but instantly.

## Libraries
None. Plain CSS and JavaScript only.

## Avoid
- Invented measurements, tolerances, materials or part numbers. Dimension numbers that are not in SPEC.md.
- Toolbar buttons, menus or "rotate model" controls that do nothing.
- Real CAD product names or logos.
- Heavy 3D, WebGL or many 3D layers. One small CSS cube is the limit, since phones must stay smooth.
- Diagonal, bouncy, spinning or slow floating motion.
- Dark blue flat paper with grid lines. That is Blueprint, not this.
- Hiding content until JavaScript runs.
- Generic page habits: the same rounded card with the same soft shadow everywhere, gradient washes, a "→" after every link, ALL-CAPS labels above every heading.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
