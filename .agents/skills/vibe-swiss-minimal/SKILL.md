---
name: vibe-swiss-minimal
description: Restyles the portfolio site in the Swiss International Typographic Style, with a strict column grid, flush-left type, one red accent and numbered sections (look, layout and motion). Use ONLY when the student names the vibe-swiss-minimal skill or asks for the Swiss Minimal vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: generic
  tags: ""
  intensity: standard
  version: "2"
---

# Vibe: Swiss Minimal

## Feel and who it's for
A poster from a 1960s Zurich design studio, made into a website: white paper, black type, one red accent, and everything hung on a visible column grid. It should feel exact, calm and a little severe, like a designer who removed everything that was not needed. Good for anyone who wants to look organised and confident (design, business, engineering) and for students who like clean things that are hard to get wrong.

## Must keep (this is what makes it Swiss Minimal)
1. A column grid that every block obeys: 12 columns on desktop, 4 on phones. Text and images start on a column line, never "about there". The hero shows the columns as faint tinted bands, so the grid is visible.
2. Flush-left, ragged-right text everywhere. Never centred, never justified.
3. Asymmetric layout. The section number and title live in the left columns, the content in the right columns, and a lot of white space is left open on purpose.
4. One sans-serif family, a few clear sizes and two weights (regular and heavy). Hierarchy comes from size and weight, never from colour or decoration.
5. Black on white plus ONE red accent. Red is used for the section numbers, links, the active nav mark and one bar on the hero.
6. Numbered sections, counted from the student's real section order (Home is unnumbered).
7. Motion is exact: things slide sideways by exactly one column and stop. No bounce, no spin, no fade-ups.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the accent blue". Their request wins. If they change a colour, recheck its contrast.

Palette, in words: pure white paper; near-black ink; a mid grey for secondary text; a pale grey for the column bands; one strong signal red.

```css
:root {
  --color-bg: #FFFFFF;
  --color-surface: #EEEEEE;   /* the hero's column bands */
  --color-text: #111111;      /* 18.9:1 on bg, 16.3:1 on surface */
  --color-muted: #575757;     /* 7.2:1 on bg (used for project descriptions, which sit on bg only) */
  --color-accent: #D10019;    /* 5.6:1 on bg, 4.9:1 on surface; white on accent 5.6:1 */
  --color-rule: #B0B0B0;      /* hairlines only, never text */
  --font: "Schibsted Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif;

  --cols: 4;                  /* the grid: 4 columns on phones */
  --body-cols: 4;
  --gutter: 1rem;
  --margin: 1rem;             /* space either side of the page */
  --header-h: 0px;            /* the sticky header's real height on desktop, so jumps land below it */
  /* One column plus one gutter. 100cqw is the page width, so this is exact at every screen size. */
  --step: calc((100cqw + var(--gutter)) / var(--cols));

  --ease-grid: cubic-bezier(0.3, 0, 0.1, 1);  /* firm start, long exact stop, no overshoot */
  --move: 520ms;
  --beat: 80ms;                                /* the stagger between neighbours */
  --tick: 110ms;                               /* one step of a counting digit */
}
@media (min-width: 48rem) {
  :root { --cols: 12; --body-cols: 8; --gutter: 1.5rem; --margin: 1.5rem; --header-h: 3.75rem; }
}
```

Font: Schibsted Grotesk for everything, in weights 400, 500 and 800 (the link is in the head below). Alternatives: Host Grotesk, Albert Sans or Public Sans. Not Inter.

Type scale (a guide): body 1.0625rem, line height 1.55, lines under 70 characters; section title `clamp(1.75rem, 3.2vw, 2.5rem)` weight 800; section number `clamp(3rem, 9vw, 6.5rem)` weight 800; hero name `clamp(2.75rem, 13vw, 9rem)` weight 800. Corners are square. No shadows, no gradients.

