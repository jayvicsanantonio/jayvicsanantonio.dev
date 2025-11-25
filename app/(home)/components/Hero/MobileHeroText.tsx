import { useHeroContext } from "../../context/HeroContext";

export default function MobileHeroText() {
  const { mobileHeroTextRef } = useHeroContext();

  return (
    <div
      ref={mobileHeroTextRef}
      className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 opacity-0 lg:hidden"
    >
      <span className="text-center text-5xl font-bold uppercase tracking-[0.1em] leading-none text-white sm:text-7xl md:text-8xl">
        Jayvic
      </span>
      <span className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/60 sm:text-sm md:text-base">
        Full-Stack Software Engineer
      </span>
    </div>
  );
}
