import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CalendarIcon from "@/components/icons/calendar";

export default function Page() {
  return (
    <article className="prose prose-invert max-w-3xl mx-auto space-y-8">
      <div className="space-y-2 not-prose">
        <h1 className="text-2xl font-bold tracking-tighter text-gray-200 md:text-3xl/tight lg:text-4xl">
          The Typescript Tightrope: A Love-Hate Journey
        </h1>
        <div className="text-gray-400 text-sm flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4" />
          <span>May 4, 2024</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-4">
        <p>
          Let's talk about TypeScript. As a web developer, I used to scoff at
          the idea of adding complexity with static typing to my beloved
          JavaScript. Was it really worth the extra effort? Well, buckle up,
          because I'm here to tell you about my journey from TypeScript skeptic
          to enthusiastic advocate. It wasn't always smooth sailing, but let me
          tell you, the destination is pretty darn sweet.
        </p>
        <Image
          alt="The Typescript Tightrope: A Love-Hate Journey Image"
          className="rounded-lg object-cover border border-gray-800"
          height={280}
          src="/images/blog/the-typescript-tightrope.png"
          style={{
            aspectRatio: "400/280",
            objectFit: "cover",
          }}
          width={400}
        />
      </div>
      <h3 className="text-2xl font-bold">
        The Struggles: From Confusion to Grumbling
      </h3>
      <p>
        At first, TypeScript felt like an overbearing schoolmaster, constantly
        pointing out my code's imperfections. Those cryptic error messages?
        Enough to make you want to tear your hair out. Learning the syntax and
        remembering all those types felt like another mental hurdle on top of
        the JavaScript I already knew. Did I really need this extra layer of
        complexity? The answer, I soon discovered, was a resounding yes.
      </p>
      <h3 className="text-2xl font-bold">
        The Learnings: Unveiling the Power Beneath the Complexity
      </h3>
      <p>
        The frustration slowly gave way to a sense of accomplishment as I
        started to grasp the power of TypeScript. Catching errors at compile
        time instead of runtime was a game-changer. Suddenly, my code felt more
        robust, more predictable. Refactoring became a breeze, with the compiler
        ensuring everything remained consistent. Intellisense in my editor
        became a superpower, suggesting types and guiding me towards a more
        structured codebase.
      </p>
      <h3 className="text-2xl font-bold">
        The Love Affair Begins: Embracing the Benefits
      </h3>
      <p>
        The more I used TypeScript, the more I appreciated its subtle elegance.
        The code became cleaner, easier to understand not just for me, but for
        anyone collaborating on the project. Large projects, once daunting,
        became more manageable with TypeScript acting as a safety net. The fear
        of introducing bugs with seemingly harmless typos started to fade.
      </p>
      <h3 className="text-2xl font-bold">
        The Present (and Future): A Continuous Learning Curve
      </h3>
      <p>
        Here's the thing: my love affair with TypeScript is still ongoing.
        There's always more to learn, new features to explore, and edge cases to
        navigate. But the initial struggles have faded, replaced by a deep
        appreciation for the structure and safety it brings to my development
        process.
      </p>
      <h3 className="text-2xl font-bold">
        The Takeaway: Is TypeScript the Future?
      </h3>
      <p>
        In my opinion, absolutely. While there will always be a place for
        vanilla JavaScript, the benefits of TypeScript, especially for larger
        projects and collaborative environments, are undeniable. It's an
        investment that pays off in cleaner, more maintainable code, and a
        developer experience that's both empowering and enjoyable. So, if you're
        on the fence about TypeScript, I urge you to give it a try. You might
        just find yourself falling in love, one compile-time error at a time.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="secondary">Web Development</Badge>
        <Badge variant="secondary">TypeScript</Badge>
        <Badge variant="secondary">Lessons Learned</Badge>
      </div>
    </article>
  );
}
