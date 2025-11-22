# Scrolling, Custom Scrollbar, and Progress Integration

This document explains how the site at https://www.vincentsaisset.com achieves hidden native scrollbars with a custom scrollbar and how a similar approach can be adopted here, integrated with our GSAP animation system. It also documents our current scrolling + GSAP usage and outlines a migration plan to a container‑based scrolling model with a progress indicator.

## What Vincent Saisset’s Site Does

- Uses a container‑based scrolling library (Smooth Scrollbar) instead of the browser’s page scroll, which:
  - Prevents the OS/native scrollbars from showing at the document level.
  - Injects its own DOM for tracks/thumbs (e.g., `.scrollbar-track-y`, `.scrollbar-thumb-y`).
  - Provides a normalized scroll state with `offset` and `limit` values.
- Computes a global progress ratio and feeds it into animations:
  - `window.progress = scrollbar.offset.y / scrollbar.limit.y`
  - Animations (GSAP/Pixi) read this value to drive timeline progress and visual effects.
- Keeps a fixed, full‑viewport canvas for visuals while content is scrolled in the managed container.

### Key DOM/CSS Patterns

- Scroll root element has `data-scrollbar` and `overflow: hidden`.
- Library injects:
  - `.scroll-content` wrapper for the site content.
  - `.scrollbar-track.*` and `.scrollbar-thumb.*` elements for custom scroll UI.
- Inline CSS sets positioning/opacity/size for tracks/thumbs; tracks can be always visible.

### Scrolling API

- Instance exposes `offset` (current x/y), `limit` (max x/y), and methods like `scrollTo(x, y, duration)` and `setMomentum`.
- Progress: `progress = offset.y / limit.y`.

## Our Current Implementation (This Repo)

We currently use GSAP and ScrollTrigger extensively, with ScrollSmoother where appropriate.

- Home page hero: `app/(home)/hooks/use-hero-animations.ts`
  - Registers `ScrollTrigger` and `ScrollSmoother`.
  - Creates `ScrollSmoother` over `#smooth-wrapper` (wrapper) and `#smooth-content` (content) using `SCROLL_SMOOTHER_CONFIG` from `app/(home)/components/Hero/hero.constants.ts`.
  - Drives multiple scroll‑based timelines (pinning, scrubbed transforms, cover/fill parallax, z‑index switching, etc.).
- Work page: `app/work/_components/WorkPageContent.client.tsx` and `app/work/_components/WorkTimeline.client.tsx`
  - Also uses `ScrollSmoother` for smooth transforms and `ScrollTrigger` to reveal/animate sections.
- Global CSS (`app/globals.css`) customizes WebKit scrollbars (width, track, thumb) but does not hide them. Document scroll remains native.

In short, we use native page scroll + GSAP ScrollTrigger, with optional smoothing from ScrollSmoother (which transforms the content) and a custom‐styled OS scrollbar.

## Why Move to a Container‑Based Scroller

- Precise control over scroll UI (tracks/thumbs) across platforms.
- A single source of truth for normalized progress.
- Tighter synchronization between scroll delta and visual effects.
- Ability to hide OS scrollbars entirely and present a branded progress indicator.

## Integration Approach for This Repo

We will replace ScrollSmoother with a container‑based scroller (Smooth Scrollbar) and integrate GSAP’s ScrollTrigger using `scrollerProxy`. We’ll also add a vertical progress indicator that doubles as our custom scrollbar.

### 1) Install and Wire Up Smooth Scrollbar

- Add dependency: `pnpm add smooth-scrollbar`
- Choose a single scroll root (e.g., `main#scroller[data-scrollbar]`) wrapping the entire page content.
- Initialize Smooth Scrollbar on mount (client‑only):

```ts
import Scrollbar from "smooth-scrollbar";

const container = document.querySelector("#scroller") as HTMLElement;
const scrollbar = Scrollbar.init(container, {
  damping: 0.1,
  thumbMinSize: 20,
  renderByPixels: true,
  alwaysShowTracks: true,
  continuousScrolling: false,
});
```

### 2) Hide Native Scrollbars and Style Custom Track/Thumb

- Ensure `html, body { height: 100%; overflow: hidden; }` and the scroll root covers the viewport.
- Keep container `overflow: hidden` (library manages content).
- Customize `.scrollbar-track-y` and `.scrollbar-thumb-y` via CSS to match brand (thicker track, gradient thumb, etc.).

### 3) Compute and Expose Progress

- Listen for updates and compute: `progress = scrollbar.offset.y / scrollbar.limit.y`.
- Expose `progress` via a small store/hook so components and animations can consume it.

