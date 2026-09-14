import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Fancy Text & Symbols Generator | Creatoriva",
  description:
    "Create stylish fancy text and copy special symbols for captions, bios, posts, usernames, and profiles. Free online tool with no signup required.",
  alternates: {
    canonical: "/fancy-text",
  },
  openGraph: {
    title: "Fancy Text & Symbols Generator | Creatoriva",
    description:
      "Create stylish fancy text and copy special symbols for captions, bios, posts, usernames, and profiles.",
    type: "website",
  },
};

export default function FancyTextLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}