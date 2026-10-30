---
name: vibe-3d-room
description: Restyles the portfolio site as a small, warm, low-poly 3D room that a camera glides through as you scroll, one stop per section (look, layout and motion). Use ONLY when the student names the vibe-3d-room skill or asks for the 3D Room vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: frontier
  tags: "design-art, cs, engineering"
  intensity: frontier
  version: "2"
---

# Vibe: 3D Room

## Feel and who it's for
A tiny stylised room, like a dollhouse or a desk-toy diorama, built from boxes and cylinders and lit softly. It is the student's studio: a desk, a chair on a rug, a shelf on the wall, a window. A camera rides on a rail through the room as the visitor scrolls, and each section of the page is a stop on that rail: the desk for projects, the shelf for skills, the window for contact. The text always sits in solid, readable panels beside or below the scene; the room is decoration. Good for design, digital media and graphics-curious CS or engineering students who want their site to show "I think in space". This is a take-home frontier vibe for strong agents: it uses a library (three.js), so read the Libraries section first.

## Must keep (this is what makes it 3D Room)
1. A real-time 3D room made only of simple geometry (boxes, cylinders, planes), flat-shaded, warm and softly lit. Toy-like, tidy, not cluttered.
2. The camera moves on a smooth rail (a spline through one pose per section), driven by scroll and damped. No free orbit controls: they fight scrolling.
3. The furniture at the current stop gets a subtle highlight. Nav links jump the camera to the matching stop.
4. All text lives in real HTML in solid panels. The canvas is `aria-hidden` decoration and never holds content. Every object carries meaning: one desk item per real project, one shelf block per real skill.
5. A designed fallback (a still SVG room plus normal content) when WebGL, the library, or motion is unavailable.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the walls pink" or "make it night". Their request wins.

Palette, in words: a deep dusk-blue page behind the room; sage-mint walls; birch floor; pale wood furniture; a teal chair on a soft blue rug; a few toy-bright accents (mustard, sky blue, rose, leaf green, lilac) used only for the shelf blocks and project objects. Panels are solid warm white with slate ink. The teal accent is for links on panels; the amber is the "light in the room" and appears only on the dark header (current link, focus ring).

```css
/* Contrast, computed (WCAG): text #1C2630 on panel #F8F5EE 14.1:1; muted #45525E on panel 7.4:1;
   accent #1A6560 on panel 6.3:1; text on chip #E2EEEA 12.9:1; muted on chip 6.7:1; accent on chip 5.7:1;
   panel colour on an accent fill (link hover) 6.3:1; header text #F3EFE6 on dusk #1F2D3A 12.2:1;
   muted-on-dark #B8C5CF on dusk 8.0:1; amber #F2B84B on dusk 7.9:1. Amber on the panel is only 1.6:1,
   so amber never touches a panel: panels set --color-focus to the accent instead. */
:root {
  --color-bg: #1F2D3A;          /* dusk behind the room, header, page background */
  --color-panel: #F8F5EE;       /* solid text panels */
  --color-chip: #E2EEEA;        /* skill chips inside panels */
  --color-text: #1C2630;
  --color-muted: #45525E;
  --color-accent: #1A6560;      /* links on panels */
  --color-on-dark: #F3EFE6;
  --color-muted-dark: #B8C5CF;
  --color-amber: #F2B84B;       /* current nav link, focus ring on the dark header */
  --color-border: #8C8573;      /* lines only, never text (3.4:1 on the panel) */
  --color-focus: var(--color-amber);
  --font-display: "Bricolage Grotesque", "Trebuchet MS", system-ui, sans-serif;
  --font-body: "Nunito Sans", system-ui, sans-serif;
  --ease-ui: cubic-bezier(0.3, 0.8, 0.3, 1);   /* only for small UI changes; the camera uses damping, see below */
  --header-h: 3.25rem;
  --stage-h: clamp(9.5rem, 36svh, 20rem);       /* height of the room band on phones */
  --gutter: 1rem;
  --panel-pad: clamp(1rem, 4vw, 2rem);
}
```
Room colours live in the `COLORS` object in script.js (see "The room"): sage `#BFD8D0`, side wall `#AECBC2`, birch `#D9A76B`, wood `#F0D9B5`, teal `#3E7C77`, rug `#8FB4D9`.

Fonts: Bricolage Grotesque for headings (friendly, a little quirky, variable weight) and Nunito Sans for body. Alternatives: Sora or Lexend for headings. Avoid Fredoka (it belongs to the Soft Pastel vibe).
`<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=Nunito+Sans:wght@400;700&display=swap" rel="stylesheet">`

