---
name: vibe-scroll-film
description: Restyles the portfolio site as a short, art-directed film that plays as you scroll (look, layout and motion), using GSAP ScrollTrigger and SplitText plus Lenis. Use ONLY when the student names the vibe-scroll-film skill or asks for the Scroll Film vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: frontier
  tags: "digital-media, design-art, business"
  intensity: frontier
  version: "2"
---

# Vibe: Scroll Film

## Feel and who it's for
The portfolio plays like a short film. A letterbox frames the screen, the name arrives as a title card, and every section is a "shot" with its own colour grade and its own way of cutting in: a dissolve, a wipe, an iris, a push-in. Scrolling is the playhead. Text rises line by line out of masks, a project pulls into focus as it reaches the middle of the screen, and the whole thing trails your scroll by a beat, like a camera on a fluid head. Good for cinema, digital media and design students, and for business students who want a brand-reel feel. It is not the Cinematic vibe: Cinematic is hand-written and mostly time-based. Scroll Film is scroll-scrubbed, timeline-driven and GSAP-heavy.

This is a take-home vibe. It uses four libraries (see Libraries), it needs a steady hand with a few timing numbers, and it is worth an evening, not the first ten minutes. Build it in one go from this file; every snippet below is tested and uses the same class names.

## Must keep (this is what makes it Scroll Film)
1. A letterbox: two black bars at the top and bottom of the screen. The header (the nav) sits in the top bar and a subtitle-style caption sits in the bottom bar. Nothing else lives in the bars.
2. Every section is a "shot": at least one screen tall, with its own colour grade behind it and its own transition into it. Four different transitions are used (dissolve, wipe, iris, push-in), never the same one twice in a row.
3. The motion is scrubbed to scroll with a small smoothing value (about 0.8 seconds of trailing). Only a few things are timed: the accent rule drawing on load, and hover and focus.
4. The signature is the title card. The student's name is split into letters with SplitText. The letterbox opens and the letters assemble during the first screen of scrolling, then the card dissolves into About.
5. Pins are short (at most one screen of scrolling). Scrolling is never trapped, snapped or hijacked: the scrollbar, keyboard, anchor links and find-in-page all work.
6. All real text is plain HTML that reads with JavaScript off, with the libraries blocked, and with reduced motion on.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the grades warmer". Their request wins.

Palette, in words: a title-card ink that is almost black but cool; silver-white text; a softer grey for secondary text; true black for the letterbox; one accent, a tally-light red used like a record lamp (the rule, the current nav link, links, the progress line); and a different very dark colour grade for each shot, like the colour script of a film: navy for About, plum for Projects, deep teal for Skills, oxblood-black for Contact.

Contrast, computed (WCAG 2.x). Check any colour you change.

| Pair | Ratio |
|---|---|
| text #ECEFF2 on ink #0E1013 / black / the four grades | 16.5 / 18.2 / 14.3 to 15.5 |
| muted #A9B1BA on ink / the four grades | 8.8 / 7.6 to 8.3 |
| accent #FF6B63 as text on ink / black / the four grades | 6.8 / 7.5 / 5.9 to 6.4 |
| ink #0E1013 on an accent fill | 6.8 |

```css
/* Contrast, computed (WCAG 2.x):
   text #ECEFF2 on bg #0E1013 16.5:1, on letterbox black 18.2:1, on the four grades 14.3 to 15.5:1.
   muted #A9B1BA on bg 8.8:1, on the grades 7.6 to 8.3:1.
   accent #FF6B63 as text on bg 6.8:1, on the grades 5.9 to 6.4:1, on black 7.5:1.
   --color-on-accent #0E1013 on an accent fill 6.8:1. --color-border is decoration only (1.4:1), never the only cue. */
:root {
  --color-bg: #0E1013;          /* the title-card ink */
  --color-letterbox: #000000;
  --color-text: #ECEFF2;        /* cool silver-white */
  --color-muted: #A9B1BA;
  --color-accent: #FF6B63;      /* tally-light red: record lamp, used sparingly */
  --color-on-accent: #0E1013;
  --color-border: #2A2F37;
  --grade-about: #111C2B;       /* each shot has its own colour grade, like a film's colour script */
  --grade-projects: #1C1426;
  --grade-skills: #0F2220;
  --grade-contact: #241214;
  --font-display: "Instrument Serif", "Iowan Old Style", Georgia, serif;
  --font-body: "Schibsted Grotesk", system-ui, sans-serif;
  --ease-dissolve: cubic-bezier(0.37, 0, 0.63, 1);  /* hover and focus only; scroll motion is scrubbed */
  --bar-top: 3.5rem;            /* header / top letterbox height */
  --bar-bottom: 2.75rem;        /* bottom letterbox height (film mode only) */
  --gutter: 1rem;
  --mask-pad: 0.18em;           /* keeps SplitText masks from clipping descenders */
}
```
Other palettes that keep the feel (ratios computed, same text, muted and accent colours): a warm set with ink `#100D0B` and grades `#1F1710`, `#2A1612`, `#14201A`, `#1B1626` (text 14.5 to 16.8, muted 7.7 to 8.9, accent 6.0 to 7.0), or a monochrome set with ink `#101010` and grades `#161616`, `#1B1B1B` (accent 6.2 to 6.8). If you change any colour, recompute every pair before using it, especially the accent on a grade.

Fonts: a serif for title cards and headings (Instrument Serif, which has one weight, so headings stay at 400; or Gloock or DM Serif Display) and a clean grotesk for reading (Schibsted Grotesk; or Albert Sans or Onest). Not Inter.
`<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Schibsted+Grotesk:wght@400;600&display=swap" rel="stylesheet">`

