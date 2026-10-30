---
name: vibe-pitch-deck
description: Restyles the portfolio site as a sharp investor or consulting pitch deck, where each section is a slide and real results count up (look, layout and motion). Use ONLY when the student names the vibe-pitch-deck skill or asks for the Pitch Deck vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: major
  tags: "business"
  intensity: standard
  version: "2"
---

# Vibe: Pitch Deck

## Feel and who it's for
The portfolio reads like a confident deck, one slide per section: a big claim, wide margins, a firm type hierarchy, and the student's real numbers given the stage. Slides arrive one after another as you scroll, and a thin progress bar with "Slide 3 of 6" keeps the sequence visible. It must not look like a SaaS landing page. Good for business and commerce students who want recruiters to see "this person communicates clearly and leads with results".

## Must keep (this is what makes it Pitch Deck)
1. Every section is a slide: near full-screen, left-aligned, one idea, lots of empty space. The big type is the real name, the real bio or the real project names.
2. Paper, ink and ONE accent (claret). One slide is a full-bleed claret block for the numbers, and the last slide is ink. No other colours.
3. Numbers get the stage, but only numbers SPEC.md states. If SPEC.md has no numbers, leave the Results slide out entirely and tell the student plainly why. Never invent figures to fill it.
4. Deck chrome: a thin progress bar and a "Slide N of M" indicator where N and M count the page's real sections.
5. Motion is confident and medium-paced: a firm start and a hard brake. No bounce, spring or looping.

## Starting defaults (change freely)
The student can say "make the accent teal" or "use a dark deck". Their request wins.

Palette, in words: cool off-white paper; near-black ink; slate grey for secondary text; one deep claret accent; a darker wine for the full-bleed Results slide.

```css
:root {
  --color-bg: #F4F4F1;
  --color-surface: #FFFFFF;
  --color-text: #14151A;          /* 16.5:1 on paper, 18.2:1 on white; paper on ink is 16.5:1 */
  --color-muted: #4F535B;         /* 7.0:1 on paper, 7.7:1 on white */
  --color-accent: #8E1B3A;        /* 8.1:1 on paper, 8.9:1 on white */
  --color-deep: #6A0F2B;          /* the Results slide */
  --color-on-deep: #FBF6F4;       /* 11.4:1 on deep */
  --color-on-deep-muted: #EBCDD6; /* 8.3:1 on deep */
  --color-ink-muted: #B8BBC4;     /* 9.5:1 on ink */
  --color-border: #C8C9C4;        /* lines only, never text */
  --font-display: "Archivo", "Arial Narrow", sans-serif;
  --font-body: "Instrument Sans", system-ui, sans-serif;
  --ease-cut: cubic-bezier(0.6, 0.02, 0.1, 1); /* firm start, hard brake */
  --move: 500ms;   /* slide-sized moves */
  --hover: 180ms;  /* small reactions */
  --rise: 3rem;    /* how far a slide's content travels in (motion only) */
  --bar-h: 3.5rem; /* height of the deck bar */
  --gutter: clamp(1rem, 5vw, 4rem);
  --slide-link: var(--color-accent); /* default for the header; each .slide sets its own */
}
/* Each slide sets its own colours, so text is always checked against its own background.
   Claret is for text and lines on paper or white only (it is 2.1:1 on ink). */
.slide { --slide-bg: var(--color-bg); --slide-text: var(--color-text); --slide-muted: var(--color-muted); --slide-link: var(--color-accent); --slide-rule: var(--color-accent); --slide-line: var(--color-border); background: var(--slide-bg); color: var(--slide-text); }
/* Same specificity as .slide but later, so the theme classes win. */
.slide--white { --slide-bg: var(--color-surface); }
.slide--deep { --slide-bg: var(--color-deep); --slide-text: var(--color-on-deep); --slide-muted: var(--color-on-deep-muted); --slide-link: var(--color-on-deep); --slide-rule: var(--color-on-deep); --slide-line: rgb(251 246 244 / 0.4); }
.slide--ink { --slide-bg: var(--color-text); --slide-text: var(--color-bg); --slide-muted: var(--color-ink-muted); --slide-link: var(--color-bg); --slide-rule: var(--color-bg); --slide-line: #3A3D46; }
```
Fonts: Archivo for the name, slide titles and numbers, Instrument Sans for body (both have tabular figures). Alternatives: Manrope, Sora. Not Inter.
`<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Instrument+Sans:wght@400;600&display=swap" rel="stylesheet">`

