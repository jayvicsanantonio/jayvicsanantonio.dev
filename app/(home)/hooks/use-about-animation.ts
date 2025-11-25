import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MutableRefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export type UseAboutAnimationArgs = {
  sectionRef: MutableRefObject<HTMLElement | null>;
  labelRef: MutableRefObject<HTMLElement | null>;
  letterRefs: MutableRefObject<Array<HTMLSpanElement | null>>;
};

export function useAboutAnimation({
  sectionRef,
  labelRef,
  letterRefs,
}: UseAboutAnimationArgs) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      const label = labelRef.current;
      const letters = letterRefs.current;


      if (!section || !label) return;

      // 1. Parallax "ABOUT" Label Container
      // The container moves slower than the scroll, creating a sticky/parallax feel.
      gsap.to(label, {
        yPercent: 350, // Move down significantly to ensure continuous movement
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Letter-by-Letter Reveal
      // Letters appear one by one from the top edge as user scrolls down.
      // With -90deg rotation (counter-clockwise), the local X axis points visually UP.
      // To appear from the "top edge", they need to start from a positive X value (visually above) and move down to 0.
      
      // Ensure letters are initially hidden/positioned (relying on overflow-hidden for mask)
      gsap.set(letters, { 
        x: "500vh", // Start visually "above" (positive X in -90deg rotated space)
        opacity: 0,
      });

      gsap.to(letters, {
        x: 0, // Move to natural position
        opacity: 1,
        ease: "none", // Linear movement for direct scroll linkage
        scrollTrigger: {
          trigger: section,
          start: "top 50%", // Start revealing when top of section is 50% from top of viewport (50% visible)
          end: "bottom bottom", // Finish revealing when bottom of section hits bottom of viewport
          scrub: 1, // Smooth scrubbing linked to scroll
        },
      });


    },
    { scope: sectionRef }
  );
}
