"use cache";

import { Suspense, lazy } from "react";

import { NavRowSkeleton } from "@/components/fallbacks";

const NavRowIsland = lazy(() => import("./NavRow.client"));

export default function NavRowSection() {
  return (
    <Suspense fallback={<NavRowSkeleton />}>
      <NavRowIsland />
    </Suspense>
  );
}
