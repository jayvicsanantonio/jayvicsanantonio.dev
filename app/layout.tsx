import type { Metadata } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/pages/Header";
import Footer from "@/components/pages/Footer";
import "./globals.css";

const sourceSansPro = localFont({
  src: [
    {
      path: "../public/fonts/SourceSansPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SourceSansPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SourceSansPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-source-sans",
});

const oswald = localFont({
  src: [
    {
      path: "../public/fonts/oswald.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/oswald.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Jayvic San Antonio | Web Developer",
  description:
    "Highly skilled senior web developer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions. Contact me to learn more about my expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSansPro.variable} ${oswald.variable} max-w-5xl px-4 md:px-12 mx-4 lg:mx-auto flex flex-col md:flex-row min-h-screen dark:bg-gray-950 text-gray-200 dark`}
      >
        <div className="font-source-sans flex flex-col">
          <Header />
          <main className="flex-1 py-12">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