### 4) Integrate with GSAP ScrollTrigger

Replace ScrollSmoother with Smooth Scrollbar by proxying scroll to ScrollTrigger:

```ts
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);

const scroller = document.querySelector("#scroller") as HTMLElement;
const scrollbar = Scrollbar.init(scroller, {
  /* options */
});

ScrollTrigger.scrollerProxy(scroller, {
  scrollTop(value?: number) {
    if (arguments.length && typeof value === "number") {
      scrollbar.scrollTo(0, value, 0);
    }
    return scrollbar.offset.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: innerWidth, height: innerHeight };
  },
  pinType: "transform", // Smooth Scrollbar transforms content
});

ScrollTrigger.defaults({ scroller });

scrollbar.addListener(() => ScrollTrigger.update());
```

- Update existing triggers/timelines to target `scroller` (either via `ScrollTrigger.defaults` or per‑trigger `scroller: scroller`).
- For pinned sections, ensure `pinType` is set to `transform` (as above). Avoid mixing with ScrollSmoother.

### 5) Progress Bar UI Variants

- Use Smooth Scrollbar’s Y track as the brand bar:
  - Increase track width.
  - Style thumb as the “fill”; it already reflects progress (_top + height_ map to content progress).
- Or add a separate, fixed progress bar:
  - Vertical bar bound to `progress` (height = `progress * 100%`), positioned at the right edge.
  - Horizontal bar at top using `transform: scaleX(progress)`.

### 6) Accessibility and Reduced Motion

- Respect `prefers-reduced-motion`: do not initialize Smooth Scrollbar; use native scroll and static states.
- Ensure focus outlines, skip links, and `scrollIntoView` use the scrollbar API (`scrollbar.scrollTo`).

### 7) Performance Notes

- Keep `damping` conservative to avoid disconnect between input and visuals.
- Don’t update heavy layout styles on every frame; drive properties with transforms.
- Batch GSAP updates by debouncing progress listeners if needed (ScrollTrigger handles most efficiently once proxied).

## Migration Checklist (High Level)

1. Add Smooth Scrollbar and a `#scroller` root in our shell (wrap app content).
2. Initialize the scrollbar in a client component and compute `progress`.
3. Replace `ScrollSmoother` with `ScrollTrigger.scrollerProxy` to hook GSAP to our container.
4. Update all `ScrollTrigger` timelines to use the proxied scroller.
5. Add/stylize a vertical progress bar (either customize Smooth Scrollbar’s track or add a separate bar bound to `progress`).
6. Remove/disable our WebKit scrollbar CSS once the custom bar is in place.
7. Add reduced‑motion guards and accessible scroll methods.

## File Touchpoints in This Repo

- `components/shell/Body.tsx` — ideal place to wrap the app in a `#scroller` and to mount the client scroller initializer.
- `app/(home)/components/HomePageContent.tsx` — currently defines `#smooth-wrapper` and `#smooth-content` for ScrollSmoother. These can be simplified when switching to Smooth Scrollbar.
- `app/(home)/hooks/use-hero-animations.ts` — heavy use of `ScrollTrigger` and `ScrollSmoother`; migrate to `scrollerProxy` and remove `ScrollSmoother`.
- `app/work/_components/WorkPageContent.client.tsx` — same idea: remove `ScrollSmoother`, configure `scrollerProxy`.
- `app/globals.css` — remove or disable WebKit scrollbar styles; add custom track/thumb or progress bar styling.

## Example: Minimal Client Initializer

```tsx
"use client";
import { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const scrollbar = Scrollbar.init(el, {
      damping: 0.1,
      alwaysShowTracks: true,
      renderByPixels: true,
    });

    ScrollTrigger.scrollerProxy(el, {
      scrollTop(value?: number) {
        if (arguments.length && typeof value === "number") {
          scrollbar.scrollTo(0, value, 0);
        }
        return scrollbar.offset.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: innerWidth, height: innerHeight };
      },
      pinType: "transform",
    });

    ScrollTrigger.defaults({ scroller: el });
    scrollbar.addListener(() => ScrollTrigger.update());

    return () => {
      scrollbar.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div id="scroller" ref={scrollerRef} data-scrollbar className="h-[100dvh] overflow-hidden">
      <div>{children}</div>
    </div>
  );
}
```

With this in place, existing GSAP `ScrollTrigger` animations keep working by referencing the proxied `scroller`. The vertical track/thumb provided by Smooth Scrollbar can be styled to act as your progress bar, or a separate progress element can be bound to the computed ratio.

---

If you want, we can follow the migration checklist and implement the provider, proxy, and a branded progress bar in a separate PR.