Spacing and sizes are your call. Corners stay square.

## Layout ideas
- **Slide shell:** `<section class="slide" id="about">` holding one `<div class="slide-inner">` (up to about 72rem wide). Slides alternate paper and `slide--white`, Results is `slide--deep`, the last slide is `slide--ink`. Give every slide generous block padding (about 6rem on desktop, from your spacing scale): the empty space is the look. The snippets assume a margin reset (`h1, h2, h3, p, ul { margin: 0; }`); add one.
- **Header:** a plain (not fixed) top row: the student's name, then `<nav class="site-nav">` with the section links, each 44px tall. Let it wrap, so at 320px the links drop to a second row instead of scrolling sideways.
- **Hero:** the real name very large (`clamp(2.75rem, 12vw, 9rem)`, weight 800) and the one-line intro under it. Check the longest word fits at 320px.
- **About:** the real bio set large as a statement (`clamp(1.5rem, 3.6vw, 2.5rem)`, max-width about 36ch). If it is long, only the first sentence is large.
- **Projects:** a ruled table, one row per real project: name large on the left, real description on the right (stacked on phones). A link only if SPEC.md has one. Rows are not numbered.
- **Results:** up to four big figures (Signature below). It goes right after Projects, gets its own nav link, and counts toward the slide total. When you add it, tell the student in one line that you added it and which SPEC.md figures it shows. **Skills:** a ruled list. **Contact:** large links on the ink slide, with `overflow-wrap: anywhere` and a minimum size small enough (about 1.25rem) that a real email fits on one line at 320px.
- **Deck bar:** fixed at the bottom with the progress line on its top edge. Write the true slide count in `slide-m`. It is decoration (the nav already does the job), so it is `aria-hidden`.
```html
<div class="deck-bar" aria-hidden="true">
  <div class="deck-progress"><span></span></div>
  <p class="deck-count">Slide <span class="slide-n">1</span> of <span class="slide-m">6</span></p>
</div>
```
```css
.site-header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; padding: 0.25rem var(--gutter); background: var(--color-bg); color: var(--color-text); }
.site-nav a { display: inline-flex; align-items: center; min-height: 44px; padding-inline: 0.5rem; color: var(--color-text); }
```

## Make it theirs
- The one loud thing is the count-up on the Results slide. The slide arrivals and the progress bar stay quiet.
- Slide titles are the SPEC.md section names. Project names and figures are copied exactly as SPEC.md writes them. A figure's label is the words around it in SPEC.md, trimmed (for example "members, grown from 12 in one term"); the project it comes from goes on its own small line under the label, never in brackets. Count only outcomes: a projection or estimate counts only if its label keeps the word SPEC.md uses ("projected"); durations, team sizes, dates and ranks never count. "Results" is the one structural heading this vibe adds; every figure and label under it comes from SPEC.md.
- Which numbers count as results? Counts, money and percentages the student states about their own outcomes (members, dollars raised, a percent change). Leave out durations, team sizes, dates and ranks. Show at most four.
- Every device carries meaning: the counter is a real sequence, the figures are real results, and nothing else is numbered or in capitals.

