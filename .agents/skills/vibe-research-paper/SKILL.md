---
name: vibe-research-paper
description: Restyles the portfolio site as a typeset journal article with a title block, an abstract, numbered sections and citation-style popover notes (look, layout and motion). Use ONLY when the student names the vibe-research-paper skill or asks for the Research Paper vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: major
  tags: "science, data-sci"
  intensity: standard
  version: "2"
---

# Vibe: Research Paper

## Feel and who it's for
The portfolio reads like a carefully typeset journal article: a title block, an author line, the About text set as the abstract, numbered sections, a table of contents in the margin, and small citation markers that open notes. It is calm, literate and rigorous. Good for biology, chemistry, physics and environmental science students who want supervisors, labs and co-op employers to see careful thinking. It is a paper, not a magazine: structured and academic, with no big display type or dramatic layouts.

## Must keep (this is what makes it Research Paper)
1. A light page with ink-coloured text, a text serif for reading, and one deep accent. The measure stays under 70 characters.
2. A title block (name as the title, the intro as the author line, a double rule), then the About text as the abstract: set smaller, between two thin rules. The abstract IS the student's real About text. Nothing else is added to it.
3. Numbered sections after the abstract (1, 2, 3 by order) and a numbered table of contents that marks the section you are in.
4. Citation markers: small superscript buttons that open a popover note with real detail from SPEC.md. This is the one signature move.
5. Calm motion: short, quiet opacity and tiny transform changes. Nothing travels more than a few pixels. It is the calmest vibe in the catalog.
6. HONESTY: no invented references, DOIs, journals, volume or page numbers, dates, "received/accepted" lines, affiliations, co-authors or keywords. The author line is the student's real name and what SPEC.md says about them. Section numbers are allowed because they count the page's real sections.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the accent navy". Their request wins.

Palette, in words: almost-white paper with a faint green-grey cast (not cream); green-black ink; a mid grey-green for secondary text; a pale sage tint for the abstract; white for note cards; one deep pine accent for links, markers and the current section.

```css
:root {
  --color-bg: #F9FAF7;
  --color-tint: #EEF1EA;      /* abstract band */
  --color-surface: #FFFFFF;   /* popover notes */
  --color-text: #1C211D;      /* 15.6:1 on bg, 14.3:1 on tint, 16.4:1 on surface */
  --color-muted: #505850;     /* 7.0:1 on bg, 6.5:1 on tint, 7.4:1 on surface */
  --color-accent: #17604F;    /* 7.1:1 on bg, 6.5:1 on tint, 7.4:1 on surface; white on accent 7.4:1 */
  --color-border: #B9C0B3;    /* hairlines only, never text */
  --font-body: "Source Serif 4", "Iowan Old Style", Georgia, serif;
  --font-label: "Source Sans 3", system-ui, sans-serif;
  --ease-quiet: cubic-bezier(0.4, 0.1, 0.25, 1); /* gentle start, long soft landing */
  --t-short: 200ms;  /* hover, markers, popovers */
  --t-base: 400ms;   /* things settling in */
  --settle: 4px;     /* the furthest anything travels */
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--color-bg); color: var(--color-text); font: 400 1.125rem/1.65 var(--font-body); font-optical-sizing: auto; text-wrap: pretty; }
```
Fonts: Source Serif 4 for reading (it has an optical size axis, so headings and body each get the right shapes) and Source Sans 3 for small labels. Alternatives: Newsreader, Literata or Crimson Pro for the serif. Not Playfair Display (that is magazine territory) and not Inter.
`<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">`

Type scale: title `clamp(2.25rem, 7vw, 3.5rem)` at weight 600, section headings 1.5rem, project names 1.1875rem, body 1.125rem, abstract and notes 1rem, labels 1.125rem in the sans with `font-variant-caps: all-small-caps` (small caps render about a third smaller, so this keeps them readable). Corners are square or nearly square. Swap the rem gaps below for your spacing scale.

## Layout ideas
- **Page:** one `.page` wrapper holding the contents nav and `<main>`. `main` is one column about 34rem wide. At 64em and up the nav is a sticky left margin column; on phones it is a plain wrapping list at the top. There is no `<header>` wrapper, because a sticky nav must be a direct child of `.page`. Omit the footer.
- **Title block (Home):** the student's name as the `<h1>` title, the one-line intro as the author line (the intro from SPEC.md; if SPEC.md has no separate tagline, the "Who I am" line without the name), then a double rule. Do not invent a paper title, keywords or a dateline.
- **Abstract (About):** the real About text, smaller, between two thin rules on the sage tint. Its `<h2>` is the real section name ("About") as a small-caps label. Unnumbered.
- **Projects (section 1):** one entry per real project: name as `<h3>`, then the lead of its description, then a citation marker. If SPEC.md has images, each image is a figure in its entry; with no images there are no figures, and do not add decorative pictures.
- **Skills:** the real skills as one run-in list separated by semicolons.
- **Contact:** a `<dl>` with the real label (for example Email, LinkedIn) and the real link. Show a row only if SPEC.md has it.
- Numbers appear only on sections, notes and figures. Section names are the real ones from SPEC.md.

