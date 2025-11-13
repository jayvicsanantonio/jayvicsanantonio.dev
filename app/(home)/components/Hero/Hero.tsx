import HeroStage from "./Stage";
import Nameplate from "./Nameplate";
import { INITIAL_NAV_ROW_STYLE } from "./hero.constants";
import type { HeroAnimationRefs } from "./hero.types";

export type HeroProps = {
  heroSectionRef: HeroAnimationRefs["heroSectionRef"];
  containerRef: HeroAnimationRefs["containerRef"];
  navRowRef: HeroAnimationRefs["navRowRef"];
  nameplateRef: HeroAnimationRefs["nameplateRef"];
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
  nameplateRef,
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
      <Nameplate nameplateRef={nameplateRef} />
    </section>
  );
}
