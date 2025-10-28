import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Toggle Partial Prerendering (PPR) incrementally via env flag.
const PPR_ENABLED = process.env.PPR_ENABLED === 'true';

const experimental = {
  viewTransition: true,
  // Persist dev artifacts on disk to speed up restarts
  turbopackFileSystemCacheForDev: true,
  ...(PPR_ENABLED ? { ppr: 'incremental' } : {}),
};

const nextConfig = {
  reactStrictMode: true,
  // React Compiler disabled to match current rollout status
  reactCompiler: false,
  // Re-enable Partial Pre-Rendering cache components
  cacheComponents: true,
  experimental,
  // Enable Turbopack (Next.js 16 defaults to Turbopack).
  // Adding an empty config silences the error when a plugin adds a webpack config.
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