```html
<div class="page">
  <nav class="toc" aria-label="Contents">
    <p class="toc-title" aria-hidden="true">Contents</p>
    <ol class="toc-list">
      <li class="unnumbered"><a href="#home">Home</a></li>
      <li class="unnumbered"><a href="#about">About</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#contact">Contact</a></li>
    </ol>
  </nav>
  <main>
    <section id="home" class="title-block unnumbered" aria-labelledby="home-title">
      <h1 id="home-title" class="paper-title">The student's name from SPEC.md</h1>
      <p class="author-line">The one-line intro from SPEC.md.</p>
      <div class="title-rule" aria-hidden="true"></div>
    </section>
    <section id="about" class="abstract unnumbered">
      <h2>About</h2>
      <p>The About text from SPEC.md, word for word.</p>
    </section>
    <!-- Projects, Skills and Contact follow, in SPEC.md order. -->
  </main>
</div>
```
```css
.page { max-width: 64rem; margin-inline: auto; padding: 0.5rem 1rem 4rem; }
main { max-width: 34rem; }
main > section { margin-top: 3rem; }
main > .title-block { margin-top: 2rem; }
section[id] { scroll-margin-top: 1.5rem; }
h1, h2, h3 { font-weight: 600; text-wrap: balance; }
main { counter-reset: sec; }
main > section:not(.unnumbered) > h2::before { counter-increment: sec; content: counter(sec) "\00a0\00a0"; color: var(--color-muted); font-weight: 400; }
h2 { position: relative; margin: 0 0 0.75rem; font-size: 1.5rem; line-height: 1.25; }
.paper-title { margin: 0; font-size: clamp(2.25rem, 7vw, 3.5rem); line-height: 1.1; letter-spacing: -0.01em; }
.author-line { margin: 0.5rem 0 1.25rem; font-style: italic; }
.title-rule { height: 5px; border-block: 1px solid var(--color-text); transform-origin: left; } /* two hairlines, a classic double rule */
.abstract { padding: 1rem 1.25rem; background: var(--color-tint); border-block: 1px solid var(--color-border); font-size: 1rem; line-height: 1.6; }
.abstract h2, .toc-title, .note-num { font: 600 1.125rem/1.2 var(--font-label); font-variant-caps: all-small-caps; letter-spacing: 0.06em; }
.abstract p { margin: 0; }
.entries, .toc-list, .skill-list, .contact-list { margin: 0; padding: 0; list-style: none; }
.entry { padding-block: 1rem; border-top: 1px solid var(--color-border); }
.entry h3 { margin: 0 0 0.25rem; font-size: 1.1875rem; line-height: 1.3; }
.entry p { margin: 0; }
.skill-list li { display: inline; }
.skill-list li:not(:last-child)::after { content: "; "; }
.contact-list dt { margin-top: 0.75rem; color: var(--color-muted); font: 600 1.125rem/1.2 var(--font-label); font-variant-caps: all-small-caps; letter-spacing: 0.06em; }
.contact-list dd { margin: 0; }
.contact-list a { display: inline-block; min-height: 44px; padding-block: 0.6rem; overflow-wrap: anywhere; } /* the email wraps instead of overflowing at 320px */
.figure { margin: 1rem 0 0; }
.figure img { display: block; width: 100%; height: auto; border: 1px solid var(--color-border); }
.figure figcaption { margin-top: 0.5rem; color: var(--color-muted); font-size: 1rem; line-height: 1.5; }
```
Figures (only when SPEC.md lists an image; the file goes in `assets/`):
```html
<figure class="figure"><img src="assets/pond.jpg" alt="What the picture really shows."><figcaption><strong>Figure 1.</strong> The project name or description from SPEC.md.</figcaption></figure>
```
The caption uses only SPEC.md words: no scale bars, sample sizes, units or "n =" that SPEC.md does not give.

