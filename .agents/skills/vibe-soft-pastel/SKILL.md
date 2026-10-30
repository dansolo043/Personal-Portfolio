---
name: vibe-soft-pastel
description: Restyles the portfolio site as soft, tactile pastel (rounded shapes, colour fields, gentle depth and springy motion). Use ONLY when the student names the vibe-soft-pastel skill or asks for the Soft Pastel vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: generic
  tags: "design-art, digital-media"
  intensity: standard
  version: "2"
---

# Vibe: Soft Pastel

## Feel and who it's for
A well-made indie app or a designer's sticker sheet: soft colour fields, rounded shapes, gentle depth, and things that feel squishy to touch. Friendly but grown-up: dark ink on pastel, never a baby shower. It is the only vibe where things overshoot a little and spring back. Good for design, digital media and creative students whose work should feel warm and approachable.

## Must keep (this is what makes it Soft Pastel)
1. Pastel colour fields (several soft hues) with DARK ink text. Pastel is for backgrounds, never for text.
2. Rounded everything, but with a hierarchy: pills for small things, big soft corners for cards and bands. About stays open text, not another card.
3. One motion character: a soft spring that overshoots by a few percent and settles. Nothing is stepped, linear or sharp.
4. Morphing blobs behind the hero are the one loud thing. They are decoration, never over text or links.
5. Cards feel physical: a card with a real link lifts on hover and squashes a little on press.

## Starting defaults (change freely)
The student can say "more mint" or "make the accent berry". Their request wins.

Palette, in words: blush-white page; five pastels (pink, lilac, mint, butter, sky) used as fields; aubergine ink for text; a softer plum-grey for secondary text; one deep teal accent for links and buttons. No cream-and-terracotta.

```css
:root {
  /* Contrast, computed (WCAG): ink on bg 15.3, on every pastel 11.5 to 13.8; muted on bg 8.3, on every pastel 6.3 to 7.5;
     accent on bg 6.7, on pastels 5.1 to 6.0; white on accent 7.0. Re-check any colour you change. */
  --color-bg: #FFF8FB;
  --color-surface: #FFFFFF; --color-text: #2A1B36; --color-muted: #554560;
  --color-accent: #0B645B; --color-on-accent: #FFFFFF;
  --pastel-pink: #FAD5E5; --pastel-lilac: #DFD6FA; --pastel-mint: #C8EFDF; --pastel-butter: #FBEEB8; --pastel-sky: #CCE5F9;
  --font-display: "Fredoka", "Nunito", system-ui, sans-serif; --font-body: "DM Sans", system-ui, sans-serif;
  /* Spring, about 8% overshoot. The cubic-bezier is the fallback; browsers that know linear() replace it. */
  --spring: cubic-bezier(0.34, 1.45, 0.64, 1);
}
@supports (transition-timing-function: linear(0, 1)) {
  :root { --spring: linear(0, .068, .227, .421, .612, .777, .905, .994, 1.05, 1.077, 1.083, 1.077, 1.063, 1.047, 1.031, 1.018, 1.007, 1, .996, .994, .993, .994, .995, .996, 1); }
}
```
Other accents that keep the feel (always on dark-ink pastels): violet `#4B33B5` (6.2 to 8.2 everywhere) or berry `#A3224F` (5.2 to 6.9 everywhere).

Fonts: Fredoka (headings, weights 500 to 600) with DM Sans (body). Alternatives: Nunito for everything, or Quicksand at weight 600 or more for headings. Not Inter.
`<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">`

Type scale: name `clamp(2.5rem, 11vw, 5.5rem)`, section titles `clamp(1.75rem, 6vw, 2.75rem)`, card titles 1.375rem, body 1.0625rem with line height 1.6, paragraphs under 65 characters wide. Spacing comes from your spacing scale and stays roomy.

