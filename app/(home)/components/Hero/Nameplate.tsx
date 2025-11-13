import type { HeroAnimationRefs } from "./hero.types";

type NameplateProps = Pick<HeroAnimationRefs, "nameplateRef">;

export default function Nameplate({ nameplateRef }: NameplateProps) {
  return (
    <div
      ref={nameplateRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col gap-0 px-7 pb-6 text-white/90 opacity-0 sm:px-12 sm:pb-8 lg:pb-10"
    >
      <span className="text-2xl font-semibold tracking-[0.05em] leading-tight text-white sm:text-[2.3rem] lg:text-[2.8rem]">
        Jayvic
      </span>
      <span className="text-[1.45rem] font-semibold uppercase tracking-[0.18em] leading-tight text-white sm:text-[1.8rem] lg:text-[2.25rem]">
        San Antonio
      </span>
    </div>
  );
}
