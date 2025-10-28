"use cache";

import { Suspense } from "react";

import AmbientBackground from "@/components/shell/AmbientBackground";
import ClientAppShell from "@/components/shell/ClientAppShell.client";

export default async function Body({
  children,
  fontVars,
}: {
  children: React.ReactNode;
  fontVars?: string;
}) {
  return (
    <body
      className={`dark ${fontVars ?? ""} flex min-h-screen flex-col text-gray-200 dark:bg-gray-950 touch-manipulation overscroll-y-contain`}
    >
      <AmbientBackground />
      <Suspense fallback={null}>
        <ClientAppShell>{children}</ClientAppShell>
      </Suspense>
    </body>
  );
}
