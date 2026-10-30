---
name: vibe-ide
description: Restyles the portfolio site as a modern code editor, with a tab bar, a status bar, line numbers and a Ctrl+K command palette (look, layout and motion). Use ONLY when the student names the vibe-ide skill or asks for the IDE vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: major
  tags: "cs"
  intensity: standard
  version: "2"
---

# Vibe: IDE

## Feel and who it's for
The page is an editor window: a sticky tab bar on top where each section is an open tab, a calm graphite workspace with the text laid out like a file, and a slim status bar at the bottom. Press Ctrl+K (or click the Commands button) and a command palette jumps to any section or project. It feels focused, quick and keyboard-friendly, but it is a tidy editor, not a black-and-green shell. Good for CS students who want recruiters to see "this person works like a developer".

## Must keep (this is what makes it IDE)
1. A sticky tab bar (the section links) whose active tab joins the page surface, and a status bar fixed to the bottom of the screen.
2. A command palette opened by Ctrl+K / Cmd+K and by a visible button. It lists only things that exist on the page, and works fully with the keyboard.
3. Two typefaces: a friendly sans for reading, a monospace only for editor details (project titles, line numbers, key hints).
4. Graphite surfaces and ONE warm accent. Reading text stays off-white, never in the accent.
5. Line numbers only beside prose lines (the hero, About paragraphs, contact links). Never number projects or skills.
6. Motion is short (120 to 180ms) with one soft ease-out. No typing, no blinking caret, no `steps()`, no sliding panels.

## Starting defaults (change freely)
The student can say "make it light" or "use a violet accent". Their request wins; recompute contrast if they change colours.

Palette, in words: neutral graphite for the page, a slightly lighter panel colour, a darker strip for the tab and status bars, off-white text, a cool grey for secondary text, and tangerine for the active tab line, links, focus rings and the status segment.

```css
/* Contrast: text #D9DDE4 on bg 12.4:1, on surface 11.1:1, on bar 13.3:1, on select 8.8:1.
   Muted #A5ACB8 on bg 7.4:1, on surface 6.6:1, on bar 7.9:1, on select 5.3:1.
   Accent #FF9D5C on bg 8.2:1, on surface 7.4:1, on bar 8.8:1 (so it works as small link text and as a focus ring).
   Bar-dark text on an accent fill (status segment) 8.8:1. --color-line is decoration only. */
:root {
  --color-bg: #1B1D21; --color-surface: #23262B; --color-bar: #141619;
  --color-text: #D9DDE4; --color-muted: #A5ACB8; --color-line: #3A3F47;
  --color-accent: #FF9D5C; --color-on-accent: #141619; --color-select: #2F3744;
  --font-ui: "Red Hat Text", system-ui, sans-serif;
  --font-code: "Red Hat Mono", ui-monospace, Menlo, Consolas, monospace;
  --ease-ide: cubic-bezier(0.25, 1, 0.5, 1);
  --t-fast: 120ms; --t-mid: 150ms; --t-slow: 180ms;
  --bar-h: 2.75rem; --gutter: 2rem; --h1-size: clamp(2rem, 7vw, 3.25rem);
}
@media (min-width: 48em) { :root { --gutter: 3rem; } }
*, *::before, *::after { box-sizing: border-box; }
html { color-scheme: dark; scroll-behavior: auto; }
body {
  margin: 0; background: var(--color-bg); color: var(--color-text);
  font: 1rem/1.65 var(--font-ui);
}
body.has-status { padding-bottom: var(--bar-h); } /* room for the fixed status bar (JS adds the class) */
h1, h2, h3, p, ul { margin: 0; }
a { color: var(--color-accent); text-underline-offset: 3px; }
:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
::selection { background: var(--color-select); color: var(--color-text); }
```
Light alternative: bg `#F5F6F8`, surface `#FFFFFF`, bar `#E8EAEE`, text `#1C1F24` (15.3:1 on bg), muted `#555C68` (6.2:1 on bg, 5.6:1 on bar), accent `#A8400A` (5.7:1 on bg, 6.2:1 on white, 5.1:1 on bar), white text on accent 6.2:1. Change `color-scheme` to `light` too.