Spacing and sizes are your call (use your project's spacing scale). Panel corners get a small radius; the room itself is all hard low-poly edges.

## Layout ideas
- **Phones and tablets (under 1000px):** a solid header with the five links (each at least 44px tall), then the room as a fixed band under it (`--stage-h`), then the content scrolling beneath the band. The band stays on screen; text never sits on top of the 3D picture. At 320px the five links fit on one row with small side padding and `0.875rem` text; hide the name in the header on phones.
- **Desktop (1000px and up):** the room fills the screen behind everything. Solid panels sit in a left column, and the camera's view is shifted so the room is centred in the free area to the right of the panel. The header is a solid dusk bar.
- **Sections:** each section is at least one screen tall and holds one `.panel`. Home: name and one-line intro. About: the real bio. Projects: one block per real project (title is the link only if SPEC.md has a link for it). Skills: the real skills as chips. Contact: the real links, one per line.
- **Footer:** omit it, or a plain "Back to top" link. No year, no slogan. If the student used a CC0 model, one plain credit line is allowed (see Libraries).
- **Section to stop mapping (default):** Home = the whole room from a high corner; About = the chair on the rug; Projects = the desk; Skills = the wall shelf; Contact = the window. A section that SPEC.md does not have simply has no stop.

### HTML skeleton
Section ids are the rail's keys, so keep `home, about, projects, skills, contact`. Include only sections SPEC.md has.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The student's name from SPEC.md</title>
  <!-- fonts link from above -->
  <!-- The import map lets script.js say import('three'). Pinned versions only. -->
  <script type="importmap">
  { "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/"
  } }
  </script>
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="site-name" href="#home">The student's name from SPEC.md</a>
    <nav class="site-nav" aria-label="Sections">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Decoration only. The still SVG shows first and whenever 3D is unavailable; script.js adds the canvas. -->
  <div class="stage" aria-hidden="true">
    <svg class="room-still" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet" focusable="false">
      <polygon class="still-wall" points="120,70 680,70 680,300 120,300"/>
      <polygon class="still-side" points="40,30 120,70 120,300 40,420"/>
      <polygon class="still-floor" points="120,300 680,300 770,430 40,430"/>
      <ellipse class="still-rug" cx="440" cy="368" rx="150" ry="34"/>
      <rect class="still-sky" x="500" y="105" width="130" height="95"/>
      <path class="still-frame" d="M500 105h130v95H500zM565 105v95M500 152h130" fill="none"/>
      <polygon class="still-wood" points="190,232 450,232 450,246 190,246"/>
      <rect class="still-leg" x="198" y="246" width="10" height="64"/>
      <rect class="still-wood" x="400" y="246" width="50" height="64"/>
      <rect class="still-block1" x="260" y="206" width="38" height="26"/>
      <rect class="still-block2" x="322" y="194" width="22" height="38"/>
      <rect class="still-seat" x="500" y="318" width="70" height="14"/>
      <rect class="still-seat" x="500" y="280" width="70" height="38"/>
      <polygon class="still-wood" points="58,160 118,176 118,184 58,168"/>
      <rect class="still-block3" x="72" y="142" width="14" height="22"/>
      <rect class="still-block4" x="92" y="148" width="14" height="16"/>
    </svg>
  </div>

  <main id="main">
    <section id="home" class="scene-section" aria-labelledby="home-title">
      <div class="panel panel-hero">
        <h1 id="home-title">The student's name from SPEC.md</h1>
        <p>The one-line intro from SPEC.md.</p>
      </div>
    </section>
    <section id="about" class="scene-section" aria-labelledby="about-title">
      <div class="panel"><h2 id="about-title">About</h2><p>The real bio from SPEC.md.</p></div>
    </section>
    <section id="projects" class="scene-section" aria-labelledby="projects-title">
      <div class="panel">
        <h2 id="projects-title">Projects</h2>
        <ul class="project-list">
          <li class="project">
            <!-- A link only if SPEC.md has one for this project; otherwise a plain h3 with no <a>. -->
            <h3><a class="project-link" href="https://example.com/the-link-from-SPEC">Project name from SPEC.md</a></h3>
            <p>The one-sentence description from SPEC.md.</p>
          </li>
        </ul>
      </div>
    </section>
    <section id="skills" class="scene-section" aria-labelledby="skills-title">
      <div class="panel"><h2 id="skills-title">Skills</h2><ul class="chips"><li>A real skill from SPEC.md</li></ul></div>
    </section>
    <section id="contact" class="scene-section" aria-labelledby="contact-title">
      <div class="panel">
        <h2 id="contact-title">Contact</h2>
        <ul class="contact-list">
          <li><a href="mailto:the-email@from-SPEC">the-email@from-SPEC</a></li>
          <li><a href="https://example.com/link-from-SPEC">LinkedIn</a></li> <!-- use SPEC's label -->
        </ul>
      </div>
    </section>
  </main>
</body>
</html>
```
The visible link text for a bare URL is the label SPEC.md gives next to it (for example "LinkedIn"). Project order in the HTML is the order of the desk objects.

### CSS: base, layout, panels
```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: auto; -webkit-text-size-adjust: 100%; } /* the camera supplies the glide; keep jumps instant */
body { margin: 0; background: var(--color-bg); color: var(--color-on-dark); font: 400 1rem/1.6 var(--font-body); }
h1, h2, h3, p, ul { margin: 0; }
ul { padding: 0; list-style: none; }
.skip-link { position: fixed; left: 0.5rem; top: -4rem; z-index: 5; padding: 0.75rem 1rem; background: var(--color-panel); color: var(--color-text); }
.skip-link:focus { top: 0.5rem; outline: 3px solid var(--color-amber); }

.site-header { position: fixed; inset: 0 0 auto 0; z-index: 3; height: var(--header-h); display: flex; align-items: center;
  justify-content: space-between; gap: 0.5rem; padding-inline: 0.5rem; background: var(--color-bg); border-bottom: 1px solid #3A4C5C; }
.site-name { display: none; color: var(--color-on-dark); font: 800 1.125rem var(--font-display); text-decoration: none; }
.site-name:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 2px; }
.site-nav ul { display: flex; }
.site-nav a { display: inline-flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; padding-inline: 0.4rem;
  color: var(--color-on-dark); font: 700 0.875rem var(--font-body); text-decoration: none; border-bottom: 3px solid transparent; transition: color 160ms var(--ease-ui); }
.site-nav a:hover { color: var(--color-amber); }
.site-nav a[aria-current="location"] { border-bottom-color: var(--color-amber); } /* also say it in text for assistive tech: aria-current */
.site-nav a:focus-visible { outline: 3px solid var(--color-focus); outline-offset: -3px; } /* inside the box, so the screen edge never clips it */

