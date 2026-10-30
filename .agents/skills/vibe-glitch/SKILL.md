---
name: vibe-glitch
description: Restyles the portfolio site as controlled digital corruption on a clean light base, with RGB channel splits and sliced text that snap back to clean (look, layout and motion). Use ONLY when the student names the vibe-glitch skill or asks for the Glitch vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: expressive
  tags: "digital-media, cs, design-art"
  intensity: expressive
  version: "2"
---

# Vibe: Glitch

## Feel and who it's for
A clean, quiet page that glitches rarely and on purpose. Long calm, then a short sharp burst: the name splits into magenta and cyan copies, a few slices slip sideways, and everything snaps back to crisp text. It should feel like a digital artist's site, not a hacker movie. Good for digital media, design and CS students who work with video, code or sound and want the site itself to show they understand the medium.

## Must keep (this is what makes it Glitch)
1. A clean light base with ink-black text. The page is calm and fully readable at every moment. The glitch is a rare event, never a texture.
2. Two channel colours, magenta and cyan, used only for the glitch copies, thin misregistered rules and link fringes. They are never text colours.
3. Motion comes in bursts: nothing moves, then a burst of one to three hard hops (a few tenths of a second), then a fast snap back to clean. No loops, no timers, no continuous noise.
4. The effect copies only the real text of the name and the section headings. Nothing glitches in paragraphs, buttons or images.
5. Everything is capped by a safety gate (see "Safety numbers"), and under reduced motion the page is completely still.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the page dark". Their request wins.

Palette, in words: cool pale grey paper; near-black ink with a blue tint; a mid ink-grey for secondary text; a deep raspberry for links (the only colour allowed on text); a slightly darker grey for header and tags; hot magenta and bright cyan as the two channel colours. Inverted option: ink screen `#0F0F14`, text `#F0F0F4`, muted `#A9ABB8`, link `#FF7DBF`, surface `#1B1B23`, same two channel colours.

```css
:root {
  --color-bg: #EEEFF1;
  --color-surface: #E1E3E9;
  --color-text: #0E0F14;      /* 16.6:1 on bg, 14.9:1 on surface */
  --color-muted: #454857;     /* 7.9:1 on bg, 7.1:1 on surface */
  --color-accent-text: #B0005A; /* links: 6.1:1 on bg, 5.5:1 on surface. Page paper on this colour (selection) is also 6.1:1 */
  --color-border: #9A9EAD;    /* hairlines only, never text */
  --ch-a: #FF2E9A;            /* magenta channel: decoration only (3.0:1 on bg), never text */
  --ch-b: #00B7DB;            /* cyan channel: decoration only (2.1:1 on bg), never text */
  --font-display: "Syne", system-ui, sans-serif;
  --font-body: "Figtree", system-ui, sans-serif;
  --snap: cubic-bezier(0.8, 0, 1, 0.5);   /* slow start, abrupt arrival: the snap back */
  --fringe: drop-shadow(-2px 0 0 var(--ch-b)) drop-shadow(2px 0 0 var(--ch-a));
  --fringe-small: drop-shadow(-1px 0 0 var(--ch-b)) drop-shadow(1px 0 0 var(--ch-a)); /* for text under about 18px, where 2px smudges */
}
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--color-bg); color: var(--color-text); font-family: var(--font-body); font-size: 1rem; line-height: 1.6; }
h1, h2, h3 { margin: 0; font-family: var(--font-display); font-weight: 800; line-height: 1.1; } /* Syne is variable, so say the weight */
.page { width: min(100% - 2rem, 62rem); margin-inline: auto; } /* 16px gutters; section padding comes from your spacing scale */
main p { max-width: 40rem; } /* lines stay under 80 characters; scoped so it never squeezes nav, grid or list items */
::selection { background: var(--color-accent-text); color: var(--color-bg); }
```
Fonts: Syne 800 for the name and headings, Figtree for everything else. Alternatives: Bricolage Grotesque or Space Grotesk for display. Do not use Archivo Black (Brutalist) or JetBrains Mono (Terminal).
`<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&family=Syne:wght@700;800&display=swap" rel="stylesheet">`
Corners stay square. No gradients, no shadows other than the thin channel lines below.

