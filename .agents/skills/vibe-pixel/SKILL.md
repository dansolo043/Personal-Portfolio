---
name: vibe-pixel
description: Restyles the portfolio site as a lovingly made 8/16-bit game menu and world (look, layout and motion). Use ONLY when the student names the vibe-pixel skill or asks for the Pixel vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: generic
  tags: "cs, digital-media, design-art"
  intensity: standard
  version: "2"
---

# Vibe: Pixel

## Feel and who it's for
The portfolio feels like the title screen and menu of a well-made console game: chunky pixel shapes, a small fixed palette, crisp stepped borders and a ▶ cursor that hops between menu items. It is playful but readable and grown-up, a tribute to the genre and not a parody. Good for CS, digital media and design students who want a site that shows craft and a sense of fun.

## Must keep (this is what makes it Pixel)
1. Everything is built from hard pixel edges: stepped borders with notched corners, zero blur, zero rounded corners, no soft shadows.
2. A small console-style palette: deep indigo screen, cream text, ONE yellow accent. Extra colours (a sky cyan) appear only inside pixel art, never as text.
3. A pixel display font for headings only. Paragraphs use a readable font (see Starting defaults).
4. The menu is the navigation: a ▶ cursor hops to the section you are on.
5. Motion is stepped at about 10 frames per second. Things travel short distances in 3 or 4 visible frames, like sprites. Nothing eases.

## Starting defaults (change freely)
The student can say "make the accent pink" or "use a lighter screen". Their request wins.

Palette, in words: deep indigo screen, a lighter indigo for panels, cream for reading text, a pale lavender for secondary text, a mid violet for pixel borders, golden yellow for links and the cursor, a slightly lighter indigo for the room-change wipe.

```css
/* Contrast (WCAG): text on bg 14.7, on surface 12.1. Muted on bg 9.2, on surface 7.6.
   Accent on bg 11.4, on surface 9.4. Bg-coloured text on an accent fill 11.4.
   Border on bg 4.0 (fine for graphics, never use it for text). Wipe vs bg 1.6 (gentle, no harsh flash). */
:root {
  --color-bg: #1F1A3D;
  --color-surface: #2C2560;
  --color-text: #F7F2DE;
  --color-muted: #C4BCE8;
  --color-accent: #FFD23F;
  --color-border: #7C6FD6;
  --color-wipe: #3A3188;
  --color-sky: #4FD6E8;          /* pixel art only (the cloud), never text */
  --font-display: "Press Start 2P", monospace;
  --font-ui: "Pixelify Sans", system-ui, sans-serif;
  --font-body: "Atkinson Hyperlegible", system-ui, sans-serif;
  --px: 4px;                     /* one "pixel" for borders and art; not a spacing scale */
  --bar-h: 6.25rem;              /* menu bar height on phones: 2 rows of 44px + padding + border; JS keeps it exact */
  --wipe-ms: 300ms;              /* 3 frames at 10 fps; keep equal to WIPE in script.js */
}
```
Fonts, with a job each:
- Press Start 2P for the name and headings only. It is a single weight, so always set `font-weight: 400` or the browser fakes a bold. It is crisp at multiples of 8px (16, 24, 32, 48) and blurry in between, so use fixed sizes with media queries, not fluid `clamp()`.
- Pixelify Sans for short UI labels: menu links, tags, the contact list. Always 16px or larger, never for paragraphs.
- Atkinson Hyperlegible for every paragraph, 18px (1.125rem) on a 1.6 line height. Pixel fonts tire the eye over a paragraph, and a clean, very legible sans keeps the page grown-up. Alternative: DM Sans.

`<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible&family=Pixelify+Sans:wght@500;700&family=Press+Start+2P&display=swap" rel="stylesheet">`

Other console-like palettes: a four-green handheld look (dark green text on pale green) or night-sky navy with a coral accent. Check contrast if you change colours. Avoid near-black with acid green.

Base rules every build needs (the snippets below assume them):
```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding-top: var(--bar-h); background: var(--color-bg); color: var(--color-text); font: 1.125rem/1.6 var(--font-body); }
main { overflow-x: clip; }
main > section { max-width: 56rem; margin-inline: auto; padding: 48px 20px; }
section[id] { scroll-margin-top: calc(var(--bar-h) + 8px); }
h1, h2, h3 { margin: 0 0 16px; font-family: var(--font-display); font-weight: 400; line-height: 1.5; overflow-wrap: anywhere; }
h2, h3 { font-size: 1rem; }
p { max-width: 60ch; margin: 0 0 16px; }
@media (min-width: 40em) { :root { --bar-h: 3.5rem; } h2 { font-size: 1.5rem; } main > section { padding-block: 72px; } }

/* The pixel border: four 4px shadows with no blur. The corners stay empty, which gives the notched look.
   Change only --bd to recolour it. Leave 8px or more of room around any box so the shadows are never clipped. */
.px-box { --bd: var(--color-border); background: var(--color-surface);
  box-shadow: 0 calc(var(--px) * -1) 0 0 var(--bd), 0 var(--px) 0 0 var(--bd),
              calc(var(--px) * -1) 0 0 0 var(--bd), var(--px) 0 0 0 var(--bd); }
```