.stage { position: fixed; z-index: 1; top: var(--header-h); left: 0; right: 0; height: var(--stage-h); overflow: hidden;
  background: linear-gradient(#2C4254, var(--color-bg)); }
.stage canvas, .room-still { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.has-3d .room-still { display: none; }
main { padding-top: calc(var(--header-h) + var(--stage-h)); }          /* the fixed header and band never cover content */
section[id] { scroll-margin-top: calc(var(--header-h) + var(--stage-h) + 0.5rem); } /* do not also add scroll-padding-top on html: it stacks with this and breaks the rail measurements */
.scene-section { min-height: calc(100svh - var(--header-h) - var(--stage-h)); padding: 1rem var(--gutter) 2rem; }

.panel { width: 100%; max-width: 34rem; padding: var(--panel-pad); border-radius: 10px; background: var(--color-panel);
  color: var(--color-text); --color-focus: var(--color-accent); }
.panel h1 { font: 800 clamp(2.25rem, 9vw, 3.75rem)/1.05 var(--font-display); overflow-wrap: anywhere; }
.panel h2 { font: 800 clamp(1.5rem, 5vw, 2.25rem)/1.1 var(--font-display); margin-bottom: 0.75rem; }
.panel h3 { font: 800 1.25rem/1.25 var(--font-display); }
.panel p { max-width: 60ch; }
.panel h1 + p { margin-top: 0.75rem; font-size: 1.125rem; }
.project { padding-block: 0.9rem; border-top: 1px solid var(--color-border); }
.project:first-child { padding-top: 0; border-top: 0; }
.project p { margin-top: 0.25rem; color: var(--color-muted); }
.chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.chips li { padding: 0.35rem 0.75rem; border-radius: 8px; background: var(--color-chip); color: var(--color-text); }
.contact-list { overflow-wrap: anywhere; font-size: 0.9375rem; } /* a real email fits one line at 320px */
.contact-list a { display: inline-flex; align-items: center; min-height: 44px; }

.panel a { color: var(--color-accent); text-decoration-thickness: 2px; text-underline-offset: 0.2em; transition: background 160ms var(--ease-ui), color 160ms var(--ease-ui); }
.panel a:hover { background: var(--color-accent); color: var(--color-panel); text-decoration-color: transparent; } /* 6.3:1 */
.panel a:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 2px; }
.project-link { display: inline-flex; align-items: center; min-height: 44px; }

@media (max-height: 480px) { :root { --stage-h: 28svh; } }
@media (min-width: 640px) { .site-name { display: block; } .site-nav a { padding-inline: 0.75rem; } }
@media (min-width: 1000px) {   /* desktop: the room is the whole background */
  .stage { top: 0; height: 100svh; z-index: 0; }
  .site-header { background: rgb(31 45 58 / 0.98); } /* reads as solid. Phones need it fully opaque (content scrolls under the bar); on desktop a 100% opaque bar over the canvas can leave a dark band in headless screenshots */
  main { position: relative; z-index: 1; padding-top: 0; }  /* without this the fixed stage would paint over the panels */
  section[id] { scroll-margin-top: calc(var(--header-h) + 0.5rem); }
  .room-still { inset: 0 0 0 auto; width: 62%; }   /* keep the still picture clear of the panel column */
  .scene-section { display: flex; align-items: center; min-height: 100svh; padding: calc(var(--header-h) + 1rem) 5vw 2rem; }
}
.still-wall { fill: #BFD8D0; } .still-side { fill: #AECBC2; } .still-floor { fill: #D9A76B; } .still-rug { fill: #8FB4D9; }
.still-sky { fill: #CFE8F5; } .still-frame { stroke: #F8F5EE; stroke-width: 6; } .still-wood { fill: #F0D9B5; } .still-leg { fill: #A5714B; }
.still-seat { fill: #3E7C77; } .still-block1 { fill: #E8B04A; } .still-block2 { fill: #6FA8DC; } .still-block3 { fill: #C95D63; } .still-block4 { fill: #7FB77E; }
```
The `.still-*` fills are the designed fallback picture: with JavaScript or WebGL off, the page shows a flat illustrated version of the same room, and the content is untouched.

### The room (script.js, part 1 and part 2)
All geometry is procedural. Helpers bake a colour into every vertex, so a whole piece of furniture merges into ONE mesh (one draw call) with one material.

```js
// script.js, part 1: shared setup (plain JavaScript; the page works with or without the room)
const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const small = window.matchMedia('(max-width: 760px), (pointer: coarse)');
const wide = window.matchMedia('(min-width: 1000px)');
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const sections = [...document.querySelectorAll('main > section[id]')];
const state = { active: null, wake() {} };   // the room replaces wake() once it exists
const room = { ready: false, lit: {}, blobs: [], projects: [] };  // everything 3D lives on this one object
```
```js
// script.js, part 2: the room, built from boxes and cylinders. Units are roughly metres; y is up, the camera looks toward -z.
const COLORS = { wall: '#BFD8D0', side: '#AECBC2', floor: '#D9A76B', base: '#EFE8DA', wood: '#F0D9B5', legs: '#A5714B',
  seat: '#3E7C77', rug: '#8FB4D9', sky: '#CFE8F5', frame: '#F8F5EE', mustard: '#E8B04A', paper: '#EFE9DB' };
const BLOCKS = ['#E8B04A', '#6FA8DC', '#C95D63', '#7FB77E', '#9B7EBD', '#E8E3D3'];

function paint(geometry, color) {            // bake one colour into every vertex
  const c = new room.THREE.Color(color), n = geometry.attributes.position.count, rgb = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) rgb.set([c.r, c.g, c.b], i * 3);
  geometry.setAttribute('color', new room.THREE.BufferAttribute(rgb, 3));
  return geometry;
}
function box(w, h, d, x, y, z, color) { const g = new room.THREE.BoxGeometry(w, h, d); g.translate(x, y, z); return paint(g, color); }
function cyl(rTop, rBottom, h, x, y, z, color, sides = 20) { const g = new room.THREE.CylinderGeometry(rTop, rBottom, h, sides); g.translate(x, y, z); return paint(g, color); }

// piece() merges parts into one mesh. options.light names the highlight group (a stop's "lights" list).
function piece(name, parts, options = {}) {
  const THREE = room.THREE;
  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, flatShading: true });
  material.userData.tint = material.color.clone();   // the resting colour; the highlight brightens it (see update())
  const mesh = new THREE.Mesh(room.mergeGeometries(parts), material);
  mesh.name = name;
  mesh.castShadow = mesh.receiveShadow = true;
  room.scene.add(mesh);
  if (options.light) (room.lit[options.light] ||= { amount: 0, mats: [] }).mats.push(material);
  return mesh;
}

function blob(w, d, x, y, z) {               // fake contact shadow: one soft dark disc, used when real shadows are off
  const THREE = room.THREE;
  if (!room.blobMaterial) {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 64;
    const g = canvas.getContext('2d'), grad = g.createRadialGradient(32, 32, 2, 32, 32, 32);
    grad.addColorStop(0, 'rgba(40,30,20,0.3)');   // soft, or blob shadows read as dark smudges grad.addColorStop(1, 'rgba(40,30,20,0)');
    g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
    const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace;
    room.blobMaterial = new THREE.MeshBasicMaterial({ map, transparent: true, depthWrite: false });
  }
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), room.blobMaterial);
  mesh.rotation.x = -Math.PI / 2; mesh.position.set(x, y, z); mesh.renderOrder = 1;
  room.scene.add(mesh); room.blobs.push(mesh);
}

