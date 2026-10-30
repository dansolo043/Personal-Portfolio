---
name: vibe-kinetic-type
description: Restyles the portfolio site as huge, living typography that stretches, leans and changes weight (look, layout and motion). Use ONLY when the student names the vibe-kinetic-type skill or asks for the Kinetic Type vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: expressive
  tags: "design-art, digital-media, cs"
  intensity: expressive
  version: "2"
---

# Vibe: Kinetic Type

## Feel and who it's for
The type is the artwork. Huge, loud letters that feel physical: they rise into place, lean when you scroll, and swell under your cursor. No decorative images, blobs or illustrations. Good for design, digital media and bold CS students who want the site itself to show taste and craft.

## Must keep (this is what makes it Kinetic Type)
1. One variable font with weight AND width axes, so letters can change shape. Display type is very large, but always fits the screen.
2. Paper, ink and ONE loud accent colour. Nothing else carries colour.
3. Motion has momentum: values ease toward a target (lerp) and glide to rest. Reveals use a strong ease-out. Never bouncy, never stepped.
4. All five motion moments below are present. Each one is small and stops when nothing is changing.
5. The real words are always readable, with or without JavaScript.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the accent blue". Their request wins.

Palette, in words: cool, slightly lilac paper; deep indigo ink instead of plain black; a softer indigo-grey for secondary text; one electric ultramarine accent, like a risograph blue. The accent passes 4.5:1 on the paper, so it works for small text too. On an accent fill, text is the paper colour, never ink or grey. Inverted option: indigo screen (`#16123A`), paper-coloured text, accent `#8C8FFF`. Other accents that keep the feel: fluorescent pink `#E0007A`, signal green `#007A3D` (check contrast if you change it).

```css
:root {
  --color-bg: #ECEBF3;
  --color-surface: #E0DEEB;
  --color-text: #16123A;
  --color-muted: #4D4870;
  --color-accent: #2B2EFF;
  --color-accent-text: #2B2EFF; /* if you pick a lighter accent, darken this one for small text */
  --color-border: #16123A;
  --font-display: "Anybody", "Arial Narrow", sans-serif;
  --font-body: "Anybody", system-ui, sans-serif;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --mask-pad: 0.18em;  /* stops masks clipping tall letters and descenders when line-height is under 1 */
  --shift: 12vw;       /* how far project rows slide */
}
```
Fonts: one family for everything. Anybody (width 50 to 150, weight 100 to 900) is huge and stretched in headings and calm at normal width and weight in paragraphs. One family pushed to its extremes is the point of this vibe.
`<link href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,100..900&display=swap" rel="stylesheet">`
Roboto Flex is a fine alternative (it also has `wdth` and `wght` axes). Spacing comes from the project's `--space-*` variables. Corners stay square.

## Layout ideas
- **Header:** a slim bar with the student's name small and the section links as plain text, each at least 44px tall. Keep it quiet so the hero is the loudest thing.
- **Hero:** the real name in giant display type, the one-line intro in body font underneath. Size it so the longest word fits at 320px wide.
- **About:** a short real bio in body font at a comfortable width, under a giant section title. Never split the paragraph into letters.
- **Projects:** one giant row per real project (the title is the link), a thin rule between rows, and a small real description under each title.
- **Skills:** the real skills as one big wrapping word list in condensed display type (for example `font-variation-settings: "wght" 700, "wdth" 85`, `clamp()` size, `flex-wrap: wrap`).
- **Contact:** the real email or links as huge clickable text with `overflow-wrap: anywhere` and a `clamp()` font size, so a long email wraps instead of overflowing at 320px.

## Make it theirs
- The one loud thing is the name: it rises, leans and swells under the cursor. Paragraphs stay calm and readable, and they never animate.
- The student's project names are the artwork. The giant rows are their gallery, so keep the real names exactly as written in SPEC.md.
- Set a clear type scale with big jumps between levels: a giant name, large section titles, and calm body text under 80 characters per line.

## Motion character
Tempo: quick start, long glide. Easing: strong ease-out for reveals, lerp (momentum) for scroll and cursor effects. Things settle softly and never overshoot. The snippets share one `script.js`: put the helpers first, then each moment in order.

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

