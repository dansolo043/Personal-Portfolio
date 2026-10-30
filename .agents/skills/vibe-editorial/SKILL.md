---
name: vibe-editorial
description: Restyles the portfolio site as a print magazine feature (look, layout and motion). Use ONLY when the student names the vibe-editorial skill or asks for the Editorial vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: generic
  tags: "design-art, business"
  intensity: standard
  version: "2"
---

# Vibe: Editorial

## Feel and who it's for
The portfolio reads like the opening spread of a confident print magazine: a dramatic serif name set like a masthead, hairline rules, a drop cap, wide margins and an asymmetric grid. It is literary and expensive-looking, never cute. The headlines are the performance: they are "typeset" line by line. Good for design, writing, business and anyone whose work is best sold by taste and a clear voice.

## Must keep (this is what makes it Editorial)
1. A high-contrast display serif for the name and headlines, set very large and tight, with a plain readable face for body text.
2. Newsprint white, deep ink and exactly ONE accent colour. The accent only appears in the drop cap, the drawn underlines, the current-section marker and focus rings.
3. Hairline and heavy rules, not boxes: no cards, no shadows, no rounded corners. Structure comes from rules and white space.
4. An asymmetric grid on wide screens (titles and text start in different columns) and a calm single column on phones.
5. Motion is slow and literary: long, softly decelerating moves. The only bold movement is lines of headline rising out of a mask.
6. A running header (the folio) that shows the real name of the section you are reading.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the green plum". Their request wins.

Palette, in words: stark newsprint white with a faint cool tint (not cream, not beige); near-black ink with a hint of blue; a mid grey-violet ink for secondary text; one deep bottle green for the accent, like a classic paperback spine. Everything sits on the white page, with no tinted panels and no accent fills, so every text colour only needs to pass on the page colour. If you add a fill, check its text pair first.

```css
:root {
  --color-bg: #FBFBFA;
  --color-text: #111114;    /* 18.2:1 on bg */
  --color-muted: #55555C;   /* 7.1:1 on bg, also the resting link underline */
  --color-accent: #0A5A44;  /* 7.9:1 on bg, so it works for the drop cap, small text and the focus ring */
  --color-rule: #C9C9C4;    /* hairlines only, never text (1.6:1) */
  --font-display: "Bodoni Moda", "Didot", Georgia, serif;
  --font-body: "Libre Franklin", system-ui, sans-serif;
  --ease-press: cubic-bezier(0.39, 0.575, 0.565, 1); /* soft deceleration, no snap */
  --mask-pad: 0.2em;        /* stops masks clipping descenders when line-height is under 1 */
  --folio-h: 5.4rem;        /* running header height on phones; 3.5rem from 56em up */
}
```
Alternatives that keep the feel: cerise `#B0124F` (6.7:1) or plum `#6B2A63` (9.5:1) as the accent on the same white. Or no accent at all: use `--color-text` where the accent appears.

Fonts: Bodoni Moda (a variable Didone with an optical-size axis, hairlines stay crisp at huge sizes) for the name, headings, pull quote and drop cap. Libre Franklin for body, header links and captions. Other display serifs that fit: Fraunces, Playfair Display, DM Serif Display. Instrument Serif and DM Serif Display have one weight, so set `font-weight: 400` on headings.
`<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..800;1,6..96,400..800&family=Libre+Franklin:wght@400;500;600&display=swap" rel="stylesheet">`

Spacing and rule weights are your call, but keep margins generous and body lines under about 65 characters. Corners stay square.