## Layout ideas
- **Head.** Every page starts like this; the title is the student's name and the description is the one-line intro, both from SPEC.md.
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
  <link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
</head>
```
- **Assembly.** `styles.css`: the `:root` blocks above, the base rules below, header, hero, sections, project/skill/contact rules, then the shared keyframes, moments 1 to 5 and the reduced-motion block last. `script.js`: the shared helpers, then moment 5 (digits), 2 (reveal), 4 (navigation). Moment 3 is CSS only.
  Warning: `--step` only works on elements inside a `.page` box (it measures `cqw`), so keep everything that slides inside `main`.
- **Page shell and base rules.** The snippets assume this. Every wide block sits inside `.page`, which is also the measuring box for the grid (`cqw` units).
```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: auto; }
body { margin: 0; overflow-x: clip; background: var(--color-bg); color: var(--color-text); font-family: var(--font); font-size: 1.0625rem; line-height: 1.55; }
h1, h2, h3, p, ul { margin: 0; }
ul { padding: 0; list-style: none; }
.page { width: min(100% - 2 * var(--margin), 75rem); margin-inline: auto; container-type: inline-size; }
/* Everything on the grid uses one of these two shapes. */
.hero, .section, .header-row { display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); column-gap: var(--gutter); }
.sec-body, .project-row, .skill-list { display: grid; grid-template-columns: repeat(var(--body-cols), minmax(0, 1fr)); column-gap: var(--gutter); }
a { color: var(--color-accent); text-decoration: underline 2px; text-underline-offset: 0.2em; }
a:hover { color: var(--color-text); text-decoration-thickness: 4px; } /* instant: colour never animates */
:focus-visible { outline: 3px solid var(--color-text); outline-offset: 3px; }
```
- **Header:** the student's name at the left (it links to `#home`), then one link per SPEC.md section after Home, starting on the same column as the page content. Plain on phones, sticky on desktop with a hairline below that sits inside the header's height. Links are at least 44px tall and wide (side padding does it); if they don't fit one row at 320px they wrap to a second row, never scroll sideways.
```html
<header class="site-header">
  <div class="page header-row">
    <a class="brand" href="#home">Sam Rivera</a>
    <nav class="site-nav" aria-label="Sections">
      <ul><li><a href="#about">About</a></li><li><a href="#projects">Projects</a></li></ul>
    </nav>
  </div>
</header>
```
```css
.site-header { border-bottom: 1px solid var(--color-text); background: var(--color-bg); }
.header-row { padding-block: 0.5rem; } /* room for the focus ring at the very top of the page */
.brand { grid-column: 1 / -1; justify-self: start; display: inline-flex; align-items: center; min-height: 44px; color: var(--color-text); font-weight: 800; text-decoration: none; }
.site-nav { grid-column: 1 / -1; }
@media (min-width: 48rem) {
  .site-header { position: sticky; top: 0; z-index: 10; min-height: var(--header-h); } /* border-box, so the border is inside it */
  .header-row { align-items: center; padding-block: 0; min-height: calc(var(--header-h) - 1px); }
  .brand { grid-column: 1 / span 4; }
  .site-nav { grid-column: 5 / -1; }
}
```
- **Hero:** a red bar exactly one column wide, the real name huge below it, and the one-line intro from SPEC.md (if SPEC.md has no separate tagline, use the "Who I am" line without the name) pushed right to column 5 on desktop. Sit the text at the bottom of a tall hero so the top is empty.
```html
<main class="page">
  <section class="hero" id="home" aria-labelledby="home-title">
    <span class="hero-bar" aria-hidden="true"></span>
    <h1 id="home-title" class="hero-name">Sam Rivera</h1>
    <p class="hero-intro">The one-line intro from SPEC.md.</p>
  </section>
```
```css
/* Column bands: each tile is one column wide plus a transparent gutter, repeated across the hero. */
.hero { align-content: end; row-gap: 1.5rem; min-height: min(78svh, 40rem); padding-block: 2.5rem;
  background: linear-gradient(to right, var(--color-surface) calc(100% - var(--gutter)), transparent 0) 0 0 / var(--step) 100% repeat-x; }
.hero-bar { display: block; grid-column: 1; height: 0.75rem; background: var(--color-accent); transform-origin: left; }
.hero-name { grid-column: 1 / -1; font-size: clamp(2.75rem, 13vw, 9rem); font-weight: 800; line-height: 0.95; letter-spacing: -0.03em; overflow-wrap: anywhere; }
.hero-intro { grid-column: 1 / -1; max-width: 28ch; font-size: clamp(1.25rem, 2.6vw, 1.875rem); font-weight: 500; line-height: 1.25; }
@media (min-width: 48rem) { .hero-name { grid-column: 1 / span 10; } .hero-intro { grid-column: 5 / span 6; } }
```
- **Sections:** a heavy black rule, then the number and title in columns 1 to 4 and the content in columns 5 to 12. On phones everything stacks. Numbers come from the order of the nav links: the first section after Home is `01`.
```html
  <section class="section" id="projects" aria-labelledby="projects-title">
    <p class="sec-num" aria-hidden="true">02</p>
    <h2 id="projects-title" class="sec-title">Projects</h2>
    <div class="sec-body"> ... </div>
  </section>
</main>
```
```css
.section { align-content: start; padding-block: clamp(2rem, 6vw, 4.5rem); border-top: 2px solid var(--color-text); }
.hero[id], .section[id] { scroll-margin-top: var(--header-h); }
.sec-num { --cell: 1.15em; grid-column: 1 / -1; color: var(--color-accent); font-size: clamp(3rem, 9vw, 6.5rem); font-weight: 800; line-height: 1.15; }
.sec-title { grid-column: 1 / -1; font-size: clamp(1.75rem, 3.2vw, 2.5rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; }
.sec-body { grid-column: 1 / -1; margin-top: 1.5rem; align-content: start; }
.sec-body > * { grid-column: 1 / -1; }
.sec-body > p { max-width: 36rem; }
@media (min-width: 48rem) {
  .sec-num, .sec-title { grid-column: 1 / span 4; }
  .sec-num { grid-row: 1; } .sec-title { grid-row: 2; align-self: start; }
  .sec-body { grid-column: 5 / -1; grid-row: 1 / span 2; margin-top: 0; }
}
```
- **About:** the real bio as plain paragraphs in the right columns. **Skills:** a ruled list, each skill two columns wide (so two per row on phones, four on desktop). **Contact:** large plain links, one per row, with `overflow-wrap: anywhere` and a size small enough that a real email fits on one line at 320px.
- **Projects:** one ruled row per real project: name in columns 2 to 4 of the content area, description in columns 5 to 8. A link only if SPEC.md has one, with the label SPEC.md gives it. Rows are not numbered. If a project has an image, it spans whole columns and has square corners.
```html
<div class="sec-body">
  <ul class="project-list">
    <li class="project-row">
      <h3 class="project-title">Project name from SPEC.md</h3>
      <p class="project-desc">The project's description from SPEC.md.</p>
      <!-- only if SPEC.md has a link for this project: -->
      <a class="project-link" href="LINK-FROM-SPEC">The label SPEC.md gives the link</a>
    </li>
  </ul>
</div>
<ul class="skill-list"><li>A skill from SPEC.md</li></ul>
<ul class="contact-list"><li><a href="mailto:EMAIL-FROM-SPEC">The email from SPEC.md</a></li></ul>
```
```css
.project-row { padding-block: 1.25rem; border-top: 1px solid var(--color-rule); row-gap: 0.5rem; }
.project-title { grid-column: 1 / -1; font-size: 1.5rem; font-weight: 800; line-height: 1.15; transition: transform var(--move) var(--ease-grid); }
.project-desc, .project-link { grid-column: 1 / -1; }
.project-desc { color: var(--color-muted); }
.skill-list li { grid-column: span 2; padding-block: 0.5rem; border-top: 1px solid var(--color-rule); font-weight: 500; }
.contact-list li { border-top: 1px solid var(--color-rule); }
.contact-list a { display: block; min-height: 44px; padding-block: 0.5rem; font-size: clamp(1rem, 4.4vw, 1.75rem); font-weight: 500; overflow-wrap: anywhere; }
@media (min-width: 48rem) {
  .project-title { grid-column: 2 / span 3; grid-row: 1 / span 2; }
  .project-desc, .project-link { grid-column: 5 / -1; }
}
```
- No footer (this overrides any footer rule elsewhere). The last section is Contact; if the student wants one, a plain "Back to top" link to `#home` and nothing else.
- **Which SPEC.md lines appear:** the name and the one-line intro ("Who I am"), About me, Projects, Skills and Contact, in the order of the Sections line. "Audience and goal", "Sections" and "Vibe and feel" are never printed. Capitalising the first letter of a fragment is fine; the link label is the word SPEC.md gives (for example "GitHub").

