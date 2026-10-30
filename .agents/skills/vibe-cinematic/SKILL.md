---
name: vibe-cinematic
description: Restyles the portfolio site as the opening of a film, with letterbox bars that open on load, a title card for every section, slow dissolves and a subtitle bar that names the scene (look, layout and motion). Use ONLY when the student names the vibe-cinematic skill or asks for the Cinematic vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: expressive
  tags: "digital-media, design-art"
  intensity: expressive
  version: "2"
---

# Vibe: Cinematic

## Feel and who it's for
The page plays like the first minutes of a film. A dark frame, black letterbox bars that slide open as the name comes into focus, and a quiet title card at the start of every section. Nothing is fast: things dissolve in slowly, and the bar at the bottom names the scene you are in like a subtitle. Good for film, media and design students, and for anyone who wants the site to show patience and a sense of framing.

## Must keep (this is what makes it Cinematic)
1. A dark, warm frame with black bars. The header is the top bar and (once JavaScript runs) a subtitle bar is the bottom bar, both pure black so the page reads as a widescreen picture.
2. Each section is a scene that starts with a centred title card: the section name in wide-spaced capitals between two thin rules.
3. Slow dissolves only: opacity, a touch of blur and a slight push-in. Nothing slides, bounces, snaps or is stepped. The page never moves sideways or upward as it reveals.
4. One accent colour (a curtain red), used for links and the underline that draws under them. Reading text stays warm off-white.
5. The letterbox opening at load is the one loud moment. Everything else is small and slow.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the accent gold". Their request wins.

Palette, in words: warm near-black for the frame; a slightly lighter warm grey for surfaces; pure black for the bars; projector-bone off-white for text; a warm grey for secondary text; one rose-red accent, like a velvet curtain. Contrast ratios are in the comments. Other accents that keep the feel: warm gold `#E2B866` (10.1:1 on the frame) or pale moonlight `#9CC3E6` (10.2:1 on the frame, 9.4:1 on surface; black on it 11.4:1). Check any other accent.

```css
:root {
  --color-bg: #121110;
  --color-surface: #1C1A18;
  --color-bar: #000000;         /* header, subtitle bar and opening masks */
  --color-text: #F2EDE3;        /* 16.2:1 on bg, 14.9:1 on surface, 18.0:1 on bar */
  --color-muted: #B5AEA1;       /* 8.6:1 on bg, 7.9:1 on surface, 9.5:1 on bar */
  --color-accent: #F2677A;      /* links: 6.3:1 on bg, 5.8:1 on surface, 7.0:1 on bar. Black on accent (selection) is 7.0:1 */
  --color-rule: #6B655D;        /* hairlines only, never text */
  --glow: rgb(242 103 122 / 0.14);  /* link-row light; text on it still passes: text 13.6:1, muted 7.2:1 */
  --font-display: "Jost", "Century Gothic", system-ui, sans-serif;
  --font-body: "Newsreader", Georgia, serif;
  --ease-dissolve: cubic-bezier(0.35, 0, 0.1, 1);   /* slow start, very long soft landing */
  --bar-h: 2.75rem;                                  /* subtitle bar height */
}
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: auto; }
body { margin: 0; background: var(--color-bg); color: var(--color-text); font-family: var(--font-body); font-size: 1.125rem; line-height: 1.65; }
h1, h2, h3 { margin: 0; font-family: var(--font-display); font-weight: 400; line-height: 1.15; } /* Jost is variable, so say the weight */
p { margin: 0 0 1em; }
ul { margin: 0; padding: 0; list-style: none; }
a { color: var(--color-accent); }
main { overflow-x: clip; }                   /* the slow push-in is slightly wider than its box */
main > section { width: min(100% - 2rem, 60rem); margin-inline: auto; } /* 16px gutters */
.scene { padding-block: clamp(4rem, 14vh, 8rem); }  /* or your spacing scale */
.scene p { max-width: 38rem; margin-inline: auto; } /* lines stay under 80 characters */
::selection { background: var(--color-accent); color: var(--color-bar); }
:focus-visible { outline: 3px solid var(--color-text); outline-offset: 3px; }
[tabindex="-1"]:focus { outline: none; }     /* sections get focus after a jump; they are not controls */
```
Fonts: Jost (variable) for the name, title cards and bars; Newsreader for reading text. Alternatives: Josefin Sans or Raleway for display, Libre Caslon Text for body. Avoid Bodoni Moda (Editorial) and JetBrains Mono (Terminal).
`<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap" rel="stylesheet">`
Corners stay square.