## Layout ideas
- **Header:** a slim bar (surface colour) with the student's real name as a link to `#home`, then the five real section links. No footer, or one plain "Back to top" link. On phones the header scrolls away normally and the links may wrap to a second row (each at least 44px tall). It becomes sticky only from 48rem wide.
- **Hero:** the real name very large (`clamp(2rem, 10vw, 7rem)`) with the one-line intro under it. The intro is the one-line intro from SPEC.md; if SPEC.md has no separate tagline, use the "Who I am" line without the name. Check the longest word of the name at 320px wide.
- **About:** a giant-ish section title, then the real bio at a comfortable width.
- **Projects:** one row per real project, separated by a misregistered rule (a 1px ink line with a magenta line 2px above and a cyan line 2px below). The title is a link only if SPEC.md has a link for it. Description under it.
- **Skills:** the real skills as a plain grid of words with hairline underlines.
- **Contact:** the real email and links as big plain text, one per line, with `overflow-wrap: anywhere`. Link text is the label SPEC.md gives next to the URL (for example "GitHub"), never new wording. Put them in a `<ul class="contact-list">`.
```html
<li class="project-row">
  <h3 class="row-title"><a href="https://example.com/project">Project name from SPEC.md</a></h3> <!-- no href, and no <a>, if SPEC.md has no link -->
  <p>The one-sentence description from SPEC.md.</p>
</li>
```
```css
.project-list { margin: 0; padding: 0; list-style: none; }
.project-row { padding-block: 1.5rem; }   /* use your spacing scale */
.project-row::before { content: ""; display: block; height: 1px; margin-bottom: 1.5rem; background: var(--color-text); box-shadow: 0 -2px 0 var(--ch-a), 0 2px 0 var(--ch-b); }
.row-title { font-size: clamp(1.5rem, 5vw, 2.25rem); overflow-wrap: anywhere; }
```
- The scan-offset rule is the only decoration. It is a pure CSS line with no text, so it never needs a label.

## Make it theirs
- The one loud thing is the name glitching into place. Everything else stays still and clean.
- Their own work sets the details. Project names, tools and media in SPEC.md are the text; the effect only repeats those same words. Never add words to the glitch.
- Spend the glitch on the name and the section headings only. The rule of thumb: if you have to squint to read it, the effect is too big.
- Content honesty: the decorative copies repeat exactly the real heading text, nothing else. No fake error messages, no hex dumps, no "SYSTEM FAILURE", no corrupted or scrambled text, no invented words, no status codes. The copies are `aria-hidden="true"` spans that JavaScript builds from the real text, so screen readers hear the heading once.

## Motion character
Tempo: long calm, then a burst of 240-360ms, then calm again. Easing: `steps(1, end)` hops while the slices are visible, then one fast snap (`--snap`) that collapses them to nothing. A burst has at most 3 visual changes: appear, one hop, snap. The snippets share one `script.js` (helpers first, then each moment in order) and one shared CSS block.

