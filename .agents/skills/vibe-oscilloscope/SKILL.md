---
name: vibe-oscilloscope
description: Restyles the portfolio site as the screen of a digital oscilloscope (look, layout and motion). Use ONLY when the student names the vibe-oscilloscope skill or asks for the Oscilloscope vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: major
  tags: "electrical, computer-eng, engineering"
  intensity: standard
  version: "2"
---

# Vibe: Oscilloscope

## Feel and who it's for
The portfolio feels like the screen of a good digital oscilloscope on a bench: a dark graticule, two phosphor traces in cyan and yellow, and a column of menu softkeys down the edge that doubles as the navigation. Things sweep, lock on like a trigger and fade like phosphor. It is measured and alive, but calm enough to read. Good for electrical and computer engineering students who want a co-op employer to see "this person probes, measures and debugs hardware".

## Must keep (this is what makes it Oscilloscope)
1. A near-black screen with a thin graticule drawn in CSS gradients. Reading text is off-white, never cyan or yellow.
2. Exactly two trace colours, each with a job. Cyan (CH1) means "where you are": links and the current section. Yellow (CH2) means "what you are pointing at": the cursor line and the focus ring. No third accent.
3. Motion is signal-like: steady linear sweeps, a brief unstable jitter that snaps to stable (a trigger locking on, at most three jumps), and slow phosphor fade. No bounce, no spring, no blur glow.
4. One canvas waveform in the hero, sweeping across a graticule. It is decoration and shows no readings.
5. Navigation is a set of menu softkeys along the screen edge, with the real section names and nothing else.

## Starting defaults (change freely)
The student can say "make the traces green and amber" or "make the screen lighter". Their request wins.

Palette, in words: blue-black screen, slightly lighter panels, off-white text, a cool grey for secondary text, a bright cyan, a warm yellow, and dim steel-blue grid lines.

```css
:root {
  /* Contrast, computed (on bg / surface / surface-2). text 16.3 / 14.9 / 13.6. muted 8.8 / 8.0 / 7.3.
     ch1 cyan 11.3 / 10.4 / 9.4. ch2 yellow 12.7 / 11.6 / 10.5. Bg-coloured text on a cyan fill 11.3, on a yellow fill 12.7.
     Grid lines and borders are decoration only. */
  --color-bg: #0A0F13; --color-surface: #111A21; --color-surface-2: #17232C;
  --color-text: #E8EDF0; --color-muted: #A3B1BB; --color-border: #2B3C48;
  --ch1: #4FD8EB; /* CH1 cyan: where you are (links, current section) */
  --ch2: #F2CF4A; /* CH2 yellow: what you point at (cursor line, focus ring) */
  --color-grid: #131D24; --color-grid-scope: #1E2C36; --color-grid-major: #33464F; /* page grid, scope grid, centre axes */
  --ease-decay: cubic-bezier(0.2, 0.6, 0.1, 1); /* quick drop, long tail, like phosphor fading */
  --keys-h: 3.25rem; /* phone softkey bar: 44px links plus the border */
  --keys-w: 8.5rem;  /* desktop softkey column */
}
```
If you change the traces, recompute contrast for both on the screen colour and on both panel colours. Keep them far apart in hue.

Fonts: Chakra Petch for headings and softkeys (squared, instrument-panel feel), Instrument Sans for body. Alternatives: Saira Semi Condensed with Hanken Grotesk.
`<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">`

Spacing, sizes and corner radius are your call. Corners stay square or nearly square.

## Layout ideas
- **Page:** one calm column on a faint page grid (two `linear-gradient`s, 3rem cells, on `body`), leaving room for the softkeys: a bottom bar on phones, a right-edge column on desktop.
- **Hero:** the real name large, the one-line intro under it, then the scope: a bordered screen with a 10 by 8 graticule and the canvas waveform inside. No text on the screen itself.
- **About:** the real bio as plain paragraphs, lines under 70 characters.
- **Projects:** one panel per real project on the surface colour, a link only if SPEC.md has one.
- **Skills:** the real skills as outlined chips, in the student's own words.
- **Contact:** the real links as a plain list in cyan, one per line.
- **Structure:** `<header>` holds the fixed softkey `<nav>` and comes first, with a "Skip to content" link before it (the keys are first in Tab order); every section, the hero included, sits inside `<main>` (the snippets select `main section[id]`). A footer, if any, holds only SPEC.md content.

