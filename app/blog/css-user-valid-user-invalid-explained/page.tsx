import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Badge } from "@/components/ui/badge";
import { BlogBreadcrumb } from "@/components/pages/blog/BlogBreadcrumb";
import { Calendar } from "lucide-react";

export default function Page() {
  return (
    <article className="prose prose-invert mx-auto space-y-8 text-gray-950 dark:text-gray-200">
      <BlogBreadcrumb title="CSS :user-valid and :user-invalid Explained" />
      <div className="space-y-2 not-prose">
        <h1 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-bold tracking-tight flex items-center space-x-4">
          CSS{" "}
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            :user-valid
          </span>{" "}
          and{" "}
          <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
            :user-invalid
          </span>
          Explained
        </h1>
        <div className="text-gray-400 flex items-center space-x-2">
          <Calendar size={20} />
          <span>December 5, 2024</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          alt="User-valid and User-invalid Pseudo-Class"
          className="rounded-lg object-cover border border-transparent bg-gray-950"
          height={540}
          src="/images/blog/css-user-valid-user-invalid-explained.webp"
          style={{
            objectFit: "cover",
          }}
          width={800}
        />
      </div>
      <p>
        When designing forms for websites or applications, it's essential to
        provide users with clear and immediate feedback on their input. This is
        where the{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :user-valid
        </span>{" "}
        and{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :user-invalid
        </span>{" "}
        pseudo-classes come in handy. These CSS selectors help you style form
        elements based on whether the user's input is valid or invalid, making
        it easier for them to identify and correct errors.
      </p>
      <h3 className="font-oswald text-2xl">How They Work</h3>
      <p>
        The{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :user-valid
        </span>{" "}
        and{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :user-invalid
        </span>{" "}
        pseudo-classes match a form control only after the user has
        significantly interacted with the input. This means the styling won't be
        applied until the user has:
      </p>
      <ul className="list-disc list-inside ml-4">
        <li>Typed into the field</li>
        <li>Used the arrow keys to select a value from a datalist</li>
        <li>Used the Tab key to move focus into the field</li>
        <li>Checked or unchecked a radio button or checkbox</li>
      </ul>
      <h3 className="font-oswald text-2xl">
        Benefits of Using These Pseudo-Classes
      </h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>Enhanced User Experience:</strong> Users can quickly identify
          errors and understand what needs to be corrected.
        </li>
        <li>
          <strong>Improved Accessibility:</strong> By using clear visual cues,
          you can make your forms more accessible to users with disabilities.
        </li>
        <li>
          <strong>Reduced Cognitive Load:</strong> Users can focus on filling
          out the form without having to constantly check for errors.
        </li>
      </ul>
      <SyntaxHighlighter language="css" style={atomOneDark} className="ml-4">
        {`
  input:user-invalid {
    border-color: red;
  }

  input:user-valid {
    border-color: green;
  }
      `}
      </SyntaxHighlighter>
      <p>
        In this example, an input field with invalid data will have a red
        border, while a valid input will have a green border.
      </p>
      <h3 className="font-oswald text-2xl">Important Considerations</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>Browser Compatibility:</strong> Ensure that the browsers
          you're targeting support these pseudo-classes.
        </li>
        <li>
          <strong>Custom Validation:</strong> If you're using custom validation,
          you may need to use JavaScript to trigger the appropriate
          pseudo-class.
        </li>
        <li>
          <strong>User Expectations:</strong> Be consistent with your styling
          and use visual cues that users are familiar with.
        </li>
      </ul>
      <p>
        By incorporating the{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :user-valid
        </span>{" "}
        and{" "}
        <span className="px-3 bg-gray-200 dark:bg-gray-800 rounded-2xl text-gray-950 dark:text-gray-200 mx-2">
          :user-invalid
        </span>{" "}
        pseudo-classes into your form design, you can create a more
        user-friendly and accessible experience for everyone.
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
    </article>
  );
}
