"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Heart, ArrowUp } from 'lucide-react';
import Bluesky from "@/components/icons/Bluesky";
import { Github, Linkedin, Mail } from "lucide-react";
import SocialMediaIconButton from "@/components/pages/home/SocialMediaIconButton";

const quickLinks = [
  { name: 'Work', href: '/work' },
  { name: 'Projects', href: '/projects' },
  { name: 'Lab', href: '/lab' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-charcoal/50 border-t border-pewter/20 backdrop-blur-xl">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="container-wide relative z-10 py-16">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="group flex items-center gap-3 w-fit">
              <div className="w-12 h-12 bg-gradient-to-br from-amber to-copper rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-6 h-6 text-obsidian" />
              </div>
              <div>
                <span className="font-editorial text-2xl font-medium text-pearl block">
                  Jayvic San Antonio
                </span>
                <span className="text-silver/60 text-sm">
                  Full-Stack Developer
                </span>
              </div>
            </Link>
            
            <p className="text-silver/80 leading-relaxed max-w-md">
              Crafting elegant digital experiences with thoughtful design, 
              clean code, and attention to detail. Based in San Francisco Bay Area.
            </p>
            
            <div className="flex gap-4">
              <SocialMediaIconButton
                Icon={Github}
                link="https://github.com/jayvicsanantonio"
              >
                Github
              </SocialMediaIconButton>
              <SocialMediaIconButton
                Icon={Linkedin}
                link="https://www.linkedin.com/in/jayvicsanantonio/"
              >
                LinkedIn
              </SocialMediaIconButton>
              <SocialMediaIconButton
                Icon={Bluesky}
                link="https://bsky.app/profile/jayvicsanantonio.dev"
              >
                Bluesky
              </SocialMediaIconButton>
              <SocialMediaIconButton
                Icon={Mail}
                link="mailto:hi@jayvicsanantonio.dev"
              >
                Email
              </SocialMediaIconButton>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-medium text-pearl text-lg">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-silver/70 hover:text-pearl transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="font-medium text-pearl text-lg">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:hi@jayvicsanantonio.dev"
                className="block text-silver/70 hover:text-amber transition-colors duration-300"
              >
                hi@jayvicsanantonio.dev
              </a>
              <p className="text-silver/60 text-sm">
                San Francisco Bay Area
              </p>
              <p className="text-silver/60 text-sm">
                Available for remote work
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pewter/30 to-transparent mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-silver/60 text-sm">
            <span>© {currentYear} Jayvic San Antonio.</span>
            <span>Built with</span>
            <Heart className="w-4 h-4 text-rose" />
            <span>using Next.js & Tailwind CSS</span>
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-charcoal/50 border border-pewter/20 rounded-xl text-silver hover:text-pearl hover:border-amber/50 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
