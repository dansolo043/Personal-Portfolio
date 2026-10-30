---
name: vibe-depth
description: Restyles the portfolio site as a layered paper diorama, with stacked planes, real parallax and soft depth shadows (look, layout and motion). Use ONLY when the student names the vibe-depth skill or asks for the Depth vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: expressive
  tags: "design-art, digital-media, engineering"
  intensity: expressive
  version: "2"
---

# Vibe: Depth

## Feel and who it's for
The page is built from sheets of cut paper stacked at different distances, like a shadow box or a paper diorama. You look into it: far shapes sit deep at the back, the content lies on lit paper sheets in the middle, and a few scraps float in front. Scrolling and moving the mouse make the layers slide against each other. It is tactile and calm, never flashy, and the text always sits on a solid sheet. Good for design, digital media and engineering students who think in models, sections and space. It uses plain CSS 3D (`perspective`, `translateZ`), not WebGL and not a camera in a room, and its paper edges are crisp, not soft blobs.

## Must keep (this is what makes it Depth)
1. Real layers. The hero is 4 to 6 planes at different depths (abstract CSS shapes, `aria-hidden`), and the student's name lies on its own paper sheet in the middle of them.
2. Light comes from above and to the left. Every sheet has a tight contact shadow, a long soft shadow, and (for stacked paper) a hard-edged offset edge. Nearer means a deeper shadow.
3. Text always sits on solid paper with strong contrast. The text planes are never scaled or rotated at rest, so type stays crisp.
4. Motion is slow and weighted: things settle forward into place, nothing bounces. Layers move at different rates, and every loop stops when nothing is changing.
5. All five motion moments below are present, and the page is calm and readable with or without JavaScript.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the sun blue". Their request wins.

Palette, in words: a deep aubergine page like a shadow box's inside; warm off-white paper sheets with plum-ink text; a muted plum-grey for secondary text; berry for links on paper; marigold only for lit decoration and focus rings on the dark header; mulberry, rose and dusk-plum for the far planes. Planes carry no text, so their colours are free. Never put marigold on paper (1.8:1).

```css
/* Contrast, computed (WCAG): text #241A2B on paper #F6F0E8 14.7:1, on surface #EBE1D7 12.9:1;
   muted #594A64 on paper 7.2:1, on surface 6.3:1; accent #9C2457 on paper 6.6:1, on surface 5.8:1;
   paper on accent (link hover) 6.6:1; header text #F6F0E8 on raised #271B33 14.4:1;
   marigold #F2A541 on raised 7.9:1 (focus ring on the dark header only). */
:root {
  --color-bg: #1B1424;          /* the inside of the box: page background */
  --color-bg-raised: #271B33;   /* header, the nearest dark layer */
  --color-paper: #F6F0E8;       /* content sheets and the name sheet */
  --color-surface: #EBE1D7;     /* cards and chips lying on a sheet */
  --color-text: #241A2B;
  --color-muted: #594A64;
  --color-accent: #9C2457;      /* links on paper */
  --color-on-dark: #F6F0E8;     /* text on the header */
  --color-light: #F2A541;       /* focus ring on the header */
  --plane-sun: #F2A541;         /* decoration only, never text */
  --plane-far: #C25A7C;
  --plane-mid: #7B3A6B;
  --plane-near: #4A2A57;
  --edge-1: #DDD1C6;            /* the visible edges of the paper underneath */
  --edge-2: #BFB0A8;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Outfit", system-ui, sans-serif;
  --settle: cubic-bezier(0.34, 0.2, 0.14, 1);  /* gentle start, very long soft landing, no overshoot */
  --persp: 900px;               /* how strong the 3D is; lower is more dramatic */
  --pull: 1.6;                  /* hero planes end at rest depth x (1 + pull) when fully separated */
  --reach: 1;                   /* scales sideways drift; phones lower it */
}
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: auto; scroll-padding-top: 1rem; }
body { margin: 0; background: var(--color-bg); color: var(--color-on-dark); font-family: var(--font-body); font-size: 1.0625rem; line-height: 1.6; }
h1, h2, h3 { margin: 0; font-family: var(--font-display); font-weight: 700; line-height: 1.1; } /* Fraunces is variable, so say the weight */
p { margin: 0; }
ul { margin: 0; padding: 0; list-style: none; }
main { overflow-x: clip; }      /* nothing in the diorama may cause sideways scroll */
main p { max-width: 38rem; }    /* lines stay under 80 characters; scoped so it never squeezes nav or lists */
section[id] { scroll-margin-top: 1rem; }
```
Fonts: Fraunces (display, a soft variable serif that looks cut from paper) and Outfit (body). Alternatives: Young Serif or Gloock for display, Lexend for body. Not Archivo Black, Bricolage Grotesque or JetBrains Mono (other vibes).
`<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..800&family=Outfit:wght@400..600&display=swap" rel="stylesheet">`
Corners on sheets, cards and chips stay square (cut paper). Only the sun, hills and scraps are curved.

