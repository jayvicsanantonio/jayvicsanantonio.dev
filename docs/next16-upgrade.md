# Next.js 16 Upgrade Guide (project-specific)

This guide summarizes what’s new in Next.js 16 and how those changes affect this repo. It includes exact references to files in this project and ready-to-apply examples.

## TL;DR

- Latest on npm: `next@16.0.0`
- This project: `next` ^16.0.0 (upgraded from 15.3.5)
- Completed migration highlights:
  1. Upgraded Next.js, React, and React DOM to the v16/19.2 stack.
  2. Replaced `middleware.ts` with `proxy.ts` for mobile/Safari rewrites.
  3. Removed legacy Next.js ESLint wiring; adopted ESLint flat config + Prettier scripts.
  4. Enabled `cacheComponents`, `reactCompiler`, and Turbopack dev cache in `next.config.mjs`.

## What’s new in Next.js 16

- Partial Pre-Rendering (PPR) configuration changes
  - `cacheComponents` replaces prior experimental flags (`experimental.dynamicIO` removed in v16).
  - Optional: enable at the top level in `next.config`.

- React Compiler (optional)
  - Opt-in via `reactCompiler: true` in `next.config`.
  - You may need `babel-plugin-react-compiler` installed if you want to experiment with it.

- Turbopack moves out of experimental
  - Turbopack config can now live at `nextConfig.turbopack` (top-level) instead of under `experimental`.
  - New dev FS caching flag for faster restarts: `experimental.turbopackFileSystemCacheForDev: true`.

- Image pipeline changes
  - Default `images.minimumCacheTTL` raised to 4h (14400s). Set to `60` if you need pre-v16 behavior.
  - Default `images.qualities` simplified to `[75]`; specify array if you need more.
  - `16px` was removed from default `imageSizes`; you can explicitly add it back.
  - Query strings on local images now require `images.localPatterns.search` (breaking for such usage).

- Routing/runtime changes
  - `middleware` is superseded by `proxy` (Node.js runtime). `edge` runtime not supported for `proxy`.
  - Optional `skipProxyUrlNormalize` in `next.config` if you rely on the old URL normalization.

- Scroll behavior
  - Next.js no longer overrides `scroll-behavior: smooth` during navigation by default.
  - You can opt back into the old behavior by setting `data-scroll-behavior="smooth"` on `<html>`.

- Linting integration changes
  - `next lint` and the `eslint` option in `next.config` are being phased out in favor of standalone ESLint usage; this repo now relies on `eslint.config.mjs` + pnpm scripts.

## Impact on this repository

- `next.config.mjs`
  - Top-level flags now include `reactCompiler: true`, `cacheComponents: true`, Turbopack config, and `experimental.viewTransition`.
  - Route segments must avoid incompatible configs; we removed the `runtime = "edge"` export from `app/lite/page.tsx` to keep `cacheComponents` happy.

- `proxy.ts` (root)
  - Replaces the legacy `middleware.ts` to reroute Safari/mobile traffic to `/lite` while staying on the Node runtime required by Vercel proxy support.

- Linting and formatting
  - ESLint runs via `eslint.config.mjs` with `pnpm check`, `pnpm fix`, and `pnpm format`; Next.js’s deprecated `eslint` option is no longer present in `next.config.mjs`.

- Global scroll behavior
  - You intentionally enable smooth scroll in CSS:
    - File: `app/globals.css:111` (`:root { scroll-behavior: smooth; }`)
    - File: `app/globals.css:304` (`html { scroll-behavior: smooth; }`)
  - In v16, Next no longer disables smooth scroll during navigation. If you want the previous behavior (temporary override to `auto`), add `data-scroll-behavior="smooth"` to `<html>`.
    - File to change: `app/layout.tsx:79` (the `<html>` element is rendered there)

- Images
  - You already use `images.remotePatterns` (good): `next.config.mjs:17`
  - No local image query strings were found; no action for `images.localPatterns.search`.
  - If you depend on faster revalidation, set `images.minimumCacheTTL: 60`.

## Ready-to-apply code examples

### 1) Upgrade dependencies

```bash
pnpm add next@latest react@latest react-dom@latest
npx @next/codemod@canary upgrade latest
```

### 2) Replace middleware with proxy *(completed)*

- `proxy.ts` at the repo root replaces the former `middleware.ts` to handle Safari/mobile rewrites:

```ts
// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userAgent } from "next/server";

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname !== "/") return NextResponse.next();

  const ua = userAgent(req);
  if (ua.isBot) return NextResponse.next();

  const isMobile = ua.device.type === "mobile" || ua.device.type === "tablet";
  const isSafari = ua.browser.name === "Safari";

  if (isMobile || isSafari) {
    const url = req.nextUrl.clone();
    url.pathname = "/lite";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/"] };
```

- Optional config to preserve URL normalization behavior if needed:

```ts
// next.config.mjs (add at top-level)
export default {
  // ...
  skipProxyUrlNormalize: true,
};
```


### 3) next.config.mjs after migration

`next.config.mjs` now enables the core Next 16 features we care about:

```ts
import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    viewTransition: true,
    turbopackFileSystemCacheForDev: true,
  },
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
```

Linting lives entirely in `eslint.config.mjs`, with `pnpm check`, `pnpm fix`, and `pnpm format` wiring ESLint + Prettier.

### 4) Preserve prior scroll behavior during navigation (optional)

If you notice different scroll behavior after the upgrade, opt back into the old temporary override by adding `data-scroll-behavior="smooth"` on `<html>`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
```

### 5) React Compiler (optional)

If you enable `reactCompiler: true`, also install the Babel plugin to experiment:

```bash
pnpm add -D babel-plugin-react-compiler@latest
```

No `.babelrc` is required by default, but advanced setups may configure it.

## Verification checklist

- Scripts:
  - `pnpm check`, `pnpm type-check` pass.
  - `pnpm build` succeeds; `pnpm start` runs without warnings.
- Routes and rewrites:
  - Visit `/` on mobile and Safari → verify rewrite to `/lite` still works.
- Images:
  - Local images load as expected; remote GitHub avatars still allowed.
  - If you need frequent image updates, consider `images.minimumCacheTTL: 60`.
- Scroll:
  - Verify route transitions and in-page anchor links feel right. If not, apply the `<html data-scroll-behavior="smooth" />` change.

## File references in this repo

- `next.config.mjs:10` (experimental.viewTransition)
- `next.config.mjs` – feature flags (`reactCompiler`, `cacheComponents`, Turbopack cache) and image remote patterns.
- `proxy.ts` – Safari/mobile rewrite logic on the Node runtime.
- `app/globals.css` – smooth-scroll declarations (lines ~111 and ~304).
- `app/layout.tsx` – `<html>` element for optional `data-scroll-behavior="smooth"` attribute.
- `eslint.config.mjs` – flat ESLint configuration used by `pnpm check`.

## Appendix: Useful commands

- Upgrade to latest stable:

```bash
pnpm add next@latest react@latest react-dom@latest
```

- Run the official codemod suite:

```bash
npx @next/codemod@canary upgrade latest
```

- Opt into canary (to test a fix before stable):

```bash
pnpm add next@canary
```
