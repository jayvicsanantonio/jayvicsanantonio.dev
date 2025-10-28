import createBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const experimental = {
  viewTransition: true,
  // Persist dev artifacts on disk to speed up restarts
  turbopackFileSystemCacheForDev: true,
};

const nextConfig = {
  reactStrictMode: true,
  // React Compiler disabled to match current rollout status
  reactCompiler: true,
  // Required for `'use cache'` directives and PPR
  cacheComponents: true,
  experimental,
  // Enable Turbopack (Next.js 16 defaults to Turbopack).
  // Adding an empty config silences the error when a plugin adds a webpack config.
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