## Layout ideas
- **Header:** a dark raised bar with the student's name as a link to `#home` and the five real section links. It casts a shadow on the page. It scrolls away on phones and becomes sticky from 48rem wide. No footer, or one plain "Back to top" link.
- **Hero:** the diorama (see moment 1). The name is an `h1` on the paper sheet and the one-line intro sits under it: the one-line intro from SPEC.md; if SPEC.md has no separate tagline, use the "Who I am" line without the name.
- **Every other section is one paper sheet** lying on the dark page, with the real `h2` inside. Vary them: Projects is full width, About, Skills and Contact are narrower and sit left or right. Sheets show the edge of one or two sheets beneath them (offset hard shadows).
- **Projects:** one raised card per real project on the Projects sheet: title, then one real sentence. The title is a link only if SPEC.md has a link for it (never invent a URL). Cards without a link stay flat and calm.
- **Skills:** the real skills as small paper chips lying on the sheet.
- **Contact:** the real email and links as large plain text, one per line. Link text is the label SPEC.md gives next to the URL (for example "LinkedIn"), never new wording. At 320px a real email must fit on one line, hence the `clamp()` size and `overflow-wrap: anywhere`.

```html
<header class="site-header">
  <div class="header-row">
    <a class="brand" href="#home">Your Name</a>
    <nav aria-label="Sections"><ul class="site-nav">
      <li><a href="#home">Home</a></li><li><a href="#about">About</a></li> <!-- one li per real section in SPEC.md -->
    </ul></nav>
  </div>
</header>
```
```html
<section class="sheet sheet-narrow sheet-left" id="about" aria-labelledby="about-title">
  <h2 id="about-title" class="section-title">About</h2>
  <p>The real bio from SPEC.md.</p>
</section>
```
```css
.sheet { position: relative; width: min(100% - 2rem, 62rem); margin: clamp(2.5rem, 7vw, 4.5rem) auto; padding: clamp(1.25rem, 4vw, 3rem); background: var(--color-paper); color: var(--color-text);
  /* two hard offsets are the paper edges underneath, then a contact shadow and a long soft shadow; offsets stay inside the 16px page gutter */
  box-shadow: 0.4rem 0.5rem 0 -0.1rem var(--edge-1), 0.8rem 1rem 0 -0.2rem var(--edge-2), 0 2px 4px rgba(0, 0, 0, 0.35), 0 28px 48px -16px rgba(0, 0, 0, 0.6); }
/* nth-of-type counts every <section>, the hero included: About and Skills land on even. Re-check if sections change. */
.sheet:nth-of-type(even) { box-shadow: -0.4rem 0.5rem 0 -0.1rem var(--edge-1), -0.8rem 1rem 0 -0.2rem var(--edge-2), 0 2px 4px rgba(0, 0, 0, 0.35), 0 28px 48px -16px rgba(0, 0, 0, 0.6); }
.sheet-narrow { width: min(100% - 2rem, 46rem); }
@media (min-width: 62rem) {
  .sheet-left { margin-left: max(1rem, calc((100% - 62rem) / 2)); }
  .sheet-right { margin-right: max(1rem, calc((100% - 62rem) / 2)); }
}
.section-title { margin-bottom: 1rem; font-size: clamp(1.875rem, 5vw, 3rem); }
.project-list { display: grid; gap: 1.25rem; perspective: var(--persp); }
@media (min-width: 48rem) { .project-list { grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); } }
.skill-list { display: flex; flex-wrap: wrap; gap: 0.625rem; }
.skill-list li { padding: 0.375rem 0.875rem; background: var(--color-surface); box-shadow: 0 1px 0 var(--edge-2), 0 4px 8px -3px rgba(36, 26, 43, 0.4); }
.contact-list a { display: inline-flex; align-items: center; min-height: 44px; font-size: clamp(1rem, 4.6vw, 1.5rem); color: var(--color-accent); overflow-wrap: anywhere; }
.contact-list a:hover { background: var(--color-accent); color: var(--color-paper); }
.contact-list a:focus-visible { outline: 3px solid var(--color-text); outline-offset: 2px; }
```
Spacing numbers above are starting points; use your spacing scale where you have one.