Spacing and sizes are your call; the snippets use plain values. Corners stay square. Body text is at least 16px (1rem) with a line height around 1.5, lines under 80 characters.

## Layout ideas
- **Letterbox and header:** the bars are fixed, black, and decorative (`aria-hidden`). The real `<header>` with the real `<nav>` sits on top of the top bar. In the bottom bar, a caption repeats the current section name like a subtitle, and a 2px accent line above it shows real scroll progress. No timecode, no frame counter, no "REC" text: those would be made-up information.
- **Home (the title card):** the name in giant serif type, a short accent rule, and the one-line intro (the intro line from SPEC.md; if SPEC.md has no separate tagline, use the "Who I am" line without the name). It sits inside the half-closed letterbox when the page loads, fully readable.
- **About:** a big heading and the real "About me" text, set about 38rem wide, on the navy grade.
- **Projects:** one block per real project: the name in large serif, the real description under it, a thin rule above. A project's name is a link only if SPEC.md gives that project a link. No link means a plain heading, never a made-up URL.
- **Skills:** the real skills as a wrapping list of large serif words, each with a thin underline. No pills, no bars, no percentages.
- **Contact:** the real email and links as large serif text. A plain "Back to top" link is the only footer (no year, no slogan).
- **Header on phones:** five links fit at 320px because the nav text is 13px with 6px side padding (they measure 49, 49, 63, 45 and 61 px wide and 44px tall). If the student adds a sixth link, let the list wrap and raise `--bar-top`.
- Decorative labels (the caption) mirror real section names and are `aria-hidden`. Every section keeps a real heading.
- Use one section per SPEC.md section. If SPEC.md has no Skills, there is no Skills shot, and the shot functions below simply lose a line.

The page. Repeat the project and skill items for every real one in SPEC.md. The text shown is a placeholder; the student's text comes from SPEC.md only.
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The student's name from SPEC.md</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Schibsted+Grotesk:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <!-- Pinned versions, in this order. defer keeps them in order and runs them before script.js. -->
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/lenis@1.3.25/dist/lenis.min.js"></script>
  <script defer src="script.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <!-- Decoration only: shown by CSS once the film starts (html.has-film). -->
  <div class="letterbox letterbox--top" aria-hidden="true"></div>
  <div class="letterbox letterbox--bottom" aria-hidden="true"></div>
  <div class="progress" aria-hidden="true"></div>
  <p class="caption" aria-hidden="true"></p>

  <header class="frame">
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

  <main id="main" tabindex="-1">
    <section class="shot shot--home" id="home" aria-labelledby="home-title">
      <div class="shot__grade" aria-hidden="true"></div>
      <div class="hero-inner">
        <h1 id="home-title" class="title-card">The student's name from SPEC.md</h1>
        <span class="hero-rule" aria-hidden="true"></span>
        <p class="hero-intro">The one-line intro from SPEC.md.</p>
      </div>
    </section>

    <section class="shot shot--about" id="about" aria-labelledby="about-title">
      <div class="shot__grade" aria-hidden="true"></div>
      <div class="shot__inner">
        <h2 id="about-title" class="shot__title" data-depth="0.6">About</h2>
        <p class="shot__text">The About me text from SPEC.md.</p>
      </div>
    </section>

    <section class="shot shot--projects" id="projects" aria-labelledby="projects-title">
      <div class="shot__grade" aria-hidden="true"></div>
      <div class="shot__inner">
        <h2 id="projects-title" class="shot__title" data-depth="0.6">Projects</h2>
        <ul class="project-list">
          <li class="project">
            <!-- A project WITH a link in SPEC.md: the title is the link. -->
            <h3 class="project__title"><a href="PROJECT-LINK-FROM-SPEC">Project name from SPEC.md</a></h3>
            <p class="project__desc">The project description from SPEC.md.</p>
          </li>
          <li class="project">
            <!-- A project WITHOUT a link: plain heading, no <a>, no made-up URL. -->
            <h3 class="project__title">Project name from SPEC.md</h3>
            <p class="project__desc">The project description from SPEC.md.</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="shot shot--skills" id="skills" aria-labelledby="skills-title">
      <div class="shot__grade" aria-hidden="true"></div>
      <div class="shot__inner">
        <h2 id="skills-title" class="shot__title" data-depth="0.6">Skills</h2>
        <ul class="skill-list">
          <li>One real skill from SPEC.md</li>
          <li>Another real skill from SPEC.md</li>
        </ul>
      </div>
    </section>

    <section class="shot shot--contact" id="contact" aria-labelledby="contact-title">
      <div class="shot__grade" aria-hidden="true"></div>
      <div class="shot__inner">
        <h2 id="contact-title" class="shot__title" data-depth="0.6">Contact</h2>
        <ul class="contact-list">
          <li><a href="mailto:the-email-from-SPEC.md">the-email-from-SPEC.md</a></li>
          <li><a href="LINK-FROM-SPEC">The label SPEC.md gives for it</a></li>
        </ul>
        <a class="to-top" href="#home">Back to top</a>
      </div>
    </section>
  </main>
