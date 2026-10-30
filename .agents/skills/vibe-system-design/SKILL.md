---
name: vibe-system-design
description: Restyles the portfolio site as a software architecture diagram, with sections as boxes joined by arrows and small packets that travel along them (look, layout and motion). Use ONLY when the student names the vibe-system-design skill or asks for the System Design vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: major
  tags: "software-eng, cs"
  intensity: standard
  version: "2"
---

# Vibe: System Design

## Feel and who it's for
The page is an architecture diagram on a whiteboard: a pale canvas with a faint dot grid, every section a crisp box with a dark outline, and dashed arrows with arrowheads carrying you from one box to the next. Small orange packets travel along the arrows, and when you point at a section in the menu, the whole request path from Home to that section lights up in green. Good for software engineering students who want recruiters to see "this person thinks about how the parts fit together before writing the code".

## Must keep (this is what makes it System Design)
1. A LIGHT canvas with a dot grid. Boxes are white with a 1.5px dark outline, square-ish corners. Not a dark screen (Terminal, Oscilloscope), not a blue blueprint, not a branch line in a gutter (Git Graph) and not copper traces (PCB).
2. Every section is a box and boxes are joined by dashed arrows with arrowheads, pointing down the page. Arrows never cross text.
3. Exactly two signal colours with fixed jobs: green means "the request path" (links, focus, the lit route), orange means "a packet in flight". Nothing else is coloured.
4. Packets travel along arrows, on a trigger, a few times (page load, a section arriving, the menu being pointed at). Nothing loops forever.
5. The navigation is a small chain of boxes joined by arrows. Pointing at or focusing a menu item lights the path from Home to that section.

## Content honesty (very important)
The only words in the diagram are the student's real section names (menu boxes and the small edge labels on the arrows, each naming the section the arrow leads to) and real project names. Do NOT invent service names (gateway, database, queue, cache), protocols, HTTP verbs or status codes, ports, latency, requests per second, uptime, version numbers or "healthy" lights. Decorative labels are `aria-hidden="true"`; every section keeps a real heading.

## Starting defaults (change freely)
The student can say "make the path teal" or "use a dark canvas". Their request wins; recompute contrast if they change colours.

Palette, in words: a neutral whiteboard off-white with pale grey dots; white boxes; dark navy ink for text and outlines; a mid grey-blue for dashed arrows; a pale mint tint for the current menu item; a deep emerald green for the request path and links; a warm orange for packets.

```css
:root {
  /* Contrast, computed (on bg / surface / tint). text 15.8 / 17.1 / 14.7. muted 7.2 / 7.8 / 6.7.
     path green 5.4 / 5.9 / 5.0 (links, focus rings, lit lines). White on path 5.9. Rule (dashed arrows) 4.2 / 4.5 as a graphic.
     Packet orange 3.7 / 4.0 as a graphic only, never text. The dot grid is decoration. */
  --color-bg: #F6F6F2; --color-surface: #FFFFFF; --color-text: #151B2E; --color-muted: #4A5266;
  --color-tint: #E1F2E8; --color-rule: #6F7788; --color-grid: #D9DBE1;
  --color-path: #087443; --color-packet: #D4590A;
  --wire: var(--color-rule);                       /* the colour of the arrowheads; lit parts switch it to green */
  --ease-route: cubic-bezier(0.4, 0, 0.2, 1);      /* UI moves, 160-240ms */
  --ease-hop: cubic-bezier(0.5, 0, 0.25, 1);       /* packets, one hop at a time */
  --run: 480ms;                                    /* a packet crossing one page arrow */
  --header-h: 3.5rem;                              /* the sticky menu, border included */
  --wire-h: 3.5rem;                                /* height of an arrow between boxes */
  --gap: 2.25rem;                                  /* width of an arrow between menu boxes */
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Be Vietnam Pro", system-ui, sans-serif;
}
```
Fonts: Space Grotesk for the name, headings and menu (technical but friendly), Be Vietnam Pro for reading text. Alternatives: Manrope for headings, Public Sans for body. Not Inter, not JetBrains Mono (Terminal).

