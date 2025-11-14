Title: Smooth Scrollbar + GSAP Integration Plan

Objective

- Replace GSAP ScrollSmoother + native page scroll with a container-based scroller (Smooth Scrollbar) that hides native scrollbars, provides a normalized scroll state, and enables a branded progress-indicator scrollbar.

Scope

- Global shell (wrap the entire app in a single scroll root).
- Home (Hero) and Work pages: migrate timelines from ScrollSmoother to ScrollTrigger with scrollerProxy.
- Add a lightweight, non-blocking progress bar (vertical) bound to global scroll progress.

Constraints

- Prefer reduced motion: retain native scroll + static states.
- Avoid breaking current timelines; preserve pin/scrub semantics.
- Defer dependency install; dynamically import Smooth Scrollbar with graceful fallback.

Phases

1. Shell Scroller Provider
   - Add a client component `ScrollProvider` that:
     - Creates `#scroller[data-scrollbar]` container (100dvh, overflow hidden).
     - Dynamically imports `smooth-scrollbar` and initializes it (damping, alwaysShowTracks).
     - Registers `ScrollTrigger.scrollerProxy` and `ScrollTrigger.defaults({ scroller })`.
     - Hides document-level scroll (set `html, body` overflow hidden) while active.
     - Computes `progress = offset.y / limit.y` and renders a small vertical progress bar.
     - Fallback: if import fails or reduced motion, do nothing (native scroll) and compute progress from window scroll.

2. Wire Provider in Shell
   - Wrap `ClientAppShell` with `ScrollProvider` inside `components/shell/Body.tsx`.

3. Migrate Home Hero
   - Remove `ScrollSmoother` import/registration from `app/(home)/hooks/use-hero-animations.ts`.
   - Remove creation/kill of `ScrollSmoother` instance; keep `ScrollTrigger` timelines unchanged (now proxied to scroller).
   - Keep reduced motion path.

4. Migrate Work Page
   - Remove `ScrollSmoother` import/registration; delete init/kill in `WorkPageContent.client.tsx`.
   - Keep existing `ScrollTrigger` usage and animations.

5. CSS and Cleanup
   - Ensure `#scroller` spans the viewport; rely on provider to manage document overflow.
   - Keep WebKit scrollbar styling temporarily; remove later once custom bar is approved.

Validation

- Dev: run `pnpm dev` and verify:
  - Native scrollbar no longer scrolls the document (when Smooth Scrollbar loads).
  - ScrollTrigger pin/scrub works (hero pin, cover fill, work timeline reveals).
  - Progress bar grows/shrinks with page scroll.
  - Reduced motion: no custom scroller; native scroll works.

Follow-ups

- Style Smooth Scrollbar’s own track/thumb to match brand (optional, phase 2).
- Replace temporary vertical bar with the library’s track if preferred.
- Remove WebKit scrollbar CSS once final design is approved.
