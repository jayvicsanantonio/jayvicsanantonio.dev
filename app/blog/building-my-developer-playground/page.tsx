import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BlogBreadcrumb } from "@/components/pages/blog/BlogBreadcrumb";
import { Calendar } from "lucide-react";

export default function Page() {
  return (
    <article className="prose prose-invert mx-auto space-y-8">
      <BlogBreadcrumb title="Building My Developer Playground" />
      <div className="space-y-2 not-prose">
        <h1 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-bold tracking-tight">
          Building My Developer Playground
        </h1>
        <div className="text-gray-400 flex items-center space-x-2">
          <Calendar size={20} />
          <span>May 1, 2024</span>
        </div>
      </div>
      <p>
        Hey everyone! As a web developer, there's a special kind of satisfaction
        that comes with crafting your own digital space. It's a chance to
        experiment, showcase your skills, and maybe even share some knowledge
        (like this article!). So, I recently embarked on building my own
        website, and today, I want to take you behind the scenes and delve into
        the tech stack powering this project. Buckle up, code enthusiasts,
        because we're diving into the world of Next.js, React, Tailwind CSS, and
        TypeScript!
      </p>
      <div className="flex justify-center">
        <Image
          alt="Building My Developer Playground Image"
          className="rounded-lg object-cover border border-gray-800"
          height={540}
          src="/images/blog/building-my-developer-playground.png"
          style={{
            objectFit: "cover",
          }}
          width={800}
        />
      </div>
      <h3 className="font-oswald text-2xl">
        The Foundation: Next.js and React
      </h3>
      <p>
        The first question on any web developer's mind: "What framework should I
        use?" Well, for this project, I opted for the dynamic duo: Next.js and
        React. Here's why:
      </p>
      <ul className="ml-4 space-y-8 list-disc">
        <li>
          <strong>Next.js</strong>: This React-based framework offers a ton of
          built-in features like server-side rendering (SSR) and static site
          generation (SSG). This translates to lightning-fast loading times and
          SEO benefits, which are crucial for a personal website. Plus, Next.js
          makes routing a breeze, keeping my code clean and organized.
        </li>
        <li>
          <strong>React</strong>: Let's be honest, React is kind of a rockstar
          in the front-end world. Its component-based structure makes building
          reusable UI elements a joy, and the vast React ecosystem provides
          access to countless libraries and tools.
        </li>
      </ul>
      <p>
        Sure, other frameworks like Gatsby (SSG-focused) or Nuxt.js
        (Vue.js-based) were tempting. But for the flexibility and developer
        experience, Next.js and React won me over.
      </p>
      <h3 className="font-oswald text-2xl">
        Styling with Styled Components... Wait, No, Tailwind!
      </h3>
      <p>
        Next, came the question of styling. Now, I'm a big fan of Styled
        Components for its intuitive component-based styling approach. But for
        this project, I decided to give Tailwind CSS a spin. Here's the deal:
      </p>
      <ul className="ml-4 space-y-8 list-disc">
        <li>
          <strong>Tailwind CSS</strong>: This utility-first CSS framework
          provides a massive toolbox of pre-built classes for styling elements.
          It might seem restrictive at first, but it actually promotes rapid
          development and keeps my styles consistent. Plus, Tailwind is super
          customizable, allowing me to tailor the look and feel to my exact
          preferences.
        </li>
      </ul>
      <p>
        While frameworks like Bootstrap offer pre-built components, Tailwind's
        focus on utility classes gives me more granular control and keeps my
        codebase lightweight.
      </p>
      <h3 className="font-oswald text-2xl">
        Adding Type Safety with TypeScript
      </h3>
      <p>
        One of the best decisions I made for this project? Adding TypeScript!
        Here's why:
      </p>
      <ul className="ml-4 space-y-8 list-disc">
        <li>
          <strong>TypeScript</strong>: This superset of JavaScript adds static
          typing, which essentially means catching errors before the code even
          runs. This translates to a more robust and maintainable codebase,
          especially for larger projects. TypeScript also improves code
          completion and refactoring in my editor, making development a smoother
          experience.
        </li>
      </ul>
      <p>
        Now, some might argue that using vanilla JavaScript is perfectly fine.
        But for the added peace of mind and developer experience boost,
        TypeScript was a no-brainer.
      </p>
      <h3 className="font-oswald text-2xl">
        Deployment Decisions: Vercel vs AWS
      </h3>
      <p>
        Now, let's talk deployment! Choosing the right platform to host my
        website was a thoughtful process. I weighed the pros and cons between
        two industry giants: Vercel and Amazon Web Services (AWS).
      </p>
      <ul className="ml-4 space-y-8 list-disc">
        <li>
          <strong>Vercel</strong>: This serverless deployment platform offers
          seamless integration with Next.js, making the deployment process a
          breeze. Vercel also provides built-in features like global CDN and
          automatic SSL certificates, which take a lot off my plate.
        </li>
        <li>
          <strong>AWS</strong>: A powerful and versatile cloud computing
          platform, AWS offers a vast array of services, including options for
          web hosting. However, the initial setup can be more complex compared
          to Vercel.
        </li>
      </ul>
      <p>
        Ultimately, I decided to go with Vercel. The ease of deployment, tight
        integration with Next.js, and features like automatic SSL certificates
        made it a compelling choice for this project. While I had to learn a bit
        more about Vercel compared to my experience with AWS, it was a fun and
        rewarding learning experience.
      </p>
      <h3 className="font-oswald text-2xl">
        Building Something Awesome (Hopefully!)
      </h3>
      <p>
        So, there you have it! This is the tech stack powering my website. It's
        a combination of powerful tools that allow me to focus on creating a
        great user experience and showcasing my skills.
      </p>
      <p>
        This is just the beginning, though. As I build out the website, I'll be
        sure to share more about the process, the challenges, and hopefully,
        some cool features! In the meantime, feel free to reach out and share
        your thoughts on my tech stack choices, or even suggest some cool
        features you'd like to see on the website.
      </p>
      <p>Happy coding!</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge className="text-sm" variant="secondary">
          Web Development
        </Badge>
        <Badge className="text-sm" variant="secondary">
          Next.js
        </Badge>
        <Badge className="text-sm" variant="secondary">
          React
        </Badge>
        <Badge className="text-sm" variant="secondary">
          Tailwind CSS
        </Badge>
        <Badge className="text-sm" variant="secondary">
          TypeScript
        </Badge>
        <Badge className="text-sm" variant="secondary">
          Vercel
        </Badge>
      </div>
    </article>
  );
}
