---
name: vibe-brutalist
description: Restyles the portfolio site as raw web brutalism, with thick rules, oversized type, hard edges, instant invert and one pausable marquee band (look, layout and motion). Use ONLY when the student names the vibe-brutalist skill or asks for the Brutalist vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: generic
  tags: "design-art, cs"
  intensity: standard
  version: "2"
---

# Vibe: Brutalist

## Feel and who it's for
Web brutalism done with conviction: the page shows its own structure. Thick black rules mark every section, headings are far too big on purpose, corners are square, shadows are hard offsets and nothing eases anywhere. It is loud and honest, never sloppy: everything still lines up and is easy to read. Good for design, art and CS students who want a site with a point of view instead of a template.

## Must keep (this is what makes it Brutalist)
1. Stark white paper, pure black ink, and ONE loud flat colour (hazard yellow) spent on one thing: the marquee band. No gradients, no tints, no second accent.
2. Thick black rules (at least 4px, heavier between sections), square corners (`border-radius: 0`) and shadows that are hard offsets with no blur.
3. The structure is visible: every landmark is ruled, lists stay real lists, links stay underlined until you touch them.
4. Collisions of scale: giant display type next to plain, calm body text. The big words are the page's real words (name, section titles, project names).
5. Motion is hard cuts. No easing curve and no `transition` anywhere. Whole blocks jump, offset or invert. The marquee is the only continuous motion and it can be stopped.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the band orange". Their request wins.

Palette, in words: white paper, black ink, a dark grey for secondary text, a flat concrete grey for panels, and hazard yellow used only as a fill with black text on it, never as text on white (it is 1.27:1 there). Inverted blocks swap to a black screen with white text.

```css
:root {
  /* Contrast (WCAG, computed). Text #000 on bg 21:1, on surface 16.2:1, on accent 16.6:1. Muted #404040 on bg 10.4:1,
     on surface 8.0:1, on accent 8.2:1. Inverted: #FFF on #000 21:1, muted #CFCFCF on #000 13.5:1, on #1C1C1C 10.9:1. */
  --color-bg: #FFFFFF;
  --color-surface: #E2E2E2;
  --color-text: #000000;
  --color-muted: #404040;
  --color-accent: #FFE600; /* a FILL only. Its edges are black rules because yellow on white is 1.27:1 */
  --color-border: #000000;
  --ring: #000000;          /* focus ring colour; white inside inverted blocks */
  --font-display: "Archivo Black", Impact, sans-serif;
  --font-body: "Work Sans", Arial, sans-serif;
  --rule: 4px; --slam: 5vw; /* thick rule (section breaks use double); how far a block jumps in from the side */
  --header-h: 52px;         /* sticky header height on wide screens, for scroll-margin */
}
body { font-family: var(--font-body); background: var(--color-bg); color: var(--color-text); }
/* Swapping the tokens inverts a whole block, and every link and muted line inside follows. */
.inverted {
  --color-bg: #000000; --color-surface: #1C1C1C; --color-text: #FFFFFF;
  --color-muted: #CFCFCF; --color-border: #FFFFFF; --ring: #FFFFFF;
  background: var(--color-bg); color: var(--color-text);
}
::selection { background: var(--color-accent); color: #000000; }
```
Other palettes that still feel Brutalist: hazard orange band `#FF6A00` with black text (7.3:1), or link blue band `#0A28FF` with white text (7.6:1; set the band text to white). On a grey concrete page (`#D4D4D0`) black text is 14.1:1 and `#333333` muted text is 8.5:1. Never use orange or blue as small text on white without computing the ratio.

Fonts: Archivo Black for headings, Work Sans for body. Alternatives: Anton for tall condensed headings, Space Grotesk bold for a drier look. Do not use Inter on everything.
`<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Work+Sans:wght@400;600&display=swap" rel="stylesheet">`

Spacing and sizes are your call. Corners stay exactly square.