## Layout ideas
- **Head.** Every page starts like this; the title is the student's name and the description is the one-line intro, both from SPEC.md.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The student's name from SPEC.md</title>
  <meta name="description" content="The one-line intro from SPEC.md.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
</head>
```
- **Assembly.** `styles.css`, in this order: the `:root` block, the base rules, the menu (header and chain), the flow (boxes and arrows), the content blocks (projects, skills, contact), the shared keyframes, the project-hover rules of moment 3, and the reduced-motion block last. Moments 1, 2, 4 and 5 are JavaScript; their CSS is already in the menu, flow and keyframes blocks. `script.js` is one file, in this order: the shared block (all names declared once, at the top of moment 5), moment 5 (route), 1 (load), 2 (arrivals), 3 (hover and focus), 4 (navigation). Nothing is declared twice.
- **Base rules.** The snippets assume this.
```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: auto; scroll-padding-top: calc(var(--header-h) + 1rem); } /* the ONLY offset: jumps and Tab focus clear the sticky menu. Do not add scroll-margin-top as well */
body { margin: 0; color: var(--color-text); font: 400 1.0625rem/1.6 var(--font-body);
  background: var(--color-bg) radial-gradient(circle, var(--color-grid) 1px, transparent 1.5px) 0 0 / 24px 24px; } /* the dot grid */
h1, h2, h3, p, ul { margin: 0; }
ul { padding: 0; list-style: none; }
h1, h2, h3 { font-family: var(--font-display); font-weight: 700; }
h1 { font-size: clamp(2.25rem, 9vw + 0.5rem, 4rem); line-height: 1.05; }
h2 { font-size: 1.75rem; line-height: 1.15; } h3 { font-size: 1.25rem; line-height: 1.25; }
p { max-width: 62ch; }
main a { display: inline-flex; align-items: center; min-height: 44px; min-width: 44px; color: var(--color-path); text-decoration: underline 2px; text-underline-offset: 0.2em; overflow-wrap: anywhere; }
main a:hover { text-decoration-thickness: 3px; }
:focus-visible { outline: 3px solid var(--color-path); outline-offset: 3px; border-radius: 3px; }
```
- **Menu (header).** Sticky, five boxes in a row, one per SPEC.md section, each joined to the previous by an arrow (arrows only from 48em; at 320px the five cells share the width and the lit path shows as green outlines). A footer is not needed; if the student wants one it holds a "Back to top" link only.
```html
<header class="site-header">
  <nav aria-label="Sections">
    <ul class="chain">
      <li data-i="0"><a href="#home" aria-current="location">Home</a></li>
      <li data-i="1"><span class="arrow" aria-hidden="true"><i class="packet"></i></span><a href="#about">About</a></li>
      <!-- Projects, Skills, Contact: the same shape as About, data-i 2, 3, 4. Labels are the real section names. -->
    </ul>
  </nav>
</header>
```
```css
.site-header { position: sticky; top: 0; z-index: 10; height: var(--header-h); background: var(--color-surface); border-bottom: 1px solid var(--color-text); } /* border-box: the border is inside --header-h */
.site-header nav, .chain { height: 100%; }
.chain { display: flex; justify-content: center; max-width: 46rem; margin-inline: auto; --run: 320ms; }
.chain li { position: relative; display: flex; flex: 1 1 0; align-items: center; min-width: 0; padding-inline: 1px; } /* five equal cells: 64px each at 320px */
.chain a { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 2.75rem; border-radius: 6px;
  color: var(--color-text); font: 600 0.8125rem var(--font-display); text-decoration: none; }
.chain a[aria-current="location"] { background: var(--color-tint); font-weight: 700; }
.chain a:focus-visible { outline-offset: -3px; } /* drawn inside, so the screen edge never clips it */
.chain a::before { content: ""; position: absolute; inset: 0; border: 2px solid var(--color-path); border-radius: inherit; opacity: 0; pointer-events: none; /* the lit outline */
  transition: opacity 160ms var(--ease-route) var(--lag, 0ms); }
