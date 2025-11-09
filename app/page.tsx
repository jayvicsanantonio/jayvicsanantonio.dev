import type { Metadata } from "next";

import Hero from "@/app/(home)/_components/Hero";
import AboutSection from "@/app/(home)/_components/AboutSection.client";

const PAGE_TITLE = "Jayvic San Antonio | Senior Software Engineer";
const PAGE_DESCRIPTION =
  "Bay Area-based full-stack engineer building high-performance web experiences and reliable systems.";
const SR_HEADING = "Jayvic San Antonio — Full-Stack Software Engineer";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return (
    <main>
      <h1 className="sr-only">{SR_HEADING}</h1>
      <Hero>
        <AboutSection />
      </Hero>
    </main>
  );
}