## Make it theirs
- The one loud thing is the citation markers and their notes. Everything else is hairline rules, good type and white space.
- Use the student's own vocabulary. Their method words (titration, field sampling, R) and course names come only from SPEC.md. Add a marker only where SPEC.md really has detail to put in the note, such as the rest of a description, the course, or a link. No detail, no marker.
- Every device carries meaning: numbers count real sections, notes and figures; small caps appear only on labels the field really sets that way.

## Motion character
Tempo: quiet, 200 to 400ms. Easing: always `var(--ease-quiet)`, which starts gently and lands softly. Nothing moves more than `--settle` (4px), nothing slides sideways, bounces, scales up or loops. Most things only change opacity. Only `opacity` and `transform` animate. The one other property is `display` with `overlay`, set to `allow-discrete` so a closing note can finish fading. The JavaScript snippets share one `script.js`: put the helpers first, then each moment in order.

```css
@keyframes settle-in { from { opacity: 0; transform: translateY(var(--settle)); } }
@keyframes rule-in { from { transform: scaleX(0); } }
@keyframes mark-flash { from { opacity: 1; } to { opacity: 0; } }
```
```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function atBottom() { return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2; }
```

### 1. Page load: the title block settles
The title, the author line and the rule arrive one after another in under a second. Pure CSS, so the text is in the HTML and shows if JavaScript fails.

```css
.paper-title, .author-line { animation: settle-in var(--t-base) var(--ease-quiet) both; }
.author-line { animation-delay: 100ms; }
.title-rule { animation: rule-in 600ms var(--ease-quiet) 200ms both; }
```

### 2. Scroll: sections and figures settle in
Sections fade in once, with no movement. Figures also settle by 4px. JavaScript adds the hiding class, so without JavaScript everything is visible. Hidden sections use `opacity`, not `visibility`, so screen readers and Tab still reach them, and anything that gets focus reveals its section.

```css
.will-settle { opacity: 0; transition: opacity var(--t-base) var(--ease-quiet), transform var(--t-base) var(--ease-quiet); }
figure.will-settle { transform: translateY(var(--settle)); }
/* Two classes beat the hiding rules above, so the settled state always wins. */
.will-settle.is-settled, figure.will-settle.is-settled { opacity: 1; transform: none; }
```
```js
const settlers = document.querySelectorAll('main > section:not(#home), main figure');
if (!reduce && 'IntersectionObserver' in window) {
  const settle = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also settle anything already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add('is-settled');
        settle.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  settlers.forEach((el) => { el.classList.add('will-settle'); settle.observe(el); });
  // Keyboard users: Tab landing inside a section shows it.
  document.addEventListener('focusin', (event) => {
    const el = event.target.closest('.will-settle');
    if (el) el.classList.add('is-settled');
  });
  // A short last section may never reach the trigger line: at the very bottom, show the rest.
  window.addEventListener('scroll', () => {
    if (atBottom()) settlers.forEach((el) => el.classList.add('is-settled'));
  }, { passive: true });
}
```

### 3. Hover and focus: quiet
Links thicken their underline at once, with no transition. The citation marker gets a faint tint behind it. Only real links and real buttons react; entries without a link stay still.

```css
a { color: var(--color-accent); text-underline-offset: 0.2em; text-decoration-thickness: 1px; }
a:hover { text-decoration-thickness: 2px; }
a:focus-visible, button:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
.cite::before { opacity: 0; transition: opacity var(--t-short) var(--ease-quiet); }
.cite:hover::before, .cite:focus-visible::before { opacity: 1; }
```

### 4. Navigation: the contents mark where you are
The contents list marks the current section with the accent colour and a thin bar that fades in. Jumping is instant, like turning to a page, and the heading you land on gets an underline that fades away once. After a jump, the target stays marked until the visitor scrolls on their own, so a short last section is never overtaken by the one before it.

