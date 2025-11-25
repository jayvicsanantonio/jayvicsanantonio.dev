import { ABOUT_DATA } from "../../data/about-data";
import { type RefObject } from "react";

type AboutLabelProps = {
  labelRef: RefObject<HTMLSpanElement | null>;
  addToLetterRefs: (el: HTMLSpanElement | null) => void;
};

export function AboutLabel({ labelRef, addToLetterRefs }: AboutLabelProps) {
  return (
    <div className="flex w-full flex-shrink-0 justify-center md:w-2/5">
      <div className="relative flex h-full min-h-[200vh] w-full items-center justify-center overflow-visible">
        <span
          ref={labelRef}
          className="absolute top-0 left-1/2 flex -translate-x-1/2 -rotate-90 whitespace-nowrap text-center text-[clamp(8rem,32vw,40rem)] font-black uppercase leading-[0.75] tracking-widest text-white/80 will-change-transform"
        >
          {ABOUT_DATA.LABEL.split("").map((letter, i) => (
            <span key={i} ref={addToLetterRefs} className="inline-block">
              {letter}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
