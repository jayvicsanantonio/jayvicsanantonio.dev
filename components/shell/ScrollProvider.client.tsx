"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollReset } from "@/hooks/useScrollReset";
import ScrollProgressBar from "./ScrollProgressBar.client";

gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode };

export default function ScrollProvider({ children }: Props) {
  const progress = useScrollProgress();
  useScrollReset();

  return (
    <>
      {children}
      <ScrollProgressBar progress={progress} />
    </>
  );
}