// Small desk objects. One shape per real project, picked to match what SPEC.md says it is. No labels, no fake screens.
const SHAPES = {
  model: () => [box(0.62, 0.03, 0.62, 0, 0.015, 0, COLORS.paper), box(0.62, 0.22, 0.03, 0, 0.14, -0.295, '#FFFFFF'),
    box(0.03, 0.22, 0.62, -0.295, 0.14, 0, '#F6F1E6'), box(0.28, 0.22, 0.03, 0.15, 0.14, 0.05, '#FFFFFF')],   // a little foam-board model
  lamp: () => [cyl(0.14, 0.16, 0.04, 0, 0.02, 0, COLORS.seat), cyl(0.02, 0.02, 0.4, 0, 0.24, 0, COLORS.seat),
    cyl(0.09, 0.2, 0.24, 0, 0.56, 0, COLORS.mustard)],                                                         // an object or product
  board: () => [box(0.56, 0.4, 0.04, 0, 0.3, 0, '#C95D63'), box(0.5, 0.04, 0.2, 0, 0.02, 0.05, COLORS.legs)], // a poster, site or app
  stack: () => [box(0.5, 0.12, 0.4, 0, 0.06, 0, '#6FA8DC'), box(0.4, 0.12, 0.32, 0, 0.18, 0, '#7FB77E'), box(0.3, 0.12, 0.24, 0, 0.3, 0, '#9B7EBD')], // a collection
};
const SHAPE_ORDER = ['model', 'lamp', 'board', 'stack'];   // project i uses SHAPE_ORDER[i % 4]; reorder to match the real projects

