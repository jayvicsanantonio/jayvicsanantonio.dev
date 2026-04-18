import localFont from "next/font/local";

import Body from "@/components/layout/Body";
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://jayvicsanantonio.dev"),
  title: {
    default: "Jayvic San Antonio | Full-Stack Software Engineer",
    template: "%s | Jayvic San Antonio",
  },
  description:
    "Highly skilled full-stack software engineer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions. Contact me to learn more about my expertise.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Jayvic San Antonio", url: "https://jayvicsanantonio.dev" }],
  creator: "Jayvic San Antonio",
  publisher: "Jayvic San Antonio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://jayvicsanantonio.dev",
    siteName: "Jayvic San Antonio",
    title: "Jayvic San Antonio | Full-Stack Software Engineer",
    description:
      "Highly skilled full-stack software engineer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Jayvic San Antonio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayvic San Antonio | Full-Stack Software Engineer",
    description:
      "Highly skilled full-stack software engineer with a proven track record of delivering successful web projects.",
    images: ["/opengraph-image"],
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
      <Body fontVars={oswaldLocal.variable}>{children}</Body>
    </html>
  );
}
