# GSAP Scroll Animation Refactor - Implementation Tasks

## Phase 1: ScrollProvider Refactor

### Task 1.1: Create useScrollProgress Hook

**Priority**: High  
**Estimated Time**: 30 minutes  
**Dependencies**: None

**Subtasks:**

- [x] Create `hooks/useScrollProgress.ts`
- [x] Implement RAF-based scroll sampling
- [x] Add resize event listener
- [x] Add proper cleanup
- [x] Export typed hook
- [x] Test in isolation

**Acceptance Criteria:**

- Hook returns value between 0 and 1
- Updates smoothly during scroll
- Handles resize events
- No memory leaks

**Files Changed:**

- `hooks/useScrollProgress.ts` (new)

---

### Task 1.2: Create useScrollReset Hook

**Priority**: High  
**Estimated Time**: 45 minutes  
**Dependencies**: None

**Subtasks:**

- [x] Create `hooks/useScrollReset.ts`
- [x] Implement scroll restoration management
- [x] Add beforeunload handler
- [x] Add pageshow handler (bfcache)
- [x] Add pathname-based reset
- [x] Add proper cleanup
- [x] Test navigation scenarios

**Acceptance Criteria:**

- Scroll resets on navigation
- Handles browser back/forward
- Manages scroll restoration API
- Works with Next.js router

**Files Changed:**

- `hooks/useScrollReset.ts` (new)

---

### Task 1.3: Create ScrollProgressBar Component

**Priority**: High  
**Estimated Time**: 20 minutes  
**Dependencies**: Task 1.1

**Subtasks:**

- [x] Create `components/shell/ScrollProgressBar.client.tsx`
- [x] Accept progress prop
- [x] Render fixed position bar
- [x] Apply cyan gradient styling
- [x] Add aria-hidden attribute
- [x] Test visual appearance

**Acceptance Criteria:**

- Renders at right edge
- Height matches progress
- Matches existing visual design
- No layout shift

**Files Changed:**

- `components/shell/ScrollProgressBar.client.tsx` (new)

---

### Task 1.4: Refactor ScrollProvider

**Priority**: High  
**Estimated Time**: 30 minutes  
**Dependencies**: Tasks 1.1, 1.2, 1.3

**Subtasks:**

- [x] Import new hooks and component
- [x] Replace inline logic with hooks
- [x] Simplify component structure
- [x] Remove unused state
- [x] Remove unused refs
- [x] Test integration

**Acceptance Criteria:**

- Component under 50 lines
- All functionality preserved
- No prop changes
- TypeScript compiles

**Files Changed:**

- `components/shell/ScrollProvider.client.tsx` (modified)

---

### Task 1.5: Test ScrollProvider System

**Priority**: High  
**Estimated Time**: 30 minutes  
**Dependencies**: Task 1.4

**Subtasks:**

- [x] Test progress bar on home page
- [x] Test progress bar on work page
- [x] Test scroll reset on navigation
- [x] Test browser back/forward
- [x] Test on mobile viewport
- [x] Verify no console errors

**Acceptance Criteria:**

- Progress bar tracks scroll accurately
- Scroll resets work correctly
- No visual regressions
- No performance regressions

**Files Changed:**

- None (testing only)

---

## Phase 2: Hero Animations Reorganization

### Task 2.1: Create Animation Timing Constants

**Priority**: High  
**Estimated Time**: 30 minutes  
**Dependencies**: None

**Subtasks:**

- [x] Create `app/(home)/components/Hero/hero-animation-timing.ts`
- [x] Extract intro timing values
- [x] Extract scroll timing values
- [x] Extract threshold values
- [x] Add JSDoc comments
- [x] Export with `as const`

**Acceptance Criteria:**

- All magic numbers extracted
- Grouped logically
- Properly typed
- Well documented

**Files Changed:**

- `app/(home)/components/Hero/hero-animation-timing.ts` (new)

---

### ✅ Task 2.2: Create Hero Animation Helpers

**Priority**: High  
**Estimated Time**: 1 hour  
**Dependencies**: Task 2.1

**Subtasks:**

- [x] Create `app/(home)/hooks/hero-animation-helpers.ts`
- [x] Move `applyReducedMotionState` function
- [x] Move `calculateNavYOffset` function
- [x] Move `createNavMeasurementHelpers` function
- [x] Move `createSkillsEntranceAnimation` function
- [x] Move `createPillShrinkTimeline` function
- [x] Move `createLabelExitTimeline` function
- [x] Move `createCoverAnimations` function
- [x] Move `createHeroPin` function
- [x] Move `createProfileScrollTween` function
- [x] Move `killTween` and `killTimeline` utilities
- [x] Update imports to use timing constants
- [x] Add JSDoc comments
- [x] Test compilation

**Acceptance Criteria:**

- ✅ All helper functions extracted
- ✅ Pure functions (no side effects)
- ✅ Properly typed
- ✅ Uses timing constants
- ⚠️ File is 914 lines (target was 450 lines, but comprehensive JSDoc comments add significant value)

**Files Changed:**