## Make it theirs
- The one loud thing is the hero waveform. The other four moments stay small: a rule, a short jitter, a thin yellow line, a softkey bar.
- The student's own bench sets the details. Their tools (a simulator, a microcontroller, a meter) become the chips, their project names become the panel titles. Never invent a part, value or reading.
- A clear type scale: a large name, medium section titles, 1rem body text. Few weights, no ALL-CAPS tracked labels.

## Motion character
Tempo: steady, 120 to 700 ms for UI, a 6 second sweep for the hero trace. Easing: `linear` for anything that sweeps, `steps(1, end)` for the lock-on jitter, `var(--ease-decay)` for anything that fades or settles. Nothing bounces. Only `transform`, `opacity` and `clip-path` animate. The JavaScript snippets share one `script.js`: put this helper first, then each moment in order.

```js
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
```

### 1. Page load: the beam opens
The scope opens from a single line into its full height, and the name locks on (three small jumps, then still). Pure CSS, so the text is in the HTML and shows if JavaScript fails.

```html
<section class="hero" id="home" aria-labelledby="home-title">
  <h1 id="home-title" class="hero-name">The student's name from SPEC.md</h1>
  <p class="hero-intro">The one-line intro from SPEC.md.</p>
  <div class="scope" aria-hidden="true"><canvas class="scope-canvas"></canvas></div>
</section>
```
```css
@keyframes beam-open { from { clip-path: inset(49.5% 0 49.5% 0); } to { clip-path: inset(0); } }
/* Lock-on: each state is held for a quarter of the duration (steps(1) holds), so the jumps are 350ms apart. */
@keyframes lock-on { 0% { transform: translateX(-8px); } 25% { transform: translateX(5px); } 50% { transform: translateX(-3px); } 75%, 100% { transform: none; } }
.hero { overflow-x: clip; }
.hero-name { animation: lock-on 1400ms steps(1, end) both; } /* text is fully visible the whole time */
.scope { animation: beam-open 600ms var(--ease-decay) both; }
```

### 2. Scroll: sections lock on
When a section arrives, its top rule sweeps left to right (linear), then glows and fades like phosphor, and its heading jitters three times and locks. Nothing is hidden before or during this: the text is always visible and reachable by Tab, so no focus listener is needed. JavaScript only adds `is-locking`.

```html
<section class="lock" id="about" aria-labelledby="about-title">
  <h2 id="about-title" class="section-title">About</h2> <p>The real bio from SPEC.md.</p>
</section>
```
```css
.lock { position: relative; margin-top: 3rem; padding-top: 2rem; } /* room above and under the rule; use your spacing scale */
.lock::before, .lock::after { content: ""; position: absolute; top: 0; left: 0; right: 0; }
.lock::before { height: 1px; background: var(--color-border); } /* the dim rule, always there */
.lock::after { height: 2px; background: var(--ch1); transform: scaleX(0); transform-origin: left; opacity: 0; } /* the bright trace */
@keyframes sweep { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes decay { from { opacity: 1; } to { opacity: 0; } }
/* Two classes plus a pseudo-element beat the base rules above, so nothing cancels these animations. */
.lock.is-locking::after { animation: sweep 700ms linear both, decay 2600ms var(--ease-decay) 700ms both; }
.lock.is-locking > .section-title { animation: lock-on 1400ms steps(1, end) both; } /* @keyframes lock-on is in moment 1: keep it even if you change the page load */
main { overflow-x: clip; } /* the jitter can never cause sideways scrolling */
```
```js
const lockObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Also lock sections already scrolled past (for example after a reload).
    if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
      entry.target.classList.add('is-locking');
      lockObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -15% 0px' });
document.querySelectorAll('main .lock').forEach((section) => lockObserver.observe(section));
```
The bottom-of-page check is in the navigation script below, so a short last section still locks.