## Layout ideas
- **Header:** a ruled strip of nav cells (the real section names), each at least 44px tall. On phones it is a normal, non-sticky header that wraps onto a second row at 320px, so 5 links never overflow. From 48rem up it becomes `position: sticky; top: 0` in one row. A sticky header sits in the page flow, so no `body` padding is needed.
- **Hero:** the real name set as large as fits, tight line height, one word per line is fine. The one-line intro sits in its own bordered box under it. Size the name so the longest word fits at 320px (lower the `vw` value if it does not).
- **About:** the real bio in a plain paragraph block, about 60 characters wide, between two heavy rules, under a giant section title.
- **Projects:** hard-edged tiles with thick borders and a hard offset shadow. At wide sizes the grid is asymmetric (the first tile spans more columns). Each tile holds the real project name, its description, and a link only if SPEC.md has one.
- **Skills:** the marquee band, full width, in hazard yellow between heavy black rules. It carries the real skills. `main` has no side padding of its own: each section pads itself, so the band can run edge to edge.
- **Contact:** an inverted black block with the real links set huge. Show a link only if SPEC.md has it. Long emails wrap with `overflow-wrap: anywhere`.
- **Footer:** SPEC.md usually has nothing for it. Leave it out, or put only a plain "Back to top" link there. No year, no slogan.
- Headings never overlap links or paragraphs. Keep a gutter at least as wide as the card shadow so it does not cause sideways scroll.

Sections pad themselves, so their rules run edge to edge. The band is the exception: its head is padded, its marquee is not. Archivo Black has a single weight, so every heading that uses it sets `font-weight: 400`; otherwise the browser fakes a bold.

```css
main > section { padding: 2rem 1rem; border-bottom: calc(var(--rule) * 2) solid var(--color-border); }
main > section.band { padding-inline: 0; }
.band-head { padding-inline: 1rem; }
main h2 { font-family: var(--font-display); font-weight: 400; font-size: clamp(2.75rem, 16vw, 9rem); line-height: 0.95; margin: 0 0 1rem; overflow-wrap: anywhere; }
```

## Make it theirs
- The one loud thing is the marquee band. Everything else stays blunt but quiet: black, white, rules. No stickers, no extra colours, no decoration that carries no information.
- The band repeats the student's real skills from SPEC.md. If SPEC.md has no skills, repeat their real name instead. Never add words to it.
- Project names are the artwork: as big as they fit, exactly as written in SPEC.md. Clear type scale with big jumps between name, section titles and body (at least 16px, lines under 80 characters).

## Motion character
Tempo: instant, with each block taking about 200ms to land. Easing: none. No `transition` and no easing curve; `animation-timing-function: steps(1)` makes things hold, then jump. The marquee uses `linear`, which is also no easing. Blocks do not glide: they appear, sit offset for a beat, then jump into place or swap colours.

How this differs from Terminal (which also uses `steps()`): Terminal prints small things line by line, in sequence, like output. Brutalist slams WHOLE blocks at once (a section, a tile, the hero name), sideways, and inverts colours. Never stagger children one after another, never type, never blink a cursor.

The snippets share one `script.js`. Put the helpers first, then each moment in order.

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
```
```css
main { overflow-x: clip; } /* sideways jumps and the marquee never cause sideways scroll (clip, not hidden) */
html { scroll-behavior: auto; } /* jumps stay instant */
@keyframes slam {
  /* With steps(1) each stretch holds its start values: hidden, then offset, then in place. */
  0%   { opacity: 0; transform: translateX(var(--slam-x, 0px)); }
  25%  { opacity: 1; transform: translateX(var(--slam-x, 0px)); }
  100% { opacity: 1; transform: none; }
}
```

### 1. Page load: the hero slams in
The name jumps in from the left, then the intro box from the right as a black block that cuts away to show the text. About half a second in total. Pure CSS, so the text is in the HTML from the start and shows if JavaScript fails.

```html
<section class="hero" id="home" aria-labelledby="home-title">
  <h1 id="home-title" class="hero-name">Name from SPEC.md</h1>
  <p class="hero-intro">The one-line intro from SPEC.md.</p>
