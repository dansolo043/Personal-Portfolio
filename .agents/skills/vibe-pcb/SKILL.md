---
name: vibe-pcb
description: Restyles the portfolio site as a printed circuit board seen from above, with copper traces, pads and silkscreen labels (look, layout and motion). Use ONLY when the student names the vibe-pcb skill or asks for the PCB vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: major
  tags: "computer-eng, electrical, engineering"
  intensity: standard
  version: "2"
---

# Vibe: PCB

## Feel and who it's for
The portfolio is a well-laid-out circuit board seen from above: a deep soldermask field, copper traces routed at 45-degree angles, round pads and white silkscreen text. Each section is a component footprint on the board and the traces connect one footprint to the next. When you reach a section, a pulse of current runs down the trace into it and its pads light up. Good for computer engineering students who design hardware, embedded systems and boards, and want co-op employers to see that care.

## Must keep (this is what makes it PCB)
1. A deep, slightly blue-green soldermask field with copper/gold traces and warm white silkscreen text. It is NOT near-black with a bright green accent (that is Terminal) and NOT blue-black with cyan and yellow (that is Oscilloscope).
2. Each section is a footprint: a thin silkscreen outline with pads on its edges. Traces only run between footprints, in the gutter, never across text.
3. Traces move in straight runs and 45-degree bends only. No curves, no sharp 90-degree corners.
4. Navigation is a pin header: a row of five copper pins, one per section, with the current pin lit.
5. Motion is current: a pulse travels a trace once, then the pads it reaches light up and stay lit. Nothing loops.

## Content honesty (very important)
Silkscreen is decoration, but it is still text. Visible labels may only be the student's real section names, real project names, or the student's real initials from SPEC.md. Do NOT invent reference designators (R1, C3, U2), part numbers, revision codes ("Rev A", "v1.0"), dates, net names (VCC, GND, SDA), voltages, board sizes, scale bars or "made in" lines. Decorative copies of labels are `aria-hidden="true"`; every section keeps a real `<h2>`.

## Starting defaults (change freely)
The student can say "make the traces silver" or "use a purple board". Their request wins.

Palette, in words: a deep soldermask in blue-leaning green; a slightly lighter mask tone for footprints; a darker "epoxy" tone for the header bar and chip bodies; warm silkscreen white for text; a soft grey-green for secondary text; gold (ENIG plating) for links and the lit state; copper for traces, pads and rules; pale gold for the travelling pulse.

```css
:root {
  --color-bg: #0B3B40;      /* soldermask */
  --color-surface: #0F474B; /* footprint fill */
  --color-deep: #072B2F;    /* header bar, chip bodies, the page outside the board */
  --color-text: #F4F1E6;    /* silkscreen */
  --color-muted: #B8CDC8;
  --color-gold: #EBBE64;    /* links, lit state */
  --color-copper: #C47F43;  /* traces, pads, rules */
  --color-pulse: #FFE8A8;
  --color-line: #7FA6A2;    /* silkscreen outlines */
  /* Contrast, computed. Text on bg / surface / deep: silkscreen 10.8 / 9.2 / 13.3, muted 7.4 / 6.2 / 9.0,
     gold 7.1 / 6.0 / 8.7 (gold passes on every surface). Copper line on bg / surface / deep: 3.8 / 3.2 / 4.6.
     Outline on bg 4.6. Never put silkscreen white text on a gold fill (1.5); use --color-deep there (8.7). */
  --ease-surge: cubic-bezier(0.7, 0, 0.9, 0.35); /* slow charge, then a hard strike */
  --run: 700ms;           /* a pulse crossing one trace */
  --step: 90ms;           /* gap before the next pad lights */
  --header-h: 3.5rem;
  --font-display: "Saira Semi Condensed", "Arial Narrow", sans-serif;
  --font-body: "Atkinson Hyperlegible", system-ui, sans-serif;
}
```
Other boards that keep the feel (swap the palette, keep the rules): matte black mask (`--color-bg: #101312`, surface `#171C1B`, deep `#070908`, gold `#E8B84A`, copper `#B87333`; silkscreen is 16.5:1 on it, gold 10.1:1) or a purple mask (bg `#2A1550`, surface `#341C5F`, deep `#1B0C38`, muted `#CDBFE6`; silkscreen 14.1:1, gold 9.1:1). Keep `--color-deep` darker than `--color-bg`.