## Layout ideas
- **Header / menu:** a fixed bar at the top with the real section names as menu items and the ▶ cursor (see Navigation). On phones the items sit in a 3-column grid of two rows (44px tall each), on wide screens in one row. Never scroll sideways. No footer, or at most one plain "Back to top" link.
- **Hero (title screen):** the real name large inside one pixel panel, the one-line intro under it (the one-line intro from SPEC.md; if SPEC.md has no separate tagline, the "Who I am" line without the name), and one framed link to the Projects section (or, if SPEC.md has no projects, the first section after the hero), labelled with that section's real name. Pixel scenery around it: a cloud and a ground strip.
- **About:** the real bio in a pixel panel, like a dialog box.
- **Projects:** each real project is a menu entry: a pixel panel with the title and the real description. The title is a link only if SPEC.md gives that project a link; panels without a link do not react to hover.
- **Skills:** the real skills as small pixel-bordered tags.
- **Contact:** the real links in one final menu panel, one per line. For a bare URL use the label SPEC.md gives it (for example "GitHub"). The email address must fit at 320px.
- Decorative labels may only repeat real section names. They are `aria-hidden="true"`, and every section keeps a real `<h2>`.

```html
<header class="menu-bar">
  <nav class="menu" aria-label="Sections">
    <span class="menu-cursor" aria-hidden="true">▶&#xFE0E;</span>
    <ul>
      <li><a class="select" href="#home">Home</a></li>
      <li><a class="select" href="#about">About</a></li>
      <li><a class="select" href="#projects">Projects</a></li>
    </ul>
  </nav>
</header>
<span class="wipe" aria-hidden="true"></span>
```
The `&#xFE0E;` after ▶ forces the plain text glyph; without it some phones draw a coloured emoji. List only the sections SPEC.md has.

Cards, tags and contact. Give each project card, each tag `<li>` and the contact panel the `px-box` class (contact panel: `class="panel px-box"`). The `.select` links are defined under Hover and focus:
```css
.projects-grid { display: grid; gap: 28px; }
@media (min-width: 40em) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
.project-card, .panel { position: relative; padding: 20px; }
.project-card p { margin: 0; }
.tags { display: flex; flex-wrap: wrap; gap: 16px; margin: 0; padding: 0; list-style: none; }
.tags li { padding: 4px 12px; font: 500 1.125rem/1.6 var(--font-ui); }
.contact-list { margin: 0; padding: 0; list-style: none; font: 500 1.125rem/1.6 var(--font-ui); overflow-wrap: anywhere; }
```

## Make it theirs
- The one loud thing is the ▶ cursor and the room-change wipe. Everything else stays calm: no glow, no scanlines, no second accent, no decoration that carries no meaning.
- Ground the art in the student's SPEC.md. If a project or interest has a clear, simple subject (a bus, a clock, a plant), offer to draw one small 8 by 8 sprite of it from CSS squares, `aria-hidden`. Never invent a subject. The sprite element itself is exactly one pixel square (`width` and `height` = one unit) and every other pixel is a `box-shadow` copy of it with zero blur; give the element a `margin-bottom` of seven units to reserve the rows below. A taller element makes every shadow a tall bar.
- Clear type scale: name 24px (then 32px, 48px on wider screens), section titles 16px (24px on wide screens), paragraphs 18px. Press Start 2P is one em wide per letter, so check the longest word of the name at 320px: a 24px name fits about 10 letters per line in the hero panel.
- Pixel art is CSS only and `aria-hidden`. A real image the student supplies gets `image-rendering: pixelated` and real alt text.

## Motion character
Tempo: about 10 frames per second. Easing: only `steps(n)`, with n chosen so each frame is about 100ms (400ms is `steps(4)`, 300ms is `steps(3)`). Things MOVE across short distances, 16 to 64px, and you see each intermediate position, like a sprite. This differs from the neighbours: Terminal also uses `steps()`, but only to switch text on instantly line by line, and Brutalist uses `steps(1)` to slam whole blocks in at once. Pixel never snaps in one step and never prints text: it shows travel. Only `transform`, `opacity` and `clip-path` change.