## Layout ideas
Base rules every builder needs (the other snippets assume them):
```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--color-bg); color: var(--color-text); font: 400 1.125rem/1.65 var(--font-body); }
h1, h2, h3, p, ul, blockquote, figure { margin: 0; padding: 0; }
ul { list-style: none; }
main { overflow-x: clip; }
.section, .hero { width: min(100% - 2rem, 72rem); margin-inline: auto; padding-top: clamp(4rem, 12vw, 9rem); } /* 16px gutters at 320px */
h1, h2, h3, .pull-quote, .folio-now { font-family: var(--font-display); font-weight: 500; letter-spacing: -0.015em; }
@media (min-width: 56em) {
  :root { --folio-h: 3.5rem; }
  .section, .hero { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 1.5rem; align-items: start; }
  .section-title { grid-column: 1 / span 5; }
  .section-body { grid-column: 6 / span 7; }
  .stories { grid-column: 1 / -1; }
  .story:nth-child(even) { margin-left: 33%; } /* the staggered, asymmetric rhythm */
}
/* Skills index and contact colophon */
.index li { break-inside: avoid; padding: 0.5rem 0; border-top: 1px solid var(--color-rule); font: italic 500 1.5rem/1.3 var(--font-display); }
@media (min-width: 40em) { .index { columns: 2; column-gap: 1.5rem; } }
.contact-main { margin-bottom: 1rem; font: 500 clamp(1.25rem, 5vw, 2.5rem)/1.2 var(--font-display); overflow-wrap: anywhere; }
```
- **Running header (folio):** sticky, white, one rule under it: the student's real name in italic display type, the name of the section on screen, and the section links (a second row on phones). See Navigation.
- **Hero (the cover):** a heavy-plus-hairline double rule across the top, then the real name huge, one word per line, left aligned, then the one-line intro from SPEC.md in a narrower column pushed right (`grid-column: 7 / span 5` on wide screens). If SPEC.md has no separate tagline, use the "Who I am" line without the name. Never write a new sentence.
- **About:** the real About text in a column starting at the sixth grid column, beginning with a drop cap. If it is only one short sentence, set it larger (about 1.75rem) and let the drop cap carry it.
- **Pull quote:** only if About has at least two sentences. Quote ONE sentence verbatim, set large in italic display type between a heavy rule and a hairline. Never reword it or add a credit under it. A one-sentence About gets no pull quote (it would repeat itself).
- **Projects:** "stories" in a staggered list: a hairline above, the project name large in display type, the real description under it. Even stories sit further right. The name is a link only if SPEC.md gives that project a link; otherwise it is plain text and nothing about it reacts.
- **Skills:** the real skills as a plain index list in italic display type, one per row separated by hairlines, two columns from 40em up. No pills, no "A · B · C" strings.
- **Contact:** a quiet colophon: the real email large and wrapping (`overflow-wrap: anywhere`, `font-size: clamp(1.25rem, 5vw, 2.5rem)` so it fits one line at 320px), then each real link with the label SPEC.md gives it. A link only if SPEC.md has one.
- **Footer:** omit it, or a plain "Back to top" link. No year, no slogan, no "made with". Either way give the last section generous bottom padding (`main > section:last-child { padding-bottom: clamp(4rem, 10vw, 8rem); }`) so the page does not end flush against the edge.
- **Images:** none unless SPEC.md lists some (then see the zoom-settle note in Scroll). Without images the type, drop cap and rules carry the layout. Never add stock photos.

## Make it theirs
- The one loud thing is the headline typesetting, so the name is the biggest object on the page and everything else stays quiet: no second accent, no ornament, no icons.
- Ground it in the student's own words: project names, skill names and the About text are the editorial content. Keep them exactly as written in SPEC.md.
- A clear scale with big jumps: the name (about `clamp(3rem, 17vw, 11rem)`), section titles (`clamp(2.5rem, 8vw, 5rem)`), story titles (`clamp(1.75rem, 5vw, 3rem)`), then 18px body. Check the longest real word of the name and of every title at 320px.

## Motion character
Tempo: slow and literary, 700 to 1200ms, one long soft deceleration (`--ease-press`, a gentle sine-like ease-out). Things rise, draw and fade; nothing bounces, snaps, springs, spins or follows the cursor. Only headline lines translate; every other reveal is opacity or a drawn rule. The snippets share one `script.js`: helpers first, then each moment in order.

