---
name: vibe-git-graph
description: Restyles the portfolio site as a clean Git history graph, with a branch line down the left, sections as commits and projects that branch off and merge back (look, layout and motion). Use ONLY when the student names the vibe-git-graph skill or asks for the Git Graph vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: major
  tags: "cs, software-eng"
  intensity: standard
  version: "2"
---

# Vibe: Git Graph

## Feel and who it's for
The page is a repository's history graph, like the commit view in a good Git client: a light, tidy workspace with one vertical branch line down the left. Every section is a node on that line, each project branches off into its own coloured lane and merges back, and a small HEAD marker shows where you are. It looks nothing like a dark terminal. Good for CS and software students who want recruiters to see "this person is comfortable with Git and real workflows".

## Must keep (this is what makes it Git Graph)
1. A LIGHT page: cool off-white, white panels, dark body text. Dark mode is a different vibe (Terminal).
2. A graph lane in the left gutter: one main line, a round node per section, and each project as a branch that forks off and merges back. At most 3 lane colours.
3. Honest labels. The graph is decoration; every word comes from SPEC.md. Node labels are real section names and real project names only. Never add commit hashes, dates, authors, commit messages, "merged" labels, version numbers or fake terminal output. The only branch names allowed are real project names, slugified (lower case, spaces to hyphens, no punctuation), always `aria-hidden="true"`. "HEAD" is allowed: it is the marker's real Git name. A project link only if SPEC.md has one.
4. Motion is snappy and keyboard-like: short UI moves (120 to 220ms) and a crisp ease-out. The graph itself is drawn by scrolling.
5. A HEAD marker that follows the section you are on, and `j` / `k` to move between sections.

## Starting defaults (change freely)
The student can say "make the main line purple" or "use only two lanes". Their request wins; recompute contrast if they change colours. Palette, in words: cool off-white page, white panels, near-black blue-grey text, a softer grey for secondary text; three lane colours: a strong blue for the main line, a deep rose and a forest green for project branches; a pale grey for the not-yet-drawn part of every line.

```css
/* Contrast: text #1B2430 on bg 14.5:1, on white 15.7:1; muted #4A5565 on bg 7.0:1, on white 7.6:1.
   Lines and links on bg: blue #1B55C7 6.1:1, rose #B0245F 5.9:1, green #17753A 5.3:1 (all above 3:1 as lines, 4.5:1 as text).
   Lane text on its own 9% tint: blue 5.8, rose 5.6, green 5.1. White text on blue 6.6. The pale track is decoration only. */
:root {
  --color-bg: #F4F6F9; --color-surface: #FFFFFF; --color-text: #1B2430; --color-muted: #4A5565;
  --color-border: #D3DAE3; --color-track: #C3CCD8;
  --lane-main: #1B55C7; --lane-1: #B0245F; --lane-2: #17753A;
  --x0: 16.667%; --x1: 50%; --x2: 83.333%; /* lane positions inside the gutter; they match the SVG viewBox (10, 30, 50 of 60) */
  --ease-snap: cubic-bezier(0.32, 0.72, 0, 1);
  --gutter: 2.75rem; --dot: 14px; --fork-h: 40px; --bar-h: 3.5rem; --sec-pad: 3rem; --title-size: 1.75rem;
  --tip-inset: 35%; /* the line is drawn down to 65% of the screen height; JS uses the same number */
  --dot-y: calc(var(--sec-pad) + var(--title-size) * 0.6); /* centre of a heading's first line */
}
@media (min-width: 48em) { :root { --gutter: 4.5rem; --dot: 16px; } }
```
Fonts: Hanken Grotesk for everything, Fira Code only for the tiny branch-name pills, the HEAD tag and key hints (that is where Git UIs use mono). Alternatives: Public Sans, or DM Sans with DM Mono. Not Inter, and not JetBrains Mono (that is Terminal).
`<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">`
Spacing and sizes are your call, except the gutter must stay narrow on phones. Corners are small (4 to 6px).

## Layout ideas
- **Header:** a slim sticky white bar with the section links. On desktop it also shows the HEAD pill and the current section name on the left, and a small `j` `k` hint on the right (only for mouse users). On phones just the links, always one row: five short links fit at 320px with small side padding and 14px text. If more or longer links wrap, set `--bar-h` to the taller height.
- **Graph lane:** every section has the same left gutter. The page is one column beside it, never wider than about 56rem, with paragraphs under 70 characters.
- **Hero and About:** the real name large with the first node beside it, the one-line intro under it; the real bio as plain paragraphs, no box.
- **Projects:** one white panel per real project, joined to its own branch. The title is the project name, with its slug pill beside it. A link only if SPEC.md has one.
- **Skills:** the real skills as small label tags, like branch labels in a Git client. **Contact:** the real links, one per line, 44px tall, with `overflow-wrap: anywhere` so an email wraps at 320px.
- Only the sections in SPEC.md. The first section's line starts at its node, the last one's ends at its node.

