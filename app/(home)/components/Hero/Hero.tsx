"use client";

import HeroStage from "./Stage";
import Nameplate from "./Nameplate";
import Designation from "./Designation";
import { useHeroContext } from "../../context/HeroContext";

export default function Hero() {
  const { heroSectionRef } = useHeroContext();

  return (
    <section ref={heroSectionRef} className="relative min-h-screen overflow-hidden">
      <HeroStage />
      <Nameplate />
      <Designation />
    </section>
  );
}
