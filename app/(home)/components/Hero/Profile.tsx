"use client";

import Image from "next/image";

import { PROFILE_BASE_Z_INDEX, PROFILE_DROP_SHADOW } from "../config";
import { useHeroContext } from "../../context/HeroContext";
import meImage from "@/public/images/me.webp";

export default function Profile({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const { profileRef } = useHeroContext();

  return (
    <div
      ref={profileRef}
      className="pointer-events-none fixed bottom-0 left-1/2 w-[55vw] max-w-[880px] min-w-[320px] -translate-x-1/2 opacity-0"
      style={{
        willChange: prefersReducedMotion ? undefined : "transform, opacity",
        zIndex: PROFILE_BASE_Z_INDEX,
      }}
    >
      <div className="relative w-full">
        <Image
          src={meImage}
          alt="Jayvic San Antonio"
          width={1280}
          height={720}
          priority
          fetchPriority="high"
          placeholder="blur"
          className="block w-full object-contain"
          style={{ filter: PROFILE_DROP_SHADOW }}
          sizes="(max-width: 600px) 90vw, (max-width: 1200px) 55vw, 880px"
        />
      </div>
    </div>
  );
}
