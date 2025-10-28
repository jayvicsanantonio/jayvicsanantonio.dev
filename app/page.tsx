"use cache";

import type { Metadata } from "next";

import HeroSection from "@/app/(home)/_components/HeroSection";

export const metadata: Metadata = {
  title: "Jayvic San Antonio | Senior Software Engineer",
  description:
    "Bay Area-based full-stack engineer building high-performance web experiences and reliable systems.",
  alternates: {
    canonical: "/",
  },
};

export default async function Page() {
  return (
    <main>
      <h1 className="sr-only">Jayvic San Antonio — Software Engineer</h1>
      <HeroSection />
    </main>
  );
}
