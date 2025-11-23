# GSAP Scroll Animation Refactor

## Overview

Refactor the existing GSAP scroll-driven animation implementation to improve maintainability, code organization, and remove legacy smooth-scrollbar references. The current implementation is production-ready but has grown organically, resulting in large files and some technical debt from the smooth-scrollbar removal.

## Goals

1. **Improve Maintainability**: Break down large files into focused, single-responsibility modules
2. **Remove Technical Debt**: Clean up all smooth-scrollbar references and unused code
3. **Enhance Reusability**: Extract common patterns into reusable hooks and utilities
4. **Maintain Performance**: Ensure all optimizations remain intact
5. **Preserve Functionality**: Zero breaking changes to existing animations and user experience

## Non-Goals

- Changing animation behavior or visual design
- Adding new animations or features
- Modifying GSAP configuration or approach
- Performance improvements (already optimized)

## Success Criteria

### Functional Requirements

- [ ] All existing animations work identically to current implementation
- [ ] Scroll progress bar displays correctly
- [ ] Scroll reset behavior works on navigation
- [ ] Reduced motion preferences are respected
- [ ] Scroll lock during intro animation functions properly
- [ ] No console errors or warnings
- [ ] TypeScript compilation passes without errors

### Code Quality Requirements

- [ ] No file exceeds 300 lines of code
- [ ] Each module has a single, clear responsibility
- [ ] All smooth-scrollbar references removed
- [ ] Unused CSS removed
- [ ] Magic numbers extracted to named constants
- [ ] Consistent null-checking patterns
- [ ] All functions properly typed

### Testing Requirements

- [ ] Manual testing on home page (`/`) animations
- [ ] Manual testing on work page (`/work`) animations
- [ ] Test scroll progress bar visibility and accuracy
- [ ] Test navigation between pages (scroll reset)
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Test on mobile viewport sizes
- [ ] Verify no performance regressions

## Acceptance Criteria

1. **ScrollProvider Refactored**
   - Split into `ScrollProvider`, `ScrollProgressBar`, and custom hooks
   - `useScrollProgress` hook extracts progress calculation logic
   - `useScrollReset` hook extracts scroll reset logic
   - Each module under 100 lines

2. **Hero Animations Reorganized**
   - `use-hero-animations.ts` becomes orchestrator (< 100 lines)
   - Intro logic extracted to `use-hero-intro-animation.ts`
   - Scroll logic extracted to `use-hero-scroll-animation.ts`
   - Helper functions in `hero-animation-helpers.ts`

3. **Scroll Lock Cleaned**
   - All `[data-scrollbar]` references removed
   - Simplified implementation without smooth-scrollbar logic
   - Maintains keyboard, wheel, and touch blocking

4. **Constants Organized**
   - Animation timing values extracted to constants
   - Grouped by logical concern
   - Properly typed with `as const`

5. **CSS Cleaned**
   - Smooth-scrollbar styles removed from `globals.css`
   - Native scrollbar hiding styles retained
   - No visual regressions

6. **Skills Marquee Animations Enhanced**
   - All marquee rows above the heading fade in simultaneously
   - All marquee rows below the heading fade in simultaneously
   - Below rows have slight delay after above rows
   - Animations respect `prefers-reduced-motion`
   - Smooth opacity transition from 0 to 1

7. **Documentation Updated**
   - Remove or archive `docs/SCROLL.md` and `docs/SCROLL_PLAN.md`
   - Update inline comments where logic changed
   - Add JSDoc comments to new hooks

## Constraints

- Must maintain backward compatibility with existing components
- Cannot introduce new dependencies
- Must work in Next.js 15 App Router environment
- Must support React 19
- Must maintain existing accessibility features
- Changes must be incremental and testable

## Stakeholders

- **Developer**: Needs cleaner, more maintainable code
- **End Users**: Expect identical animation behavior
- **Future Maintainers**: Need clear, well-organized code structure

## Timeline

- **Phase 1**: ScrollProvider refactor (1-2 hours)
- **Phase 2**: Hero animations reorganization (2-3 hours)
- **Phase 3**: Scroll lock cleanup (30 minutes)
- **Phase 4**: Constants extraction (1 hour)
- **Phase 5**: CSS cleanup and documentation (1 hour)
- **Total Estimated Time**: 6-8 hours

## Risks & Mitigations

| Risk                         | Impact | Mitigation                                                   |
| ---------------------------- | ------ | ------------------------------------------------------------ |
| Breaking existing animations | High   | Incremental changes with testing after each phase            |
| Performance regression       | Medium | Profile before/after, maintain existing optimizations        |
| TypeScript errors            | Low    | Strict typing from the start, incremental compilation checks |
| Merge conflicts              | Low    | Complete refactor in focused time window                     |

## Dependencies

- Existing GSAP implementation must remain functional during refactor
- No changes to component props or public APIs
- Work page animations use similar patterns and benefit from shared utilities

## Out of Scope

- Adding new animations
- Changing animation timing or easing
- Implementing smooth-scrollbar or alternative scroll libraries
- Adding animation testing framework
- Performance optimizations beyond current state
- Mobile-specific animation variants