## Make it theirs
- The one loud thing is the graph drawing itself and the projects merging back. Everything else stays flat: thin borders, no shadows, no gradients.
- A commit's message is the section heading, nothing more. The branch pills repeat exactly the project names from SPEC.md.

## Motion character
Tempo: snappy. UI moves are 120 to 220ms with one crisp ease-out (`--ease-snap`). The graph is the exception: it is scroll-linked, so it moves exactly as fast as you scroll (`linear`). Nothing bounces, nothing loops, nothing fades up. The only property outside the usual list is `stroke-dashoffset`, because drawing a line needs it; `scale` is used as part of transform.

### The graph (shared by moments 1, 2 and 5)
Every section carries one decorative rail. Three versions: the first section's line starts at its node (`from-dot`), middle sections use a full piece, the last section's line ends at its node (`to-dot`). The path runs 1 unit past each end so neighbouring pieces overlap with no seam.
```html
<section class="commit lane-main" id="about" aria-labelledby="about-title">
  <div class="rail" aria-hidden="true">
    <svg class="piece" viewBox="0 0 60 100" preserveAspectRatio="none"><path class="track" d="M10 -1V101"/><path class="draw" d="M10 -1V101" pathLength="1"/></svg>
    <span class="dot"></span>
  </div>
  <h2 class="commit-title" id="about-title">About</h2>
  <p>The real bio from SPEC.md.</p>
</section>
```
Wrap all sections in `<main class="graph">`.
```css
.lane-main { --c: var(--lane-main); --x: var(--x0); } .lane-1 { --c: var(--lane-1); --x: var(--x1); } .lane-2 { --c: var(--lane-2); --x: var(--x2); }
*, *::before, *::after { box-sizing: border-box; } h1, h2, h3, p { margin: 0; } /* both keep the dots aligned with the headings */
body { margin: 0; background: var(--color-bg); color: var(--color-text); font: 1rem/1.6 "Hanken Grotesk", system-ui, sans-serif; }
.commit-title + *, .project p { margin-top: 0.75rem; } p { max-width: 65ch; }
main { overflow-x: clip; } /* nothing in the graph can ever cause sideways scrolling */
.graph { max-width: 56rem; margin-inline: auto; padding-inline: 0.5rem 1rem; }
.commit { position: relative; padding: var(--sec-pad) 0 var(--sec-pad) var(--gutter); scroll-margin-top: var(--bar-h); }
.commit:last-child { min-height: calc(60vh - var(--bar-h)); min-height: calc(60svh - var(--bar-h)); } /* room for its line to finish drawing; keep it modest or the page ends in blank space */
.is-first { --title-size: clamp(2.25rem, 9vw, 3.5rem); }
.commit-title { position: relative; width: fit-content; max-width: 100%; font-size: var(--title-size); line-height: 1.2; overflow-wrap: anywhere; } /* line-height 1.2 keeps --dot-y right */
.rail { position: absolute; inset: 0 auto 0 0; width: var(--gutter); pointer-events: none; } .piece { position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: visible; }
.piece.from-dot { top: var(--dot-y); height: calc(100% - var(--dot-y)); } .piece.to-dot { height: var(--dot-y); }
.track, .draw { fill: none; stroke-width: 2.5; } .track { stroke: var(--color-track); } .draw { stroke: var(--c); }
.dot { position: absolute; top: var(--dot-y); left: var(--x); width: var(--dot); height: var(--dot); margin: calc(var(--dot) / -2) 0 0 calc(var(--dot) / -2); border: 2px solid var(--color-surface); border-radius: 50%; background: var(--c); }
```
Without JavaScript, modern browsers still draw the lines by scroll (it is pure CSS); older browsers show the full line. Either way the page is complete.

### 1. Page load: first commit lands
The text is in the HTML from the start. A ring pings once from the first node and a short bar sweeps under the name (both under half a second, once). Pure CSS.
```css
@keyframes sweep { 0% { transform: scaleX(0); opacity: 1; } 60% { transform: scaleX(1); opacity: 1; } 100% { transform: scaleX(1); opacity: 0; } }
@keyframes ping { from { transform: scale(1); opacity: 0.5; } to { transform: scale(3); opacity: 0; } }
.commit-title::after { content: ""; position: absolute; left: 0; bottom: -0.2em; width: 3rem; height: 3px; background: var(--c); transform: scaleX(0); transform-origin: left; }
.is-first > .commit-title::after { animation: sweep 360ms var(--ease-snap) 1 both; }
.is-first > .rail > .dot::before { content: ""; position: absolute; inset: -2px; border-radius: 50%; background: var(--c); animation: ping 480ms var(--ease-snap) 1 both; }
```
Put `is-first` on the first `<section class="commit lane-main is-first">`. Its heading is the `h1`.