function buildRoom() {
  const THREE = room.THREE, scene = room.scene, C = COLORS;
  // Lighting basics: a soft sky/ground fill so shadows are never black, plus ONE warm "sun" that casts the shadows.
  scene.add(new THREE.HemisphereLight('#FFFFFF', '#D9CDBA', 1.5));   // a near-white sky light keeps the mint walls mint, not olive
  const sun = new THREE.DirectionalLight('#FFF0D6', 2.0);
  sun.position.set(5, 9, 7);
  Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30 });
  sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.02;
  scene.add(sun); room.sun = sun;

  // Shell: floor slab and two walls (the front and right are left open, like a dollhouse).
  piece('shell', [box(8.6, 0.2, 6.6, 0, -0.4, 0, C.base), box(8, 0.3, 6, 0, -0.15, 0, C.floor),
    box(8.25, 4, 0.25, -0.125, 2, -3.125, C.wall), box(0.25, 4, 6.25, -4.125, 2, -0.125, C.side),
    box(8, 0.15, 0.05, 0, 0.075, -2.975, C.base), box(0.05, 0.15, 6, -3.975, 0.075, 0, C.base)]);
  // Desk against the back wall (stop: projects).
  piece('desk', [box(2.8, 0.1, 1.1, -0.7, 1, -2.35, C.wood), box(0.1, 0.95, 0.1, -1.95, 0.475, -2.75, C.legs),
    box(0.1, 0.95, 0.1, -1.95, 0.475, -1.95, C.legs), box(0.8, 0.95, 0.95, 0.3, 0.475, -2.35, C.wood)], { light: 'desk' });
  // Chair on a rug (stop: about).
  const chair = piece('chair', [box(0.7, 0.1, 0.7, 0, 0.55, 0, C.seat), box(0.7, 0.65, 0.1, 0, 0.95, -0.3, C.seat),
    ...[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([sx, sz]) => cyl(0.04, 0.04, 0.5, sx * 0.28, 0.25, sz * 0.28, C.legs, 10))], { light: 'chair' });
  chair.position.set(1.5, 0, -0.7); chair.rotation.y = 0.5;
  piece('rug', [cyl(1.4, 1.4, 0.04, 0.9, 0.02, -0.2, C.rug, 40)], { light: 'chair' });
  // Wall shelf (stop: skills): one block per real skill, five per board.
  const skillCount = Math.min(document.querySelectorAll('#skills li').length, 10), perBoard = 5;
  const boards = Math.max(1, Math.ceil(skillCount / perBoard)), shelf = [];
  for (let b = 0; b < boards; b++) shelf.push(box(0.5, 0.08, 3, -3.75, 1.5 + b * 0.9, 0.3, C.wood));
  for (let i = 0; i < skillCount; i++) {
    const b = Math.floor(i / perBoard), slot = i % perBoard, h = 0.35 + ((i * 7) % 4) * 0.12;
    shelf.push(box(0.36, h, 0.38, -3.75, 1.54 + b * 0.9 + h / 2, -1 + slot * 0.6, BLOCKS[i % BLOCKS.length]));
  }
  piece('shelf', shelf, { light: 'shelf' });
  // Window on the back wall (stop: contact).
  piece('window', [box(1.9, 0.12, 0.14, 2.3, 3.09, -2.93, C.frame), box(1.9, 0.12, 0.14, 2.3, 1.71, -2.93, C.frame),
    box(0.12, 1.5, 0.14, 1.41, 2.4, -2.93, C.frame), box(0.12, 1.5, 0.14, 3.19, 2.4, -2.93, C.frame),
    box(0.06, 1.5, 0.1, 2.3, 2.4, -2.94, C.frame), box(1.9, 0.06, 0.1, 2.3, 2.4, -2.94, C.frame), box(2.1, 0.08, 0.3, 2.3, 1.62, -2.85, C.frame)], { light: 'window' });
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.3), new THREE.MeshStandardMaterial({ color: C.sky, emissive: C.sky, emissiveIntensity: 0.12 }));   // low, or the highlight turns the glass bright cyan
  glass.material.userData.tint = glass.material.color.clone(); glass.position.set(2.3, 2.4, -2.995); scene.add(glass);
  (room.lit.window ||= { amount: 0, mats: [] }).mats.push(glass.material);
  // One object per real project, standing on the desk.
  const count = Math.min(document.querySelectorAll('#projects .project').length, 4);
  for (let i = 0; i < count; i++) {
    const x = count === 1 ? -0.7 : -1.7 + i * (2 / (count - 1));
    const mesh = piece('project-' + i, SHAPES[SHAPE_ORDER[i % SHAPE_ORDER.length]]());
    mesh.position.set(x, 1.05, -2.35);
    room.projects.push({ mesh, baseY: 1.05, lift: 0 });
    blob(0.8, 0.8, x, 1.056, -2.35);
  }
  blob(3.6, 2, -0.7, 0.01, -2.35); blob(1.2, 1.2, 1.5, 0.05, -0.7);
}
function disposeTree(object) {                // call this on anything you replace, or the GPU keeps its memory
  object.traverse((o) => {
    o.geometry?.dispose();
    for (const m of [].concat(o.material || [])) { for (const v of Object.values(m)) if (v?.isTexture) v.dispose(); m.dispose(); }
  });
  object.removeFromParent();
}
```

## Make it theirs
- The one loud thing is the camera rail. Everything else is quiet: panels are flat and solid, the room has no clutter, the highlight is subtle.
- **Ground the room in the student's SPEC.md.** One desk object per real project (their shape follows what the project is: a model, a product, a poster or site, a collection), one shelf block per real skill. Never add a poster, a screen with UI, a book with a title, a brand logo or a sign with invented words. Furniture is structure, but extra props (a plant, a poster) only appear if SPEC.md backs them up.
- If the student wants their name in 3D, TextGeometry (from `three/addons/geometries/TextGeometry.js`) may draw the same name that is in the `<h1>`, and nothing else. It is `aria-hidden` by living in the canvas, and the `<h1>` stays the real heading.
- **Teach while building** (the student is a beginner). Explain these in plain words as they appear: (1) the room is a list of boxes, each with a position and a size; (2) the camera rail is an array of points and look-at targets, one per section; (3) light is a soft fill plus one directional light; (4) the loop runs only while something moves.
- **Add a stop:** add a section to the HTML, then add one entry to `STOPS` keyed by that section's id (`pos` is where the camera stands, `look` is the point it stares at, `lights` names the furniture that brightens). Nothing else changes: the rail, the scroll mapping and the nav all read from `STOPS` and the sections.
- **Move a stop:** change its `pos` and `look` numbers (+x is right, +y is up, +z is toward the viewer). If an object sits too far left or right, nudge `look` by a few tenths.

## Motion character
Tempo: calm, one flight of about a second between stops, then stillness. Easing: exponential damping (the camera closes a fixed fraction of the remaining gap every frame, so it starts fast and settles softly) plus a small smoothstep so the camera lingers on each stop while the panel is read. Nothing bounces, nothing is stepped, nothing flashes. CSS is used only for colour changes (`--ease-ui`, 160ms) and one gentle panel arrival. The code is one `script.js`: put parts 1 and 2 (above) first, then every part below in the order it appears in this file. Functions are hoisted, so the order only matters for the `const` objects, and the last lines of part 9 start everything.

### 1. Page load: the camera dollies in
The room appears from a wider, higher viewpoint and the camera settles onto the Home stop over a second or two, while the hero panel arrives with a small rise. The panel is real HTML and is visible even if the animation or the library never runs.

```css
@keyframes arrive { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.panel-hero { animation: arrive 700ms var(--ease-ui) both; }
```
```js
// script.js, part 3: start the renderer. Everything here can fail; the page must survive any failure.
async function startRoom() {
  const stage = document.querySelector('.stage');
  if (!stage) return;
  try {
    const probe = document.createElement('canvas');                // check for WebGL first: no 720 KB download and no console errors on devices without it
    if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) throw new Error('WebGL is not available');
    room.THREE = await import('three');                 // the import map in index.html resolves this name
    room.mergeGeometries = (await import('three/addons/utils/BufferGeometryUtils.js')).mergeGeometries;
    const THREE = room.THREE;
    room.stage = stage;
    room.renderer = new THREE.WebGLRenderer({ antialias: !small.matches, alpha: true });   // throws if WebGL is unavailable
    if (!room.renderer.getContext()) throw new Error('No WebGL context');
    room.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    room.scene = new THREE.Scene();
    room.camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);   // a long lens (36 degrees) gives the flat toy look
    stage.append(room.renderer.domElement);                       // decoration: the whole stage is aria-hidden
    buildRoom();
    buildRail();
    applyQuality();
    view.f = view.target = railProgress();
    view.intro = reduce.matches ? 0 : 1;                          // 1 = camera starts pulled back, 0 = on the stop
    placeCamera();
    room.renderer.render(room.scene, room.camera);                // first frame BEFORE hiding the SVG, so there is no blank flash
    room.ready = true;
    state.wake = wake;
    listen();
    root.classList.add('has-3d');                                 // hides the SVG only once everything above has worked
    wake();                                                       // starts the dolly-in (or draws one still frame)
  } catch (error) {
    console.warn('3D room unavailable, showing the still picture instead.', error);
    room.ready = false;
    root.classList.remove('has-3d');
    if (room.renderer) { room.renderer.dispose(); room.renderer.domElement.remove(); }
  }
}
// Quality tiers: shadows only on capable screens, smaller pixel ratio on phones.
function applyQuality() {
  const THREE = room.THREE, lowPower = small.matches || (navigator.hardwareConcurrency || 8) <= 4;
  room.shadows = !lowPower;
  room.renderer.shadowMap.enabled = room.shadows;
  room.sun.castShadow = room.shadows;
  if (room.shadows) room.sun.shadow.mapSize.set(1024, 1024);
  room.blobs.forEach((b) => { b.visible = !room.shadows; });      // fake shadows stand in when real ones are off
  room.scene.traverse((o) => { if (o.material) o.material.needsUpdate = true; });   // shaders change when shadows toggle
  resize();
}
function resize() {
  const w = room.stage.clientWidth, h = room.stage.clientHeight;
  if (!w || !h) return;
  const { renderer, camera } = room;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small.matches ? 1.25 : 1.75));
  renderer.setSize(w, h, false);                                   // false: CSS sizes the canvas
  camera.aspect = w / h;
  camera.fov = camera.aspect >= 1 ? 36 : Math.min(62, 36 / camera.aspect ** 0.7);
  const panel = document.querySelector('.panel');
  const shift = wide.matches && panel ? Math.min(panel.getBoundingClientRect().right, w * 0.6) / 2 : 0;
  if (shift) camera.setViewOffset(w, h, -shift, 0, w, h);          // slides the picture right so the room clears the panel
  else camera.clearViewOffset();
  camera.updateProjectionMatrix();
}
```
The dolly itself is `view.intro` falling from 1 to 0 inside `update()` (part 5) and `placeCamera()` (part 4).

### 2. Scroll: the room wakes up at the current stop
As the visitor scrolls, the furniture of the section on screen brightens softly (its material colour is multiplied by up to 1.3, which keeps the hue) and fades back when they leave. Scrolling also feeds the rail (part 4). Panels do not animate on scroll: no fade-up on every section, the room is what moves.

```js
// script.js, part 5: one loop, which runs only while something is still moving
const view = { f: 0, target: 0, intro: 1, px: 0, py: 0, tx: 0, ty: 0, hover: -1 };
let frame = 0, last = 0;
function wake() {
  if (!room.ready) return;
  if (reduce.matches) return renderStill();
  if (frame || document.hidden) return;                             // already running, or nobody is looking
  last = performance.now();
  frame = requestAnimationFrame(tick);
}
function tick(now) {
  frame = 0;
  const dt = Math.min((now - last) / 1000, 0.05);                   // clamp: a long pause must not cause a giant step
  last = now;
  const moving = update(dt);
  room.renderer.render(room.scene, room.camera);
  if (moving) frame = requestAnimationFrame(tick);                  // settled = the loop ends and the GPU rests
}
function update(dt) {
  let moving = false;
  const toward = (value, goal, speed) => {                          // frame-rate independent damping
    const gap = goal - value;
    if (Math.abs(gap) < 0.0008) return goal;
    moving = true;
    return value + gap * (1 - Math.exp(-speed * dt));
  };
  view.f = toward(view.f, view.target, 4);                          // where on the rail (0 = first stop)
  view.intro = toward(view.intro, 0, 3);                            // page-load dolly
  view.px = toward(view.px, view.tx, 4);                            // mouse parallax
  view.py = toward(view.py, view.ty, 4);
  const lights = STOPS[state.active]?.lights ?? [];
  for (const [name, group] of Object.entries(room.lit)) {           // the highlight
    group.amount = toward(group.amount, lights.includes(name) ? 1 : 0, 5);
    group.mats.forEach((m) => m.color.copy(m.userData.tint).multiplyScalar(1 + group.amount * 0.3));   // brighter, same hue
  }
  const desk = room.lit.desk ? room.lit.desk.amount : 0;
  room.projects.forEach((p, i) => {                                 // hover lift (see moment 3)
    p.lift = toward(p.lift, view.hover === i ? 1 : 0, 8);
    p.mesh.position.y = p.baseY + p.lift * 0.1;
    const m = p.mesh.material;                                      // a swapped-in glTF has no single material: it just lifts
    if (m && m.userData.tint) m.color.copy(m.userData.tint).multiplyScalar(1 + desk * 0.3 + p.lift * 0.25);
  });
  placeCamera();
  return moving;
}
function renderStill() {                                            // reduced motion: one still frame at the Home stop
  view.f = view.target = 0; view.intro = 0; view.px = view.py = 0;
  placeCamera();
  room.renderer.render(room.scene, room.camera);
}
function onScroll() {
  if (!room.ready || reduce.matches) return;
  view.target = railProgress();
  wake();
}
```

### 3. Hover and focus: a project object lifts
When a project that has a real link is hovered or focused, its object on the desk lifts a hand's width and brightens. Projects without a link do nothing, exactly like the panel. Links in the panels use the colour swap from the CSS above.

```js
// script.js, part 6: hover and focus (only for projects that contain a real link)
function wireProjects() {
  document.querySelectorAll('#projects .project').forEach((card, i) => {
    if (!card.querySelector('a[href]') || !room.projects[i]) return;
    const on = () => { view.hover = i; wake(); };
    const off = () => { if (view.hover === i) view.hover = -1; wake(); };
    card.addEventListener('pointerenter', on); card.addEventListener('pointerleave', off);
    card.addEventListener('focusin', on); card.addEventListener('focusout', off);
  });
}
```

### 4. Navigation: links fly the camera, the current stop stays put
A nav click lands on the section instantly (native anchor, instant scroll, so find-in-page, keyboard and the scrollbar all behave), and because the camera is damped it flies along the rail to the new stop. After a jump the target section stays "current" until the visitor scrolls on their own or it leaves the screen, so a short last section never loses its highlight to the one after it.

```js
// script.js, part 7: nav state with a jump lock (plain JavaScript, works without the room)
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
let locked = null;                                    // id of the section the visitor jumped to
function setActive(id) {
  if (state.active === id) return;
  state.active = id;
  navLinks.forEach((a) => {
    if (a.hash === '#' + id) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  });
  state.wake();                                       // lets the room move the highlight
}
function findActive() {
  const max = root.scrollHeight - innerHeight;
  if (!sections.length) return null;
  if (scrollY < 8) return sections[0].id;                            // top of the page is always Home
  if (scrollY >= max - 2) return sections[sections.length - 1].id;   // bottom of the page: short last sections would never reach the line
  const top = parseFloat(getComputedStyle(sections[0]).scrollMarginTop) || 0;
  const line = top + (innerHeight - top) * 0.35;                     // a line a third of the way down the free area
  const hit = sections.find((s) => { const r = s.getBoundingClientRect(); return r.top <= line && r.bottom > line; });
  return hit ? hit.id : state.active;
}
function onScrollNav() {
  if (locked) {
    const r = document.getElementById(locked).getBoundingClientRect();
    if (r.bottom <= 0 || r.top >= innerHeight) locked = null;        // the jumped-to section left the screen
  }
  setActive(locked || findActive());
}
function jumpTo(id) { if (sections.some((s) => s.id === id)) { locked = id; setActive(id); } }
['wheel', 'touchmove'].forEach((type) => addEventListener(type, () => { locked = null; }, { passive: true }));
addEventListener('keydown', (e) => { if (['PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) locked = null; });
navLinks.forEach((a) => a.addEventListener('click', () => jumpTo(a.hash.slice(1))));
addEventListener('hashchange', () => jumpTo(location.hash.slice(1)));
addEventListener('scroll', onScrollNav, { passive: true });
```
`html { scroll-behavior: auto }` is deliberate: if the student wants smooth scrolling, the jump-lock above still works, but the camera already provides the glide.

### 5. Signature: the camera rail
Each section has one stop: where the camera stands (`pos`) and what it looks at (`look`). Two Catmull-Rom splines pass exactly through those points, one for the position and one for the look-at target, and `view.f` (0 at the first stop, 1 at the second, and so on) is how far along them the camera is. Because both curves use the same parameter, the camera turns smoothly while it travels.

```js
// script.js, part 4: the rail. Edit STOPS to move the camera; keys are section ids.
const STOPS = {
  home:     { pos: [8.2, 5.8, 10.8], look: [0.0, 1.3, -0.4],  lights: [] },
  about:    { pos: [4.8, 2.9, 4.6],  look: [1.2, 0.8, -0.9],  lights: ['chair'] },
  projects: { pos: [0.5, 3.0, 2.6],  look: [-0.55, 1.1, -2.3], lights: ['desk'] },
  skills:   { pos: [0.4, 2.6, 4.2],  look: [-3.7, 1.8, 0.2],  lights: ['shelf'] },
  contact:  { pos: [2.6, 2.6, 2.7],  look: [2.3, 2.15, -3.0], lights: ['window'] },
};
function buildRail() {
  const THREE = room.THREE;
  room.stops = sections.filter((s) => STOPS[s.id]);                 // sections without a STOPS entry are skipped
  const v = (a) => new THREE.Vector3(...a);
  const pts = room.stops.map((s) => v(STOPS[s.id].pos)), looks = room.stops.map((s) => v(STOPS[s.id].look));
  if (pts.length === 1) { pts.push(pts[0].clone()); looks.push(looks[0].clone()); }   // a curve needs two points
  room.posCurve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');             // centripetal: no loops or overshoot
  room.lookCurve = new THREE.CatmullRomCurve3(looks, false, 'centripetal');
  room.P = new THREE.Vector3(); room.L = new THREE.Vector3(); room.FAR = new THREE.Vector3(15, 10, 17);
  measureRail();
}
function measureRail() {                                            // where (in px of scroll) each stop is reached
  const max = Math.max(0, root.scrollHeight - innerHeight);
  room.anchors = room.stops.map((s) => clamp(
    s.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(s).scrollMarginTop) || 0), 0, max));
  for (let i = 1; i < room.anchors.length; i++) if (room.anchors[i] <= room.anchors[i - 1]) room.anchors[i] = room.anchors[i - 1] + 1;
}
function railProgress() {                                           // scroll position -> 0 .. (number of stops - 1)
  const a = room.anchors, n = a.length, y = scrollY;
  if (n < 2 || y <= a[0]) return 0;
  if (y >= root.scrollHeight - innerHeight - 2) return n - 1;        // bottom of the page always means the last stop
  let k = 0;
  while (k < n - 2 && y >= a[k + 1]) k++;
  const t = clamp((y - a[k]) / (a[k + 1] - a[k]), 0, 1);
  return k + t * t * (3 - 2 * t);                                    // smoothstep: the camera lingers on each stop
}
function placeCamera() {
  const { camera, posCurve, lookCurve, P, L } = room;
  const t = room.stops.length > 1 ? clamp(view.f / (room.stops.length - 1), 0, 1) : 0;
  posCurve.getPoint(t, P);                                           // getPoint(t) hits control point i exactly at t = i/(n-1)
  lookCurve.getPoint(t, L);
  P.lerp(room.FAR, view.intro);                                      // page-load dolly: blend toward the far viewpoint
  camera.position.copy(P);
  camera.lookAt(L);
  camera.translateX(view.px * 0.12);                                 // tiny parallax: the camera slides, it does not turn
  camera.translateY(-view.py * 0.07);
}
```
Listeners and boot, last in the file:
```js
// script.js, part 8: listeners, then part 9: boot
function listen() {
  addEventListener('scroll', onScroll, { passive: true });
  new ResizeObserver(() => {                                         // fires on resize, rotation and layout breakpoints
    resize(); measureRail();
    view.target = reduce.matches ? 0 : railProgress();
    wake();
  }).observe(room.stage);
  if (document.fonts) document.fonts.ready.then(() => { measureRail(); view.target = reduce.matches ? 0 : railProgress(); wake(); });
  small.addEventListener('change', () => { applyQuality(); wake(); });
  reduce.addEventListener('change', () => { view.target = reduce.matches ? 0 : railProgress(); wake(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });
  if (window.matchMedia('(pointer: fine)').matches) {                // optional mouse parallax, never on touch
    addEventListener('pointermove', (e) => {
      if (reduce.matches) return;
      view.tx = (e.clientX / innerWidth) * 2 - 1; view.ty = (e.clientY / innerHeight) * 2 - 1;
      wake();
    }, { passive: true });
  }
  const canvas = room.renderer.domElement;
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); root.classList.remove('has-3d'); });  // show the SVG
  canvas.addEventListener('webglcontextrestored', () => { root.classList.add('has-3d'); wake(); });
  wireProjects();
}
onScrollNav();    // choose the starting stop before the room exists
startRoom();
```

## Reduced motion and fallbacks
Reduced motion gives a still, designed state: the room renders one frame from the Home stop, the camera does not follow scroll, no dolly, no parallax, no highlight animation. Panels are unchanged. The CSS side:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```
`.panel-hero` starts visible by default (the `arrive` animation only runs under no-preference), so nothing needs un-hiding. The JavaScript already skips everything else (`wake()` calls `renderStill()`, `onScroll` returns early).