Film grain and vignette: two static overlays, no animation. The grain is one small tile at 5% opacity, the vignette darkens the extreme corners by at most 15%. Text still passes there, even with average grain on top (muted text 6.0:1, accent links 4.5:1). Keep both overlays `pointer-events: none` and never animate or blend them.
```css
body::before { content: ""; position: fixed; inset: 0; z-index: 5; pointer-events: none; opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E"); }
body::after { content: ""; position: fixed; inset: 0; z-index: 4; pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 60%, rgb(0 0 0 / 0.15) 100%); }
```

## Layout ideas
- **Header (the top bar):** black, with the student's name as a small wide-spaced link to `#home` and the five real section links. On phones it scrolls away normally and the links wrap to a second row (each at least 44px tall). From 48rem wide it sticks to the top.
- **Hero:** the real name very large in light weight capitals, with the one-line intro under it (the one-line intro from SPEC.md; if SPEC.md has no separate tagline, use the "Who I am" line without the name). Vertically centred in a tall frame. Check the longest word of the name at 320px.
- **About:** a title card, then the real bio in one centred column.
- **Projects:** laid out like end credits. On wide screens the project name sits right-aligned in the left half and its description left-aligned in the right half, separated by a hairline. On phones each row stacks. The name is a link only if SPEC.md has one.
- **Skills:** the real skills as a centred stack of capitals, one per line.
- **Contact:** the real email and links, large and centred, one per line, with `overflow-wrap: anywhere`. Link text is the label SPEC.md gives next to a URL (for example "Vimeo"), never new wording.
- **Bottom bar:** no footer. The subtitle bar (moment 4) is the only bottom element.
- **Stills (optional):** only if the student has real images in `assets/` with alt text. Crop them wide (`aspect-ratio: 2.39 / 1; object-fit: cover`) and place them inside the project row; they dissolve in with their scene. Never add stock or invented images. A video only if SPEC.md gives a real one.

## Make it theirs
- The one loud thing is the letterbox opening. Title cards, dissolves and the subtitle bar stay quiet.
- The student's own work sets the details. Project names are exactly as written in SPEC.md, and the credits layout works for any field.
- Slow is the point, but never make a visitor wait: all text is in the HTML, readable within about two seconds, and any key press or tap finishes the opening at once.
- Clear scale: a very large name, medium title cards, calm body text. Capitals only on the name, title cards, nav and skills.

## Motion character
Tempo: 1000-1800ms dissolves, a ten second push-in, nothing under 250ms. Easing: `--ease-dissolve` for everything, plus `linear` for the push-in. What moves: opacity, `filter: blur()` on the hero name and title cards only, `transform` for the masks, the push-in and drawing rules. What never moves: paragraphs, project rows (they only light up) and the bars once they are open. The snippets share one `script.js`: put `reduce` first, then each moment in order. Keyframes used by several moments:

```css
@keyframes rack { from { opacity: 0; filter: blur(14px); } to { opacity: 1; filter: blur(0); } }  /* rack focus */
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes push { from { transform: none; } to { transform: scale(1.05); } }
@keyframes open-top { from { transform: none; } to { transform: translateY(-100%); } }
@keyframes open-bottom { from { transform: none; } to { transform: translateY(100%); } }
```
```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### 1. Page load: the title comes into focus
Right after the letterbox starts to open (moment 5), the name dissolves in from a blur, then the intro fades in, then the whole block pushes in very slowly for ten seconds and stops. Pure CSS, so the text is in the HTML and still shows without JavaScript. Any key press (Tab included, on purpose) or tap finishes the opening at once.

```html
<!-- the hero is the only section without the scene class -->
<section class="hero" id="home" aria-labelledby="home-title">
  <div class="hero-frame">
    <h1 id="home-title" class="hero-name">Your Name</h1>
    <p class="hero-intro">The one-line intro from SPEC.md.</p>
  </div>
