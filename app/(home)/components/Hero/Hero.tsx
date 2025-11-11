import HeroStage from "./Stage";
import { INITIAL_NAV_ROW_STYLE } from "./hero.constants";
import type { HeroAnimationRefs } from "./hero.types";

export type HeroProps = {
  heroSectionRef: HeroAnimationRefs["heroSectionRef"];
  containerRef: HeroAnimationRefs["containerRef"];
  navRowRef: HeroAnimationRefs["navRowRef"];
  pillRef: HeroAnimationRefs["pillRef"];
  videoRef: HeroAnimationRefs["videoRef"];
  videoOverlayRef: HeroAnimationRefs["videoOverlayRef"];
  pillContentRef: HeroAnimationRefs["pillContentRef"];
  pillSkinRef: HeroAnimationRefs["pillSkinRef"];
};

export default function Hero({
  heroSectionRef,
  containerRef,
  navRowRef,
  pillRef,
  videoRef,
  videoOverlayRef,
  pillContentRef,
  pillSkinRef,
}: HeroProps) {
  return (
    <section ref={heroSectionRef} className="relative min-h-screen overflow-hidden">
      <HeroStage
        {...{
          containerRef,
          navRowRef,
          navRowBaseStyle: INITIAL_NAV_ROW_STYLE,
          pillRef,
          videoRef,
          videoOverlayRef,
          pillContentRef,
          pillSkinRef,
        }}
      />
    </section>
  );
}
