---
name: vibe-mission-control
description: Restyles the portfolio site as a space mission control room, with framed console panels, a traced orbit diagram and text that resolves out of scramble (look, layout and motion). Use ONLY when the student names the vibe-mission-control skill or asks for the Mission Control vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: major
  tags: "space-eng, engineering"
  intensity: standard
  version: "2"
---

# Vibe: Mission Control

## Feel and who it's for
The portfolio feels like a flight-control room in the quiet minutes between events: an indigo-black wall, a few framed console panels, and one big orbit diagram where a small craft keeps circling a planet. Panels power up when you reach them and headings resolve out of scrambled letters. Focused and calm, never frantic. Good for space, aerospace and mechanical engineering students who want a recruiter to see "this person thinks in orbits, systems and subsystems".

## Must keep (this is what makes it Mission Control)
1. An indigo-black screen with every section as a framed console panel: square corners, a thin border, small corner brackets, and a title strip with one status lamp.
2. One orbit diagram in the hero: three ellipses sharing one focus, a planet at that focus, and one craft dot (with a short trail) moving faster near the planet. No text, no numbers on it.
3. Two signal colours with one job each. Pale periwinkle is the "path" colour: links, orbit lines, brackets, the current tab. Ember orange is the "craft" colour: the craft dot and the focus ring, nothing else. Reading text is off-white, never periwinkle or ember.
4. Motion is smooth and symmetrical, like a burn throttling up and down: sine-shaped easing, traced lines, panels that ramp in. The only scramble is short, runs once per heading and always resolves to the real text.

## Starting defaults (change freely)
The student can say "make the craft green" or "make it lighter". Their request wins. If they change a colour, recompute its contrast on bg, surface and surface-2.

Palette, in words: indigo-black wall, slightly lighter console panels, off-white text, a muted lavender-grey for secondary text, pale periwinkle for paths, ember orange for the craft, a dim violet for decorative lines.

```css
:root {
  /* Contrast, computed (on bg / surface / surface-2). text 16.1 / 14.9 / 13.4. muted 8.8 / 8.1 / 7.3.
     accent 10.4 / 9.6 / 8.7. craft 7.5 / 6.9 / 6.2. Bg-coloured text on an accent fill 10.4, on a craft fill 7.5.
     --color-dim (3.8 / 3.6 / 3.2) and --color-border are lines and brackets only, never text. */
  --color-bg: #0E0E1B; --color-surface: #171629; --color-surface-2: #201F38;
  --color-text: #ECEAF6; --color-muted: #B0ACCB; --color-border: #37355E; --color-dim: #6C69A8;
  --color-accent: #BDB9F2; /* path colour: links, orbit lines, current tab */
  --color-craft: #FF7A59;  /* craft dot and focus ring only */
  --font-display: "Michroma", "Segoe UI", sans-serif; /* one weight, wide */
  --font-body: "Manrope", system-ui, sans-serif;
  --font-label: "Martian Mono", ui-monospace, monospace;
  --ease-ramp: cubic-bezier(0.45, 0.05, 0.55, 0.95); /* slow, steady, slow: symmetrical like a throttle ramp */
  --header-h: 2.75rem; /* the sticky tab bar; its border sits inside this height */
}
```
Fonts: Michroma for the name and panel titles (wide, instrument-like, a single weight), Manrope for reading, Martian Mono only for tiny labels and chips. Alternatives: Syncopate or Krona One for display, Plus Jakarta Sans for body. Not Inter, and not Chakra Petch (Oscilloscope) or JetBrains Mono (Terminal).

