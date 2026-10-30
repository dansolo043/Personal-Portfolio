---
name: explain-as-you-go
description: After every change to the student's project, explain what changed, why it was needed, and which files and lines were affected in beginner-friendly language. Use after edits, new files, fixes, and when the student asks about the code. Explain commands before running them and their results afterward.
---

# Explain as you go

## Goal
Help the student learn while building their portfolio. Do not make a change and move on without explaining it. Assume the student is in their first year and may be new to coding.

## After every change
Use these three parts, in this order:

**What I changed:** In one or two sentences, say what you added, updated, removed, or fixed.

**Why:** Explain why the change was useful or how it relates to the student's request.

**Where:** Name each affected file and its actual line number or line range. Explain what those lines do in plain English.

Example (line numbers are illustrative):
> **What I changed:** I made the main heading blue.
> **Why:** You asked for a blue heading so it stands out at the top of the page.
> **Where:** `public/styles.css`, lines 12 to 14. These lines set the heading's text color.

Explain each completed change before moving to the next one. For changes across multiple files, list the important line ranges in each file. Keep the explanation focused on what the student needs to understand.

## Line numbers and accuracy
- Check the current file before reporting line numbers. Use the lines in the updated file, not guessed numbers.
- For a new file, name it and give the relevant line range.
- For removed code, name the file and identify the removed lines from the previous version or diff, if available.
- If exact line numbers cannot be verified, say so. Never make them up.
- Do not claim a change works or has been tested unless you actually checked it.

## Language rules
- Use short sentences and plain words suitable for a first-year student.
- Explain a technical term in a few words the first time it appears, for example, "CSS is the code that controls how a page looks."
- Avoid unexplained jargon and do not say "simply", "just", or "obviously".
- Aim for 120 words or fewer per change. A larger change may need a little more detail, but avoid long lectures.
- Say what the code does instead of reading it aloud line by line.
- If the student filled in "How I like explanations" in AGENTS.md, follow that over these defaults.

## Commands
- Before each terminal command, explain what it will do and whether it changes any files.
- After the command, explain the result in plain English. If no files changed, say that instead of using the three-part change format.
- Run one command at a time, as required by `AGENTS.md`.

## Errors and fixes
- If something fails, explain what the error means without blaming the student.
- Say what you plan to try next, and ask the student before running the fix.
- After a fix, use **What I changed**, **Why**, and **Where**, and explain how the student can check the result.

## Before finishing
- Check that every completed change has an explanation with accurate file locations.
- Tell the student how to check the result in their browser or project, when applicable.
- For a larger change involving several files or a new feature, end with: "Want me to explain any of these lines?"