Shared keyframes (put them once, near the top of `styles.css`):
```css
@keyframes typeset { from { transform: translateY(calc(100% + var(--mask-pad) * 2)); } to { transform: none; } }
@keyframes ink-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes rule-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
```

### 1. Page load: the cover assembles
The masthead rule draws across, the name is typeset (see 5), then the intro fades in. It is pure CSS, so the text is in the HTML and shows if JavaScript fails. It all finishes in about 1.5 seconds.

```html
<section class="hero" id="home" aria-labelledby="home-title">
  <div class="masthead-rule" aria-hidden="true"></div>
  <h1 id="home-title" class="hero-name"><span class="line"><span class="line-in">Sam</span></span> <span class="line"><span class="line-in">Rivera</span></span></h1>
  <p class="hero-intro">The one-line intro from SPEC.md.</p>
</section>
```
```css
.masthead-rule { grid-column: 1 / -1; height: 7px; margin-bottom: clamp(1.5rem, 5vw, 3rem); border-top: 4px solid var(--color-text); border-bottom: 1px solid var(--color-text);
  transform-origin: left; animation: rule-draw 1200ms var(--ease-press) 100ms both; }
.hero-intro { grid-column: 7 / span 5; max-width: 30rem; margin-top: 1.5rem; font-size: 1.25rem; animation: ink-in 900ms var(--ease-press) 500ms both; }
```
On phones the hero is a plain column, so the intro simply sits under the name. If you rename a class, rename it in the HTML, CSS and JavaScript together.

### 2. Scroll: quiet, slow reveals
Section titles are typeset when they arrive (see 5). Stories and the pull quote fade in softly while their rule draws across above them. No fade-up, no sliding: opacity and a drawn line only. JavaScript adds the hiding class, so without JavaScript everything is visible. Hidden content uses `opacity`, not `visibility`, so screen readers and Tab still reach it, and anything that receives focus reveals itself.

```html
<ul class="stories">
  <li class="story">
    <h3 class="story-title"><a href="https://example.com/project">Project title</a></h3> <!-- an <a> only if SPEC.md has a link -->
    <p class="story-desc">The one-line description from SPEC.md.</p>
  </li>
</ul>
```
```css
.story, .pull-quote { position: relative; margin-top: 3rem; padding-top: 1.5rem; }
.story::before, .pull-quote::before { content: ""; position: absolute; inset: 0 0 auto 0; border-top: 1px solid var(--color-text); transform-origin: left; }
.pull-quote::before { border-top-width: 4px; }
.story-title { font-size: clamp(1.75rem, 5vw, 3rem); line-height: 1.1; }
.story-desc { max-width: 34rem; margin-top: 0.75rem; color: var(--color-muted); }
/* The extra class makes the hidden state beat the base rules; .is-in below beats it again. */
.story.will-set::before, .pull-quote.will-set::before { transform: scaleX(0); }
.story.will-set > *, .pull-quote.will-set > * { opacity: 0; }
.story.will-set.is-in::before, .pull-quote.will-set.is-in::before { transform: none; transition: transform 1200ms var(--ease-press); }
.story.will-set.is-in > *, .pull-quote.will-set.is-in > * { opacity: 1; transition: opacity 1000ms var(--ease-press) 350ms; }
```
```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

// Typeset: wraps each word of a title in a mask. Words stay real text, spaces stay between them.
function typeset(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';
  words.forEach((word, i) => {
    const line = document.createElement('span');
    const inner = document.createElement('span');
    line.className = 'line';
    inner.className = 'line-in';
    inner.textContent = word;
    inner.style.setProperty('--i', i);
    line.append(inner);
    el.append(line);
    if (i < words.length - 1) el.append(' ');
  });
}

const targets = document.querySelectorAll('.section-title, .story, .pull-quote, .figure');
if (!reduce && 'IntersectionObserver' in window) {
  document.querySelectorAll('.section-title').forEach(typeset);
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also reveal anything already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add('is-in');
        reveal.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  targets.forEach((el) => { el.classList.add('will-set'); reveal.observe(el); });
  // Something near the very end may never reach the trigger line: at the bottom, reveal the rest.
  window.addEventListener('scroll', () => {
    if (atBottom()) targets.forEach((el) => el.classList.add('is-in'));
  }, { passive: true });
  // Keyboard users: whatever receives focus is revealed.
  document.addEventListener('focusin', (event) => {
    const hidden = event.target.closest('.will-set');
    if (hidden) hidden.classList.add('is-in');
  });
}
```
Images, only if SPEC.md lists some: wrap each in `<figure class="figure"><img class="figure-img" alt="What the image shows" ...></figure>` (real alt text, real caption only if SPEC.md has one). The image settles from a slight zoom inside a clipped frame: `.figure { overflow: clip; } .figure.will-set .figure-img { transform: scale(1.06); } .figure.will-set.is-in .figure-img { transform: none; transition: transform 1400ms var(--ease-press); }`. Keep each image under 500 KB.

### 3. Hover and focus: the underline draws in
Every link rests with a hairline underline; on hover and focus an accent line draws across it from the left, slowly. Cards and text without a real link do nothing.

```css
a {
  color: inherit; text-decoration: none; padding-bottom: 0.08em;
  background: linear-gradient(var(--color-accent), var(--color-accent)) 0 100% / 0% 2px no-repeat,
              linear-gradient(var(--color-muted), var(--color-muted)) 0 100% / 100% 1px no-repeat;
  -webkit-box-decoration-break: clone; box-decoration-break: clone; /* the line follows each wrapped line */
  transition: background-size 800ms var(--ease-press);
}
a:focus-visible { background-size: 100% 2px, 100% 1px; outline: 2px solid var(--color-accent); outline-offset: 4px; }
@media (hover: hover) { a:hover { background-size: 100% 2px, 100% 1px; } }
```
The header links override only the resting line (see 4), so they are not underlined until hovered or current.

### 4. Navigation: the running folio
The sticky header shows the real student name and the real name of the section on screen, like a magazine's running head. The current link gets the drawn accent underline and `aria-current="location"`. After a jump (link click or hash change) the target stays selected until the reader scrolls on their own (wheel, touch or scroll keys) or it leaves the screen, so a short last section is never stolen by the bottom-of-page rule.

