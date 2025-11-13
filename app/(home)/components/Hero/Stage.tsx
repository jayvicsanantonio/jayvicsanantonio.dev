import Navigation from "./Navigation";
import Pill from "./Pill";

import type { StageProps } from "./hero.types";

export default function Stage({
  containerRef,
  navRowRef,
  navRowBaseStyle,
  pillRef,
  videoRef,
  videoOverlayRef,
  pillContentRef,
  pillSkinRef,
}: StageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute left-0 right-0 top-0 bottom-[12px] px-7 pt-7 pb-[120px] [--nav-row-w:calc(3.5rem*4+0.75rem*3)] [--pill-h:54px] sm:bottom-[24px] sm:[--nav-row-w:20vw] sm:[--pill-h:8vh] md:bottom-[40px] md:[--nav-row-w:24vw]"
    >
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div
            ref={navRowRef}
            data-testid="HeroNavRow"
            className="opacity-0"
            style={navRowBaseStyle}
          >
            <Navigation />
          </div>
        </div>
        <Pill
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
