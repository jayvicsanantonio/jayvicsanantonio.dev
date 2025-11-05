"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  largeText: string;
  children: React.ReactNode;
}

export default function AnimatedSection({
  largeText,
  children,
}: AnimatedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <motion.h1
        style={{ x }}
        className="absolute text-[30rem] font-bold text-gray-200"
      >
        {largeText}
      </motion.h1>
      <div className="z-10 max-w-2xl text-center">{children}</div>
    </section>
  );
}