Fallback ladder, all with the content untouched:
1. JavaScript off: the inline SVG room shows in the band (or full screen on desktop) and the panels scroll normally. Nav links are plain anchors.
2. Import fails (offline CDN, an old browser without import maps): `startRoom()` catches it, logs a console warning, and the SVG stays.
3. WebGL unavailable or the GPU context is lost: the `WebGLRenderer` constructor throws (caught), or `webglcontextlost` removes `has-3d` so the SVG returns.

Test them: turn JavaScript off in DevTools, block `cdn.jsdelivr.net` in the network tab, and emulate reduced motion in DevTools "Rendering".

## Performance
Target: a steady 60fps on a mid laptop and no jank on a mid phone, with the room costing under about 30 draw calls. How the skill meets it:
- **Merged geometry:** each furniture piece is one mesh with vertex colours, so the whole room is about 12 draw calls instead of hundreds.
- **Quality tiers:** under 760px wide, on touch devices or on 4 cores or fewer, shadows are off (cheap blob shadows replace them), antialiasing is off on phones, and pixel ratio is capped at 1.25 (1.75 on desktop). Never render at a phone's raw 3x ratio.
- **No idle work:** the rAF loop runs only while the camera, highlight, hover or parallax are still moving, then stops. Hidden tabs do not render (and `visibilitychange` restarts the loop cleanly). If the canvas is ever put below the fold instead of fixed, pause it with an IntersectionObserver.
- **Small scene:** about 10 materials and a few thousand triangles, one directional light, one hemisphere light. More lights cost more on every pixel.
- **Dispose** geometry, materials and textures you replace (`disposeTree`), and handle resize through the ResizeObserver.
- **Scroll stays native:** passive listeners, no hijacking, no snapping, no pinned sections. Check with DevTools 4x CPU throttling.