### 2. Scroll: lines draw, dots pop
Each line piece is drawn down to the 65% line of the screen as you scroll, and each dot pops when the line reaches it. Browsers with scroll-driven animation do this in pure CSS. Every piece and every dot is its own subject: `entry-crossing` is exactly the stretch while the line tip passes through it.
```css
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes pop { from { scale: 0; } }
@supports (animation-timeline: view()) {
  .piece, .dot { view-timeline: --node block; view-timeline-inset: 0 var(--tip-inset); }
  .draw { stroke-dasharray: 1 1; stroke-dashoffset: 1; animation: draw linear both; }
  .dot { animation: pop linear both; }
  .draw, .dot { animation-timeline: --node; animation-range: entry-crossing 0% entry-crossing 100%; }
}
/* Fallback: JS adds .js-graph only when the browser cannot do the above. */
.js-graph .draw { stroke-dasharray: 1 1; stroke-dashoffset: calc(1 - var(--draw, 0)); }
.js-graph .dot { scale: 0; transition: scale 160ms var(--ease-snap); }
.js-graph .dot.is-reached { scale: 1; }
```
The fallback reads where every piece is and sets `--draw`. It runs once per scroll frame and then stops, so nothing loops. It works after a reload halfway down, and at the bottom of the page it completes everything.
```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fallback = !reduce && !CSS.supports('animation-timeline', 'view()');
const TIP = 0.65; // same as 100% minus --tip-inset
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
if (fallback) document.documentElement.classList.add('js-graph');

const sections = [...document.querySelectorAll('.commit')];
const pieces = [...document.querySelectorAll('.piece')];
const dots = [...document.querySelectorAll('.dot')];
sections.forEach((s) => s.querySelector('.commit-title').setAttribute('tabindex', '-1')); // so j/k can focus headings
let headIndex = -1, queued = false, jumped = -1, jumpSeen = false;
function update() {
  queued = false;
  const vh = window.innerHeight, tipY = vh * TIP;
  const atBottom = vh + window.scrollY >= document.documentElement.scrollHeight - 2;
  // Read every layout value first, then write (no layout thrash).
  const readY = document.querySelector('.topbar').getBoundingClientRect().bottom + vh * 0.15;
  const tops = sections.map((s) => s.getBoundingClientRect().top);
  const jumpBox = jumped >= 0 ? sections[jumped].getBoundingClientRect() : null;
  const pieceBoxes = fallback ? pieces.map((p) => p.getBoundingClientRect()) : [];
  const dotBoxes = fallback ? dots.map((d) => d.getBoundingClientRect()) : [];
  let index = 0;
  tops.forEach((top, i) => { if (top <= readY) index = i; }); // also true for sections already scrolled past
  if (atBottom) index = sections.length - 1;                  // a short last section still becomes HEAD
  // Release the jump once its section has been on screen and then left it (scrollbar drag). Not before it was seen:
  // right after a click the target is still off screen, and releasing then would undo the jump.
  if (jumpBox) { if (jumpBox.bottom > 0 && jumpBox.top < vh) jumpSeen = true; else if (jumpSeen) jumped = -1; }
  if (jumped >= 0) index = jumped;                            // ...unless the visitor just jumped somewhere
  if (index !== headIndex) setHead(index);
  if (fallback) {
    pieces.forEach((p, i) => p.style.setProperty('--draw', (atBottom ? 1 : clamp((tipY - pieceBoxes[i].top) / pieceBoxes[i].height, 0, 1)).toFixed(3)));
    dots.forEach((d, i) => d.classList.toggle('is-reached', atBottom || dotBoxes[i].top + dotBoxes[i].height / 2 <= tipY));
  }
}
const request = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
window.addEventListener('scroll', request, { passive: true });
['resize', 'load'].forEach((name) => window.addEventListener(name, request));
request();
```