## Make it theirs
- The one loud thing is the hero diorama pulling apart as you scroll away. The sheets, cards and nav stay small and quiet. Keep a clear type scale: a large name, big section titles, calm body text under 80 characters per line.
- Their own work sets the details. The student's real subjects can shape the far planes: a student who makes ravine scenes might get hills, a lamp designer a sun. The shapes stay abstract, `aria-hidden` and wordless: never add labels, captions or numbers to the planes.

## Motion character
Tempo: slow and weighted, 700 to 1100 ms for layers, about 260 ms for hover. Easing: one custom curve for everything, `--settle`: it starts gently and lands very softly, with no overshoot (a sheet of paper laying itself down). Scroll-linked motion is linear, because the finger sets the pace. Pointer tilt is damped (each frame closes 7% of the gap). Nothing loops or flashes: every motion plays once or follows the scroll or the pointer. What moves: layers along Z and Y. What never moves: body text, the name sheet (except one small set-down on load), anything the visitor is reading. The snippets share one `styles.css` and one `script.js` (helpers first, then each moment in order). Depth comes from three things: `perspective` on a stage, `translateZ` on planes (set with the `translate` property, so the animations below never fight over `transform`), and layered shadows.

Shared keyframes (used by several moments):
```css
@keyframes arrive { from { opacity: 0; transform: translateZ(-240px); } to { opacity: 1; transform: none; } }
@keyframes pull { from { translate: 0 0 var(--z); } to { translate: 0 calc(var(--dy, 0px) * var(--reach)) calc(var(--z) * (1 + var(--pull))); } }
@keyframes set-down { from { opacity: 0; transform: translateY(1.25rem); } to { opacity: 1; transform: none; } }
@keyframes drift { from { translate: 0 var(--from); } to { translate: 0 var(--to); } }
```
```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const hero = document.querySelector('.hero');
```

### 1. Page load: the planes arrive back to front
The hero planes slide forward from deeper in the box, one after another (the far sun first, the near hill last), then the name sheet sets down. About 1.3 seconds in all. This is pure CSS, so the name and intro are in the HTML and show even if JavaScript fails. Two stages (one behind the name sheet, one in front) share the same `perspective`, so a front plane really overlaps the name sheet's neighbours. The name sheet itself is never moved in Z: it is the focal plane and stays at depth 0, which keeps its text sharp.

