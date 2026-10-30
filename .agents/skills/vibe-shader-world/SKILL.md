---
name: vibe-shader-world
description: Restyles the portfolio site as glass panels floating over a living, hand-written GLSL shader that slowly shifts mood as you scroll (look, layout and motion). Use ONLY when the student names the vibe-shader-world skill or asks for the Shader World vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: frontier
  tags: "cs, digital-media, design-art"
  intensity: frontier
  version: "2"
---

# Vibe: Shader World

## Feel and who it's for
The whole page floats over one calm, generative field: folded, flowing light, a bit like oil on water or ink in a tank, painted live by a small program on the graphics card. Text sits on dark glass panels, so reading is always easy. As you scroll, the field changes mood, one mood per section, so moving down the page feels like travelling through a single world. It should feel like a graphics programmer's site: crafted, precise, tasteful, never a screensaver. Good for computer science, digital media and design students who want the site itself to show they can make pictures with maths. This is a take-home frontier vibe for strong agents: it uses a library and real GLSL, and it takes a careful build.

## Must keep (this is what makes it Shader World)
1. A full-screen canvas behind everything, painted by a hand-written fragment shader (domain-warped noise, see below). The canvas is decoration: `aria-hidden`, no text inside it, ever.
2. All real content (name, intro, bio, projects, skills, links) is plain HTML on dark glass panels. Contrast is computed against the worst case of the shader, never guessed.
3. Each section has its own shader state (colours, size of shapes, folding, camera). Scrolling blends smoothly from one state to the next. This is the one loud moment.
4. Motion is slow and low contrast: nothing flashes, nothing jumps, the field never moves faster than drifting smoke. A visible "Pause background" button is always reachable.
5. The page works fully without JavaScript, without WebGL and without the library: a designed CSS gradient takes the shader's place.
6. Native scrolling is untouched. No smooth-scroll library, no scroll snapping, no pinned sections.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the world warmer". Their request wins.

Palette, in words: near-black navy glass for every panel; bright cool white for reading text; a softer blue-grey for secondary text; one warm lamp-gold accent for links, the focus ring and the current section; the shader brings all the colour. The five shader moods are deliberately different (deep sea teal, plum dusk, ember copper, ice blue, moss green) so the world never settles into one purple-pink gradient.

