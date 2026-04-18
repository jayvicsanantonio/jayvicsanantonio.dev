"use client";

import { useScrollReset } from "@/hooks/useScrollReset";
import ScrollProgressBar from "./ScrollProgressBar";

type Props = { children: React.ReactNode };

export default function ScrollProvider({ children }: Props) {
  useScrollReset();

  return (
    <>
      {children}
      <ScrollProgressBar />
    </>
  );
}