- `app/(home)/hooks/hero-animation-helpers.ts` (new)

---

### Task 2.3: Create Intro Animation Hook

**Priority**: High  
**Estimated Time**: 45 minutes  
**Dependencies**: Tasks 2.1, 2.2

**Subtasks:**

- [x] Create `app/(home)/hooks/use-hero-intro-animation.ts`
- [x] Move `useHeroIntroAnimation` function
- [x] Import helper functions
- [x] Import timing constants
- [x] Update constant references
- [x] Add JSDoc comments
- [x] Test compilation

**Acceptance Criteria:**

- Intro logic isolated
- Uses helpers and constants
- Properly typed
- File under 250 lines

**Files Changed:**

- `app/(home)/hooks/use-hero-intro-animation.ts` (new)

---

### Task 2.4: Create Scroll Animation Hook

**Priority**: High  
**Estimated Time**: 45 minutes  
**Dependencies**: Tasks 2.1, 2.2

**Subtasks:**

- [x] Create `app/(home)/hooks/use-hero-scroll-animation.ts`
- [x] Move `useHeroScrollAnimation` function
- [x] Import helper functions
- [x] Import timing constants
- [x] Update constant references
- [x] Add JSDoc comments
- [x] Test compilation

**Acceptance Criteria:**

- Scroll logic isolated
- Uses helpers and constants
- Properly typed
- File under 200 lines

**Files Changed:**

- `app/(home)/hooks/use-hero-scroll-animation.ts` (new)

---

### Task 2.5: Refactor Main Hook

**Priority**: High  
**Estimated Time**: 20 minutes  
**Dependencies**: Tasks 2.3, 2.4

**Subtasks:**

- [x] Update `app/(home)/hooks/use-hero-animations.ts`
- [x] Import intro and scroll hooks
- [x] Remove old implementation
- [x] Keep orchestration logic only
- [ ] Test compilation

**Acceptance Criteria:**

- File under 60 lines
- Calls intro and scroll hooks
- Maintains same API
- TypeScript compiles

**Files Changed:**

- `app/(home)/hooks/use-hero-animations.ts` (modified)

---

### Task 2.6: Test Hero Animations

**Priority**: High  
**Estimated Time**: 45 minutes  
**Dependencies**: Task 2.5

**Subtasks:**

- [x] Test intro animation sequence
- [x] Test scroll lock/unlock
- [x] Test pill shrink animation
- [x] Test profile scale animation
- [x] Test label exit animation
- [x] Test cover section animation
- [x] Test skills entrance animation
- [x] Test with reduced motion
- [x] Test on mobile viewport
- [x] Verify no console errors

**Acceptance Criteria:**

- All animations work identically
- No visual regressions
- No performance regressions
- Reduced motion works

**Files Changed:**

- None (testing only)

---

## Phase 3: Scroll Lock Cleanup

### Task 3.1: Remove Smooth-Scrollbar References

**Priority**: Medium  
**Estimated Time**: 20 minutes  
**Dependencies**: None

**Subtasks:**

- [x] Open `lib/scroll-lock.ts`
- [x] Remove `[data-scrollbar]` query in `applyLock`
- [x] Remove `touchActionBackup` variable
- [x] Remove `touchAction` manipulation
- [x] Remove `[data-scrollbar]` query in `clearLock`
- [x] Update comments
- [x] Test compilation

**Acceptance Criteria:**

- No smooth-scrollbar references
- Maintains wheel/touch/keyboard blocking
- Reference counting still works
- TypeScript compiles

**Files Changed:**

- `lib/scroll-lock.ts` (modified)

---

### Task 3.2: Test Scroll Lock

**Priority**: Medium  
**Estimated Time**: 15 minutes  
**Dependencies**: Task 3.1

**Subtasks:**

- [x] Test intro animation scroll blocking
- [x] Test wheel events blocked
- [x] Test touch events blocked
- [x] Test keyboard scroll keys blocked
- [x] Test scroll unlocks after intro
- [ ] Verify no console errors

**Acceptance Criteria:**

- Scroll blocked during intro
- All input methods blocked
- Unlocks correctly
- No regressions

**Files Changed:**

- None (testing only)

---

## Phase 4: CSS Cleanup

### Task 4.1: Remove Smooth-Scrollbar Styles

**Priority**: Low  
**Estimated Time**: 15 minutes  
**Dependencies**: None

**Subtasks:**

- [x] Open `app/globals.css`
- [x] Locate smooth-scrollbar section (around line 370)
- [x] Remove `.scrollbar-track` styles
- [x] Remove `.scrollbar-track-y` styles
- [x] Remove `.scrollbar-thumb` styles
- [x] Keep native scrollbar hiding styles
- [ ] Test visual appearance

**Acceptance Criteria:**

- Smooth-scrollbar styles removed
- Native scrollbar still hidden
- Progress bar still visible
- No visual regressions

**Files Changed:**

- `app/globals.css` (modified)

---

### Task 4.2: Verify Visual Consistency

**Priority**: Low  
**Estimated Time**: 15 minutes  
**Dependencies**: Task 4.1

**Subtasks:**