## Libraries
This is the one place AGENTS.md's no-library rule is waived, and only because the student picked a frontier vibe. Nothing else is installed or loaded.

| Library | Version | Licence | Cost |
|---|---|---|---|
| three.js | 0.180.0, from jsDelivr (`build/three.module.min.js` plus its sibling `three.core.min.js`) | MIT | about 720 KB raw, about 180 KB gzipped, parsed once; fine on mid phones with the quality tiers above |
| `BufferGeometryUtils` (three addon, same version) | 0.180.0, `examples/jsm/utils/BufferGeometryUtils.js` | MIT | about 35 KB raw |

Loaded with the import map in the HTML skeleton, so there is no build step and no npm; the procedural room also works when `index.html` is simply opened from disk. Pin exactly; never use `@latest`. If the CDN is blocked (school Wi-Fi), the SVG fallback shows.

### Optional: swap a procedural object for a CC0 model
Only if the student asks. Use CC0 models only (Kenney, Poly Haven, or similar public-domain sources). CC0 does not require credit, but credit anyway: add one plain line in a footer such as the asset page's own title and author. Keep each `.glb` under about 500 KB, put it in `public/assets/`, and note it will not load from a double-clicked `file://` page; ask the student before suggesting a local server or `firebase emulators:start --only hosting`.