Keyframes shared by several moments (the `--fall` and `--run` variables set the distance):
```css
@keyframes drop { from { transform: translateY(var(--fall, -16px)); opacity: 0; } }
@keyframes slide-in { from { transform: translateX(var(--run, 64px)); } }
@keyframes doors-close { from { clip-path: inset(0 50% 0 50%); } to { clip-path: inset(0 0 0 0); } }
@keyframes doors-open { from { clip-path: inset(0 0 0 0); } to { clip-path: inset(0 50% 0 50%); } }
```
The snippets share one `script.js`. Put these two helpers first:
```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function atBottom() { return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2; }
```

### 1. Page load: the title screen drops in
The name drops from above in 4 frames, then the intro and the link follow, and a cloud slides in from the side in 6 frames. Everything is in the HTML and finished in about a second. Pure CSS, so the text still shows if JavaScript fails.

```html
<section class="hero" id="home" aria-labelledby="home-title">
  <span class="cloud" aria-hidden="true"></span>
  <div class="title-panel px-box">
    <h1 id="home-title" class="title-name">Sam Rivera</h1>
    <p class="title-intro">The one-line intro from SPEC.md.</p>
    <a class="select start px-box" href="#projects"><span aria-hidden="true">▶&#xFE0E;</span> Projects</a>
  </div>
  <span class="ground" aria-hidden="true"></span>
</section>
```
```css
.hero { position: relative; display: flex; flex-direction: column; justify-content: center; min-height: calc(100vh - var(--bar-h)); overflow: clip; }
.title-panel { position: relative; padding: 24px 20px; }
.title-name { font-size: 1.5rem; --fall: -32px; animation: drop 400ms steps(4) both; }
.title-intro { color: var(--color-muted); animation: drop 300ms steps(3) 300ms both; }
.start { --bd: var(--color-accent); gap: 8px; padding: 4px 16px; font: 700 1.125rem/1.4 var(--font-ui); background: var(--color-bg); animation: drop 300ms steps(3) 600ms both; }
@media (min-width: 40em) { .title-name { font-size: 2rem; } }
@media (min-width: 60em) { .title-name { font-size: 3rem; } }

/* Cloud: three stacked rows of 8px pixels, built from the element and its two pseudo-elements. */
.cloud { --u: 8px; position: absolute; top: 28px; /* the two upper rows sit above the box, so leave 2 units plus a gap */ right: 20px; width: calc(var(--u) * 9); height: var(--u); background: var(--color-sky); --run: 96px; animation: slide-in 600ms steps(6) both; }
.cloud::before, .cloud::after { content: ""; position: absolute; background: var(--color-sky); height: var(--u); }
.cloud::before { left: var(--u); bottom: var(--u); width: calc(var(--u) * 7); }
.cloud::after { left: calc(var(--u) * 3); bottom: calc(var(--u) * 2); width: calc(var(--u) * 3); }
.ground { position: absolute; inset: auto 20px 0 20px; height: calc(var(--px) * 2);
  background: repeating-linear-gradient(90deg, var(--color-border) 0 calc(var(--px) * 4), transparent 0 calc(var(--px) * 5)); }
```
The link goes to Projects (or the first section after the hero if there are no projects) and says that section's real name, never "Press Start" or any made-up call to action.

### 2. Scroll: rooms drop in
A section drops 16px into place in 4 frames, once, when it comes on screen. JavaScript adds the hiding class, so without JavaScript everything is visible. Hidden sections use `opacity`, not `visibility`, so screen readers still read them and Tab still reaches their links.

```css
.will-drop { opacity: 0; }
.will-drop.is-dropped { opacity: 1; animation: drop 400ms steps(4) both; }
```
```js
const rooms = document.querySelectorAll('main section:not(.hero)');
if (!reduce && 'IntersectionObserver' in window) {
  const dropper = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also drop sections already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add('is-dropped');
        dropper.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -15% 0px' });
  rooms.forEach((room) => { room.classList.add('will-drop'); dropper.observe(room); });
  // Keyboard users: a section drops in as soon as Tab lands inside it.
  document.addEventListener('focusin', (event) => {
    const room = event.target.closest('.will-drop');
    if (room) room.classList.add('is-dropped');
  });
  // A short last section may never reach the trigger line: at the very bottom, show the rest.
  window.addEventListener('scroll', () => {
    if (atBottom()) rooms.forEach((room) => room.classList.add('is-dropped'));
  }, { passive: true });
}
```