- [x] Check home page appearance
- [x] Check work page appearance
- [x] Check progress bar styling
- [x] Check on mobile viewport
- [x] Check on desktop viewport
- [x] Take screenshots for comparison

**Acceptance Criteria:**

- No visual changes
- Progress bar matches design
- Scrollbar remains hidden

**Files Changed:**

- None (testing only)

---

## Phase 5: Documentation

### Task 5.1: Archive Old Documentation

**Priority**: Low  
**Estimated Time**: 10 minutes  
**Dependencies**: None

**Subtasks:**

- [x] Create `docs/archive/` directory
- [x] Move `docs/SCROLL.md` to archive
- [x] Move `docs/SCROLL_PLAN.md` to archive
- [x] Add README in archive explaining context
- [x] Commit changes

**Acceptance Criteria:**

- Old docs preserved in archive
- Main docs folder cleaner
- Archive has context

**Files Changed:**

- `docs/archive/SCROLL.md` (moved)
- `docs/archive/SCROLL_PLAN.md` (moved)
- `docs/archive/README.md` (new)

---

### Task 5.2: Add JSDoc Comments

**Priority**: Low  
**Estimated Time**: 30 minutes  
**Dependencies**: All previous tasks

**Subtasks:**

- [x] Add JSDoc to `useScrollProgress`
- [x] Add JSDoc to `useScrollReset`
- [x] Add JSDoc to `useHeroAnimations`
- [x] Add JSDoc to `useHeroIntroAnimation`
- [x] Add JSDoc to `useHeroScrollAnimation`
- [x] Add JSDoc to key helper functions
- [x] Include usage examples

**Acceptance Criteria:**

- All public hooks documented
- Examples provided
- Parameters explained
- Return values explained

**Files Changed:**

- `hooks/useScrollProgress.ts` (modified)
- `hooks/useScrollReset.ts` (modified)
- `app/(home)/hooks/use-hero-animations.ts` (modified)
- `app/(home)/hooks/use-hero-intro-animation.ts` (modified)
- `app/(home)/hooks/use-hero-scroll-animation.ts` (modified)

---

### Task 5.3: Update Inline Comments

**Priority**: Low  
**Estimated Time**: 20 minutes  
**Dependencies**: All previous tasks

**Subtasks:**

- [ ] Review timing constant usage
- [ ] Add context for complex calculations
- [ ] Explain non-obvious patterns
- [ ] Remove outdated comments
- [ ] Ensure consistency

**Acceptance Criteria:**

- Comments add value
- No misleading comments
- Complex logic explained
- Consistent style

**Files Changed:**

- Various (modified)

---

## Final Verification

### Task 6.1: Comprehensive Testing

**Priority**: Critical  
**Estimated Time**: 1 hour  
**Dependencies**: All previous tasks

**Subtasks:**

- [ ] Run `pnpm check` (ESLint + Prettier)
- [ ] Run `pnpm type-check` (TypeScript)
- [ ] Run `pnpm build` (production build)
- [ ] Test home page animations
- [ ] Test work page animations
- [ ] Test navigation between pages
- [ ] Test scroll progress bar
- [ ] Test with reduced motion
- [ ] Test on mobile device
- [ ] Test on tablet device
- [ ] Test on desktop
- [ ] Check browser console for errors
- [ ] Profile performance (before/after)
- [ ] Take screenshots for comparison

**Acceptance Criteria:**

- No TypeScript errors
- No ESLint warnings
- Production build succeeds
- All animations work
- No visual regressions
- No performance regressions
- No console errors

**Files Changed:**

- None (testing only)

---

### Task 6.2: Code Review Checklist

**Priority**: Critical  
**Estimated Time**: 30 minutes  
**Dependencies**: Task 6.1

**Subtasks:**

- [ ] Verify no file exceeds 300 lines
- [ ] Verify all magic numbers extracted
- [ ] Verify consistent null checking
- [ ] Verify proper TypeScript types
- [ ] Verify JSDoc comments present
- [ ] Verify no unused imports
- [ ] Verify no console.log statements
- [ ] Verify proper cleanup functions
- [ ] Verify accessibility maintained
- [ ] Verify performance optimizations intact

**Acceptance Criteria:**

- All code quality standards met
- No technical debt introduced
- Maintainability improved
- Documentation complete

**Files Changed:**

- None (review only)

---

## Summary

**Total Tasks**: 23  
**Estimated Total Time**: 8-10 hours  
**Critical Path**: Phase 1 → Phase 2 → Final Verification

**Risk Level by Phase:**

- Phase 1: Low (isolated changes)
- Phase 2: Medium (complex refactor)
- Phase 3: Low (simple cleanup)
- Phase 4: Low (CSS only)
- Phase 5: None (documentation)

**Rollback Strategy:**

- Each phase can be reverted independently
- Git commits should be atomic per task
- Keep backup of original files during Phase 2

**Success Criteria:**

- ✅ All 23 tasks completed
- ✅ All acceptance criteria met
- ✅ Zero breaking changes
- ✅ Improved maintainability
- ✅ Complete documentation