Fonts: Saira Semi Condensed for headings and labels (squared, engineered), Atkinson Hyperlegible for body text (made for legibility). Alternatives: Overpass, or Red Hat Text for body.
`<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Saira+Semi+Condensed:wght@500;600;700&display=swap" rel="stylesheet">`

Base rules (so nothing relies on browser defaults). Use your spacing scale for the gaps; plain rem values are shown here.
```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--color-deep); color: var(--color-text); font: 1rem/1.6 var(--font-body); }
h1, h2, h3, p, ul { margin: 0; }
ul { padding: 0; list-style: none; }
h1, h2, h3 { font-family: var(--font-display); font-weight: 700; line-height: 1.1; } /* h1 clamp(2.5rem, 12vw, 4.5rem), h2 1.75rem, h3 1.25rem */
p { max-width: 62ch; }
html { scroll-behavior: auto; } /* jumps are instant, like a probe touching a pad */
section[id] { scroll-margin-top: var(--header-h); } /* the sticky header never covers a landing */
html { scroll-padding-block: var(--header-h) 2rem; } /* and Tab focus never lands under it or on the bottom edge */
```

## Layout ideas
- **Board:** one rounded, outlined panel (`.board`, the `<main>`) centred on the darker page, with four mounting holes drawn in its corners. On phones it is one column with a single trace between footprints; from about 48em a second parallel trace appears.
- **Header:** the pin header, sticky at the top, five links (see Navigation). No footer. A silkscreen mark of the student's real initials in a bottom corner of the board is allowed (`aria-hidden`), nothing else: no year, slogan or revision.
- **Hero:** the first footprint. The real name large, the one-line intro under it (the intro from SPEC.md; if SPEC.md has no separate tagline, use the "Who I am" line without the name). Bottom pads only.
- **About:** the real bio. From 48em the `<h2>` sits in a narrow left column and the text beside it.
- **Projects:** each real project is a chip: a dark package with copper pins down both sides and its real name as the silkscreen title. A link only if SPEC.md has one for that project.
- **Skills:** each real skill is a small pad followed by its name, wrapping like a row of test points.
- **Contact:** each real contact line starts with a via (a ring with a hole). The email must fit on one line at 320px.