```css
/* Contrast, computed (WCAG), always against the WORST case: the panel colour laid over pure white, as if the shader were
   at its brightest behind it. Text on a panel (84% panel over white = rgb 48 51 58):
     --color-text   #EEF2F8   11.3:1     --color-muted  #B6C1D2   7.0:1     --color-accent #F2C879   8.0:1
   Text on the header bar (94% over white = rgb 23 27 34): text 15.4:1, muted 9.5:1, accent 11.0:1.
   Page background with no shader (the fallback): text 17.5:1, muted 10.8:1, accent 12.5:1.
   Dark ink on an accent fill, if you add one: #070B12 on #F2C879 = 12.5:1. */
:root {
  color-scheme: dark;
  --color-bg: #070B12;
  --color-panel: rgb(8 12 20 / 0.84);   /* every piece of text sits on this */
  --color-bar: rgb(8 12 20 / 0.94);     /* the header is more solid, because page content scrolls under it */
  --color-text: #EEF2F8;
  --color-muted: #B6C1D2;
  --color-accent: #F2C879;
  --color-border: rgb(238 242 248 / 0.18);
  --world: rgb(159 227 210);            /* script.js keeps this equal to the shader's light colour */
  --font-display: "Familjen Grotesk", "Helvetica Neue", Arial, sans-serif;
  --font-body: "Albert Sans", system-ui, sans-serif;
  --font-mono: "DM Mono", ui-monospace, monospace;
  --ease-drift: cubic-bezier(0.22, 0.04, 0.12, 1);
  --header-h: 5.75rem;                  /* script.js overwrites this with the real height of the header */
  --gutter: 1rem;
}
```
Fonts (a graphics programmer's site, not a template): Familjen Grotesk for headings, Albert Sans for body, DM Mono for small UI (the pause button and skill tags). Alternatives: Schibsted Grotesk or Bricolage Grotesque for headings, Public Sans for body. Not Inter.
`<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&family=Familjen+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">`

Spacing is the project's spacing scale. The few rem values in the snippets are placeholders so each snippet works on its own; swap them for your spacing variables. Corners are slightly rounded, never pills.

## Layout ideas
- **One column of glass panels** over the world, never full-width text on the shader. Panels are about 40rem wide at most, and on wide screens they alternate left and right so a window onto the world stays open beside each one.
- **Header:** a solid-ish sticky bar (more opaque than the panels, because page content scrolls under it) with the student's real name, the section links, and the pause button. On phones it is two rows: name and pause button on top, links underneath. Five links fit one row at 320px with the sizes below; if the student has more, let them wrap, never scroll sideways.
- **Hero:** one panel low in a full-height screen, so the top of the page is mostly world. The name is large (one line on desktop, two on phones), the one-line intro under it. The intro is the one-line intro from SPEC.md; if SPEC.md has no separate tagline, use the "Who I am" line without the name.
- **About:** one panel with the real bio.
- **Projects:** a small title panel, then one panel per real project in a staggered row on wide screens (one column on phones). A project title is a link only if SPEC.md gives it a link; the link is stretched over the whole panel. A project with no link is plain text and does not react to hover.
- **Skills:** the real skills as small bordered tags in a wrapping row.
- **Contact:** the real email and links, one per line, each at least 44px tall. The email must stay on one line at 320px (the snippet lets a very long one wrap instead of overflowing). No footer; at most a plain "Back to top" link inside the contact panel.

A skeleton to build from. Section ids and nav links come from SPEC.md; use only the sections SPEC.md has content for.
```html
<body>
  <header class="site-header">
    <a class="brand" href="#home">The name from SPEC.md</a>
    <button class="world-toggle" type="button" hidden>Pause background</button>
    <nav aria-label="Sections">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section class="hero" id="home" aria-labelledby="home-title">
      <div class="panel hero-panel">
        <h1 id="home-title">The name from SPEC.md</h1>
        <p class="hero-intro">The one-line intro from SPEC.md.</p>
      </div>
    </section>
    <section id="about" aria-labelledby="about-title">
      <div class="panel"><h2 id="about-title">About</h2><p>The bio from SPEC.md.</p></div></section>
    <section id="projects" aria-labelledby="projects-title">
      <div class="panel panel-title"><h2 id="projects-title">Projects</h2></div>
      <div class="project-list">
        <!-- one article per real project -->
        <article class="panel project">
          <h3><a href="the link from SPEC.md">Project name from SPEC.md</a></h3>  <!-- link only if SPEC.md has one -->
          <p>One real sentence from SPEC.md.</p>
        </article>
        <article class="panel project"><h3>A project with no link</h3><p>One real sentence from SPEC.md.</p></article>
      </div>
    </section>
    <section id="skills" aria-labelledby="skills-title">
      <div class="panel"><h2 id="skills-title">Skills</h2>
        <ul class="chips"><li>A skill from SPEC.md</li></ul></div></section>
    <section id="contact" aria-labelledby="contact-title">
      <div class="panel"><h2 id="contact-title">Contact</h2>
        <ul class="contact-list">
          <li><a href="mailto:the email from SPEC.md">the email from SPEC.md</a></li>
          <li><a href="the link from SPEC.md">The label SPEC.md gives it, for example GitHub</a></li>
        </ul></div></section>
  </main>
</body>
```
The head has the fonts, `styles.css`, and `<script src="script.js" defer></script>` (a normal script, not `type="module"`: `script.js` loads three.js itself with `import()` so a failed download cannot break the rest of the page). The canvas is created by `script.js` and put first in `<body>`, so with no JavaScript there is no empty canvas in the page.

Base, panels, header and sections CSS (mobile first). Everything here is a starting point; keep the ideas (solid-ish glass, bar over content, `overflow-x: clip`, the lit top edge) and change the details.
```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: auto; }
body {
  margin: 0;
  color: var(--color-text);
  font: 400 1rem/1.6 var(--font-body);
  /* The designed fallback: this is what shows with no JavaScript, no WebGL or no network. The shader covers it. */
  background:
    radial-gradient(70rem 45rem at 12% 8%, rgb(15 107 115 / 0.55), transparent 70%),
    radial-gradient(60rem 45rem at 90% 55%, rgb(107 47 110 / 0.40), transparent 70%),
    radial-gradient(60rem 40rem at 20% 100%, rgb(138 59 31 / 0.30), transparent 70%),
    var(--color-bg);
  background-attachment: fixed;
}
.world { position: fixed; inset: 0; z-index: 0; width: 100%; height: 100%; display: block; pointer-events: none; opacity: 0; transition: opacity 1200ms var(--ease-drift); }
.has-world .world { opacity: 1; }
main { position: relative; z-index: 1; max-width: 72rem; margin-inline: auto; padding-inline: var(--gutter); overflow-x: clip; }
section[id] { scroll-margin-top: var(--header-h); padding-block: clamp(2.5rem, 10vh, 6rem); }
h1, h2, h3 { font-family: var(--font-display); font-weight: 600; line-height: 1.1; margin: 0 0 0.5rem; letter-spacing: -0.01em; }
h2 { font-size: clamp(1.75rem, 5vw, 2.75rem); }
p { max-width: 62ch; margin: 0 0 0.75rem; }
a { color: var(--color-accent); text-underline-offset: 0.2em; }
a:focus-visible, button:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
.panel { position: relative; isolation: isolate; max-width: 40rem; padding: 1.25rem; background: var(--color-panel);
  border: 1px solid var(--color-border); border-radius: 0.5rem; }
.panel > :last-child { margin-bottom: 0; }
/* The top edge catches the shader's light: script.js keeps --world equal to the light colour of the current state. */
@supports (color: color-mix(in srgb, red, blue)) {
  .panel { border-top-color: color-mix(in srgb, var(--world) 75%, transparent); }
}
/* The edge ring: invisible until something asks for it (hover, focus, landing from a nav jump). */
.panel::after { content: ""; position: absolute; inset: -1px; border: 1px solid var(--color-accent); border-radius: inherit; opacity: 0; pointer-events: none; }
.panel-title { width: fit-content; }
@media (min-width: 48em) and (hover: hover) {
  /* A blur behind a moving canvas is redone every frame, so it is for big screens only. Contrast above never counts on it. */
  .panel, .site-header { backdrop-filter: blur(10px); }
}
@media (min-width: 60em) {
  main > section:nth-of-type(even) > .panel { margin-left: auto; }   /* panels alternate sides, leaving a window onto the world */
  .hero-panel { max-width: 52rem; }                                   /* wide enough that the name stays on one line */
  main > section:last-of-type { min-height: 80svh; }                  /* room to scroll, so the last two moods each get to rest */
}
.site-header { position: sticky; top: 0; z-index: 5; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center;
  padding-inline: 0.5rem; background: var(--color-bar); border-bottom: 1px solid var(--color-border); }
.brand { display: flex; align-items: center; min-height: 44px; padding-inline: 0.25rem; font: 600 1.125rem var(--font-display); color: var(--color-text); text-decoration: none; }
.world-toggle { min-height: 44px; padding: 0 0.75rem; background: none; color: var(--color-text); border: 1px solid var(--color-border); border-radius: 0.25rem; font: 400 0.8125rem var(--font-mono); cursor: pointer; }
.world-toggle[hidden] { display: none; }
.site-header nav { grid-column: 1 / -1; }
.site-header ul { display: flex; flex-wrap: wrap; justify-content: space-between; margin: 0; padding: 0; list-style: none; }
.site-header nav a { display: flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; padding-inline: 0.25rem;
  font-size: 0.9375rem; color: var(--color-text); text-decoration: none; border-bottom: 2px solid transparent; }
.site-header nav a:hover { text-decoration: underline; text-underline-offset: 0.3em; }
.site-header nav a[aria-current] { border-bottom-color: var(--color-accent); }
.site-header a:focus-visible, .site-header button:focus-visible { outline-offset: -3px; }   /* drawn inside, so the screen edge never clips it */
@media (min-width: 48em) {
  .site-header { grid-template-columns: auto minmax(0, 1fr) auto; column-gap: 1.5rem; padding-inline: 1.5rem; }
  .brand { grid-column: 1; grid-row: 1; }
  .site-header nav { grid-column: 2; grid-row: 1; justify-self: end; }
  .world-toggle { grid-column: 3; grid-row: 1; }
  .site-header ul { gap: 0.5rem; }
  .site-header nav a { padding-inline: 0.75rem; }
}
.hero { min-height: calc(100vh - var(--header-h)); min-height: calc(100svh - var(--header-h)); display: flex; align-items: flex-end; }
.hero-panel h1 { font-size: clamp(2.75rem, 12vw, 6.5rem); line-height: 1; letter-spacing: -0.02em; }
.hero-intro { font-size: 1.125rem; color: var(--color-muted); }
.project-list { display: grid; gap: 1rem; margin-top: 1rem; }
.project { max-width: none; }
.project h3 { font-size: 1.375rem; }
.project p { color: var(--color-muted); }
@media (min-width: 60em) {
  .project-list { grid-template-columns: repeat(3, 1fr); align-items: start; }
  .project:nth-child(2) { margin-top: 3rem; }    /* a staggered row, so the world shows between the panels */
}
.chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0; padding: 0; list-style: none; }
.chips li { padding: 0.375rem 0.625rem; border: 1px solid var(--color-border); border-radius: 0.25rem; font: 400 0.875rem var(--font-mono); }
.contact-list { margin: 0; padding: 0; list-style: none; }
.contact-list a { display: inline-flex; align-items: center; min-height: 44px; overflow-wrap: anywhere; }
```

## Make it theirs
- The one loud thing is the world changing mood as you scroll. Everything else stays quiet: dark glass, one gold accent, short soft UI motion, no glow on text, no second effect.
- Name the five moods after the student's real sections, or pick colours from their own work. Colours come from `STATES` at the top of `script.js` (three hex values each: dark, mid, light). Any colours work for readability, because the panels are checked against a white backdrop, the worst case; keep the field itself soft and mid-dark so the world stays calm.
- If SPEC.md says what the student likes (for example water, terrain, light), let it steer the colours. Never write that into the page text unless SPEC.md says it.
- How to check: open `public/index.html` in a browser; scroll slowly and watch the mood change; click each nav link; press Pause background; resize to a phone width in DevTools; turn on the system's reduced-motion setting and reload (a still picture). If no world appears, open the browser console: three.js and the shader report problems there.

### Teach this to the student (explain-as-you-go applies)
Say it in simple words as you build. A shader is a tiny program the graphics card runs once for every pixel, many millions of times a second. Ours answers one question: what colour is this pixel right now? The inputs it gets are called uniforms, and `script.js` sets them every frame:

| Uniform | What it holds | Who sets it |
|---|---|---|
| `uTime` | seconds of flow; freezes when paused | the loop: adds `dt * CONFIG.speed` |
| `uResolution` | size of the painted canvas in pixels | `resize()` |
| `uScroll` | 0 at the top of the page, 1 at the bottom (shifts the oil-slick colours) | `applyWorld()` |
| `uPointer`, `uPointerAmt` | where the mouse is (0 to 1) and how strongly it pushes | `followPointer()` |
| `uIntro` | 0 to 1 while the world wakes up at page load | the loop |
| `uCam`, `uScale`, `uWarp`, `uIrid`, `uDark`, `uMid`, `uLight` | the blended state for the current scroll position | `applyWorld()` |

The shader (shared part B below) works in four steps: take this pixel's position, bend it with noise (domain warping: noise that moves the coordinates of more noise, which makes the folded, flowing look), turn the final noise value into a colour from the three palette colours, then add light on the slopes and a speck of dither.

Plain-language knobs the student can turn (change a number, save, reload):
- **Speed:** `CONFIG.speed`. 0.15 is a slow tide, 0.6 is lively. Keep it under about 0.8 so it stays calm.
- **Palette:** the three hex colours of any entry in `STATES`.
- **Scale:** `scale` in a state. Bigger numbers make smaller, busier shapes; smaller numbers make big slow shapes.
- **Warp:** `warp` in a state. 1 is gentle ripples, 3 is deep folds.
- **Shine:** `irid` in a state (the oil-slick colour on slopes). 0 turns it off.
- **Detail and sharpness:** `CONFIG.detail` (3 or 4) and `CONFIG.quality` (0.5 soft and cheap, 1 sharp and costly).
- **Mouse push:** `CONFIG.pointer`, or the `0.45` in the pointer line of the shader.

How to keep it cheap (these rules are why it runs on a phone):
1. One draw call: a single triangle covers the screen. One pass, no post-processing, no textures, no extra render targets.
2. Paint fewer pixels, not simpler maths. The field is smooth, so painting about 65% of the pixels (50% on phones) and letting CSS stretch it looks the same. The pixel ratio is capped at 1.5. On a 1920 by 1080 screen at pixel ratio 1 the shader paints about 0.9 million pixels; on a 390 by 844 phone at ratio 3 about 0.18 million.
3. Loops only with small fixed counts: `OCTAVES` is 3 or 4. Never loop over a number that comes from data or a uniform.
4. At most 30 updates a second (`CONFIG.maxFps`). The field is slow, so the eye cannot tell, and the work halves while page scrolling stays at the screen's full speed.
5. If frames keep coming late, `watchSpeed()` lowers the quality on its own and repaints. Nobody has to tune it.
6. Stop rendering whenever nothing changes (see the engine below). A paused, hidden or reduced-motion page paints one frame and then uses no graphics power.
7. Backdrop blur behind panels is redone every time the canvas changes, so it is only turned on for wide screens with a mouse.

Performance target: page scroll and input stay smooth (60fps, no jank) on a mid laptop and on a mid phone, because the shader is capped at 30 updates a second at reduced resolution and stops when idle. The numbers above are arithmetic, not measurements; test on a real phone, and expect headless or software-rendered browsers to look slow and trigger the automatic quality drop.

## Motion character
Tempo: slow and continuous in the world, short and quiet in the interface. The world follows the page like a heavy, well-damped camera: it glides toward where scrolling says it should be and never overshoots. Easing: exponential damping for the world (`1 - exp(-dt * rate)`), a smoothstep between neighbouring states, and one soft UI curve `var(--ease-drift)` (160 to 700ms) for panels. Never springy, never stepped, never fast. Nothing flashes: the field changes slowly and softly, and the landing pulse and the world waking up each last more than a second and happen once. The field runs for longer than five seconds, so it must be stoppable: the Pause background button is that control, and it is always in the sticky header.

The world engine is shared by all five moments. Put these parts of `script.js` in this order: knobs, shader, engine, scroll, pointer, nav, signature, controls, then the two boot lines at the very end. Function declarations are used for helpers, so order only matters for `const` and `let` values, and everything runs from the boot lines at the bottom.

### Shared part A: knobs and states
```js
// Knobs in plain words. Change a number, save, reload.
const CONFIG = {
  speed: 0.35,        // how fast the field flows. 0.15 = very slow, 0.6 = lively
  detail: 4,          // noise layers per pixel. 4 = rich, 3 = cheaper. Phones always use 3
  quality: 0.65,      // share of the screen's pixels the shader paints. 0.5 = soft and cheap, 1 = sharp
  maxPixelRatio: 1.5, // never paint for more than 1.5 pixels per CSS pixel, even on sharp screens
  maxFps: 30,         // the field is slow, so 30 updates a second looks smooth and halves the work
  pointer: true,      // a mouse gently pushes the field. Touch screens never do
};

// One state per section, in page order. Colours are plain sRGB hex (see "Libraries" for why).
// scale = size of the shapes (bigger = more, smaller shapes), warp = how much the flow folds over itself,
// irid = strength of the oil-slick colour shift on slopes, cam = [x, y, zoom] of the camera over the field.
const STATES = [
  { name: 'tide',  dark: '#06232B', mid: '#0F6B73', light: '#9FE3D2', scale: 1.6, warp: 1.6, irid: 0.10, cam: [0.0, 0.0, 1.0] },
  { name: 'dusk',  dark: '#1B1030', mid: '#6B2F6E', light: '#F0A58C', scale: 2.2, warp: 2.4, irid: 0.14, cam: [3.0, 1.0, 1.2] },
  { name: 'ember', dark: '#240A0A', mid: '#B03A14', light: '#FFB05C', scale: 1.3, warp: 3.0, irid: 0.06, cam: [-2.0, 4.0, 1.5] },
  { name: 'glass', dark: '#0B1A33', mid: '#2C5FA8', light: '#BFD7FF', scale: 2.8, warp: 1.2, irid: 0.18, cam: [5.0, -3.0, 1.0] },
  { name: 'moss',  dark: '#0E1F14', mid: '#3E7D4F', light: '#D6EBB0', scale: 1.8, warp: 2.0, irid: 0.08, cam: [1.0, 6.0, 0.9] },
];

const root = document.documentElement;
const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let reduce = reduceQuery.matches;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
STATES.forEach((s) => { s.rgb = { dark: hexToRgb(s.dark), mid: hexToRgb(s.mid), light: hexToRgb(s.light) }; });
```

### Shared part B: the shader (GLSL)
This is a complete, working fragment shader. It lives as two template strings in `script.js`; three.js adds the boilerplate and the uniforms declared in the object in part C.
```js
const VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);   // one big triangle covers the screen
  }`;

const FRAG = /* glsl */`
  uniform float uTime;         // seconds of flow (already multiplied by CONFIG.speed, frozen when paused)
  uniform vec2  uResolution;   // size of the painted canvas in pixels
  uniform float uScroll;       // 0 at the top of the page, 1 at the bottom
  uniform vec2  uPointer;      // mouse position, 0..1, origin bottom-left
  uniform float uPointerAmt;   // 0 = no disturbance, 1 = full
  uniform float uIntro;        // 0 to 1 while the world wakes up at page load
  uniform vec3  uCam;          // camera over the field: x, y, zoom
  uniform float uScale, uWarp, uIrid;
  uniform vec3  uDark, uMid, uLight;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {                                   // smooth value noise
    vec2 i = floor(p), f = fract(p);
    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {                                     // layers of noise, each finer and fainter
    float sum = 0.0, amp = 0.5;
    mat2 turn = mat2(0.8, -0.6, 0.6, 0.8);                // turn each layer so no grid lines show
    for (int i = 0; i < OCTAVES; i++) {                   // OCTAVES is 3 or 4, never a big loop
      sum += amp * noise(p);
      p = turn * p * 2.03 + 17.1;
      amp *= 0.5;
    }
    return sum;
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 s = (vUv - 0.5) * vec2(aspect, 1.0);             // screen space: height is 1, centre is 0

    // The pointer pulls the space around it a little, like a finger pressed under a cloth.
    vec2 m = (uPointer - 0.5) * vec2(aspect, 1.0);
    vec2 d = s - m;
    s -= d * exp(-dot(d, d) * 10.0) * uPointerAmt * 0.45;

    vec2 p = s * uScale / uCam.z + uCam.xy;               // where on the field this pixel looks
    float t = uTime;
    float w = uWarp * mix(0.25, 1.0, uIntro);             // the folds grow while the world wakes up

    // Domain warping: noise that bends the coordinates of more noise. Five fbm calls in total.
    vec2 q = vec2(fbm(p + 0.20 * t), fbm(p + vec2(5.2, 1.3) - 0.16 * t));
    vec2 r = vec2(fbm(p + w * q + vec2(1.7, 9.2) + 0.12 * t),
                  fbm(p + w * q + vec2(8.3, 2.8) - 0.10 * t));
    float f = fbm(p + w * r);

    // Colour: dark to mid to light, picked by how "high" the field is here.
    float shade = clamp(f * f * 2.2 + 0.45 * length(q) - 0.15, 0.0, 1.0);
    vec3 col = mix(uDark, uMid, smoothstep(0.05, 0.7, shade));
    col = mix(col, uLight, smoothstep(0.6, 1.0, shade + 0.35 * (r.y - 0.5)) * 0.9);

    // Sheen: slopes that face the top-left catch light. dFdx/dFdy are free slopes from the GPU.
    vec2 g = vec2(dFdx(f), dFdy(f)) * uResolution.y * 0.012;
    float sheen = clamp(dot(g, vec2(-0.5, 0.7)) * 2.0, 0.0, 1.0);
    vec3 film = 0.5 + 0.5 * cos(6.2832 * (f * 1.5 + uScroll + vec3(0.0, 0.33, 0.67)));   // oil-slick hue
    col += film * sheen * uIrid + uLight * sheen * 0.10;

    col *= 1.0 - 0.4 * dot(s, s);                         // darker edges keep the eye in the middle
    col *= mix(0.55, 1.0, uIntro);                        // dim until the world has woken up
    col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;         // a speck of dither stops colour banding
    gl_FragColor = vec4(col, 1.0);
  }`;
```

### Shared part C: the engine (load, size, loop, stop, fall back)
Failure handling is part of the design. `import()` fails (offline, blocked, wrong URL), WebGL is missing, the shader does not compile, or the graphics context is lost: every one of these ends in `stopWorld()`, which frees everything made so far and leaves the CSS gradient behind (the `body` background in the CSS above). The page, the nav and the content keep working in all of those cases, and the pause button stays hidden because there is nothing to pause. three.js writes its own console message when WebGL cannot start; that is expected. When WebGL itself is missing, three.js also logs two or three `console.error` lines ("WebGL context could not be created"); that is expected in that one case and not a bug in your code.
```js
// The three.js part is loaded with import(), so a failed download only loses the shader, never the page.
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js';
const INTRO_SECONDS = 2.4;
let THREE = null, world = false;
let renderer, scene, camera, geometry, material, uniforms, canvas;
let frame = 0, lastDraw = 0, age = 0, time = 14;   // time starts mid-flow so the first picture is already pretty
let pos = 0, target = 0;                            // where the world is, and where scrolling says it should be
let userPaused = false, quality = CONFIG.quality, sizeW = 0, sizeH = 0, slow = 0;

const isRunning = () => !reduce && !userPaused && !document.hidden;   // is the field allowed to flow?

async function startWorld() {
  try {
    THREE = await import(THREE_URL);
    // Phones and small windows: fewer noise layers and fewer pixels.
    const small = Math.min(window.innerWidth, window.innerHeight) < 600;
    if (small) quality = Math.min(quality, 0.5);
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'low-power' });
    canvas = renderer.domElement;
    canvas.className = 'world';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.addEventListener('webglcontextlost', (event) => { event.preventDefault(); stopWorld(); });
    document.body.prepend(canvas);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
    uniforms = {
      uTime: { value: 0 }, uResolution: { value: new THREE.Vector2(1, 1) }, uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) }, uPointerAmt: { value: 0 }, uIntro: { value: reduce ? 1 : 0 },
      uCam: { value: new THREE.Vector3(0, 0, 1) }, uScale: { value: 1.6 }, uWarp: { value: 1.6 }, uIrid: { value: 0.1 },
      uDark: { value: new THREE.Vector3() }, uMid: { value: new THREE.Vector3() }, uLight: { value: new THREE.Vector3() },
    };
    material = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms,
      defines: { OCTAVES: small ? 3 : CONFIG.detail },
      depthTest: false, depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene = new THREE.Scene();
    scene.add(mesh);
    camera = new THREE.Camera();

    world = true;
    resize(true);
    render();
    // A shader that fails to compile does not throw; three.js records it. Check, then fall back.
    if (renderer.info.programs.some((program) => program.diagnostics)) throw new Error('The background shader did not compile.');
    root.classList.add('has-world');
    if (toggle) toggle.hidden = reduce;
    wake();
  } catch (error) {
    console.warn('Background shader unavailable, showing the CSS background instead.', error);
    stopWorld();
  }
}