.chain li.is-path > a::before { opacity: 1; }
.arrow { display: none; }
@media (min-width: 48em) {
  .chain { gap: var(--gap); } .chain li { flex: none; width: 5.75rem; padding: 0; }
  .chain a { border: 1.5px solid var(--color-text); background: var(--color-surface); font-size: 0.9375rem; }
  .chain a[aria-current="location"] { background: var(--color-tint); }
  .chain a::before { inset: -1.5px; } .chain a:focus-visible { outline-offset: 3px; }
  .arrow { display: block; position: absolute; right: 100%; top: calc(50% - 6px); width: var(--gap); height: 12px; --dx: calc(var(--gap) - 0.75rem);
    background: repeating-linear-gradient(to right, var(--color-rule) 0 5px, transparent 5px 9px) 0 50% / calc(100% - 7px) 2px no-repeat; }
  .arrow::before { content: ""; position: absolute; left: 0; top: 5px; width: calc(100% - 7px); height: 2px; background: var(--color-path); transform-origin: left; scale: 0 1; /* the lit line draws in */
    transition: scale 200ms var(--ease-route) var(--lag, 0ms); }
  .arrow::after { content: ""; position: absolute; right: 0; top: 0; border: solid transparent; border-width: 6px 0 6px 8px; border-left-color: var(--wire); }
  .chain li.is-path > .arrow { --wire: var(--color-path); } .chain li.is-path > .arrow::before { scale: 1; }
}
```
- **Flow.** One centred column of boxes. Between two boxes goes an arrow (`.wire`, decorative) whose label is the real name of the section it leads to. `data-i` counts the sections from 0 in page order and matches the menu; the arrow has the same `data-i` as the box after it. The first section has no arrow before it.
```html
<main class="flow">
  <section class="node node--hero" id="home" data-i="0" aria-labelledby="home-title">
    <h1 id="home-title">The student's name from SPEC.md</h1>
    <p class="intro">The one-line intro from SPEC.md.</p>
  </section>
  <div class="wire" data-i="1" aria-hidden="true"><i class="packet"></i><span class="edge-label">About</span></div>
  <section class="node" id="about" data-i="1" aria-labelledby="about-title">
    <h2 id="about-title">About</h2>
    <p>The bio from SPEC.md.</p>
  </section>
  <!-- Projects, Skills and Contact repeat the wire + section pair, data-i 2, 3, 4. -->
</main>
```
```css
.flow { width: min(100% - 1.5rem, 44rem); margin: 0 auto; padding-block: 2rem 4rem; overflow-x: clip; } /* nothing can ever scroll the page sideways */
.node { position: relative; padding: 1.5rem 1rem; background: var(--color-surface); border: 1.5px solid var(--color-text); border-radius: 8px; --run: 480ms; }
.node > * + * { margin-top: 1rem; }
.node--hero { padding-block: 2.5rem; } .intro { font-size: 1.25rem; line-height: 1.5; }
@media (min-width: 48em) { .flow { width: min(100% - 3rem, 44rem); } .node { padding: 2rem; } }
.node::before { content: ""; position: absolute; inset: -1.5px; border: 3px solid var(--color-path); border-radius: inherit; opacity: 0; pointer-events: none; /* the lit outline */
  transition: opacity 200ms var(--ease-route); }
.node.is-path::before { opacity: 1; transition-delay: calc(var(--lag, 0ms) + var(--run)); } /* lights as the packet arrives; unlighting is immediate */

.wire { position: relative; width: 0.875rem; height: var(--wire-h); margin-inline: auto; --dy: calc(var(--wire-h) - 0.75rem);
  background: repeating-linear-gradient(to bottom, var(--color-rule) 0 5px, transparent 5px 9px) 50% 0 / 2px calc(100% - 7px) no-repeat; }
.wire::before { content: ""; position: absolute; left: calc(50% - 1px); top: 0; width: 2px; height: calc(100% - 7px); background: var(--color-path); transform-origin: top; scale: 1 0;
  transition: scale 200ms var(--ease-route) var(--lag, 0ms); }
.wire::after { content: ""; position: absolute; left: calc(50% - 6px); bottom: 0; border: solid transparent; border-width: 8px 6px 0; border-top-color: var(--wire); }
.wire.is-path { --wire: var(--color-path); } .wire.is-path::before { scale: 1; }
.edge-label { position: absolute; left: calc(50% + 1rem); top: 50%; translate: 0 -50%; padding: 0 0.25rem; background: var(--color-bg); color: var(--color-muted); font: 500 0.75rem var(--font-display); }
.packet { position: absolute; top: 0; left: calc(50% - 0.375rem); width: 0.75rem; height: 0.75rem; border-radius: 50%; opacity: 0; /* invisible except in flight */
  background: var(--color-packet); border: 2px solid var(--color-surface); }