```css
.board { position: relative; max-width: 68rem; margin: 0.5rem auto; padding: 2.5rem 0.75rem 3.5rem; overflow-x: clip; /* traces can never scroll the page sideways */
  border: 1px solid var(--color-line); border-radius: 0.75rem;
  --hole: radial-gradient(circle, var(--color-deep) 0 0.3rem, var(--color-copper) 0.32rem 0.5rem, transparent 0.52rem);
  background: var(--hole) left top / 2rem 2rem no-repeat, var(--hole) right top / 2rem 2rem no-repeat,
              var(--hole) left bottom / 2rem 2rem no-repeat, var(--hole) right bottom / 2rem 2rem no-repeat, var(--color-bg); }
.footprint { position: relative; display: grid; gap: 1rem; padding: 2rem 1rem; background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 0.375rem; }
@media (min-width: 48em) { .footprint { grid-template-columns: 11rem 1fr; gap: 1rem 2rem; padding: 2.5rem 2rem; } .footprint--hero { grid-template-columns: 1fr; } }

/* Pads sit on the footprint edge. Pad centres line up with the trace ends: first at 2rem, second at 3rem. */
.pads { position: absolute; left: 1.6875rem; z-index: 1; display: flex; gap: 0.375rem; }
.pads--top { top: 0; transform: translateY(-50%); }
.pads--bottom { bottom: 0; transform: translateY(50%); }
.pads i { --n: 0; position: relative; width: 0.625rem; height: 0.625rem; border-radius: 50%; background: var(--color-copper); }
.pads i:nth-child(2) { --n: 1; display: none; } /* phones: one pad, one trace */
@media (min-width: 48em) { .pads i:nth-child(2) { display: block; } }
.pads i::after { content: ""; position: absolute; inset: -0.5rem; border-radius: 50%; opacity: 0; /* the glow: unlit until the pulse arrives */
  background: radial-gradient(circle, rgb(255 232 168 / 0.85), transparent 70%); }
.pads--top::before { content: ""; position: absolute; top: 50%; left: -1rem; width: 0.4rem; height: 0.4rem; margin-top: -0.2rem; border-radius: 50%; background: var(--color-text); } /* pin 1 dot: where the trace comes in */

.chips { display: grid; gap: 2rem; }
@media (min-width: 60em) { .chips { grid-template-columns: repeat(3, 1fr); } }
.chip { position: relative; margin-inline: 0.5rem; padding: 1.25rem 1rem; background: var(--color-deep); border: 1px solid var(--color-line); border-radius: 0.25rem; }
.chip::before, .chip::after { content: ""; position: absolute; top: 0.75rem; bottom: 0.75rem; width: 0.5rem; /* the pins */
  background: linear-gradient(to bottom, var(--color-copper) 0 0.5rem, transparent 0.5rem) 0 0 / 100% 1rem round; } /* round: whole pins only, no sliver at the end */
.chip::before { right: 100%; } .chip::after { left: 100%; }
.skill-pins { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; }
.skill-pins li { display: flex; align-items: center; gap: 0.5rem; }
.skill-pins li::before { content: ""; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--color-copper); }
.silk-mark { position: absolute; right: 3rem; bottom: 1rem; font: 600 1rem var(--font-display); color: var(--color-muted); }
```

## Make it theirs
- The one loud thing is the arrival pulse. Everything else stays quiet: thin lines, flat fills, no glow on text, no animated background.
- Use the student's real vocabulary. Their real skills (a microcontroller, a language, a design tool) become the test points; their real project names are the chip titles. Never add parts, buses or labels SPEC.md does not back up.
- Every device carries meaning. The pin 1 dot marks where the trace enters, pads are where traces end, the chip pins belong to chips (projects). No pad, via or trace is there only to fill space.
- A clear type scale: big name, a clear step to section headings, calm body text under 80 characters per line.

## Motion character
Tempo: a trace takes 700ms, pads light 90ms apart, then everything holds. Easing: `var(--ease-surge)` everywhere: slow start like a capacitor charging, then a hard strike into the pad, and the pad "rises then holds" (it overshoots slightly, then settles and stays lit). Pulses run once per arrival and never loop. I animate only `transform`, `opacity`, `clip-path`, `filter`, plus `stroke-dashoffset` on the trace pulse (it is how a short dash travels along an SVG path).

Shared keyframes (used by several moments):
```css
@keyframes pulse-run { from { stroke-dashoffset: 18; } to { stroke-dashoffset: -100; } }   /* an 18-unit dash enters at 0 and leaves past 100 */
@keyframes pad-on { 0% { opacity: 0; transform: scale(0.5); } 45% { opacity: 1; transform: scale(1.4); } 100% { opacity: 1; transform: scale(1); } }
@keyframes header-sweep { to { transform: translateX(100vw); } }
@keyframes pins-in { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0); } }
```

### 1. Page load: power on
Content is on screen at once. A thin bright streak runs once along the header's bottom edge, then the hero's pads light (the same arrival code as the signature). Pure CSS for the streak; it ends off screen.

```html
<section class="stage stage--first" id="home" aria-labelledby="home-title">
  <div class="footprint footprint--hero">
    <h1 id="home-title">The student's name from SPEC.md</h1>
    <p>The one-line intro from SPEC.md.</p>
    <span class="pads pads--bottom" aria-hidden="true"><i></i><i></i></span>
  </div>
</section>
```
```css
.pin-header::after { content: ""; position: absolute; left: 0; bottom: 0; width: 4rem; height: 2px; background: linear-gradient(90deg, transparent, var(--color-pulse));
  transform: translateX(-100%); animation: header-sweep 900ms var(--ease-surge) 200ms 1 both; }
```

### 2. Scroll: chip pins grow
As each chip scrolls in, its pins extend from the top down, tied to scroll position (linear, no timing). Browsers without scroll-driven animation just show the pins.

```css
@supports (animation-timeline: view()) {
  .chip::before, .chip::after { animation: pins-in linear both; animation-timeline: view(); animation-range: entry 0% entry 70%; }
}
```

### 3. Hover and focus: a trace lights under links
Content links wear a dim copper underline (a short trace). On hover or focus a bright pulse fills it left to right. Contact vias swell and glow. Only real links react; chips and plain text do nothing. Scoped to `.board` so the header pins are not affected.

```css
.board a { position: relative; display: inline-flex; align-items: center; min-height: 44px; min-width: 44px; color: var(--color-gold); text-decoration: none; overflow-wrap: anywhere; } /* 44px tap targets */
.board a::before, .board a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0.5rem; height: 2px; } /* under the text inside the 44px box */
.board a::before { background: var(--color-copper); }
.board a::after { background: var(--color-pulse); transform: scaleX(0); transform-origin: left; transition: transform 180ms var(--ease-surge); }
.board a:hover::after, .board a:focus-visible::after { transform: scaleX(1); }
.board a:focus-visible { outline: 2px solid var(--color-text); outline-offset: 4px; }

.contact-list li { display: flex; align-items: center; gap: 0.75rem; }
.contact-list a { font-size: clamp(0.9375rem, 4.4vw, 1.125rem); } /* an email stays on one line at 320px */
.via { flex: none; width: 0.875rem; height: 0.875rem; border-radius: 50%; transition: transform 160ms var(--ease-surge), filter 160ms var(--ease-surge);
  background: radial-gradient(circle, var(--color-deep) 0 0.17rem, var(--color-copper) 0.19rem); }
.contact-list li:has(a:hover) .via, .contact-list li:has(a:focus-visible) .via { transform: scale(1.35); filter: drop-shadow(0 0 4px var(--color-gold)); }
```
```html
<li><span class="via" aria-hidden="true"></span><a href="mailto:the-email-from-SPEC.md">Email</a></li>
```
Use the label SPEC.md gives next to a link (for example "GitHub" or "LinkedIn"); a bare URL gets that label, never new wording. A real email may be shown as the link text itself.

### 4. Navigation: the pin header
Five pins in a row, one per real section. The current section's pin is lit and its label turns white; hovering a pin glows it halfway. Jumps are instant and the landing section stays lit until the visitor scrolls on their own.

```html
<header class="pin-header">
  <nav aria-label="Sections">
    <ul>
      <li><a href="#home" aria-current="location"><span class="pin" aria-hidden="true"></span>Home</a></li>
      <li><a href="#about"><span class="pin" aria-hidden="true"></span>About</a></li>
      <!-- Projects, Skills, Contact: the same shape, the labels are the real section names. -->
    </ul>
  </nav>
</header>
```
```css
/* Sticky, so the page needs no top padding; scroll-margin-top above keeps landings clear of it. */
.pin-header { position: sticky; top: 0; z-index: 10; overflow: hidden; height: var(--header-h); background: var(--color-deep); border-bottom: 1px solid var(--color-copper); }
.pin-header nav, .pin-header ul { height: 100%; }
.pin-header ul { display: flex; max-width: 40rem; margin-inline: auto; }
.pin-header li { flex: 1 1 0; min-width: 0; } /* five equal pins; at 320px each is 64px wide, so no wrapping and no scrolling */
.pin-header a { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.25rem; height: 100%; /* at least 44px tall */
  font: 600 0.875rem var(--font-display); color: var(--color-muted); text-decoration: none; }
.pin-header a:focus-visible { outline: 2px solid var(--color-text); outline-offset: -4px; } /* drawn inside, so the screen edge never clips it */
.pin-header a[aria-current="location"] { color: var(--color-text); }
.pin { position: relative; width: 0.875rem; height: 0.875rem; background: radial-gradient(circle, var(--color-deep) 0 0.17rem, var(--color-copper) 0.19rem); }
.pin::after { content: ""; position: absolute; inset: -0.5rem; border-radius: 50%; opacity: 0; transition: opacity 160ms var(--ease-surge);
  background: radial-gradient(circle, rgb(255 232 168 / 0.8), transparent 70%); }
.pin-header a:hover .pin::after { opacity: 0.5; }
.pin-header a[aria-current="location"] .pin::after { opacity: 1; } /* after the hover rule, so lit wins */
```