## Make it theirs
- The one loud thing is the numbers counting in. The hero and the slides stay quiet: no extra shapes, no second colour, no icons.
- The student's own work sets the details. Section names, project names and skills are copied exactly from SPEC.md. If a student has only three sections, the numbers stop at `03`. Never add sections or numbers SPEC.md doesn't back up.
- Every device carries meaning: the red bar is one grid column (it marks where the grid starts), numbers show the real order of sections, red marks only things you can use or the place you are.

## Motion character
Tempo: measured, 360 to 520ms, with neighbours arriving one beat (80ms) after each other. Easing: `var(--ease-grid)` for everything that slides, `steps()` for the counting digits. Things move sideways by exactly one column (`var(--step)`) and stop on the line; the only other movement is a bar growing from its left end. Nothing bounces, floats, fades up, loops or reacts to the cursor position. Colour changes are instant, never animated. The snippets share one `script.js`: start with the shared helpers and add each moment in order.

```css
/* Shared by page load, scroll and navigation. Defining only the "from" keeps the element's real values as the end. */
@keyframes slide-col { from { opacity: 0; transform: translateX(calc(var(--step) * -1)); } }
@keyframes draw-bar { from { transform: scaleX(0); } }
```
```js
const sections = [...document.querySelectorAll('main .section')];
const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
function reveal(section) { section.classList.add('is-in'); }
```

