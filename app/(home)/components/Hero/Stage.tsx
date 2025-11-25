import Navigation from "./Navigation";
import Pill from "./Pill";
import { useHeroContext } from "../../context/HeroContext";
import { INITIAL_NAV_ROW_STYLE } from "../config";

export default function Stage() {
  const { containerRef, navRowRef } = useHeroContext();

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Centered overlay for the pill with edge padding */}
      <div className="absolute left-2 right-2 top-2 bottom-14 sm:left-4 sm:right-4 sm:top-4 sm:bottom-22 md:left-6 md:right-6 md:top-6 md:bottom-30">
        <Pill />
      </div>
      {/* Padded layer for navigation row and other UI */}
      <div className="absolute left-2 right-2 top-2 bottom-14 px-7 py-7 [--nav-row-w:calc(3.5rem*4+0.75rem*3)] [--pill-h:50px] sm:left-4 sm:right-4 sm:top-4 sm:bottom-22 sm:[--nav-row-w:20vw] sm:[--pill-h:8vh] md:left-6 md:right-6 md:top-6 md:bottom-30 md:[--nav-row-w:24vw]">
        <div className="relative h-full w-full">
          <div className="absolute left-1/2 top-[65%] z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center md:top-1/2">
            <div
              ref={navRowRef}
              data-testid="HeroNavRow"
              className="opacity-0"
              style={INITIAL_NAV_ROW_STYLE}
            >
              <Navigation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