### 3. Hover and focus: a selection box in 2 frames
Links and linked project cards get a pixel selection box that snaps in over two frames, slightly large and then settling. Hover and keyboard focus look the same. It is drawn with a pseudo-element, so it needs no layout change.

```css
a { color: var(--color-accent); text-underline-offset: 4px; }
.select { position: relative; display: inline-flex; align-items: center; min-height: 44px; outline: 2px solid transparent; } /* the transparent outline stays visible in forced-colours mode */
.select::after { content: ""; position: absolute; inset: calc(var(--px) * -2); border: var(--px) solid var(--color-accent);
  opacity: 0; transform: scale(1.06); pointer-events: none; transition: opacity 200ms steps(2), transform 200ms steps(2); }
.select:hover::after, .select:focus-visible::after { opacity: 1; transform: none; }

/* A whole project card is one link, but only when SPEC.md gives that project a link. The box then wraps the card. */
.card-link { position: static; }
.card-link::before { content: ""; position: absolute; inset: 0; }
```
```html
<article class="project-card px-box">
  <h3><a class="select card-link" href="https://example.com/the-link-from-SPEC">Project title</a></h3>
  <p>The real description from SPEC.md.</p>
</article>
```
A card without a link uses a plain `<h3>Project title</h3>` and gets no box, no pointer, no hover.

### 4. Navigation: the ▶ cursor follows you
The cursor sits in the left gutter of the menu item for the section on screen. When the section changes it hops to the new item in 3 frames. The menu uses `aria-current="location"` as well, so screen readers get the same information.

```css
.menu-bar { position: fixed; inset: 0 0 auto 0; z-index: 10; background: var(--color-bg); border-bottom: var(--px) solid var(--color-border); }
.menu { position: relative; max-width: 56rem; margin-inline: auto; padding: 4px 8px; }
.menu ul { display: grid; grid-template-columns: repeat(3, 1fr); margin: 0; padding: 0; list-style: none; } /* 3 per row: five links wrap to two rows at 320px */
/* .menu a (0,1,1) beats .select (0,1,0) on purpose; keep these selectors this specific. */
.menu a { display: flex; width: 100%; padding-left: 1.5rem; font: 500 1rem/1.2 var(--font-ui); /* 500, not 700: bold Pixelify closes up the C at 16px */ color: var(--color-text); text-decoration: none; }
.menu a[aria-current] { color: var(--color-accent); }
.menu .select::after { inset: 0; } /* inside the item, so nothing is clipped */
@media (min-width: 40em) {
  .menu ul { display: flex; gap: 8px; }
  .menu a { width: auto; padding-right: 12px; }
}
.menu-cursor { position: absolute; top: 0; left: 0; display: flex; align-items: center; justify-content: center; width: 1.5rem; height: 44px;
  color: var(--color-accent); font: 1rem/1 system-ui, "Segoe UI Symbol", sans-serif; pointer-events: none; opacity: 0;
  transform: translate(var(--cx, 0px), var(--cy, 0px)); }
.menu.has-cursor .menu-cursor { opacity: 1; }
.menu.is-ready .menu-cursor { transition: transform 300ms steps(3); } /* 3 frames, 10 fps */
```
```js
const menu = document.querySelector('.menu');
const cursor = document.querySelector('.menu-cursor');
const bar = document.querySelector('.menu-bar');
const links = [...document.querySelectorAll('.menu a')];
const sections = [...document.querySelectorAll('main section[id]')];
let current = null;   // id of the selected section
let locked = null;    // set by a jump; keeps that section selected until the visitor scrolls on their own

function place(link, instant) {
  // instant: first placement and resizes must not hop, so the transition is off for those two frames
  if (instant) menu.classList.remove('is-ready');
  cursor.style.setProperty('--cx', link.offsetLeft + 'px');
  cursor.style.setProperty('--cy', link.offsetTop + 'px');
  menu.classList.add('has-cursor');
  if (instant) requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-ready')));
}
function select(id) {
  const link = links.find((a) => a.hash === '#' + id);
  if (!link || id === current) return;
  const first = current === null;
  current = id;
  links.forEach((a) => (a === link ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
  place(link, first);
}
// At the very top and bottom the edge section wins, even if the observer fires after the scroll check.
function edgeId() {
  if (window.scrollY < 8 && sections[0]) return sections[0].id;
  if (atBottom() && sections.length) return sections[sections.length - 1].id;
  return '';
}
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting && !locked) select(edgeId() || entry.target.id); });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((section) => spy.observe(section));

window.addEventListener('scroll', () => {
  if (locked) {
    // A jump keeps its section selected until it leaves the screen (a short last section would otherwise lose to the one before it).
    const box = document.getElementById(locked).getBoundingClientRect();
    if (box.bottom <= 0 || box.top >= window.innerHeight) locked = null;
  } else if (window.scrollY < 8 && sections[0]) select(sections[0].id);
  else if (atBottom() && sections.length) select(sections[sections.length - 1].id);
}, { passive: true });
// The visitor scrolling on their own ends the lock.
['wheel', 'touchmove'].forEach((type) => window.addEventListener(type, () => { locked = null; }, { passive: true }));
window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) locked = null;
});

// Keep the bar height exact (for the body padding) and the cursor on its item after resizes and font loading.
function sync() {
  document.documentElement.style.setProperty('--bar-h', bar.offsetHeight + 'px');
  const link = links.find((a) => a.hash === '#' + current);
  if (link) place(link, true);
}
window.addEventListener('resize', sync);
window.addEventListener('load', sync);
if (document.fonts) document.fonts.ready.then(sync);
```
`sync()` writes `--bar-h` from the real bar, so a different number of links never leaves it covering content. Without JavaScript the CSS fallback height holds and the links still work.