### 1. Page load: bar, name, intro
The red bar draws across its one column, then the name and intro slide in one column from the left, a beat apart. Pure CSS, so the text is in the HTML and still shows if JavaScript fails.

```css
.hero-bar { animation: draw-bar var(--move) var(--ease-grid) both; }
.hero-name { animation: slide-col var(--move) var(--ease-grid) var(--beat) both; }
.hero-intro { animation: slide-col var(--move) var(--ease-grid) calc(var(--beat) * 2) both; }
```

### 2. Scroll: content slides onto the grid
When a section comes on screen its title, then each block of its content (each paragraph, and each row of a list), slides in one column from the left and stops, a beat apart. The hiding class is added by JavaScript, so without JavaScript everything is visible. Hidden items use `opacity`, not `visibility`, so screen readers and Tab still reach them; a section reveals the moment anything inside it gets focus. `overflow-x: clip` on `body` (above) stops the sideways start position from creating a scrollbar.

```css
.will-reveal .sec-title,
.will-reveal .reveal-item { opacity: 0; transform: translateX(calc(var(--step) * -1)); }
/* The transition sits on the arrived state, so the hidden state never animates. */
.will-reveal.is-in .sec-title,
.will-reveal.is-in .reveal-item {
  opacity: 1; transform: none;
  transition: opacity var(--move) var(--ease-grid), transform var(--move) var(--ease-grid);
  transition-delay: calc(min(var(--i, 0), 5) * var(--beat));
}
```
```js
if ('IntersectionObserver' in window) {
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also reveal sections already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        reveal(entry.target);
        revealer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  sections.forEach((section) => {
    section.classList.add('will-reveal');
    const title = section.querySelector('.sec-title');
    if (title) title.style.setProperty('--i', 0);
    // Paragraphs and list rows arrive a beat apart. --i is set with style.setProperty, which is fine: it only writes a custom property.
    section.querySelectorAll('.sec-body > :not(ul), .sec-body > ul > li').forEach((el, i) => {
      el.classList.add('reveal-item');
      el.style.setProperty('--i', i + 1);
    });
    revealer.observe(section);
  });
}
// Keyboard users: a section reveals as soon as Tab lands inside it.
document.addEventListener('focusin', (event) => {
  const section = event.target.closest('.will-reveal');
  if (section) reveal(section);
});
```

