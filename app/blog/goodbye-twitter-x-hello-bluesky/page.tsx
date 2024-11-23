import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BlogBreadcrumb } from "@/components/pages/blog/BlogBreadcrumb";
import { Calendar } from "lucide-react";

export default function Page() {
  return (
    <article className="prose prose-invert mx-auto space-y-8 text-gray-950 dark:text-gray-200">
      <BlogBreadcrumb title="The Typescript Tightrope" />
      <div className="space-y-2 not-prose">
        <h1 className="font-oswald bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 leading-tight text-3xl md:text-4xl font-title font-bold tracking-tight">
          Goodbye Twitter, Hello Bluesky!
        </h1>
        <div className="text-gray-400 flex items-center space-x-2">
          <Calendar size={20} />
          <span>November 22, 2024</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          alt="Goodbye Twitter, Hello Bluesky!"
          className="rounded-lg object-cover border border-transparent bg-gray-950"
          height={540}
          src="/images/blog/goodbye-twitter-x-hello-bluesky.png"
          style={{
            objectFit: "cover",
          }}
          width={800}
        />
      </div>
      <p>
        Like many of you, I watched with a mix of fascination and dread as Elon
        Musk took over Twitter (now rebranded as "X"). Remember those early
        days? The constant changes, the uncertainty, the exodus of familiar
        faces? I got my Bluesky invite code on August 6, 2023, and while I
        created an account, I wasn't quite ready to jump ship. Call me
        sentimental, but I had years of memories, connections, and conversations
        woven into the fabric of Twitter.
      </p>
      <p>But things kept getting...weird.</p>
      <p>
        For starters, my feed became a minefield of misinformation. It felt like
        every other post was pushing some conspiracy theory or blatantly false
        narrative. It was exhausting trying to wade through the noise and find
        actual, reliable information.
      </p>
      <p>
        The algorithm changes were another major frustration. It felt like I was
        constantly battling to see tweets from the people I actually followed.
        My timeline became this jumbled mess of suggested posts and "trending"
        topics that I had zero interest in. It felt like Twitter was actively
        trying to keep me from connecting with the people and communities I
        cared about.
      </p>
      <p>
        And then there was the overall tone. It just got...meaner. The platform
        that used to be about witty banter and insightful discussions became a
        breeding ground for negativity and hostility. I found myself dreading
        opening the app, worried about what kind of vitriol I'd encounter. It
        stopped being a fun place to hang out and connect with others.
      </p>
      <div className="flex justify-center">
        <Image
          alt="My First Bluesky Post"
          className="rounded-lg object-cover border border-transparent bg-gray-950"
          height={540}
          src="/images/blog/first-bluesky-post.png"
          style={{
            objectFit: "cover",
          }}
          width={800}
        />
      </div>
      <p>
        Finally, on November 8th, I took the plunge and deactivated my Twitter
        account. It felt like breaking up with a long-term partner who had
        changed beyond recognition.
      </p>
      <p>And you know what? It's been liberating.</p>
      <p>
        Bluesky feels like a breath of fresh air. It's like stepping back in
        time to when Twitter was about connection and conversation, not chaos
        and clickbait.
      </p>
      <p>Here's what I'm loving about Bluesky so far:</p>
      <ul>
        <li>
          <strong>It's more like the "old" Twitter:</strong> The interface is
          clean and familiar, and the focus is on sharing thoughts and engaging
          with others.
        </li>
        <li>
          <strong>The community is amazing:</strong> People are genuinely
          friendly and supportive, and there's a real sense of community.
        </li>
        <li>
          <strong>It's built to last:</strong> Bluesky is built on a
          decentralized protocol, which means it's not controlled by a single
          company or individual.
        </li>
        <li>
          <strong>It's constantly evolving:</strong> The developers are actively
          working to improve the platform and add new features.
        </li>
      </ul>
      <p>
        Of course, Bluesky isn't perfect. It's still a relatively small
        platform, and there are some features that are still missing. But
        overall, I'm incredibly impressed with what I've seen so far.
      </p>
      <p>
        If you're thinking about making the switch, I encourage you to give
        Bluesky a try. You might just be surprised at how much you enjoy it.
      </p>
      <p>
        P.S. If you're looking for me on Bluesky, you can find me at{" "}
        <Link
          href="https://bsky.app/profile/jayvicsanantonio.dev"
          className="hover:text-blue-400 underline decoration-wavy decoration-purple-500 underline-offset-4"
        >
          @jayvicsanantonio.dev
        </Link>
        . Come say hi!
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
