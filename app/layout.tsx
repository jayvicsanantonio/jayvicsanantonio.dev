import type { Metadata } from "next";

import Body from "@/components/pages/Body";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayvic San Antonio | Web Developer",
  description:
    "Highly skilled senior web developer with a proven track record of delivering successful web projects. Experienced in JavaScript and passionate about building innovative solutions. Contact me to learn more about my expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Body>{children}</Body>
    </html>
  );
}