</body>
</html>
```

Base CSS (paste after the tokens). The base `body`, the container and the section padding are here on purpose: the bars cover the top and bottom of the screen, so every shot pads itself by the bar heights and nothing is hidden under them.
```css
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--color-bg); color: var(--color-text); font-family: var(--font-body); font-size: 1rem; line-height: 1.6; }
h1, h2, h3, p, ul { margin: 0; }
ul { padding: 0; list-style: none; }
a { color: var(--color-accent); text-underline-offset: 0.2em; }
a:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 4px; }
[tabindex="-1"]:focus { outline: none; }  /* sections get focus only when a nav link jumps to them */
.skip-link { position: absolute; top: -4rem; left: 0.5rem; z-index: 60; padding: 0.5rem 1rem; background: var(--color-accent); color: var(--color-on-accent); }
.skip-link:focus { top: 0.5rem; }

/* Lenis needs these three rules (from its own lenis.css). */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: clip; }

/* A shot = one section. At least a full screen tall, padded so the bars never cover its content. */
.shot {
  position: relative; isolation: isolate; overflow: clip;   /* clip: the grade may scale or wipe past the edges */
  min-height: 100svh; display: flex; flex-direction: column; justify-content: center;
  padding: calc(var(--bar-top) + 3rem) var(--gutter) calc(var(--bar-bottom) + 3rem);
}
.shot__grade { position: absolute; inset: 0; z-index: -1; background: var(--grade, transparent); }
.shot--about { --grade: var(--grade-about); }
.shot--projects { --grade: var(--grade-projects); }
.shot--skills { --grade: var(--grade-skills); }
.shot--contact { --grade: var(--grade-contact); }
.shot__inner, .hero-inner { width: 100%; max-width: 64rem; margin-inline: auto; }

/* Type: serif for title cards and headings, grotesk for reading. Instrument Serif has one weight, so keep 400. */
.title-card { font-family: var(--font-display); font-weight: 400; font-size: clamp(3.5rem, 18vw, 11rem); line-height: 0.95; letter-spacing: -0.01em; }
.hero-rule { display: block; width: min(12rem, 40%); height: 2px; margin-block: 1.5rem; background: var(--color-accent); transform-origin: left center; }
.hero-intro { max-width: 32rem; font-size: clamp(1.125rem, 2.6vw, 1.5rem); color: var(--color-muted); }
.shot__title { margin-bottom: 2.5rem; font-family: var(--font-display); font-weight: 400; font-size: clamp(2.75rem, 11vw, 6rem); line-height: 1.1; }
.shot__text { max-width: 38rem; font-size: clamp(1.125rem, 2.4vw, 1.5rem); line-height: 1.5; }
.word, .char, .word-mask { display: inline-block; }  /* SplitText pieces are spans; these give them a box to move */
.line, .line-mask { display: block; }
.word-mask, .line-mask { padding-block: var(--mask-pad); margin-block: calc(var(--mask-pad) * -1); } /* SplitText mask wrappers */

.project-list { display: grid; gap: clamp(2rem, 6vw, 4rem); }
.project { padding-top: 1.25rem; border-top: 1px solid var(--color-border); }
.project__title { margin-bottom: 0.5rem; font-family: var(--font-display); font-weight: 400; font-size: clamp(2rem, 7vw, 4rem); line-height: 1.05; }
.project__desc { max-width: 40rem; color: var(--color-muted); }
.skill-list { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; }
.skill-list li { padding-bottom: 0.25rem; border-bottom: 1px solid var(--color-border); font-family: var(--font-display); font-size: clamp(1.5rem, 5vw, 2.5rem); line-height: 1.2; }
.contact-list { display: grid; gap: 0.75rem; margin-bottom: 2rem; }
.contact-list a { display: inline-block; text-decoration-thickness: 2px; min-height: 44px; font-family: var(--font-display); font-size: clamp(1.25rem, 5.4vw, 2.5rem); line-height: 1.3; overflow-wrap: anywhere; }
.to-top { display: inline-flex; align-items: center; min-height: 44px; }
```

The header, and the letterbox, caption and progress line. Without JavaScript the header is a solid bar and the other three never show.
```css
/* The header is the nav, always fixed at the top. Without JavaScript it has a solid background; in film mode it sits on the letterbox. */
.frame { position: fixed; inset: 0 0 auto 0; z-index: 50; height: var(--bar-top); display: flex; align-items: center; padding-inline: var(--gutter);
  background: var(--color-bg); border-bottom: 1px solid var(--color-border); }
.frame nav { width: 100%; }
.frame ul { display: flex; justify-content: space-between; max-width: 64rem; margin-inline: auto; }
.frame a { position: relative; display: flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; padding-inline: 0.4rem;
  color: var(--color-text); font-size: 0.8125rem; text-decoration: none; transition: color 240ms var(--ease-dissolve); }
.frame a::after { content: ""; position: absolute; left: 0.4rem; right: 0.4rem; bottom: 0.5rem; height: 2px; background: var(--color-accent);
  transform: scaleX(0); transform-origin: left center; transition: transform 300ms var(--ease-dissolve); }
.frame a[aria-current] { color: var(--color-accent); }
.frame a[aria-current]::after, .frame a:focus-visible::after { transform: scaleX(1); }
@media (hover: hover) { .frame a:hover::after { transform: scaleX(1); } }
.frame a:focus-visible { outline-offset: -4px; }  /* draws inside the 44px box so nothing clips it */
@media (min-width: 48rem) { .frame ul { justify-content: center; gap: 2rem; } .frame a { font-size: 0.9375rem; } }

/* Film mode only (JavaScript adds html.has-film): letterbox bars, subtitle caption and progress line.
   The bars are always their final size; the script scales them up for the opening. */
