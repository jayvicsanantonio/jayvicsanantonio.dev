"use client";

import type { Metadata } from 'next';
import { useRef } from "react";
import Hero from "@/components/pages/home/Hero";
import AboutMe from "@/components/pages/home/AboutMe";
import FeaturedProjects from "@/components/pages/home/FeaturedProjects";
import GetInTouch from "@/components/pages/home/GetInTouch";

export const metadata: Metadata = {
  title: 'Home | Jayvic San Antonio - Software Engineer',
  description: 'Welcome to the portfolio of Jayvic San Antonio, a skilled software engineer specializing in web development. Explore projects, learn about my experience, and get in touch.',
  keywords: ['jayvic san antonio', 'home', 'portfolio', 'software engineer', 'web developer'],
  openGraph: {
    title: 'Home | Jayvic San Antonio - Software Engineer',
    description: 'Welcome to the portfolio of Jayvic San Antonio, a skilled software engineer specializing in web development. Explore projects, learn about my experience, and get in touch.',
    url: 'https://jayvicsanantonio.dev/',
    // Potentially a specific image for the home page
    images: [
      {
        url: 'https://jayvicsanantonio.dev/images/home/profile-image.webp', // Example specific image
        width: 800, // Adjust as needed
        height: 600, // Adjust as needed
        alt: 'Jayvic San Antonio - Profile',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | Jayvic San Antonio - Software Engineer',
    description: 'Welcome to the portfolio of Jayvic San Antonio, a skilled software engineer specializing in web development. Explore projects, learn about my experience, and get in touch.',
    images: ['https://jayvicsanantonio.dev/images/home/profile-image.webp'], // Example specific image
  },
};

export default function Page() {
  const aboutRef = useRef<HTMLElement>(null);
  const featuredProjectsRef = useRef<HTMLElement>(null);
  const getInTouchRef = useRef<HTMLElement>(null);

  return (
    <>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Jayvic San Antonio",
            "url": "https://jayvicsanantonio.dev",
            "jobTitle": "Software Engineer",
            "description": "Highly skilled senior web developer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions.",
            "image": "https://jayvicsanantonio.dev/images/home/profile-image.webp"
          }
        `}
      </script>
      <Hero aboutRef={aboutRef} />
      <AboutMe aboutRef={aboutRef} />
      <FeaturedProjects featuredProjectsRef={featuredProjectsRef} />
      <GetInTouch getInTouchRef={getInTouchRef} />
    </>
  );
}