Fonts: Red Hat Text for reading and tabs, Red Hat Mono for editor details. Alternatives: Geist with Geist Mono, or Public Sans with DM Mono. Not Inter, and not JetBrains Mono (that is Terminal).
`<link href="https://fonts.googleapis.com/css2?family=Red+Hat+Mono:wght@400;500&family=Red+Hat+Text:wght@400;600;700&display=swap" rel="stylesheet">`

Sizes and spacing are your call. Corners are small (4 to 8px). Body lines stay under 70 characters.

## Layout ideas
- **Tab bar:** the five section links as tabs, always one sticky row (`--bar-h` tall, 44px targets). On phones the tabs share the width equally in 13px type; the five default names fit one row at 320px. If the real section names are longer and wrap, raise `--bar-h` to the wrapped height so nothing is covered. Bar lines are `box-shadow`, not borders, so the bars stay exactly `--bar-h`.
- **Hero:** the real name as a big `h1`, the one-line intro from SPEC.md under it (if SPEC.md has no separate tagline, use the "Who I am" line without the name). Both lines carry line numbers, and so do the About paragraphs (plain text, no box).
- **Projects:** each real project is a "file": a darker title strip in mono with the project name, then the description on a panel. A link only if SPEC.md has one. The `id` is the project name slugified, such as `project-note-finder`.
- **Skills:** the real skills as small bordered mono chips. They are not links, so they do not react to hover.
- **Contact:** `<ul class="contact-list lines">` with the real email and links, one per line, 44px tall, with `overflow-wrap: anywhere` and a small enough size that an email fits on one line at 320px. No footer; at most a plain "Back to top" link.
- **Desktop only (64em and up):** a thin minimap strip on the right edge (see Scroll). Pad `main` on the right so text never sits under it.
- If a section's `h2` differs from its tab label, the tab text names it in the palette and status bar; the `h2` keeps the heading.
- Only the sections in SPEC.md. Decorative parts (line numbers, minimap, status segment, key hints) are `aria-hidden` or generated content, and mirror real section names only.

## Make it theirs
- The loud thing is the command palette and the way tabs cross-fade. Everything else stays flat: thin lines, no glow, no gradients, no shadow except under the palette.
- Palette entries come from the page itself: section names, project names and the contact links from SPEC.md. Never add commands, extensions, folders, files, branches, "Ln 12, Col 4", error counts, version numbers or fake code.

## Motion character
Tempo: 120 to 180ms, never longer. Easing: one soft ease-out (`--ease-ide`). Things settle quickly and stay put; closing a panel is instant. Hover and focus change only `opacity` and `transform` (never `background-color` transitions). The palette and the tab jumps are the loud moments; the rest is small.

### 1. Page load: the file opens
The hero lines unfold downward, one after another, in about 200ms. Pure CSS, so the text is in the HTML from the start and still shows if JavaScript fails.

```html
<section class="hero" id="home" aria-labelledby="home-title">
  <div class="lines">
    <h1 id="home-title" class="open">The student's real name</h1>
    <p class="open">The one-line intro from SPEC.md.</p>
  </div>
</section>
```
```css
@keyframes open {
  from { opacity: 0; clip-path: inset(0 0 100% 0); }
  to   { opacity: 1; clip-path: inset(-0.3em -0.5em -0.3em calc(var(--gutter) * -1)); } /* negative insets keep descenders and the line number */
}
.open { animation: open var(--t-slow) var(--ease-ide) both; }
.lines > .open:nth-child(2) { animation-delay: 40ms; }
main section.hero { padding-top: 4rem; } /* this selector beats `main section` in the Scroll snippet, which would otherwise win and reset it */
h1 { font: 700 var(--h1-size)/1.15 var(--font-ui); overflow-wrap: anywhere; }
.lines > h1::before { line-height: calc(var(--h1-size) * 1.15 + 0.35rem); } /* the number sits level with the big name */
h2 { font: 600 1.5rem/1.3 var(--font-ui); }
main section > h2 { margin-bottom: 1rem; } /* the reset above removed every heading margin, so put this one back */
.hero p { margin-top: 0.5rem; }
```