.arrow .packet { left: 0; }
```
- **Hero:** the first box. The real name large, the one-line intro under it (if SPEC.md has no separate tagline, use the "Who I am" line without the name and the comma after it, first letter capitalised, final period kept). The name comes from the "Who I am" line; the Audience and goal line never appears on the site. Fragments from SPEC.md may start with a capital letter ("third-year ..." becomes "Third-year ..."), but the words are never changed.
- **About:** the real bio as plain paragraphs, lines under 65 characters; it may be split into paragraphs at sentence boundaries, words unchanged.
- **Projects:** the box holds a heading and then one small box per real project, hanging off a rail like services off a hub (see below). A link only if SPEC.md has one for that project; link text is the label SPEC.md gives, or else the address itself.
- **Skills:** each real skill as a small outlined box with a dot on its left edge, wrapping.
- **Contact:** each real contact line starts with a small square end-point; the email may be the link text itself and must fit on one line at 320px. A link's text is the label SPEC.md gives ("GitHub") as the link itself, never "GitHub:" followed by the raw address.
```css
.services { position: relative; display: grid; gap: 1rem; margin-top: 1.5rem; padding-left: 1.75rem; }
.service { position: relative; padding: 1rem; background: var(--color-bg); border: 1.5px solid var(--color-text); border-radius: 6px; --elbow: var(--color-rule); --rail: var(--color-rule); }
.service::before { content: ""; position: absolute; right: 100%; top: -1rem; width: 1.25rem; height: 2.5rem; /* the elbow from the rail into the box */
  border-left: 2px solid var(--elbow); border-bottom: 2px solid var(--elbow); border-bottom-left-radius: 8px; }
.service:not(:last-child)::after { content: ""; position: absolute; right: calc(100% + 1.25rem - 2px); top: 1rem; bottom: -1rem; width: 2px; background: var(--rail); } /* the rail goes on to the next box, overlapping the elbow's curve */
.service > * + * { margin-top: 0.375rem; }
.skills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.skills li { display: flex; align-items: center; gap: 0.5rem; padding: 0.375rem 0.75rem; border: 1.5px solid var(--color-text); border-radius: 6px; font-weight: 500; }
.skills li::before { content: ""; width: 0.375rem; height: 0.375rem; border-radius: 50%; background: var(--color-text); }
.contact li { display: flex; align-items: center; gap: 0.75rem; }
.contact li::before { content: ""; flex: none; width: 0.5rem; height: 0.5rem; background: var(--color-text); }
.contact a { font-size: clamp(0.9375rem, 4.2vw, 1.125rem); } /* an email stays on one line at 320px */
```
```html
<ul class="services">
  <li class="service"><h3>Real Project Name</h3><p>The real description from SPEC.md.</p></li>
  <!-- Only when SPEC.md gives this project a link, add inside the same li: <p><a href="the-url-from-SPEC.md">The label from SPEC.md</a></p> -->
