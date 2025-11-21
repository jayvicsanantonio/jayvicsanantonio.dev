# GSAP Scroll Animation Refactor - Design Document

## Architecture Overview

The refactor reorganizes the scroll animation system into a layered architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│  (HomePageContent, WorkPageContent, ScrollProvider)         │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Animation Hooks Layer                      │
│  (useHeroAnimations, useScrollProgress, useScrollReset)     │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                  Animation Helpers Layer                     │
│  (createPillShrinkTimeline, createCoverAnimations, etc.)    │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Utilities Layer                            │
│  (lockScroll, animation constants, timing configs)          │
└─────────────────────────────────────────────────────────────┘
```

## Module Structure

### 1. ScrollProvider System

**Current State:**

- Single 100+ line component doing scroll reset, progress tracking, and rendering

**New Structure:**

```
components/shell/
├── ScrollProvider.client.tsx          (30 lines - orchestrator)
├── ScrollProgressBar.client.tsx       (25 lines - UI component)
└── Body.tsx                           (unchanged)

hooks/
├── useScrollProgress.ts               (40 lines - progress calculation)
└── useScrollReset.ts                  (60 lines - scroll reset logic)
```

**Responsibilities:**

- `ScrollProvider`: Composition root, renders children + progress bar
- `ScrollProgressBar`: Pure UI component, receives progress prop
- `useScrollProgress`: RAF-based scroll position sampling
- `useScrollReset`: History API management, route change handling

### 2. Hero Animations System

**Current State:**

- Single 888-line file with intro, scroll, and helper functions mixed

**New Structure:**

```
app/(home)/hooks/
├── use-hero-animations.ts             (50 lines - orchestrator)
├── use-hero-intro-animation.ts        (200 lines - intro timeline)
├── use-hero-scroll-animation.ts       (150 lines - scroll timelines)
└── hero-animation-helpers.ts          (400 lines - pure functions)
```

**Responsibilities:**

- `use-hero-animations`: Calls intro and scroll hooks, manages lifecycle
- `use-hero-intro-animation`: Page load animation sequence
- `use-hero-scroll-animation`: Scroll-triggered animations orchestration
- `hero-animation-helpers`: Pure functions for timeline creation

### 3. Scroll Lock System

**Current State:**

- References non-existent `[data-scrollbar]` elements
- Manages touch-action for smooth-scrollbar

**New Structure:**

```
lib/
└── scroll-lock.ts                     (80 lines - simplified)
```

**Changes:**

- Remove all smooth-scrollbar DOM queries
- Simplify to wheel/touch/keyboard blocking only
- Maintain reference counting for nested locks

### 4. Constants Organization

**Current State:**

- Some constants in `hero.constants.ts`
- Magic numbers scattered in animation code

**New Structure:**

```
app/(home)/components/Hero/
├── hero.constants.ts                  (existing geometry/style constants)
└── hero-animation-timing.ts           (new - timing constants)
```

**New Constants File:**

```typescript
export const ANIMATION_TIMING = {
  // Intro animation
  INTRO_DELAY: 1,
  PILL_EXPAND_DURATION: 2,
  PILL_ROUND_DURATION: 0.8,
  CONTENT_FADE_DURATION: 0.45,
  PROFILE_FADE_DURATION: 0.6,
  VIDEO_FADE_DURATION: 0.8,
  OVERLAY_FADE_DURATION: 0.6,
  LABEL_FADE_DURATION: 0.65,
  LABEL_STAGGER: 0.08,

  // Scroll animation
  SCRUB_SMOOTHING: 0.6,
  NAV_FADE_DURATION: 0.45,
  PILL_BORDER_DURATION: 0.25,
  PILL_CONTENT_DURATION: 0.35,
  VIDEO_FADE_OUT_DURATION: 0.35,

  // Skills animation
  SKILLS_HEADING_DURATION: 0.6,
  SKILLS_ROW_STAGGER: 0.12,
  SKILLS_BELOW_DELAY: 0.25,
} as const;

