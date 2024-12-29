"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const router = useRouter();

  return (
    <section className="w-full  dark:bg-gray-950 text-gray-200">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="font-oswald uppercase inline-block rounded-lg bg-gray-800 px-3 py-1">
            Blog Posts
          </div>
          <h2 className="font-oswald text-2xl font-bold tracking-tighter text-gray-950 dark:text-gray-200 md:text-3xl/tight lg:text-4xl">
            Exploring My Thought
          </h2>
          <p className="max-w-[600px] text-gray-950/70 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Welcome to my blog! Here, I delve into the exciting world of web
            development with insightful articles, tips, and behind-the-scenes
            experiences.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="space-y-8">
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-md transition will-change-transform bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/popover-api-explained");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full bg-gray-950"
                height={160}
                src="/images/blog/popover-api-explained.webp"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Popover API Explained
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>December 6, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  The Popover API lets you easily create and control those handy
                  content bubbles that pop up on webpages, offering improved
                  accessibility and standardization for a smoother user
                  experience.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Advent Calendar
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    HTML
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    JS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    CSS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Web Development
                  </Badge>
                </div>
              </div>
            </button>
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-md transition will-change-transform bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/css-user-valid-user-invalid-explained");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full bg-gray-950"
                height={160}
                src="/images/blog/css-user-valid-user-invalid-explained.webp"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  CSS{" "}
                  <span className="px-3 text-2xl bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                    :user-valid
                  </span>{" "}
                  and{" "}
                  <span className="px-3 text-2xl bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                    :user-invalid
                  </span>
                  Explained
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>December 5, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  The :user-valid and :user-invalid CSS pseudo-classes give
                  instant visual feedback on form input, improving usability and
                  accessibility by highlighting correct and incorrect entries.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Advent Calendar
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    CSS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Web Development
                  </Badge>
                </div>
              </div>
            </button>
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-md transition will-change-transform bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/html-autofocus-explained");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full bg-gray-950"
                height={160}
                src="/images/blog/html-autofocus-explained.webp"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  HTML{" "}
                  <span className="px-3 text-2xl bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                    autofocus
                  </span>{" "}
                  Explained
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>December 3, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  Autofocus in HTML automatically places the cursor in a form
                  field, making user interaction smoother. Use it wisely,
                  though, as overuse can be annoying and even cause
                  accessibility issues.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Advent Calendar
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    HTML
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Web Development
                  </Badge>
                </div>
              </div>
            </button>
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-md transition will-change-transform bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/css-has-explained");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full bg-gray-950"
                height={160}
                src="/images/blog/has-pseudo-class.webp"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  CSS{" "}
                  <span className="px-3 text-2xl bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                    :has()
                  </span>{" "}
                  Explained
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>December 2, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  The CSS :has() pseudo-class styles elements based on their
                  relatives, like children or siblings. This gives you powerful
                  control over your styles by selecting elements based on what
                  they contain.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Advent Calendar
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    CSS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Web Development
                  </Badge>
                </div>
              </div>
            </button>
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-md transition will-change-transform bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/my-coding-christmas-four-advent-calendars");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full bg-gray-950"
                height={160}
                src="/images/blog/advent-calendars.webp"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  My Coding Christmas: Four Advent Calendars!
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>December 2, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  This December, I'm diving into four coding Advent calendars to
                  learn more about HTML, CSS, Svelte, and TypeScript.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Advent Calendar
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Web Development
                  </Badge>
                </div>
              </div>
            </button>
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-md transition will-change-transform bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/own-your-bluesky-identity");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full bg-gray-950"
                height={160}
                src="/images/blog/account-change-handle-bluesky.webp"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Own Your Bluesky Identity
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>November 23, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  Ditch the default ".bsky.social" and claim your own domain as
                  your Bluesky username! This easy guide shows you how to get
                  verified and own your online identity.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Others
                  </Badge>
                </div>
              </div>
            </button>
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-md transition will-change-transform bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/goodbye-twitter-x-hello-bluesky");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full bg-gray-950"
                height={160}
                src="/images/blog/goodbye-twitter-x-hello-bluesky.webp"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Goodbye Twitter, Hello Bluesky!
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>November 22, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  I finally said "goodbye" to Twitter/X and found my happy place
                  on Bluesky! This post explores why I made the switch and what
                  I'm loving about my new online home.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Others
                  </Badge>
                </div>
              </div>
            </button>
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-md transition will-change-transform bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/from-ember-to-next");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full bg-gray-950"
                height={160}
                src="/images/blog/from-ember-to-next.webp"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  From Ember.js to Next.js: A Tale of Two Frameworks
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>May 7, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  Explore the differences and surprising similarities between
                  Ember.js and Next.js, two powerful contenders in the web
                  development world.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    EmberJS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    NextJS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Lessons Learned
                  </Badge>
                </div>
              </div>
            </button>
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-md transition will-change-transform bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/the-typescript-tightrope");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full"
                height={160}
                src="/images/blog/the-typescript-tightrope.webp"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  The Typescript Tightrope: A Love-Hate Journey
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>May 4, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  My journey from TypeScript skeptic to enthusiast - how static
                  typing transformed my code and why I believe it's the future.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Web Development
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    TypeScript
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Lessons Learned
                  </Badge>
                </div>
              </div>
            </button>
            <button
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 rounded-lg dark:bg-gray-950 text-gray-950 dark:text-gray-400 border border-transparent p-6 shadow-md transition will-change-transform bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:scale-110 ease-in duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
              onClick={() => {
                router.push("/blog/building-my-developer-playground");
              }}
            >
              <Image
                alt="Blog Post Image"
                className="rounded-lg object-cover border border-transparent w-full"
                height={160}
                src="/images/blog/building-my-developer-playground.webp"
                style={{
                  aspectRatio: "200/160",
                  objectFit: "cover",
                }}
                width={200}
              />
              <div className="space-y-2 text-left">
                <h3 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Building My Developer Playground
                </h3>
                <div className="dark:text-gray-400 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>May 1, 2024</span>
                </div>
                <p className="dark:text-gray-300 line-clamp-3">
                  Dive into the code behind the scenes! Explore the decisions
                  and thought process behind building my personal website.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Web Development
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    NextJS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    React
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Tailwind CSS
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    TypeScript
                  </Badge>
                  <Badge
                    className="text-sm bg-gray-200 dark:bg-gray-800"
                    variant="secondary"
                  >
                    Vercel
                  </Badge>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