### 3. Hover and focus: the row steps into the margin
Only a project row that contains a real link reacts: its title slides left into the empty first column, exactly one column, and the link underline thickens (see `a:hover` above). Keyboard focus does the same. This needs a project link in SPEC.md; with none, nothing slides, which is correct. It is for wide screens with a mouse; on phones the title already starts at the left edge, so nothing moves.

```css
@media (min-width: 48rem) {
  .project-row:has(a):focus-within .project-title { transform: translateX(calc(var(--step) * -1)); }
}
@media (min-width: 48rem) and (hover: hover) {
  .project-row:has(a):hover .project-title { transform: translateX(calc(var(--step) * -1)); }
}
```

### 4. Navigation: the red mark and the landing
The link for the section on screen gets a red bar that grows under it (and `aria-current`). When you jump to a section, its title and content slide in again, one column, as if setting onto the grid. After a jump the clicked link stays selected until you scroll on your own, so a short last section is not overtaken by the one before it.

```css
.site-nav ul { display: flex; flex-wrap: wrap; margin-inline-start: -0.5rem; } /* padding below keeps the text on the column line */
.site-nav a { position: relative; display: inline-flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; padding-inline: 0.5rem; color: var(--color-text); font-size: 0.9375rem; font-weight: 500; text-decoration: none; }
.site-nav a:hover { color: var(--color-accent); }
.site-nav a::after { content: ""; position: absolute; left: 0.5rem; right: 0.5rem; bottom: 6px; height: 3px; background: var(--color-accent); transform: scaleX(0); transform-origin: left; transition: transform 360ms var(--ease-grid); }
.site-nav a[aria-current]::after { transform: scaleX(1); }

/* The landing replays the slide. It uses an animation (not the transition above), so the two never fight. */
.section:target .sec-title,
.section:target .reveal-item { animation: slide-col var(--move) var(--ease-grid) backwards; animation-delay: calc(min(var(--i, 0), 5) * var(--beat)); }
```
```js
const links = [...document.querySelectorAll('.site-header a[href^="#"]')]; // the name link counts: it marks Home
const spied = [...document.querySelectorAll('main > section[id]')];
let pinned = null; // the section we just jumped to
let queued = false;

function setCurrent(id) {
  links.forEach((a) => (a.hash === '#' + id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
}
function pin(id) {
  const target = document.getElementById(id);
  if (!target) return;
  pinned = id;
  if (target.classList.contains('will-reveal')) reveal(target); // so the landing never starts from hidden
  setCurrent(id);
}
function update() {
  // Read everything first, then write.
  const line = window.innerHeight * 0.35;
  const rects = spied.map((s) => s.getBoundingClientRect());
  let current = spied[0];
  rects.forEach((r, i) => { if (r.top <= line) current = spied[i]; });
  if (atBottom()) { current = spied[spied.length - 1]; sections.forEach(reveal); } // a short last section may never reach the line
  if (pinned) {
    const i = spied.findIndex((s) => s.id === pinned);
    if (i > -1 && rects[i].bottom > 0 && rects[i].top < window.innerHeight) current = spied[i];
    else pinned = null; // the pinned section left the screen
  }
  if (current) setCurrent(current.id);
}
const unpin = () => { pinned = null; };
['wheel', 'touchmove'].forEach((name) => window.addEventListener(name, unpin, { passive: true }));
window.addEventListener('keydown', (e) => { if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) unpin(); });
links.forEach((a) => a.addEventListener('click', () => pin(a.hash.slice(1))));
window.addEventListener('hashchange', () => pin(location.hash.slice(1)));
window.addEventListener('scroll', () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { queued = false; update(); }); // one pass per frame, then it stops
}, { passive: true });
update();
```