.letterbox, .progress, .caption { display: none; }
.has-film .letterbox { display: block; position: fixed; left: 0; right: 0; z-index: 40; height: var(--bar-top); background: var(--color-letterbox); pointer-events: none; will-change: transform; }
.has-film .letterbox--top { top: 0; transform-origin: center top; }
.has-film .letterbox--bottom { bottom: 0; height: var(--bar-bottom); transform-origin: center bottom; }
.has-film .progress { display: block; position: fixed; left: 0; right: 0; bottom: var(--bar-bottom); z-index: 41; height: 2px; background: var(--color-accent); transform: scaleX(0); transform-origin: left center; pointer-events: none; }
.has-film .caption { display: flex; align-items: center; justify-content: center; position: fixed; left: 0; right: 0; bottom: 0; z-index: 45; height: var(--bar-bottom); font-size: 0.9375rem; color: var(--color-text); pointer-events: none; }
.has-film .frame { background: transparent; border-bottom-color: transparent; }
```

## Make it theirs
- The one loud thing is the title card. Everything else is quiet on purpose: the dissolves are slow and soft, the type does not move on its own, and nothing is decorated. Spend the student's effort on the name and the colour grades.
- Colour grades come from the student's work. A student whose projects are night shoots might take cold blues; a student with warm or bright projects might choose warmer grades. Keep every grade dark enough that the text pair stays above 4.5:1, and recompute.
- The number of shots is the number of sections in SPEC.md. Project names stay exactly as written. A long name (more than about 14 characters) needs a smaller `clamp()` on `.title-card` so each word fits at 320px; test it.
- The student's tools can show up in the copy only if SPEC.md says them. Never add credits, a director's name, a runtime, a film-festival laurel or a "scene" number.

## Motion character
Tempo: slow and trailing. Scroll position is the playhead; the scrubbed motion lags it by about 0.8 seconds (`scrub: 0.8`), and Lenis eases the wheel on top (`lerp: 0.09`). Easing: scrubbed motion uses `ease: 'none'` for transitions (the scroll is the easing) and `power2.out` or `power3.out` for text rising. Timed motion (hover, focus) uses `cubic-bezier(0.37, 0, 0.63, 1)`, a symmetric dissolve curve, over 240 to 300ms. Between shots the transitions are real film language: dissolve, wipe, iris, push-in. Nothing bounces, nothing loops, nothing flashes.

Animate only `transform`, `opacity`, `clip-path` and `filter`. The blur (a "focus pull") is used on the project blocks and the title letters, only on screens with a mouse. During the first scroll the letters sit at 55% opacity, which is still 5.6:1 on the ink.

### How the film is built (read before editing)
- **One file, one matchMedia.** `script.js` is one function. `gsap.matchMedia()` runs it only when motion is allowed (`prefers-reduced-motion: no-preference`) and knows whether the device is a touch screen. Everything the film makes lives inside that callback, so GSAP undoes all of it (animations, ScrollTriggers, pins, SplitText splits) if the visitor changes the setting, and the returned function removes the rest (Lenis, the `has-film` class, listeners).
- **One function per shot.** `shotHome`, `shotAbout`, `shotProjects`, `shotSkills`, `shotContact`. Each makes the shot's own scrubbed animations. They are called in page order so ScrollTrigger measures them in order. `cfg` carries `touch` and `scrub`.
- **Helpers are function declarations** (`startLenis`, `setupNav`, `revealTitle`, `clamp`, ...), so the order of the file does not matter. A `const` helper declared below the call would crash.
- The snippets below, plus the setup, are ONE `script.js`, in this order. The wrapper opens in the setup snippet and closes at the end of the signature snippet.

Setup, the matchMedia, and the guard that keeps the page working if a library fails to load:
```js
// Scroll Film: one matchMedia, one function per shot. Function declarations, so the order of the file does not matter.
(function () {
  // If a library failed to load (offline, blocked CDN), stop here. The static layout is a complete portfolio.
  if (!window.gsap || !window.ScrollTrigger || !window.SplitText) return;
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const DEBUG = false; // true draws ScrollTrigger start/end markers. Set it back to false before you publish.
  ScrollTrigger.defaults({ markers: DEBUG });
  ScrollTrigger.config({ ignoreMobileResize: true }); // phone address bars should not re-run every trigger

  const root = document.documentElement;
  let firstBuild = true;

  // Everything the film makes lives inside this callback, so GSAP undoes it all when the conditions change
  // (for example the visitor turns on reduced motion): animations, ScrollTriggers, pins and SplitText splits.
  gsap.matchMedia().add(
    { film: '(prefers-reduced-motion: no-preference)', touch: '(hover: none) and (pointer: coarse)' },
    (context) => {
      const { film, touch } = context.conditions;
      if (!film) return;                                  // reduced motion: stay on the static layout
      root.classList.add('has-film');

      const cfg = { touch, scrub: touch ? true : 0.8 };   // scrub: 0.8 = the film trails your scroll by about 0.8s
      const smooth = touch ? null : startLenis();         // touch screens keep their native scrolling
      const nav = setupNav(smooth && smooth.lenis);

      // The film, in order. To add a shot, write a function like shotAbout and call it here.
      loadIn();
      shotHome(cfg);
      shotAbout(cfg);
      shotProjects(cfg);
      shotSkills(cfg);
      shotContact(cfg);
      parallax(cfg);
      progressLine();
      nav.watchShots();

      const start = () => { ScrollTrigger.refresh(); if (firstBuild && location.hash) nav.jumpTo(location.hash.slice(1), true); firstBuild = false; };
      if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });

      return () => {                                      // cleanup, runs when the film is torn down
        nav.destroy();
        if (smooth) smooth.stop();
        root.classList.remove('has-film');
      };
    }
  );
