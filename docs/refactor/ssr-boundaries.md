# SSR and Client Boundary Guidelines

This document summarizes the SSR-first structure and client-only islands in the app after the refactor.

Goals
- Prefer Server Components (RSC) by default.
- Use Client Components only for interactivity or browser APIs.
- Keep client bundles small by isolating client logic to leaf components.

Key boundaries
- app/layout.tsx: Server. It renders <Body> which now delegates client-only logic to ClientAppShell.client.
- components/pages/Body.tsx: Server. Provides <body> wrapper and font classes.
- components/pages/ClientAppShell.client.tsx: Client. Handles ViewTransitions, CursorGlow, Toaster, Analytics, SpeedInsights, and AmbientBackground (non-home).
- app/projects/page.tsx: Server. Header animation is a tiny client component (components/projects/AnimatedHeader.client.tsx). Filtering grid is client (SkillsAndCases).
- app/projects/layout.tsx: Server. Renders GlassHeaderBubble (client) at the top.
- app/work/page.tsx: Server. Static heading is server; the timeline is client (app/work/_components/WorkTimeline.client.tsx) with Framer Motion.
- app/work/layout.tsx: Server. Renders GlassHeaderBubble (client) at the top.
- components/home/HeroMorph.client.tsx: Client container. It coordinates CSS variable updates and composes SRP client subcomponents under components/home/hero/.

Client-only modules (examples)
- components/home/hero/*: MorphingVideo, InitialPillOverlay, ProfileImage, PrimaryNavOverlay, MobileNavRow, FooterBrandCTA.
- components/ui/NavPill.tsx
- components/pages/CursorGlow.tsx
- components/ui/AnimatedText.tsx
- app/projects/_components/SkillsAndCases.tsx
- app/work/_components/WorkTimeline.client.tsx

Server-only modules (examples)
- app/layout.tsx, app/not-found.tsx, app/page.tsx (home mounts a client hero)
- components/pages/Body.tsx
- Most of app/* pages where animations and interactivity are isolated to child islands

Third‑party libraries
- Do not import client-only libraries in server components. For example, @iconify/react must only be used in Client Components.
- Framer Motion usage is limited to client components.

Patterns to follow
- Data: Prefer pure data modules (e.g., app/projects/projects.data.ts) without JSX. Render icons/sections in client/server presenters.
- Props: Pass minimal props from server to client islands (strings, numbers, booleans, arrays/objects of serializable data).
- CSS variables: For scroll-driven visuals, compute CSS variables inside client container once and consume in child components via styles.

Adding a new feature
- Default to a Server Component for static content.
- If interactivity (events, useEffect, animations) is needed, create a small *.client.tsx leaf and mount it from a server parent.
- Avoid passing React elements from server to client; pass data and render on the client.

Common pitfalls
- Importing @iconify/react or other client-only libs in a Server Component causes RSC build/runtime errors.
- Keeping too much of a page client-only increases hydration cost; prefer small islands.

Testing & verification
- Type-check and lint must pass.
- Visual behaviors should be verified on /, /projects, and /work with no RSC errors.

