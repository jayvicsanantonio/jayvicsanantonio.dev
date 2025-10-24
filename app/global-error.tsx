"use client";

import NextError from "next/error";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  // Optionally log to console or a custom logger if desired
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return (
    <html lang="en">
      <body>
        {/* `NextError` is the default Next.js error page component. Its type definition requires a `statusCode` prop.
            The App Router doesn't expose status codes for errors, so we pass 0 to render a generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