```
Smooth scrolling. Lenis is only started on devices with a mouse:
```js

  // Smooth scrolling. Lenis eases the real scroll position, so the scrollbar, keyboard and find-in-page still work.
  function startLenis() {
    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on('scroll', ScrollTrigger.update);             // tell ScrollTrigger whenever Lenis moves
    const tick = (time) => lenis.raf(time * 1000);        // GSAP's clock drives Lenis (one loop, not two)
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // With Lenis on it, GSAP's ticker would run every frame forever. Let it sleep after 1.5s with nothing
    // moving; any input or scroll wakes it (GSAP also wakes it whenever a new tween starts).
    let idle;
    const wake = () => {
      gsap.ticker.wake();
      clearTimeout(idle);
      idle = setTimeout(() => (lenis.isScrolling ? wake() : gsap.ticker.sleep()), 1500);
    };
    const inputs = ['wheel', 'keydown', 'pointerdown', 'touchstart', 'scroll'];
    inputs.forEach((name) => window.addEventListener(name, wake, { passive: true }));
    wake();
    return { lenis, stop() {
      inputs.forEach((name) => window.removeEventListener(name, wake));
      clearTimeout(idle); gsap.ticker.wake();
      gsap.ticker.remove(tick); gsap.ticker.lagSmoothing(500, 33); lenis.destroy();
    } };
  }
```

### 1. Page load: the rule draws, the title card waits
Nothing is hidden at load. The title card is readable inside the half-closed letterbox. The only timed motion is the accent rule drawing across in about a second. The film starts on the first scroll.
```js

  // 1. Page load. The title card is readable at once, inside the half-closed letterbox. Only the rule draws.
  function loadIn() {
    gsap.from('.hero-rule', { scaleX: 0, duration: 1.2, delay: 0.2, ease: 'power2.inOut' });
  }
```

### 2. Scroll: grades, text and parallax
Each shot has the same three parts: a transition into it (its grade), text that rises as it is revealed, and optional parallax. Reveals use `clamp()` on their end so the last shot still finishes when the page ends. Headings are split into words, paragraphs into lines, and both are masked, so text rises out of a clip. Only headings and the name are ever split into smaller pieces than lines.
```js

  // 2. Scroll. Every shot has: a transition into it (its grade), text revealed by scrub, and optional parallax.
  // clamp() keeps a trigger inside the page, so the last shot still finishes at the very bottom.
  function clamp(position) { return `clamp(${position})`; }

  function revealTitle(id, cfg) {                         // the heading rises word by word out of a mask
    SplitText.create(`${id} .shot__title`, {
      type: 'words', mask: 'words', wordsClass: 'word', tag: 'span', aria: 'auto', autoSplit: true,
      onSplit: (split) => gsap.from(split.words, {
        yPercent: 110, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: id, start: 'top 80%', end: clamp('top 40%'), scrub: cfg.scrub }
      })
    });
  }

  function revealLines(selector, id, cfg) {               // a paragraph rises line by line
    SplitText.create(selector, {
      type: 'lines', mask: 'lines', linesClass: 'line', tag: 'span',
      aria: 'none',                                       // paragraphs cannot carry aria-label, so leave the text readable as is
      autoSplit: true,
      onSplit: (split) => gsap.from(split.lines, {
        yPercent: 105, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: id, start: 'top 60%', end: clamp('top 15%'), scrub: cfg.scrub }
      })
    });
  }

  // Transition into About: a cross-fade (the grade fades in under the text).
  function shotAbout(cfg) {
    gsap.fromTo('#about .shot__grade', { opacity: 0 }, {
      opacity: 1, ease: 'none',
      scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'top 30%', scrub: cfg.scrub }
    });
    revealTitle('#about', cfg);
    revealLines('#about .shot__text', '#about', cfg);
  }

  // Transition into Projects: a wipe from the right. Each project then comes into focus.
  function shotProjects(cfg) {
    gsap.fromTo('#projects .shot__grade', { clipPath: 'inset(0% 0% 0% 100%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'top 25%', scrub: cfg.scrub }
    });
    revealTitle('#projects', cfg);
    gsap.utils.toArray('#projects .project').forEach((project) => {
      const from = { opacity: 0.15, y: 48 };
      const to = { opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: project, start: 'top 92%', end: 'top 62%', scrub: cfg.scrub } };
      if (!cfg.touch) { from.filter = 'blur(8px)'; to.filter = 'blur(0px)'; }  // the focus pull; skipped on phones
      gsap.fromTo(project, from, to);
    });
  }

  // Transition into Skills: an iris that opens from the top centre.
  function shotSkills(cfg) {
    gsap.fromTo('#skills .shot__grade', { clipPath: 'circle(0% at 50% 0%)' }, {
      clipPath: 'circle(170% at 50% 0%)', ease: 'none',
      scrollTrigger: { trigger: '#skills', start: 'top bottom', end: 'top 30%', scrub: cfg.scrub }
    });
    revealTitle('#skills', cfg);
    gsap.from('#skills .skill-list li', {
      opacity: 0, y: 24, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: '#skills .skill-list', start: 'top 90%', end: clamp('top 55%'), scrub: cfg.scrub }
    });
  }

  // Transition into Contact: a push-in (the grade scales down onto the frame while it fades in).
  function shotContact(cfg) {
    gsap.fromTo('#contact .shot__grade', { opacity: 0, scale: 1.25 }, {
      opacity: 1, scale: 1, ease: 'none',
      scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'top 30%', scrub: cfg.scrub }
    });
    revealTitle('#contact', cfg);
    gsap.from('#contact .contact-list, #contact .to-top', {
      opacity: 0, y: 24, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '#contact', start: 'top 60%', end: clamp('top 20%'), scrub: cfg.scrub }
    });
  }

  // Parallax: anything with data-depth drifts a little against the scroll. Off on touch screens.
  function parallax(cfg) {
    if (cfg.touch) return;
    gsap.utils.toArray('[data-depth]').forEach((el) => {
      const d = parseFloat(el.dataset.depth) * 40;        // depth 0.6 = 24px each way
      gsap.fromTo(el, { y: -d }, {
        y: d, ease: 'none',
        scrollTrigger: { trigger: el.closest('.shot'), start: 'top bottom', end: clamp('bottom top'), scrub: cfg.scrub }
      });
    });
  }