function stopWorld() {            // used for every failure, and frees everything we made
  world = false;
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  if (geometry) geometry.dispose();
  if (material) material.dispose();
  if (renderer) renderer.dispose();
  if (canvas) canvas.remove();
  root.classList.remove('has-world');
  if (toggle) toggle.hidden = true;
}

function resize(force) {
  const w = window.innerWidth, h = window.innerHeight;
  if (!force && w === sizeW && Math.abs(h - sizeH) < 160) return;   // phone toolbars sliding in and out change the height; ignore that
  sizeW = w; sizeH = h;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio) * quality);
  renderer.setSize(w, h, false);                                     // false: CSS keeps the canvas full screen
  renderer.getDrawingBufferSize(uniforms.uResolution.value);
  wake();                                                            // resizing clears the canvas, so paint again
}

function wake() {                 // ask for at least one more frame; the loop stops by itself when nothing changes
  if (frame || !world || document.hidden) return;
  frame = requestAnimationFrame(tick);
}

function tick(now) {
  frame = 0;
  if (!world || document.hidden) return;
  const live = isRunning();
  if (live && now - lastDraw < 1000 / CONFIG.maxFps - 4) { frame = requestAnimationFrame(tick); return; }
  const dt = Math.min((now - lastDraw) / 1000, 0.1);
  lastDraw = now;
  age += dt;
  if (live) time += dt * CONFIG.speed;
  pos += (target - pos) * (1 - Math.exp(-dt * 2.5));                // the world glides to where the page says (no overshoot)
  if (Math.abs(target - pos) < 0.004) pos = target;
  followPointer(dt);
  uniforms.uIntro.value = reduce ? 1 : 1 - Math.pow(1 - clamp(age / INTRO_SECONDS, 0, 1), 3);   // page load: the world wakes up
  render();
  watchSpeed(dt, live);
  const settling = pos !== target || pointer.amt !== pointer.goal || (!reduce && age < INTRO_SECONDS);
  if ((live || settling) && !frame) frame = requestAnimationFrame(tick);   // paused and settled: no more frames
}