```html
<section class="hero" id="home" aria-labelledby="home-title">
  <div class="stage stage-back" aria-hidden="true"><div class="tilt">
    <span class="plane plane-sun"></span><span class="plane plane-ridge-far"></span><span class="plane plane-ridge-mid"></span>
  </div></div>
  <div class="hero-copy">
    <h1 id="home-title" class="hero-name">Your Name</h1>
    <p class="hero-intro">The one-line intro from SPEC.md.</p>
  </div>
  <div class="stage stage-front" aria-hidden="true"><div class="tilt">
    <span class="plane plane-ridge-near"></span><span class="plane plane-scrap"></span>
  </div></div>
</section>
```
```css
.hero { position: relative; display: grid; align-items: center; min-height: min(88svh, 44rem); padding-block: 3rem 8rem; overflow: clip; /* 8rem keeps the near hill off the name sheet */
  -webkit-mask-image: linear-gradient(to bottom, #000 78%, transparent); mask-image: linear-gradient(to bottom, #000 78%, transparent); } /* the clip would cut the hills in a hard line; the mask fades them into the page like a diorama floor */
.stage { position: absolute; inset: 0; perspective: var(--persp); perspective-origin: 50% 35%; pointer-events: none; }
.stage-front { z-index: 2; }
.tilt { position: absolute; inset: 0; transform-style: preserve-3d; }
/* --z is the plane's resting depth, --dy how far it drifts on Y when fully separated, --i its place in the arrival order. */
.plane { position: absolute; translate: 0 calc(var(--dy, 0px) * var(--reach) * var(--sep, 0)) calc(var(--z) * (1 + var(--pull) * var(--sep, 0)));
  animation: arrive 1000ms var(--settle) calc(var(--i) * 120ms) both; }
.plane-sun { --z: -480px; --dy: 18svh; --i: 0; top: 4%; right: 8%; width: clamp(9rem, 30vw, 22rem); aspect-ratio: 1; border-radius: 50%; background: var(--plane-sun); }
.plane-ridge-far { --z: -320px; --dy: 12svh; --i: 1; left: -25%; bottom: -30%; width: 110%; height: 80%; border-radius: 50% 50% 0 0 / 100% 100% 0 0; background: var(--plane-far); box-shadow: 0 -10px 24px -8px rgba(0, 0, 0, 0.4); }
.plane-ridge-mid { --z: -170px; --dy: 7svh; --i: 2; right: -30%; bottom: -30%; width: 120%; height: 65%; border-radius: 50% 50% 0 0 / 100% 100% 0 0; background: var(--plane-mid); box-shadow: 0 -10px 24px -8px rgba(0, 0, 0, 0.5); }
.plane-ridge-near { --z: 70px; --dy: -4svh; --i: 4; left: -20%; bottom: -25%; width: 85%; height: 40%; border-radius: 50% 50% 0 0 / 100% 100% 0 0; background: var(--plane-near); box-shadow: 0 -8px 20px -6px rgba(0, 0, 0, 0.6); }
.plane-scrap { --z: 180px; --dy: -14svh; --i: 5; right: 12%; bottom: 14%; width: 3.5rem; height: 3.5rem; border-radius: 0 100% 0 100%; background: var(--plane-sun); box-shadow: 0 10px 18px -6px rgba(0, 0, 0, 0.5); }
.hero-copy { position: relative; z-index: 1; width: min(100% - 2rem, 38rem); margin-left: max(1rem, calc((100% - 62rem) / 2)); padding: clamp(1.25rem, 4vw, 2.5rem); background: var(--color-paper); color: var(--color-text);
  box-shadow: 0.4rem 0.5rem 0 -0.1rem var(--edge-1), 0.8rem 1rem 0 -0.2rem var(--edge-2), 0 2px 4px rgba(0, 0, 0, 0.35), 0 28px 48px -16px rgba(0, 0, 0, 0.6);
  animation: set-down 700ms var(--settle) 250ms both; }
.hero-name { font-size: clamp(2.25rem, 9vw, 4.5rem); overflow-wrap: anywhere; } /* check the longest word of the name at 320px */
.hero-intro { margin-top: 0.75rem; font-size: 1.25rem; }
```
The shapes are examples. The student may reshape them (different hills, a moon, a sun) as long as there are 4 to 6 planes, the name sheet is among them, and no plane sits where it hides the name.

### 2. Scroll: sheets settle forward, page layers drift at their own rates
Each sheet starts a little deeper and lower and settles forward into place once, when it comes on screen. JavaScript adds the hiding class, so without JavaScript everything is visible. The sheet uses `opacity`, not `visibility`, so screen readers still read it and Tab still reaches its links; a sheet settles the moment anything inside it gets focus. The `perspective()` inside `transform` gives each sheet its own vanishing point, and the end state is `none`, so the text is sharp once it lands.

```css
.will-settle { opacity: 0; transform: perspective(1100px) translateZ(-90px) translateY(1.5rem); }
.will-settle.is-in { opacity: 1; transform: none; transition: opacity 700ms var(--settle), transform 1000ms var(--settle); } /* two classes (0,2,0) beat .will-settle */
```
```js
const sheets = [...document.querySelectorAll('main .sheet')];
if (!reduce && 'IntersectionObserver' in window) {
  const settle = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also settle sheets already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add('is-in');
        settle.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  sheets.forEach((sheet) => { sheet.classList.add('will-settle'); settle.observe(sheet); });
  // Keyboard users: a sheet settles as soon as Tab lands inside it.
  document.addEventListener('focusin', (event) => {
    const sheet = event.target.closest('.will-settle');
    if (sheet) sheet.classList.add('is-in');
  });
  // A short last sheet may never reach the trigger line: at the very bottom, settle the rest.
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      sheets.forEach((sheet) => sheet.classList.add('is-in'));
    }
  }, { passive: true });
}
```
Behind and in front of the sheets, fixed `aria-hidden` layers move at their own speeds while the page scrolls: a dim moon and hill behind the sheets (slow) and two paper scraps in front, in the side margins only (fast, wide screens only, so they never cover text). Put this markup right after `<body>`.

