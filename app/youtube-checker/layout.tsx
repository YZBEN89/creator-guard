import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Monetization Checker",
  description:
    "Review YouTube titles, descriptions, scripts, and promotional content for potentially sensitive language, risky claims, and monetization-related concerns before publishing.",
};

export default function YouTubeCheckerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}