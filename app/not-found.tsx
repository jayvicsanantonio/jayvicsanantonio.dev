import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="w-full m-0">
      <div className="mt-12 mx-28 text-center ">
        <Image
          src="/images/404.webp"
          alt="404"
          width={400}
          height={400}
          className="mx-auto"
        />
        <p className="text-lg my-4">
          Whoops! This page seems to have gone missing. Maybe it's out exploring
          the internet. You can try checking the address, or you can visit my
          homepage and browse around from there.
        </p>
        <Link
          href="/"
          className="hover:text-blue-400 underline decoration-wavy decoration-purple-500 underline-offset-4 text-lg"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
