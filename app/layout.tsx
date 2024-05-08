import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import TwitterIcon from "@/components/icons/twitter";
import Header from "@/components/pages/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
        className={`${inter.variable} max-w-5xl px-4 md:px-12 flex flex-col md:flex-row mx-4 lg:mx-auto min-h-screen bg-gray-950 text-gray-200`}
      >
        <div className="flex flex-col">
          <Header />
          <main className="flex-1 py-12">{children}</main>
          <footer className="bg-gray-950 md:px-8 py-6 text-sm text-gray-200 border-t border-gray-800">
            <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
              <p>© 2024 Jayvic San Antonio. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <Link
                  className="hover:text-gray-200 "
                  href="https://github.com/jpsanantonio"
                  legacyBehavior
                >
                  <a target="_blank">
                    <GithubIcon className="w-5 h-5" />
                  </a>
                </Link>
                <Link
                  className="hover:text-gray-200 "
                  href="https://twitter.com/jpsanantonio"
                  legacyBehavior
                >
                  <a target="_blank">
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                </Link>
                <Link
                  className="hover:text-gray-200 "
                  href="https://www.linkedin.com/in/jayvicsanantonio/"
                  legacyBehavior
                >
                  <a target="_blank">
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