</ul>
```

## Make it theirs
- The one loud thing is the request path: packets and the green route. The other four moments stay small: the menu boxes lighting in turn, one packet per arrow, a thin lit outline.
- Name the boxes with the student's own vocabulary: real section names on the arrows, real project names on the service boxes. Let their projects set the details (a project with a link lights when pointed at; one without stays calm).
- Every device carries meaning: an arrow means "next section", the rail means "these belong to Projects".

## Motion character
Tempo: packets cross an arrow in 320 to 480ms and hand over to the next one 340ms later; UI moves are 160 to 240ms with `var(--ease-route)`; packets use `var(--ease-hop)`. Nothing bounces. Nothing loops: every packet run is triggered, so nothing runs while offscreen. I animate only `transform`, `translate`, `scale`, `opacity` (the individual transform properties count as transform).

Shared keyframes (used by several moments):
```css
@keyframes hop { from { translate: 0 0; } to { translate: var(--dx, 0px) var(--dy, 0px); } }   /* the packet moves along the arrow */
@keyframes blip { 0% { opacity: 0; scale: 0.5; } 12% { opacity: 1; scale: 1; } 82% { opacity: 1; scale: 1; } 100% { opacity: 0; scale: 2; } } /* appears, flies, lands with a small ring */
/* A packet flies when its arrow (or the menu item that owns the arrow) has .is-live. --lag staggers the hops. */
.chain li.is-live > .arrow .packet, .wire.is-live .packet {
  animation: hop var(--run) var(--ease-hop) var(--lag, 0ms) 1 both, blip var(--run) linear var(--lag, 0ms) 1 both;
}
```

### 5. Signature: the request path (JavaScript, declared first)
`route(index)` lights the path from Home to a section: every menu box, arrow and page box with `data-i` up to `index` gets `.is-path` (lit, green) and `.is-live` (its packet flies), one hop after another. `clearRoute()` puts everything back. All the other moments call these two functions. This block also declares the names the rest of the file shares.
```js
// ---- Shared names (declared once) ----
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const canHover = window.matchMedia('(hover: hover)');
const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.chain a')];
const menuItems = [...document.querySelectorAll('.chain li')];
const nodes = [...document.querySelectorAll('main .node')];
const wires = [...document.querySelectorAll('.wire')];
const parts = [...document.querySelectorAll('[data-i]')]; // menu items, boxes and arrows, all counted from 0 in page order
const HOP = 340;       // ms between one hop and the next
let pathTimer = 0;     // the timer that clears a held route
let pinned = -1;       // the section a jump landed on; it stays current until the visitor scrolls on their own
let pinnedSeen = false; // true once the pinned section has been on screen; before that the jump has not happened yet
let current = -1;
let ticking = false;

function clearRoute() {
  clearTimeout(pathTimer);
  parts.forEach((el) => { el.classList.remove('is-path', 'is-live'); el.style.removeProperty('--lag'); });
}
function route(index, { only = parts, hold = 0 } = {}) {
  clearRoute();
  void header.offsetWidth; // flush styles, so a packet that was already flying starts again
  only.forEach((el) => {
    const i = Number(el.dataset.i);
    if (i > index) return;
    el.style.setProperty('--lag', i * HOP + 'ms');
    el.classList.add('is-path', 'is-live');
  });
  if (hold) pathTimer = setTimeout(clearRoute, hold);
}
```
Without JavaScript the page is complete: boxes, dashed arrows and menu are all drawn, and packets stay invisible.

### 1. Page load: a request enters
The page is in the HTML at once. One request runs through the menu: the boxes light and a packet hops along each arrow from Home to the last section, then everything settles. Skipped under reduced motion.
```js
if (!reduce.matches) route(menuItems.length - 1, { only: menuItems, hold: 1800 });
```

### 2. Scroll: packets arrive
When an arrow between two boxes scrolls into view, one packet crosses it and lands on the next box. Arrows already scrolled past (a reload halfway down, a jump) stay quiet. Each arrow runs once.
```js
const arrivals = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !reduce.matches) entry.target.classList.add('is-live');
    // Also stop watching arrows already scrolled past; they never fire.
    if (entry.isIntersecting || entry.boundingClientRect.top < 0) arrivals.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -10% 0px' });
