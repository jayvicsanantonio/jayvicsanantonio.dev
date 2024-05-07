import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import ContactMeForm from "@/components/pages/home/ContactMeForm";
import GithubButton from "@/components/pages/home/GithubButton";
import ViewProjectButton from "@/components/pages/home/ViewProjectButton";

export default function Component() {
  return (
    <>
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
              className="inline-flex items-center justify-center rounded-md border border-gray-700 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 "
              href="/#projects"
            >
              View Projects
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-md border border-gray-700 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 "
              href="/#contact-me"
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
            exceptional digital experiences. With over a decade of experience, I
            have honed my skills in modern web technologies, design principles,
            and project management, enabling me to deliver high-quality,
            scalable, and user-centric solutions.
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
      <section id="projects" className="mt-24 space-y-12">
        <div className="flex gap-4">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <p className="text-gray-400">
              Check out some of my recent projects that showcase my expertise in
              web development.
            </p>
          </div>
          <div className="self-end">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-md border border-gray-700 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950 "
            >
              View All
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="flex flex-col h-full border-gray-800 bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:border-gray-700 hover:shadow-md">
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
                <div>
                  <h3 className="text-lg text-gray-100 font-semibold mb-1">
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
              </div>
              <div className="flex gap-4 mt-4">
                <GithubButton link={null} />
                <ViewProjectButton link="https://www.advertising.yahooinc.com/our-dsp" />
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col h-full border-gray-800 bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:border-gray-700 hover:shadow-md">
            <CardContent className="flex-1 -p-6 max-h-60">
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
            <CardFooter className="bg-gray-950 text-gray-1000 dark:text-gray-400 px-8 py-6 flex flex-col flex-1 space-between">
              <div className="flex flex-1 flex-start justify-between gap-2">
                <div>
                  <h3 className="text-lg text-gray-100 font-semibold mb-1">
                    Barbenheimer VS Code Theme
                  </h3>
                  <p className="text-gray-400 text-sm">
                    A VS Code theme inspired by the Internet phenomenon of the
                    same name. It combines the pink and playful aesthetics of
                    Barbie with the dark and dramatic tones of Oppenheimer.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <GithubButton link="https://github.com/jpsanantonio/barbenheimer-vscode-theme" />
                <ViewProjectButton link="https://marketplace.visualstudio.com/items?itemName=jayvicsanantonio.barbenheimer" />
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section id="contact-me" className="mt-24 space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Get in Touch</h2>
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