Shared CSS (the glitch layers, used by moments 2 and 5):
```css
.glitch { position: relative; width: fit-content; max-width: 100%; overflow-wrap: anywhere; } /* fit-content: hover glitches start on the words, not anywhere across the row */
/* Two copies sit exactly on top of the real text, clipped to nothing until a burst. Use line-height 1.05 or more so descenders stay inside the box. */
.g-copy { position: absolute; inset: 0; pointer-events: none; user-select: none; clip-path: inset(0 0 100% 0); }
.g-a { --band-1: inset(12% 0 60% 0); --band-2: inset(52% 0 30% 0); --dx-1: -0.06em; --dx-2: 0.07em; color: var(--ch-a); }
.g-b { --band-1: inset(58% 0 22% 0); --band-2: inset(10% 0 70% 0); --dx-1: 0.06em; --dx-2: -0.07em; color: var(--ch-b); }
@keyframes hop {
  0%   { clip-path: var(--band-1); transform: translateX(calc(var(--dx-1) * var(--amp, 1))); animation-timing-function: steps(1, end); }
  40%  { clip-path: var(--band-2); transform: translateX(calc(var(--dx-2) * var(--amp, 1))); animation-timing-function: steps(1, end); }
  75%  { clip-path: var(--band-2); transform: translateX(calc(var(--dx-2) * var(--amp, 1))); animation-timing-function: var(--snap); }
  100% { clip-path: inset(0 0 100% 0); transform: none; }
}
/* The class is added by JavaScript and removed when the burst ends. .burst-x .g-copy (0,2,0) beats .g-a (0,1,0), so the overrides win. */
.burst-load .g-copy  { animation: hop 360ms both; }
.burst-hover .g-copy { animation: hop 240ms both; --band-2: var(--band-1); --dx-2: var(--dx-1); }
.burst-small .g-copy { animation: hop 280ms both; --band-2: var(--band-1); --dx-2: var(--dx-1); --amp: 0.5; }
```
```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const GAP = 1200;            // ms between burst starts, shared by every burst on the page
let lastBurst = -Infinity;
const heroName = document.querySelector('.hero-name');

// Adds two aria-hidden copies of the real text. The real text itself is never changed.
function glitchify(el) {
  if (reduce || el.querySelector('.g-copy')) return;
  const text = el.textContent.trim();
  ['g-a', 'g-b'].forEach((cls) => {
    const copy = document.createElement('span');
    copy.className = 'g-copy ' + cls;
    copy.setAttribute('aria-hidden', 'true');
    copy.textContent = text;
    el.append(copy);
  });
  el.addEventListener('animationend', (e) => {
    if (e.target.classList.contains('g-copy')) el.classList.remove('burst-load', 'burst-hover', 'burst-small');
  });
}

// The safety gate. Returns false and does nothing if another burst started less than GAP ago.
function burst(el, kind) {
  const now = performance.now();
  if (reduce || !el || now - lastBurst < GAP) return false;
  lastBurst = now;
  el.classList.remove('burst-load', 'burst-hover', 'burst-small');
  void el.offsetWidth;                  // restart the animation if it was mid-way
  el.classList.add('burst-' + kind);
  return true;
}
document.querySelectorAll('.glitch').forEach(glitchify);
```

### 1. Page load: the intro scans in
The hero's intro line is revealed left to right in four hard steps right after the name starts to glitch. Pure CSS, so the text is in the HTML and shows if JavaScript fails. The clip leaves extra room above and below so descenders and focus rings are never cut.

```html
<section class="hero" id="home" aria-labelledby="home-title">
  <h1 id="home-title" class="glitch hero-name">Your Name</h1>
  <p class="hero-intro">The one-line intro from SPEC.md.</p>
</section>
```
```css
.hero-name { font-size: clamp(2rem, 10vw, 7rem); }
@keyframes scan-in { from { clip-path: inset(-0.3em 100% -0.3em 0); } to { clip-path: inset(-0.3em 0 -0.3em 0); } }
.hero-intro { margin: 1rem 0 0; font-size: 1.25rem; animation: scan-in 320ms steps(4, end) 380ms both; }
```

### 2. Scroll: each section heading slices once
When a section heading comes into view it does one small slice-and-resolve (280ms, half the sideways distance), once, then stays clean. Headings already on screen at load, or already scrolled past, stay clean. Nothing is hidden before it arrives, so there is nothing to reveal and nothing to undo.

```html
<h2 class="glitch section-title">About</h2>
```
```css
.section-title { font-size: clamp(1.875rem, 6vw, 3.5rem); }
```
```js
const titles = [...document.querySelectorAll('.section-title')];
if (!reduce && 'IntersectionObserver' in window) {
  const waiting = new Set(titles);
  const arrive = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const past = entry.boundingClientRect.top < 0;   // already scrolled past: stay clean
      if (!entry.isIntersecting && !past) return;
      waiting.delete(entry.target);
      arrive.unobserve(entry.target);
      // The name owns the first second. Headings on screen at load stay clean.
      if (entry.isIntersecting && !past && performance.now() > 1000) burst(entry.target, 'small');
    });
  }, { rootMargin: '0px 0px -20% 0px' });
  titles.forEach((title) => arrive.observe(title));
  // A short last section may never reach the trigger line: at the very bottom, glitch the last waiting heading.
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 2 || !waiting.size) return;
    const last = [...waiting].pop();
    waiting.forEach((title) => arrive.unobserve(title));
    waiting.clear();
    burst(last, 'small');
  }, { passive: true });
}
```