export const SCROLL_THRESHOLDS = {
  MIN_ALIGNMENT_PROGRESS: 0.05,
  PILL_POSITION_TOLERANCE: 0.5,
} as const;
```

## Data Flow

### Scroll Progress Flow

```
Window Scroll Event
       ↓
requestAnimationFrame
       ↓
useScrollProgress (calculate)
       ↓
ScrollProgressBar (render)
```

### Hero Animation Flow

```
Component Mount
       ↓
useHeroAnimations
       ↓
├─→ useHeroIntroAnimation
│   ├─→ lockScroll()
│   ├─→ gsap.timeline()
│   └─→ releaseScrollLock()
│
└─→ useHeroScrollAnimation
    ├─→ createNavMeasurementHelpers()
    ├─→ createProfileScrollTween()
    ├─→ createPillShrinkTimeline()
    ├─→ createLabelExitTimeline()
    ├─→ createCoverAnimations()
    ├─→ createHeroPin()
    └─→ createSkillsEntranceAnimation()
```

## API Design

### useScrollProgress Hook

```typescript
/**
 * Tracks scroll progress as a value between 0 and 1.
 * Uses requestAnimationFrame for smooth updates.
 *
 * @returns Current scroll progress (0 = top, 1 = bottom)
 */
export function useScrollProgress(): number;
```

### useScrollReset Hook

```typescript
/**
 * Manages scroll position reset on navigation and page lifecycle events.
 * Handles browser back/forward cache (bfcache) and scroll restoration.
 *
 * @example
 * function MyLayout({ children }) {
 *   useScrollReset();
 *   return <div>{children}</div>;
 * }
 */
export function useScrollReset(): void;
```

### useHeroAnimations Hook

```typescript
export type UseHeroAnimationArgs = {
  refs: HeroAnimationRefs;
  prefersReducedMotion: boolean;
};

/**
 * Orchestrates hero section animations (intro + scroll).
 * Automatically handles cleanup on unmount.
 *
 * @param args - Animation refs and motion preferences
 */
export function useHeroAnimations(args: UseHeroAnimationArgs): void;
```

### Animation Helper Functions

```typescript
/**
 * Creates the pill shrink timeline that transforms the hero panel
 * into a navigation button as the user scrolls.
 */
export function createPillShrinkTimeline(args: PillShrinkTimelineArgs): PillShrinkTimelineResult;

/**
 * Creates cover section animations including profile z-index management,
 * fill scale, and parallax content movement.
 */
export function createCoverAnimations(args: CoverAnimationArgs): CleanupFn;

/**
 * Creates skills section entrance animation with staggered reveals.
 */
export function createSkillsEntranceAnimation(args: SkillsEntranceArgs): CleanupFn;
```

## File Size Targets

| File                         | Current | Target | Status           |
| ---------------------------- | ------- | ------ | ---------------- |
| ScrollProvider.client.tsx    | 105     | 30     | 🔴 Needs split   |
| use-hero-animations.ts       | 888     | 50     | 🔴 Needs split   |
| scroll-lock.ts               | 105     | 80     | 🟡 Needs cleanup |
| ScrollProgressBar.client.tsx | 0       | 25     | 🟢 New file      |
| useScrollProgress.ts         | 0       | 40     | 🟢 New file      |
| useScrollReset.ts            | 0       | 60     | 🟢 New file      |
| use-hero-intro-animation.ts  | 0       | 200    | 🟢 New file      |
| use-hero-scroll-animation.ts | 0       | 150    | 🟢 New file      |
| hero-animation-helpers.ts    | 0       | 400    | 🟢 New file      |
| hero-animation-timing.ts     | 0       | 50     | 🟢 New file      |

## Type Definitions

### Shared Types

```typescript
// types/animations.ts
export type CleanupFn = () => void;