### 5. Signature: current runs into the section
When a section arrives, a pulse runs down the trace from the previous footprint into this one, and then this footprint's pads light in sequence (top pads, then bottom pads) and stay lit. Once per arrival. The trace is an inline SVG at the top of each stage after the first; pad centres match the trace ends. The pulse path is a copy of the copper path with `pathLength="100"` so one dash length works for any route.

```html
<section class="stage" id="about" aria-labelledby="about-title">
  <svg class="trace" viewBox="0 0 48 56" aria-hidden="true" focusable="false">
    <path class="copper" d="M8 0V10L20 22V34L8 46V56"/>
    <path class="pulse" pathLength="100" d="M8 0V10L20 22V34L8 46V56"/>
    <g class="lane-b">
      <path class="copper" d="M24 0V10L36 22V34L24 46V56"/>
      <path class="pulse" pathLength="100" d="M24 0V10L36 22V34L24 46V56"/>
    </g>
  </svg>
  <div class="footprint">
    <span class="pads pads--top" aria-hidden="true"><i></i><i></i></span>
    <h2 id="about-title">About</h2>
    <p>The bio from SPEC.md.</p>
    <span class="pads pads--bottom" aria-hidden="true"><i></i><i></i></span>
  </div>
</section>
```
The last stage can leave out the bottom pads. Every stage class is `stage`; the first also has `stage--first`. Do not add margins between stages: the trace joins the two footprints edge to edge.
```css
.trace { display: block; width: 3rem; height: 3.5rem; margin-left: 1.5rem; overflow: visible; }
.trace path { fill: none; stroke-width: 3; stroke-linecap: round; }
.trace .copper { stroke: var(--color-copper); }
.trace .pulse { stroke: var(--color-pulse); stroke-width: 4; stroke-dasharray: 18 100; stroke-dashoffset: 18; filter: drop-shadow(0 0 5px var(--color-gold)); } /* hidden until it runs */
.lane-b { display: none; }
@media (min-width: 48em) { .lane-b { display: inline; } }

.pads--top { --lag: var(--run); }                                  /* top pads wait for the pulse to arrive */
.pads--bottom { --lag: calc(var(--run) + 2 * var(--step)); }
.stage--first .pads--bottom { --lag: 0ms; }                        /* the hero has no trace to wait for */
.stage.is-arrived .pulse { animation: pulse-run var(--run) var(--ease-surge) var(--stagger, 0ms) both; }
.stage.is-arrived .pads i::after { opacity: 1; animation: pad-on 360ms var(--ease-surge) calc(var(--stagger, 0ms) + var(--lag) + var(--n) * var(--step)) both; }
/* Sections already scrolled past skip the show and appear finished. !important beats the rules above. */
.stage.is-settled .pulse, .stage.is-settled .pads i::after { animation-duration: 0s !important; animation-delay: 0s !important; }
```
```js
const stages = Array.from(document.querySelectorAll('main .stage'));
const pinLinks = Array.from(document.querySelectorAll('.pin-header a'));
let pinned = null;   // index of the section a jump landed on; it stays lit until the visitor scrolls on their own
let ticking = false;

function onScroll() {
  if (!ticking) { ticking = true; requestAnimationFrame(update); } // one frame per burst of scrolling; nothing loops
}
function setCurrent(id) {
  pinLinks.forEach((link) => {
    // setAttribute, not toggleAttribute: aria-current="" counts as false for screen readers.
    if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function arrive(stage, settled) {
  if (stage.classList.contains('is-arrived')) return false;
  stage.classList.add('is-arrived');
  if (settled) stage.classList.add('is-settled');
  return true;
}
function pinTo(id) {
  pinned = stages.findIndex((stage) => stage.id === id);
  if (pinned < 0) pinned = null; else setCurrent(id);
}
function update() {
  ticking = false;
  // Read everything first, then write (no layout thrashing).
  const rects = stages.map((stage) => stage.getBoundingClientRect());
  const vh = window.innerHeight;
  const atTop = window.scrollY < 8;
  const atBottom = vh + window.scrollY >= document.documentElement.scrollHeight - 2;
  let current = rects.findIndex((r) => r.top <= vh * 0.4 && r.bottom > vh * 0.4);
  if (atTop) current = 0;
  else if (atBottom) current = stages.length - 1; // a short last section may never reach the 40% line
  if (pinned !== null) {                            // keep a jumped-to section selected...
    if (rects[pinned].bottom <= 0 || rects[pinned].top >= vh) pinned = null; // ...until it leaves the screen
    else current = pinned;
  }
  let order = 0;
  stages.forEach((stage, i) => {
    if (rects[i].bottom <= 0) arrive(stage, true);               // already scrolled past (reload, deep jump): show it finished
    else if (rects[i].top < vh * 0.8 || atBottom) {
      // Several sections on screen at once (tall screens, page bottom) take turns instead of pulsing together.
      if (arrive(stage, false)) stage.style.setProperty('--stagger', order++ * 450 + 'ms');
    }
  });
  if (current >= 0) setCurrent(stages[current].id);
}

pinLinks.forEach((link) => link.addEventListener('click', () => pinTo(link.hash.slice(1))));
window.addEventListener('hashchange', () => pinTo(location.hash.slice(1)));
// The visitor scrolling on their own releases the jump.
['wheel', 'touchmove'].forEach((type) => window.addEventListener(type, () => { pinned = null; }, { passive: true }));
window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) pinned = null;
});
// Keyboard users: Tab into a section and it arrives too.
document.addEventListener('focusin', (event) => {
  const stage = event.target.closest('.stage');
  if (!stage) return;
  arrive(stage, false);
  if (pinned !== null && stages[pinned] !== stage) pinned = null;
  onScroll();
});
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
if (location.hash) pinTo(location.hash.slice(1));
update();
```
Without JavaScript the page is complete: pads are plain copper, the traces are drawn, and the pulse stays hidden.

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .pulse { display: none; }                  /* no travelling pulse */
  .stage.is-arrived .pads i::after { opacity: 1; } /* pads simply show as lit */
}
```
The header streak stays off screen (its starting position), the chip pins are fully drawn and the links' lit underline appears instantly on hover. Nothing is hidden by a starting state that never ends.

## Libraries
None. Plain CSS, inline SVG and JavaScript only.

## Avoid
- Near-black screens with acid-green or cyan lines (Terminal, Oscilloscope). Bright green text or neon glow of any kind.
- Invented silkscreen: reference designators, part numbers, revision codes, dates, net names, voltages, dimensions.
- Curved traces, 90-degree corners, traces running behind text, or circuit-board clip art and tiled pattern backgrounds.
- Pulses that loop forever, scan lines, flicker or anything blinking. Pads rise once and stay lit.
- Fake controls, jumper switches or LEDs that do nothing; a link-style look on things that are not links.
- Generic page habits: a "→" after every link, "A · B · C" strings, 01 / 02 / 03 numbering on projects, one word of a heading picked out in gold, an ALL-CAPS label above every heading, the same rounded card with a soft shadow everywhere, a fade-up on every section.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