function render() {
  uniforms.uTime.value = time;
  applyWorld(pos);
  renderer.render(scene, camera);
}

// If the machine is struggling for a while, paint fewer pixels. Never ask the student to do this by hand.
function watchSpeed(dt, live) {
  if (!live || age < 3) return;
  slow = dt > 0.05 ? slow + 1 : Math.max(0, slow - 1);
  if (slow > 24 && quality > 0.3) { quality *= 0.8; slow = 0; resize(true); }
}
```
Why the loop is written this way: `wake()` asks for one more frame, and the loop continues only while something is changing (the field is flowing, the world is still gliding, the pointer push is fading, or the intro is running). A paused page, a hidden tab and a reduced-motion page each paint one frame and then run no loop at all. The canvas is fixed and always on screen, so hidden tabs (`document.hidden`) are the only off-screen case. `resize()` ignores small height changes (phone address bars sliding) so scrolling on a phone never reallocates the canvas.

### 1. Page load: the world wakes up
The glass panel is there at once. The canvas fades in over about 1.2 seconds once the first frame is painted (until then the CSS gradient shows), the shader's folds grow from nearly still to full over 2.4 seconds (`uIntro`, in the loop), and the hero words rise a little. All the text is in the HTML from the start. Under reduced motion none of this animates.
```css
/* Page load: the glass fades in, then the words rise a little. The words are in the HTML the whole time. */
@keyframes rise { from { opacity: 0; transform: translateY(0.75rem); } }
.hero-panel > * { animation: rise 700ms var(--ease-drift) both; }
.hero-panel > h1 { animation-delay: 150ms; }
.hero-panel > .hero-intro { animation-delay: 300ms; }
```
The canvas rules (`.world` with `opacity: 0`, and `.has-world .world { opacity: 1 }`) are in the base CSS above. `script.js` adds `has-world` only after a frame has really been painted.

### 2. Scroll: the camera drifts, the panel edges catch the light
Scrolling is native and untouched: scrollbar, keyboard, find-in-page and anchor links all work. The script only reads the position (passive listener) and turns it into "how far along the sections are we" (`pos`, for example 2.4). The world then glides to that value instead of snapping to it, so a long jump through the page still looks like a smooth journey. The camera also drifts a little for every bit of progress (`uCam` y), and the thin top edge of every panel takes the current light colour through the CSS variable `--world`.
```js
const sections = [...document.querySelectorAll('main section[id]')];
let anchors = [], tops = [], maxScroll = 0;