```css
html { scroll-behavior: auto; }
.toc-list { display: flex; flex-wrap: wrap; counter-reset: toc; } /* phones: a wrapping list at the top, so five links fit at 320px */
.toc-list li:not(.unnumbered) { counter-increment: toc; }
.toc-list li:not(.unnumbered) a::before { content: counter(toc); }
.toc a { position: relative; display: flex; align-items: center; gap: 0.35rem; min-height: 44px; padding: 0 0.6rem; color: var(--color-muted); text-decoration: none; }
.toc li:not(.unnumbered) a::before { min-width: 0.6rem; }
.toc a:hover { color: var(--color-text); }
.toc a::after { content: ""; position: absolute; inset: auto 0.6rem 6px; height: 2px; background: var(--color-accent); opacity: 0; transform: scaleX(0.4); transition: opacity var(--t-short) var(--ease-quiet), transform var(--t-short) var(--ease-quiet); }
.toc a[aria-current="location"] { color: var(--color-accent); }
.toc a[aria-current="location"]::after { opacity: 1; transform: none; }
/* The landing underline. The selector is specific enough to beat the will-settle rules. */
section:target > h2::after { content: ""; position: absolute; inset: auto 0 -3px; height: 2px; background: var(--color-accent); animation: mark-flash 1400ms var(--ease-quiet) 1 both; }
@media (min-width: 64em) {
  .page { display: grid; grid-template-columns: 11rem minmax(0, 34rem); justify-content: center; column-gap: 3rem; padding-top: 3rem; }
  .toc { position: sticky; top: 2rem; align-self: start; }
  .toc-list { display: block; }
  .toc a { min-height: 0; padding-block: 0.35rem; }
  .toc .unnumbered a { padding-inline-start: calc(0.6rem + 0.95rem); }
  .toc a::after { inset: 0.3rem auto 0.3rem 0; width: 2px; height: auto; transform: scaleY(0.4); }
}
```
```js
const sections = [...document.querySelectorAll('main > section[id]')];
const tocLinks = [...document.querySelectorAll('.toc a')];
let current = '', pinned = '', queued = false;
function setCurrent(id) {
  if (id === current) return;
  current = id;
  tocLinks.forEach((link) => {
    // setAttribute, not toggleAttribute: aria-current="" counts as false for screen readers.
    if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function pin(id) { pinned = id; setCurrent(id); }
function queueUpdate() { if (!queued) { queued = true; requestAnimationFrame(update); } }
function update() {
  queued = false;
  const boxes = sections.map((s) => s.getBoundingClientRect()); // read everything first
  const vh = window.innerHeight;
  if (pinned) {
    const i = sections.findIndex((s) => s.id === pinned);
    if (i > -1 && boxes[i].bottom > 0 && boxes[i].top < vh) { setCurrent(pinned); return; }
    pinned = ''; // the jumped-to section left the screen
  }
  let id = sections[0].id;
  boxes.forEach((box, i) => { if (box.top <= vh * 0.35) id = sections[i].id; });
  if (window.scrollY < 8) id = sections[0].id;
  else if (atBottom()) id = sections[sections.length - 1].id;
  setCurrent(id); // then write
}
tocLinks.forEach((link) => link.addEventListener('click', () => pin(link.hash.slice(1))));
window.addEventListener('hashchange', () => { if (location.hash.length > 1) pin(location.hash.slice(1)); });
// Scrolling on your own releases the pin.
const release = () => { pinned = ''; queueUpdate(); };
window.addEventListener('wheel', release, { passive: true });
window.addEventListener('touchmove', release, { passive: true });
window.addEventListener('keydown', (event) => {
  if (event.key === ' ' && event.target.closest('button')) return; // Space presses a button
  if (['PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End', ' '].includes(event.key)) release();
});
window.addEventListener('scroll', queueUpdate, { passive: true });
window.addEventListener('resize', queueUpdate);
if (location.hash.length > 1) pin(location.hash.slice(1));
update();
```

### 5. Signature: citation markers open popover notes
In the Projects entries, a small superscript number sits after the lead of the description. It is a real `<button>` that opens a note with the rest of the story: the full description sentence from SPEC.md and, only if SPEC.md has one, the link. The browser's native Popover API does the work, so it needs no JavaScript, closes on Esc or a click outside, and returns focus to the marker. Where the Popover API is not supported, the notes simply show inline under each entry and the markers and close buttons are hidden.

Content rule: the lead is the description up to its first comma, cut at an existing comma and never reworded (capitalise the first letter, no added punctuation). Use a lead only when it reads as a complete phrase on its own, such as "A field study of three campus ponds"; if the first comma comes early ("In my first year, ...") show the whole description and add no marker. The note holds the whole sentence. If SPEC.md gives the project a link, it sits on the page under the entry as well as in the note: a link is never only inside a note. Number the markers in page order (1, 2, 3).

