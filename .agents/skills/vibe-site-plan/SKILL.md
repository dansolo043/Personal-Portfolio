---
name: vibe-site-plan
description: Restyles the portfolio site as a civil engineering drawing set, with a plan sheet, gridlines, ground-line hatching and section-cut markers that wipe each project into view (look, layout and motion). Use ONLY when the student names the vibe-site-plan skill or asks for the Site Plan vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: major
  tags: "civil, engineering"
  intensity: standard
  version: "2"
---

# Vibe: Site Plan

## Feel and who it's for
The portfolio feels like a sheet from a civil construction drawing set: a pale plan sheet, graphite linework in heavy and hairline weights, faint gridlines, a north arrow, ground lines with hatching under each heading, and section-cut markers (A-A, B-B) that slide across a project and reveal its section. Everything is heavy and exact, like survey and structural work: it moves slowly, stops dead and never bounces. Good for civil engineering students who want a recruiter to see "this person works carefully and checks their numbers".

## Must keep (this is what makes it Site Plan)
1. A pale neutral plan sheet, graphite linework and ONE ink colour besides it: a violet "diazo print" accent for links, the current section and the section-cut line. Not blueprint blue (that is Blueprint), not a cool grey CAD workspace, not a stone-and-contour map.
2. Line weights carry the design: 3px heavy rules (ground lines, hero rule), 2px frames (header, plans, legend), 1px hairlines (gridlines, dividers). Hatching (diagonal, cross, dots, horizontal) is the only fill pattern.
3. Each section heading sits on a ground line with hatching below it, like the earth under a building in a section drawing.
4. Each project is a bordered plan with a section-cut marker. Its description is the "section", wiped into view along the cut.
5. Motion is heavy: 600-800ms, one easing, starts slow, stops firm, no overshoot. Things travel along one axis. Nothing bounces, springs, wobbles or floats.

## Starting defaults (change freely)
The student can say "make the accent green" or "use a darker sheet". Their request wins.

Palette, in words: pale plan-sheet grey, white panels, graphite ink, a mid graphite for secondary text, one violet for links and cut lines, a graphite for heavy rules, a light grey for hairlines and a lighter one for gridlines.

```css
:root {
  /* Contrast, computed (WCAG), on bg #F1F1EE / surface #FFFFFF: text 14.6 / 16.6, muted 7.7 / 8.7,
     accent 8.3 / 9.4, line 11.3 / 12.8. White text on the accent fill 9.4. Hairline (1.8) and grid are decoration only, never text. */
  --color-bg: #F1F1EE;
  --color-surface: #FFFFFF;
  --color-text: #1B1F23;
  --color-muted: #464C53;
  --color-accent: #5A2A9A;
  --color-line: #2E3338;   /* heavy rules, plan borders, hatching */
  --color-hair: #B4B7BA;   /* hairlines */
  --color-grid: #DADBD8;   /* gridlines */
  --font-body: "Overpass", system-ui, sans-serif;
  --font-mono: "Overpass Mono", ui-monospace, monospace;
  --ease-settle: cubic-bezier(0.83, 0, 0.17, 1); /* slow start, firm stop, no overshoot */
  --dur: 700ms;     /* wipes, rules, page load */
  --dur-ui: 600ms;  /* hover and nav bars */
  --header-h: 3.5rem; /* header height: 54px of links plus its 2px border (border-box) */
  --hatch-earth: repeating-linear-gradient(135deg, var(--color-line) 0 1px, transparent 1px 6px);
  --hatch-flat: repeating-linear-gradient(0deg, var(--color-line) 0 1px, transparent 1px 5px);
  --hatch-cross: repeating-linear-gradient(45deg, var(--color-line) 0 1px, transparent 1px 7px), repeating-linear-gradient(135deg, var(--color-line) 0 1px, transparent 1px 7px);
  --hatch-dots: radial-gradient(circle, var(--color-line) 0.9px, transparent 1.3px) 0 0 / 6px 6px;
}
```
Fonts: Overpass for everything (a highway-signage face, the lettering of road drawings) and Overpass Mono for small labels. Alternatives: Sofia Sans with DM Mono. Do not use the IBM Plex pair (Blueprint) or Barlow (CAD).
`<link href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;800&family=Overpass+Mono:wght@500;700&display=swap" rel="stylesheet">`

