"use client";

import { Icon } from "@iconify/react";
import { GlassButton } from "@/components/ui/GlassButton";

export default function NavRow() {
  return (
    <div className="mx-auto mb-10 flex w-[17.625rem] items-center justify-start gap-3.5">
      <GlassButton
        href="https://www.linkedin.com/in/jayvicsanantonio/"
        aria-label="LinkedIn"
        className="h-14 w-[3.75rem] min-w-[3.75rem] rounded-[999px] border border-white/70 bg-gradient-to-b from-white/55 to-white/20 text-white backdrop-blur-[22px] backdrop-saturate-[240%] shadow-[inset_0_1px_0_rgba(255,255,255,0.62),inset_0_-16px_28px_rgba(0,0,0,0.32),0_6px_18px_rgba(0,0,0,0.28)] hover:border-white/80 after:pointer-events-none after:absolute after:inset-0 after:rounded-[999px] after:bg-[radial-gradient(90%_60%_at_50%_0%,rgba(255,255,255,0.90),rgba(255,255,255,0.32)_46%,rgba(255,255,255,0.14)_72%,rgba(0,0,0,0.12)_100%)] after:opacity-90 after:content-['']"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon
          icon="mdi:linkedin"
          width={22}
          height={22}
          aria-hidden="true"
          className="translate-y-[0.5px]"
        />
      </GlassButton>
      <GlassButton
        href="/projects"
        aria-label="Projects"
        className="vt-tag-work h-14 w-[3.75rem] min-w-[3.75rem] rounded-[999px] border border-white/70 bg-gradient-to-b from-white/55 to-white/20 text-white backdrop-blur-[22px] backdrop-saturate-[240%] shadow-[inset_0_1px_0_rgba(255,255,255,0.62),inset_0_-16px_28px_rgba(0,0,0,0.32),0_6px_18px_rgba(0,0,0,0.28)] hover:border-white/80 after:pointer-events-none after:absolute after:inset-0 after:rounded-[999px] after:bg-[radial-gradient(90%_60%_at_50%_0%,rgba(255,255,255,0.90),rgba(255,255,255,0.32)_46%,rgba(255,255,255,0.14)_72%,rgba(0,0,0,0.12)_100%)] after:opacity-90 after:content-['']"
      >
        <Icon
          icon="mdi:application-brackets"
          width={20}
          height={20}
          aria-hidden="true"
          className="translate-y-[0.5px]"
        />
      </GlassButton>
      <GlassButton
        href="/work"
        aria-label="Work Experience"
        className="vt-tag-work h-14 w-[3.75rem] min-w-[3.75rem] rounded-[999px] border border-white/70 bg-gradient-to-b from-white/55 to-white/20 text-white backdrop-blur-[22px] backdrop-saturate-[240%] shadow-[inset_0_1px_0_rgba(255,255,255,0.62),inset_0_-16px_28px_rgba(0,0,0,0.32),0_6px_18px_rgba(0,0,0,0.28)] hover:border-white/80 after:pointer-events-none after:absolute after:inset-0 after:rounded-[999px] after:bg-[radial-gradient(90%_60%_at_50%_0%,rgba(255,255,255,0.90),rgba(255,255,255,0.32)_46%,rgba(255,255,255,0.14)_72%,rgba(0,0,0,0.12)_100%)] after:opacity-90 after:content-['']"
      >
        <Icon
          icon="mdi:timeline-text"
          width={20}
          height={20}
          aria-hidden="true"
          className="translate-y-[0.5px]"
        />
      </GlassButton>
      <GlassButton
        href="https://github.com/jayvicsanantonio"
        aria-label="GitHub"
        className="h-14 w-[3.75rem] min-w-[3.75rem] rounded-[999px] border border-white/70 bg-gradient-to-b from-white/55 to-white/20 text-white backdrop-blur-[22px] backdrop-saturate-[240%] shadow-[inset_0_1px_0_rgba(255,255,255,0.62),inset_0_-16px_28px_rgba(0,0,0,0.32),0_6px_18px_rgba(0,0,0,0.28)] hover:border-white/80 after:pointer-events-none after:absolute after:inset-0 after:rounded-[999px] after:bg-[radial-gradient(90%_60%_at_50%_0%,rgba(255,255,255,0.90),rgba(255,255,255,0.32)_46%,rgba(255,255,255,0.14)_72%,rgba(0,0,0,0.12)_100%)] after:opacity-90 after:content-['']"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon
          icon="mdi:github"
          width={22}
          height={22}
          aria-hidden="true"
          className="translate-y-[0.5px]"
        />
      </GlassButton>
    </div>
  );
}
