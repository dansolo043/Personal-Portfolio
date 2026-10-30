---
name: firebase-ship
description: Deploys the student's portfolio to Firebase Hosting and explains every error in plain language instead of silently fixing it. Use when the student says deploy, publish, ship, go live or put it online, and whenever a firebase command prints an error.
---

# Firebase ship

## Goal
Get the site live at `https://<site-id>.web.app` (normally the site ID is the project ID), and make sure the student understands what happened, especially when something fails.

## Only deploy when asked
Never deploy on your own. The first deploy is the highlight of the workshop, so say clearly what is about to happen and wait for a yes.

## Before deploying, check (say each check out loud)
1. You are in the project folder that contains `firebase.json`. Do not run `firebase init`: the config is already there and `init` could overwrite it.
2. `public/index.html` exists.
3. The student is logged in: `firebase projects:list` should print their projects.
4. You know the project ID. If not, ask the student to pick it from the `projects:list` output.
5. The project has a Hosting site: `firebase hosting:sites:list --project <project-id>`. Projects created after Oct 15, 2026 start with no site. If the list is empty, explain that Firebase needs a "site" (the address the page lives at), ask, then run `firebase hosting:sites:create <project-id> --project <project-id>`. If that ID is taken, suggest `<project-id>-portfolio` and tell the student the URL will use that name.

## Deploy
Run: `firebase deploy --only hosting --project <project-id>`
When it finishes, show the Hosting URL from the output. Tell the student to open it on their phone. Then remind them to commit and push (git-coach). The `.firebase/` folder and `firebase-debug.log` that deploys create are already in `.gitignore`.

## When a command fails
Do NOT silently try fixes. Always:
1. Show the exact error text.
2. Explain in plain language what it means.
3. Name the most likely cause and the fix command.
4. Ask before running the fix.

Likely errors and fixes (wording of errors may differ slightly):
| Error says something like | Meaning | Fix |
|---|---|---|
| "running scripts is disabled on this system" (Windows PowerShell) | Windows blocks the `firebase` script | Run the same command with `firebase.cmd` instead of `firebase`. Changing the execution policy is a security setting: only the student may do it, in their own PowerShell window, if a mentor says so |
| "firebase is not recognized" / "command not found" | The Firebase tool is not installed, or the terminal needs reopening | Reopen the terminal; if still failing: `npm install -g firebase-tools` |
| "EACCES" or "permission denied" while installing (Mac) | npm may not write to its default folder | `sudo npm install -g firebase-tools` (the student types their laptop password themselves) |
| "Failed to authenticate, have you run firebase login?" | Not logged in, or the login expired | The student runs `firebase login` (or `firebase login --reauth`) themselves; it opens a browser |
| "Failed to get Firebase project" / no project found | Wrong project ID, or a different Google account is logged in | `firebase projects:list` to see the right ID; `firebase login:list` to check the account |
| No default Hosting site / asks for a site ID | The project has no Hosting site yet | `firebase hosting:sites:create <project-id> --project <project-id>`, then deploy again |
| Site ID "already exists" or "not available" | Someone else has that site name | Try `<project-id>-portfolio`; the URL becomes `https://<that-id>.web.app` |
| "403" or "caller does not have permission" | Logged in with a Google account that does not own this project | The student runs `firebase logout`, then `firebase login` with the account that created the project |
| "Not in a Firebase app directory" / "could not locate firebase.json" | The terminal is in the wrong folder, or `firebase.json` is missing | Move to the project folder; check `firebase.json` is there and matches the original |
| Network errors, timeouts | Campus Wi-Fi hiccup | Wait a few seconds and retry the same command once |

If the error is not in this table, show it, explain what you can, and tell the student to ask a mentor. Do not guess.

## Never
- Never change `firebase.json` or `.firebaserc` to make an error go away without explaining the change and getting a yes.
- Never upload anything outside `public/`.
- Never change system or security settings (execution policy, `sudo` commands) yourself; the student runs those.