```

### 3. Hover and focus: the underline draws
Only a project name that is a real link reacts, and nav links. The underline is an accent line that grows with `transform: scaleX`. Keyboard focus does exactly what hover does, plus the outline. Nav hover and focus are in the frame CSS above.
```css
/* Only titles that are real links react. The underline draws with transform, so nothing re-lays out. */
.project__title a { position: relative; display: inline-block; min-height: 44px; color: inherit; text-decoration: underline 1px var(--color-accent); text-underline-offset: 0.12em; /* a resting cue, so the link reads as a link without hover */ transition: color 240ms var(--ease-dissolve); }
.project__title a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--color-accent);
  transform: scaleX(0); transform-origin: left center; transition: transform 300ms var(--ease-dissolve); }
.project__title a:focus-visible { color: var(--color-accent); }
.project__title a:focus-visible::after { transform: scaleX(1); }
@media (hover: hover) {
  .project__title a:hover { color: var(--color-accent); }
  .project__title a:hover::after { transform: scaleX(1); }
}
```

### 4. Navigation: links travel, the caption cuts
Links move the scroll with Lenis (about 1.4 seconds, ease-out; on touch screens the browser's own jump), update the address bar, and move keyboard focus to the section. The caption in the bottom bar cuts (no fade) to the current section name, the current nav link gets `aria-current` and an accent underline, and a progress line shows real scroll progress. After a jump, the chosen section stays selected until the visitor scrolls on their own (wheel, touch, scroll keys) or that section leaves the screen. A short last shot is handled: the very top is always Home and the very bottom is always the last shot. Opening the page with a `#hash` lands on that shot.
```js

  // 4. Navigation. A thin accent line shows real scroll progress; the caption cuts to the current section's name;
  // links travel with Lenis. After a jump the chosen section stays selected until the visitor scrolls on their own.
  function progressLine() {
    gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
  }

  function setupNav(lenis) {
    const links = [...document.querySelectorAll('.frame a[href^="#"]')];
    const caption = document.querySelector('.caption');
    const shots = gsap.utils.toArray('main .shot');
    const isShot = (id) => shots.some((shot) => shot.id === id);
    const abort = new AbortController();                  // one switch removes every listener below
    const opts = { passive: true, signal: abort.signal };
    let current = '';
    let lockId = '';                                      // the section a nav jump chose

    function select(id) {
      if (lockId && id !== lockId) {
        const box = document.getElementById(lockId).getBoundingClientRect();
        if (box.bottom > 0 && box.top < window.innerHeight) return;  // the jumped-to section is still on screen: keep it
        lockId = '';                                      // it left the screen: let the spy take over
      }
      if (id === current) return;
      current = id;
      links.forEach((a) => (a.hash === '#' + id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
      const link = links.find((a) => a.hash === '#' + id);
      if (caption && link) caption.textContent = link.textContent;   // decoration: mirrors the real section name
    }

    function jumpTo(id, immediate) {
      const target = document.getElementById(id);
      if (!target || !isShot(id)) return;
      lockId = id;
      select(id);
      if (lenis) lenis.scrollTo(id === 'home' ? 0 : target, { immediate, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
      else if (id === 'home') window.scrollTo(0, 0);
      else target.scrollIntoView();
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }

    document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', (event) => {
      if (!isShot(a.hash.slice(1))) return;               // the skip link and anything else keeps its normal behaviour
      event.preventDefault();
      history.pushState(null, '', a.hash);
      jumpTo(a.hash.slice(1));
    }, { signal: abort.signal }));
    window.addEventListener('hashchange', () => jumpTo(location.hash.slice(1)), { signal: abort.signal });

    // The visitor scrolling on their own ends the lock.
    const release = () => { lockId = ''; };
    window.addEventListener('wheel', release, opts);
    window.addEventListener('touchmove', release, opts);
    window.addEventListener('keydown', (event) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) release();
    }, { signal: abort.signal });

    function watchShots() {
      shots.forEach((shot) => ScrollTrigger.create({
        trigger: shot, start: 'top 50%', end: 'bottom 50%',          // the middle of the screen picks the section
        onToggle: (self) => { if (self.isActive) select(shot.id); }
      }));
      // The very top is always Home, the very bottom is always the last shot (a short last shot may never reach the middle).
      ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: (self) => {
          if (self.scroll() < 8) select(shots[0].id);
          else if (self.progress > 0.999) select(shots[shots.length - 1].id);
        }
      });
      select(shots[0].id);
    }

    return { jumpTo, watchShots, destroy() { abort.abort(); } };
  }
```

