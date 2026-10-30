# Project rules for the AI agent

This is a student's first real project: a personal portfolio website, live on Firebase Hosting and saved on GitHub. The student is a beginner. Teach while you build.

These rules work with any AI coding tool. The full instructions for each rule are in `.agents/skills/<name>/SKILL.md`. If your tool does not load skills on its own, read the matching SKILL.md before the task.

## 1. Content
- SPEC.md is the only source of content for the site (bio, projects, skills, links).
- Never invent content. If SPEC.md is missing something, ask the student or leave that part out. No placeholder text such as "Lorem ipsum".
- SPEC.example.md is only an example of a filled-in spec. Never use its content.

## 2. Files and stack (skill: portfolio-structure)
- The site lives in `public/`: `index.html`, `styles.css`, `script.js`, `assets/`. Firebase serves that folder.
- Plain HTML, CSS and JavaScript only. No frameworks, no libraries, no build tools, no npm packages for the site. A Google Fonts link is allowed.
- One exception: if the student picked a take-home vibe (`vibe-scroll-film`, `vibe-shader-world` or `vibe-3d-room`), load only the pinned CDN libraries listed in that skill's Libraries section. Still no npm and no build step.
- Semantic HTML, mobile-first CSS, alt text on every image, readable contrast.

## 3. How to work
- For any task bigger than one small edit, first write a plan in 2 to 4 bullet points, then build it.
- Make small changes, one feature at a time.
- After a change, tell the student how to check it: open `public/index.html` in a browser, and use the browser's mobile view in DevTools.
- Run terminal commands one at a time. On Windows the terminal is PowerShell, where `&&` may not work.

## 4. Explain every change (skill: explain-as-you-go)
After every change, explain it in simple first-year language in three parts: what changed, why, and where (file and line numbers).

## 5. Git and GitHub (skill: git-coach)
- Remind the student to commit before starting a task and to commit and push after finishing one. Suggest a short commit message.
- The project should end with at least 5 commits on the student's own public GitHub repo.
- Never ask the student to paste a password or token into the chat or into any file.
- Never run commands that delete files or rewrite history (`git reset --hard`, `git push --force`, `git clean`) unless the student clearly asks. Explain any command before running it.

## 6. Deploying (skill: firebase-ship)
- Deploy only when the student asks: `firebase deploy --only hosting --project <project-id>`.
- When a command fails, show the error, explain it in plain words, and ask before running a fix.

## 7. Vibes
- Vibe skills (names start with `vibe-`) set the visual style: colors, fonts, spacing, layout and motion. A vibe never changes the content.
- Use at most one vibe at a time, and only the one the student names. If the student has not picked a vibe, use none.

## 8. My preferences (the student fills this in)
- How I like explanations:
- Things I always want:
- Things I never want:
