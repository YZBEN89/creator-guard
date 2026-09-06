import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TikTok Risk Checker",
  description:
    "Review TikTok captions, scripts, and posts for potentially sensitive language, risky claims, and content patterns before publishing.",
};

export default function TikTokCheckerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}