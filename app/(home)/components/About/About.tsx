"use client";

import { useRef, type MutableRefObject } from "react";
import { useAboutAnimation } from "../../hooks/use-about-animation";
import { AboutLabel } from "./AboutLabel";
import { AboutContent } from "./AboutContent";
import { Z_INDEX } from "@/lib/constants";

type AboutProps = {
  sectionRef?: MutableRefObject<HTMLElement | null> | null;
};

export default function About({ sectionRef }: AboutProps) {
  const localSectionRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);

  // Use the passed ref if available, otherwise use local ref
  const finalSectionRef = (sectionRef || localSectionRef) as MutableRefObject<HTMLElement | null>;

  useAboutAnimation({
    sectionRef: finalSectionRef,
    labelRef,
    letterRefs,
    paragraph1Ref,
    paragraph2Ref,
  });

  const addToLetterRefs = (el: HTMLSpanElement | null) => {
    if (el && !letterRefs.current.includes(el)) {
      letterRefs.current.push(el);
    }
  };

  return (
    <section
      ref={finalSectionRef}
      className={`relative isolate z-[${Z_INDEX.ABOUT_SECTION}] flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#022b37] px-20 text-white`}
      aria-label="About Jayvic San Antonio"
    >
      <div className={`relative z-[${Z_INDEX.ABOUT_CONTENT}] mx-auto flex w-full max-w-[92rem] flex-col items-center gap-12 md:flex-row md:items-center`}>
        <AboutLabel labelRef={labelRef} addToLetterRefs={addToLetterRefs} />
        <AboutContent paragraph1Ref={paragraph1Ref} paragraph2Ref={paragraph2Ref} />
      </div>
    </section>
  );
}