function measure() {              // runs on load, on resize and whenever the page height changes (fonts, wrapping)
  const vh = window.innerHeight;
  maxScroll = Math.max(0, root.scrollHeight - vh);
  tops = sections.map((section) => section.getBoundingClientRect().top + window.scrollY);   // also used by the nav
  // A section's own state is fully reached when its top edge is a little below the top of the screen,
  // so a nav jump (which puts the section at the top) always lands in the right state.
  anchors = tops.map((top) => clamp(top - vh * 0.2, 0, maxScroll));
  if (anchors.length) anchors[0] = 0;
  readScroll();
}

function readScroll() {           // turns scroll position into "how far along the sections are we", e.g. 2.4
  let p = 0;
  const n = anchors.length, y = window.scrollY;
  if (n > 1 && y >= maxScroll - 2) p = n - 1;                        // the very bottom is always the last state
  else if (n > 1) {
    let i = 0;
    while (i < n - 2 && y >= anchors[i + 1]) i++;
    const span = anchors[i + 1] - anchors[i];
    p = i + (span > 0 ? clamp((y - anchors[i]) / span, 0, 1) : 1);
  }
  target = reduce ? 0 : p;                                           // reduced motion: the world stays in its first state
  wake();
}

window.addEventListener('scroll', readScroll, { passive: true });
window.addEventListener('resize', () => { if (world) resize(false); measure(); });
if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
```
At the very bottom of the page the last state is always shown, even if the last section is short.

### 3. Hover and focus: a gold edge on real links, a soft push from the mouse
Only a panel that holds a real link reacts: its edge ring fades in, it lifts 2px, and the link is stretched over the whole panel so the click area matches. Keyboard focus draws a thicker ring inside the card. Panels with no link stay still and keep the normal cursor. The mouse also pushes the shader's space gently, like a finger under a cloth. This is mouse only: touch and pen never push, a paused page ignores the mouse, and the push fades out about 1.5 seconds after the mouse rests.
```css
/* Hover and focus: only a panel that holds a real link reacts. The link is stretched over the whole panel. */
.project a { display: inline-flex; align-items: center; min-height: 44px; color: var(--color-text); text-decoration-thickness: 1px; }
.project a::after { content: ""; position: absolute; inset: 0; }
.project:has(a) { transition: transform 220ms var(--ease-drift); }
.project:has(a)::after { transition: opacity 220ms var(--ease-drift); }
.project:has(a:focus-visible) { transform: translateY(-2px); }
.project:has(a:focus-visible)::after { opacity: 1; border-width: 2px; inset: 0; }   /* a thicker ring drawn inside the card, so nothing clips it */
@media (hover: hover) {                       /* touch screens have no hover, so a tap never leaves a stuck highlight */
  .project:has(a:hover) { transform: translateY(-2px); }
  .project:has(a:hover)::after { opacity: 1; }
}
```
```js
const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, amt: 0, goal: 0 };
let pointerIdle = 0;