### 3. Hover and focus: the branch lights up
Fast and small. A project panel nudges 2px toward its lane and its node grows a little; links get a thicker underline; keyboard focus is a clear blue ring. All under 150ms.
```css
.project { padding: 1rem; background: var(--color-surface); border: 1px solid var(--color-border); border-left: 3px solid var(--c); border-radius: 6px; transition: transform 120ms var(--ease-snap); }
.project:hover, .project:focus-within { transform: translateX(2px); }
.branch:is(:hover, :focus-within) .dot-branch { transform: scale(1.25); } /* transform, while the pop uses scale: they do not fight */
a { color: var(--lane-main); text-underline-offset: 3px; } a:hover { text-decoration-thickness: 2px; }
a:focus-visible, .commit-title:focus-visible { outline: 2px solid var(--lane-main); outline-offset: 3px; border-radius: 3px; }
```

### 4. Navigation: HEAD follows you
`update()` above decides which section is current: the one whose heading has reached the top of the screen. The nav link gets `aria-current`, the HEAD pill shows its name, and that section's node gets a ring (`is-head`). `j` and `k` jump to the next or previous section and move focus to its heading. They never run while typing in a field, never with Ctrl, Cmd or Alt, and they do not change normal scrolling.
```html
<header class="topbar">
  <p class="head" aria-hidden="true"><span class="head-tag">HEAD</span><span class="head-name"></span></p>
  <nav class="nav" aria-label="Sections"><a href="#home">Home</a><a href="#about">About</a><a href="#projects">Projects</a></nav>
  <p class="keys"><kbd>j</kbd> <kbd>k</kbd> move between sections</p>
</header>
```
```css
html { scroll-behavior: smooth; }
/* Sticky, not fixed: the bar keeps its own space, so no body padding is needed. */
.topbar { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 1rem; min-height: var(--bar-h); padding-inline: 0.5rem; background: var(--color-surface); border-bottom: 1px solid var(--color-border); }
.head, .keys { display: none; } /* phones: the node ring and the highlighted link are enough */
.nav { display: flex; flex: 1; justify-content: space-between; }
.nav a { display: flex; align-items: center; min-height: 44px; padding: 0 0.375rem; border-bottom: 3px solid transparent; color: var(--color-text); font-size: 0.875rem; font-weight: 600; text-decoration: none; transition: color 120ms linear, border-color 120ms linear; }
.nav a[aria-current] { color: var(--lane-main); border-bottom-color: var(--lane-main); }
.dot::after { content: ""; position: absolute; inset: -6px; border: 2px solid var(--c); border-radius: 50%; opacity: 0; transform: scale(0.6); transition: opacity 120ms linear, transform 160ms var(--ease-snap); } /* the HEAD ring */
.dot.is-head::after { opacity: 1; transform: none; }
/* Landing on a section from a link replays the sweep. This selector is as specific as the page-load one and nothing else sets an animation on that pseudo-element. */
.commit:target > .commit-title::after { animation: sweep 360ms var(--ease-snap) 1 both; }
@media (min-width: 48em) {
  .head { display: flex; align-items: center; gap: 0.5rem; min-width: 9rem; }
  .head-tag { padding: 0.125rem 0.5rem; border-radius: 4px; background: var(--lane-main); color: #fff; font: 500 0.8125rem "Fira Code", ui-monospace, monospace; }
  .nav { flex: none; justify-content: flex-start; gap: 0.5rem; } .nav a { padding: 0 0.75rem; font-size: 1rem; }
}
@media (min-width: 48em) and (hover: hover) { .keys { display: block; margin-left: auto; color: var(--color-muted); font-size: 0.875rem; } }
kbd { padding: 0 0.375rem; border: 1px solid var(--color-border); border-radius: 4px; font: 0.8125rem "Fira Code", ui-monospace, monospace; }
```
```js
const navLinks = [...document.querySelectorAll('.nav a')];
const headName = document.querySelector('.head-name');
function setHead(index) {
  headIndex = index;
  const id = sections[index].id;
  navLinks.forEach((link) => {
    if (link.hash === '#' + id) { link.setAttribute('aria-current', 'location'); if (headName) headName.textContent = link.textContent; }
    else link.removeAttribute('aria-current');
  });
  sections.forEach((s, i) => s.querySelector(':scope > .rail > .dot').classList.toggle('is-head', i === index));
}
// After a jump (j/k or a nav link), HEAD stays on the section jumped to until the visitor scrolls by themselves.
// Without this, jumping to a short section near the end makes the bottom-of-page rule select the one after it.
const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
['wheel', 'touchmove', 'pointerdown'].forEach((name) => window.addEventListener(name, () => { jumped = -1; }, { passive: true }));
navLinks.forEach((link) => link.addEventListener('click', () => { jumped = sections.findIndex((s) => '#' + s.id === link.hash); jumpSeen = false; }));
document.addEventListener('keydown', (event) => {
  if (scrollKeys.includes(event.key)) jumped = -1;
  if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || (event.key !== 'j' && event.key !== 'k')) return;
  if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]')) return;
  const from = jumped >= 0 ? jumped : headIndex;
  const next = clamp(from + (event.key === 'j' ? 1 : -1), 0, sections.length - 1);
  if (next === from) return;
  jumped = next; jumpSeen = false;
  setHead(next);
  sections[next].scrollIntoView(); // CSS smooth scroll and scroll-margin-top apply
  sections[next].querySelector('.commit-title').focus({ preventScroll: true });
});
```