### 5. Signature: the title card
At load the name sits in the half-closed letterbox with its letters slightly apart and a little soft. During the first screen of scrolling (a pin of one screen, 70% of a screen on touch devices) the letterbox opens to its real size and the letters gather into the name, finishing at about 70% of the pin. Then the card dissolves and About rises in. The heading keeps one accessible name: SplitText's `aria: 'auto'` puts an `aria-label` on the `<h1>` and hides every letter piece from screen readers. `autoSplit: true` re-splits the name when the width changes or the font arrives, so the letters never wrap badly at 320px, and returning the animation from `onSplit` lets SplitText rebuild it on the new letters. This snippet also closes the wrapper.
```js

  // 5. Signature: the title card. The first scroll opens the letterbox and the name assembles from its letters.
  function shotHome(cfg) {
    const end = cfg.touch ? '+=70%' : '+=100%';           // the pin lasts at most one screen of scrolling
    gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '#home', start: 'top top', end, pin: true, anticipatePin: 1, scrub: cfg.scrub,
        invalidateOnRefresh: true                         // the bar sizes below depend on the screen height, so re-measure on resize
      }
    })
      // The bars start tall (20% of the screen each) and open to their real size.
      .fromTo('.letterbox', { scaleY: (i, bar) => (window.innerHeight * 0.2) / bar.offsetHeight }, { scaleY: 1, duration: 0.7 }, 0)
      .set({}, {}, 1);                                    // the card holds, fully formed, to the end of the pin

    // Hand-off: the title card dissolves while About rises over it. Fading it inside the pin instead
    // leaves a whole screen of empty ink between the two shots.
    gsap.to('.hero-inner', {
      opacity: 0, scale: 0.94, ease: 'none',
      scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'top 35%', scrub: cfg.scrub }
    });

    // The name: autoSplit re-splits when the width changes or the font loads. Returning the animation lets
    // SplitText throw it away and rebuild it on the new letters, so nothing is ever left half-split.
    SplitText.create('.title-card', {
      type: 'words,chars', wordsClass: 'word', charsClass: 'char',
      tag: 'span',                                        // valid HTML inside a heading (the default is div); CSS sets their display
      aria: 'auto',                                       // aria-label on the h1, aria-hidden on every piece: the name is read once
      autoSplit: true,
      onSplit(split) {
        const from = {
          xPercent: (i, el, all) => (i - (all.length - 1) / 2) * (window.innerWidth < 640 ? 7 : 18), // spread out from the middle letter; less on phones so the end letters are not clipped
          yPercent: (i) => (i % 2 ? 20 : -20),                          // odd letters start low, even letters high
          opacity: 0.55,                                                // the name stays readable before the first scroll
          stagger: { amount: 0.3, from: 'center' }, duration: 0.4, ease: 'power2.out'
        };
        if (!cfg.touch) from.filter = 'blur(3px)';
        // start: 0, not 'top top': #home is pinned by the timeline above, and a trigger that is pinned measures from the end of its pin.
        return gsap.timeline({ scrollTrigger: { trigger: '#home', start: 0, end, scrub: cfg.scrub } })
          .from(split.chars, from, 0)
          .set({}, {}, 1);                                // pads the timeline to 1 so letters settle at 70% of the pin
      }
    });
  }
})();
```

## Working on the film
How to add a new shot (for a section that SPEC.md adds later):
1. In `index.html`, copy a `<section class="shot shot--name" id="name">` block, with its `shot__grade` div, a real `<h2 class="shot__title" data-depth="0.6">` and the real content. Add its link to the nav.
2. In the tokens add `--grade-name`, and in the base CSS add `.shot--name { --grade: var(--grade-name); }`. Compute the contrast of the text and the accent on it.
3. In `script.js` copy `shotAbout`, rename it `shotName`, and change the transition. Dissolve is `opacity`. Wipe is `clip-path: inset(...)`. Iris is `clip-path: circle(...)`. Push-in is `scale` plus `opacity`. Call it in the list in `matchMedia`, in page order.
4. Check it at 320px, at 1280px and with reduced motion turned on.

How to tune timing:
- `scrub: 0.8` is how far the film trails your scroll. Lower is snappier; `true` follows exactly. Phones use `true`.
- Each `start` and `end` reads "this part of the element meets this part of the screen". `start: 'top 80%', end: 'top 40%'` means: begin when the element top reaches 80% of the way down the screen, finish at 40%. A shorter distance is a faster reveal.
- `stagger` spreads letters, words or lines in time. `duration` inside a scrubbed timeline is only relative to the other parts.
- `end: '+=100%'` on the pin is one screen of scrolling. Do not go above `'+=100%'`: a longer pin makes the page feel stuck.
- `lerp: 0.09` in Lenis is the wheel's inertia: lower is heavier and longer.

How to debug: set `const DEBUG = true;` at the top of `script.js`. ScrollTrigger then draws a green start marker and a red end marker for every trigger, so you can see where each reveal begins and ends. In the browser console, `ScrollTrigger.getAll()` lists the triggers and `ScrollTrigger.refresh()` re-measures. **Set `DEBUG` back to `false` before publishing**, or the markers show on the live site.