## Layout ideas
- **Header:** a floating rounded bar with the student's real name and the section links as pills. Sticky only from about 40em up. At 320px the links may wrap to two rows; never let them scroll sideways.
- **Hero:** the real name large, the one-line intro under it, three flat blobs behind, and a small Pause button.
- **About:** the real bio as open text on the page colour, narrow measure, no card.
- **Projects:** a grid of cards, each in a different pastel (cycle with `:nth-child`): real title, real description, and the title as a link only if SPEC.md has one.
- **Skills:** the real skills as pill tags, cycling through the pastels.
- **Contact:** one big, softly rounded pastel band holding the real links as accent-filled pills (class `pill-link`). Long emails must wrap, not overflow; on phones keep the band and pill padding small so a real email fits on one line at 320px.
- **Width:** the hero and every section share one content width, so the name lines up with the sections on wide screens: `.hero, main > section { padding-inline: max(1rem, (100% - 72rem) / 2); }`.
- Cards, tags and bands differ in radius and colour by role, never one identical card everywhere.

## Make it theirs
- The one loud thing is the morphing blobs. Everything else (hover, scroll, nav) is small and short.
- The student's work sets the details: project names are the card titles, real skills are the tags. If SPEC.md names favourite colours or a mood, let them steer which pastels lead. Never add taglines, sparkles, emoji or captions SPEC.md doesn't back up.
- Overshoot is movement only, never text size or colour, and always small.

## Motion character
Tempo: unhurried and soft, 450 to 800ms. Easing: `var(--spring)` for anything that arrives or answers a touch (lift, press release, settle, pill); a short `ease-out` for the press itself; a slow `ease-in-out` for the ambient blobs. Nothing flashes or spins.

### 1. Page load: the hero pops in
The name and intro rise into place with the spring and the blobs grow in. Pure CSS, so the text shows if JavaScript fails. The `backwards` fill means these animations never override later styles.

```html
<section class="hero" id="home" aria-labelledby="home-title">
  <div class="blobs" aria-hidden="true">
    <span class="blob blob-a"><span class="blob-shape"></span></span>
    <span class="blob blob-b"><span class="blob-shape"></span></span>
    <span class="blob blob-c"><span class="blob-shape"></span></span>
  </div>
  <h1 id="home-title">Sam Rivera</h1>
  <p class="hero-intro">The one-line intro from SPEC.md.</p>
  <button class="pause" type="button" hidden>Pause background motion</button>
</section>
```
```css
body { margin: 0; background: var(--color-bg); color: var(--color-text); font: 1.0625rem/1.6 var(--font-body); }
h1, h2, h3 { font-family: var(--font-display); line-height: 1.1; } h1 { font-size: clamp(2.5rem, 11vw, 5.5rem); text-wrap: balance; overflow-wrap: anywhere; }
@keyframes pop { from { opacity: 0; transform: translateY(1.25rem) scale(0.94); } }
.hero h1, .hero-intro { animation: pop 800ms var(--spring) backwards; }
.hero-intro { max-width: 36rem; animation-delay: 120ms; }
```

### 2. Scroll: sections settle
Each section after the hero settles once, with the spring, its children a beat apart. JavaScript adds the hiding class, so without it everything is visible. Hidden content uses `opacity`, not `visibility`, so screen readers and Tab still reach it, and a section settles the moment something inside it gets focus.

```css
@keyframes settle { from { opacity: 0; transform: translateY(1.5rem) scale(0.96); } }
.will-settle > * { opacity: 0; }
/* These selectors are more specific than the hiding rule, so they win. */
.will-settle.is-settled > * { opacity: 1; animation: settle 800ms var(--spring) backwards; }
.will-settle.is-settled > :nth-child(2) { animation-delay: 90ms; }
.will-settle.is-settled > :nth-child(n + 3) { animation-delay: 180ms; }
main { overflow-x: clip; } /* settling and the blobs can never cause sideways scroll */
```
```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sections = document.querySelectorAll('main section:not(.hero)');
if (!reduce && 'IntersectionObserver' in window) {
  const settler = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Also settle sections already scrolled past (for example after a reload).
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add('is-settled');
        settler.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  sections.forEach((section) => { section.classList.add('will-settle'); settler.observe(section); });
}
// Keyboard users: a section settles as soon as Tab lands inside it.
document.addEventListener('focusin', (event) => {
  const section = event.target.closest('.will-settle');
  if (section) section.classList.add('is-settled');
});
```