// Wraps each word in a mask (and each letter if byLetter). The real text stays readable.
function split(el, byLetter) {
  const text = el.textContent.trim().replace(/\s+/g, ' ');
  let n = 0;
  el.setAttribute('aria-label', text);
  el.textContent = '';
  text.split(' ').forEach((word, w, all) => {
    const mask = document.createElement('span');
    mask.className = 'mask';
    mask.setAttribute('aria-hidden', 'true');
    (byLetter ? [...word] : [word]).forEach((part) => {
      const piece = document.createElement('span');
      piece.className = byLetter ? 'char' : 'line';
      piece.textContent = part;
      piece.style.setProperty('--i', n++);
      mask.append(piece);
    });
    el.append(mask);
    if (w < all.length - 1) el.append(' ');
  });
  el.classList.add('is-split');
}
```
```css
.mask { display: inline-block; white-space: nowrap; overflow: hidden; vertical-align: top; padding-block: var(--mask-pad); margin-block: calc(var(--mask-pad) * -1); }
.char, .line { display: inline-block; }
```

### 1. Page load: letters rise from a mask
Only the hero name is split into letters. Each word is a mask and its letters rise from below in a quick stagger (keep the whole thing under about 1.2 seconds). Without JavaScript the plain heading just shows.

```html
<h1 id="home-title" class="hero-name lean">Sam Rivera</h1>
```
```css
.hero-name { font-family: var(--font-display); font-size: clamp(3rem, 17vw, 13rem); line-height: 0.95; }
/* One word per line, so the cursor swell can widen letters without re-wrapping the name. */
.hero-name .mask { display: block; width: fit-content; }
.char { --k: 0; font-variation-settings: "wght" calc(550 + var(--k) * 350), "wdth" calc(90 + var(--k) * 30); }
.is-split .char { animation: rise 800ms var(--ease-out) both; animation-delay: calc(120ms + var(--i) * 30ms); }
@keyframes rise { from { transform: translateY(110%); } to { transform: none; } }
```
```js
const heroName = document.querySelector('.hero-name');
if (heroName) split(heroName, true);
```

### 2. Scroll: headings reveal, project rows slide
Section headings are short, so each word is one line that rises out of its mask. JavaScript adds the hiding class, so without JavaScript everything is visible.

```html
<h2 class="section-title lean">About</h2>
```
```css
.section-title { font-family: var(--font-display); font-size: clamp(2.5rem, 10vw, 6rem); line-height: 1; }
.will-reveal .line { transform: translateY(110%); }
.will-reveal.is-in .line { transform: none; transition: transform 900ms var(--ease-out); transition-delay: calc(var(--i) * 80ms); }
```
```js
const titles = document.querySelectorAll('.section-title');
titles.forEach((title) => split(title, false));
if (!reduce && 'IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also reveal headings already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add('is-in');
        reveal.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -15% 0px' });
  titles.forEach((title) => { title.classList.add('will-reveal'); reveal.observe(title); });
  // A heading near the very end may never reach the trigger line: at the bottom, reveal the rest.
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      titles.forEach((title) => title.classList.add('is-in'));
    }
  }, { passive: true });
}
```
Project titles are giant rows that slide sideways as they cross the screen, odd rows one way and even rows the other. This is pure CSS scroll-driven animation. Browsers without it show a plain static row. The row clips, so the page never scrolls sideways, and the title is narrowed by the slide distance so it is never cut off. If SPEC.md gives the project a link, the giant title is that link. If not, use a plain `<h3 class="row-title">` with no `<a>`, never a made-up URL.

```html
<li class="project-row">
  <h3><a class="project-link row-title" href="https://example.com/project">Weather Dashboard</a></h3>
  <p class="row-desc">One real sentence about the project.</p>
</li>
```
```css
.project-row { overflow: clip; border-top: 2px solid var(--color-border); padding-block: var(--space-3); }
/* This is the only base .row-title rule; the hover section below adds to it. */
.row-title { display: block; min-height: 44px; font-family: var(--font-display); font-size: clamp(2.5rem, 13vw, 8rem); line-height: 1; color: var(--color-text); text-decoration: none; overflow-wrap: anywhere;
  font-variation-settings: "wght" 400, "wdth" 90; transition: font-variation-settings 600ms var(--ease-out), color 300ms ease-out; }
