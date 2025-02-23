import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Badge } from "@/components/ui/badge";
import { BlogBreadcrumb } from "@/components/pages/blog/BlogBreadcrumb";
import { Calendar } from "lucide-react";

export default function Page() {
  return (
    <article className="prose prose-invert mx-auto space-y-8 text-gray-950 dark:text-gray-200">
      <BlogBreadcrumb title="Popover API Explained" />
      <div className="space-y-2 not-prose">
        <h1 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-bold tracking-tight flex items-center space-x-4">
          Popover API Explained
        </h1>
        <div className="text-gray-400 flex items-center space-x-2">
          <Calendar size={20} />
          <span>December 6, 2024</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          alt="Popover API Explained"
          className="rounded-lg object-cover border border-transparent bg-gray-950"
          height={540}
          src="/images/blog/popover-api-explained.webp"
          style={{
            objectFit: "cover",
          }}
          width={800}
        />
      </div>
      <p>
        It's Day 6 of my Coding Christmas Advent Calendar journey, and today's
        challenge led me down the rabbit hole of the Popover API! This new web
        standard caught my eye, promising a cleaner way to create those helpful
        little content bubbles that appear when you interact with elements on a
        webpage. I dove headfirst into both the{" "}
        <a
          href="https://web.dev/blog/popover-api"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 underline decoration-wavy decoration-purple-500 underline-offset-4"
        >
          web.dev blog post
        </a>{" "}
        and the{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 underline decoration-wavy decoration-purple-500 underline-offset-4"
        >
          MDN documentation
        </a>{" "}
        to uncover its secrets. Here's what I learned:
      </p>
      <h3 className="font-oswald text-2xl">What sets Popovers apart?</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>Always on Top:</strong> Popovers are designed to always appear
          above other page content, ensuring they're visible and accessible.
        </li>
        <li>
          <strong>Light Dismissal: </strong> Clicking outside the popover or
          hitting the Escape key automatically closes it, providing a smooth
          user experience.
        </li>
        <li>
          <strong>Not just Tooltips: </strong> While similar to tooltips,
          popovers can hold more complex content, including images, forms, and
          even interactive elements.
        </li>
      </ul>
      <h3 className="font-oswald text-2xl">The Core Attributes:</h3>
      <p>At the heart of the Popover API are these key HTML attributes:</p>
      <ul className="list-disc list-inside ml-4">
        <li>
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            popover
          </span>
          - Add this attribute to an element (like a{" "}
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            {"<div>"}
          </span>
          ) to transform it into a popover container. This is where you'll put
          the content you want to display.
        </li>
        <li>
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            popovertarget
          </span>
          - This attribute goes on the element that triggers the popover (a
          button, an icon, etc.). Its value should be the ID of your popover
          element.
        </li>
        <li>
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            popovertargetaction
          </span>
          - This attribute lets you control how the popover is activated. It
          defaults to{" "}
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            click
          </span>
          , but you can set it to{" "}
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            hover
          </span>{" "}
          if you prefer mouseover activation.
        </li>
      </ul>
      <h3 className="font-oswald text-2xl">A Quick Example:</h3>
      <SyntaxHighlighter language="html" style={atomOneDark}>
        {`
  <button id="myButton" popovertarget="myPopover">Show Info</button>

  <div id="myPopover" popover>
    <p>This is some extra information!</p>
  </div>
          `}
      </SyntaxHighlighter>
      <p>
        In this example, clicking the button (which has{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          popovertarget="myPopover"
        </span>
        ) will reveal the{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          {"<div>"}
        </span>{" "}
        with the ID{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          myPopover
        </span>
        .
      </p>
      <h3 className="font-oswald text-2xl">Taking Control with JavaScript:</h3>
      <p>
        While the{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          popovertargetaction
        </span>{" "}
        attribute provides basic control, you can use JavaScript for more
        dynamic behavior:
      </p>
      <ul className="list-disc list-inside ml-4">
        <li>
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            showPopover()
          </span>
          - Call this method on a popover element to show it programmatically.
        </li>
        <li>
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            hidePopover()
          </span>
          - This method hides the popover.
        </li>
      </ul>
      <h3 className="font-oswald text-2xl">Styling Popovers with CSS:</h3>
      <p>
        The Popover API provides some helpful CSS features to customize your
        popovers:
      </p>
      <ul className="list-disc list-inside ml-4">
        <li>
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            :popover-open
          </span>
          - This pseudo-class allows you to style the anchor element (the one
          that triggers the popover) when the popover is open. For example, you
          could change the button's color to indicate that the popover is
          active.
        </li>
        <li>
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            ::backdrop
          </span>
          - This pseudo-element represents the area outside the popover. You can
          use it to create effects like dimming the background or adding an
          overlay when the popover is visible.
        </li>
      </ul>
      <SyntaxHighlighter language="css" style={atomOneDark} className="ml-4">
        {`
  #myButton:popover-open {
    background-color: lightblue; 
  }

  #myPopover::backdrop {
    background-color: rgba(0, 0, 0, 0.2); 
  }
      `}
      </SyntaxHighlighter>
      <h3 className="font-oswald text-2xl">Why the Popover API Matters:</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>Accessibility: </strong> The Popover API is built with
          accessibility in mind, making it easier to create popovers that
          everyone can use.
        </li>
        <li>
          <strong>Standardization: </strong> This API brings consistency to how
          popovers behave across different browsers.
        </li>
        <li>
          <strong>Flexibility: </strong> Popovers can accommodate a wide range
          of content, from simple text to interactive elements.
        </li>
      </ul>
      <h3 className="font-oswald text-2xl">The Future of Popovers:</h3>
      <p>
        The Popover API is still under development, with exciting features on
        the horizon:
      </p>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>Enhanced Customization: </strong> Expect more options to style
          and animate popovers.
        </li>
        <li>
          <strong>Improved Accessibility: </strong> Ongoing efforts are focused
          on making popovers even more accessible.
        </li>
      </ul>
      <p>
        I'm truly excited about the potential of the Popover API to simplify and
        enhance how we create interactive web experiences. It's a powerful tool
        that deserves your attention!
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
    </article>
  );
}
