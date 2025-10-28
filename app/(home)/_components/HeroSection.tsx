"use cache";

import { Suspense } from "react";

import { HeroFallback } from "@/components/fallbacks";
import { PPR_ENABLED } from "@/lib/config/ppr";
import { getHeroConfig } from "@/lib/content/hero";

import HeroMorphIsland from "./HeroMorphIsland.client";

export default async function HeroSection() {
  const config = await getHeroConfig();
  const island = <HeroMorphIsland config={config} />;
  if (!PPR_ENABLED) {
    return island;
  }
  return <Suspense fallback={<HeroFallback />}>{island}</Suspense>;
}