### 3. Hover and focus: the cursor line
Pointing at a project that has a real link, or tabbing into it, draws a thin yellow measurement-cursor line down its left edge (140ms, linear). Panels without a link do not react.

```css
a { color: var(--ch1); text-underline-offset: 0.25em; }
a:hover { text-decoration-thickness: 2px; text-decoration-color: var(--ch2); }
a:focus-visible, button:focus-visible { outline: 2px solid var(--ch2); outline-offset: 3px; }
.project { position: relative; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 2px; }
.project::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 2px; background: var(--ch2);
  transform: scaleY(var(--cursor, 0)); transform-origin: top; transition: transform 140ms linear; }
.project:focus-within { --cursor: 1; }
.project:has(a:hover) { --cursor: 1; } /* its own rule, so a browser without :has() still gets the one above */
```

### 4. Navigation: menu softkeys
The softkeys sit along the edge like the buttons beside a scope screen. The one for the section on screen is selected: its label turns off-white on a lighter key and a cyan bar sweeps in. Jumping is a cut, not a scroll (like pressing a menu key), then the section locks on again. No smooth scrolling.

```html
<header><nav class="softkeys" aria-label="Sections"><ul>
  <li><a href="#home">Home</a></li><li><a href="#about">About</a></li><li><a href="#projects">Projects</a></li>
</ul></nav></header>
```
```css
html { scroll-behavior: auto; } section[id] { scroll-margin-top: 1rem; }
body { padding-bottom: var(--keys-h); } /* keeps the last section clear of the bar */
.softkeys { position: fixed; inset: auto 0 0 0; z-index: 10; background: var(--color-surface); border-top: 1px solid var(--color-border); }
.softkeys ul { display: flex; margin: 0; padding: 0; list-style: none; }
.softkeys li { flex: 1 1 0; min-width: 0; } /* five equal keys that fit at 320px */
.softkeys a { position: relative; display: flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 2px;
  font: 600 clamp(0.72rem, 3.4vw, 0.95rem) "Chakra Petch", sans-serif; text-align: center; text-decoration: none; overflow-wrap: anywhere; color: var(--color-muted); }
.softkeys a::after { content: ""; position: absolute; inset: 0 0 auto 0; height: 3px; background: var(--ch1); transform: scaleX(0); transform-origin: left; transition: transform 220ms linear; }
.softkeys a[aria-current] { color: var(--color-text); background: var(--color-surface-2); }
.softkeys a[aria-current]::after { transform: scaleX(1); }
.softkeys a:focus-visible { outline-offset: -3px; }
@media (min-width: 60em) {
  body { padding-bottom: 0; }
  main { margin-right: calc(var(--keys-w) + 1rem); }
  .softkeys { inset: 50% 0 auto auto; width: var(--keys-w); transform: translateY(-50%); border: 1px solid var(--color-border); border-right: 0; }
  .softkeys ul { flex-direction: column; }
  .softkeys a { justify-content: flex-start; padding: 0 1rem; font-size: 1rem; }
  .softkeys a::after { inset: 0 auto 0 0; width: 3px; height: auto; transform: scaleY(0); transform-origin: top; }
  .softkeys a[aria-current]::after { transform: scaleY(1); }
}
```
More than five sections at 320px: let `ul` wrap with `flex-wrap: wrap` and `li { flex: 1 0 33% }`, and raise `--keys-h` to fit two rows.
```js
const sections = document.querySelectorAll('main section[id]');
const keys = document.querySelectorAll('.softkeys a');
const select = (id) => keys.forEach((key) => {
  if (key.hash === '#' + id) key.setAttribute('aria-current', 'location');
  else key.removeAttribute('aria-current');
});
const lastSection = sections[sections.length - 1];
// After a softkey jump, that key stays selected until the visitor scrolls on their own. Without this, jumping to a
// short section near the end selects the section after it (the middle band or the page bottom lands there).
let jumpedTo = '';
['wheel', 'touchmove', 'keydown'].forEach((type) => window.addEventListener(type, () => { jumpedTo = ''; }, { passive: true }));
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) select(jumpedTo || entry.target.id); });
  checkEnds(); // the top and bottom of the page win over the middle band
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((section) => spy.observe(section));
function checkEnds() { // a function declaration, so the spy can call it from anywhere in the file
  if (window.scrollY < 8) select(sections[0].id); // a short hero can leave the middle band in the next section
  else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    select(jumpedTo || lastSection.id); // a short last section may never reach the middle band
    lastSection.classList.add('is-locking');
  }
}
window.addEventListener('scroll', checkEnds, { passive: true });
checkEnds();
// Jumping to a section selects its key and locks it on again. Removing and re-adding the class restarts the animation.
window.addEventListener('hashchange', () => {
  const target = document.getElementById(location.hash.slice(1));
  jumpedTo = target && target.matches('main section[id]') ? target.id : '';
  if (jumpedTo) select(jumpedTo);
  if (!target || !target.classList.contains('lock') || motion.matches) return;
  target.classList.remove('is-locking');
  void target.offsetWidth; // the only layout read, once per jump, so the animation restarts
  target.classList.add('is-locking');
});
```