```html
<header class="folio">
  <a class="folio-name" href="#home">Sam Rivera</a>
  <p class="folio-now" aria-hidden="true"><span>Home</span></p>
  <nav class="folio-nav" aria-label="Sections">
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>
```
Use only the sections SPEC.md has, with the names SPEC.md gives them. The folio text is decoration that mirrors the nav, so it is `aria-hidden`.
```css
.folio { position: sticky; top: 0; z-index: 10; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; column-gap: 1rem;
  padding: 0 max(1rem, calc((100% - 72rem) / 2)); background: var(--color-bg); border-bottom: 1px solid var(--color-text); }
.folio-name { min-height: 2.5rem; display: flex; align-items: center; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
  font: italic 500 1.125rem var(--font-display); background-image: none; }
.folio-now { font-size: 1.125rem; font-style: italic; text-align: right; }
.folio-now span { display: inline-block; animation: ink-in 700ms var(--ease-press) both; } /* a fresh span replays this */
.folio-nav { grid-column: 1 / -1; }
.folio-nav ul { display: flex; flex-wrap: wrap; justify-content: space-between; }
.folio-nav a { display: flex; align-items: center; min-height: 44px; padding-inline: 0.4rem; font-size: 0.8125rem; font-weight: 500; letter-spacing: 0.02em;
  background-position: 0 calc(50% + 0.85em), 0 calc(50% + 0.85em); background-size: 0% 2px, 0% 1px; } /* 5 links fit one row at 320px; if more, they wrap to a second row */
.folio-nav a[aria-current], .folio-nav a:focus-visible { background-size: 100% 2px, 0% 1px; }
@media (hover: hover) { .folio-nav a:hover { background-size: 100% 2px, 0% 1px; } }
.folio-nav a:focus-visible { outline-offset: -2px; background-size: 0% 2px, 0% 1px; } /* ring inside the link, so the screen edge never clips it; no underline under the ring, or the two read as a double line */
@media (min-width: 56em) {
  .folio { grid-template-columns: auto 1fr auto; }
  .folio-name { min-height: 3.5rem; }
  .folio-now { text-align: center; }
  .folio-nav { grid-column: auto; }
  .folio-nav ul { gap: 0.5rem; }
}
section[id] { scroll-margin-top: var(--folio-h); } /* so the sticky header never covers a heading */
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
```
```js
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.folio-nav a')];
const folioNow = document.querySelector('.folio-now');
let current = sections.length ? sections[0].id : '';
let locked = '';  // set by a jump, cleared when the reader scrolls on their own
let lockSeen = false; // true once the jump target has been on screen (it starts off screen)

function setCurrent(id) {
  current = id;
  let label = '';
  navLinks.forEach((link) => {
    if (link.hash === '#' + id) { link.setAttribute('aria-current', 'location'); label = link.textContent; }
    else link.removeAttribute('aria-current');
  });
  if (folioNow && label) {
    const next = document.createElement('span'); // a new element replays the fade
    next.textContent = label;
    folioNow.replaceChildren(next);
  }
}
function spy() {
  if (!sections.length) return;
  const probe = window.innerHeight * 0.35;
  const rects = sections.map((section) => section.getBoundingClientRect()); // read everything first
  let id = sections[0].id;
  rects.forEach((rect, i) => { if (rect.top <= probe) id = sections[i].id; });
  if (window.scrollY < 8) id = sections[0].id;
  else if (atBottom()) id = sections[sections.length - 1].id;
  const lockIndex = sections.findIndex((section) => section.id === locked);
  if (lockIndex >= 0) {
    const r = rects[lockIndex];
    const onScreen = r.bottom > 0 && r.top < window.innerHeight;
    if (onScreen) lockSeen = true;
    if (onScreen || !lockSeen) id = locked; else locked = ''; // keep it until it has been seen and then left
  }
  if (id !== current) setCurrent(id); // then write
}
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { ticking = false; spy(); }); // one frame per scroll burst, no endless loop
}
function lockTo(hash) {
  const id = hash.replace('#', '');
  if (!sections.some((section) => section.id === id)) return; // ignore hashes that are not sections
  locked = id; lockSeen = false; setCurrent(id);
}
function unlock() { locked = ''; onScroll(); }
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
window.addEventListener('hashchange', () => lockTo(location.hash));
navLinks.forEach((link) => link.addEventListener('click', () => lockTo(link.hash)));
['wheel', 'touchmove'].forEach((type) => window.addEventListener(type, unlock, { passive: true }));
window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) unlock();
});
if (location.hash) lockTo(location.hash);
spy();
```

### 5. Signature: headlines are typeset, line by line
The name and every section title rise out of a mask one line at a time, as if being set in type. This is the one loud moment, so nothing else moves this far.

Each line is a mask (`.line`) holding the moving text (`.line-in`). The hero name is written by hand in the HTML in step 1, one `.line` per word (names have few words and it keeps the first paint exact). Section titles are split into words by `typeset()` above, and the words of a title may share a line. The masks are never measured, so a name that wraps differently at 320px cannot break the reveal. The only measuring is a size fit, so the longest word always fits the screen.

