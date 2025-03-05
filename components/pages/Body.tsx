"use client";

import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/pages/Header";
import Footer from "@/components/pages/Footer";
import useLocalStorage from "@/hooks/use-local-storage";
import Theme from "@/types/theme";

const sourceSansPro = localFont({
  src: [
    {
      path: "../../public/fonts/SourceSansPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SourceSansPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/SourceSansPro-Bold.woff2",
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
      path: "../../public/fonts/oswald.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/oswald.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-oswald",
});

export default function Body({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark");

  return (
    <body
      className={`${theme === "light" ? "" : "dark"} ${
        sourceSansPro.variable
      } ${
        oswald.variable
      }  flex flex-col md:flex-row min-h-screen dark:bg-gray-950 text-gray-200`}
    >
      <div
        className={`font-source-sans flex flex-col max-w-5xl px-4 md:px-12 mx-4 lg:mx-auto ${
          theme === "light" ? "" : "dark"
        }`}
      >
        <Header theme={theme} setTheme={setTheme} />
        <main className="flex-1 py-12">{children}</main>
        <Footer />
      </div>
      <Toaster />
      <SpeedInsights />
      <Analytics />
    </body>
  );
}
