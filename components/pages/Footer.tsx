"use client";

import Bluesky from "@/components/icons/Bluesky";
import { Github, Linkedin, Mail } from "lucide-react";
import SocialMediaIconButton from "@/components/pages/home/SocialMediaIconButton";

export default function Footer() {
  return (
    <footer className="bg-gray-950 md:px-8 py-6 text-gray-200 border-t border-gray-800">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© 2024 Jayvic San Antonio. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <SocialMediaIconButton
            Icon={Github}
            link="https://github.com/jayvicsanantonio"
            size={4}
          >
            Github
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Linkedin}
            link="https://www.linkedin.com/in/jayvicsanantonio/"
            size={4}
          >
            LinkedIn
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Bluesky}
            link="https://bsky.app/profile/jayvicsanantonio.dev"
            size={4}
          >
            Bluesky
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Mail}
            link="mailto:hi@jayvicsanantonio.dev"
            size={4}
          >
            Email
          </SocialMediaIconButton>
        </div>
      </div>
    </footer>
  );
}

function Social({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-6 text-sm font-medium text-gray-500 dark:text-gray-400">
      {children}
    </div>
  );
}