```css
.line { display: block; overflow: hidden; padding: var(--mask-pad) 0.06em; margin: calc(var(--mask-pad) * -1) -0.06em; } /* pad so descenders and italic overhang are not clipped */
.section-title .line { display: inline-block; vertical-align: top; }
.line-in { display: inline-block; white-space: nowrap; }

.hero-name { grid-column: 1 / -1; font-size: calc(clamp(3rem, 17vw, 11rem) * var(--fit, 1)); line-height: 0.9; letter-spacing: -0.03em; }
.hero-name .line-in { animation: typeset 1000ms var(--ease-press) both 150ms; }
.hero-name .line:nth-child(2) .line-in { animation-delay: 300ms; }
.hero-name .line:nth-child(3) .line-in { animation-delay: 450ms; }
.hero-name .line:nth-child(n + 4) .line-in { animation-delay: 600ms; }

.section-title { margin-bottom: 2rem; font-size: clamp(2.5rem, 8vw, 5rem); line-height: 1; }
/* Titles use a transition, the hero uses an animation, so the two never fight. */
.section-title.will-set .line-in { transform: translateY(calc(100% + var(--mask-pad) * 2)); }
.section-title.will-set.is-in .line-in { transform: none; transition: transform 1000ms var(--ease-press); transition-delay: calc(var(--i, 0) * 140ms); }
```
```js
// Shrinks the name only if its longest word would not fit. Safe to run again: it measures at full size first.
const heroName = document.querySelector('.hero-name');
function fitName() {
  if (!heroName) return;
  heroName.style.setProperty('--fit', 1);
  const room = heroName.clientWidth;
  const widest = Math.max(...[...heroName.querySelectorAll('.line-in')].map((el) => el.offsetWidth));
  // On phones the name may also grow (up to 1.6x) so the longest word fills the column, like a masthead.
  const most = window.innerWidth < 640 ? 1.6 : 1;
  heroName.style.setProperty('--fit', Math.min(most, room / widest).toFixed(3));
}
fitName();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName); // the real font is wider than the fallback
window.addEventListener('resize', () => requestAnimationFrame(fitName));
```
The drop cap is not animated. It is the quiet typographic anchor of About. If the About text starts with a one-letter word ("I", "A"), leave the drop cap off: a lone giant letter reads as a stray slab, not a cap.
```html
<div class="section-body">
  <p class="about-text dropcap">The real About text from SPEC.md.</p>
  <blockquote class="pull-quote"><p>One sentence copied word for word from the About text.</p></blockquote> <!-- only if About has 2+ sentences -->
</div>
```
```css
.dropcap::first-letter { float: left; margin: 0.04em 0.1em 0 0; font: 600 5.2em/0.72 var(--font-display); color: var(--color-accent); }
.about-text { max-width: 36rem; }
.pull-quote { padding-bottom: 1.5rem; border-bottom: 1px solid var(--color-text); font-size: clamp(1.5rem, 4vw, 2.25rem); font-style: italic; line-height: 1.25; }
```

## Reduced motion
Everything is visible and still. The JavaScript above already skips the hiding classes and the title split; this block undoes the CSS starting states for the cover and anything else.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .masthead-rule, .hero-intro, .hero-name .line-in { transform: none; opacity: 1; }
  .will-set .line-in, .will-set .figure-img, .will-set::before { transform: none !important; }
  .will-set > * { opacity: 1 !important; }
}
```

## Libraries
None. Plain CSS and JavaScript only. A text-splitting library is not needed, `typeset()` does the job.

## Avoid
- Cream paper with a terracotta, rust or oxblood accent, and any second accent colour. Inter for body text.
- Numbered sections, a table of contents, footnotes or citations. Those belong to academic styles, not a magazine.
- Invented editorial furniture: issue numbers, dates, datelines, bylines, "Vol. 1", fake publications, captions, or any pull quote that is not a verbatim sentence of the student's About text.
- Stock photos, ornaments, icons and gradients. Text in `--color-rule` (it is for hairlines only).
- A masthead word that overflows at 320px, or clipped descenders because the mask has no padding.
- Fast, springy or sliding reveals, a fade-up on every section, scroll-jacking, or anything flashing.
- Generic page habits: a "->" after every link, "A · B · C" strings, 01 / 02 / 03 on things that are not a sequence, one word of a headline picked out in the accent, an ALL-CAPS eyebrow above every heading, the same rounded soft-shadow card everywhere.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