.row-desc { max-width: 40rem; margin-top: var(--space-2); color: var(--color-muted); }
@keyframes slide { from { transform: translateX(var(--from)); } to { transform: translateX(var(--to)); } }
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .row-title { --from: 0px; --to: var(--shift); max-width: calc(100% - var(--shift)); animation: slide linear both; animation-timeline: view(); animation-range: entry 0% cover 50%; }
    .project-row:nth-child(even) .row-title { --from: var(--shift); --to: 0px; }
  }
}
```
For extra drama the student may add a repeated echo of a title behind the row. Any such copy must be `aria-hidden="true"`.

### 3. Hover and focus: letters change shape
On a project row the title swells to heavy and fills with the accent colour. On a real link, keyboard focus does exactly the same. The width barely changes, so the title does not re-wrap.

```css
@media (hover: hover) {
  .project-row:hover .row-title { font-variation-settings: "wght" 900, "wdth" 96; color: var(--color-accent); }
}
a.row-title:focus-visible { font-variation-settings: "wght" 900, "wdth" 96; color: var(--color-accent); outline: 3px solid var(--color-accent-text); outline-offset: -3px; }
```

### 4. Navigation: scroll velocity leans the headlines
Fast scrolling makes the headlines lean and stretch a little, then they ease back upright when scrolling stops. One passive listener feeds a loop that runs only while the value is still moving. Nav links glide to their section.

```css
.lean { transform-origin: left bottom; transform: skewX(calc(var(--skew, 0) * 1deg)) scaleX(calc(1 + var(--stretch, 0))); }
main { overflow-x: clip; }
section[id] { scroll-margin-top: var(--space-6); }
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
```
```js
const leaners = document.querySelectorAll('.lean');
let scrollDelta = 0, lastY = window.scrollY, skew = 0, frame = 0;
function lean() {
  const target = clamp(scrollDelta * 0.25, -8, 8);   // small range: at most 8 degrees
  scrollDelta = 0;
  skew += (target - skew) * 0.12;                    // momentum
  const settled = Math.abs(skew) < 0.02 && target === 0;
  if (settled) skew = 0;
  leaners.forEach((el) => {
    el.style.setProperty('--skew', skew.toFixed(2));
    el.style.setProperty('--stretch', (Math.abs(skew) / 8 * 0.04).toFixed(3));
  });
  frame = settled ? 0 : requestAnimationFrame(lean); // loop stops when settled
}
if (!reduce) {
  window.addEventListener('scroll', () => {
    scrollDelta += window.scrollY - lastY;
    lastY = window.scrollY;
    if (!frame) frame = requestAnimationFrame(lean);
  }, { passive: true });
}
```

### 5. Signature: the cursor swells the name
On a mouse or trackpad, hero letters near the pointer get heavier and wider, fading out with distance. Touch screens skip it. The loop runs only while letters are still easing.

```js
if (heroName && !reduce && window.matchMedia('(pointer: fine)').matches) {
  const letters = [...heroName.querySelectorAll('.char')];
  const amount = letters.map(() => 0);
  let px = -9999, py = -9999, busy = false;
  function swell() {
    let moving = false;
    const boxes = letters.map((el) => el.getBoundingClientRect()); // read all first, then write (no layout thrash)
    letters.forEach((el, i) => {
      const box = boxes[i];
      const dist = Math.hypot(px - (box.left + box.width / 2), py - (box.top + box.height / 2));
      const target = clamp(1 - dist / 180, 0, 1);    // 180px reach
      amount[i] += (target - amount[i]) * 0.12;
      if (Math.abs(target - amount[i]) < 0.005) amount[i] = target; else moving = true;
      el.style.setProperty('--k', amount[i].toFixed(3));
    });
    busy = moving;
    if (moving) requestAnimationFrame(swell);
  }
  const wake = () => { if (!busy && !document.hidden) { busy = true; requestAnimationFrame(swell); } };
  window.addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; wake(); }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { px = py = -9999; wake(); });
}
```

## Reduced motion
Everything is visible and still: no rising letters, no slide, no skew, no cursor effect (the JavaScript above already skips them).

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .will-reveal .line { transform: none; }
  .lean { transform: none; }
}
```

## Performance
Split only the hero name and the section headings, so the total number of split letters stays small. Never split paragraphs. Animate `transform` and `font-variation-settings` only. Each rAF loop stops when its value settles, and browsers pause rAF in hidden tabs. No libraries.

## Libraries
None. Plain CSS and JavaScript only. A text-splitting library is not needed, `split()` above does the job.

## Avoid
- Type so big it overflows a phone. Check the longest word at 320px and lower the `vw` value if it does not fit.
- Splitting body paragraphs into letters, or markup that makes screen readers read letters one by one.
- A rAF loop that runs forever, or scroll listeners that are not passive.
- Scroll-jacking (taking over the scroll wheel, forced snapping) and motion that delays reading the name.
- Accent colour for small text on paper. Use `--color-accent-text` instead.
- Generic page habits: one word of a headline picked out in the accent, an ALL-CAPS label above every heading, a fade-up on every section. Here the type itself is the effect.
- Flashing, strobing, or anything that changes faster than three times per second.
- Springy cartoon bounces, decorative images, blobs, or gradients behind the type.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