### 3. Hover and focus: a tiny channel split
Links get a steady 2px magenta and cyan fringe on hover and keyboard focus. It is a static state, not an animation. Only real links react; project rows and skills without a link do nothing.

```css
a { color: var(--color-accent-text); text-underline-offset: 0.2em; text-decoration-thickness: 2px; }
@media (hover: hover) { a:hover { filter: var(--fringe); } }
a:focus-visible { filter: var(--fringe); outline: 3px solid var(--color-text); outline-offset: 3px; }
.brand { display: inline-flex; align-items: center; min-height: 44px; color: var(--color-text); font-family: var(--font-display); font-weight: 800; text-decoration: none; }
.row-title a, .contact-list a { display: inline-flex; align-items: center; min-height: 44px; } /* 44px tap targets */
.row-title a { color: var(--color-text); }
```
The name in the hero also re-glitches when a mouse enters it (see moment 5). The hero heading is not focusable (headings should not be), so keyboard users get the fringe on the header name link instead.

### 4. Navigation: the current link carries a steady offset
The link for the section on screen is underlined and keeps the channel fringe on all the time. Only real section names appear. After a jump (click or `#hash`), that link stays current until the visitor scrolls on their own (wheel, touch, scroll keys) or the section leaves the screen, so a short last section is never taken over by the one before it. Jumps are instant (no smooth scrolling).

```html
<header class="site-header">
  <div class="page header-row">
    <a class="brand" href="#home">Your Name</a>
    <nav aria-label="Sections">
      <ul class="site-nav">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <!-- one li per real section in SPEC.md -->
      </ul>
    </nav>
  </div>
</header>
```
```css
.site-header { background: var(--color-surface); }
.header-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; column-gap: 1rem; }
.site-nav { display: flex; flex-wrap: wrap; margin: 0; padding: 0; list-style: none; }
.site-nav a { display: inline-flex; align-items: center; min-height: 44px; padding-inline: 0.625rem; font-size: 0.9375rem; color: var(--color-text); text-decoration: none; }
/* Steady, not animated: the current link keeps the fringe even when the mouse leaves it. */
.site-nav a[aria-current="location"] { text-decoration: underline 2px; text-underline-offset: 0.3em; filter: var(--fringe-small); }
.site-nav a:focus-visible { filter: var(--fringe-small); }
html { scroll-behavior: auto; }
main { overflow-x: clip; }                       /* the sliced copies move sideways */
section[id] { scroll-margin-top: 1rem; }
html { scroll-padding-top: 1rem; }
@media (min-width: 48rem) {
  .site-header { position: sticky; top: 0; z-index: 2; }
  section[id] { scroll-margin-top: 4.5rem; }     /* use your header's height */
  html { scroll-padding-top: 4.5rem; }           /* keeps Tab focus out from under the sticky header too */
}
```
```js
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
let locked = null;                               // { id, seen } while a jump is settling

function setCurrent(id) {
  navLinks.forEach((a) => {
    if (a.hash === '#' + id) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
}
function currentFromScroll() {
  if (window.scrollY < 8) return sections[0].id;                                                       // top: home
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) return sections[sections.length - 1].id; // bottom: last
  const line = window.innerHeight * 0.4;
  let id = sections[0].id;
  sections.forEach((s) => { if (s.getBoundingClientRect().top <= line) id = s.id; });
  return id;
}
function updateNav() {
  if (!sections.length) return;
  if (locked) {
    const box = document.getElementById(locked.id).getBoundingClientRect();   // read first
    const onScreen = box.bottom > 0 && box.top < window.innerHeight;
    if (onScreen) locked.seen = true; else if (locked.seen) locked = null;
  }
  setCurrent(locked ? locked.id : currentFromScroll());                       // then write
}
function jump(id) { if (document.getElementById(id)) { locked = { id, seen: false }; setCurrent(id); } }
function release() { locked = null; updateNav(); }

navLinks.forEach((a) => a.addEventListener('click', () => jump(a.hash.slice(1))));
window.addEventListener('hashchange', () => jump(location.hash.slice(1)));
['wheel', 'touchmove'].forEach((type) => window.addEventListener(type, release, { passive: true }));
window.addEventListener('keydown', (e) => { if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) release(); });
let ticking = false;                             // one frame per scroll burst, no loop
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { ticking = false; updateNav(); });
}, { passive: true });
window.addEventListener('resize', updateNav);
if (location.hash.length > 1) jump(location.hash.slice(1));
updateNav();
```

