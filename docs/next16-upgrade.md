# Next.js 16 Upgrade Guide (project-specific)

This guide summarizes what’s new in Next.js 16 and how those changes affect this repo. It includes exact references to files in this project and ready-to-apply examples.

## TL;DR
- Latest on npm: `next@16.0.0`
- This project: `next` ^15.3.0, installed 15.3.5
- Recommended migration steps (safe order):
  1) Upgrade deps, 2) Run codemod, 3) Replace `middleware` with `proxy`, 4) Remove `eslint` config in `next.config`, 5) Opt-in features as needed, 6) Verify images + scroll behavior, 7) Lint/type-check/build.

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
  - `next lint` and the `eslint` option in `next.config` are being phased out in favor of using ESLint/Biome directly.

## Impact on this repository

- `next.config.mjs`
  - You currently set `experimental.viewTransition` and an `eslint` block.
    - File: `next.config.mjs:10` (`experimental.viewTransition`)
    - File: `next.config.mjs:13` (eslint config, ignored during builds)
  - Action:
    - Remove the `eslint` block in v16 (no longer supported); you already use Biome (`pnpm check`).
    - Keep `viewTransition` while verifying v16 docs for this flag; feature naming sometimes shifts between releases.

- `middleware.ts` (root)
  - File: `middleware.ts:5` (function) and `middleware.ts:27` (matcher)
  - In v16, migrate to `proxy` with Node runtime. Example below preserves your logic.

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

### 2) Replace middleware with proxy

- New `proxy.ts` at the repo root (replacing `middleware.ts`) that mirrors your existing logic:

```ts
// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { userAgent } from 'next/server'

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname !== '/') return NextResponse.next()

  const ua = userAgent(req)
  if (ua.isBot) return NextResponse.next()

  const isMobile = ua.device.type === 'mobile' || ua.device.type === 'tablet'
  const isSafari = ua.browser.name === 'Safari'

  if (isMobile || isSafari) {
    const url = req.nextUrl.clone()
    url.pathname = '/lite'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = { matcher: ['/'] }
```

- Optional config to preserve URL normalization behavior if needed:

```ts
// next.config.mjs (add at top-level)
export default {
  // ...
  skipProxyUrlNormalize: true,
}
```

- Remove the old `middleware.ts` once `proxy.ts` is in place.

### 3) Clean up next.config for v16

- Remove the `eslint` option (v16 no longer supports `eslint` config in `next.config`).
- Optional, if you want to try new features:

```ts
// next.config.mjs (illustrative)
const nextConfig = {
  reactStrictMode: true,
  // Enable React Compiler (optional)
  // reactCompiler: true,

  // Enable Partial Pre-Rendering via cacheComponents (optional)
  // cacheComponents: true,

  // Turbopack top-level config (optional)
  // turbopack: {
  //   // options
  // },

  // Faster revalidation for images if you want pre-v16 behavior
  // images: {
  //   minimumCacheTTL: 60,
  //   // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // re-add 16 if needed
  //   // qualities: [50, 75, 100],
  // },
}
```

### 3.1) Switch from Biome to ESLint + Prettier

If you want to move back to ESLint + Prettier (and drop Biome), use one of the following approaches.

- Step A: Remove Biome and update scripts

```bash
pnpm remove @biomejs/biome
# optionally remove the Biome config
git rm -f biome.jsonc
```

Update `package.json` scripts to use ESLint + Prettier instead of Biome:

```diff
  "scripts": {
    "check": "pnpm run check:code && pnpm run check:content",
-   "check:code": "biome check .",
+   "check:code": "eslint . --max-warnings=0",
    "check:content": "prettier --check \"**/*.{css,md,mdx}\"",
    "fix": "pnpm run fix:code && pnpm run fix:content",
-   "fix:code": "biome check --write .",
+   "fix:code": "eslint . --fix",
    "fix:content": "prettier --write \"**/*.{css,md,mdx}\"",
    "format": "pnpm run format:code && pnpm run format:content",
-   "format:code": "biome format --write .",
+   "format:code": "prettier --write \"**/*.{js,jsx,ts,tsx}\"",
    "format:content": "prettier --write \"**/*.{css,md,mdx}\""
  }
```

- Step B: Install ESLint + Prettier deps

```bash
pnpm add -D eslint eslint-config-next@latest eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier
```

- Step C (recommended, simpler): use classic ESLint config

Create `.eslintrc.json` at the repo root:

```json
{
  "root": true,
  "extends": ["next/core-web-vitals"],
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": "."
  },
  "ignorePatterns": [".next/**", "node_modules/**", "reports/**", "artifacts/**"]
}
```

Remove the flat-config stub (it currently ignores everything):

- `eslint.config.mjs:1` – delete this file or replace it with `.eslintrc.json` above.

- Step D: Ensure Prettier formats code as well

You already have `prettier.config.mjs`. Keep `printWidth: 100` and run Prettier across JS/TS too via the updated scripts.

Optional: add `eslint-config-prettier` (already installed in Step B) to disable stylistic rules that conflict with Prettier.

### 4) Preserve prior scroll behavior during navigation (optional)

If you notice different scroll behavior after the upgrade, opt back into the old temporary override by adding `data-scroll-behavior="smooth"` on `<html>`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
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
- `next.config.mjs:13` (eslint config; remove in v16)
- `next.config.mjs:17` (images.remotePatterns)
- `middleware.ts:5` (function), `middleware.ts:27` (matcher)
- `app/globals.css:111` and `app/globals.css:304` (smooth scroll)
- `app/layout.tsx:79` (`<html>` element for optional scroll behavior attribute)
- `eslint.config.mjs:1` (flat-config stub that currently ignores all files)
- `biome.jsonc` (Biome config to remove if switching to ESLint + Prettier)

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
