import createBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  reactCompiler: false,
  cacheComponents: false,
  experimental: {
    viewTransition: false,
    turbopackFileSystemCacheForDev: true,
  },
  turbopack: {},
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
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