wires.forEach((wire) => {
  // Once its packet has landed, let the arrow rest (unless a lit route is holding it).
  wire.addEventListener('animationend', () => { if (!wire.classList.contains('is-path')) wire.classList.remove('is-live'); });
  arrivals.observe(wire);
});
```

### 3. Hover and focus: the path lights
Pointing at or tabbing to a menu box lights the whole path from Home to it, packets hopping along (moment 5). Leaving (or blur) puts it back; keyboard focus holds the path until the link loses focus, so it stays lit after Enter. On touch screens a tap shows the path for a moment. Project boxes with a real link do the same for their rail and elbow, in CSS only; a project without a link does nothing at all.
```js
navLinks.forEach((link, i) => {
  link.addEventListener('mouseenter', () => route(i));
  link.addEventListener('mouseleave', clearRoute);
  link.addEventListener('focus', () => { if (link.matches(':focus-visible')) route(i); });
  link.addEventListener('blur', clearRoute);
  link.addEventListener('click', () => { pin(i); if (!canHover.matches) route(i, { hold: 1600 }); });
});
```
```css
/* Only boxes that contain a real link react. The second rule lights the rail above the hovered box, so the route runs from the hub. */
.service:has(a:hover, a:focus-visible) { --elbow: var(--color-path); border-color: var(--color-path); }
.service:has(~ .service a:hover, ~ .service a:focus-visible) { --rail: var(--color-path); }
```

### 4. Navigation: the current box
The menu box of the section on screen is tinted and marked `aria-current`. The current section is the last one whose top is above the menu plus about a quarter of the screen, so short sections count; at the very bottom it is the last section. A click, a hash change or a deep link keeps the jumped-to section selected until the visitor scrolls on their own (wheel, touch, scroll keys) or that section has been on screen and leaves it. Jumps are instant.
```js
function setCurrent(index) {
  current = index;
  navLinks.forEach((link, i) => {
    // setAttribute, not toggleAttribute: aria-current="" counts as false for screen readers.
    if (i === index) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
}
// Re-pinning the same section (a click, then the hashchange it causes) must not reset pinnedSeen, or the pin never releases.
function pin(index) { if (index !== pinned) { pinned = index; pinnedSeen = false; } request(); } // request(): check again once the jump has landed
function update() {
  ticking = false;
  // Read every layout value first, then write (no layout thrash).
  const vh = window.innerHeight, line = header.offsetHeight + vh * 0.25;
  const rects = nodes.map((node) => node.getBoundingClientRect());
  const atBottom = vh + window.scrollY >= document.documentElement.scrollHeight - 2;
  let index = 0;
  rects.forEach((r, i) => { if (r.top <= line) index = i; }); // the last section whose top is above the line
  if (atBottom) index = nodes.length - 1;                      // a short last section still becomes current
  if (pinned >= 0) {
    const onScreen = rects[pinned].bottom > 0 && rects[pinned].top < vh;
    // Release only after the section has been seen and then left. Before the jump lands (a deep link, a click) it is still off screen.
    if (onScreen) pinnedSeen = true; else if (pinnedSeen) pinned = -1;
    if (pinned >= 0) index = pinned;
  }
  if (index !== current) setCurrent(index);
}
function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

window.addEventListener('scroll', request, { passive: true });
window.addEventListener('resize', request);
['wheel', 'touchmove'].forEach((name) => window.addEventListener(name, () => { pinned = -1; }, { passive: true }));
window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) pinned = -1;
});
window.addEventListener('hashchange', () => pin(nodes.findIndex((node) => '#' + node.id === location.hash)));
if (location.hash) pin(nodes.findIndex((node) => '#' + node.id === location.hash));
update();
```

## Reduced motion
Packets never fly and the lit outlines appear instantly. The JavaScript above also skips the load route and the arrival packets. Nothing is hidden by a starting state that never ends: the packets are decoration and the lit parts simply switch on.
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .packet { display: none; }
}
```

## Libraries
None. Plain CSS and JavaScript only.

## Avoid
- Invented architecture: service names (API gateway, database, cache, queue, load balancer), protocols, HTTP verbs, status codes, ports, latency, requests per second, uptime, version numbers, "healthy" or "online" lights.
- Cloud-provider icons or logos, UML clip art, sticky-note whiteboards, hand-drawn wobble.
- Curvy spaghetti arrows, arrows running through text or crossing each other, diagonal lines.
- Packets that loop forever, trails, glows or anything blinking. A packet flies a few times and rests.
- Dark blue backgrounds with cyan lines, green-on-black (Terminal, Oscilloscope), copper traces (PCB), a coloured branch line in a gutter (Git Graph).
- A third signal colour, or green and orange used as big fills.
- Fake controls or a link-style look on things that are not links; hover effects on a project without a link.
- Generic page habits: a "→" after every link, "A · B · C" strings, 01 / 02 / 03 numbering on projects, one word of a heading picked out in green, an ALL-CAPS label above every heading, the same soft-shadow card everywhere, a fade-up on every section.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
