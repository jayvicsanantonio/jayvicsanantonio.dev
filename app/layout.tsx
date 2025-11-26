import localFont from "next/font/local";

import Body from "@/components/shell/Body";
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://jayvicsanantonio.dev"),
  title: "Jayvic San Antonio | Full-Stack Software Engineer",
  description:
    "Highly skilled full-stack software engineer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions. Contact me to learn more about my expertise.",
  openGraph: {
    type: "website",
    url: "https://jayvicsanantonio.dev",
    siteName: "Jayvic San Antonio",
    title: "Jayvic San Antonio | Full-Stack Software Engineer",
    description:
      "Highly skilled full-stack software engineer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions.",
    images: [
      {
        url: "/images/home/profile-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayvic San Antonio | Full-Stack Software Engineer",
    description:
      "Highly skilled full-stack software engineer with a proven track record of delivering successful web projects.",
    images: ["/images/home/profile-image.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/icons/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        url: "/icons/favicon.svg",
        sizes: "48x48",
        type: "image/svg+xml",
      },
    ],
    apple: "/icons/apple-icon.png",
  },
};

export const viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Regular weight preloaded for LCP-critical body text
const sourceSansPro = localFont({
  src: [
    {
      path: "../public/fonts/SourceSansPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-source-sans",
});

// Light weight - not needed for LCP, disable preload
const sourceSansProLight = localFont({
  src: [
    {
      path: "../public/fonts/SourceSansPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-source-sans",
  preload: false,
});

// Bold weight - not needed for LCP, disable preload
const sourceSansProBold = localFont({
  src: [
    {
      path: "../public/fonts/SourceSansPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-source-sans",
  preload: false,
});

// Use a local fallback mapped to the legacy --font-oswald variable so existing classes continue to work
// Disable preload since headings aren't typically the LCP element
const oswaldLocal = localFont({
  src: [
    {
      path: "../public/fonts/oswald.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-oswald",
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://api.iconify.design" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
      </head>
      <Body
        fontVars={`${sourceSansPro.variable} ${sourceSansProLight.variable} ${sourceSansProBold.variable} ${oswaldLocal.variable}`}
      >
        {children}
      </Body>
    </html>
  );
}
