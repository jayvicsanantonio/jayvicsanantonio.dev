import Image from "next/image";

import { PROFILE_DROP_SHADOW } from "./hero.constants";
import type { ProfileProps } from "./hero.types";

export default function Profile({ profileRef, prefersReducedMotion }: ProfileProps) {
  return (
    <div
      ref={profileRef}
      className="pointer-events-none fixed bottom-0 left-1/2 z-30 w-[55vw] max-w-[880px] min-w-[320px] -translate-x-1/2 opacity-0"
      style={{ willChange: prefersReducedMotion ? undefined : "transform, opacity" }}
    >
      <div className="relative w-full">
        <Image
          src="/images/me.png"
          alt="Jayvic San Antonio"
          width={1280}
          height={720}
          priority
          className="block w-full object-contain"
          style={{ filter: PROFILE_DROP_SHADOW }}
        />
      </div>
    </div>
  );
}