Gotchas found while testing (they cost time, so they are written down):
- Do not set `invalidateOnRefresh: true` as a default. It makes `from()` tweens lose their start state when ScrollTrigger refreshes, and elements appear fully revealed before you scroll. Turn it on only for the one trigger that measures the screen (the letterbox in `shotHome`).
- A trigger that is already pinned by another ScrollTrigger measures from the end of the pin. The letters use `start: 0` for that reason.
- SplitText makes `<div>`s unless you pass `tag: 'span'`, and a `<div>` inside an `<h1>` or `<p>` is invalid HTML. With `span`, CSS gives the pieces their `display`.
- `aria: 'auto'` is for headings. A paragraph cannot carry an `aria-label`, so paragraphs use `aria: 'none'` and stay readable as they are.
- Reduced motion and phones: a different branch runs, so test all three (mouse, touch, reduced) after every change.

## Reduced motion
The film never starts: no Lenis, no scrub, no pins, no splits, no letterbox, no caption, no progress line. The visitor gets the clean layout with the same content: a solid header, five stacked shots with their grades, readable type. The script does this itself through `matchMedia`, and the CSS below is a safety net that also covers someone who changes the setting while the page is open (GSAP then undoes everything and removes `has-film`). Every hidden starting state in this vibe is an inline style that GSAP sets inside the film, so reverting restores visibility; there are no hidden states in the stylesheet.
```css
/* Reduced motion: the script never starts the film (no Lenis, no pins, no scrub, no splits), so this is the complete layout.
   These rules are a safety net, and also cover anyone who flips the setting while the page is open. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .letterbox, .progress, .caption { display: none !important; }
  .shot__grade { opacity: 1 !important; clip-path: none !important; transform: none !important; }
  .frame { background: var(--color-bg) !important; border-bottom-color: var(--color-border) !important; }
}
```
Touch devices (`(hover: none) and (pointer: coarse)`): Lenis is off, so scrolling is the phone's own; scrub is `true` (no trailing); parallax and the blur are off; the pin is 70% of a screen.

## Libraries
This is the one place AGENTS.md's no-library rule (and rule 5 of `portfolio-structure`) is waived, and only because the student picked a frontier vibe. Load only these four, pinned, from jsDelivr, as `defer` script tags in the order shown in the page example (no build step). Nothing else: no jQuery, no extra plugins, no three.js.

| Library | Version | Licence | Download (minified, gzipped) | Used for |
|---|---|---|---|---|
| GSAP core | 3.13.0 | GSAP "no charge" standard licence (free, including all plugins since 3.13; not open source, read gsap.com/standard-license) | 72 KB (28 KB) | timelines, tweens, matchMedia, ticker |
| ScrollTrigger | 3.13.0 | same | 44 KB (18 KB) | scrubbing and pinning |
| SplitText | 3.13.0 | same | 7 KB (3.5 KB) | splitting the name, headings and lines |
| Lenis | 1.3.25 | MIT | 18 KB (5.3 KB) | smooth wheel scrolling |

About 141 KB in total, about 55 KB gzipped, cached after the first visit. That is light for a phone, and on touch devices Lenis is not even started. The cost is complexity: a tangle of start and end values, so keep the structure above.

Optional (only if the student asks and says "yes, install"): a Vite build with `npm install gsap@3.13.0 lenis@1.3.25`, `import { gsap } from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger'; import { SplitText } from 'gsap/SplitText'; import Lenis from 'lenis';`, and Firebase serving the `dist` folder. This changes the deploy setup and is gated by AGENTS.md. The no-build path above is the main one.

If a library fails to load (offline, blocked), the guard at the top of `script.js` stops the script, `has-film` is never added, and the visitor sees the static layout: a complete portfolio. Test it once by blocking `cdn.jsdelivr.net` in DevTools.

Performance target: a steady 60fps scrolling on a mid laptop and no jank on a mid phone. How it is met: only `transform`, `opacity`, `clip-path` and `filter` animate; GSAP's own ticker is the only loop (Lenis is driven by it, so there is one loop, not two) and browsers pause it in hidden tabs; blur is used on roughly a dozen elements and only with a mouse; parallax is one tween per heading; the letterbox bars are `will-change: transform`; splits are limited to the name, the headings and one paragraph; there are no images, videos or canvases; `ignoreMobileResize` stops address-bar changes from re-measuring everything. If scrolling stutters on a low-power screen, remove the blur first, then the parallax.

Do not add film grain, a vignette over the text, a video background or a canvas. They cost frames and add nothing the grades do not already say.

## Avoid
- Pins longer than one screen, snap scrolling, a "scroll to continue" lock, or anything that moves the page by itself. The visitor owns the scrollbar.
- Using both Lenis and a big `scrub` number on a phone (double smoothing feels like lag), and using `scrub` with `ease` other than `'none'` on transitions.
- Splitting body paragraphs into letters or words, or leaving `aria: 'auto'` on a `<p>`. Only the name, headings and (by line) one paragraph are split.
- Hidden starting states in CSS, `visibility: hidden`, or text that stays invisible if the libraries fail.
- Animating `width`, `height`, `top` or `left`, or leaving `will-change` on everything.
- Fake film information: timecodes, "REC", frame counters, "Scene 1 / Take 3", credits, runtimes, laurels, fake film-stock or camera names, made-up festival names.
- Left-over `markers: true` (the `DEBUG` flag) in the published site.
- One transition used for every shot, a fade-up on every section, an ALL-CAPS label above every heading, "01 / 02 / 03" numbers on things that are not a sequence, a "→" after every link, "A · B · C" meta strings, one headline word picked out in the accent, and the same rounded card with a soft shadow everywhere.
- A neon, acid-green or cream-and-terracotta palette, and Inter on everything.
- Flashing, strobing, or anything that changes faster than three times a second. Everything here is scroll-driven; only the rule drawing on load is timed.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
