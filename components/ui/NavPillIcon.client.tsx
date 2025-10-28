"use client";

import { Icon } from "@iconify/react";

type NavPillIconProps = {
  name: string;
  size?: number;
};

export default function NavPillIcon({ name, size = 32 }: NavPillIconProps) {
  return (
    <span
      aria-hidden
      className="grid h-[clamp(24px,6vw,36px)] w-[clamp(24px,6vw,36px)] place-items-center"
    >
      <Icon icon={name} width={size} height={size} />
    </span>
  );
}