### 2. Scroll: line numbers and the minimap
Line numbers are CSS counters on a `.lines` container, so they count the real blocks (hero lines, paragraphs, contact links). On desktop a minimap strip mirrors the page: one block per section and a thumb that follows the scroll. No content hides or fades on scroll.

```html
<div class="lines"><p>First About paragraph from SPEC.md.</p><p>Second paragraph, if SPEC.md has one.</p></div>
<div class="minimap" aria-hidden="true" hidden><div class="minimap-thumb"></div></div> <!-- last child of body; JS shows it -->
```
```css
.lines { counter-reset: line; position: relative; padding-left: var(--gutter); }
.lines > * { counter-increment: line; position: relative; }
.lines > *::before {
  content: counter(line); content: counter(line) / ""; /* the second form hides the number from screen readers */
  position: absolute; left: calc(var(--gutter) * -1); width: calc(var(--gutter) - 0.75rem);
  text-align: right; font: 400 0.8125rem/1.65rem var(--font-code); color: var(--color-muted);
}
main { max-width: 56rem; margin: 0 auto; padding: 0 1rem; }
main section { padding: 3rem 0 1.5rem; scroll-margin-top: var(--bar-h); } /* sticky tab bar must not cover a heading */
.minimap { display: none; }
@media (min-width: 64em) {
  main { padding-right: 4.5rem; }
  .minimap {
    display: flex; flex-direction: column; gap: 2px; position: fixed; z-index: 5;
    top: var(--bar-h); bottom: var(--bar-h); right: 0; width: 3rem; padding: 4px 6px;
    background: var(--color-bar); border-left: 1px solid var(--color-line);
  }
  .minimap-block { background: var(--color-line); opacity: 0.6; min-height: 3px; }
  .minimap-block.is-active { background: var(--color-accent); opacity: 0.5; }
  .minimap-thumb { position: absolute; inset: 4px 0; background: var(--color-text); opacity: 0.14; transform-origin: 0 0; transform: scaleY(0); }
}
.minimap[hidden] { display: none; } /* without JS there is no empty strip */
```
```js
// Shared helper (a function declaration, so every snippet below can call it). One frame per scroll or resize event, then it rests.
function onFrame(fn) {
  let queued = false;
  const kick = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; fn(); }); } };
  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick);
  window.addEventListener('load', kick);
  kick();
}
const minimap = document.querySelector('.minimap');
const thumb = document.querySelector('.minimap-thumb');
const sectionEls = [...document.querySelectorAll('main section[id]')];
if (minimap && thumb) {
  minimap.hidden = false;
  sectionEls.forEach((section) => {
    const block = document.createElement('div');
    block.className = 'minimap-block';
    block.dataset.for = section.id;
    minimap.append(block);
  });
  const blocks = minimap.querySelectorAll('.minimap-block');
  onFrame(() => {
    // Read first, then write.
    const doc = document.documentElement.scrollHeight;
    const view = window.innerHeight;
    const top = window.scrollY / doc;
    const heights = sectionEls.map((s) => s.offsetHeight);
    blocks.forEach((block, i) => { block.style.flexGrow = heights[i]; });
    thumb.style.transform = `translateY(${top * 100}%) scaleY(${Math.min(1, view / doc)})`;
  });
}
```

### 3. Hover and focus: editor line highlight
Tabs grow a ghost background and project files with a real link get an accent edge, both with `opacity` or `transform` over 120ms. Only things that contain a real link react.

