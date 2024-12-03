import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BlogBreadcrumb } from "@/components/pages/blog/BlogBreadcrumb";
import { Calendar } from "lucide-react";

export default function Page() {
  return (
    <article className="prose prose-invert mx-auto space-y-8 text-gray-950 dark:text-gray-200">
      <BlogBreadcrumb title="My Coding Christmas: Four Advent Calendars!" />
      <div className="space-y-2 not-prose">
        <h1 className="font-oswald bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-bold tracking-tight">
          My Coding Christmas: Four Advent Calendars!
        </h1>
        <div className="text-gray-400 flex items-center space-x-2">
          <Calendar size={20} />
          <span>December 2, 2024</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          alt="Four Advent Calendars"
          className="rounded-lg object-cover border border-transparent bg-gray-950"
          height={540}
          src="/images/blog/advent-calendars.webp"
          style={{
            objectFit: "cover",
          }}
          width={800}
        />
      </div>
      <p>
        This December, I'm embarking on a journey of learning and growth by
        participating in not one, not two, but four Advent calendars! That's
        right, I'll be diving deep into the worlds of HTML, CSS, Svelte, and
        TypeScript.
      </p>
      <p>
        Why am I doing this? Well, I'm incredibly passionate about web
        development and I believe that continuous learning is the key to
        becoming a better developer. These Advent calendars offer a fantastic
        opportunity to explore new concepts, sharpen my skills, and stay
        up-to-date with the latest trends.
      </p>
      <p>Here's a quick rundown of the Advent calendars I'll be following:</p>
      <ul className="list-disc list-inside ml-4 space-y-8">
        <li>
          <strong>HTMHell Advent:</strong> This one focuses on the fundamentals
          – HTML! I'm excited to deepen my understanding of semantic HTML,
          accessibility, and best practices for creating well-structured web
          pages. You can check it out here:{" "}
          <a
            href="https://htmhell.dev/adventcalendar/"
            className="hover:text-blue-400 underline decoration-wavy decoration-purple-500 underline-offset-4"
          >
            https://htmhell.dev/adventcalendar
          </a>
        </li>
        <li>
          <strong>CSS Advent:</strong> CSS is where the magic happens! I'm eager
          to learn new techniques, explore cutting-edge features, and level up
          my styling game. Find out more here:{" "}
          <a
            href="https://cssadventcalendar.dev/"
            className="hover:text-blue-400 underline decoration-wavy decoration-purple-500 underline-offset-4"
          >
            https://cssadventcalendar.dev
          </a>
        </li>
        <li>
          <strong>Advent of Svelte:</strong> Svelte has been on my radar for a
          while now, and this Advent calendar is the perfect excuse to dive in
          and learn this exciting framework. I'm looking forward to building
          interactive and performant web applications with Svelte. Check it out
          here:{" "}
          <a
            href="https://svelte.dev/blog/advent-of-svelte"
            className="hover:text-blue-400 underline decoration-wavy decoration-purple-500 underline-offset-4"
          >
            https://svelte.dev/blog/advent-of-svelte
          </a>
        </li>
        <li>
          <strong>Advent of TypeScript:</strong> TypeScript is becoming
          increasingly popular, and for good reason! I want to strengthen my
          understanding of this powerful language and leverage its benefits for
          building more robust and maintainable code. Learn more here:{" "}
          <a
            href="https://www.adventofts.com/about"
            className="hover:text-blue-400 underline decoration-wavy decoration-purple-500 underline-offset-4"
          >
            https://www.adventofts.com/about
          </a>
        </li>
      </ul>
      <h3 className="font-oswald text-2xl">My Commitment to Learning</h3>
      <p>
        I'm not just passively consuming the content from these Advent
        calendars. I'm committed to actively engaging with the material and
        reinforcing my learning. Throughout December, I'll be:
      </p>
      <ul className="list-disc list-inside ml-4 space-y-8">
        <li>
          <strong>Taking notes:</strong> I'll be diligently documenting key
          concepts, code snippets, and insights from each day's Advent entry.
        </li>
        <li>
          <strong>Building projects:</strong> I'll be putting my newfound
          knowledge into practice by building small projects and experimenting
          with the techniques I learn.
        </li>
        <li>
          <strong>Sharing my journey:</strong> I'll be writing blog posts here
          to share my learnings, reflections, and any cool new features or
          concepts I discover. So stay tuned for regular updates!
        </li>
      </ul>
      <p>
        I'm genuinely excited about this learning journey and I'm confident that
        by the end of December, I'll be a more well-rounded and skilled
        developer. Wish me luck!
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
    </article>
  );
}
