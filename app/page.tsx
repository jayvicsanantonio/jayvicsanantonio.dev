"use client";

import { useRef } from "react";
import Hero from "@/components/pages/home/Hero";
import AboutMe from "@/components/pages/home/AboutMe";
import FeaturedProjects from "@/components/pages/home/FeaturedProjects";
import BlogPosts from "@/components/pages/home/BlogPosts";
import GetInTouch from "@/components/pages/home/GetInTouch";

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
