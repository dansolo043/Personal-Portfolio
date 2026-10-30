---
name: vibe-terminal
description: Restyles the portfolio site as a command-line terminal (look, layout and motion). Use ONLY when the student names the vibe-terminal skill or asks for the Terminal vibe. Changes how the site looks and moves, never what it says.
metadata:
  family: generic
  tags: "cs, software-eng, computer-eng"
  intensity: standard
  version: "2"
---

# Vibe: Terminal

## Feel and who it's for
The portfolio reads like a clean, modern terminal session: a dark screen, one signal colour, everything lined up on a monospace grid. It should feel fast and precise, like someone who lives in a shell, not like a hacker movie. Good for CS, software and computer engineering students who want recruiters to see "this person builds things" in the first second.

## Must keep (this is what makes it Terminal)
1. One monospace font for everything, and every block lines up on the character grid.
2. A dark screen with ONE signal colour (green by default) used for prompts, links and the cursor. Long text stays in a bright, readable off-white, never in green.
3. A prompt-and-output structure: each section opens with a short command line (`$ cat about.txt`) and its real content appears as the output.
4. Motion is stepped and instant. Things appear, print and blink. Nothing glides, fades slowly, bounces or eases.
5. The page is one column about 80 characters wide, like a real terminal window.

## Starting defaults (change freely)
The student can change any of these with a prompt such as "make the accent amber". Their request wins.

Palette, in words: near-black with a hint of green for the screen; bright off-white for reading text; a softer grey-green for secondary text; a clear green for prompts, links and the cursor; a dark green for borders.

```css
:root {
  --color-bg: #0A0F0C;
  --color-surface: #101813;
  --color-text: #E8F0EA;
  --color-muted: #9DB5A4;
  --color-accent: #7CF29A;
  --color-border: #24382B;
}
```
Other palettes that still feel like Terminal: amber phosphor (accent `#FFB547` on `#0F0B05`), or ice blue (accent `#7FD4FF` on `#0A0E14`).

Fonts (pick one and use it for everything): JetBrains Mono, IBM Plex Mono or Space Mono.
`<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">`

Spacing, sizes and corner radius are your call. Corners stay square or nearly square.

## Layout ideas
- **Header:** a slim top line with a prompt path such as `~/portfolio $`, followed by the section links. The path updates to show the section on screen (see Navigation below).
- **Hero:** a short boot sequence: `$ whoami`, then the student's real name as a large line and their one-line intro underneath, ending in a blinking block cursor.
- **About:** `$ cat about.txt`, then the real bio as plain paragraphs.
- **Projects:** `$ ls projects/`, then one row per real project, like a long directory listing: name, short description, and a link only if SPEC.md has one. On phones each row stacks.
- **Header on phones:** keep it to one short line. If five links don't fit at 320px, let them wrap to a second row or shrink the nav text slightly; never let them scroll sideways.
- **Skills:** real skills shown as flags, for example `--python --git --html`.
- **Contact:** `$ contact --list`, then the real links, one per line.
- Command labels are decoration that mirror real section names. Mark them `aria-hidden="true"` and keep a real `<h2>` for every section.
- A user name in a prompt (like `sam@portfolio`) may only come from the student's real first name in SPEC.md. If unsure, use `~/portfolio`.

## Make it theirs
- The one loud thing is the boot and the block cursor. Everything else stays calm: no glow, no second accent, no decoration that doesn't carry information.
- The student's own work sets the details. Project rows read like their real files and their real skills become the flags. Never add commands, sections or output that SPEC.md doesn't back up.
- Text is set like a good terminal: generous line height, lines under 80 characters, one clear size step between name, headings and body.

## Motion character
Tempo: instant. Easing: none, only `steps()`. Things appear line by line, like output arriving in a terminal. Nothing slides, scales or fades over time. One short typed command at the start is the only "typing" on the page.

### 1. Page load: boot sequence
The hero's lines print one after another in about one second. This is pure CSS, so the text is in the HTML from the start and still shows if JavaScript fails.

```html
<section class="boot" id="home" aria-labelledby="home-title">
  <p class="boot-cmd" aria-hidden="true">$ <span class="typed">whoami</span></p>
  <h1 id="home-title" class="boot-line boot-name">Sam Rivera</h1>
  <p class="boot-line boot-intro">First-year Computer Science student at York University.<span class="cursor" aria-hidden="true"></span></p>
</section>
```
```css
@keyframes type { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes appear { from { visibility: hidden; } to { visibility: visible; } }
@keyframes blink { 50% { opacity: 0; } }

.typed { display: inline-block; animation: type 420ms steps(6, end) both 150ms; }
.boot-line { animation: appear 0s steps(1) both; }
.boot-name { animation-delay: 650ms; }
.boot-intro { animation-delay: 850ms; }

/* Block cursor: blinks 5 times, then stays solid (anything blinking longer than 5s must be stoppable). */
.cursor {
  display: inline-block;
  width: 1ch;
  height: 1.1em;
  margin-left: 0.25ch;
  vertical-align: text-bottom;
  background: var(--color-accent);
  animation: blink 1s steps(1) 5 1.1s;
}

/* Any key or tap finishes the boot instantly. */
.boot.is-done * { animation: none !important; }
```
```js
const boot = document.querySelector('.boot');
if (boot) {
  const finish = () => boot.classList.add('is-done');
  window.addEventListener('keydown', finish, { once: true });
  window.addEventListener('pointerdown', finish, { once: true });
}
```