</section>
```
```css
.hero { min-height: 75svh; display: grid; align-content: center; justify-items: center; text-align: center; padding-block: 3rem; }
.hero-frame { animation: push 10s linear both; }
.hero-name { font-size: clamp(2.25rem, 9vw, 5.5rem); font-weight: 300; letter-spacing: 0.14em; text-transform: uppercase; overflow-wrap: anywhere;
  animation: rack 1500ms var(--ease-dissolve) 250ms both; }
.hero-intro { margin: 1.5rem auto 0; max-width: 34rem; font-size: 1.25rem; font-style: italic; animation: fade 1200ms var(--ease-dissolve) 1000ms both; }
/* After a key press or tap the reveal ends at once. The push-in keeps going, so nothing jumps. */
.is-done .hero-name, .is-done .hero-intro, .is-done .mask { animation: none; }
```
```js
const finishOpening = () => document.documentElement.classList.add('is-done');
window.addEventListener('keydown', finishOpening, { once: true });
window.addEventListener('pointerdown', finishOpening, { once: true });
```

### 2. Scroll: each section opens with a title card
When a section reaches the lower part of the screen, its title card comes into focus: it dissolves in from a slight blur while pushing in a few percent, and the two rules grow outward from the title. The rest of the section dissolves in a moment later, with no movement up or down. JavaScript adds the hiding class, so without JavaScript everything is visible. Hidden content uses `opacity`, not `visibility`, so screen readers still read it and Tab still reaches its links; a section lights as soon as anything inside it gets focus.

Every section except the hero has `class="scene"`; the hero never does, or it would be hidden until scrolled to.
```html
<section class="scene" id="about" aria-labelledby="about-title">
  <h2 id="about-title" class="title-card">About</h2>
  <p>The real bio from SPEC.md.</p>
</section>
```
```css
.title-card { display: flex; align-items: center; gap: 1rem; margin-bottom: clamp(2rem, 6vw, 3.5rem); text-align: center;
  font-size: clamp(1.25rem, 5vw, 2.25rem); letter-spacing: 0.3em; text-transform: uppercase; }
.title-card::before, .title-card::after { content: ""; flex: 1 1 0; height: 1px; background: var(--color-rule); }
.title-card::before { transform-origin: right; }
.title-card::after { transform-origin: left; }
/* Hidden start (added by JavaScript only). */
.will-dissolve .title-card { opacity: 0; filter: blur(8px); transform: scale(0.97); }
.will-dissolve .title-card::before, .will-dissolve .title-card::after { transform: scaleX(0); }
.will-dissolve > :not(.title-card) { opacity: 0; }
/* The lit rules have one more class than the hidden ones, so they win. */
.will-dissolve.is-lit .title-card { opacity: 1; filter: none; transform: none;
  transition: opacity 1400ms var(--ease-dissolve), filter 1400ms var(--ease-dissolve), transform 1800ms var(--ease-dissolve); }