function followPointer(dt) {      // called by tick(): ease toward the real pointer, fade the push in and out
  pointer.x += (pointer.tx - pointer.x) * (1 - Math.exp(-dt * 8));
  pointer.y += (pointer.ty - pointer.y) * (1 - Math.exp(-dt * 8));
  pointer.amt += (pointer.goal - pointer.amt) * (1 - Math.exp(-dt * 4));
  if (Math.abs(pointer.goal - pointer.amt) < 0.003) pointer.amt = pointer.goal;
  uniforms.uPointer.value.set(pointer.x, pointer.y);
  uniforms.uPointerAmt.value = pointer.amt;
}

if (CONFIG.pointer && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' || !isRunning()) return;       // mouse only, and not while paused
    pointer.tx = event.clientX / window.innerWidth;
    pointer.ty = 1 - event.clientY / window.innerHeight;
    pointer.goal = 1;
    clearTimeout(pointerIdle);
    pointerIdle = setTimeout(() => { pointer.goal = 0; wake(); }, 1500);   // fade the push out when the mouse rests
    wake();
  }, { passive: true });
  root.addEventListener('pointerleave', () => { pointer.goal = 0; wake(); });
}
```
Other focus rings are the gold outline from the base CSS; the header draws its ring inside the link so the screen edge never clips it. A browser without `:has()` simply skips the card ring and keeps the normal link outline.

### 4. Navigation: the world travels
Links jump instantly (leave `scroll-behavior` as `auto`). The world is what travels: after a jump the shader glides through the states in between over about a second, and the panels of the landed section pulse their edge once. The current nav link follows the section under a line 40% down the screen. The next code keeps the jumped-to link selected until the visitor scrolls on their own (wheel, touch, scroll keys, Tab, or dragging the scrollbar away), because a jump to a short section, or a jump when the page cannot scroll any further, would otherwise highlight the wrong link. It also measures the header so `scroll-margin-top` never lets a heading land under it.
```css
/* Navigation: after a jump the target panel's edge glows once, then fades. Not a flash: 1.1 seconds, one pulse. */
@keyframes land { from { opacity: 0.9; } to { opacity: 0; } }
/* section:target .panel::after is more specific than .panel::after, so the animation is not cancelled. */
section:target .panel::after { animation: land 1100ms var(--ease-drift); }   /* no fill-mode: a finished animation must not keep overriding the hover ring */
```
```js
const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.site-header nav a')];
function currentId() {            // the section under a line 40% down the screen; the last one at the very bottom
  const last = sections[sections.length - 1];
  if (!last) return '';
  if (window.innerHeight + window.scrollY >= root.scrollHeight - 2) return last.id;
  const line = window.scrollY + window.innerHeight * 0.4;
  let id = sections[0].id;
  tops.forEach((top, i) => { if (top <= line) id = sections[i].id; });
  return id;
}
// After a nav jump, keep the jumped-to link current until the visitor scrolls on their own. Without this, a jump to
// a short section selects the one after it, and a jump that cannot move the page (already at the bottom) changes nothing.
let jumpedTo = '', jumpSeen = false;
function selectLink(id) {
  id = jumpedTo || id;
  navLinks.forEach((link) => {
    // setAttribute, not toggleAttribute: aria-current="" counts as false for screen readers.
    if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function releaseJump() { jumpedTo = ''; selectLink(currentId()); }
document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', () => {
  const dest = document.getElementById(a.hash.slice(1));
  if (dest && dest.matches('main section[id]')) { jumpedTo = dest.id; jumpSeen = false; selectLink(dest.id); }
}));
['wheel', 'touchmove'].forEach((name) => window.addEventListener(name, () => { if (jumpedTo) releaseJump(); }, { passive: true }));
window.addEventListener('keydown', (event) => {
  if (jumpedTo && ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Tab'].includes(event.key)) releaseJump();
});
window.addEventListener('scroll', () => {
  if (jumpedTo) {                                  // a scrollbar drag: release once the target was on screen and has left it
    const box = document.getElementById(jumpedTo).getBoundingClientRect();
    if (box.bottom > header.offsetHeight && box.top < window.innerHeight) jumpSeen = true;   // visible below the header
    else if (jumpSeen) releaseJump();
  }
  selectLink(currentId());
}, { passive: true });

// Header height changes with wrapping; scroll-margin-top uses it so a jump never lands under the bar.
if (header && 'ResizeObserver' in window) {
  new ResizeObserver(() => root.style.setProperty('--header-h', header.offsetHeight + 'px')).observe(header);
}
```

### 5. Signature: one world, five moods
Every section has its own state in `STATES` (colours, size of shapes, amount of folding, iridescence, camera). `applyWorld()` blends the two neighbouring states by the smoothed fractional position and writes the result into the uniforms every frame, so colours, folds and camera all change together and no change is ever a jump. Each state rests for a moment, then eases to the next. States map to sections in page order; with more sections than states they repeat, with fewer the extra states are unused. Keep at least two states. This is the part people remember: scroll slowly and watch teal become plum, then copper, then ice, then moss, with the same flowing field all the way through.
```js
// Blend the two neighbouring states by how far along we are (pos = 2.4 means 40% of the way from state 2 to state 3).
function mixInto(vec, a, b, t) { vec.set(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)); }
let lastEdge = -1;