export type AnimationRefs<T extends string> = {
  [K in T]: React.RefObject<HTMLElement>;
};

export type ScrollProgress = number; // 0..1

export type ReducedMotionState = boolean;
```

### Hero Animation Types

```typescript
// app/(home)/components/Hero/hero.types.ts (existing, no changes)
export type HeroAnimationRefs = {
  smoothWrapperRef: RefObject<HTMLDivElement>;
  smoothContentRef: RefObject<HTMLDivElement>;
  heroSectionRef: RefObject<HTMLDivElement>;
  // ... rest unchanged
};
```

## Migration Strategy

### Phase 1: ScrollProvider (Low Risk)

1. Create `useScrollProgress.ts` hook
2. Create `useScrollReset.ts` hook
3. Create `ScrollProgressBar.client.tsx` component
4. Update `ScrollProvider.client.tsx` to use new hooks
5. Test scroll progress bar and navigation

**Rollback Plan**: Revert to single-file ScrollProvider

### Phase 2: Hero Animations (Medium Risk)

1. Create `hero-animation-timing.ts` constants
2. Create `hero-animation-helpers.ts` with all helper functions
3. Create `use-hero-intro-animation.ts` with intro logic
4. Create `use-hero-scroll-animation.ts` with scroll logic
5. Update `use-hero-animations.ts` to orchestrate
6. Test all hero animations

**Rollback Plan**: Keep old file as `.backup`, restore if issues

### Phase 3: Scroll Lock (Low Risk)

1. Remove `[data-scrollbar]` references
2. Remove `touchActionBackup` logic
3. Simplify lock/unlock functions
4. Test intro animation scroll blocking

**Rollback Plan**: Git revert single file

### Phase 4: CSS Cleanup (Low Risk)

1. Remove `.scrollbar-track` styles
2. Remove `.scrollbar-thumb` styles
3. Verify native scrollbar still hidden
4. Test visual appearance

**Rollback Plan**: Git revert `globals.css`

### Phase 5: Documentation (No Risk)

1. Archive `docs/SCROLL.md` → `docs/archive/SCROLL.md`
2. Archive `docs/SCROLL_PLAN.md` → `docs/archive/SCROLL_PLAN.md`
3. Add JSDoc comments to new hooks
4. Update inline comments

**Rollback Plan**: Not needed

## Testing Strategy

### Manual Testing Checklist

**Home Page (`/`):**

- [ ] Intro animation plays on load
- [ ] Scroll is locked during intro
- [ ] Pill expands and morphs correctly
- [ ] Profile image fades in
- [ ] Video plays and fades in
- [ ] Name/designation text animates
- [ ] Scroll unlocks after intro
- [ ] Pill shrinks to nav on scroll
- [ ] Profile scales down on scroll
- [ ] Labels fade out on scroll
- [ ] Cover section scales up
- [ ] Skills section animates in
- [ ] Progress bar tracks scroll position

**Work Page (`/work`):**

- [ ] Hero text animates on load
- [ ] Background rotates continuously
- [ ] Timeline cards animate on scroll
- [ ] Progress bar tracks scroll position

**Navigation:**

- [ ] Scroll resets when navigating to `/`
- [ ] Scroll resets when navigating to `/work`
- [ ] Browser back button resets scroll
- [ ] Browser forward button resets scroll

**Accessibility:**

- [ ] `prefers-reduced-motion` skips animations
- [ ] Final states render immediately with reduced motion
- [ ] Keyboard navigation works during scroll lock
- [ ] Screen readers can access content

**Responsive:**

- [ ] Animations work on mobile (< 640px)
- [ ] Animations work on tablet (640-1024px)
- [ ] Animations work on desktop (> 1024px)
- [ ] Progress bar visible on all sizes

### Performance Testing

```bash
# Before refactor
pnpm build
pnpm start
# Open DevTools > Performance
# Record page load + scroll
# Note: FPS, scripting time, layout shifts

