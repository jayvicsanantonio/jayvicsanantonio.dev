import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import TwitterIcon from "@/components/icons/twitter";
import Header from "@/components/pages/Header";
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
        className={`${sourceSansPro.variable} ${oswald.variable} max-w-5xl px-4 md:px-12 mx-4 lg:mx-auto flex flex-col md:flex-row min-h-screen bg-gray-950 text-gray-200`}
      >
        <div className="font-source-sans flex flex-col">
          <Header />
          <main className="flex-1 py-12">{children}</main>
          <footer className="bg-gray-950 md:px-8 py-6 text-gray-200 border-t border-gray-800">
            <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
              <p>© 2024 Jayvic San Antonio. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <Link
                  className="hover:text-gray-200 "
                  href="https://github.com/jpsanantonio"
                  legacyBehavior
                >
                  <a target="_blank" className="hover:text-violet-600">
                    <GithubIcon className="w-5 h-5" />
                  </a>
                </Link>
                <Link
                  className="hover:text-gray-200 "
                  href="https://twitter.com/jpsanantonio"
                  legacyBehavior
                >
                  <a target="_blank" className="hover:text-violet-600">
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                </Link>
                <Link
                  className="hover:text-gray-200 "
                  href="https://www.linkedin.com/in/jayvicsanantonio/"
                  legacyBehavior
                >
                  <a target="_blank" className="hover:text-violet-600">
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                </Link>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
