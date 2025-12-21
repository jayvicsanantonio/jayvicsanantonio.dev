import type { Metadata } from "next";

import WorkPageContent from "./_components/WorkPageContent";

const siteUrl = new URL("https://jayvicsanantonio.dev");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Experience | Jayvic San Antonio",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Jayvic San Antonio",
    description:
      "Timeline of enterprise adtech, platform, and product engineering roles showcasing leadership and system scale.",
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}