### 3. Hover, focus and press: lift, then squash
Cards that hold a real link, and pill links, lift with the spring on hover or keyboard focus, squash a little when pressed, and spring back on release. A card with no link stays still, so it never pretends to be clickable (the state you move into sets the transition, so the press is quick and the release is springy).

```html
<ul class="projects-grid">
  <li class="card">
    <h3><a href="THE_REAL_URL_FROM_SPEC">Project title from SPEC.md</a></h3> <!-- a link only if SPEC.md has one; otherwise a plain h3 -->
    <p>The real description from SPEC.md.</p>
  </li>
</ul>
```
```css
.projects-grid { display: grid; gap: 1rem; padding: 0; list-style: none; grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr)); }
.card { position: relative; padding: 1.5rem; border-radius: 1.75rem; background: var(--card-bg, var(--color-surface));
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.7), 0 10px 24px -12px rgb(42 27 54 / 0.35); }
.card:nth-child(4n + 1) { --card-bg: var(--pastel-pink); }  .card:nth-child(4n + 2) { --card-bg: var(--pastel-mint); }
.card:nth-child(4n + 3) { --card-bg: var(--pastel-butter); } .card:nth-child(4n + 4) { --card-bg: var(--pastel-sky); }
.card a { color: var(--color-text); text-underline-offset: 4px; }
.card a::after { content: ""; position: absolute; inset: 0; border-radius: inherit; } /* the whole card is the link */
.card a:focus-visible { outline: none; }
.card a:focus-visible::after { outline: 3px solid var(--color-accent); outline-offset: 3px; }

.card:has(a), .pill-link { transition: transform 500ms var(--spring); } /* never "transition: all" */
@media (hover: hover) { .card:has(a):hover, .pill-link:hover { transform: translateY(-6px) scale(1.015); } }
.card:has(:focus-visible), .pill-link:focus-visible { transform: translateY(-6px) scale(1.015); }
/* :active comes last, so it wins over hover and focus. */
.card:has(a):active, .pill-link:active { transform: scale(0.97); transition-duration: 120ms; transition-timing-function: ease-out; }

a { color: var(--color-accent); }
a:focus-visible, button:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 3px; }
.pill-link:focus-visible { outline-color: var(--color-text); } /* a teal ring would vanish next to the teal pill */
.pill-link { display: inline-flex; align-items: center; min-height: 44px; padding: 0.5rem 1.25rem; border-radius: 999px;
  background: var(--color-accent); color: var(--color-on-accent); font-weight: 700; text-decoration: none; overflow-wrap: anywhere; }
```

### 4. Navigation: a pill springs to the active link
One lilac pill sits behind the links: a full-size layer revealed through a rounded `clip-path: inset()`. JavaScript sets the inset to the current link's box, and the spring stretches and settles the pill when the section changes. It still works when links wrap to a second row.

```html
<header class="site-header">
  <a class="brand" href="#home">Sam Rivera</a>
  <nav class="site-nav" aria-label="Sections">
    <span class="nav-pill" aria-hidden="true"></span>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#projects">Projects</a></li>
    </ul>
  </nav>
</header>
```
```css
.site-header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem 1rem; margin: 0.75rem; padding: 0.5rem 1rem; border-radius: 1.75rem; background: var(--color-surface); }
.brand { color: var(--color-text); font: 600 1.25rem var(--font-display); text-decoration: none; }
.site-nav { position: relative; }  /* the links' offsetParent: do not position the ul or li */
.site-nav ul { display: flex; flex-wrap: wrap; gap: 0.25rem; margin: 0; padding: 0; list-style: none; }
.site-nav a { position: relative; z-index: 1; display: flex; align-items: center; min-height: 44px; padding: 0 0.7rem; border-radius: 999px;
  color: var(--color-text); font-weight: 500; text-decoration: none; transition: transform 500ms var(--spring); }
.site-nav a:active { transform: scale(0.94); transition-duration: 120ms; transition-timing-function: ease-out; }
.nav-pill { position: absolute; inset: 0; background: var(--pastel-lilac);
  clip-path: inset(var(--pill-t, 0px) var(--pill-r, 100%) var(--pill-b, 0px) var(--pill-l, 0px) round 999px); }
.nav-pill.is-ready { transition: clip-path 550ms var(--spring); } /* added after the first placement, so it doesn't fly in */
html { scroll-padding-top: 1rem; }
@media (min-width: 40em) {
  .site-header { position: sticky; top: 0.75rem; z-index: 10; }
  html { scroll-padding-top: 5.5rem; } /* your header's height plus a gap; also keeps Tab focus out from under the header */
}
```
```js
const nav = document.querySelector('.site-nav');
const pill = nav && nav.querySelector('.nav-pill');
const navLinks = nav ? [...nav.querySelectorAll('a')] : [];
const allSections = [...document.querySelectorAll('main section[id]')];
let current = null;

function movePill() {
  if (!current || !pill) return;
  // Read all layout values first, then write.
  const l = current.offsetLeft, t = current.offsetTop, w = current.offsetWidth, h = current.offsetHeight;
  const W = nav.clientWidth, H = nav.clientHeight;
  nav.style.setProperty('--pill-l', l + 'px'); nav.style.setProperty('--pill-t', t + 'px');
  nav.style.setProperty('--pill-r', (W - l - w) + 'px'); nav.style.setProperty('--pill-b', (H - t - h) + 'px');
}
// After a nav jump, keep the jumped-to link current until the visitor scrolls on their own. Without this,
// jumping to a short section selects the one after it (the middle band or the page bottom lands there).
let jumpedTo = '', jumpSeen = false;
document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', () => {
  const target = document.getElementById(a.hash.slice(1));
  if (target && target.matches('main section[id]')) { jumpedTo = target.id; jumpSeen = false; }
}));
['wheel', 'touchmove'].forEach((name) => window.addEventListener(name, () => { jumpedTo = ''; }, { passive: true }));
window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) jumpedTo = '';
});
window.addEventListener('scroll', () => { // a scrollbar drag: release once the target was on screen and has left it
  if (!jumpedTo) return;
  const box = document.getElementById(jumpedTo).getBoundingClientRect();
  if (box.bottom > 0 && box.top < window.innerHeight) jumpSeen = true;
  else if (jumpSeen) jumpedTo = '';
}, { passive: true });
function select(id) {
  id = jumpedTo || id;
  const next = navLinks.find((a) => a.hash === '#' + id);
  if (!next || next === current) return;
  current = next;
  navLinks.forEach((a) => (a === next ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
  movePill();
}
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting && window.scrollY >= 8) select(entry.target.id); });
}, { rootMargin: '-45% 0px -50% 0px' });
allSections.forEach((section) => spy.observe(section));

// Edge cases: at the very top the first link is current; a short last section may never reach the middle band,
// so at the very bottom select it and settle anything still hidden.
function edges() {
  const atTop = window.scrollY < 8;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) document.querySelectorAll('.will-settle').forEach((s) => s.classList.add('is-settled'));
  if (atTop && allSections.length) select(allSections[0].id);
  else if (atBottom && allSections.length) select(allSections[allSections.length - 1].id);
}
window.addEventListener('scroll', edges, { passive: true });
window.addEventListener('resize', movePill);
if (document.fonts) document.fonts.ready.then(movePill);
edges();
if (pill) requestAnimationFrame(() => requestAnimationFrame(() => pill.classList.add('is-ready')));
```

