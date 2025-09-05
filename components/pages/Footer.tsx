"use client";

import Bluesky from "@/components/icons/Bluesky";
import { Github, Linkedin, Mail } from "lucide-react";
import SocialMediaIconButton from "@/components/pages/home/SocialMediaIconButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 -mx-4 lg:-mx-auto md:px-8 py-6 text-gray-950 dark:text-gray-200 border-t dark:border-gray-800">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© {currentYear} Jayvic San Antonio. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <SocialMediaIconButton
            Icon={Github}
            link="https://github.com/jayvicsanantonio"
            className="w-5 h-5"
          >
            Github
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Linkedin}
            link="https://www.linkedin.com/in/jayvicsanantonio/"
            className="w-5 h-5"
          >
            LinkedIn
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Bluesky}
            link="https://bsky.app/profile/jayvicsanantonio.dev"
            className="w-5 h-5"
          >
            Bluesky
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Mail}
            link="mailto:hi@jayvicsanantonio.dev"
            className="w-5 h-5"
          >
            Email
          </SocialMediaIconButton>
        </div>
      </div>
    </footer>
  );
}

