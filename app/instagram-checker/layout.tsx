import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Content Checker",
  description:
    "Review Instagram captions, bios, posts, and promotional content for potentially sensitive language, risky claims, and content-related concerns before publishing.",
};

export default function InstagramCheckerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}