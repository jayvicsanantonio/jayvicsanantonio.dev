import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CodeIcon from "@/components/icons/code";
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import MenuIcon from "@/components/icons/menu";
import TwitterIcon from "@/components/icons/twitter";

export default function Component() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between py-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <CodeIcon className="w-6 h-6" />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            className="text-sm font-medium hover:underline hover:animate-pulse"
            href="#"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline hover:animate-pulse"
            href="/articles"
          >
            Articles
          </Link>
          <Link
            className="text-sm font-medium hover:underline hover:animate-pulse"
            href="/projects"
          >
            Projects
          </Link>
        </nav>
        <Button
          aria-label="Toggle navigation"
          className="md:hidden"
          size="icon"
          variant="ghost"
        >
          <MenuIcon className="w-6 h-6" />
        </Button>
      </header>
      <main className="flex-1 py-16">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Jayvic San Antonio
              </h1>
              <h2 className="text-gray-400 text-lg font-bold tracking-widest">
                Full-Stack Web Developer
              </h2>
            </div>
            <p className="text-gray-400 max-w-md">
              Crafting exceptional web experiences with a focus on performance,
              accessibility, and scalability.
            </p>
            <div className="flex gap-6">
              <Link
                className="inline-flex items-center justify-center rounded-md bg-gray-800 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 hover:animate-pulse"
                href="#"
              >
                View Projects
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-md border border-gray-700 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 hover:animate-pulse"
                href="#"
              >
                Contact Me
              </Link>
            </div>
          </div>
          <Image
            alt="Profile"
            className="mx-auto rounded-full border-4 border-gray-800 shadow-xl"
            height={340}
            src="/images/home/profile-image.jpeg"
            style={{
              aspectRatio: "340/340",
              objectFit: "cover",
            }}
            width={340}
          />
        </section>
        <section className="mt-24 space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">About Me</h2>
            <p className="text-gray-400">
              As a senior web developer, I have a deep passion for creating
              exceptional digital experiences. With over a decade of experience,
              I have honed my skills in modern web technologies, design
              principles, and project management, enabling me to deliver
              high-quality, scalable, and user-centric solutions.
            </p>
          </div>
        </section>
        <section className="mt-24 space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">My Skills</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              <Badge
                aria-label="JavaScript"
                className="w-fit"
                variant="secondary"
              >
                JavaScript
              </Badge>
              <Badge
                aria-label="TypeScript"
                className="w-fit"
                variant="secondary"
              >
                TypeScript
              </Badge>
              <Badge aria-label="React" className="w-fit" variant="secondary">
                React
              </Badge>
              <Badge aria-label="Next.js" className="w-fit" variant="secondary">
                Next.js
              </Badge>
              <Badge aria-label="Remix" className="w-fit" variant="secondary">
                Remix
              </Badge>
              <Badge aria-label="Node.js" className="w-fit" variant="secondary">
                Node.js
              </Badge>
              <Badge
                aria-label="Express.js"
                className="w-fit"
                variant="secondary"
              >
                Express.js
              </Badge>
              <Badge
                aria-label="Tailwind CSS"
                className="w-fit"
                variant="secondary"
              >
                Tailwind CSS
              </Badge>
              <Badge
                aria-label="React Native"
                className="w-fit"
                variant="secondary"
              >
                React Native
              </Badge>
              <Badge aria-label="Expo" className="w-fit" variant="secondary">
                Expo
              </Badge>
              <Badge aria-label="Ember" className="w-fit" variant="secondary">
                Ember.js
              </Badge>
              <Badge aria-label="HTML" className="w-fit" variant="secondary">
                HTML
              </Badge>
              <Badge aria-label="CSS" className="w-fit" variant="secondary">
                CSS
              </Badge>
              <Badge
                aria-label="SASS / SCSS"
                className="w-fit"
                variant="secondary"
              >
                SASS / SCSS
              </Badge>
              <Badge
                aria-label="Amazon Web Services (AWS)"
                className="w-fit"
                variant="secondary"
              >
                AWS
              </Badge>
              <Badge aria-label="MongoDB" className="w-fit" variant="secondary">
                MongoDB
              </Badge>
              <Badge aria-label="Redis" className="w-fit" variant="secondary">
                Redis
              </Badge>
              <Badge aria-label="MySQL" className="w-fit" variant="secondary">
                MySQL
              </Badge>
              <Badge
                aria-label="PostgreSQL"
                className="w-fit"
                variant="secondary"
              >
                PostgreSQL
              </Badge>
              <Badge aria-label="Java" className="w-fit" variant="secondary">
                Java
              </Badge>
              <Badge aria-label="Cypress" className="w-fit" variant="secondary">
                Cypress
              </Badge>
              <Badge aria-label="Git" className="w-fit" variant="secondary">
                Git
              </Badge>
              <Badge aria-label="Java" className="w-fit" variant="secondary">
                Linux
              </Badge>
              <Badge aria-label="Figma" className="w-fit" variant="secondary">
                Figma
              </Badge>
            </div>
          </div>
        </section>
        <section className="mt-24 space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <p className="text-gray-400">
              Check out some of my recent projects that showcase my expertise in
              web development.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="flex-1 -p-6 max-h-64">
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
              <CardFooter className="bg-gray-900 px-8 py-6">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg text-white font-semibold">
                      Yahoo DSP
                    </h3>
                    <p className="text-gray-400 text-sm">
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
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-gray-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 hover:animate-pulse"
                    href="#"
                  >
                    View Project
                  </Link>
                </div>
              </CardFooter>
            </Card>
            <Card className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="flex-1 -p-6 max-h-64">
                <Image
                  alt="Yahoo DSP"
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
              <CardFooter className="bg-gray-900 px-8 py-6">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg text-white font-semibold">
                      Barbenheimer VS Code Theme
                    </h3>
                    <p className="text-gray-400 text-sm">
                      A VS Code theme inspired by the Internet phenomenon of the
                      same name. It combines the pink and playful aesthetics of
                      Barbie with the dark and dramatic tones of Oppenheimer.
                    </p>
                  </div>
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-gray-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 hover:animate-pulse"
                    href="#"
                  >
                    View Project
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section className="mt-24 space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <p className="text-gray-400">
              I'm always excited to discuss new projects and opportunities. Feel
              free to reach out to me.
            </p>
          </div>
          <form
            action="/api/send"
            method="POST"
            className="grid gap-6 text-black"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Enter your message"
              />
            </div>
            <Button
              className="justify-self-end bg-gray-600 hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 "
              type="submit"
            >
              Send Message
            </Button>
          </form>
        </section>
      </main>
      <footer className="bg-gray-800 px-8 py-6 text-sm text-gray-400">
        <div className="container mx-auto flex items-center justify-between">
          <p>© 2024 Jayvic San Antonio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              className="hover:text-gray-50 hover:animate-pulse"
              href="https://github.com/jpsanantonio"
              legacyBehavior
            >
              <a target="_blank">
                <GithubIcon className="w-5 h-5" />
              </a>
            </Link>
            <Link
              className="hover:text-gray-50 hover:animate-pulse"
              href="https://twitter.com/jpsanantonio"
              legacyBehavior
            >
              <a target="_blank">
                <TwitterIcon className="w-5 h-5" />
              </a>
            </Link>
            <Link
              className="hover:text-gray-50 hover:animate-pulse"
              href="https://www.linkedin.com/in/jayvicsanantonio/"
              legacyBehavior
            >
              <a target="_blank">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
