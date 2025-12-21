import type { Metadata } from "next";
import HomePageContent from "./(home)/components/HomePageContent";

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
  return (
    <div className="min-h-[380vh] bg-gradient-to-b from-black  via-gray-800 to-gray-200 ">
      <HomePageContent>
        <h1 className="sr-only">Jayvic San Antonio — Full-Stack Software Engineer</h1>
      </HomePageContent>
    </div>
  );
}