### 5. Signature: the scope trace
A canvas in the hero draws two decorative traces: a square-ish sine mix in cyan and a soft square wave in yellow. A bright beam sweeps left to right at a steady rate, and what it already drew fades slowly behind it. For the first second the traces wobble through three phase jumps, then lock stable. The shapes are pure decoration and encode no data: no axes, no numbers, no readouts. The page draws one frame under reduced motion, pauses when the scope is off screen or the tab is hidden, and handles resizing and sharp screens.

```css
.scope { position: relative; aspect-ratio: 2 / 1; max-width: 60rem; border: 1px solid var(--color-border);
  background: /* centre axes, then a 10 by 8 grid, on the screen colour */
    linear-gradient(var(--color-grid-major), var(--color-grid-major)) 50% 0 / 1px 100% no-repeat,
    linear-gradient(var(--color-grid-major), var(--color-grid-major)) 0 50% / 100% 1px no-repeat,
    linear-gradient(90deg, var(--color-grid-scope) 1px, transparent 1px) 0 0 / 10% 100%,
    linear-gradient(var(--color-grid-scope) 1px, transparent 1px) 0 0 / 100% 12.5%,
    var(--color-bg); }
.scope-canvas { display: block; width: 100%; height: 100%; }
@media (min-width: 48em) { .scope { aspect-ratio: 5 / 2; } }
/* Two small triangles on the left edge mark where each trace sits at rest. They match the "level" values in the script. */
.scope::before, .scope::after { content: ""; position: absolute; left: 0; border: 0.35rem solid transparent; transform: translateY(-50%); }
.scope::before { top: 31%; border-left: 0.6rem solid var(--ch1); }
.scope::after { top: 75%; border-left: 0.6rem solid var(--ch2); }
```
```js
const canvas = document.querySelector('.scope-canvas');
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const TAU = Math.PI * 2;
  const SWEEP_MS = 6000, FADE = 3.5, STEP = 4; // linear sweep time; afterglow (higher = shorter); pixels per segment
  const JITTER = [0.09, -0.06, 0.03], JITTER_MS = 350; // phase offsets before lock-on: three jumps 350ms apart, then stable
  // Decoration only: sine and square mixes. level: where the trace rests, -1 top to 1 bottom.
  const shapes = [
    { cycles: 2, level: -0.38, fn: (t) => (Math.sin(TAU * t) + Math.sin(3 * TAU * t) / 3 + Math.sin(5 * TAU * t) / 5) * 0.32 },
    { cycles: 3, level: 0.5, fn: (t) => Math.tanh(3 * Math.sin(TAU * t)) * 0.2 },
  ];
  let w = 0, h = 0, sim = 0, last = 0, frame = 0, visible = false, colors = ['#4FD8EB', '#F2CF4A'];

  function draw() {
    const still = motion.matches; // reduced motion: one complete, locked frame
    const phase = still || sim >= JITTER.length * JITTER_MS ? 0 : JITTER[Math.floor(sim / JITTER_MS)];
    const head = still ? w : ((sim % SWEEP_MS) / SWEEP_MS) * w;
    ctx.clearRect(0, 0, w, h);
    shapes.forEach((shape, i) => {
      const y = (x) => (h / 2) * (1 + shape.level + shape.fn((x / w) * shape.cycles + phase));
      ctx.strokeStyle = colors[i];
      for (let x = 0; x < w; x += STEP) {
        const age = ((((head - x) / w) % 1) + 1) % 1; // 0 at the beam, near 1 just ahead of it
        ctx.globalAlpha = still ? 0.9 : Math.exp(-FADE * age);
        ctx.beginPath(); ctx.moveTo(x, y(x)); ctx.lineTo(x + STEP, y(x + STEP)); ctx.stroke();
      }
      if (!still) { ctx.globalAlpha = 1; ctx.fillStyle = colors[i]; ctx.beginPath(); ctx.arc(head, y(head), 3, 0, TAU); ctx.fill(); }
    });
    ctx.globalAlpha = 1;
  }
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);   // sharp, but never more than 2x
    const box = canvas.getBoundingClientRect(), css = getComputedStyle(document.documentElement); // read first, then write
    w = box.width; h = box.height;
    colors = [css.getPropertyValue('--ch1').trim() || colors[0], css.getPropertyValue('--ch2').trim() || colors[1]];
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 2; ctx.lineCap = 'butt'; // resizing resets the context, so set these here
    draw();
  }
  function tick(now) { sim += Math.max(0, Math.min(now - last, 64)); last = now; draw(); frame = requestAnimationFrame(tick); }
  function start() { if (frame || motion.matches || document.hidden || !visible) return; last = performance.now(); frame = requestAnimationFrame(tick); }
  function stop() { cancelAnimationFrame(frame); frame = 0; }
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else stop(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  motion.addEventListener('change', () => { stop(); draw(); start(); });
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);
  resize();
}
```
The loop only runs while the scope is on screen, the tab is visible and motion is allowed. One strip and 2 pixel lines (no `shadowBlur`) keep phones smooth. To change the look, edit the two `shapes`; keep them decorative.

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }
```
Everything is visible and in place. The canvas script draws one finished, locked frame and never starts the loop. The selected softkey still changes, but instantly.

## Libraries
None. Plain CSS, JavaScript and the Canvas 2D API.

## Avoid
- Readings that are not in SPEC.md: volts per division, time per division, frequencies, "Vpp", axis numbers, measurement text, "AUTO", "TRIG'D" or "STOP" badges. The scope carries no text.
- A waveform that stands for real data (skill levels as amplitudes), or text laid over the canvas.
- A third trace colour, or cyan or yellow for long text.
- Scanlines, a curved CRT screen, flicker, or blurred glow on text or on every segment.
- More than three jitter jumps, shaking, or anything that flashes more than three times a second.
- A rAF loop that runs while the scope is off screen or the tab is hidden, or a canvas that is blurry or stretched after a resize.
- Buttons and knobs that do nothing, or softkey labels that are not real section names.
- Hiding content until JavaScript runs, scroll-jacking, or sideways scrolling at 320px.
- Generic page habits: a "→" after every link, "A · B · C" strings, numbering the projects 01 / 02 / 03, one headline word picked out in cyan, an ALL-CAPS label above every heading, the same rounded card with a soft shadow everywhere, a fade-up on every section.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
