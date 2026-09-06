import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Script Analyzer",
  description:
    "Review video scripts, hooks, voice-over drafts, and long-form spoken content for potentially sensitive language, risky claims, and content-related concerns before publishing.",
};

export default function ScriptAnalyzerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}