## Motion character
Tempo: medium, 350 to 550ms, with count-ups up to about 800ms. Easing: always `var(--ease-cut)`, a firm start and a hard brake like a slide snapping into place. Things travel straight up or straight across and stop dead. Never bounce, overshoot, loop or float. The snippets share one `script.js`: start with the helpers, then add each moment in order.

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'cubic-bezier(0.6, 0.02, 0.1, 1)'; // same curve as --ease-cut
const slides = [...document.querySelectorAll('main > section[id]')];
const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
```

### 1. Page load: the title slide builds
A short claret tab draws, the name wipes in from the left like a deck "wipe" build, then the intro settles. Pure CSS, so the text is in the HTML and still shows if JavaScript fails.

```html
<section class="slide hero" id="home" aria-labelledby="home-title">
  <div class="slide-inner">
    <h1 id="home-title" class="hero-name">Sam Rivera</h1>
    <p class="hero-intro">The one-line intro from SPEC.md.</p>
  </div>
</section>
```
```css
.slide { display: grid; align-content: center; min-height: calc(100svh - var(--bar-h)); padding-inline: var(--gutter); overflow-x: clip; }
.slide-inner { width: 100%; max-width: 72rem; margin-inline: auto; }
/* The short tab above each slide's content; it draws in on every slide (see Scroll). */
.slide-inner::before { content: ""; display: block; width: 4.5rem; height: 0.375rem; margin-bottom: 1.5rem; background: var(--slide-rule); transform-origin: left; }

