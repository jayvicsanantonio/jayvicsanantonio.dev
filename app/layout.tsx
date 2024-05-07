import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import CodeIcon from "@/components/icons/code";
import MenuIcon from "@/components/icons/menu";
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import TwitterIcon from "@/components/icons/twitter";
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
        className={`${inter.variable} max-w-5xl px-12 flex flex-col md:flex-row mx-4 lg:mx-auto min-h-screen bg-gray-950 text-gray-50`}
      >
        <div className="flex flex-col">
          <header className="flex items-center justify-between py-6 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <CodeIcon className="w-6 h-6" />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link
                className="text-sm font-medium hover:underline hover:animate-pulse"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium hover:underline hover:animate-pulse"
                href="/blog"
              >
                Blog
              </Link>
              <Link
                className="text-sm font-medium hover:underline hover:animate-pulse"
                href="/projects"
              >
                Projects
              </Link>
            </nav>
            <Button
              aria-label="Toggle navigation"
              className="md:hidden"
              size="icon"
              variant="ghost"
            >
              <MenuIcon className="w-6 h-6" />
            </Button>
          </header>
          <main className="flex-1 py-12">{children}</main>
          <footer className="bg-gray-800 px-8 py-6 text-sm text-gray-400">
            <div className="container mx-auto flex items-center justify-between">
              <p>© 2024 Jayvic San Antonio. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <Link
                  className="hover:text-gray-50 hover:animate-pulse"
                  href="https://github.com/jpsanantonio"
                  legacyBehavior
                >
                  <a target="_blank">
                    <GithubIcon className="w-5 h-5" />
                  </a>
                </Link>
                <Link
                  className="hover:text-gray-50 hover:animate-pulse"
                  href="https://twitter.com/jpsanantonio"
                  legacyBehavior
                >
                  <a target="_blank">
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                </Link>
                <Link
                  className="hover:text-gray-50 hover:animate-pulse"
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