```css
.tabs { display: flex; margin: 0; padding: 0; list-style: none; }
.tabs li { flex: 1 1 0; min-width: 0; } /* equal widths on phones */
.tab {
  position: relative; isolation: isolate; display: flex; align-items: center; justify-content: center;
  min-height: var(--bar-h); padding: 0 0.4rem; color: var(--color-muted); text-decoration: none;
  font: 600 0.8125rem/1 var(--font-ui);
}
.tab::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--color-surface); opacity: 0; transition: opacity var(--t-fast) var(--ease-ide); }
.tab::after { content: ""; position: absolute; inset: 0 0 auto; height: 2px; background: var(--color-accent); transform: scaleX(0); transition: transform var(--t-mid) var(--ease-ide); }
.tab:hover { color: var(--color-text); }
.tab:hover::before { opacity: 1; }
.tab[aria-current]:hover::before { opacity: 0; } /* the active tab has no ghost */
.tab[aria-current] { color: var(--color-text); background: var(--color-bg); } /* the active tab joins the page surface */
.tab[aria-current]::after { transform: scaleX(1); }
.tab:focus-visible { outline-offset: -4px; } /* inside the tab, so the screen edge never clips it */
@media (min-width: 48em) { .tabs li { flex: 0 0 auto; } .tab { padding: 0 1.25rem; font-size: 0.875rem; } }

.file { position: relative; scroll-margin-top: calc(var(--bar-h) + 0.75rem); margin-top: 1rem; background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 6px; overflow: hidden; }
.file h3 { padding: 0.5rem 1rem; background: var(--color-bar); border-bottom: 1px solid var(--color-line); font: 500 0.9375rem/1.4 var(--font-code); }
.file p { padding: 0.75rem 1rem 0; max-width: 65ch; }
.file p:last-child { padding-bottom: 1rem; }
.file::after { content: ""; position: absolute; inset: 0 auto 0 0; width: 3px; background: var(--color-accent); transform: scaleY(0); transform-origin: top; transition: transform var(--t-mid) var(--ease-ide); }
.file:has(a):hover::after, .file:has(a:hover)::after, .file:focus-within::after { transform: scaleY(1); } /* no link, no reaction */
.chips { display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; margin-top: 1rem; list-style: none; }
.chips li { padding: 0.25rem 0.75rem; border: 1px solid var(--color-line); border-radius: 4px; font: 400 0.875rem/1.5 var(--font-code); }
.contact-list { margin: 0; padding: 0; list-style: none; }
.contact-list.lines { padding-left: var(--gutter); } /* after the line above, or it wipes the number gutter */
.contact-list a { display: flex; align-items: center; min-height: 2.75rem; padding: 0.4rem 0; overflow-wrap: anywhere; font-size: 0.9375rem; }
.contact-list.lines > li::before { top: 0; line-height: 2.75rem; } /* numbers centre on the 44px rows */
```

### 4. Navigation: tabs jump with a View Transition
Clicking a tab (or running a palette command) cross-fades the old view into the new one in 180ms instead of scrolling past everything in between. Without View Transition support, or with reduced motion, it simply jumps. Everything stays on one scrollable page and every `#anchor` works without JavaScript (the static `aria-current` on Home is correct until JS takes over). Put the JavaScript from sections 2, 4 and 5 into one `script.js` in that order (sections 1 and 3 have none); `sectionEls`, `tabs`, `jumpTo` and `onFrame` are declared once and shared. The active tab follows the scroll too, and after a jump the jumped-to section stays selected until the visitor scrolls on their own (otherwise a short last section loses to the one before it).