```html
<div class="backdrop" aria-hidden="true"><span class="layer layer-moon"></span><span class="layer layer-hill"></span></div>
<div class="foreground" aria-hidden="true"><span class="layer layer-scrap-a"></span><span class="layer layer-scrap-b"></span></div>
```
```css
.backdrop, .foreground { position: fixed; inset: 0; overflow: clip; pointer-events: none; }
.backdrop { z-index: -1; }
.foreground { z-index: 3; }  /* below the header (z-index 10) */
/* --from and --to are Y offsets over the whole page. --page (0 to 1) is only set by the JavaScript fallback in moment 5. */
.layer { position: absolute; translate: 0 calc(var(--from) + (var(--to) - var(--from)) * var(--page, 0)); }
.layer-moon { --from: 0vh; --to: -25vh; left: -8vmin; top: 52%; width: 46vmin; aspect-ratio: 1; border-radius: 50%; background: #2A1B36; }
.layer-hill { --from: 10vh; --to: -12vh; right: -12%; bottom: -30vh; width: 70%; height: 60vh; border-radius: 50% 50% 0 0 / 100% 100% 0 0; background: #231830; }
.layer-scrap-a, .layer-scrap-b { display: none; }
@media (min-width: 75rem) {
  .layer-scrap-a, .layer-scrap-b { display: block; width: 2.75rem; height: 2.75rem; border-radius: 0 100% 0 100%; box-shadow: 0 12px 18px -6px rgba(0, 0, 0, 0.55); }
  .layer-scrap-a { --from: 95vh; --to: -45vh; left: 2rem; background: var(--plane-sun); rotate: -18deg; }
  .layer-scrap-b { --from: 130vh; --to: -20vh; right: 2.25rem; width: 2rem; height: 2rem; background: var(--plane-far); rotate: 24deg; }
}
```
The scrolling itself is driven in moment 5 (CSS scroll-driven animation, with a JavaScript fallback).

### 3. Hover and focus: a linked card lifts toward you
Only a card whose title is a real link reacts. It rises, moves toward the viewer, and its shadow deepens (the deeper shadow is a second layer that fades in, so only `transform` and `opacity` animate). The card is scaled down by exactly the amount the perspective enlarges it, `(900 - 40) / 900`, so it keeps its size and its text stays crisp; the lift reads through the shadow and the slight outward slide. Keyboard focus does the same, plus a visible ink outline. The whole card is the click target.

```html
<li class="project-card">
  <h3 class="card-title"><a class="card-link" href="https://example.com/project">Project name from SPEC.md</a></h3> <!-- no <a> at all if SPEC.md has no link -->
  <p>The one-sentence description from SPEC.md.</p>
</li>
```
```css
.project-card { position: relative; padding: 1.25rem; background: var(--color-surface); box-shadow: 0 1px 2px rgba(36, 26, 43, 0.35), 0 8px 14px -6px rgba(36, 26, 43, 0.35); transition: transform 260ms var(--settle); }
.project-card::after { content: ""; position: absolute; inset: 0; box-shadow: 0 2px 4px rgba(36, 26, 43, 0.3), 0 26px 34px -10px rgba(36, 26, 43, 0.55); opacity: 0; transition: opacity 260ms var(--settle); pointer-events: none; }
.card-title { margin-bottom: 0.5rem; font-size: 1.375rem; }
.card-link { display: inline-flex; align-items: center; min-height: 44px; color: var(--color-accent); text-underline-offset: 0.2em; }
.card-link::after { content: ""; position: absolute; inset: 0; }   /* stretches the link over the whole card */
.project-card p { color: var(--color-muted); }
@media (hover: hover) {
  .project-card:has(.card-link):hover { transform: translateY(-6px); z-index: 1; } /* lift with Y and the deeper shadow only: translateZ plus a counter-scale left text soft at 1x */
  .project-card:has(.card-link):hover::after { opacity: 1; }
}
.project-card:has(.card-link:focus-visible) { transform: translateY(-6px); z-index: 1; outline: 3px solid var(--color-text); outline-offset: 3px; }
.card-link:focus-visible { outline: none; } /* the card's ring replaces it, so there are never two rings */
.project-card:has(.card-link:focus-visible)::after { opacity: 1; }
```

