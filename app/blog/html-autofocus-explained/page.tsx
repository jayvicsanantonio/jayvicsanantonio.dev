import type { Metadata } from 'next';
import { blogPostsData } from '@/lib/blog-data';
import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Badge } from "@/components/ui/badge";
import { BlogBreadcrumb } from "@/components/pages/blog/BlogBreadcrumb";
import { Calendar } from "lucide-react";

const SLUG = 'html-autofocus-explained';

export async function generateMetadata(): Promise<Metadata> {
  const post = blogPostsData.get(SLUG);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'This blog post could not be found.',
    };
  }

  // const siteUrl = 'https://www.jayvicsanantonio.me'; // Removed, metadataBase in layout.tsx will be used
  const fullImageUrl = post.image; // Path should be relative to metadataBase
  const postUrl = `/blog/${SLUG}`; // Path should be relative to metadataBase

  return {
    title: `${post.title} | Jayvic San Antonio`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      images: [
        {
          url: fullImageUrl,
          width: 800,
          height: 540,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [fullImageUrl],
      creator: '@jayvicsanantonio',
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default function Page() {
  return (
    <article className="prose prose-invert mx-auto space-y-8 text-gray-950 dark:text-gray-200">
      <BlogBreadcrumb title="HTML autofocus Explained" />
      <div className="space-y-2 not-prose">
        <h1 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-bold tracking-tight flex items-center space-x-4">
          HTML{" "}
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            autofocus
          </span>{" "}
          Explained
        </h1>
        <div className="text-gray-400 flex items-center space-x-2">
          <Calendar size={20} />
          <span>December 3, 2024</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          alt="HTML autofocus explained"
          className="rounded-lg object-cover border border-transparent bg-gray-950"
          height={540}
          src="/images/blog/html-autofocus-explained.webp"
          style={{
            objectFit: "cover",
          }}
          width={800}
        />
      </div>
      <h3 className="font-oswald text-2xl">
        What is
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 ml-2">
          autofocus
        </span>{" "}
        ?
      </h3>
      <p>
        The
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          autofocus{" "}
        </span>
        attribute in HTML is a simple yet powerful tool that allows you to
        automatically place the cursor in a specific form field when a web page
        loads. This can be incredibly useful for streamlining user interactions
        and improving the overall user experience on your website.
      </p>
      <h3 className="font-oswald text-2xl">
        How to use
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 ml-2">
          autofocus
        </span>{" "}
      </h3>
      <p>
        To use the{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 ml-2">
          autofocus
        </span>{" "}
        attribute, simply add it to the desired form field like this:
      </p>
      <SyntaxHighlighter language="html" style={atomOneDark} className="ml-4">
        {`
  <input type="text" name="username" autofocus>
      `}
      </SyntaxHighlighter>
      <p>
        This will automatically place the cursor in the "username" field when
        the page loads, prompting the user to start typing immediately.
      </p>
      <h3 className="font-oswald text-2xl">
        When not to use
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 ml-2">
          autofocus
        </span>{" "}
      </h3>
      <p>
        While{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 ml-2">
          autofocus
        </span>{" "}
        can be helpful, it's important to use it judiciously. Overusing it can
        lead to a jarring and frustrating user experience. Here are some
        scenarios where you should avoid using{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 ml-2">
          autofocus
        </span>
        :
      </p>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>Complex forms:</strong> If your form has multiple fields,
          autofocus can be confusing and disorienting for users.
        </li>
        <li>
          <strong>Unexpected behavior:</strong> Autofocus can startle users if
          they're not expecting it, especially if it causes the page to jump or
          scroll unexpectedly.
        </li>
        <li>
          <strong>Accessibility concerns:</strong> Autofocus can be problematic
          for users with disabilities, especially those who rely on screen
          readers or keyboard navigation.
        </li>
      </ul>
      <h3 className="font-oswald text-2xl">
        Best practices for{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 ml-2">
          autofocus
        </span>
      </h3>
      <p>
        Here are some tips for using{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 ml-2">
          autofocus
        </span>{" "}
        effectively:
      </p>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>Single-purpose pages:</strong> Autofocus works best on pages
          with a single, clear purpose, such as a login page or a search form.
        </li>
        <li>
          <strong>Clear context:</strong> Make sure the autofocus behavior is
          expected and aligns with the user's goals.
        </li>
        <li>
          <strong>Accessibility considerations:</strong> Provide alternative
          ways for users to navigate the form, such as clear labels and keyboard
          shortcuts.
        </li>
      </ul>
      <p>
        By following these guidelines, you can ensure that you're using
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 ml-2">
          autofocus
        </span>{" "}
        in a way that enhances the user experience rather than detracting from
        it.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge className="text-sm" variant="secondary">
          Advent Calendar
        </Badge>
        <Badge className="text-sm" variant="secondary">
          HTML
        </Badge>
        <Badge className="text-sm" variant="secondary">
          Web Development
        </Badge>
      </div>
    </article>
  );
}