```html
<header class="tabbar">
  <nav aria-label="Main">
    <ul class="tabs">
      <li><a class="tab" href="#home" aria-current="location">Home</a></li>
      <li><a class="tab" href="#about">About</a></li>
      <li><a class="tab" href="#projects">Projects</a></li>
      <li><a class="tab" href="#skills">Skills</a></li>
      <li><a class="tab" href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>
```
```css
.tabbar { position: sticky; top: 0; z-index: 10; background: var(--color-bar); box-shadow: 0 1px 0 var(--color-line); } /* a line that adds no height, so the bar is exactly --bar-h */
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root), ::view-transition-new(root) { animation-duration: var(--t-slow); animation-timing-function: var(--ease-ide); }
}
```
```js
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const tabs = [...document.querySelectorAll('.tab')];
const statusName = document.querySelector('.status-name');
let lockedId = null; // the section a jump chose; the scroll-spy leaves it alone

function setActive(id) {
  tabs.forEach((tab) => {
    if (tab.getAttribute('href') === '#' + id) tab.setAttribute('aria-current', 'location');
    else tab.removeAttribute('aria-current');
  });
  document.querySelectorAll('.minimap-block').forEach((b) => b.classList.toggle('is-active', b.dataset.for === id));
  const tab = tabs.find((t) => t.getAttribute('href') === '#' + id);
  if (statusName && tab) statusName.textContent = tab.textContent;
}
function jumpTo(id) { // works for sections and for project files
  const target = document.getElementById(id);
  if (!target) return;
  const owner = target.closest('section[id]') || target;
  const move = () => {
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
    try { history.pushState(null, '', '#' + id); } catch (error) { /* some file:// setups refuse; the jump still worked */ }
    const heading = target.matches('h1, h2, h3') ? target : target.querySelector('h1, h2, h3');
    if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
    lockedId = owner.id;
    setActive(owner.id);
  };
  if (document.startViewTransition && !reduceMotion.matches) document.startViewTransition(move);
  else move();
}
tabs.forEach((tab) => tab.addEventListener('click', (event) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return; // keep "open in new tab"
  event.preventDefault();
  jumpTo(tab.getAttribute('href').slice(1));
}));

// Release the lock only when the visitor scrolls by themselves, or the section leaves the screen.
const scrollKeys = ['PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown', ' '];
const release = () => { lockedId = null; };
['wheel', 'touchmove'].forEach((name) => window.addEventListener(name, release, { passive: true }));
window.addEventListener('keydown', (event) => { if (scrollKeys.includes(event.key)) release(); });
window.addEventListener('hashchange', () => { // back button, or a link typed in by hand
  const id = location.hash.slice(1);
  const section = document.getElementById(id);
  if (section) { lockedId = (section.closest('section[id]') || section).id; setActive(lockedId); }
});

onFrame(() => {
  const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  const rects = sectionEls.map((s) => s.getBoundingClientRect());
  if (lockedId) { // free the lock once that section is completely off screen
    const i = sectionEls.findIndex((s) => s.id === lockedId);
    if (i < 0 || rects[i].bottom <= 0 || rects[i].top >= window.innerHeight) lockedId = null;
    else return;
  }
  const probe = window.innerHeight * 0.35;
  let current = sectionEls[0];
  sectionEls.forEach((s, i) => { if (rects[i].top <= probe) current = s; }); // sections already scrolled past count too
  if (window.scrollY < 8) current = sectionEls[0];
  else if (bottom) current = sectionEls[sectionEls.length - 1];
  setActive(current.id);
});
```

### 5. Signature: the command palette
Ctrl+K (Cmd+K on a Mac) or the Commands button in the status bar opens a native `<dialog>`: a search field over a list of real places on the page. Arrow keys move, Enter runs, Escape closes, and focus returns to where you were. It never steals Ctrl+K from a text field, and it leaves every other browser shortcut alone.

