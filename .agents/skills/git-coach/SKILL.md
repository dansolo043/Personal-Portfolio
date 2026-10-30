---
name: git-coach
description: Coaches the student to save work with Git commits, push to GitHub, and undo mistakes safely. Use at the start and end of every task, when the student says commit, save, push, GitHub, undo, go back, revert or "I broke it", and whenever a git command prints an error.
---

# Git coach

## Goal
Git is the student's undo button and GitHub is where their project lives online. By the end of the workshop the student's public GitHub repo has at least 5 commits.

## Commands the student may use (keep it to these)
- Save a version: `git add .` then `git commit -m "short message"`
- Send saved versions to GitHub: `git push`
- See saved versions: `git --no-pager log --oneline -n 10`
- Undo a saved version safely: `git revert --no-edit HEAD`
- Throw away changes that are not saved yet: `git restore .`

Run one command at a time. On Windows the terminal is PowerShell, where `&&` may not work.

## Before starting a new task
1. Run `git status` (say what it does first).
2. If there are unsaved changes, remind the student to commit first and suggest a short message, for example `add projects section`.
3. Show the commands. Run them only if the student says yes.

## After a task is done and checked
Remind the student to commit, then push. Suggest the message. Good commit points: SPEC filled in, first version built, vibe applied, each new section, after the first deploy.

## First time in a project: check how it was set up
Run `git status` and `git remote -v`, and explain the result.
- **Made from the workshop template on GitHub and cloned (the normal way):** Git is set up and `origin` points to the student's GitHub repo. Nothing to set up: commit, then `git push`.
- **Downloaded as a ZIP (fallback), "not a git repository":** follow the two steps below.

### ZIP only, step 1: start Git
Explain `git init`, run it after the student agrees, then make the first commit with the message `first version`.

### ZIP only, step 2: put the project on GitHub
1. The student creates a new **public** repository on github.com (New repository, name it something like `portfolio`). They must **not** tick "Add a README", .gitignore or license, because the project already has them.
2. Run, one at a time, explaining each:
   - `git branch -M main` (names the main branch `main`)
   - `git remote add origin https://github.com/<username>/<repo>.git` (tells Git where the GitHub repo is)
   - `git push -u origin main` (sends the commits; later pushes are just `git push`)

## Signing in to GitHub
The first `git push` usually opens a browser window or a sign-in prompt. The student signs in there. Never ask them to type a password or token into the chat or into any file. If the browser sign-in fails and the GitHub CLI is installed, the student can run `gh auth login` themselves.

## Undoing
First ask: is the change already committed?
- Already committed: explain that `git revert --no-edit HEAD` adds a new version that cancels the last one, so nothing is lost. Run it after the student agrees, then push.
- Not committed: explain that `git restore .` throws away unsaved edits and cannot be undone. Ask for a clear yes. It does not remove brand-new files; say so if new files were added.

## Safety rules
- Never run `git reset --hard`, `git push --force`, `git clean -fd` or delete the `.git` folder unless the student clearly asks and you have explained what it does.
- Always say what a command does before you run it.
- Avoid commands that open an editor or a pager: use `--no-edit` and `--no-pager` as shown above.

## Common errors
| Error says something like | Meaning | Fix (explain, then ask before running) |
|---|---|---|
| "Please tell me who you are" / "unable to auto-detect email address" | Git needs a name and email once | Ask for them, then `git config --global user.name "Their Name"` and `git config --global user.email "their@email.com"` |
| "not a git repository" | No Git in this folder (ZIP download) | `git init`, then the ZIP steps above |
| "nothing to commit" | Everything is already saved | Nothing to do |
| "remote origin already exists" | A GitHub address is already set | `git remote -v` to see it; if wrong, `git remote set-url origin <correct-url>` |
| "src refspec main does not match any" | No commit yet, or the branch is not called main | Commit first, then `git branch -M main` |
| "Repository not found" | Wrong address, or signed in to a different GitHub account | Check the URL with `git remote -v` and which account is signed in |
| "Authentication failed" / "password authentication was removed" | GitHub needs a browser sign-in, not the account password | Sign in through the browser prompt (or the student runs `gh auth login`); never paste a token into the chat |
| "Updates were rejected" / "fetch first" | GitHub has commits the laptop doesn't (for example a README made on github.com) | `git pull --no-rebase --no-edit origin main`, then `git push`. If it says "refusing to merge unrelated histories", add `--allow-unrelated-histories` |