function applyWorld(p) {
  const n = STATES.length, i = Math.floor(p), t = smooth(p - i);   // smooth(): each state rests a moment, then eases to the next
  const a = STATES[i % n], b = STATES[(i + 1) % n];
  mixInto(uniforms.uDark.value, a.rgb.dark, b.rgb.dark, t);
  mixInto(uniforms.uMid.value, a.rgb.mid, b.rgb.mid, t);
  mixInto(uniforms.uLight.value, a.rgb.light, b.rgb.light, t);
  uniforms.uScale.value = lerp(a.scale, b.scale, t);
  uniforms.uWarp.value = lerp(a.warp, b.warp, t);
  uniforms.uIrid.value = lerp(a.irid, b.irid, t);
  uniforms.uCam.value.set(lerp(a.cam[0], b.cam[0], t), lerp(a.cam[1], b.cam[1], t) + p * 0.35, lerp(a.cam[2], b.cam[2], t));
  uniforms.uScroll.value = p / Math.max(1, anchors.length - 1);
  if (Math.abs(p - lastEdge) > 0.01) {                              // hand the light colour to CSS so panel edges pick it up
    lastEdge = p;
    const light = uniforms.uLight.value;
    root.style.setProperty('--world', `rgb(${Math.round(light.x * 255)} ${Math.round(light.y * 255)} ${Math.round(light.z * 255)})`);
  }
}
```

### Controls, visibility and boot
The pause button, hidden-tab handling, a live reaction to the reduced-motion setting, and the boot lines. A paused page still moves to a new mood when you scroll, because that is your own input, but the field itself stands still and the mouse push is off. The choice is remembered in `localStorage` as a convenience only (the page works the same when storage is blocked).
```js
const toggle = document.querySelector('.world-toggle');
function setPaused(value) {
  userPaused = value;
  if (toggle) toggle.textContent = value ? 'Play background' : 'Pause background';
  try { localStorage.setItem('world-paused', value ? '1' : '0'); } catch (error) { /* storage can be blocked; fine */ }
  wake();
}
if (toggle) toggle.addEventListener('click', () => setPaused(!userPaused));
try { if (localStorage.getItem('world-paused') === '1') setPaused(true); } catch (error) { /* ignore */ }