### 5. Signature: branch and merge
Each project forks off the main line into its own lane, runs beside its panel, and merges back into the main line with a ring. Fork, run and merge are three SVG pieces drawn one after another by the same scroll code, so nothing new is needed in the JavaScript. Alternate `lane-1` and `lane-2` down the list, whatever the number of projects. Put the branch pieces inside the Projects section, after its heading.
```html
<article class="branch lane-1" aria-labelledby="p1-title">
  <div class="rail" aria-hidden="true">
    <svg class="piece fork" viewBox="0 0 60 40" preserveAspectRatio="none"><path class="track" d="M10 0C10 20 30 20 30 40"/><path class="draw" d="M10 0C10 20 30 20 30 40" pathLength="1"/></svg>
    <svg class="piece run" viewBox="0 0 60 100" preserveAspectRatio="none"><path class="track" d="M30 -1V101"/><path class="draw" d="M30 -1V101" pathLength="1"/></svg>
    <svg class="piece merge" viewBox="0 0 60 40" preserveAspectRatio="none"><path class="track" d="M30 0C30 20 10 20 10 40"/><path class="draw" d="M30 0C30 20 10 20 10 40" pathLength="1"/></svg>
    <span class="dot dot-branch"></span><span class="dot dot-merge"></span>
  </div>
  <div class="project">
    <h3 id="p1-title">Real Project Name <span class="branch-name" aria-hidden="true">real-project-name</span></h3>
    <p>The real description from SPEC.md.</p>
  </div>
</article>
```
For `lane-2` use x 50 instead of 30 in all three pieces (fork `M10 0C10 20 50 20 50 40`, run `M50 -1V101`, merge `M50 0C50 20 10 20 10 40`). A project with a link wraps the name in `<a>`; one without stays plain text.
```css
.branch { position: relative; padding-block: var(--fork-h); }
.branch > .rail { left: calc(var(--gutter) * -1); } /* the rail is inside the padded section, so pull it back into the gutter */
.piece.fork { height: var(--fork-h); } .piece.run { top: var(--fork-h); height: calc(100% - 2 * var(--fork-h)); }
.piece.merge { top: auto; bottom: 0; height: var(--fork-h); } /* double-class selectors beat the plain .piece rule */
.dot-branch { top: calc(var(--fork-h) + 1.9rem); } /* beside the project title */
.dot-merge { --c: var(--lane-main); --x: var(--x0); top: 100%; background: var(--color-surface); border: 3px solid var(--c); } /* a hollow ring on the main line */
.project h3 { display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem 0.75rem; font-size: 1.25rem; line-height: 1.3; }
.branch-name { padding: 0 0.5rem; border-radius: 4px; background: color-mix(in srgb, var(--c) 9%, #fff); color: var(--c); font: 400 0.8125rem/1.6 "Fira Code", ui-monospace, monospace; }
```

## Reduced motion
The graph shows fully drawn and the HEAD ring still moves, instantly. Turning animations off is not enough on its own: the scroll-drawn lines start at `stroke-dashoffset: 1` (hidden), so this block sets them back to 0. The JavaScript adds `.js-graph` only when motion is allowed.
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .draw { stroke-dashoffset: 0 !important; } /* otherwise every line stays invisible */
}
```

## Libraries
None. Plain CSS, inline SVG and JavaScript only.

## Avoid
- Anything fake: commit hashes, dates, authors, "merged" or "pull request" labels, branch names that are not real project names, diff lines, contribution squares, version tags.
- A dark theme, green-on-black text or a terminal prompt. That is the Terminal vibe.
- More than 3 lane colours, or lane colours used for long body text.
- Scroll-jacking, snap scrolling, or `j` / `k` that work while someone is typing. Text is never hidden by the graph; only lines and nodes animate.
- A graph wider than the gutter at 320px, or any sideways scroll. Check it.
- Generic page habits: a "→" after every link, "A · B · C" strings, numbering the projects 01 / 02 / 03, one headline word picked out in the accent, an ALL-CAPS label above every heading, the same rounded card with a soft shadow everywhere, a fade-up on every section.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
