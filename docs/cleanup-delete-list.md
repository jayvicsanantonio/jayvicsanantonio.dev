# Cleanup: Unused Components, Hooks, UI, and Dev/Seasonal Files

This document lists files and dependencies proposed for removal from `jayvicsanantonio.dev`, based on analyzer output and manual verification. It is intended for review before applying deletions.

Generated: 2025-09-06

Methodology

- Tools: unimported (with app/ as entry points), ts-prune (excluding .next and reports), custom asset scan
- Notes:
  - knip was not run due to an ESLint integration conflict; we can revisit if needed
  - Next.js special files may appear “unimported” but are auto-loaded by the framework

Scope approved by owner

- Only this repo
- Include public assets (no unused assets detected in the latest scan)
- Remove special files that are seasonal/dev-only (but keep framework-required files)

Proposed removals

1. Dev-only or seasonal

<!-- Sentry demo route no longer applies -->

- components/dev/VTDiagnostics.tsx (developer diagnostics)
- components/pages/HolidayLights.tsx (seasonal UI, not imported)

2. Unused components (pages/UI) and related icons

- components/pages/Footer.tsx
- components/pages/Header.tsx
- components/pages/home/SocialMediaIconButton.tsx
- components/pages/Icon.tsx
- components/pages/IconButton.tsx
- components/pages/MainMenu.tsx
- components/pages/ProjectButton.tsx
- components/pages/ScrollDown.tsx
- components/icons/Bluesky.tsx

3. Unused UI primitives (not referenced by app)

- components/ui/breadcrumb.tsx
- components/ui/breadcrumb/Breadcrumb.tsx
- components/ui/breadcrumb/BreadcrumbEllipsis.tsx
- components/ui/breadcrumb/BreadcrumbItem.tsx
- components/ui/breadcrumb/BreadcrumbLink.tsx
- components/ui/breadcrumb/BreadcrumbList.tsx
- components/ui/breadcrumb/BreadcrumbPage.tsx
- components/ui/breadcrumb/BreadcrumbSeparator.tsx
- components/ui/button.tsx
- components/ui/card.tsx
- components/ui/card/Card.tsx
- components/ui/card/CardContent.tsx
- components/ui/card/CardDescription.tsx
- components/ui/card/CardFooter.tsx
- components/ui/card/CardHeader.tsx
- components/ui/card/CardTitle.tsx
- components/ui/input.tsx
- components/ui/label.tsx
- components/ui/textarea.tsx

4. Unused hooks

- hooks/use-local-storage.ts
- hooks/useBoop.ts
- hooks/useEscapeKey.ts
- hooks/useLetterReveal.ts
- hooks/useScrollToTop.ts
- hooks/useWindowSize.ts

5. Unused types

- types/stroke-line-cap.ts
- types/stroke-line-join.ts

Keep (flagged by analyzers but intentionally retained)

- Next app-router by-convention files (default exports):
  - app/layout.tsx, app/not-found.tsx, app/global-error.tsx (ts-prune false positives)

Dependencies proposed for removal

- @radix-ui/react-label
- @radix-ui/react-slot
- @radix-ui/react-toast
- react-syntax-highlighter
- tailwindcss-animate

Retain (was reported but actually used)

- @tailwindcss/postcss (used in postcss.config.mjs)

Suggested removal commands (to run after approval)

- pnpm remove @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-toast react-syntax-highlighter tailwindcss-animate

Suggested file deletions (to run after approval)

- Remove all files under sections (1)-(5) above

Post-removal verification

- pnpm type-check
- pnpm check
- pnpm build
- Manual check: /, /projects, /work, email API (/api/send)

Notes

- No public assets were identified as unused in the latest conservative scan
- If desired, we can run a stricter asset scan against code-only paths and re-check
