import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BlogBreadcrumb } from "@/components/pages/blog/BlogBreadcrumb";
import CalendarIcon from "@/components/icons/calendar";

export default function Page() {
  return (
    <article className="prose prose-invert mx-auto space-y-8">
      <BlogBreadcrumb title="From Ember.js to Next.js" />
      <div className="space-y-2 not-prose">
        <h1 className="font-oswald text-gray-200 leading-tight text-3xl md:text-4xl font-title font-bold tracking-tight">
          From Ember.js to Next.js: A Tale of Two Frameworks
        </h1>
        <div className="text-gray-400 flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4" />
          <span>May 7, 2024</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-4">
        <p>
          Ah, the land of JavaScript frameworks! As a developer, navigating the
          ever-evolving landscape can be both exciting and overwhelming. Today,
          I want to take a closer look at two powerful contenders: Ember.js and
          Next.js. While both can help you build amazing web applications, their
          approaches are quite different. So, let's dive in and see how Ember.js
          and Next.js compare!
        </p>
        <Image
          alt="From Ember.js to Next.js Image"
          className="rounded-lg object-cover border border-gray-800"
          height={220}
          src="/images/blog/from-ember-to-next.png"
          style={{
            aspectRatio: "400/220",
            objectFit: "cover",
          }}
          width={400}
        />
      </div>
      <h3 className="font-oswald text-2xl">
        Philosophical Differences: Convention vs. Configuration
      </h3>
      <p>
        Ember.js embraces a philosophy of "convention over configuration." This
        means the framework provides a strong structure and encourages adherence
        to its best practices. Think of it as a well-paved road, guiding you
        towards a well-defined destination. For greenhorn developers, this
        structured approach can be a lifesaver, reducing boilerplate code and
        streamlining development.
      </p>
      <p>
        Next.js, on the other hand, leans towards a more "configuration-driven"
        approach. It provides a flexible foundation, allowing you to build
        applications tailored to your specific needs. Think of it as a set of
        high-quality tools and a vast open road – you're free to choose your
        destination and pave the way as you go. This flexibility makes Next.js a
        great choice for experienced developers who enjoy customization and
        control.
      </p>
      <h3 className="font-oswald text-2xl">
        Rendering Showdown: Client-Side vs. Server-Side
      </h3>
      <p>
        The more I used TypeScript, the more I appreciated its subtle elegance.
        The code became cleaner, easier to understand not just for me, but for
        anyone collaborating on the project. Large projects, once daunting,
        became more manageable with TypeScript acting as a safety net. The fear
        of introducing bugs with seemingly harmless typos started to fade.
      </p>
      <h3 className="font-oswald text-2xl">
        The Present (and Future): A Continuous Learning Curve
      </h3>
      <p>
        Another key difference lies in rendering. Ember.js is primarily a
        client-side framework, meaning most of the rendering logic happens in
        the user's browser. While this can be efficient for certain
        applications, it might not be ideal for SEO or initial page load times.
      </p>
      <p>
        Next.js, on the other hand, shines in the world of server-side rendering
        (SSR) and static site generation (SSG). This means the server takes care
        of rendering the initial HTML, resulting in faster load times and better
        SEO. However, this approach can add some complexity to the development
        process.
      </p>
      <h3 className="font-oswald text-2xl">
        Routing Similarities: A Familiar Friend
      </h3>
      <p>
        One area where Ember.js and Next.js share a surprising similarity is
        routing. Both frameworks offer declarative routing approaches, where you
        define routes within your code. This makes it easy to manage the
        navigation structure of your application, and for Ember.js developers,
        the syntax might feel strangely familiar in Next.js!
      </p>
      <h3 className="font-oswald text-2xl">
        The Verdict: Cool Kids Club, But Different Tables
      </h3>
      <p>
        So, which framework is the winner? The truth is, there's no single
        answer. Ember.js excels with its structured approach and built-in
        features, making it a great choice for beginners or complex single-page
        applications (SPAs). Next.js thrives with its flexibility and focus on
        performance, ideal for experienced developers or SEO-driven websites.
      </p>
      <p>
        Ultimately, the best framework depends on your specific project
        requirements and team preferences. Both Ember.js and Next.js are
        powerful tools in the developer's arsenal, offering cool features and
        approaches to building modern web applications. So, take them for a
        spin, see which one speaks to your coding soul, and happy building!
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
    </article>
  );
}
