"use client";

import {
  useEffect,
  useState,
  MouseEventHandler,
  TouchEventHandler,
} from "react";
import Image from "next/image";
import Link from "next/link";
import useBoop from "@/hooks/use-boop";
import Bluesky from "@/components/icons/Bluesky";
import { animated } from "react-spring";
import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero({
  aboutRef,
}: {
  aboutRef: React.RefObject<HTMLElement>;
}) {
  const [style, trigger] = useBoop({ y: 10, timing: 200 });
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

  const scrollToNextSection = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative h-screen flex flex-col-reverse md:flex-row items-center space-x-10 px-4 pb-96 md:pb-80">
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
            className="text-lg lg:text-3xl font-light uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-purple-300"
          >
            {roles[activeIndex]}
          </motion.h2>
        </div>
        <p className="text-lg lg:text-xl text-gray-200 text-center md:text-left">
          Turning caffeine into code and transforming challenges into innovative
          web solutions that make a difference.
        </p>
        <div className="flex space-x-6 justify-center md:justify-start">
          <Link
            href="https://github.com/jayvicsanantonio"
            passHref
            legacyBehavior
          >
            <a
              href="https://github.com/jayvicsanantonio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Github className="w-8 h-8" />
            </a>
          </Link>
          <Link
            href="https://www.linkedin.com/in/jayvicsanantonio/"
            passHref
            legacyBehavior
          >
            <a
              href="https://www.linkedin.com/in/jayvicsanantonio/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-8 h-8" />
            </a>
          </Link>
          <Link
            href="https://bsky.app/profile/jayvicsanantonio.dev"
            passHref
            legacyBehavior
          >
            <a
              href="https://bsky.app/profile/jayvicsanantonio.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Bluesky className="w-8 h-8" />
            </a>
          </Link>
          <Link href="mailto:hi@jayvicsanantonio.dev" passHref legacyBehavior>
            <a
              href="mailto:hi@jayvicsanantonio.dev"
              className="hover:text-blue-400 transition-colors"
            >
              <Mail className="w-8 h-8" />
            </a>
          </Link>
        </div>
      </div>
      <Image
        alt="Profile"
        className="rounded-full border-4 border-gray-800 shadow-xl md:mb-0 mb-8"
        height={340}
        loading="eager"
        src="/images/home/profile-image.jpeg"
        style={{
          aspectRatio: "340/340",
          objectFit: "cover",
        }}
        width={340}
        priority={true}
      />
      <div className="absolute bottom-52 left-1/2 md:-translate-x-1/2 -translate-x-16">
        <animated.button
          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-full p-2"
          onClick={scrollToNextSection}
          onMouseEnter={trigger as MouseEventHandler<HTMLButtonElement>}
          onTouchStart={trigger as TouchEventHandler<HTMLButtonElement>}
          aria-label="Scroll to About section"
          style={style}
        >
          <ChevronDown size={40} />
        </animated.button>
      </div>
    </section>
  );
}