### 5. Signature: the ▶ hop and the room-change wipe
The hop above is half of the signature. The other half: when you jump with a menu link, the screen closes like double doors in 3 frames, the page jumps while it is covered, and the doors open in 3 frames. Total 600ms, then the overlay is gone. The overlay is a gentle indigo (not white or bright), so it never flashes harshly, and a second wipe cannot start until the first is done, so it can never happen more than twice a second.

```css
.wipe { position: fixed; inset: 0; z-index: 20; background: var(--color-wipe); pointer-events: none; clip-path: inset(0 50% 0 50%); } /* resting state: zero width, invisible */
.wipe.is-closing { animation: doors-close var(--wipe-ms) steps(3) both; }
.wipe.is-opening { animation: doors-open var(--wipe-ms) steps(3) both; }
html { scroll-behavior: auto; } /* the jump is instant; the wipe is the transition */
```
```js
const wipe = document.querySelector('.wipe');
const WIPE = 300; // milliseconds; keep equal to --wipe-ms in the CSS
let wiping = false;

function jump(hash) {
  locked = hash.slice(1);
  select(locked);
  location.hash = hash; // instant jump, updates the URL and keeps Back working
}
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (!document.getElementById(link.hash.slice(1))) return;
  event.preventDefault();
  if (reduce || wiping || !wipe) { jump(link.hash); return; } // reduced motion or a quick second click: no wipe
  wiping = true;
  wipe.className = 'wipe is-closing';
  setTimeout(() => {
    jump(link.hash);                           // the room changes while the screen is covered
    wipe.className = 'wipe is-opening';
    setTimeout(() => { wipe.className = 'wipe'; wiping = false; }, WIPE);
  }, WIPE);
});
```
Typed URLs, Back and Forward skip the wipe.

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .will-drop { opacity: 1; }
  .wipe { display: none; }
}
```
Everything is visible and in place, links jump instantly with no wipe, and the cursor still moves to the current item, instantly. The JavaScript above also skips the drop-in and the wipe.

## Libraries
None. Plain CSS and JavaScript only.

## Avoid
- Fake game content: scores, levels, HP bars, coins, XP, lives, achievements, "1UP", "GAME OVER", "LOADING" bars, or a "PRESS START" text that does nothing. Decorative labels repeat real section names only. A start-style link is fine only when it is a real link to a real section and says that section's real name.
- Blurry or soft effects: box-shadow blur, rounded corners, gradients on panels, glow, CRT scanlines, film grain.
- Press Start 2P at sizes that are not multiples of 8px, or for anything longer than a heading. Pixel fonts for paragraphs, or body text under 16px.
- Smooth easing, fades, bounces or springs. Everything moves in `steps()`, and only short distances. Also avoid dumping every motion on every element: the cursor and the wipe are the loud part.
- Text or a screen that blinks or flashes more than 3 times a second. Looping idle sprites that never stop.
- Wipes that last longer than about 600ms, a bright wipe colour, or a wipe on scroll (only on menu jumps).
- Fake controls that do nothing: a d-pad, A/B buttons, a volume icon, a "continue?" prompt.
- Generic page habits: a "→" after every link, "A · B · C" strings, numbering projects 01 / 02 / 03, one word of a heading picked out in the accent, an ALL-CAPS label above every heading, the same soft card everywhere, a soft fade-up on every section (the drop here is a stepped move and the only scroll effect).
- Hiding content until JavaScript runs.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
