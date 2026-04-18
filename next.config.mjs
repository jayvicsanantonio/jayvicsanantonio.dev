import createBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const PUBLIC_ASSET_CACHE_HEADERS = [
  {
    key: "Cache-Control",
    value: "public, max-age=86400, stale-while-revalidate=604800",
  },
];

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
  async headers() {
    return [
      {
        source: "/_next/static/media/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          ...PUBLIC_ASSET_CACHE_HEADERS,
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
      {
        source: "/icon.svg",
        headers: [
          ...PUBLIC_ASSET_CACHE_HEADERS,
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
      {
        source: "/apple-icon.png",
        headers: [
          ...PUBLIC_ASSET_CACHE_HEADERS,
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: PUBLIC_ASSET_CACHE_HEADERS,
      },
      {
        source: "/fonts/:path*",
        headers: PUBLIC_ASSET_CACHE_HEADERS,
      },
      {
        source: "/matrix-horizontal.:extension(webm|mp4)",
        headers: PUBLIC_ASSET_CACHE_HEADERS,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