</section>
```
```css
.hero { border-bottom: calc(var(--rule) * 2) solid var(--color-border); }
.hero-name { --slam-x: calc(var(--slam) * -1); font-family: var(--font-display); font-weight: 400; font-size: clamp(2.75rem, 20vw, 14rem); line-height: 0.9; overflow-wrap: anywhere; animation: slam 200ms steps(1) backwards; }
.hero-intro { --slam-x: var(--slam); position: relative; display: inline-block; max-width: 40rem; border: var(--rule) solid var(--color-border); padding: 0.75rem 1rem; animation: slam 200ms steps(1) 120ms backwards; }
/* A black block covers the intro, then cuts away. Only opacity animates. */
.hero-intro::before { content: ""; position: absolute; inset: 0; background: var(--color-text); opacity: 0; animation: cover 300ms steps(1) 120ms backwards; pointer-events: none; }
@keyframes cover { 0% { opacity: 1; } 50% { opacity: 0; } }
```

### 2. Scroll: sections slam in
Each section after the hero jumps in as one block, once, alternating sides: the hero counts as the first `section`, so About comes from the right, Projects from the left, and so on. Keep the hero a `<section>` or the sides flip. JavaScript adds the hiding class, so without JavaScript everything is visible. Hidden sections use `opacity`, not `visibility`, so screen readers still read them and Tab still reaches their links; a section slams in the moment anything inside it gets focus.

```css
.will-slam { opacity: 0; }
.will-slam:nth-of-type(odd)  { --slam-x: calc(var(--slam) * -1); }
.will-slam:nth-of-type(even) { --slam-x: var(--slam); }
/* Two classes beat .will-slam, so opacity comes back and the animation is not cancelled. */
.will-slam.is-slammed { opacity: 1; animation: slam 200ms steps(1) backwards; }
```
```js
const slabs = document.querySelectorAll('main > section:not(.hero)');
if (!reduce && 'IntersectionObserver' in window) {
  const slammer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also slam sections already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add('is-slammed');
        slammer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -15% 0px' });
  slabs.forEach((section) => { section.classList.add('will-slam'); slammer.observe(section); });
  // A short last section may never reach the trigger line: at the bottom, show the rest.
  const slamRest = () => { if (atBottom()) slabs.forEach((section) => section.classList.add('is-slammed')); };
  window.addEventListener('scroll', slamRest, { passive: true });
  slamRest(); // also runs once now, for pages too short to scroll
  // Keyboard users: a section slams in as soon as Tab lands inside it.
  document.addEventListener('focusin', (event) => {
    const section = event.target.closest('.will-slam');
    if (section) section.classList.add('is-slammed');
  });
}
```

### 3. Hover and focus: instant invert
Links, buttons and project tiles swap black and white at once (a tile also loses its shadow). No transition. Focus also gets a thick ring, set off from the element by a gap. Only tiles that hold a real link react: add the class `has-link` to a `.project-card` only when SPEC.md gives that project a link.

```html
<article class="project-card has-link">
  <h3>Project name from SPEC.md</h3>
  <p>One real sentence about the project.</p>
  <a href="https://example.com/project">Link text from SPEC.md</a>
</article>
```
```css
a { color: var(--color-text); text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 4px; overflow-wrap: anywhere; }
a:focus-visible,
button:focus-visible { background: var(--color-text); color: var(--color-bg); text-decoration-color: transparent; outline: 4px solid var(--ring); outline-offset: 3px; }
@media (hover: hover) {
  a:hover, button:hover { background: var(--color-text); color: var(--color-bg); text-decoration-color: transparent; }
}