### 5. Signature: blobs that slowly morph
Three flat pastel blobs sit behind the hero (markup in moment 1). Each is a lopsided rounded shape that slowly rotates while squashing and stretching along its own axes, which reads as morphing and uses `transform` only. The outer layer pops in, the inner one morphs. The hero clips them, so nothing scrolls sideways; they are `aria-hidden` and behind the text. The motion ends on its own after about a minute and the Pause button stops it sooner.

```css
.hero { position: relative; isolation: isolate; overflow: clip; padding-block: 6rem 3.5rem; } /* the top padding keeps blob A clear of the name on phones */
.blobs { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
.blob { position: absolute; width: var(--size); aspect-ratio: 1; animation: blob-in 1100ms var(--spring) backwards; }
.blob-shape { display: block; width: 100%; height: 100%; background: var(--fill); border-radius: 62% 38% 54% 46% / 48% 58% 42% 52%;
  animation: morph 11s ease-in-out 6 alternate; } /* 6 runs, an even count, so it ends where it began */
.blob-a { --size: min(78vw, 26rem); --fill: var(--pastel-lilac); top: -12%; right: -14%; }
.blob-b { --size: min(60vw, 19rem); --fill: var(--pastel-mint); bottom: -18%; left: -12%; animation-delay: 120ms; }
.blob-c { --size: min(34vw, 9rem); --fill: var(--pastel-butter); bottom: 2%; right: 6%; animation-delay: 240ms; }
@media (min-width: 40em) { .blob-c { bottom: 12%; right: 14%; } } /* on phones it would sit behind the Pause button */
.blob-b .blob-shape { animation-duration: 14s; animation-direction: alternate-reverse; } .blob-c .blob-shape { animation-duration: 9s; }
@keyframes blob-in { from { opacity: 0; transform: scale(0.6); } }
@keyframes morph { 0% { transform: rotate(0deg) scale(1, 1); } 50% { transform: rotate(35deg) scale(1.18, 0.86); } 100% { transform: rotate(-20deg) scale(0.9, 1.12); } }
.is-paused .blob-shape { animation-play-state: paused; }
.pause { min-height: 44px; margin-top: 1.5rem; padding: 0 1.25rem; border: 2px solid var(--color-text); border-radius: 999px; background: var(--color-surface); color: var(--color-text); font: inherit; font-weight: 500; }
.pause[hidden] { display: none; } /* keeps it hidden even if you give .pause a display value */
```
```js
// The button is hidden in the HTML and shown here, so it never sits there doing nothing without JavaScript.
const pause = document.querySelector('.pause');
if (pause && !reduce) {
  pause.hidden = false;
  pause.addEventListener('click', () => {
    const paused = document.documentElement.classList.toggle('is-paused');
    pause.textContent = paused ? 'Play background motion' : 'Pause background motion';
  });
}
```
The Pause and Play labels are interface text, not content, so they are allowed.

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .will-settle > * { opacity: 1; }
  .pause { display: none; } /* nothing moves, so there is nothing to pause */
}
```
Everything is visible and still. The blobs stay as static shapes and the nav pill jumps straight to the current link.

## Libraries
None. Plain CSS and JavaScript only. The spring is a CSS `linear()` curve, so no spring library is needed.

## Avoid
- A baby-shower look: sparkles, stars, hearts, emoji, everything pink.
- Pastel text on white or on another pastel. Text is ink, plum-grey or accent only.
- Overshoot above about 10%, more than one bounce, or springs on paragraphs or the page background.
- Blobs over text or links, blobs without `overflow: clip` on the hero, or loops with no end and no Pause.
- Animating `border-radius`, `box-shadow`, `width` or `top` (the morph and the pill use `transform` and `clip-path`), and `transition: all`.
- Gradient washes, glass blur, heavy shadows, or one identical rounded card with the same shadow on everything.
- Cream-and-terracotta palettes, Inter, and the other generic habits: a "→" after every link, "A · B · C" strings, 01 / 02 / 03 on things that aren't a sequence, one headline word picked out in the accent, an ALL-CAPS label above every heading, a plain fade-up on every section.
- Hiding content until JavaScript runs.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