.will-dissolve.is-lit .title-card::before, .will-dissolve.is-lit .title-card::after { transform: none; transition: transform 1600ms var(--ease-dissolve) 200ms; }
.will-dissolve.is-lit > :not(.title-card) { opacity: 1; transition: opacity 1000ms var(--ease-dissolve) 450ms; }
.will-dissolve.is-lit > :nth-child(3) { transition-delay: 600ms; }
.will-dissolve.is-lit > :nth-child(n + 4) { transition-delay: 750ms; }
/* Something inside has keyboard focus: show the content at once, so a focused link is never invisible. */
.will-dissolve.is-lit:focus-within > :not(.title-card) { transition: none; }
```
```js
const scenes = [...document.querySelectorAll('main .scene')];   // every section except the hero
if (!reduce && 'IntersectionObserver' in window) {
  const waiting = new Set(scenes);
  function light(scene) { scene.classList.add('is-lit'); waiting.delete(scene); io.unobserve(scene); }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also light scenes already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) light(entry.target);
    });
  }, { rootMargin: '0px 0px -15% 0px' });
  scenes.forEach((scene) => { scene.classList.add('will-dissolve'); io.observe(scene); });
  // Keyboard users: a scene lights as soon as Tab lands inside it.
  document.addEventListener('focusin', (event) => {
    const scene = event.target.closest('.will-dissolve');
    if (scene) light(scene);
  });
  // A short last scene may never reach the trigger line: at the very bottom, light whatever is left.
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) [...waiting].forEach(light);
  }, { passive: true });
}
```

### 3. Hover and focus: a line draws, a lamp warms
Links get an accent underline that is a short dash at rest (so a link never relies on colour alone) and draws to full width on hover and keyboard focus. A project row that contains a real link warms with a soft red glow. Only real links react: rows without a link do nothing.

```html
<li class="project-row">
  <h3 class="row-title"><a class="reel-link" href="https://example.com/project">Project name from SPEC.md</a></h3> <!-- no <a>, and no href, if SPEC.md has no link -->
  <p class="row-desc">The one-sentence description from SPEC.md.</p>
</li>
```
```css
.project-list { margin-top: 2rem; }
.project-row { position: relative; isolation: isolate; padding-block: 1.75rem; border-top: 1px solid var(--color-rule); }
.project-row::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: 0;
  background: linear-gradient(90deg, var(--glow), transparent 75%); transition: opacity 700ms var(--ease-dissolve); }
.project-row:focus-within::after { opacity: 1; }
@media (hover: hover) { .project-row:has(a:hover)::after { opacity: 1; } }
.row-title { font-size: clamp(1.375rem, 5vw, 1.875rem); font-weight: 500; letter-spacing: 0.04em; overflow-wrap: anywhere; }
.row-desc { max-width: 34rem; margin: 0.5rem 0 0; color: var(--color-muted); }
.reel-link { position: relative; display: inline-flex; align-items: center; min-height: 44px; color: var(--color-accent); text-decoration: none; }
.reel-link::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0.5rem; height: 2px; background: currentColor;
  transform: scaleX(0.2); transform-origin: left; transition: transform 700ms var(--ease-dissolve); }
.reel-link:focus-visible::after { transform: none; }
@media (hover: hover) { .reel-link:hover::after { transform: none; } }
@media (min-width: 48rem) {   /* end credits: name in the left half, description in the right half */
  .project-row { display: grid; grid-template-columns: 1fr 1fr; column-gap: 3rem; align-items: baseline; }
  .row-title { text-align: right; }
  .row-desc { margin: 0; }
}
```
Contact and skill lists use the same pieces. Every contact link (email and URL) is also `class="reel-link"`, for example `<li><a class="reel-link" href="mailto:...">the email from SPEC.md</a></li>` inside `<ul class="contact-list">`; skills sit in `<ul class="credit-list">`.
```css
.credit-list li { padding-block: 0.5rem; text-align: center; font-family: var(--font-display); font-size: clamp(1rem, 3.6vw, 1.25rem); font-weight: 300; letter-spacing: 0.24em; text-transform: uppercase; overflow-wrap: anywhere; }
.contact-list li { text-align: center; font-size: clamp(1rem, 4.6vw, 1.75rem); overflow-wrap: anywhere; } /* a real email fits on one line at 320px */
```

### 4. Navigation: the subtitle bar and the dip to black
The bottom bar shows the name of the scene on screen, like a subtitle, and fades to the next name when you move on. The matching nav link keeps its underline. Clicking a nav link dips the picture to black for a moment and lands on the section (a cut, not a scroll), at most once per second; clicks inside that second cut at once. After a jump, that link stays current until the visitor scrolls on their own (wheel, touch, scroll keys) or the section leaves the screen, so a short last section is never taken over by the one before it.

```html
<header class="site-header">
  <div class="header-row">
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
.site-header { background: var(--color-bar); }
.header-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; column-gap: 1rem; width: min(100% - 2rem, 60rem); margin-inline: auto; }
.brand, .site-nav a { position: relative; display: inline-flex; align-items: center; min-height: 44px; font-family: var(--font-display); font-size: 0.875rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-text); text-decoration: none; }
.site-nav { display: flex; flex-wrap: wrap; margin-inline: -0.625rem; }   /* five links wrap to a second row at 320px; the negative margin lines their text up with the brand */
.site-nav a { padding-inline: 0.625rem; }
.site-nav a::after { content: ""; position: absolute; left: 0.625rem; right: 0.625rem; bottom: 0.55rem; height: 2px; background: var(--color-accent);
  transform: scaleX(0); transform-origin: left; transition: transform 600ms var(--ease-dissolve); }