Base CSS, first in `styles.css` (swap the rem numbers in this file for your spacing scale):
```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: var(--header-h); } /* the only jump offset: no scroll-margin-top anywhere */
body { margin: 0; background: var(--color-bg); color: var(--color-text); font: 400 1.0625rem/1.6 var(--font-body); }
main { overflow-x: clip; } /* the cut line and bubbles travel sideways */
main > section { max-width: 64rem; margin-inline: auto; padding: 3.5rem 1rem; }
h1, h2, h3 { margin: 0; font-family: var(--font-body); font-weight: 800; line-height: 1.1; overflow-wrap: anywhere; }
h1 { font-size: clamp(2.5rem, 12vw, 5rem); }
h2 { font-size: 2rem; }
h3 { font-size: 1.375rem; }
p { margin: 0 0 1rem; max-width: 62ch; }
ul { margin: 0; padding: 0; list-style: none; }
::selection { background: var(--color-accent); color: var(--color-surface); }
:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 3px; }

/* Links: 44px tall, an underline at rest, a heavy bar that draws on hover and focus (moment 3). */
.text-link { position: relative; display: inline-flex; align-items: center; min-height: 2.75rem; color: var(--color-accent); font-weight: 600; overflow-wrap: anywhere; text-underline-offset: 0.25em; }
```