Base rules (put these right after the tokens):
```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: auto; scroll-padding-top: calc(var(--header-h) + 0.75rem); } /* the only offset for jumps: no scroll-margin-top as well */
body { margin: 0; background: var(--color-bg); color: var(--color-text); font: 400 1rem/1.65 var(--font-body); overflow-x: clip; }
h1, h2, h3 { margin: 0; font-family: var(--font-display); font-weight: 400; line-height: 1.25; } /* Michroma has one weight: 400 stops fake bold */
h3 { margin-bottom: 0.25rem; font: 700 1.125rem/1.35 var(--font-body); }
p { margin: 0 0 1rem; max-width: 62ch; }
p:last-child { margin-bottom: 0; }
ul { margin: 0; padding: 0; list-style: none; }
a { color: var(--color-accent); text-underline-offset: 0.2em; }
:focus-visible { outline: 2px solid var(--color-craft); outline-offset: 3px; }
::selection { background: var(--color-accent); color: var(--color-bg); }
.skip-link { position: absolute; left: 0.5rem; top: -4rem; z-index: 20; padding: 0.75rem 1rem; background: var(--color-accent); color: var(--color-bg); }
.skip-link:focus { top: 0.5rem; }
main { width: min(100% - 2rem, 64rem); margin-inline: auto; padding-block: 1.5rem 3rem; } /* 16px gutters */
```
Corners stay square. No gradients (except the bracket lines below), no shadows, no glow.

## Layout ideas
- **Head.** Every page starts like this. Title is the student's name, description is the one-line intro, both from SPEC.md.
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
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&family=Martian+Mono:wght@400;500&family=Michroma&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
</head>
```
- **Body order.** `<body>`, the skip link, `<header class="site-header">` (tabs only), then `<main id="main">` holding the hero and the panels. The snippets below are exactly those parts.
- **Assembly.** `styles.css`: tokens, base rules, this section's layout CSS, the shared block, moments 1 to 5 in order, reduced motion last. `script.js` (one file, loaded once): the shared block first (`motion`, `sections`, `scramble` are declared there once), then moments 1, 2, 4, 5. Moment 3 is CSS only.
- **Header:** `<a class="skip-link" href="#main">Skip to content</a>`, then `<header class="site-header">` holding only the sticky tab bar (the nav). Tabs are the real section names. No footer needed; if you add one it holds only SPEC.md content.
- **Hero:** two columns on desktop (name and intro left, orbit panel right), stacked on phones. The intro is the one-line intro from SPEC.md; with no separate tagline, take the "Who I am" line, drop the name and the comma after it, and capitalise the first letter ("Second-year Space Engineering student at York University.").
- **About, Projects, Skills, Contact:** one console panel each, in the order of SPEC.md's Sections line. Projects are small inner cards: name, description, and a link only if SPEC.md has one. If a project line carries a "Label: url", the description is the text before it and the address appears only as the link. Skills are chips; Contact is the real email and links, one per line.
- **Printed from SPEC.md:** the name, "Who I am", About me, Projects, Skills and Contact. Never printed: "Audience and goal", "Sections", "Vibe and feel". Link text is the label SPEC.md gives (for example "LinkedIn", "Code") or the address itself for the email.
- **Labels:** the only decorative label is the "Home" tag in the orbit panel's strip (`aria-hidden`, a real section name). Content panels use their real `<h2>` as the title strip, so nothing is written twice.

```html
<section class="hero" id="home" aria-labelledby="home-title">
  <div class="hero-grid">
    <div class="hero-copy">
      <h1 id="home-title" class="hero-name scramble">The student's name from SPEC.md</h1>
      <p class="hero-intro">The one-line intro from SPEC.md.</p>
    </div>
    <div class="orbit-panel">
      <div class="orbit-bar"><p class="panel-tag" aria-hidden="true">Home</p><button class="orbit-toggle" type="button">Pause orbit</button></div>
      <svg class="orbit-svg" viewBox="0 0 400 300" aria-hidden="true" focusable="false">
        <g transform="translate(168 159)">
          <g class="orbit" transform="rotate(160)"><path class="track" pathLength="1" d="M56 0A140 112 0 1 1 -224 0A140 112 0 1 1 56 0Z"/></g>
          <g class="orbit orbit-craft" transform="rotate(-35)" data-rx="104" data-ry="78">
            <path class="track" pathLength="1" d="M35.2 0A104 78 0 1 1 -172.8 0A104 78 0 1 1 35.2 0Z"/>
            <circle class="trail t4" r="2"/><circle class="trail t3" r="2.6"/><circle class="trail t2" r="3.2"/><circle class="trail t1" r="3.8"/>
            <circle class="craft" r="5"/>
          </g>
          <g class="orbit" transform="rotate(80)"><path class="track" pathLength="1" d="M26.7 0A68 54 0 1 1 -109.3 0A68 54 0 1 1 26.7 0Z"/></g>
          <circle class="planet" r="10"/>
        </g>
      </svg>
    </div>
  </div>
