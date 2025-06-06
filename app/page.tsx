"use client";

import type { Metadata } from 'next';
import { useRef } from "react";
import Hero from "@/components/pages/home/Hero";
import AboutMe from "@/components/pages/home/AboutMe";
import FeaturedProjects from "@/components/pages/home/FeaturedProjects";
import BlogPosts from "@/components/pages/home/BlogPosts";
import GetInTouch from "@/components/pages/home/GetInTouch";

export const metadata: Metadata = {
  title: 'Jayvic San Antonio | Senior Software Engineer & Web Developer',
  description: 'Welcome to the portfolio of Jayvic San Antonio, a highly skilled senior software engineer specializing in web development. Explore projects, read blog posts, and get in touch.',
  openGraph: {
    title: 'Jayvic San Antonio | Senior Software Engineer & Web Developer',
    description: 'Welcome to the portfolio of Jayvic San Antonio, a highly skilled senior software engineer specializing in web development.',
    url: '/', // Relative to metadataBase in layout.tsx
    siteName: 'Jayvic San Antonio Portfolio',
    images: [
      {
        url: '/images/home/profile-image.webp', // Relative to metadataBase
        width: 800,
        height: 600,
        alt: 'Jayvic San Antonio - Profile Image',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jayvic San Antonio | Senior Software Engineer & Web Developer',
    description: 'Welcome to the portfolio of Jayvic San Antonio, a highly skilled senior software engineer specializing in web development.',
    images: ['/images/home/profile-image.webp'], // Relative to metadataBase
    creator: '@jayvicsanantonio',
  },
  alternates: {
    canonical: '/', // Relative to metadataBase
  }
};

export default function Page() {
  const aboutRef = useRef<HTMLElement>(null);
  const featuredProjectsRef = useRef<HTMLElement>(null);
  const blogPostsRef = useRef<HTMLElement>(null);
  const getInTouchRef = useRef<HTMLElement>(null);

  return (
    <>
      <Hero aboutRef={aboutRef} />
      <AboutMe aboutRef={aboutRef} />
      <FeaturedProjects featuredProjectsRef={featuredProjectsRef} />
      <BlogPosts blogPostsRef={blogPostsRef} />
      <GetInTouch getInTouchRef={getInTouchRef} />
    </>
  );
}
