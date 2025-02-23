import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BlogBreadcrumb } from "@/components/pages/blog/BlogBreadcrumb";
import { Calendar } from "lucide-react";

export default function Page() {
  return (
    <article className="prose prose-invert mx-auto space-y-8 text-gray-950 dark:text-gray-200">
      <BlogBreadcrumb title={`Own Your Bluesky Identity`} />
      <div className="space-y-2 not-prose">
        <h1 className="font-oswald bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-bold tracking-tight">
          Own Your Bluesky Identity
        </h1>
        <div className="text-gray-400 flex items-center space-x-2">
          <Calendar size={20} />
          <span>November 23, 2024</span>
        </div>
      </div>
      <p>
        Bluesky lets you use your website as your username – it's like a "blue
        check" that shows you're the real deal! This is super helpful for
        organizations and well-known people.
      </p>
      <h3 className="font-oswald text-2xl">Here's how it works:</h3>
      <p>
        Normally, Bluesky usernames end with ".bsky.social". But you can swap
        that out for your website address. So, instead of
        "@yourname.bsky.social", you could have "@yourname.com".
      </p>
      <h3 className="font-oswald text-2xl">Think of it like this:</h3>
      <ul className="list-disc list-inside ml-4">
        <li>The Bluesky team uses "@bsky.app"</li>
        <li>NPR uses "@npr.org"</li>
        <li>I use "@jayvicsanantonio.dev"</li>
        <li>You can use any domain you want!</li>
      </ul>
      <h3 className="font-oswald text-2xl">
        Ready to verify your account? Here's the step-by-step:
      </h3>
      <ol className="list-decimal list-inside ml-4">
        <li>Sign up for Bluesky. Choose any temporary username for now.</li>
        <Image
          alt="Sign up for Bluesky"
          className="rounded-lg object-cover ml-4 my-4 border border-transparent bg-gray-950"
          height={240}
          src="/images/blog/signup-for-bluesky.webp"
          style={{
            objectFit: "cover",
          }}
          width={500}
        />
        <li>Click on "Settings". Then, click on "Account".</li>
        <Image
          alt="Click on Settings"
          className="rounded-lg object-cover ml-4 my-4 border border-transparent bg-gray-950"
          height={240}
          src="/images/blog/click-settings-bluesky.webp"
          style={{
            objectFit: "cover",
          }}
          width={500}
        />
        <li>Click on "Handle".</li>
        <Image
          alt="Click on Handle"
          className="rounded-lg object-cover ml-4 my-4 border border-transparent bg-gray-950"
          height={240}
          src="/images/blog/account-handle-bluesky.webp"
          style={{
            objectFit: "cover",
          }}
          width={500}
        />
        <li>A modal will appear. Click on "I have my own domain".</li>
        <Image
          alt="Click on I have my own domain"
          className="rounded-lg object-cover ml-4 my-4 border border-transparent bg-gray-950"
          height={240}
          src="/images/blog/account-change-handle-bluesky.webp"
          style={{
            objectFit: "cover",
          }}
          width={500}
        />
        <li>
          Grab the DNS record info. Head to your domain registrar. This is the
          company where you bought your domain. (like Namecheap, GoDaddy,
          Squarespace, Cloudflare, Porkbun, etc.) Find your domain's DNS
          settings. Look for something like "Advanced DNS". Add a TXT record.
          You'll basically copy and paste it into the right spots in your DNS
          settings. Give it a few minutes to propagate.
        </li>
        <Image
          alt="Grab the DNS record info"
          className="rounded-lg object-cover ml-4 my-4 border border-transparent bg-gray-950"
          height={240}
          src="/images/blog/add-dns-record-to-domain.webp"
          style={{
            objectFit: "cover",
          }}
          width={500}
        />
        <li>
          Go back to Bluesky. Enter your domain. Click on "Verify DNS Record".
        </li>
        <Image
          alt="Enter your domain"
          className="rounded-lg object-cover ml-4 my-4 border border-transparent bg-gray-950"
          height={240}
          src="/images/blog/verify-dns-record-bluesky.webp"
          style={{
            objectFit: "cover",
          }}
          width={500}
        />
      </ol>
      <p>
        That's it! You've got your domain as your username, and you're verified.
      </p>
      <h3 className="font-oswald text-2xl">Important Notes:</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          If you ditch your old ".bsky.social" username, someone else can grab
          it. But don't worry, any old mentions of you will still link to your
          account.
        </li>
        <li>
          You can use this same username on any app built on the AT Protocol
          (the tech behind Bluesky).
        </li>
        <li>
          If you don't have a domain, you can buy one right through Bluesky or
          from other companies like Namecheap or Porkbun.
        </li>
      </ul>
      <h3 className="font-oswald text-2xl">Why does Bluesky do this?</h3>
      <p>
        Using websites as usernames makes things easier and more secure. It
        helps with:
      </p>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>Identity:</strong> You can use the same username across
          different apps.
        </li>
        <li>
          <strong>Verification:</strong> It's easy to see who's really who.
        </li>
        <li>
          <strong>Portability:</strong> You can switch to a different server
          without changing your username.
        </li>
      </ul>
      <p>
        So, there you have it! A simple guide to getting verified on Bluesky.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge
          className="text-sm bg-gray-200 dark:bg-gray-800"
          variant="secondary"
        >
          Others
        </Badge>
      </div>
    </article>
  );
}