</section>
<section class="panel" id="about" aria-labelledby="about-title">
  <div class="panel-head"><span class="lamp" aria-hidden="true"></span><h2 id="about-title" class="panel-title scramble">About</h2></div>
  <div class="panel-body"><p>The real bio from SPEC.md.</p></div>
</section>
<!-- Projects: <ul class="project-list"><li class="project"><h3 id="project-1">Name</h3><p>Description</p></li></ul>
     Add <a href="the link from SPEC.md" aria-describedby="project-1">Label from SPEC.md</a> only for a project that has a link.
     Skills: <ul class="chips"><li>Skill</li></ul>.  Contact: <ul class="contact-list"><li><a href="mailto:the address">the address</a></li></ul> -->
```
The three ellipses share the planet as one focus; `data-rx` and `data-ry` on the craft's group repeat its path's radii, and the script reads them.
```css
.panel, .orbit-panel { position: relative; background: var(--color-surface); border: 1px solid var(--color-border); --bracket-color: var(--color-dim); }
.panel { margin-top: 1.5rem; }
/* Corner brackets: eight thin lines on a pseudo-element that sits over the border. */
.panel::before, .orbit-panel::before, .project::before {
  content: ""; position: absolute; inset: -1px; pointer-events: none;
  --b: linear-gradient(var(--bracket-color), var(--bracket-color));
  background: var(--b) 0 0 / 14px 2px no-repeat, var(--b) 0 0 / 2px 14px no-repeat, var(--b) 100% 0 / 14px 2px no-repeat, var(--b) 100% 0 / 2px 14px no-repeat,
    var(--b) 0 100% / 14px 2px no-repeat, var(--b) 0 100% / 2px 14px no-repeat, var(--b) 100% 100% / 14px 2px no-repeat, var(--b) 100% 100% / 2px 14px no-repeat;
}
.panel-head { display: flex; align-items: center; gap: 0.75rem; min-height: 3rem; padding: 0.5rem 1rem; background: var(--color-surface-2); border-bottom: 1px solid var(--color-border); }
.panel-title { font-size: 1rem; letter-spacing: 0.02em; }
.panel-body { padding: 1rem; }
.lamp { flex: none; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--color-accent); }
.hero-grid { display: grid; gap: 1.5rem; }
.hero-name { font-size: clamp(1.75rem, 8.5vw, 3.5rem); overflow-wrap: anywhere; }
.hero-intro { margin-top: 1rem; font-size: 1.25rem; color: var(--color-muted); }
.orbit-bar { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; min-height: 44px; padding-left: 0.75rem; background: var(--color-surface-2); border-bottom: 1px solid var(--color-border); }
.panel-tag { margin: 0; font: 500 0.75rem/1.2 var(--font-label); color: var(--color-muted); }
.orbit-toggle { min-height: 44px; padding: 0 0.75rem; border: 0; background: none; color: var(--color-accent); font: 500 0.75rem/1 var(--font-label); cursor: pointer; }
.orbit-toggle:focus-visible { outline-offset: -4px; } /* the ring stays inside the strip */
.orbit-svg { display: block; width: 100%; height: auto; aspect-ratio: 4 / 3; }
.track { fill: none; stroke: var(--color-dim); stroke-width: 1.5; }
.orbit-craft .track { stroke: var(--color-accent); }
.planet { fill: var(--color-dim); stroke: var(--color-accent); stroke-width: 1.5; }
.craft, .trail { fill: var(--color-craft); }
.trail.t1 { opacity: 0.6; } .trail.t2 { opacity: 0.4; } .trail.t3 { opacity: 0.25; } .trail.t4 { opacity: 0.12; }
.project-list { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); }
.project { position: relative; padding: 1rem; background: var(--color-surface-2); border: 1px solid var(--color-border); --bracket-color: var(--color-accent); }
.project a { display: inline-flex; align-items: center; min-height: 44px; }
.chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.chips li { padding: 0.375rem 0.75rem; background: var(--color-surface-2); border: 1px solid var(--color-border); font: 400 0.8125rem/1.4 var(--font-label); } /* not links, so they never react */
.contact-list a { display: inline-flex; align-items: center; min-height: 44px; font-size: clamp(0.9375rem, 4.2vw, 1.125rem); overflow-wrap: anywhere; }
@media (min-width: 48em) { .hero-grid { grid-template-columns: 1fr 1fr; align-items: center; gap: 2.5rem; } .hero-name { font-size: clamp(2.5rem, 5vw, 3.5rem); } }
```

## Make it theirs
- The one loud thing is the orbit diagram tracing itself and the craft starting to move; the other four moments stay small. Their own work sets the details: project names, tools and course topics are the text. No mission name, countdown, coordinates or readouts; a panel says only what SPEC.md says.
- Type: a large name, 1rem panel titles, 1rem body, lines under 62 characters. Michroma is wide, so keep titles short and check the longest word of the name at 320px.

## Motion character
Tempo: panels ramp in 700ms, the orbit lines trace over 1.6s, a heading scramble lasts 700ms, the craft circles once every 32 seconds. Easing: `var(--ease-ramp)` for everything that eases; the craft gets its speed from Kepler's law (fast near the planet), not from a curve. Only `transform`, `opacity` and `clip-path` animate, with one exception: `stroke-dashoffset`, because tracing an SVG line needs it. JavaScript may write transforms, custom properties and text. Never moves: paragraphs, chips, tabs (apart from the current mark), cards without a link.

Shared CSS (keyframes and the scramble look, used by several moments):
```css
@keyframes ramp { from { opacity: 0; clip-path: inset(0 0 100% 0); } to { opacity: 1; clip-path: inset(-0.5rem); } } /* top-down wipe; the end value leaves room for focus rings */
@keyframes trace { from { stroke-dasharray: 1; stroke-dashoffset: 1; } to { stroke-dasharray: 1; stroke-dashoffset: 0; } }
@keyframes appear { from { opacity: 0; } }
.is-scrambling { position: relative; color: transparent; } /* the real text stays in the DOM and in the accessible name */
.sc-view { position: absolute; inset: 0; color: var(--color-text); white-space: pre-wrap; overflow-wrap: anywhere; pointer-events: none; }
.sc-live { color: var(--color-accent); }
.panel-title .sc-view { white-space: nowrap; } /* a short title never wraps while its letters change width */
```
Shared JS (first in `script.js`):
```js
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const sections = [...document.querySelectorAll('main section[id]')];

