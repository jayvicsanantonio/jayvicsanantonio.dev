import { useHeroContext } from "../../context/HeroContext";

export default function Designation() {
  const { designationRef } = useHeroContext();

  return (
    <div
      ref={designationRef}
      className="pointer-events-none absolute bottom-0 right-0 z-30 hidden flex-col items-end gap-0 px-7 pb-6 text-white/80 opacity-0 sm:px-12 sm:pb-8 lg:flex lg:pb-10"
    >
      <span className="text-xl font-semibold uppercase tracking-[0.15em] leading-tight text-white sm:text-[2.1rem] lg:text-[2.5rem]">
        Full-Stack
      </span>
      <span className="text-base font-semibold uppercase tracking-[0.4em] leading-tight text-white/70 sm:text-lg lg:text-xl">
        Software Engineer
      </span>
    </div>
  );
}