### 5. Signature: the headings glitch into place
On load the name splits (magenta and cyan copies on two different slices), hops once, and snaps back to clean text in 360ms. After that, the name and every section title glitch again for 240ms when a mouse enters them. All of them go through the one safety gate, so sweeping the mouse across several headings cannot stack bursts. Touch and keyboard skip the hover glitch.

```js
if (heroName) {
  if (window.scrollY < 100) {                    // not when a reload restored a scrolled page
    const start = () => burst(heroName, 'load');
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else start();
  }
}
// Every heading (the name and each section title) glitches again when a mouse enters it. They share the
// one safety gate, so sweeping the mouse down the page cannot stack bursts faster than one per GAP.
document.querySelectorAll('.glitch').forEach((heading) => {
  heading.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') burst(heading, 'hover'); });
});
```

## Safety numbers (photosensitivity)
- A burst is one appear-and-snap event. The copies stay on screen the whole burst and only hop between slices, so brightness never alternates light and dark.
- Even if every visual change counted as a flash: a burst has at most 3 changes (appear, one hop, snap) and bursts start at least 1200ms apart (`GAP`), so no one-second window holds more than 3.
- Burst lengths: 360ms (load), 240ms (hover), 280ms (section). No timers, no loops: every burst follows a page load, a scroll arrival or a mouse entering the name.
- Maximum area: the box of one heading. Each copy shows a band at most 28% of that box's height and only its glyph pixels, so the changing area is a small fraction of the hero and far below a full-screen flash.
- Colours: magenta `#FF2E9A` is about 56% red (the red-flash limit is 80%), and no copy is a large solid fill.
- Link fringes and the nav offset are 2px static colour edges, not flashes.
- Because nothing recurs on its own, no "reduce effects" toggle is needed. If the student asks for any recurring effect, add a visible toggle and keep it under these numbers.

## Reduced motion
`glitchify` and `burst` do nothing under reduced motion, so no copies exist. The CSS block also covers the case where the setting changes while the page is open, and undoes the intro's hidden start (it comes from the animation alone).

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .g-copy { display: none; }
}
```

## Performance
Only two spans per heading and only on the name and section headings. Animated properties are `clip-path` and `transform`; `filter` is static. Scroll work is one rAF per scroll burst and the page has no loop that runs on its own. Always keep `will-change` off, because the copies are idle almost all the time. No libraries.

## Libraries
None. Plain CSS and JavaScript do everything here, and a library (GSAP, a glitch package, canvas noise) would add weight and risk for a few lines of `clip-path`.

## Avoid
- Anything that loops, flickers or repeats on a timer, and any burst longer than about 400ms.
- Full-screen flashes, scanline or noise overlays, static or CRT texture, saturated red, and glitching paragraphs or images.
- Fake system text: error messages, hex dumps, "SYSTEM FAILURE", corrupted or scrambled letters, invented words, status codes.
- Hacker-movie looks: green on black, monospace everywhere, terminal prompts (that is the Terminal vibe), or yellow slabs and thick black borders (that is Brutalist).
- Animating `text-shadow`, `background-position` or `mix-blend-mode`. Stay with `transform`, `opacity`, `clip-path` and `filter`.
- Channel colours on text, or accent colour on small text beyond the stated link colour.
- Generic page habits: a "→" after every link, "A · B · C" strings, 01 / 02 / 03 numbering, one word of a headline picked out in the accent, an ALL-CAPS label above every heading, a fade-up on every section, the same rounded card with a soft shadow everywhere.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