// Scramble: letters flicker, then settle left to right into the real text, once per element, about 700ms.
// An aria-hidden copy sits over the real text, which is never changed, so screen readers read the real heading.
const scrambled = new WeakSet();
function randomLike(ch) { // same kind of character, so the shape of the word stays readable
  if (/\p{Lu}/u.test(ch)) return String.fromCharCode(65 + Math.floor(Math.random() * 26));
  if (/\p{Ll}/u.test(ch)) return String.fromCharCode(97 + Math.floor(Math.random() * 26));
  if (/\p{Nd}/u.test(ch)) return String(Math.floor(Math.random() * 10));
  return ch; // spaces and punctuation never change
}
function scramble(el, delay = 0) {
  if (!el || motion.matches || scrambled.has(el)) return;
  scrambled.add(el);
  const real = [...el.textContent.trim()];
  const view = document.createElement('span');
  view.className = 'sc-view';
  view.setAttribute('aria-hidden', 'true');
  const cells = real.map((ch) => { const cell = document.createElement('span'); cell.textContent = ch; view.append(cell); return cell; });
  const settleAt = real.map((_, i) => (i / real.length) * 0.75 + Math.random() * 0.25); // share of the duration
  el.classList.add('is-scrambling');
  el.append(view);
  const DURATION = 700, TICK = 45; // a letter changes about 22 times a second, each one small and dim
  let start = 0, lastTick = -TICK;
  function frame(now) {
    if (!start) start = now + delay;
    const t = now - start;
    if (t >= DURATION) { view.remove(); el.classList.remove('is-scrambling'); return; }
    if (t >= 0 && now - lastTick >= TICK) { // writes only, no layout reads
      lastTick = now;
      cells.forEach((cell, i) => {
        const settled = t / DURATION >= settleAt[i];
        cell.textContent = settled ? real[i] : randomLike(real[i]);
        cell.classList.toggle('sc-live', !settled && cell.textContent !== ' ');
      });
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
```

### 1. Page load: the console wakes
The name, the intro and the orbit panel ramp in one after another, and the name scrambles into place. The ramp is pure CSS, so the text is in the HTML and shows if JavaScript fails; the longest delay is 350ms.
```css
.hero-name { animation: ramp 700ms var(--ease-ramp) backwards; }
.hero-intro { animation: ramp 700ms var(--ease-ramp) 200ms backwards; }
.orbit-panel { animation: ramp 700ms var(--ease-ramp) 350ms backwards; }
```
```js
scramble(document.querySelector('.hero-name'), 150);
```

### 2. Scroll: panels ramp up
When a panel arrives, its title strip and then its body wipe in from the top while their opacity rises, the lamp lights, and the title scrambles once. Until then the panel frame is already there and its contents are transparent (`opacity`, not `visibility`), so screen readers and Tab still reach everything, and a panel appears at once (no animation) the moment anything inside gets focus. JavaScript adds `will-ramp`, never the HTML, and only when motion is allowed, so without it everything is simply visible.
```css
.will-ramp > * { opacity: 0; }
/* .will-ramp.is-ramped > * (three classes of weight) beats the hiding rule above, so the animation is never cancelled. */
.will-ramp.is-ramped > * { opacity: 1; animation: ramp 700ms var(--ease-ramp) backwards; }
.will-ramp.is-ramped > :nth-child(2) { animation-delay: 140ms; }
.will-ramp.is-ramped .lamp { animation: appear 500ms var(--ease-ramp) 600ms backwards; } /* the lamp lights after the strip is up */
.will-ramp.is-instant > *, .will-ramp.is-instant .lamp { animation: none !important; } /* focus: show now, never leave a focused control hidden */
```
```js
function ramp(panel, instant = false) {
  if (instant) panel.classList.add('is-instant'); // no ramp, no scramble
  if (panel.classList.contains('is-ramped')) return;
  panel.classList.add('is-ramped');
  if (!instant) scramble(panel.querySelector('.scramble'), 100);
}
function replay(panel) { // used by navigation: restart the ramp, without scrambling again
  if (motion.matches) return;
  panel.classList.remove('is-ramped', 'is-instant');
  void panel.offsetWidth; // the only layout read, once per jump, so the animation restarts
  panel.classList.add('is-ramped');
}
if (!motion.matches && 'IntersectionObserver' in window) {
  const arrival = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also ramp panels already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) { ramp(entry.target); arrival.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -15% 0px' });
  document.querySelectorAll('main .panel').forEach((panel) => { panel.classList.add('will-ramp'); arrival.observe(panel); });
  // Keyboard users: a panel ramps as soon as Tab lands inside it.
  document.addEventListener('focusin', (event) => { const panel = event.target.closest('.will-ramp'); if (panel) ramp(panel, true); });
}
```
The bottom-of-page check for a short last panel is in the navigation script.

### 3. Hover and focus: the reticle locks on
Only a project that has a real link reacts: four bracket lines close in on its corners from slightly outside (260ms). Pointing at the link or tabbing into it does it. Cards, chips and panels without a link do nothing. Links themselves just thicken their underline.
```css
a:hover { text-decoration-thickness: 2px; }
.project::before { opacity: 0; transform: scale(1.05); transition: opacity 260ms var(--ease-ramp), transform 260ms var(--ease-ramp); }
.project:focus-within::before { opacity: 1; transform: none; }
.project:has(a:hover)::before { opacity: 1; transform: none; } /* its own rule, so a browser without :has() still gets the one above */
```

### 4. Navigation: tabs and docking
The sticky tab bar marks the section you are in: its tab turns lighter and a periwinkle line traces along the bottom (260ms). Jumping is a cut, not a scroll, and the target panel ramps up again as you arrive. The tabs share the bar equally, so five names fit at 320px; with longer names or more than five sections let the list wrap (`flex-wrap: wrap`, `li { flex: 1 0 33% }`) and raise `--header-h` to the wrapped height on phones.
```html
<header class="site-header"><nav class="tabs" aria-label="Sections"><ul>
  <li><a href="#home" aria-current="location">Home</a></li><li><a href="#about">About</a></li><li><a href="#projects">Projects</a></li>
</ul></nav></header>
```
```css
.site-header { position: sticky; top: 0; z-index: 10; height: var(--header-h); background: var(--color-bg); box-shadow: inset 0 -1px 0 var(--color-border); } /* the line is inside the height */
.tabs, .tabs ul { height: 100%; }
.tabs ul { display: flex; width: min(100%, 64rem); margin-inline: auto; }
.tabs li { flex: 1 1 0; min-width: 0; }
.tabs a { position: relative; display: flex; align-items: center; justify-content: center; height: 100%; min-height: 44px; padding: 0 2px; font: 700 clamp(0.72rem, 3.3vw, 0.875rem) var(--font-body); color: var(--color-muted); text-align: center; text-decoration: none; overflow-wrap: anywhere; }
.tabs a::after { content: ""; position: absolute; inset: auto 0 0 0; height: 2px; background: var(--color-accent); transform: scaleX(0); transform-origin: left; transition: transform 260ms var(--ease-ramp); }
.tabs a[aria-current] { color: var(--color-text); background: var(--color-surface-2); }
.tabs a[aria-current]::after { transform: scaleX(1); }
.tabs a:focus-visible { outline-offset: -4px; } /* inside the bar, never clipped by the screen edge */
@media (min-width: 48em) { .tabs li { flex: 0 0 8rem; } .tabs ul { width: min(100% - 2rem, 64rem); } }
```
```js
const tabs = [...document.querySelectorAll('.tabs a')];
const header = document.querySelector('.site-header');
let jumpedTo = '', spyQueued = false;
// After a jump that tab stays selected until the visitor scrolls on their own (wheel, touch, scroll keys; not Tab or Enter);
// otherwise a short last section loses to the one before it.
const release = () => { jumpedTo = ''; };
window.addEventListener('wheel', release, { passive: true });
window.addEventListener('touchmove', release, { passive: true });
window.addEventListener('keydown', (event) => { if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) release(); });
function selectTab(id) {
  tabs.forEach((tab) => {
    const on = tab.hash === '#' + id;
    if (on && tab.getAttribute('aria-current') !== 'location') tab.setAttribute('aria-current', 'location');
    if (!on) tab.removeAttribute('aria-current');
  });
}
function spy() {
  spyQueued = false;
  const line = header.offsetHeight + window.innerHeight * 0.25; // read everything first, then write
  const tops = sections.map((section) => section.getBoundingClientRect());
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  let id = sections[0].id;
  sections.forEach((section, i) => { if (tops[i].top <= line) id = section.id; }); // the last section whose top is above the line, so short sections count too
  if (atBottom) id = sections[sections.length - 1].id; // a short last section may never reach the line
  if (window.scrollY < 8) id = sections[0].id;
  const jumped = sections.findIndex((section) => section.id === jumpedTo);
  if (jumped > -1 && (tops[jumped].bottom < 0 || tops[jumped].top > window.innerHeight)) jumpedTo = ''; // it left the screen
  selectTab(jumpedTo || id);
  if (atBottom) ramp(sections[sections.length - 1]);
}
function queueSpy() { if (!spyQueued) { spyQueued = true; requestAnimationFrame(spy); } }
window.addEventListener('scroll', queueSpy, { passive: true });
window.addEventListener('resize', queueSpy);
window.addEventListener('hashchange', () => {
  const target = document.getElementById(location.hash.slice(1));
  jumpedTo = target && target.matches('main section[id]') ? target.id : '';
  if (jumpedTo) selectTab(jumpedTo);
  if (target && target.classList.contains('will-ramp') && target.classList.contains('is-ramped')) replay(target);
});
spy();
```

### 5. Signature: the orbit
On load the three ellipses draw themselves one after another (1.6s each, started 300ms apart), the planet and the craft dot fade in, and then the craft starts to circle. It follows Kepler's speed on its own ellipse, quick as it passes the planet and slow at the far end, with a short fading trail. It circles once every 32 seconds. It pauses when the diagram is off screen or the tab is hidden, it has a real "Pause orbit" button, and with reduced motion it simply rests in place with no button.
```css
.track { animation: trace 1600ms var(--ease-ramp) 700ms backwards; }
.orbit:nth-child(2) .track { animation-delay: 1000ms; }
.orbit:nth-child(3) .track { animation-delay: 1300ms; }
.planet { animation: appear 500ms var(--ease-ramp) 600ms backwards; }
.craft, .trail { animation: appear 500ms var(--ease-ramp) 2300ms backwards; }
```
```js
const orbitSvg = document.querySelector('.orbit-svg');
const craftOrbit = document.querySelector('.orbit-craft');
const orbitToggle = document.querySelector('.orbit-toggle');
if (orbitSvg && craftOrbit) {
  const TAU = Math.PI * 2;
  const PERIOD_MS = 32000, REST = 2.2, LAG = 0.17; // REST: the pose when motion is off; LAG: how far each trail dot trails behind
  const rx = +craftOrbit.dataset.rx, ry = +craftOrbit.dataset.ry; // same numbers as the path in the HTML
  const c = Math.sqrt(rx * rx - ry * ry), e = c / rx; // focus distance and eccentricity: the planet sits at the focus
  const dots = [craftOrbit.querySelector('.craft'), ...craftOrbit.querySelectorAll('.trail.t1, .trail.t2, .trail.t3, .trail.t4')];
  let sim = (REST / TAU) * PERIOD_MS, last = 0, frame = 0, visible = false, paused = false;

  function kepler(M) { let E = M; for (let i = 0; i < 6; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); return E; } // Newton's method on M = E - e sin E
  function draw() {
    const M = motion.matches ? REST : (sim / PERIOD_MS) * TAU;
    dots.forEach((dot, k) => {
      const E = kepler(M - k * LAG);
      dot.style.transform = `translate(${(-c + rx * Math.cos(E)).toFixed(2)}px, ${(ry * Math.sin(E)).toFixed(2)}px)`;
    });
  }
  function tick(now) { sim += Math.min(now - last, 64); last = now; draw(); frame = requestAnimationFrame(tick); }
  function start() { if (frame || motion.matches || paused || document.hidden || !visible) return; last = performance.now(); frame = requestAnimationFrame(tick); }
  function stop() { cancelAnimationFrame(frame); frame = 0; }
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else stop(); }).observe(orbitSvg);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  motion.addEventListener('change', () => { stop(); draw(); start(); });
  if (orbitToggle) orbitToggle.addEventListener('click', () => {
    paused = !paused;
    orbitToggle.textContent = paused ? 'Play orbit' : 'Pause orbit';
    if (paused) stop(); else start();
  });
  draw();
}
```

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .will-ramp > * { opacity: 1 !important; } /* undo the hidden starting state, not just the animations */
  .orbit-toggle { display: none; }
}
```
Everything is visible and in place: the orbit lines are fully drawn (their hidden start lives only in the keyframes), the craft rests at one point, nothing scrambles. The selected tab and the reticle still change, instantly.

## Libraries
None. Plain CSS, JavaScript and inline SVG.

## Avoid
- Anything that looks like data: mission names, T-minus clocks, coordinates, altitudes, velocities, "GO/NO-GO" badges, status words like "NOMINAL", telemetry bars, axis numbers, fake mission patches. The orbit has no text and the panels say only real section names.
- Scrambling anything but the name and the section titles, scrambling more than once per element, or letting scrambled text stand in for the real text (the real text must stay in the DOM and the accessible name).
- Glitch moves (channel splits, slice slips, shaking), a third signal colour, glow, starfields, lens flares, rocket emoji, or periwinkle or ember for long text.
- A craft that cannot be stopped, a rAF loop running off screen or in a hidden tab, buttons and knobs that do nothing, panel labels that are not real section names.
- Hiding content until JavaScript runs, scroll-jacking, or sideways scrolling at 320px.
- Generic page habits: a "→" after every link, "A · B · C" strings, numbering the panels 01 / 02 / 03, one headline word picked out in periwinkle, an ALL-CAPS eyebrow above every heading, the same rounded card with a soft shadow everywhere, a fade-up on every section.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
