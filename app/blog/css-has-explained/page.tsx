import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Badge } from "@/components/ui/badge";
import { BlogBreadcrumb } from "@/components/pages/blog/BlogBreadcrumb";
import { Calendar } from "lucide-react";

export default function Page() {
  return (
    <article className="prose prose-invert mx-auto space-y-8 text-gray-950 dark:text-gray-200">
      <BlogBreadcrumb title="CSS :has() Explained" />
      <div className="space-y-2 not-prose">
        <h1 className="font-oswald bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-bold tracking-tight flex items-center space-x-4">
          CSS{" "}
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            :has()
          </span>{" "}
          Explained
        </h1>
        <div className="text-gray-400 flex items-center space-x-2">
          <Calendar size={20} />
          <span>December 2, 2024</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          alt="Has Pseudo-Class"
          className="rounded-lg object-cover border border-transparent bg-gray-950"
          height={540}
          src="/images/blog/has-pseudo-class.webp"
          style={{
            objectFit: "cover",
          }}
          width={800}
        />
      </div>
      <p>
        For years, CSS selectors have allowed us to style elements based on
        their relationship with their descendants. We could easily target an
        element with a specific child or containing certain text. But what if we
        wanted to style an element based on its parent or preceding sibling?
        That's where the game-changing{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :has()
        </span>{" "}
        pseudo-class comes in!
      </p>
      <h3 className="font-oswald text-2xl">
        What is the{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :has()
        </span>{" "}
        Pseudo-Class?
      </h3>
      <p>
        The{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :has()
        </span>{" "}
        pseudo-class is a powerful tool that allows you to select an element
        based on its descendants, ancestors, or siblings. Think of it as a way
        to say, "Style this element if it has a child/parent/sibling that
        matches this specific selector."
      </p>
      <h3 className="font-oswald text-2xl">How Does it Work?</h3>
      <p>The syntax is simple:</p>
      <SyntaxHighlighter language="css" style={atomOneDark} className="ml-4">
        {`
  element:has(selector) {
    /* Styles to apply */
  }
      `}
      </SyntaxHighlighter>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>element:</strong> The element you want to style.
        </li>
        <li>
          <strong>selector:</strong> The selector that the element's relative
          must match.
        </li>
      </ul>
      <h3 className="font-oswald text-2xl">Practical Examples</h3>
      <p>
        Let's dive into some real-world examples to illustrate the versatility
        of{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :has()
        </span>
        .
      </p>
      <ol className="list-decimal list-inside ml-4 space-y-8">
        <li className="space-y-2">
          <strong>Styling an element based on its child:</strong>
          <div className="space-y-1">
            <p>
              Imagine you want to style a{" "}
              <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                {"<ul>"}
              </span>{" "}
              element differently if it contains a list item with the class
              "special".
            </p>
            <SyntaxHighlighter language="css" style={atomOneDark}>
              {`
  <ul>
    <li>Item 1</li>
    <li class="special">Item 2</li>
    <li>Item 3</li>
  </ul>
          `}
            </SyntaxHighlighter>
            <SyntaxHighlighter language="css" style={atomOneDark}>
              {`
  ul:has(li.special) {
    border: 2px solid red;
  }
          `}
            </SyntaxHighlighter>
            <p>
              This CSS will add a red border to the{" "}
              <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                {"<ul>"}
              </span>{" "}
              because it has a child{" "}
              <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                {"<li>"}
              </span>{" "}
              with the class "special".
            </p>
          </div>
        </li>
        <li className="space-y-2">
          <strong>Styling an element based on its parent:</strong>
          <div className="space-y-1">
            <p>
              Let's say you want to style a link differently if it's inside a
              navigation bar.
            </p>
            <SyntaxHighlighter language="css" style={atomOneDark}>
              {`
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
          `}
            </SyntaxHighlighter>
            <SyntaxHighlighter language="css" style={atomOneDark}>
              {`
  nav a:has(nav) { 
    color: blue;
  }
          `}
            </SyntaxHighlighter>
            <p>
              This CSS will make all links within the{" "}
              <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                {"<nav>"}
              </span>{" "}
              element blue. Although this example seems a bit contrived (as all{" "}
              <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                {"<a>"}
              </span>{" "}
              elements within the{" "}
              <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                {"<nav>"}
              </span>{" "}
              would be styled without the use of
              <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                :has()
              </span>
              ), it demonstrates the ability to target elements based on their
              ancestors.
            </p>
          </div>
        </li>
        <li className="space-y-2">
          <strong>Styling an element based on its sibling:</strong>
          <div className="space-y-1">
            <p>
              Suppose you want to highlight a paragraph that comes after a
              heading.
            </p>
            <SyntaxHighlighter language="css" style={atomOneDark}>
              {`
  <h2>Important Heading</h2>
  <p>This paragraph is highlighted.</p>
          `}
            </SyntaxHighlighter>
            <SyntaxHighlighter language="css" style={atomOneDark}>
              {`
  h2 + p:has(+ h2) {
    background-color: yellow;
  }
          `}
            </SyntaxHighlighter>
            <p>
              This CSS will give the paragraph a yellow background because it is
              preceded by an{" "}
              <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                {"<h2>"}
              </span>{" "}
              element.
            </p>
          </div>
        </li>
      </ol>
      <h3 className="font-oswald text-2xl">Practical Examples</h3>
      <ol className="list-decimal list-inside ml-4 space-y-8">
        <li className="space-y-2">
          <strong>Form Validation:</strong>
          <div className="space-y-1">
            <p>
              You can use{" "}
              <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                :has()
              </span>{" "}
              to style form elements based on the validity of other inputs. For
              example, you can highlight a required field if it's empty when the
              form is submitted.
            </p>
            <SyntaxHighlighter language="css" style={atomOneDark}>
              {`
  <form>
    <label for="name">Name:</label>
    <input type="text" id="name" required>
    <button type="submit">Submit</button>
  </form>
          `}
            </SyntaxHighlighter>
            <SyntaxHighlighter language="css" style={atomOneDark}>
              {`
  form:has(:invalid) button {
    opacity: 0.5;
    cursor: not-allowed;
  }
          `}
            </SyntaxHighlighter>
            <p>
              This CSS will disable the submit button if any required field
              within the form is invalid.
            </p>
          </div>
        </li>
        <li className="space-y-2">
          <strong>Dynamic Styling:</strong>
          <div className="space-y-1">
            <p>
              With{" "}
              <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
                :has()
              </span>
              , you can create dynamic styles that respond to user interactions.
              For instance, you can change the style of a button when the user
              hovers over a specific element.
            </p>
            <SyntaxHighlighter language="css" style={atomOneDark}>
              {`
  <button>Click Me</button>
  <div class="hover-target">Hover over me!</div>
          `}
            </SyntaxHighlighter>
            <SyntaxHighlighter language="css" style={atomOneDark}>
              {`
  button:has(.hover-target:hover) {
    background-color: green;
  }
          `}
            </SyntaxHighlighter>
            <p>
              This CSS will change the button's background color to green when
              the user hovers over the div with the class "hover-target".
            </p>
          </div>
        </li>
      </ol>
      <h3 className="font-oswald text-2xl">Browser Support</h3>
      <p>
        While the{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :has()
        </span>{" "}
        pseudo-class is a relatively new addition to CSS, it enjoys excellent
        browser support. All major browsers, including Chrome, Firefox, Edge,
        and Safari, now support{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :has()
        </span>
        .
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
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
