import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="m-0 w-full">
      <div className="mt-8 text-center sm:-mt-20 lg:mx-28 lg:mt-12">
        <Image src="/images/404.webp" alt="404" width={400} height={400} className="mx-auto" />
        <p className="my-4 text-sm lg:text-lg">
          Whoops! This page seems to have gone missing. Maybe it's out exploring the internet. You
          can try checking the address, or you can visit my homepage and browse around from there.
        </p>
        <Link
          href="/"
          className="text-sm underline decoration-purple-500 decoration-wavy underline-offset-4 hover:text-blue-400 lg:text-lg"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