### 2. Scroll: sections print
When a section comes on screen, its children appear one after another, top to bottom, once. The hiding class is added by JavaScript, so without JavaScript everything is simply visible. Hidden lines use `opacity`, not `visibility`, so screen readers still read them and Tab still reaches their links; a section prints the moment anything inside it gets focus.

```css
@keyframes print { from { opacity: 0; } to { opacity: 1; } }
.will-print > * { opacity: 0; }
.will-print.is-printed > * { opacity: 1; animation: print 0s steps(1) both; }
.will-print.is-printed > :nth-child(2) { animation-delay: 70ms; }
.will-print.is-printed > :nth-child(3) { animation-delay: 140ms; }
.will-print.is-printed > :nth-child(4) { animation-delay: 210ms; }
.will-print.is-printed > :nth-child(n + 5) { animation-delay: 280ms; }
```
```js
const sections = document.querySelectorAll('main section:not(.boot)');
const printer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Also print sections already scrolled past (for example after a reload).
    if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
      entry.target.classList.add('is-printed');
      printer.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -15% 0px' });
sections.forEach((section) => {
  section.classList.add('will-print');
  printer.observe(section);
});
// Keyboard users: a section prints as soon as Tab lands inside it.
document.addEventListener('focusin', (event) => {
  const section = event.target.closest('.will-print');
  if (section) section.classList.add('is-printed');
});
```

### 3. Hover and focus: inverse video
Links and project rows flip to inverse colours instantly, like a selected line in a terminal. No transition.

```css
a { color: var(--color-accent); text-underline-offset: 3px; }
a:hover,
a:focus-visible {
  background: var(--color-accent);
  color: var(--color-bg);
  text-decoration: none;
  outline: 2px solid var(--color-accent);
  outline-offset: 0;
}
/* Only rows that contain a real link react. */
.project-row:has(a:hover),
.project-row:focus-within { background: var(--color-surface); box-shadow: inset 3px 0 0 var(--color-accent); }
```

### 4. Navigation: the prompt path follows you
The header path changes to the section on screen (`~/portfolio/projects $`). Jumping is instant, like `cd`, and the section heading flashes inverse once when you land.

```html
<p class="prompt-path" aria-hidden="true">~/portfolio<span class="path-dir"></span> $</p>
```
```js
const pathDir = document.querySelector('.path-dir');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && pathDir && window.scrollY >= 8) {
      pathDir.textContent = entry.target.id === 'home' ? '' : '/' + entry.target.id;
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
const allSections = document.querySelectorAll('main section[id]');
allSections.forEach((section) => spy.observe(section));
// Edge cases: at the very top the path is always home (a short hero leaves the middle band in the next section),
// and a short last section may never reach the middle band, so at the very bottom show it anyway.
const checkEnds = () => {
  const last = allSections[allSections.length - 1];
  if (window.scrollY < 8 && pathDir) pathDir.textContent = '';
  else if (last && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    last.classList.add('is-printed');
    if (pathDir) pathDir.textContent = '/' + last.id;
  }
};
window.addEventListener('scroll', checkEnds, { passive: true });
```
```css
html { scroll-behavior: auto; }
section[id] { scroll-margin-top: var(--space-6); } /* use your header's height so it never covers the heading */
@keyframes land { 0%, 60% { background: var(--color-accent); color: var(--color-bg); } 61%, 100% { background: transparent; color: inherit; } }
/* The second selector beats the print rule, which would otherwise cancel this animation. */
section:target > h2,
.will-print.is-printed:target > h2 { animation: land 450ms steps(1) 1; }
```

### 5. Signature: the block cursor
A solid block cursor sits at the end of the hero and blinks five times, then holds still. It is the one thing people remember about this vibe, so keep it exactly one character wide and in the accent colour.

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .will-print > * { opacity: 1; }
}
```

## Libraries
None. Plain CSS and JavaScript only.

## Avoid
- Green body text, or dim green on black that is hard to read.
- Typing out paragraphs character by character. Only the one short hero command is typed.
- Fake system output: boot logs, error messages, IP addresses, loading bars, hostnames.
- CRT scanlines or glow over text.
- Coloured "traffic light" window buttons and other pretend controls that do nothing.
- Smooth fades, slides or bounces. They break the terminal feel.
- Generic page habits: a "→" after every link, "A · B · C" strings, numbering projects 01 / 02 / 03, one word of a heading picked out in the accent.

## Who wins
The student's requests override this skill. The content rules in AGENTS.md always apply.
