import { Badge } from "@/components/primitives/Badge";
import Icon from "@/components/primitives/Icon";
import { CARD_INNER_BASE, CARD_OUTER_BASE } from "@/components/styles/card-styles";

import { EXPERIENCES } from "../_data/experiences";

export default function WorkTimeline() {
  return (
    <div className="relative mt-8 sm:mt-12 lg:mt-16">
      {/* Flow wrapper: center 100vw wrapper so spine aligns at viewport center */}
      <div className="lg:relative lg:left-1/2 lg:w-[100vw] lg:-translate-x-1/2">
        {/* Spine track (subtle) */}
        <div
          aria-hidden
          className="hidden h-full w-px bg-white/5 lg:absolute lg:top-0 lg:left-1/2 lg:block lg:-translate-x-1/2"
        />
        {/* Spine fill that grows with scroll */}
        <div
          aria-hidden
          className="pointer-events-none hidden h-full w-1 origin-top [transform:translateZ(0)] bg-[linear-gradient(to_bottom,rgba(59,130,246,0.75),rgba(168,85,247,0.55),rgba(34,211,238,0.35),transparent)] shadow-[0_0_14px_rgba(59,130,246,0.25)] lg:absolute lg:top-0 lg:left-1/2 lg:block lg:-translate-x-1/2"
        />
        {/* Elegant cap at the start of the spine */}
        <div className="hidden translate-y-[-6px] lg:absolute lg:top-0 lg:left-1/2 lg:block lg:-translate-x-1/2">
          <div className="relative">
            {/* Distinct cap: gradient sphere (larger than nodes) */}
            <span className="block h-3.5 w-3.5 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.95),rgba(168,85,247,0.9))] shadow-[0_0_16px_rgba(59,130,246,0.45)] ring-1 ring-white/20" />
            {/* Soft halo */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.35),rgba(168,85,247,0.25),transparent_70%)] opacity-25 blur-md"
            />
            {/* Gentle pulse */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-cyan-300/50 motion-safe:animate-ping"
            />
            {/* Intro rays */}
            <span
              aria-hidden
              className="absolute top-1 left-1/2 h-[12px] w-px -translate-x-1/2 -rotate-[18deg] bg-cyan-300/25"
            />
            <span
              aria-hidden
              className="absolute top-1 left-1/2 h-[12px] w-px -translate-x-1/2 rotate-[18deg] bg-purple-400/25"
            />
          </div>
        </div>
        <ul className="relative space-y-8 pt-10 pl-0 sm:space-y-12 sm:pt-16 lg:space-y-28 lg:pt-24">
          {EXPERIENCES.map((item, index) => {
            const isRight = index % 2 === 0;
            return (
              <li key={`${item.title}-${item.period}`} className="relative">
                {/* Node on spine */}
                <div
                  className="absolute top-6 hidden lg:left-1/2 lg:block lg:-translate-x-1/2"
                  data-timeline-node
                >
                  <span className="relative z-10 block h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_3px_rgba(34,211,238,0.35)] ring-1 ring-cyan-400/60" />

                  <span
                    aria-hidden
                    data-node-ring
                    className="pointer-events-none absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_20px_1px_rgba(34,211,238,0.25)] ring-2 ring-cyan-300/50"
                  />
                  <span
                    aria-hidden
                    data-node-ring
                    className="pointer-events-none absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-purple-400/30"
                  />
                </div>

                <div className={`relative ${isRight ? "lg:pl-[52vw]" : "lg:pr-[52vw]"}`}>
                  {/* Card */}
                  <article
                    className={`${CARD_OUTER_BASE} mx-auto w-full motion-safe:animate-fade-in-up lg:mx-0 lg:w-[min(500px,50vw)] ${
                      isRight ? "lg:mr-auto" : "lg:ml-auto"
                    }`}
                    style={{ animationDelay: `${Math.min(index * 80, 320)}ms` }}
                  >
                    <div
                      className={`${CARD_INNER_BASE} p-5 sm:p-6 [@container(min-width:36rem)]:p-6`}
                    >
                      <div className="text-left">
                        <h3 className="font-oswald text-xl text-white [@container(min-width:28rem)]:text-2xl">
                          {item.title}
                        </h3>
                        <div className="mt-1 flex items-baseline justify-between gap-3">
                          <p className="text-sm tracking-[0.14em] text-gray-300/90 uppercase lg:text-base">
                            {item.company}
                          </p>
                          <span className="lg:text:[11px] rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.12em] whitespace-nowrap text-gray-300 uppercase">
                            {item.period}
                          </span>
                        </div>
                        <div className="mt-3 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
                      </div>

                      <ul className="mt-4 space-y-3 text-[0.95rem]/relaxed sm:text-[0.98rem]/relaxed [@container(min-width:34rem)]:space-y-4">
                        {item.bullets.map((b) => (
                          <li key={b} className="flex gap-2 break-words text-gray-300/90">
                            <Icon
                              name="check"
                              size={18}
                              className="mt-0.5 shrink-0 text-cyan-300/80"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-2" data-tag-cloud>
                        {item.tags.map((t) => (
                          <Badge key={t} className="text-xs" data-tag-item variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </article>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
