# Lighthouse: local usage

This project ships with convenience scripts to run Lighthouse locally against your dev server.

Prerequisites

- Node + pnpm installed
- Dev server running (in another terminal):
  pnpm dev

Commands

1. Prepare output directory (run once):
   pnpm lh:prepare

2. Run desktop Lighthouse on key routes:
   pnpm lh:home
   pnpm lh:projects
   pnpm lh:work

Outputs

- HTML reports are written to ./.lighthouse/:
  - home.desktop.html
  - projects.desktop.html
  - work.desktop.html

Tips

- Close heavy apps to reduce noise in local results.
- For mobile profiles, adjust the scripts (use --preset=mobile) or add new ones.
- For PR-level checks, see .lighthouserc.json and the GitHub Action which runs Lighthouse CI automatically.
