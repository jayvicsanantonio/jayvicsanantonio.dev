"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Bluesky from "@/components/icons/Bluesky";
import ScrollDown from "@/components/pages/ScrollDown";
import SocialMediaIconButton from "@/components/pages/home/SocialMediaIconButton";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero({
  aboutRef,
}: {
  aboutRef: React.RefObject<HTMLElement>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const roles = [
    "Full-Stack Web Developer",
    "JavaScript Specialist",
    "React Expert",
    "Node.JS Developer",
    "UI/UX Enthusiast",
    "Performance Optimization Advocate",
    "Creative Thinker",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex flex-col-reverse justify-end md:flex-row items-center px-4 pb-60 text-gray-950 dark:text-gray-200">
      <div className="space-y-6">
        <div className="font-oswald lg:space-y-2 flex flex-col items-center md:items-start">
          <h1 className="font-title text-4xl font-bold leading-snug lg:text-6xl ">
            Hey, I'm Jayvic 👋
          </h1>
          <motion.h2
            key={activeIndex}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg lg:text-3xl font-light uppercase bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 will-change-transform"
          >
            {roles[activeIndex]}
          </motion.h2>
        </div>
        <p className="text-lg lg:text-xl text-center md:text-left">
          Turning caffeine into code and transforming challenges into innovative
          web solutions that make a difference.
        </p>
        <div className="flex space-x-6 justify-center md:justify-start">
          <SocialMediaIconButton
            Icon={Github}
            link="https://github.com/jayvicsanantonio"
          >
            Github
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Linkedin}
            link="https://www.linkedin.com/in/jayvicsanantonio/"
          >
            LinkedIn
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Bluesky}
            link="https://bsky.app/profile/jayvicsanantonio.dev"
          >
            Bluesky
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Mail}
            link="mailto:hi@jayvicsanantonio.dev"
          >
            Email
          </SocialMediaIconButton>
        </div>
      </div>
      <Image
        alt="Profile"
        className="rounded-full md:mb-0 mb-8 p-1.5"
        height={340}
        loading="eager"
        src="/images/home/profile-image.jpg"
        style={{
          aspectRatio: "340/340",
          objectFit: "cover",
        }}
        width={340}
        priority={true}
      />
      <ScrollDown sectionRef={aboutRef} />
    </section>
  );
}