# After refactor
pnpm build
pnpm start
# Record same interactions
# Compare metrics (should be identical ±5%)
```

## Error Handling

### Graceful Degradation

```typescript
// If refs are missing, skip animations
if (!hasRequiredRefs(refs, ['pill', 'video'])) {
  console.warn('[Hero] Missing required refs, skipping animations');
  return;
}

// If GSAP fails, render static content
try {
  gsap.timeline()...
} catch (error) {
  console.error('[Hero] Animation error:', error);
  applyReducedMotionState(refs); // Show final state
}
```

### TypeScript Strictness

```typescript
// Strict null checks
const element = ref.current;
if (!element) return; // Early return pattern

// Type guards for arrays
const validElements = elements.filter((el): el is HTMLElement => el !== null);

// Exhaustive switch cases
type AnimationPhase = "intro" | "scroll" | "exit";
function handlePhase(phase: AnimationPhase) {
  switch (phase) {
    case "intro":
      return handleIntro();
    case "scroll":
      return handleScroll();
    case "exit":
      return handleExit();
    default: {
      const _exhaustive: never = phase;
      throw new Error(`Unhandled phase: ${_exhaustive}`);
    }
  }
}
```

## Performance Considerations

### Maintained Optimizations

- ✅ `will-change: transform, opacity` on animated elements
- ✅ Transform-based animations (no layout thrashing)
- ✅ `force3D: true` for GPU acceleration
- ✅ `requestAnimationFrame` for scroll sampling
- ✅ Debounced resize handlers
- ✅ Early returns for missing refs
- ✅ Proper cleanup to prevent memory leaks

### New Optimizations

- ✅ Smaller bundle size (tree-shaking friendly modules)
- ✅ Faster hot reload (smaller files)
- ✅ Better code splitting (separate hooks)

## Backwards Compatibility

### Public API (No Changes)

```typescript
// Components using animations - unchanged
<HomePageContent>(<WorkPageContent>(<
  ScrollProvider // Hook signatures - unchanged
>useHeroAnimations({ refs, prefersReducedMotion })));
usePrefersReducedMotion();
```

### Internal API (Refactored)

```typescript
// Old: Single hook
useGSAP(() => {
  /* 888 lines */
});

// New: Composed hooks
useHeroIntroAnimation({ refs, prefersReducedMotion });
useHeroScrollAnimation({ refs, prefersReducedMotion });
```

## Documentation Updates

### New JSDoc Comments

```typescript
/**
 * Tracks scroll progress as a normalized value between 0 and 1.
 *
 * Uses requestAnimationFrame for smooth, performant updates.
 * Automatically handles window resize events.
 *
 * @returns Current scroll progress where:
 *   - 0 = top of page
 *   - 1 = bottom of page
 *
 * @example
 * function MyComponent() {
 *   const progress = useScrollProgress();
 *   return <div style={{ opacity: progress }}>Fades in on scroll</div>;
 * }
 */
export function useScrollProgress(): number;
```

### Inline Comments

```typescript
// Before: No context
scrub: 0.6,

// After: Explains why
scrub: 0.6, // Slight smoothing for elegant motion (0 = instant, 1 = 1s lag)
```

## Success Metrics

### Code Quality Metrics

- **Lines per file**: Max 300 (target: < 200)
- **Cyclomatic complexity**: Max 10 per function
- **Test coverage**: N/A (manual testing only)
- **TypeScript errors**: 0
- **ESLint warnings**: 0

### Performance Metrics

- **Bundle size**: No increase (target: -5% from tree-shaking)
- **FPS during scroll**: Maintain 60fps
- **Time to Interactive**: No regression
- **Lighthouse score**: Maintain 90+

### Developer Experience Metrics

- **Time to understand code**: Reduced by 50% (subjective)
- **Time to modify animation**: Reduced by 30% (subjective)
- **Hot reload time**: Improved by 20% (smaller files)
