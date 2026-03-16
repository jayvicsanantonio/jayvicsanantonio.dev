import type { Metadata } from "next";

import WorkPageContent from "./_components/WorkPageContent";

import { createWorkCollectionSchema, serializeJsonLd } from "@/lib/structured-data";

const siteUrl = new URL("https://jayvicsanantonio.dev");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Experience",
  description:
    "Timeline of enterprise adtech, platform, and product engineering roles showcasing leadership, system scale, and measurable impact.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Experience | Jayvic San Antonio",
    description:
      "Timeline of enterprise adtech, platform, and product engineering roles showcasing leadership, system scale, and measurable impact.",
    url: "https://jayvicsanantonio.dev/work",
    siteName: "Jayvic San Antonio",
    type: "website",
    images: [{ url: "/work/opengraph-image", width: 1200, height: 630, alt: "Experience" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Jayvic San Antonio",
    description:
      "Timeline of enterprise adtech, platform, and product engineering roles showcasing leadership and system scale.",
    images: ["/work/opengraph-image"],
  },
};

const EXPERIENCES_FOR_STRUCTURED_DATA = [
  {
    title: "Independent Builder and AI Upskilling",
    company: "Professional Sabbatical",
    period: "2023 - Present",
  },
  {
    title: "Software Engineer",
    company: "Yahoo Inc.",
    period: "2016 - 2023",
  },
  {
    title: "Co-Founder",
    company: "Saffron Technologies Inc.",
    period: "2015 - 2016",
  },
  {
    title: "Software Engineer",
    company: "Voyager Innovations Inc.",
    period: "2013 - 2016",
  },
  {
    title: "Intern",
    company: "University of the Philippines Diliman CRS",
    period: "2011 - 2012",
  },
] as const;

export default function WorkPage() {
  const workSchema = createWorkCollectionSchema([...EXPERIENCES_FOR_STRUCTURED_DATA]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(workSchema) }}
      />
      <WorkPageContent />
    </>
  );
}
