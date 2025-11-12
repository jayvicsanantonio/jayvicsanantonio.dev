import type { Metadata } from "next";
import HomePageContent from "./(home)/components/HomePageContent";

export const metadata: Metadata = {
  title: "Jayvic San Antonio | Full-Stack Software Engineer",
  description:
    "Bay Area-based full-stack engineer building high-performance web experiences and reliable systems.",
  alternates: {
    canonical: "/",
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