.project-card { border: var(--rule) solid var(--color-border); background: var(--color-surface); padding: 1rem; filter: drop-shadow(8px 8px 0 var(--color-border)); }
.project-card h3 { font-family: var(--font-display); font-weight: 400; font-size: clamp(1.75rem, 6vw, 3rem); line-height: 1; overflow-wrap: anywhere; }
/* The tile inverts (same token swap as .inverted) and loses its shadow. It must not move: a tile sliding away from the pointer would flicker. */
.project-card.has-link:hover,
.project-card.has-link:focus-within {
  --color-bg: #000000; --color-text: #FFFFFF; --color-muted: #CFCFCF; --color-border: #FFFFFF; --ring: #FFFFFF;
  background: #000000; color: #FFFFFF; filter: none;
}
```

### 4. Navigation: the active link is a solid block
The link for the section on screen becomes a solid inverted block, and it jumps from link to link as you scroll. Clicking a link jumps instantly. On phones the header is not sticky, so the block mainly shows on wide screens.

```html
<header class="site-header">
  <nav class="nav" aria-label="Sections">
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <!-- one li per section in SPEC.md, same ids as the sections -->
    </ul>
  </nav>
</header>
```
```css
.nav ul { display: flex; flex-wrap: wrap; list-style: none; margin: 0; padding: 0; }
.nav li { flex: 1 1 auto; }
.nav a { display: flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 1rem; border-right: calc(var(--rule) / 2) solid var(--color-border); border-bottom: calc(var(--rule) / 2) solid var(--color-border); font-family: var(--font-display); text-decoration: none; }
.nav a[aria-current="location"] { background: var(--color-text); color: var(--color-bg); }
/* Cells touch the screen edge and each other, so an outside ring gets clipped: draw it inside, in the paper colour. */
.nav a:focus-visible { outline-offset: -8px; outline-color: var(--color-bg); }
.site-header { border-bottom: var(--rule) solid var(--color-border); background: var(--color-bg); }
@media (min-width: 48rem) {
  .site-header { position: sticky; top: 0; z-index: 10; }
  .nav li { flex: 0 0 auto; }
  section[id] { scroll-margin-top: var(--header-h); } /* so the sticky header never covers a heading */
}
```
```js
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const watched = document.querySelectorAll('main section[id]');
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
function mark(id) {
  id = jumpedTo || id;
  navLinks.forEach((a) => {
    if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
}
if ('IntersectionObserver' in window && watched.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // At the very top and very bottom, checkEnds (below) decides instead.
      if (entry.isIntersecting && window.scrollY >= 8 && !atBottom()) mark(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  watched.forEach((section) => spy.observe(section));
  // Edge cases: at the very top it is always the first section, and a short last section may never reach the middle band.
  const checkEnds = () => {
    if (window.scrollY < 8) mark(watched[0].id);
    else if (atBottom()) mark(watched[watched.length - 1].id);
  };
  window.addEventListener('scroll', checkEnds, { passive: true });
  checkEnds();
}
```

### 5. Signature: the marquee band
The Skills section is a full-width yellow band, framed by heavy black rules, where the student's real skills scroll past in giant type, forever, until stopped. A visible Pause/Play button stops it, hovering it pauses it, and reduced motion leaves it still. The HTML holds the skills once. JavaScript clones the list for the seamless loop and marks the clone `aria-hidden`, so screen readers read each skill once. Without JavaScript, or with reduced motion, it is a plain wrapped list and the button stays hidden.

```html
<section class="band" id="skills" aria-labelledby="skills-title">
  <div class="band-head">
    <h2 id="skills-title">Skills</h2>
    <button class="band-toggle" type="button" hidden>Pause scrolling text</button>
  </div>
  <div class="marquee">
    <div class="marquee-run">
      <ul class="marquee-group">
        <li>First real skill</li>
        <li>Second real skill</li>
        <!-- one li per skill in SPEC.md -->
      </ul>
    </div>
  </div>
</section>
```
```css
.marquee { overflow-x: clip; background: var(--color-accent); color: #000000; border-block: calc(var(--rule) * 2) solid var(--color-border); }
.marquee-group { display: flex; flex-wrap: wrap; list-style: none; margin: 0; padding: 0.1em 0.5rem; font-family: var(--font-display); font-size: clamp(2.5rem, 9vw, 6rem); line-height: 1.15; }
.marquee-group li { display: flex; align-items: center; }
.marquee-group li::after { content: ""; width: 0.35em; height: 0.35em; margin-inline: 0.5em; background: currentColor; } /* a plain square between skills, no text for screen readers */
.marquee-group[aria-hidden="true"] { display: none; }
.band:not(.js-marquee) .marquee-group li:last-child::after { display: none; } /* the still list ends cleanly; the loop needs every square */
.band-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; }
.band-toggle { min-height: 44px; min-width: 44px; padding: 0 1rem; border: var(--rule) solid var(--color-border); background: var(--color-bg); color: var(--color-text); font: inherit; font-family: var(--font-display); cursor: pointer; }
.band-toggle[hidden] { display: none; } /* otherwise the display rule above overrides the hidden attribute */

@media (prefers-reduced-motion: no-preference) {
  .js-marquee .marquee-run { display: flex; width: max-content; animation: ticker var(--marquee-time, 30s) linear infinite; }
  .js-marquee .marquee-group { flex: none; flex-wrap: nowrap; min-width: 100vw; }
  .js-marquee .marquee-group[aria-hidden="true"] { display: flex; }
  .js-marquee.is-paused .marquee-run,
  .js-marquee .marquee:focus-within .marquee-run { animation-play-state: paused; } /* covers it if the student makes items links */
  @media (hover: hover) { .js-marquee .marquee:hover .marquee-run { animation-play-state: paused; } }
}
@keyframes ticker { to { transform: translateX(-50%); } } /* the run holds two equal groups, so -50% is one group */
```
```js
const band = document.querySelector('.band');
const run = band && band.querySelector('.marquee-run');
const toggle = band && band.querySelector('.band-toggle');
if (run && toggle && !reduce) {
  const group = run.querySelector('.marquee-group');
  const copy = group.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true'); // screen readers read the skills once
  run.append(copy);
  band.classList.add('js-marquee');
  const setSpeed = () => {
    const width = group.getBoundingClientRect().width;                          // read
    run.style.setProperty('--marquee-time', Math.max(width / 90, 10).toFixed(1) + 's'); // write: about 90px per second
  };
  setSpeed();
  window.addEventListener('resize', setSpeed);
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const paused = band.classList.toggle('is-paused');
    toggle.textContent = paused ? 'Play scrolling text' : 'Pause scrolling text';
  });
}
```

## Reduced motion
The JavaScript above already skips the slam and the marquee. This block makes sure nothing moves and everything shows, even if the setting changes mid-visit.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .will-slam { opacity: 1; }
  .band-toggle { display: none; } /* nothing to pause */
}
```

## Libraries
None. Plain CSS and JavaScript only.

## Avoid
- Any `transition`, easing curve, fade, glide or bounce. Hard cuts only.
- Staggering things one after another, typing, or a blinking cursor. That is Terminal.
- Sloppy brutalism: rotated boxes, text overlapping links, random neon colours, hard-to-read contrast. Loud, but ordered.
- Soft shadows, blur, gradients, rounded corners, pastel fills, glass.
- A marquee with no Pause button, a duplicate list that screen readers read twice, or text moving faster than a person can read.
- Yellow as text on white, or a second loud colour.
- Invented words in the band, slogans, stickers or fake "system" labels. Decoration is aria-hidden and uses real section names only.
- Generic page habits: a "→" after every link, "A · B · C" strings, numbering projects 01 / 02 / 03, one word of a heading picked out in the accent, an ALL-CAPS label above every heading, the same rounded card with a soft shadow everywhere, a fade-up on every section.
- Flashing: nothing changes colour more than 3 times a second.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
