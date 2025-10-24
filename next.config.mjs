import { withSentryConfig } from '@sentry/nextjs';
import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    viewTransition: true,
    // Persist dev artifacts on disk to speed up restarts
    turbopackFileSystemCacheForDev: true,
  },
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

export default withSentryConfig(withBundleAnalyzer(nextConfig), {
  org: 'jayvic-san-antonio-hl',
  project: 'jayvicsanantonio-dev',

  silent: !process.env.CI,

  widenClientFileUpload: true,

  reactComponentAnnotation: {
    enabled: true,
  },

  tunnelRoute: '/monitoring',

  hideSourceMaps: true,

  disableLogger: true,

  automaticVercelMonitors: true,
});
