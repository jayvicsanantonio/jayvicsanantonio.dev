# Archive: Smooth Scrollbar Migration Documents

## Context

This directory contains archived documentation from an **abandoned migration plan** to replace the native scroll implementation with Smooth Scrollbar, a third-party container-based scrolling library.

## What Was Planned

The original plan (documented in `SCROLL.md` and `SCROLL_PLAN.md`) proposed:

1. **Replace native scroll** with Smooth Scrollbar to gain precise control over scroll UI
2. **Hide OS scrollbars** entirely and present a branded progress indicator
3. **Integrate with GSAP** using `ScrollTrigger.scrollerProxy` instead of `ScrollSmoother`
4. **Compute normalized progress** from the scrollbar's offset/limit values

## Why It Was Abandoned

After investigation and prototyping, we decided **not to pursue** the Smooth Scrollbar approach because:

- **Complexity**: Adding a third-party scroll library introduced significant complexity
- **Performance concerns**: Container-based scrolling can impact performance on lower-end devices
- **Accessibility risks**: Custom scroll implementations often break native browser behaviors
- **Maintenance burden**: Additional dependency to maintain and potential compatibility issues
- **Native is sufficient**: GSAP's ScrollTrigger + ScrollSmoother work well with native scroll

## What We Did Instead

We kept the **native scroll implementation** and focused on:

1. **Refactoring existing code** for better maintainability (see `.kiro/specs/gsap-refactor/`)
2. **Removing ScrollSmoother** references where not needed
3. **Simplifying scroll lock** implementation
4. **Creating a custom progress bar** that works with native scroll via `requestAnimationFrame`
5. **Organizing animation code** into focused, single-responsibility modules

## Current Implementation

The current scroll system uses:

- **Native browser scroll** (no third-party libraries)
- **GSAP ScrollTrigger** for scroll-driven animations
- **Custom progress bar** (`ScrollProgressBar.client.tsx`) that samples scroll position
- **Scroll reset hooks** (`useScrollReset.ts`) for navigation handling
- **Scroll lock utilities** (`lib/scroll-lock.ts`) for blocking scroll during intro animations

## Files in This Archive

- **SCROLL.md**: Detailed analysis of Vincent Saisset's site and proposed Smooth Scrollbar integration
- **SCROLL_PLAN.md**: Phase-by-phase implementation plan for the migration

## Lessons Learned

1. **Start simple**: Native browser features are often sufficient
2. **Measure before optimizing**: Don't add complexity without proven need
3. **Consider accessibility**: Custom implementations can break expected behaviors
4. **Evaluate maintenance cost**: Every dependency adds long-term burden

## Related Documentation

For the current implementation, see:

- `.kiro/specs/gsap-refactor/requirements.md` - Current refactor goals
- `.kiro/specs/gsap-refactor/design.md` - Architecture and design decisions
- `.kiro/specs/gsap-refactor/tasks.md` - Implementation tasks

---

**Archived**: November 2025  
**Status**: Not implemented, superseded by native scroll refactor
