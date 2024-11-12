"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import Hero from "@/components/pages/home/Hero";
import ContactMeForm from "@/components/pages/home/ContactMeForm";
import ProjectButton from "@/components/pages/ProjectButton";
import { Calendar, Github, Linkedin } from "lucide-react";

export default function Page() {
  const aboutRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <>
      <Hero aboutRef={aboutRef} />
      <motion.section
        ref={aboutRef}
        className="scroll-mt-52 grid lg:grid-cols-2 gap-4"
        style={{ opacity, scale }}
      >
        <div className="lg:text-lg text-gray-200 space-y-4 bg-gray-950 rounded-xl p-6 border-t-purple-500 border-r-purple-500 border-b-blue-400 border-l-blue-400 border-2">
          <h2 className="font-oswald text-2xl font-bold">About Me</h2>
          <p>
            I'm Jayvic San Antonio, a Full-Stack Web Developer originally from
            the Philippines, now thriving in the San Francisco Bay Area. With
            over 9 years of experience, you could say JavaScript is my coding
            soulmate - I love its versatility and how it keeps getting better
            and better!
          </p>
          <p>
            From hackathons and co-founding a startup to working at a global
            media and tech company, I've thrived in all kinds of environments.
            Whether I'm flying solo or part of an awesome team, I'm all about
            tackling challenging projects and delivering top-notch code
            (optimized, documented, and ready to roll!).
          </p>
          <p>
            In this ever-evolving industry, staying sharp is key. That's why I'm
            constantly learning and pushing my skills to the next level.
          </p>
          <p>
            <span className="font-oswald font-bold">What gets me excited?</span>{" "}
            The chance to create impactful solutions, make user experiences
            amazing, and drive innovation in a forward-thinking environment.
            Collaboration and inclusivity are super important to me, so working
            with a team that shares those values would be epic!
          </p>
          <p>
            <span className="font-oswald font-bold">
              Ready to build something awesome together?
            </span>{" "}
            <Link href="#contact-me" className="hover:text-violet-600">
              Let's chat!
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="lg:text-lg text-gray-200 space-y-4 bg-gray-950 rounded-xl p-6 border-t-purple-500 border-r-purple-500 border-b-blue-400 border-l-blue-400 border-2 h-fit">
            <h2 className="font-oswald text-2xl font-bold">Skills</h2>
            <div className="grid md:grid-cols-3  gap-6">
              <Badge
                aria-label="JavaScript"
                className="w-fit text-sm"
                variant="secondary"
              >
                JavaScript
              </Badge>
              <Badge
                aria-label="TypeScript"
                className="w-fit text-sm"
                variant="secondary"
              >
                TypeScript
              </Badge>
              <Badge
                aria-label="React"
                className="w-fit text-sm"
                variant="secondary"
              >
                React
              </Badge>
              <Badge
                aria-label="Next.js"
                className="w-fit text-sm"
                variant="secondary"
              >
                Next.js
              </Badge>
              <Badge
                aria-label="Remix"
                className="w-fit text-sm"
                variant="secondary"
              >
                Remix
              </Badge>
              <Badge
                aria-label="Node.js"
                className="w-fit text-sm"
                variant="secondary"
              >
                Node.js
              </Badge>
              <Badge
                aria-label="Express.js"
                className="w-fit text-sm"
                variant="secondary"
              >
                Express.js
              </Badge>
              <Badge
                aria-label="Tailwind CSS"
                className="w-fit text-sm"
                variant="secondary"
              >
                Tailwind CSS
              </Badge>
              <Badge
                aria-label="React Native"
                className="w-fit text-sm"
                variant="secondary"
              >
                React Native
              </Badge>
              <Badge
                aria-label="Expo"
                className="w-fit text-sm"
                variant="secondary"
              >
                Expo
              </Badge>
              <Badge
                aria-label="Ember"
                className="w-fit text-sm"
                variant="secondary"
              >
                Ember.js
              </Badge>
              <Badge
                aria-label="HTML"
                className="w-fit text-sm"
                variant="secondary"
              >
                HTML
              </Badge>
              <Badge
                aria-label="CSS"
                className="w-fit text-sm"
                variant="secondary"
              >
                CSS
              </Badge>
              <Badge
                aria-label="SASS / SCSS"
                className="w-fit text-sm"
                variant="secondary"
              >
                SASS / SCSS
              </Badge>
              <Badge
                aria-label="Amazon Web Services (AWS)"
                className="w-fit text-sm"
                variant="secondary"
              >
                AWS
              </Badge>
              <Badge
                aria-label="MongoDB"
                className="w-fit text-sm"
                variant="secondary"
              >
                MongoDB
              </Badge>
              <Badge
                aria-label="Redis"
                className="w-fit text-sm"
                variant="secondary"
              >
                Redis
              </Badge>
              <Badge
                aria-label="MySQL"
                className="w-fit text-sm"
                variant="secondary"
              >
                MySQL
              </Badge>
              <Badge
                aria-label="PostgreSQL"
                className="w-fit text-sm"
                variant="secondary"
              >
                PostgreSQL
              </Badge>
              <Badge
                aria-label="Java"
                className="w-fit text-sm"
                variant="secondary"
              >
                Java
              </Badge>
              <Badge
                aria-label="Cypress"
                className="w-fit text-sm"
                variant="secondary"
              >
                Cypress
              </Badge>
              <Badge
                aria-label="Git"
                className="w-fit text-sm"
                variant="secondary"
              >
                Git
              </Badge>
              <Badge
                aria-label="Java"
                className="w-fit text-sm"
                variant="secondary"
              >
                Linux
              </Badge>
              <Badge
                aria-label="Figma"
                className="w-fit text-sm"
                variant="secondary"
              >
                Figma
              </Badge>
            </div>
          </div>
          <div className="lg:text-lg text-gray-200 space-y-4 bg-gray-950 rounded-xl p-6 border-t-purple-500 border-r-purple-500 border-b-blue-400 border-l-blue-400 border-2 h-fit">
            <h2 className="font-oswald text-2xl font-bold">Expertise</h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Frontend Development
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Web Performance Optimization
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Agile development
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Cross-functional collaboration
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Problem-solving and debugging
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Responsive Design
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Adaptability and learning
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Mentoring and knowledge sharing
              </li>
            </ul>
          </div>
        </div>
      </motion.section>
      <section
        id="projects"
        className="content-visibility-auto mt-24 space-y-12"
      >
        <div className="flex gap-4">
          <div className="flex-1 space-y-4">
            <h2 className="font-oswald text-2xl font-bold">
              Featured Projects
            </h2>
            <p className="text-gray-400">
              Check out some of my recent projects that showcase my expertise in
              web development.
            </p>
          </div>
          <div className="self-end">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-md border border-gray-700 px-6 py-3 text-sm font-medium hover:border-violet-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 transition ease-in-out   hover:-translate-y-1 hover:scale-110"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="flex flex-col h-full border-gray-800 bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:border-violet-600 hover:shadow-md dark:border-gray-600 dark:bg-gray-800">
            <CardContent className="flex-1 -p-6 max-h-60">
              <Image
                alt="Yahoo DSP"
                className="w-full h-full object-cover"
                height={225}
                src="/images/home/yahoo-dsp.png"
                style={{
                  aspectRatio: "400/225",
                  objectFit: "cover",
                }}
                width={400}
              />
            </CardContent>
            <CardFooter className="bg-gray-950 text-gray-1000 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div className="space-y-2">
                  <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                    Yahoo DSP
                  </h3>
                  <p className="text-gray-200 ">
                    A cutting-edge programmatic advertising platform for
                    businesses. Built with a powerful tech stack including{" "}
                    <em className="font-bold">Ember.js</em>,{" "}
                    <em className="font-bold">React.js</em>, and{" "}
                    <em className="font-bold">Node.js</em>, the platform
                    empowers advertisers with features like real-time bidding,
                    audience targeting, and comprehensive campaign performance
                    measurement.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <ProjectButton link={null}>
                  <Github size={20} />
                  Github
                </ProjectButton>
                <ProjectButton link="https://www.advertising.yahooinc.com/our-dsp">
                  View Project
                </ProjectButton>
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col h-full border-gray-800 bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
            <CardContent className="flex-1 -p-6 max-h-60">
              <Image
                alt="Barbenheimer VS Code Theme"
                className="w-full h-full object-cover"
                height={225}
                src="/images/home/barbenheimer.png"
                style={{
                  aspectRatio: "400/225",
                  objectFit: "cover",
                }}
                width={400}
              />
            </CardContent>
            <CardFooter className="bg-gray-950 text-gray-1000 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div className="space-y-2">
                  <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight mb-1">
                    Barbenheimer VS Code Theme
                  </h3>
                  <p className="text-gray-200">
                    A VS Code theme inspired by the Internet phenomenon of the
                    same name. It combines the pink and playful aesthetics of
                    Barbie with the dark and dramatic tones of Oppenheimer.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <ProjectButton link="https://github.com/jpsanantonio/barbenheimer-vscode-theme">
                  <Github size={20} />
                  Github
                </ProjectButton>
                <ProjectButton link="https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer">
                  View Project
                </ProjectButton>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section id="blog" className="content-visibility-auto mt-24 space-y-12">
        <div className="flex gap-4">
          <div className="flex-1 space-y-4">
            <h2 className="font-oswald text-2xl font-bold">Blog Posts</h2>
            <p className="text-gray-400">
              Check out some of my insightful articles, tips, and
              behind-the-scenes experiences.
            </p>
          </div>
          <div className="self-end">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md border border-gray-700 px-6 py-3 text-sm font-medium hover:border-violet-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 transition ease-in-out   hover:-translate-y-1 hover:scale-110"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-8 bg-gray-950 text-gray-200">
          <div className="space-y-8">
            <article className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg border border-gray-800 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-gray-800 w-full"
                height={160}
                src="/images/blog/from-ember-to-next.png"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2">
                <Link
                  className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight hover:underline hover:text-violet-600"
                  href="/blog/from-ember-to-next"
                >
                  From Ember.js to Next.js: A Tale of Two Frameworks
                </Link>
                <div className="text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>May 7, 2024</span>
                </div>
                <p className="text-gray-300 line-clamp-3">
                  Explore the differences and surprising similarities between
                  Ember.js and Next.js, two powerful contenders in the web
                  development world.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge className="text-sm" variant="secondary">
                    EmberJS
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    NextJS
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    Lessons Learned
                  </Badge>
                </div>
              </div>
            </article>
            <article className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg border border-gray-800 p-6 shadow-sm transition-all hover:border-violet-600 hover:shadow-md">
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-gray-800 w-full"
                height={160}
                src="/images/blog/the-typescript-tightrope.png"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2">
                <Link
                  className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight hover:underline hover:text-violet-600"
                  href="/blog/the-typescript-tightrope"
                >
                  The Typescript Tightrope: A Love-Hate Journey
                </Link>
                <div className="text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>May 4, 2024</span>
                </div>
                <p className="text-gray-300 line-clamp-3">
                  My journey from TypeScript skeptic to enthusiast - how static
                  typing transformed my code and why I believe it's the future.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge className="text-sm" variant="secondary">
                    Web Development
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    TypeScript
                  </Badge>
                  <Badge className="text-sm" variant="secondary">
                    Lessons Learned
                  </Badge>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section
        id="contact-me"
        className="content-visibility-auto mt-24 space-y-12"
      >
        <div className="space-y-4">
          <h2 className="font-oswald text-2xl font-bold">Get in Touch</h2>
          <p className="text-gray-400">
            I'm always excited to discuss new projects and opportunities. Feel
            free to reach out to me.
          </p>
        </div>
        <ContactMeForm />
      </section>
    </>
  );
}
