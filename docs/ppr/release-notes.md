# PPR Refactor Release Notes

## Summary

- Adopted cache components across pages with env-controlled Suspense gating (`PPR_ENABLED`).
- Split client-server responsibilities (HeroSection, ProjectsGrid, WorkTimeline, Lite Nav) to stream dynamic islands only when enabled, now using Suspense/lazy instead of dynamic imports.
- Replaced shared data constants with cached loaders in `lib/content/` and isolated client-safe copies in `skills-data.ts`.
- Simplified navigation glyphs so server components avoid client-only icon packages.

## Verification

- `PPR_ENABLED=true pnpm build` passes (Turbopack).
- `PPR_ENABLED=false pnpm build` passes, confirming non-streaming fallback.
- Lighthouse (desktop) after refactor: home 0.97 (LCP ~0.92s), projects 0.97 (LCP ~1.21s).
- Lighthouse (mobile) after refactor: home 0.84 (LCP ~4.06s), projects 0.82 (LCP ~4.98s).

## Risks & Follow-ups

- Remaining TODO: hero animation still leans on complex client state; consider simplifying once streaming proves stable.
- Desktop Lighthouse saw small regressions (~0.02) likely due to streaming boundaries; monitor after deploying with real traffic.
- Optional: add monitoring for streaming latency and automate bundle analysis once Turbopack support lands.
