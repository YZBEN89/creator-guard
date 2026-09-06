import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CreatorGuard | Content Safety & Optimization Tools",
    template: "%s | CreatorGuard",
  },

  description:
    "Review social media captions, scripts, titles, and promotional content for potentially sensitive language and content-related risks before publishing.",

  applicationName: "CreatorGuard",

  keywords: [
    "content checker",
    "content safety",
    "social media content checker",
    "TikTok content checker",
    "YouTube content checker",
    "Instagram content checker",
    "script analyzer",
    "content optimization",
  ],

  authors: [
    {
      name: "CreatorGuard",
    },
  ],

  creator: "CreatorGuard",

  publisher: "CreatorGuard",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "CreatorGuard | Content Safety & Optimization Tools",
    description:
      "Review captions, scripts, titles, and promotional content before publishing.",
    siteName: "CreatorGuard",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "CreatorGuard | Content Safety & Optimization Tools",
    description:
      "Review captions, scripts, titles, and promotional content before publishing.",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}