"use client";

import Image from "next/image";
import { useLayoutEffect } from "react";

import { PROFILE_BASE_Z_INDEX, PROFILE_DROP_SHADOW } from "./hero.constants";
import type { ProfileProps } from "./hero.types";

export default function Profile({ profileRef, prefersReducedMotion }: ProfileProps) {
  useLayoutEffect(() => {
    const node = profileRef.current;
    if (!node || typeof document === "undefined") {
      return;
    }

    const parent = node.parentNode;
    if (!parent) {
      document.body.appendChild(node);
      return;
    }

    const placeholder = document.createComment("profile-placeholder");
    parent.insertBefore(placeholder, node);
    document.body.appendChild(node);

    return () => {
      if (!placeholder.parentNode) {
        parent.appendChild(node);
      } else {
        placeholder.parentNode.insertBefore(node, placeholder);
        placeholder.remove();
      }
    };
  }, [profileRef]);

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