.site-nav a:focus-visible::after, .site-nav a[aria-current="location"]::after { transform: none; }
@media (hover: hover) { .site-nav a:hover::after { transform: none; } }
/* The subtitle bar and the dip are added by JavaScript, so without JavaScript the page has neither. The has-bars class is set on <html>. */
.subtitle-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 20; display: flex; align-items: center; justify-content: center;
  height: calc(var(--bar-h) + env(safe-area-inset-bottom)); padding-bottom: env(safe-area-inset-bottom); background: var(--color-bar); }
.subtitle { font-family: var(--font-display); font-size: 1rem; letter-spacing: 0.12em; transition: opacity 500ms var(--ease-dissolve); }
.subtitle.is-off { opacity: 0; }
.has-bars body { padding-bottom: calc(var(--bar-h) + env(safe-area-inset-bottom)); }   /* the bar never covers the last lines */
.dip { position: fixed; inset: 0; z-index: 40; pointer-events: none; background: var(--color-bar); opacity: 0; transition: opacity 700ms var(--ease-dissolve); }
.dip.is-black { opacity: 0.95; transition-duration: 260ms; }
section[id] { scroll-margin-top: 1rem; }
@media (min-width: 48rem) {
  .site-header { position: sticky; top: 0; z-index: 20; }
  section[id] { scroll-margin-top: 4rem; }          /* use your header's height */
}
```
```js
const navLinks = [...document.querySelectorAll('.site-nav a')];      // these name the scenes
const jumpLinks = [...document.querySelectorAll('.brand, .site-nav a')];  // these jump (the brand link also goes home)
const sections = [...document.querySelectorAll('main section[id]')];
const bar = document.createElement('div');         // the subtitle bar: decorative, repeats the real section name
bar.className = 'subtitle-bar';
bar.setAttribute('aria-hidden', 'true');
const subtitle = document.createElement('span');
subtitle.className = 'subtitle';
bar.append(subtitle);
const dip = document.createElement('div');
dip.className = 'dip';
dip.setAttribute('aria-hidden', 'true');
document.body.append(bar, dip);
document.documentElement.classList.add('has-bars');

let want = '', subtitleTimer = 0, locked = null, dipTimer = 0, lastDip = -Infinity;   // locked: { id, seen } while a jump settles