```html
<li class="entry">
  <h3>Project name from SPEC.md</h3>
  <p>The first part of the description.<sup class="cite-wrap"><button class="cite" type="button" popovertarget="note-1" aria-label="Note 1: full description of Project name from SPEC.md">1</button></sup></p>
  <div class="cite-note" id="note-1" popover role="note" aria-labelledby="note-1-title">
    <p class="note-title" id="note-1-title"><span class="note-num">Note 1.</span> Project name from SPEC.md</p>
    <p>The full description sentence from SPEC.md.</p>
    <p><a href="https://example.com/the-link-in-SPEC">Link label from SPEC.md</a></p> <!-- only if SPEC.md has a link; repeat it on the page under the entry -->
    <button class="note-close" type="button" popovertarget="note-1" popovertargetaction="hide">Close note 1</button>
  </div>
</li>
```
The marker's `aria-label` starts with its visible number, so voice-control users can say it. Give each note a unique id and keep the marker's `popovertarget` equal to it.
```css
.cite-wrap { line-height: 0; font-size: 1em; vertical-align: baseline; }
.cite { position: relative; isolation: isolate; top: -0.55em; margin-inline: 0.1em; padding: 0 0.15em; border: 0; background: none; color: var(--color-accent); font: 600 0.875rem/1 var(--font-label); cursor: pointer; }
.cite::before { content: ""; position: absolute; inset: -0.2em -0.1em; z-index: -1; border-radius: 2px; background: var(--color-tint); } /* hover tint, see moment 3 */
.cite::after { content: ""; position: absolute; inset: -1rem -0.9rem; } /* enlarges the tap target to about 44px */
.cite-note { max-width: 24rem; margin-top: 0.5rem; padding: 1rem 1.125rem; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); border-radius: 2px; font-size: 1rem; line-height: 1.55; }
.cite-note p { margin: 0 0 0.5rem; }
.note-title { font-weight: 600; }
.note-close { min-height: 44px; padding: 0 0.75rem; border: 1px solid var(--color-border); border-radius: 2px; background: var(--color-bg); color: var(--color-text); font: 600 1rem var(--font-label); cursor: pointer; }

@supports not selector(:popover-open) { .cite, .note-close { display: none; } } /* fallback: the notes show inline */
@supports selector(:popover-open) {
  .cite-note { margin: 0; opacity: 0; transform: translateY(var(--settle));
    transition: opacity var(--t-short) var(--ease-quiet), transform var(--t-short) var(--ease-quiet), overlay var(--t-short) allow-discrete, display var(--t-short) allow-discrete; }
  .cite-note:popover-open { opacity: 1; transform: none; }
  @starting-style { .cite-note:popover-open { opacity: 0; transform: translateY(var(--settle)); } }
  /* Phones: a note card above the bottom edge. */
  @media (max-width: 47.99em) { .cite-note { inset: auto 0 1rem; margin-inline: auto; width: min(26rem, calc(100% - 2rem)); max-height: 70vh; overflow: auto; } }
  /* Wide screens: the browser anchors the note under its marker; it flips if there is no room. */
  @media (min-width: 48em) {
    @supports (position-area: bottom) {
      .cite-note { inset: auto; width: 22rem; margin-block: 0.75rem; position-area: bottom span-right; position-try-fallbacks: flip-block, flip-inline; }
    }
  }
}
```
Browsers without anchor positioning keep the popover centred on screen, which still works. On phones the card sits at the bottom, so bring its entry to the top first, or the card covers the marker and the lead:
```js
document.querySelectorAll('.cite-note').forEach((note) => note.addEventListener('beforetoggle', (event) => {
  if (event.newState === 'open' && window.matchMedia('(max-width: 47.99em)').matches) note.closest('.entry').scrollIntoView({ block: 'start' });
}));
```

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .will-settle { opacity: 1 !important; transform: none !important; } /* undo the hidden starting state, not just the animation */
}
```
The JavaScript already skips the hiding classes when reduced motion is on. Notes simply appear and disappear.

## Libraries
None. Plain HTML, CSS and JavaScript. The Popover API is built into the browser.

## Avoid
- Fake scholarship: invented references, DOIs, journal names, volume or page numbers, dates, "received/accepted", "peer reviewed" badges, affiliations, co-authors, ORCID or keyword lines. Only what SPEC.md says.
- Citation markers with nothing real behind them, or a note that invents a course, a date or a result. No detail in SPEC.md, no marker.
- Charts, tables or figure captions with made-up data. If SPEC.md has no images there are no figures.
- Cream paper with terracotta ink, Playfair Display or other display serifs, and Inter. Magazine moves too: drop caps, huge pull quotes, slow headline reveals.
- Justified two-column body text, long lines over 70 characters, tiny sans text under 16px.
- Fake PDF chrome: a "Download PDF" button, page counters, a fake toolbar.
- Hover or lift effects on entries that have no link; a rising fade on every section; sideways motion; anything travelling more than 4px.
- Generic page habits: a "→" after every link, "A · B · C" strings, an ALL-CAPS eyebrow above every heading, numbering things that are not a real sequence, one word of a heading picked out in the accent, the same rounded soft-shadow card everywhere.
- Hiding content until JavaScript runs, or a link that exists only inside a note.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