### 4. Navigation: the current link sits on a raised sheet
The header is the nearest dark layer. The link for the section on screen is a small paper sheet that lifts 3px out of the bar with its own shadow, while the other links stay flat on the bar. After a jump (click or `#hash`), that link stays current until the visitor scrolls on their own (wheel, touch, scroll keys) or the section leaves the screen, so a short last section is never taken over by the one before it. Jumps are instant (no smooth scrolling). At 320px the five links wrap to a second row (each at least 44px tall); never let them scroll sideways.

```css
.site-header { position: relative; z-index: 10; background: var(--color-bg-raised); box-shadow: 0 1px 0 #3B2C49, 0 12px 24px -10px rgba(0, 0, 0, 0.7); }
.header-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; column-gap: 1rem; width: min(100% - 2rem, 62rem); margin-inline: auto; padding-top: 0.25rem; }
.brand { display: inline-flex; align-items: center; min-height: 44px; color: var(--color-on-dark); font-family: var(--font-display); font-weight: 700; text-decoration: none; }
.site-nav { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.site-nav a { display: inline-flex; align-items: center; min-height: 44px; padding-inline: 0.75rem; color: var(--color-on-dark); text-decoration: none; transition: transform 220ms var(--settle); }
/* The sheet and its text move together, so contrast is the same during the lift. */
.site-nav a[aria-current="location"] { background: var(--color-paper); color: var(--color-text); transform: translateY(-3px); box-shadow: 0 2px 0 var(--edge-2), 0 8px 12px -4px rgba(0, 0, 0, 0.6); }
.brand:focus-visible, .site-nav a:focus-visible { outline: 3px solid var(--color-light); outline-offset: -3px; }  /* drawn inside, so the screen edge never clips it */
.site-nav a[aria-current="location"]:focus-visible { outline-color: var(--color-text); }  /* marigold would be 1.8:1 on the paper chip */
@media (min-width: 48rem) {
  .site-header { position: sticky; top: 0; }
  section[id] { scroll-margin-top: 3.5rem; }   /* use your header's height so it never covers a heading */
  html { scroll-padding-top: 4.5rem; }         /* keeps Tab focus out from under the sticky header too */
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

### 5. Signature: the diorama pulls apart along Z
As you scroll away from the hero, the layers separate in depth: the sun and hills sink back and shrink, the near hill and scrap come toward you and grow, and each also drifts on Y at its own rate. The name sheet is the focal plane: it never leaves depth 0, so it stays crisp and readable. On a mouse, the layers also lean a few degrees toward the pointer (the name sheet is not rotated, so it stays sharp; at depth 0 it would not visibly move anyway). Put these rules after moment 1's, so they win.

In browsers with scroll-driven animations, CSS does all of it. The hero is a named view timeline, and its planes play `pull` across the first 85% of the hero's exit. The page layers from moment 2 play `drift` across the whole page.
```css
.hero { view-timeline: --hero block; }
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    /* Two animations per plane: arrive (time-based) and pull (scroll-based). Longhands after the shorthand pick each one's timeline. */
    .plane { animation: arrive 1000ms var(--settle) calc(var(--i) * 120ms) both, pull linear both; animation-timeline: auto, --hero; animation-range: normal, exit 0% exit 85%; will-change: translate; }
    .layer { animation: drift linear both; animation-timeline: scroll(root block); will-change: translate; }
  }
}
```
Other browsers get the same motion from a short JavaScript fallback. It reads the scroll position, then writes two numbers (`--sep` on the hero, `--page` on the two layer holders; the CSS above already uses them), eases toward the target, and stops requesting frames the moment it has settled.
```js
if (!reduce && hero && !CSS.supports('animation-timeline: view()')) {
  const hosts = [...document.querySelectorAll('.backdrop, .foreground')];
  let sep = 0, page = 0, frame = 0;
  function follow() {
    const goalSep = clamp(window.scrollY / (hero.offsetHeight * 0.85), 0, 1);   // read everything first
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const goalPage = maxY > 0 ? clamp(window.scrollY / maxY, 0, 1) : 0;
    sep += (goalSep - sep) * 0.2;                                               // then ease and write
    page += (goalPage - page) * 0.2;
    const still = Math.abs(goalSep - sep) < 0.001 && Math.abs(goalPage - page) < 0.001;
    if (still) { sep = goalSep; page = goalPage; }
    hero.style.setProperty('--sep', sep.toFixed(4));
    hosts.forEach((el) => el.style.setProperty('--page', page.toFixed(4)));
    frame = still ? 0 : requestAnimationFrame(follow);                          // loop stops when settled
  }
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(follow); }, { passive: true });
  follow();
}
```
The pointer lean is mouse-only (never touch), tiny (3 degrees sideways, 2.2 up and down) and damped. Its loop runs only while the layers are still moving and ends when they have come to rest and the transform is cleared. It also stops tracking when the hero is off screen.
```js
if (!reduce && hero && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const tilts = [...hero.querySelectorAll('.tilt')];
  let goalX = 0, goalY = 0, x = 0, y = 0, running = false, heroOn = true;
  function lean() {
    x += (goalX - x) * 0.07;
    y += (goalY - y) * 0.07;
    const still = Math.abs(goalX - x) < 0.002 && Math.abs(goalY - y) < 0.002;
    if (still) { x = goalX; y = goalY; }
    const value = x === 0 && y === 0 ? '' : 'rotateX(' + (-y * 2.2).toFixed(3) + 'deg) rotateY(' + (x * 3).toFixed(3) + 'deg)';
    tilts.forEach((el) => { el.style.transform = value; });
    running = !still;
    if (running) requestAnimationFrame(lean);
  }
  function wake() { if (!running) { running = true; requestAnimationFrame(lean); } }
  window.addEventListener('pointermove', (e) => {
    if (!heroOn || e.pointerType !== 'mouse') return;
    goalX = (e.clientX / window.innerWidth - 0.5) * 2;    // -1 to 1
    goalY = (e.clientY / window.innerHeight - 0.5) * 2;
    wake();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { goalX = goalY = 0; wake(); });
  new IntersectionObserver((entries) => {
    heroOn = entries[0].isIntersecting;
    if (!heroOn) { goalX = goalY = 0; wake(); }
  }).observe(hero);
}
```

### Phones and touch
Fewer layers, lighter parallax, no tilt (the JavaScript above never starts on touch). The far hill and the front scrap are hidden, so the hero is the sun, mid hill, name sheet and near hill. The two page scraps are already hidden below 75rem.
```css
@media (max-width: 47.99rem), (hover: none) {
  :root { --pull: 0.9; --reach: 0.5; }
  .plane-ridge-far, .plane-scrap { display: none; }
}
```

## Reduced motion
Nothing moves. The page keeps its designed layered look: the planes sit at their resting depths with their shadows, the sheets show their paper edges, and the layers and scraps rest at their starting offsets. The JavaScript above already skips the sheet settle, the tilt and the fallback.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .will-settle { opacity: 1; transform: none; }   /* undo the hidden start, in case the setting changes while the page is open */
  .tilt { transform: none !important; }
}
```

## Performance
Animate `transform`, `translate` and `opacity` only (shadows are static, and the card's deeper shadow fades in as `opacity`). `will-change` goes only on the few moving layers (the planes and page layers), never on sheets or cards. About 6 hero planes, 4 page layers and 5 sheets in total. No loop runs when idle: the pointer lean and the scroll fallback each stop when they settle. Never put `filter: blur` on planes. No libraries.

## Libraries
None. Plain CSS and JavaScript do everything here. `perspective`, `translate` and scroll-driven animation are enough, and a library (three.js, GSAP, a parallax package) would add weight for no gain.

## Avoid
- WebGL, a 3D room with a camera, or glossy 3D objects (that is a different vibe). Everything here is flat paper at different distances.
- Scaling or rotating text planes at rest, or blurry type. If text looks soft, remove the transform from that element.
- Soft pastel blobs, pillowy rounded cards, or the same rounded card with a soft shadow everywhere. Sheets are square-cut and their shadows come from a light on the upper left.
- Layers that cover the name, a heading or a link, or planes that carry words, numbers or labels.
- A rAF loop that runs forever, non-passive scroll listeners, scroll-jacking (taking over the wheel, forced snapping), and `will-change` on everything.
- Animating `box-shadow`, `filter: blur` or `top`/`left`. Fade a second shadow layer instead.
- Tilt on touch screens, big tilt angles (more than about 3 degrees), or motion that stays on after the visitor stops.
- Generic page habits: a "→" after every link, "A · B · C" strings, 01 / 02 / 03 numbering, one word of a heading picked out in the accent, an ALL-CAPS label above every heading, a fade-up on every section.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
