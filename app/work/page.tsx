import type { Metadata } from "next";

import WorkPageContent from "./_components/WorkPageContent.client";

export const metadata: Metadata = {
  title: "Experience | Jayvic San Antonio",
  description:
    "Timeline of enterprise adtech, platform, and product engineering roles showcasing leadership, system scale, and measurable impact.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}
