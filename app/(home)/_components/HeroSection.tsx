"use cache";

import { Suspense } from "react";

import { HeroFallback } from "@/components/fallbacks";
import { getHeroConfig } from "@/lib/content/hero";

import HeroMorphIsland from "./HeroMorphIsland.client";

export default async function HeroSection() {
  const config = await getHeroConfig();
  return (
    <Suspense fallback={<HeroFallback />}>
      <HeroMorphIsland config={config} />
    </Suspense>
  );
}
