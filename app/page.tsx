import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline hover:animate-pulse"
            href="#"
          >
            Projects
          </Link>
          <Link
            className="text-sm font-medium hover:underline hover:animate-pulse"
            href="#"
          >
            Contact
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
          <img
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <Badge aria-label="HTML" className="w-fit" variant="secondary">
                HTML
              </Badge>
              <Badge aria-label="CSS" className="w-fit" variant="secondary">
                CSS
              </Badge>
              <Badge
                aria-label="JavaScript"
                className="w-fit"
                variant="secondary"
              >
                JavaScript
              </Badge>
              <Badge aria-label="React" className="w-fit" variant="secondary">
                React
              </Badge>
              <Badge aria-label="Next.js" className="w-fit" variant="secondary">
                Next.js
              </Badge>
              <Badge aria-label="Node.js" className="w-fit" variant="secondary">
                Node.js
              </Badge>
              <Badge
                aria-label="TypeScript"
                className="w-fit"
                variant="secondary"
              >
                TypeScript
              </Badge>
              <Badge aria-label="Git" className="w-fit" variant="secondary">
                Git
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="flex-1">
                <img
                  alt="Project 1"
                  className="w-full h-full object-cover"
                  height={225}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </CardContent>
              <CardFooter className="bg-gray-900 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Project 1</h3>
                    <p className="text-gray-400 text-sm">
                      A modern e-commerce platform built with Next.js and
                      Tailwind CSS.
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
              <CardContent className="flex-1">
                <img
                  alt="Project 2"
                  className="w-full h-full object-cover"
                  height={225}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </CardContent>
              <CardFooter className="bg-gray-900 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Project 2</h3>
                    <p className="text-gray-400 text-sm">
                      A responsive and accessible marketing website built with
                      Gatsby.
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
              <CardContent className="flex-1">
                <img
                  alt="Project 3"
                  className="w-full h-full object-cover"
                  height={225}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </CardContent>
              <CardFooter className="bg-gray-900 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Project 3</h3>
                    <p className="text-gray-400 text-sm">
                      A data visualization dashboard built with React and D3.js.
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
          <form className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message" />
            </div>
            <Button
              className="justify-self-end bg-gray-600 hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 hover:animate-bounce"
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

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
