"use cache";

import { Suspense, lazy } from "react";

import { NavRowSkeleton } from "@/components/fallbacks";
import { PPR_ENABLED } from "@/lib/config/ppr";

const NavRowIsland = lazy(() => import("./NavRow.client"));

export default async function NavRowSection() {
  const nav = <NavRowIsland />;
  if (!PPR_ENABLED) {
    return nav;
  }
  return <Suspense fallback={<NavRowSkeleton />}>{nav}</Suspense>;
}