document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });   // hidden tab: the loop ends on its own
reduceQuery.addEventListener('change', () => {
  reduce = reduceQuery.matches;
  if (toggle && world) toggle.hidden = reduce;
  readScroll();
  wake();
});
measure();
selectLink(currentId());
startWorld();
```

## Reduced motion
A still, designed picture. `reduce` is read at load and watched for changes. With reduced motion: the field is painted once, mid-flow, in the first state (`target` stays 0, so scrolling never changes it), there is no loop, no camera drift, no mouse push, no intro, and no fade of the canvas. The pause button is hidden because nothing moves. Resizing still repaints that one frame.
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .project:has(a:hover), .project:has(a:focus-visible) { transform: none; }
}
```
Nothing starts hidden by a non-animation property: the hero words only hide inside their animation, and the canvas fade is a transition, so removing animation and transition shows everything.

## Libraries
This vibe is the one place AGENTS.md's "no libraries" rule is waived, and only because the student chose a frontier vibe. Say so to the student in one sentence, and say what it costs.
- **three.js 0.180.0**, MIT licence, loaded from jsDelivr by `import()` in `script.js`: `https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js` (about 340 KB), which loads `three.core.min.js` (about 380 KB) from the same folder. Together about 180 KB gzipped (a bit less with brotli, which jsDelivr uses). It is cached after the first visit. On a phone expect a short pause while the code is parsed before the world fades in; the page content is already readable by then because the import starts after the HTML has loaded and never blocks it. No other library. No GSAP, no Lenis.
- **Why three.js for one full-screen shader:** it creates the WebGL context, handles pixel ratio, resizing, uniforms and disposal, and the same scene can later hold a real mesh (a displaced plane, an iridescent blob) if the student wants to grow it. A student who wants zero library weight can swap `startWorld()` for a few dozen lines of raw WebGL; the GLSL, the states and everything else stay the same.
- **Colours are plain numbers.** `STATES` colours go to the shader as raw sRGB `Vector3` values on purpose. `THREE.Color('#0F6B73')` would silently convert them to linear light and the whole palette would look washed out.
- **If the student later adds addons** (for example `three/addons/controls/OrbitControls.js`), add an import map before any module and import those with the bare name `three`: `<script type="importmap">{ "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js", "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/" } }</script>`. The main path does not need it.
- **With a build step (optional, later):** Vite, `npm install three@0.180.0`, `import * as THREE from 'three'`, and the two GLSL strings can move into `.glsl` files imported with `?raw`. Nothing else changes. That breaks the project's no-build rule, so only on the student's explicit request, and Firebase would then serve `dist` instead of `public`.
- **Assets:** none. The world is procedural, there is nothing to download. If the student ever wants a texture or model, use only CC0 sources (Poly Haven, ambientCG, Kenney), credit them anyway, and keep it optional.
- **Fallbacks, in order:** the CSS `body` gradient (always there); `import()` failing or no WebGL: `stopWorld()` and the gradient stay; shader compile error: caught by the diagnostics check after the first frame; context lost later: `stopWorld()`. In every case content, nav and links work, and only the pause button is hidden.

## Avoid
- Text, headings or links drawn inside the canvas. All text is HTML.
- Text straight on the shader, or panels so transparent that contrast depends on what the field is doing. Check contrast against white behind the panel, as above.
- Anything flashing, strobing or quickly pulsing, and any fast, busy or high-contrast field. Calm is the point: keep `CONFIG.speed` low and the pulses single and over a second long.
- Post-processing chains (bloom, blur passes, render targets), particle systems, many lights or heavy meshes. One pass, one triangle.
- A render loop that never stops, `setInterval` for rendering, or reading and writing layout inside the loop.
- Taking over scrolling: no Lenis, no snap, no pinned sections, no wheel hijacking, no scroll-linked camera moves under reduced motion.
- Fake technical decoration: shader code on the page, uniform readouts, FPS counters, "WebGL 2" badges, coordinates. They are invented content and they carry no information.
- One purple-to-pink gradient in every state, or a glowing neon accent. Keep the moods different and the accent single.
- Generic page habits: a "→" after every link, "A · B · C" strings, numbering projects 01 / 02 / 03, one headline word picked out in the accent, an ALL-CAPS label above every heading, a fade-up on every section, the same soft card shadow everywhere, Inter on everything.
- Hiding content until JavaScript or the library has loaded.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
