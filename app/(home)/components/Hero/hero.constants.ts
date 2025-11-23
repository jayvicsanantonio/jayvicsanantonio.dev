import type { CSSProperties } from "react";

export const PANEL_BORDER_RADIUS = "32px";
export const PILL_SHRINK_BOX_SHADOW =
  "0 24px 45px rgba(1,11,26,0.65), 0 0 45px rgba(34,211,238,0.35)";
export const PILL_SHRINK_BACKGROUND = "rgba(4,15,32,0.95)";
export const PILL_SHRINK_BORDER = "rgba(34,211,238,0.75)";
export const VIDEO_WATERMARK_MASK =
  "radial-gradient(ellipse at 94% 88%, rgba(1,5,11,0.92) 0%, rgba(1,5,11,0.86) 18%, rgba(1,5,11,0.72) 34%, rgba(1,5,11,0.52) 52%, rgba(1,5,11,0.16) 70%, rgba(1,5,11,0) 86%)";
export const VIDEO_OVERLAY_BACKGROUND = [
  // Darken bottom-right to fully mask the watermark.
  "radial-gradient(ellipse at 92% 88%, rgba(1,4,12,0.88) 0%, rgba(1,4,12,0.82) 22%, rgba(1,4,12,0.68) 38%, rgba(1,4,12,0.48) 55%, rgba(1,4,12,0) 78%)",
  "radial-gradient(ellipse at 50% 50%, rgba(1,4,12,0) 46%, rgba(1,4,12,0.55) 76%, rgba(1,4,12,0.78) 100%)",
  "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.45), transparent 45%)",
  "radial-gradient(circle at 80% 30%, rgba(59,130,246,0.35), transparent 40%)",
  "linear-gradient(180deg, rgba(6,16,35,0.25), rgba(1,5,11,0.75))",
].join(",");
export const PROFILE_DROP_SHADOW =
  "drop-shadow(0 24px 36px rgba(0,0,0,0.55)) drop-shadow(0 0 20px rgba(34,211,238,0.45))";
// Match the pill shrink scroll distance (one viewport) so profile shrink stays in sync.
export const HERO_SCROLL_DISTANCE = 1;
export const LABEL_EXIT_Y_PERCENT = -185;
export const LABEL_EXIT_SCROLL_DISTANCE = 0.5;
// Keep the floating profile low in the stack so content sections can cover it.
export const PROFILE_BASE_Z_INDEX = 1;
// When covered (e.g., by pinned sections), drop it slightly further.
export const PROFILE_COVER_Z_INDEX = 0;

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
  transformOrigin: "50% 100%",
  ease: "none" as const,
};
