"use client";

import NextError from "next/error";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }

  return (
    <html lang="en">
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