```html
<div class="statusbar" hidden> <!-- JS shows it; without JS there is no empty bar -->
  <p class="status-section"><span class="status-name" aria-hidden="true">Home</span></p>
  <button class="palette-btn" type="button" data-palette-open aria-haspopup="dialog" aria-keyshortcuts="Control+K Meta+K">
    Commands <kbd aria-hidden="true"><span data-mod>Ctrl</span> K</kbd>
  </button>
</div>
<dialog id="palette" class="palette" aria-label="Command palette">
  <input id="palette-input" class="palette-input" type="text" role="combobox" aria-expanded="true"
    aria-controls="palette-list" aria-autocomplete="list" autocomplete="off" placeholder="Go to a section or project" aria-label="Search the page">
  <ul id="palette-list" class="palette-list" role="listbox" aria-label="Results"></ul>
  <p id="palette-status" class="visually-hidden" role="status"></p>
</dialog>
<!-- On each real contact link add data-palette-link: choosing it clicks that link (mailto or navigation), and its label is the link text from SPEC.md, such as "GitHub". Each project article needs its id (project-…) and class "file". -->
```
```css
.statusbar { position: fixed; inset: auto 0 0; z-index: 10; height: var(--bar-h); display: flex; justify-content: space-between; background: var(--color-bar); box-shadow: inset 0 1px 0 var(--color-line); }
.statusbar[hidden] { display: none; } /* display: flex would otherwise beat the hidden attribute */
.status-section { display: flex; align-items: center; padding: 0 1rem; background: var(--color-accent); color: var(--color-on-accent); font: 500 0.8125rem/1 var(--font-code); }
.palette-btn { display: flex; align-items: center; gap: 0.6rem; min-height: var(--bar-h); padding: 0 1rem; border: 0; background: none; color: var(--color-text); font: 600 0.8125rem/1 var(--font-ui); cursor: pointer; }
.palette-btn:focus-visible { outline-offset: -4px; }
.palette-btn kbd { display: none; padding: 0.15rem 0.4rem; border: 1px solid var(--color-line); border-radius: 4px; color: var(--color-muted); font: 400 0.75rem/1.4 var(--font-code); }
@media (min-width: 48em) { .palette-btn kbd { display: inline-block; } }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes palette-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
.palette { width: min(36rem, calc(100% - 2rem)); margin: 12vh auto auto; padding: 0; border: 1px solid var(--color-line); border-radius: 8px; background: var(--color-surface); color: var(--color-text); box-shadow: 0 16px 40px rgb(0 0 0 / 0.45); overflow: hidden; }
.palette[open] { animation: palette-in var(--t-mid) var(--ease-ide) both; } /* closing is instant, like an editor */
.palette::backdrop { background: rgb(10 11 13 / 0.6); }
.palette-input { width: 100%; padding: 0.9rem 1rem; border: 0; border-bottom: 1px solid var(--color-line); background: transparent; color: inherit; caret-color: var(--color-accent); font: 400 1rem/1.4 var(--font-ui); }
.palette-input:focus-visible { outline-offset: -3px; }
.palette-list { max-height: min(18rem, 50vh); margin: 0; padding: 0.25rem; overflow-y: auto; list-style: none; }
.palette-list li { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding: 0.6rem 0.75rem; border-radius: 4px; cursor: pointer; }
.palette-list li[aria-selected="true"] { background: var(--color-select); }
.palette-kind { color: var(--color-muted); font: 400 0.8125rem/1.6 var(--font-code); }
```
```js
const palette = document.getElementById('palette');
const field = document.getElementById('palette-input');
const results = document.getElementById('palette-list');
const announce = document.getElementById('palette-status');
const statusbar = document.querySelector('.statusbar');
if (palette && field && results && typeof palette.showModal === 'function') {
  if (statusbar) { statusbar.hidden = false; document.body.classList.add('has-status'); }
  const isMac = /Mac|iPhone|iPad/.test(navigator.userAgentData ? navigator.userAgentData.platform : navigator.platform);
  document.querySelectorAll('[data-mod]').forEach((el) => { el.textContent = isMac ? '⌘' : 'Ctrl'; });

  // Everything comes from the page itself, so it can never disagree with SPEC.md.
  const commands = [];
  sectionEls.forEach((s) => { // the label is the tab's name, so Home says "Home" and not the student's name
    const tab = tabs.find((t) => t.getAttribute('href') === '#' + s.id);
    const h = s.querySelector('h1, h2');
    const label = tab ? tab.textContent.trim() : h ? h.textContent.trim() : '';
    if (label) commands.push({ label, kind: 'Section', run: () => jumpTo(s.id) });
  });
  document.querySelectorAll('main .file[id]').forEach((f) => commands.push({ label: f.querySelector('h3').textContent.trim(), kind: 'Project', run: () => jumpTo(f.id) }));
  document.querySelectorAll('[data-palette-link]').forEach((a) => commands.push({ label: a.textContent.trim(), kind: 'Link', run: () => a.click() }));

  let shown = []; let active = 0; let opener = null; let ran = false;
  function mark() {
    [...results.children].forEach((li, i) => li.setAttribute('aria-selected', String(i === active)));
    const li = results.children[active];
    if (li) { field.setAttribute('aria-activedescendant', li.id); li.scrollIntoView({ block: 'nearest' }); }
    else field.removeAttribute('aria-activedescendant');
  }
  function render() {
    const words = field.value.toLowerCase().split(/\s+/).filter(Boolean);
    shown = commands.filter((c) => words.every((w) => (c.label + ' ' + c.kind).toLowerCase().includes(w)));
    active = 0;
    results.textContent = '';
    shown.forEach((c, i) => {
      const li = document.createElement('li');
      const name = document.createElement('span'); name.textContent = c.label;
      const kind = document.createElement('span'); kind.className = 'palette-kind'; kind.textContent = c.kind;
      li.id = 'cmd-' + i; li.setAttribute('role', 'option'); li.append(name, kind);
      li.addEventListener('click', () => run(i));
      results.append(li);
    });
    announce.textContent = shown.length ? shown.length + (shown.length === 1 ? ' result' : ' results') : 'No results';
    mark();
  }
  function run(i) { const cmd = shown[i]; if (!cmd) return; ran = true; palette.close(); cmd.run(); }
  function openPalette() { opener = document.activeElement; ran = false; field.value = ''; render(); palette.showModal(); field.focus(); }

  field.addEventListener('input', render);
  field.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (shown.length) active = (active + (event.key === 'ArrowDown' ? 1 : shown.length - 1)) % shown.length;
      mark();
    } else if (event.key === 'Enter') { event.preventDefault(); run(active); }
  }); // Escape needs no code: a modal dialog closes itself
  palette.addEventListener('close', () => { if (!ran && opener && opener.focus) opener.focus(); }); // focus goes back where it was
  palette.addEventListener('click', (event) => { if (event.target === palette) palette.close(); }); // click on the backdrop
  document.querySelectorAll('[data-palette-open]').forEach((btn) => btn.addEventListener('click', openPalette));

  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.isComposing || event.altKey || event.shiftKey) return;
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;
    const el = event.target;
    // Leave Ctrl+K alone in the page's own text fields and editable areas; our search field may close the palette.
    const typing = el instanceof HTMLElement && el !== field && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
    if (typing) return;
    event.preventDefault();
    if (palette.open) palette.close(); else openPalette();
  });
}
```

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
```
The hero's keyframes only set the hidden start, so removing the animation leaves everything visible. The View Transition is also skipped in JavaScript (`reduceMotion.matches`). The palette still works fully; it just appears without animation.

## Libraries
None. Plain CSS and JavaScript only (View Transitions and `<dialog>` are built into the browser).

## Avoid
- Green on black, a typed command, a blinking caret or `steps()`: that is Terminal, a different vibe.
- Invented editor output: code samples, file trees, branch names, "Ln 12, Col 4", problem or error counts, version numbers, a pretend terminal panel, or a minimap that shows fake code.
- Numbering projects or skills with line numbers, and "01 / 02 / 03" labels on things that are not a sequence.
- A rainbow of "syntax colours" on ordinary text. One accent only.
- Coloured traffic-light window buttons and other pretend controls that do nothing. Every visible control must work.
- Hijacking Ctrl+K inside inputs, adding other global shortcuts, or opening the palette by itself.
- A fade-up on every section, "→" after every link, "A · B · C" meta strings, an ALL-CAPS eyebrow above every heading, one headline word picked out in the accent, the same rounded card and soft shadow everywhere.
- Hiding content behind tabs, so that only one section is visible at a time. Every section stays on the page.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