### 5. Signature: section numbers count in
Each big red number is a rolling counter. When its section arrives, every digit steps up from `0` to its real value, one hard step at a time, exactly one digit-height per step, then stays. `02` ticks 0, 1, 2 in about a third of a second; `12` rolls its first digit once and its second twice. Without JavaScript the number is plain text. A digit `0` has nothing to count; its `steps(0)` is ignored by the browser, which is fine. The counter is decoration and `aria-hidden`, so screen readers read only the real heading.

```css
.digit { display: inline-block; width: 0.62em; height: var(--cell); overflow: clip; vertical-align: top; text-align: center; }
.digit, .digit-strip { user-select: none; } /* the numbers are decoration: don't select or find "0 1 2" */
.digit-strip { display: block; }
.digit-strip span { display: block; height: var(--cell); } /* every cell is one digit high, so each step lands exactly */
.will-reveal .digit-strip { transform: none; }
.will-reveal.is-in .digit-strip {
  transform: translateY(calc(var(--to) * var(--cell) * -1));
  transition: transform calc(var(--to) * var(--tick)) steps(var(--to), jump-end);
}
```
```js
document.querySelectorAll('.sec-num').forEach((num) => {
  const text = num.textContent.trim(); // "02", written in the HTML
  num.textContent = '';
  [...text].forEach((ch) => {
    if (!/\d/.test(ch)) { num.append(ch); return; }
    const to = Number(ch);
    const digit = document.createElement('span');
    digit.className = 'digit';
    digit.style.setProperty('--to', to);
    const strip = document.createElement('span');
    strip.className = 'digit-strip';
    for (let n = 0; n <= to; n += 1) {
      const cell = document.createElement('span');
      cell.textContent = n;
      strip.append(cell);
    }
    digit.append(strip);
    num.append(digit);
  });
});
```

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  /* Undo every hidden starting state, not just the animations. */
  .will-reveal .sec-title,
  .will-reveal .reveal-item { opacity: 1; transform: none; }
  .will-reveal .digit-strip { transform: translateY(calc(var(--to) * var(--cell) * -1)); }
  .project-title { transform: none !important; }
}
```
Everything is visible and in place, and the section numbers show their final values.

## Libraries
None. Plain CSS and JavaScript only. Needs a browser that knows `cqw` units and `:has()` (all current ones).

## Avoid
- Centred or justified text, rounded corners, shadows, gradients, glass, icons, emoji, stock photos, decorative shapes.
- A second accent colour, or red body text. Red is for numbers, links, the nav mark and the hero bar only.
- Letting blocks float off the grid: if something does not start on a column line, move it.
- Numbering things that are not a sequence (projects, skills, contact links). Only sections are numbered.
- Counting that shifts the layout (keep the digit width fixed), repeats, or hides the real heading from a screen reader.
- Bounce, overshoot, spring, parallax, scroll snapping, scroll hijacking, looping or flashing anything.
- Animating colour. Hover colour changes are instant.
- Generic page habits: a "→" after every link, "A · B · C" strings, one word of a heading picked out in the accent, an ALL-CAPS label above every heading, the same card and soft shadow everywhere, a fade-up on every section.
- Inter on everything, and cream plus orange-red. This look is white paper and exact red.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