```js
// Replace the procedural mesh called `name` with a glTF model. Run after buildRoom(), inside a try/catch.
async function swapForModel(name, url, targetHeight) {
  const THREE = room.THREE, old = room.scene.getObjectByName(name);
  const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
  const model = (await new GLTFLoader().loadAsync(url)).scene;
  const first = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
  model.scale.setScalar(targetHeight / first.y);                    // match the old object's height
  const bounds = new THREE.Box3().setFromObject(model), center = bounds.getCenter(new THREE.Vector3());
  model.position.set(old.position.x - center.x, old.position.y - bounds.min.y, old.position.z - center.z);  // stand it where the old one stood
  model.rotation.y = old.rotation.y;
  model.traverse((o) => { if (o.isMesh) o.castShadow = o.receiveShadow = true; });
  room.scene.add(model);
  const entry = room.projects.find((p) => p.mesh === old);          // keep the hover lift working for swapped project objects
  if (entry) { entry.mesh = model; entry.baseY = model.position.y; }
  disposeTree(old);
}
```
Models carry their own colours and textures, so keep the room's palette in mind (a flat low-poly model like Kenney's fits). Unlit extras, a custom shader or a 10 MB model break the performance target. A build step (Vite plus `npm install three`) is never needed for this vibe, and AGENTS.md gates `npm install`.

## Avoid
- Free orbit or drag controls (they fight scrolling), scroll-jacking, scroll snapping, or any pinned section taller than one screen.
- Text, links or headings inside the canvas. 3D text may only repeat the real name or real section names, and the canvas is always `aria-hidden`.
- Invented content in the room: no posters, brand logos, book titles, screens with fake UI, signs, plants-as-decoration added "to fill space", or numbers.
- Text sitting directly on the moving 3D picture (contrast changes every frame). Text goes in solid panels.
- A render loop that never stops, a pixel ratio above 2, shadows on phones, a dozen lights, a 10 MB model, whip-fast camera moves, or anything that changes more than three times a second.
- Panels that react like links when they have no link (no hover lift or glow on plain cards).
- Generic page habits: a "→" after every link, "A · B · C" strings, numbering the projects 01 / 02 / 03, one word of a heading picked out in the accent, an ALL-CAPS label above every heading, a fade-up on every section, the same rounded soft-shadow card repeated everywhere.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
