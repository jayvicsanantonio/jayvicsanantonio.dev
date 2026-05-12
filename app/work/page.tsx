import type { Metadata } from "next";

import WorkPageContent from "./_components/WorkPageContent";
import { EXPERIENCES } from "./_data/experiences";

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

export default function WorkPage() {
  const workSchema = createWorkCollectionSchema([...EXPERIENCES]);

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
