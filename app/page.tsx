import type { Metadata } from "next";
import HomePageContent from "./(home)/components/HomePageContent";

import {
  createHomePersonSchema,
  createHomeWebsiteSchema,
  serializeJsonLd,
} from "@/lib/structured-data";

const siteUrl = new URL("https://jayvicsanantonio.dev");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Jayvic San Antonio | Full-Stack Software Engineer",
  description:
    "Bay Area-based full-stack engineer building high-performance web experiences and reliable systems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jayvic San Antonio | Full-Stack Software Engineer",
    description:
      "Bay Area-based full-stack software engineer building high-performance web experiences and reliable systems.",
    url: "https://jayvicsanantonio.dev",
    siteName: "Jayvic San Antonio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayvic San Antonio | Full-Stack Software Engineer",
    description:
      "Bay Area-based full-stack software engineer building high-performance web experiences and reliable systems.",
  },
};

export default function Page() {
  const personSchema = createHomePersonSchema();
  const websiteSchema = createHomeWebsiteSchema();

  return (
    <div className="min-h-[380vh] bg-gradient-to-b from-black  via-gray-800 to-gray-200 ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
      />
      <HomePageContent />
    </div>
  );
}