## Layout ideas
- **Head:** `<!doctype html><html lang="en">`, then in `<head>`: `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<title>` with the student's name from SPEC.md, the two Google Fonts `preconnect` links (`fonts.googleapis.com`, and `fonts.gstatic.com` with `crossorigin`; both are allowed), the fonts link above, `<link rel="stylesheet" href="styles.css">` and `<script src="script.js" defer></script>`.
- **Header:** a sticky title-block bar, exactly `--header-h` tall with its border inside (border-box). A name cell on the left (hidden on phones, the hero already has it) and the nav as equal cells, one per real section. The 5 links share the width at 320px with a smaller font and no side padding, so nothing wraps or scrolls.
- **Hero:** a ruled area with faint gridlines drawn behind it (the same width as the heavy rule, so both line up with the text), a north arrow in the corner, the real name large and the one-line intro under it, closed by a heavy rule. The intro is the one-line intro from SPEC.md; if SPEC.md has no separate tagline, take the "Who I am" line, drop the name and capitalise the rest ("Name, second-year Program student at Place." becomes "Second-year Program student at Place.").
- **About:** the real bio as plain paragraphs under a ground-line heading.
- **Projects:** one bordered plan per real project (title, section-cut tag A-A, B-B... by project order). Under it the description is the section; a link only if SPEC.md has one. Its text is the label SPEC.md gives next to the URL, else the address itself; never invent wording. One column on phones, two from 48em, three from 60em with three or more projects (with two or four, stay at two).
- **Skills:** a legend: a bordered grid of the real skills, each with a small hatch swatch (diagonal, cross, dots, flat, then the cycle repeats). Swatches carry no meaning, so they are CSS only.
- **Contact:** a plain list of the real links divided by hairlines: the email address as its own text, other links by the label SPEC.md gives (LinkedIn), never a bare `https://` string when a label exists.
- **Footer:** nothing, or one "Back to top" link. No year, no slogan, no stamp.
- Title-block style labels (the cut tags, the north arrow's N) are decoration: `aria-hidden="true"`, and they mirror real section or project order. No project numbers, scales, dates, coordinates, loads or revision stamps. Every section keeps a real `<h2>`.

Page skeleton (sections you have content for; each has `id`, `aria-labelledby` and a direct-child `<h2>`):
```html
<header class="site-header">
  <a class="brand" href="#home">Name from SPEC.md</a>
  <nav class="site-nav" aria-label="Sections"><ul>
    <li><a href="#home">Home</a></li> <li><a href="#about">About</a></li> <li><a href="#projects">Projects</a></li>
    <li><a href="#skills">Skills</a></li> <li><a href="#contact">Contact</a></li>
  </ul></nav>
</header>
<main>
  <section class="hero" id="home" aria-labelledby="home-title">
    <svg class="north" viewBox="0 0 48 52" aria-hidden="true" focusable="false"><text x="24" y="9" text-anchor="middle" font-size="10" font-weight="700" font-family="Overpass Mono, monospace" fill="currentColor">N</text><circle cx="24" cy="32" r="17" fill="none" stroke="currentColor" stroke-width="2"/><path d="M24 13 L24 36 L17 41 Z" fill="currentColor"/><path d="M24 13 L31 41 L24 36" fill="none" stroke="currentColor" stroke-width="2"/></svg>
    <h1 id="home-title" class="hero-name">Name from SPEC.md</h1>
    <p class="hero-intro">The one-line intro from SPEC.md.</p>
  </section>
  <section id="about" aria-labelledby="about-title"><h2 id="about-title">About</h2><p>The real bio from SPEC.md; split it into short paragraphs at sentence boundaries if it is long.</p></section>
  <section id="projects" aria-labelledby="projects-title">
    <h2 id="projects-title">Projects</h2>
    <div class="plans">
      <article class="plan"> <!-- one per real project -->
        <header class="plan-head"><span class="cut-tag" aria-hidden="true">A–A</span><h3>Project title</h3></header>
        <div class="cut">
          <div class="cut-body"><p>The project's real description from SPEC.md.</p><!-- <a class="text-link" href="…">label from SPEC.md, only if it has a link</a> --></div>
          <span class="cut-line" data-cut="A" aria-hidden="true"></span>
        </div>
      </article>
    </div>
  </section>
  <section id="skills" aria-labelledby="skills-title"><h2 id="skills-title">Skills</h2><ul class="legend"><li>A real skill</li></ul></section>
  <section id="contact" aria-labelledby="contact-title"><h2 id="contact-title">Contact</h2>
    <ul class="notes"><li><a class="text-link" href="mailto:address-from-SPEC">address-from-SPEC</a></li></ul></section>
</main>
<footer class="site-footer"><a class="text-link" href="#home">Back to top</a></footer>
```
Layout CSS, second in `styles.css`:
```css
.site-header { position: sticky; top: 0; z-index: 10; display: flex; align-items: stretch; height: var(--header-h); background: var(--color-surface); border-bottom: 2px solid var(--color-line); }
.brand { display: none; align-items: center; padding-inline: 1rem; border-right: 1px solid var(--color-hair); color: var(--color-text); font-weight: 800; text-decoration: none; }
.site-nav { flex: 1; }
.site-nav ul { display: flex; height: 100%; }
.site-nav li { flex: 1 1 0; min-width: 0; }
.site-nav li + li { border-left: 1px solid var(--color-hair); }
.site-nav a { position: relative; display: flex; align-items: center; justify-content: center; height: 100%; padding-inline: 0.25rem; color: var(--color-text); font-size: 0.8125rem; font-weight: 600; text-decoration: none; }
.site-nav a:focus-visible, .brand:focus-visible { outline-offset: -5px; } /* inside the bar, so the screen edge never clips it */
@media (min-width: 48em) {
  .brand { display: flex; }
  .site-nav { flex: 0 1 32rem; margin-left: auto; }
  .site-nav a { font-size: 1rem; }
}

.hero { position: relative; isolation: isolate; padding-top: 5.5rem; padding-bottom: 4rem; }
.hero::before { content: ""; position: absolute; inset: 0 1rem; z-index: -1; background: repeating-linear-gradient(90deg, var(--color-grid) 0 1px, transparent 1px 4rem); }
.hero::after { content: ""; position: absolute; inset: auto 1rem 0 1rem; height: 3px; background: var(--color-line); transform-origin: left; }
.north { position: absolute; top: 1.25rem; right: 1rem; width: 3rem; height: 3.25rem; color: var(--color-line); }
.hero-intro { margin-top: 1rem; font-size: 1.25rem; }

h2 { position: relative; padding-bottom: 0.5rem; margin-bottom: 1.75rem; }
h2::after { content: ""; position: absolute; inset: auto 0 0 0; height: 3px; background: var(--color-line); transform-origin: left; } /* the ground line */
h2::before { content: ""; position: absolute; inset: 100% 0 auto 0; height: 0.75rem; background: var(--hatch-earth); } /* the earth below it */

.plans { display: grid; gap: 1.5rem; }
.plan:last-child:nth-child(odd) { grid-column: 1 / -1; } /* an odd last plan spans both columns */
@media (min-width: 48em) { .plans { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 60em) { .plans { grid-template-columns: repeat(3, 1fr); } .plan:last-child:nth-child(odd) { grid-column: auto; } }
.plan { display: flex; flex-direction: column; background: var(--color-surface); border: 2px solid var(--color-line); }
.plan-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem 1rem; }
.cut-tag { flex: none; padding: 0.1rem 0.55rem; border: 2px solid var(--color-accent); border-radius: 999px; color: var(--color-accent); font: 700 0.8125rem var(--font-mono); }
.cut { position: relative; flex: 1; } /* equal-height plans: the section fills the rest, so the hatch sits at the bottom of every card */
.cut-body { position: relative; height: 100%; padding: 1rem 1rem 1.75rem; border-top: 1px solid var(--color-hair); }
.cut-body p:last-child { margin-bottom: 0; }
.cut-body::after { content: ""; position: absolute; inset: auto 0 0 0; height: 0.5rem; background: var(--hatch-earth); } /* hatch under the section */

.legend { display: grid; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); border: 2px solid var(--color-line); overflow: clip; background: var(--hatch-earth); } /* the hatch shows in unused cells of the last row */
.legend li { display: flex; align-items: center; gap: 0.875rem; min-height: 3rem; margin: 0 -1px -1px 0; padding: 0.5rem 1rem; border: 1px solid var(--color-hair); background: var(--color-surface); } /* negative margins merge the borders into one hairline grid */
.legend li::before { content: ""; flex: none; width: 2.5rem; height: 1.5rem; border: 1px solid var(--color-line); background: var(--hatch-earth); }
.legend li:nth-child(5n + 2)::before { background: var(--hatch-cross); }
.legend li:nth-child(5n + 3)::before { background: var(--hatch-dots); }
.legend li:nth-child(5n + 4)::before { background: var(--hatch-flat); }

.notes li { border-top: 1px solid var(--color-hair); }
.notes li:last-child { border-bottom: 1px solid var(--color-hair); }
.site-footer { max-width: 64rem; margin-inline: auto; padding: 0 1rem 3rem; }
```
Build order: `styles.css` is the base block, the layout block, then the shared keyframes (below), then the moment CSS in order 1 to 5, then Reduced motion last. `script.js` is one file in this order: block A (shared names), B (reveal), C (scroll update and nav spy), D (jump and landing). Shared names are declared once, in A.

## Make it theirs
- The one loud thing is the section-cut wipe on the projects. Everything else is quiet: hairlines, hatching and one heavy rule per section. No shadows, no gradients except the hatch patterns.
- The student's own work sets the details. Project titles are the real ones; skills are the legend rows. If SPEC.md names a real material, site or method (balsa, a courtyard, a parking lot, a total station), it can appear only in its real description, never as an invented label or dimension.
- Cut letters are item letters in project order (A, B, C), like real section markers. They are the only lettering added beyond SPEC.md.

## Motion character
Tempo: heavy and slow, 600-800ms. Easing: always `var(--ease-settle)`: it starts slowly like a loaded machine, travels, and stops firm with no overshoot. One axis at a time (a rule grows sideways, a wipe runs left to right, text rises a short way). Never bounce, wobble, rotate, glow or float. Only `transform`, `opacity` and `clip-path` are animated; JS may set classes only.

Shared keyframes, third block in `styles.css` (used by several moments):
```css
@keyframes wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes rule-in { from { transform: scaleX(0); } }
@keyframes settle { from { transform: translateY(1.5rem); opacity: 0; } }
@keyframes cut-run { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes cut-fade { from { opacity: 1; } to { opacity: 0; } }
```

### 1. Page load: the sheet sets
The gridlines wipe across, the heavy rule draws, then the name and intro rise a short way and settle. Pure CSS, so the text is in the HTML and shows if JavaScript fails.
(`.hero::before` and `::after` appear again here on purpose: the layout block draws them, this block only adds the animation.)
```css
.hero::before { animation: wipe calc(var(--dur) + 100ms) var(--ease-settle) both; }
.hero::after { animation: rule-in var(--dur) var(--ease-settle) 250ms both; }
.hero-name { animation: settle var(--dur) var(--ease-settle) 100ms both; }
.hero-intro { animation: settle var(--dur) var(--ease-settle) 250ms both; }
```

### 2. Scroll: ground lines draw
When a section comes on screen, its ground line draws from the left and the hatching wipes in under it, once. The hiding classes are added by JavaScript, so without it everything is simply visible. Hidden things use `opacity` or clip only, so screen readers and Tab still reach them; anything focused reveals its section.
```css
.will-draw > h2::after { transform: scaleX(0); transition: transform var(--dur) var(--ease-settle); }
.will-draw > h2::before { clip-path: inset(0 100% 0 0); transition: clip-path var(--dur) var(--ease-settle) 150ms; }
.will-draw.is-drawn > h2::after { transform: none; } /* two classes, so these beat the hidden rules above */
.will-draw.is-drawn > h2::before { clip-path: inset(0 0 0 0); }
```
`script.js` blocks A and B:
```js
/* A. Shared names: declared once, used by every block below. */
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('.site-header');
const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
let jumpedTo = '';
let jumpSeen = false;

/* B. Reveal: sections draw their ground line, plans run their cut. */
function reveal(el) {
  el.classList.add(el.matches('.plan') ? 'is-cut' : 'is-drawn');
}
if (!calm) {
  const reveals = Array.from(document.querySelectorAll('main section[id]:not(#home), .plan'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also reveal anything already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        reveal(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -15% 0px' });
  reveals.forEach((el) => {
    el.classList.add(el.matches('.plan') ? 'will-cut' : 'will-draw');
    io.observe(el);
  });
  // Keyboard users: Tab landing inside a plan or section reveals it at once.
  document.addEventListener('focusin', (event) => {
    [event.target.closest('.plan'), event.target.closest('main section[id]')].forEach((el) => { if (el) reveal(el); });
  });
}
```

### 3. Hover and focus: the heavy bar
Links draw a 3px bar under themselves from the left, and nav cells draw theirs along the bottom. Colour changes are instant (only transform is animated). A plan or card with no link does nothing on hover: never invent a link to make it react.
```css
.text-link::after { content: ""; position: absolute; inset: auto 0 0.45rem 0; height: 3px; background: var(--color-accent); transform: scaleX(0); transform-origin: left; transition: transform var(--dur-ui) var(--ease-settle); }
.text-link:hover::after, .text-link:focus-visible::after { transform: scaleX(1); }
.text-link:hover { color: var(--color-text); }
.site-nav a::after { content: ""; position: absolute; inset: auto 0 0 0; height: 4px; background: var(--color-accent); transform: scaleX(0); transform-origin: left; transition: transform var(--dur-ui) var(--ease-settle); } /* always violet, so a bar leaving never flashes another colour */
.site-nav a:hover::after, .site-nav a[aria-current]::after { transform: scaleX(1); }
.site-nav a[aria-current] { color: var(--color-accent); } /* current = violet text as well as the bar */
```

### 4. Navigation: the current cell, ground line landing
The nav cell for the section you are in carries the violet bar. A jump scrolls smoothly, then the heading's hatching wipes in again as a "you are here" mark. The jumped-to link stays current until you scroll on your own; a short last section cannot steal the highlight.
```css
.is-landing > h2::before { animation: wipe var(--dur) var(--ease-settle) both; } /* an animation beats the transition rules above, whatever their specificity */
```
`script.js` blocks C and D:
```js
/* C. One scroll update, throttled with rAF: reads first, then writes. It runs per scroll event, so nothing loops when idle. */
let queued = false;
function onScroll() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(update);
}
function select(id) {
  navLinks.forEach((link) => {
    // setAttribute, not toggleAttribute: aria-current="" counts as false for screen readers.
    if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function update() {
  queued = false;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  const line = header.offsetHeight + window.innerHeight * 0.3;
  const tops = sections.map((section) => section.getBoundingClientRect().top);
  let id = sections[0].id;
  tops.forEach((top, i) => { if (top <= line) id = sections[i].id; }); // the last section whose top is above the line
  if (atBottom) id = sections[sections.length - 1].id;
  if (jumpedTo) { // a scrollbar drag: release once the target was on screen and has left it
    const box = document.getElementById(jumpedTo).getBoundingClientRect();
    if (box.bottom > 0 && box.top < window.innerHeight) jumpSeen = true;
    else if (jumpSeen) jumpedTo = '';
  }
  select(jumpedTo || id);
  if (atBottom) document.querySelectorAll('.will-draw:not(.is-drawn), .will-cut:not(.is-cut)').forEach(reveal);
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
update();
function release() { jumpedTo = ''; }
['wheel', 'touchmove'].forEach((name) => window.addEventListener(name, release, { passive: true }));
window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) release();
});

/* D. Jumps: hold the selection and replay the heading's hatching. */
function land(target) {
  if (calm || target.id === 'home') return;
  reveal(target);
  target.classList.remove('is-landing');
  void target.offsetWidth; // restart the animation if it is already running
  target.classList.add('is-landing');
  target.addEventListener('animationend', function done(event) {
    if (!event.target.matches('h2')) return; // plans animate too; only the heading ends the landing
    target.classList.remove('is-landing');
    target.removeEventListener('animationend', done);
  });
}
function jump(target) {
  jumpedTo = target.id;
  jumpSeen = false;
  select(target.id);
  land(target);
}
document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', () => {
  const target = link.hash.length > 1 && document.getElementById(link.hash.slice(1));
  if (target && sections.includes(target)) jump(target);
}));
window.addEventListener('hashchange', () => { // browser back and forward
  const target = document.getElementById(location.hash.slice(1));
  if (target && sections.includes(target) && jumpedTo !== target.id) jump(target);
});
```

### 5. Signature: the section cut
Each project is a plan. When it comes on screen, a dash-dot violet cut line with a lettered bubble at each end runs left to right across it, and the description (the "section") is revealed exactly behind the line by `clip-path`, so the cut edge and the visible edge are the same. The line then fades, leaving the hatched section. The plan title and tag are always visible; only the description wipes. Letters follow project order, matching the `data-cut` and the tag.
```css
.cut-line { position: absolute; inset: 0; opacity: 0; pointer-events: none; background: repeating-linear-gradient(180deg, var(--color-accent) 0 12px, transparent 12px 16px, var(--color-accent) 16px 18px, transparent 18px 22px) right top / 3px 100% no-repeat; }
.cut-line::before, .cut-line::after { content: attr(data-cut); position: absolute; right: 0; display: grid; place-items: center; width: 1.5rem; height: 1.5rem; border-radius: 50%; background: var(--color-accent); color: var(--color-surface); font: 700 0.75rem var(--font-mono); }
.cut-line::before { top: 0; transform: translate(50%, -50%); }
.cut-line::after { bottom: 0; transform: translate(50%, 50%); }

.will-cut .cut-body { clip-path: inset(0 100% 0 0); }
/* The line is as wide as the body and starts one body-width to the left, so its right edge moves exactly with the clip edge. */
.will-cut.is-cut .cut-body { animation: wipe var(--dur) var(--ease-settle) both; }
.will-cut.is-cut .cut-line { animation: cut-run var(--dur) var(--ease-settle) both, cut-fade 200ms linear calc(var(--dur) - 200ms) both; }
```
Give `.plan-head` at least 0.875rem bottom padding (it does) so the top bubble never covers the title. With two or four projects drop the 60em rule.

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .will-draw > h2::after { transform: none; }
  .will-draw > h2::before, .will-cut .cut-body { clip-path: none; }
  .cut-line { display: none; }
}
```
Everything is visible and in place. The nav still marks the current cell, but instantly. The script also skips adding the hiding classes.

## Libraries
None. Plain CSS and JavaScript only.

## Avoid
- Invented project numbers, sheet numbers, scales, dates, coordinates, elevations, loads, dimensions, stamps, revision clouds or drawing titles. Decoration is lines and hatching; text comes from SPEC.md.
- Blueprint blue paper with white lines, a cool grey CAD workspace with selection blue, or contour-map taupe. Those are other vibes.
- Bounce, spring, overshoot, wobble, spin, floating or fast snappy motion. Nothing under about 600ms except instant colour changes.
- Hiding content until JavaScript runs, or hiding with `visibility: hidden` or `display: none`.
- A hover or lift on plans that have no link. Pretend toolbars, scale bars or layer panels that do nothing.
- Real software names or logos, and a second accent colour.
- Generic page habits: a "→" after every link, "A · B · C" meta strings, 01 / 02 / 03 numbering, one headline word in the accent, an ALL-CAPS eyebrow above every heading, the same rounded card with a soft shadow everywhere, a fade-up on every section.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
