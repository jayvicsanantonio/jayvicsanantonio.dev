import type { CSSProperties } from "react";

import { HERO_NAV_PILL_HEIGHT, HERO_NAV_PILL_WIDTH } from "./Navigation";

export const PANEL_BORDER_RADIUS = "32px";
export const PILL_SHRINK_BOX_SHADOW =
  "0 24px 45px rgba(1,11,26,0.65), 0 0 45px rgba(34,211,238,0.35)";
export const PILL_SHRINK_BACKGROUND = "rgba(4,15,32,0.95)";
export const PILL_SHRINK_BORDER = "rgba(34,211,238,0.75)";
export const TARGET_PILL_WIDTH = HERO_NAV_PILL_WIDTH;
export const TARGET_PILL_HEIGHT = HERO_NAV_PILL_HEIGHT;
export const VIDEO_OVERLAY_BACKGROUND =
  "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.45), transparent 45%), radial-gradient(circle at 80% 30%, rgba(59,130,246,0.35), transparent 40%), linear-gradient(180deg, rgba(6,16,35,0.25), rgba(1,5,11,0.75))";
export const PROFILE_DROP_SHADOW =
  "drop-shadow(0 24px 36px rgba(0,0,0,0.55)) drop-shadow(0 0 20px rgba(34,211,238,0.45))";
export const HERO_SCROLL_DISTANCE = 0.2;
export const PROFILE_BASE_Z_INDEX = 30;
export const PROFILE_COVER_Z_INDEX = -5;

export const FINAL_GEOMETRY_STATE = {
  width: "100%",
  height: "100%",
  left: "50%",
  top: "50%",
  xPercent: -50,
  yPercent: -50,
};

export const FINAL_PANEL_STATE = {
  ...FINAL_GEOMETRY_STATE,
  borderRadius: PANEL_BORDER_RADIUS,
};

export const INITIAL_NAV_ROW_STYLE: CSSProperties = {
  visibility: "hidden",
};

export const SCROLL_SMOOTHER_CONFIG = {
  smooth: 1.2,
  smoothTouch: 0.12,
  effects: true,
  normalizeScroll: true,
  ignoreMobileResize: true,
};

export const PROFILE_SCROLL_CONFIG = {
  scale: 0.55,
  yPercent: 0,
  transformOrigin: "50% 100%",
  ease: "none" as const,
};
