'use client';

import { Github, Linkedin, Mail } from 'lucide-react';

import Bluesky from '@/components/icons/Bluesky';
import SocialMediaIconButton from '@/components/pages/home/SocialMediaIconButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="lg:-mx-auto -mx-4 border-t bg-white py-6 text-gray-950 md:px-8 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200">
      <div className="mx-auto flex flex-col items-center justify-between gap-2 md:flex-row">
        <p>© {currentYear} Jayvic San Antonio. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <SocialMediaIconButton
            Icon={Github}
            link="https://github.com/jayvicsanantonio"
            className="h-5 w-5"
          >
            Github
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Linkedin}
            link="https://www.linkedin.com/in/jayvicsanantonio/"
            className="h-5 w-5"
          >
            LinkedIn
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Bluesky}
            link="https://bsky.app/profile/jayvicsanantonio.dev"
            className="h-5 w-5"
          >
            Bluesky
          </SocialMediaIconButton>
          <SocialMediaIconButton
            Icon={Mail}
            link="mailto:hi@jayvicsanantonio.dev"
            className="h-5 w-5"
          >
            Email
          </SocialMediaIconButton>
        </div>
      </div>
    </footer>
  );
}