@keyframes draw { from { transform: scaleX(0); } }
@keyframes wipe { from { clip-path: inset(-0.15em 100% -0.15em 0); } to { clip-path: inset(-0.15em); } } /* negative inset keeps descenders */
@keyframes settle { from { opacity: 0; transform: translateY(0.75rem); } }
.hero .slide-inner::before { animation: draw var(--move) var(--ease-cut) both; }
.hero-name { font: 800 clamp(2.75rem, 12vw, 9rem)/0.95 var(--font-display); letter-spacing: -0.03em; animation: wipe var(--move) var(--ease-cut) 200ms both; }
.hero-intro { max-width: 32rem; margin-top: 1.5rem; font-size: clamp(1.25rem, 3vw, 1.75rem); animation: settle var(--move) var(--ease-cut) 450ms both; }
```

### 2. Scroll: the next slide arrives
No snapping and no scroll hijack: the page scrolls normally. As a slide comes into view its content travels up a short way and its tab draws, so the slide seems to lock into place. Scroll-driven animation where supported, otherwise an IntersectionObserver. Only transforms move, so nothing is ever hidden.

```css
@keyframes rise { from { transform: translateY(var(--rise)); } }
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    /* ":not(.hero)" keeps these rules from overriding the load animation above. */
    .slide:not(.hero) { view-timeline: --slide block; }
    .slide:not(.hero) .slide-inner { animation: rise linear both; animation-timeline: --slide; animation-range: entry 0px entry 22rem; }
    .slide:not(.hero) .slide-inner::before { animation: draw linear both; animation-timeline: --slide; animation-range: entry 4rem entry 18rem; }
  }
}
/* Fallback: JavaScript adds .will-arrive only where view() is missing. */
.will-arrive .slide-inner { transition: transform var(--move) var(--ease-cut); }
.will-arrive .slide-inner::before { transition: transform var(--move) var(--ease-cut) 150ms; }
.will-arrive:not(.is-in) .slide-inner { transform: translateY(var(--rise)); }
.will-arrive:not(.is-in) .slide-inner::before { transform: scaleX(0); }
```
```js
if (!reduce && !CSS.supports('animation-timeline: view()') && 'IntersectionObserver' in window) {
  const arrive = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also settle slides already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add('is-in');
        arrive.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -15% 0px' });
  slides.filter((slide) => !slide.classList.contains('hero')).forEach((slide) => {
    slide.classList.add('will-arrive');
    arrive.observe(slide);
  });
  // A short last slide may never cross the trigger line: at the bottom, settle everything.
  window.addEventListener('scroll', () => {
    if (atBottom()) slides.forEach((slide) => slide.classList.add('is-in'));
  }, { passive: true });
  // Keyboard users: a slide settles as soon as Tab lands inside it.
  document.addEventListener('focusin', (event) => {
    const slide = event.target.closest('.will-arrive');
    if (slide) slide.classList.add('is-in');
  });
}
```

### 3. Hover and focus: small and assured
A project row gets a claret bar that grows down its left edge, and links get a thicker underline. Only rows that contain a real link react.

```css
a { color: var(--slide-link); text-underline-offset: 0.25em; }
a:hover { text-decoration-thickness: 0.12em; }
a:focus-visible, button:focus-visible { outline: 3px solid var(--slide-link); outline-offset: 3px; }
.project { position: relative; border-top: 1px solid var(--slide-line); }
.project::before { content: ""; position: absolute; inset: -1px auto -1px -0.75rem; width: 0.25rem; background: var(--slide-rule); transform: scaleY(0); transform-origin: top; transition: transform var(--hover) var(--ease-cut); }
.project:has(a:hover)::before, .project:focus-within::before { transform: scaleY(1); }
```

### 4. Navigation: progress bar and "Slide N of M"
The bar fills as you scroll (JavaScript sets `--progress`, and the bar only ever changes with `transform: scaleX`), and the counter follows the slide on screen and rolls when the number changes. Header links jump with smooth scrolling.

```css
html { scroll-behavior: smooth; }
body { padding-bottom: var(--bar-h); } /* keeps the last slide clear of the bar */
.deck-bar { position: fixed; inset: auto 0 0; z-index: 10; display: flex; align-items: center; height: var(--bar-h); padding-inline: var(--gutter); background: var(--color-surface); color: var(--color-text); border-top: 1px solid var(--color-border); }
.deck-progress { position: absolute; inset: -1px 0 auto; height: 3px; background: var(--color-border); }
.deck-progress span { display: block; height: 100%; background: var(--color-accent); transform-origin: left; transform: scaleX(var(--progress, 0)); }
.deck-count { margin: 0; font: 600 0.9375rem var(--font-body); font-variant-numeric: tabular-nums; }
.slide-n { display: inline-block; }
```
```js
const bar = document.querySelector('.deck-bar');
if (bar) {
  const counterN = bar.querySelector('.slide-n');
  const fill = bar.querySelector('.deck-progress span');
  let current = 0, ticking = false;
  bar.querySelector('.slide-m').textContent = slides.length;

  function setCurrent(i) {
    if (i === current) return;
    current = i;
    counterN.textContent = i + 1;
    if (!reduce) counterN.animate([{ transform: 'translateY(45%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 350, easing: EASE });
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      // Read everything first, then write.
      const tops = slides.map((slide) => slide.getBoundingClientRect().top);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      let index = 0;
      tops.forEach((top, n) => { if (top <= window.innerHeight * 0.5) index = n; });
      if (atBottom()) index = slides.length - 1; // a short last slide may never reach the middle
      fill.style.setProperty('--progress', (max > 0 ? window.scrollY / max : 0).toFixed(4));
      setCurrent(index);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
```

### 5. Signature: the real numbers count up
When the Results slide arrives, each figure counts up once to the value SPEC.md states (from the starting value if SPEC.md gives one, otherwise from 0). The final number is already in the HTML, so with no JavaScript, or for a screen reader, the correct number is simply there. While counting, JavaScript lays an `aria-hidden` copy over the real text, which only turns transparent, so the width never changes. Prefix, suffix, commas and decimals are kept as written.

```html
<!-- inside the slide--deep Results slide, under its h2 -->
<ul class="metrics">
  <li class="metric">
    <p class="metric-value" data-count data-from="12">40</p>
    <p class="metric-label">The words around this figure in SPEC.md, trimmed.</p>
    <p class="metric-source">The project name from SPEC.md.</p>
  </li>
</ul>
```
Use `data-from` only when SPEC.md states the starting number (for example "from 12 to 40"). Write each value exactly as SPEC.md does: `$1,200`, `18%`, `3.5`.
```css
.slide-title { margin: 0; font: 700 clamp(1.75rem, 4.5vw, 2.75rem)/1.1 var(--font-display); } /* every slide's h2, not only Results */
.metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: 2.5rem; margin: 2.5rem 0 0; padding: 0; list-style: none; }
.metric { container-type: inline-size; padding-top: 1rem; border-top: 2px solid var(--slide-rule); }
.metric-value { display: inline-grid; margin: 0; font: 800 clamp(3rem, 26cqi, 8rem)/1 var(--font-display); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.metric-value > * { grid-area: 1 / 1; }
.metric-value.is-counting .count-final { opacity: 0; } /* opacity, not hidden: it stays readable and holds the width */
.metric-label { margin: 0.75rem 0 0; color: var(--slide-muted); font-size: 1.125rem; }
.metric-source { margin: 0.25rem 0 0; color: var(--slide-muted); font-size: 0.9375rem; }
```
```js
const metrics = [...document.querySelectorAll('[data-count]')];
function parseMetric(text) {
  const m = text.trim().match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const decimals = (m[2].split('.')[1] || '').length;
  return { prefix: m[1], suffix: m[3], decimals, grouped: m[2].includes(','), value: parseFloat(m[2].replace(/,/g, '')) };
}
function runCount(el, delay) {
  if (el.dataset.counted) return; // once only
  el.dataset.counted = 'yes';
  const original = el.textContent;
  const p = parseMetric(original);
  const from = el.dataset.from ? parseFloat(el.dataset.from) : 0;
  if (!p || reduce || from === p.value) return;
  const show = (v) => p.prefix + v.toLocaleString('en-CA', { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals, useGrouping: p.grouped }) + p.suffix;
  const real = Object.assign(document.createElement('span'), { className: 'count-final', textContent: original });
  const live = Object.assign(document.createElement('span'), { className: 'count-live', textContent: show(from) });
  live.setAttribute('aria-hidden', 'true');
  el.textContent = '';
  el.append(real, live);
  el.classList.add('is-counting');
  const start = performance.now() + delay;
  (function frame(now) {
    const t = Math.min(1, Math.max(0, (now - start) / 800));
    live.textContent = show(from + (p.value - from) * (1 - Math.pow(1 - t, 4))); // hard brake at the end
    if (t < 1) requestAnimationFrame(frame);
    else { el.textContent = original; el.classList.remove('is-counting'); } // back to the plain text; the loop ends
  })(start);
}
if (metrics.length && 'IntersectionObserver' in window) {
  const watcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) runCount(el, metrics.indexOf(el) * 120);
      else if (entry.boundingClientRect.top < 0) el.dataset.counted = 'yes'; // already scrolled past: keep the final number
      else return;
      watcher.unobserve(el);
    });
  }, { threshold: 0.6 }); // a small element can always reach 60% visible, even at the bottom of the page
  metrics.forEach((el) => watcher.observe(el));
}
```

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```
Everything is already visible and in place. The numbers show their final values (the JavaScript skips counting), and the progress bar and counter still follow the scroll, without the roll.

## Libraries
None. Plain CSS and JavaScript only. No counting library is needed.

## Avoid
- Invented figures: any number not stated in SPEC.md, "trusted by" logos, fake testimonials, filler charts.
- A Results slide with nothing real in it. No numbers in SPEC.md means no Results slide.
- Scroll snapping, scroll hijacking or wheel handlers.
- Navy plus gold, cream plus terracotta, Inter on everything, and SaaS-landing habits: a gradient hero with a button, pricing-style cards, the same rounded card and soft shadow everywhere, a fade-up on every section, a "→" after every link, an ALL-CAPS label above every heading, "A · B · C" strings, numbering projects 01 / 02 / 03, one word of a heading picked out in the accent.
- Counting that shifts the layout, runs twice, or hides the real number from a screen reader.
- A fixed bar covering content (keep the body padding), or a header that scrolls sideways at 320px.
- Anything that flashes or loops. Every motion runs once.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
