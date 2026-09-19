import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your Creatoriva account.",
  robots: "noindex, nofollow",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}