function setSubtitle(text) {
  if (!text || text === want) return;
  want = text;
  if (reduce || !subtitle.textContent) { subtitle.textContent = text; return; }
  subtitle.classList.add('is-off');
  clearTimeout(subtitleTimer);
  subtitleTimer = setTimeout(() => { subtitle.textContent = want; subtitle.classList.remove('is-off'); }, 400);
}
function setCurrent(id) {
  navLinks.forEach((a) => {
    if (a.hash !== '#' + id) { a.removeAttribute('aria-current'); return; }
    a.setAttribute('aria-current', 'location');
    setSubtitle(a.textContent.trim());
  });
}
function currentFromScroll() {
  if (window.scrollY < 8) return sections[0].id;                                                                                 // top: home
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

function land(id) {
  const target = document.getElementById(id);
  target.scrollIntoView();                          // instant; scroll-margin-top keeps the heading clear of the header
  history.replaceState(null, '', '#' + id);
  target.setAttribute('tabindex', '-1');            // so keyboard users continue from the new section
  target.focus({ preventScroll: true });
  jump(id);
}
function goTo(id) {
  if (!document.getElementById(id)) return;
  clearTimeout(dipTimer);
  const now = performance.now();
  if (reduce || now - lastDip < 1000) { dip.classList.remove('is-black'); land(id); return; }   // at most one dip per second
  lastDip = now;
  dip.classList.add('is-black');
  dipTimer = setTimeout(() => { land(id); dip.classList.remove('is-black'); }, 260);
}
jumpLinks.forEach((a) => a.addEventListener('click', (e) => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || !document.getElementById(a.hash.slice(1))) return;
  e.preventDefault();
  goTo(a.hash.slice(1));
}));
window.addEventListener('hashchange', () => jump(location.hash.slice(1)));   // only fires for the back button or a typed #hash; nav clicks go through goTo
['wheel', 'touchmove'].forEach((type) => window.addEventListener(type, release, { passive: true }));
window.addEventListener('keydown', (e) => { if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) release(); });
let ticking = false;                                // one frame per scroll burst, no loop
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { ticking = false; updateNav(); });
}, { passive: true });
window.addEventListener('resize', updateNav);
if (location.hash.length > 1) jump(location.hash.slice(1));
updateNav();
```

### 5. Signature: the letterbox opens
At load the frame is cropped by two black bars, each about a fifth of the screen. After a beat they slide off the top and bottom over 1.3 seconds, revealing the header, the hero and the bottom bar in place, while the name comes into focus behind them. Pure CSS and decorative. A full-page screenshot (or print) misplaces fixed bars and masks; check with a normal viewport capture. The masks rest off screen in their base style, so if animation is ever off they are simply not there.

```html
<!-- first children of <body>, before the header -->
<div class="mask mask-top" aria-hidden="true"></div>
<div class="mask mask-bottom" aria-hidden="true"></div>
```
```css
.mask { position: fixed; left: 0; right: 0; z-index: 30; height: 22vh; background: var(--color-bar); pointer-events: none; }
.mask-top { top: 0; transform: translateY(-100%); animation: open-top 1300ms var(--ease-dissolve) 300ms both; }
.mask-bottom { bottom: 0; transform: translateY(100%); animation: open-bottom 1300ms var(--ease-dissolve) 300ms both; }
```
Keep the hero vertically centred so it sits between the masks while they open. For a quieter version, use `12vh` masks.

## Safety and performance
- Nothing flashes. The opening runs once. The dip to black is a smooth fade, only after a click, at most once per second.
- Grain and vignette are static (one composited layer each). Blur runs only on the hero name and title cards, only until they are in. No `will-change`, animated grain, `mix-blend-mode` or video background.
- No loop runs on its own. Scroll work is one rAF per scroll burst.

## Reduced motion
The masks and the dip are hidden, every dissolve is skipped and everything is visible straight away. The last block in the file wins; keep it last.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .mask, .dip { display: none; }
  .will-dissolve .title-card { opacity: 1; filter: none; transform: none; }
  .will-dissolve .title-card::before, .will-dissolve .title-card::after { transform: none; }
  .will-dissolve > :not(.title-card) { opacity: 1; }
}
```

## Libraries
None. Plain CSS and JavaScript do everything here. Do not add GSAP, a video player or a grain library: the effects are a few lines of `opacity`, `filter` and `transform`.

## Avoid
- Teal-and-orange "movie poster" colour grading, lens flares, film-strip sprocket borders, clapperboard or camera emoji.
- Fake production detail: timecodes, a "REC" dot, "4K", frame counters, runtimes, credits, festival laurels, awards, ratings. Every word on the page comes from SPEC.md.
- Scroll-jacking or pinned scenes that hold the visitor in place. The dip is a one-off, not a replacement for scrolling.
- Animated or heavy grain, a flickering projector, shake, or any video or audio that plays by itself.
- Bars that stay thick and crop the content. After the opening, the bars are slim and only the header and subtitle bar remain.
- Slides, bounces or zoom on paragraphs. Dissolves only; the one push-in is the hero.
- Generic page habits: a "→" after every link, "A · B · C" strings, 01 / 02 / 03 numbering, one word of a headline picked out in the accent, an ALL-CAPS label above every heading, a fade-up on every section, the same rounded card with a soft shadow everywhere.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
