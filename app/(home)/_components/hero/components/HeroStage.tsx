import NavRow from "../../NavRow.client";
import HeroPill from "./HeroPill";

import type { HeroStageProps } from "../hero.types";

export default function HeroStage({
  containerRef,
  navRowRef,
  navRowBaseStyle,
  pillRef,
  videoRef,
  videoOverlayRef,
  pillContentRef,
  pillSkinRef,
}: HeroStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 px-7 pt-7 pb-[120px] [--nav-row-w:calc(3.5rem*4+0.75rem*3)] [--pill-h:54px] sm:[--nav-row-w:20vw] sm:[--pill-h:8vh] md:[--nav-row-w:24vw]"
    >
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div ref={navRowRef} data-testid="HeroNavRow" className="opacity-0" style={navRowBaseStyle}>
            <NavRow />
          </div>
        </div>
        <HeroPill
          {...{
            pillRef,
            videoRef,
            videoOverlayRef,
            pillContentRef,
            pillSkinRef,
          }}
        />
      </div>
    </div>
  );
}
