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
    default: "Creatoriva | Content Checker & Creator Tools",
    template: "%s | Creatoriva",
  },

  description:
    "Review social media captions, scripts, titles, and promotional content for potential content risks, sensitive language, and platform-related concerns before publishing.",

  applicationName: "Creatoriva",

  keywords: [
    "content checker",
    "content safety",
    "social media content checker",
    "content analysis",
    "content risk checker",
    "TikTok content checker",
    "YouTube content checker",
    "Instagram content checker",
    "Facebook content checker",
    "X content checker",
    "script analyzer",
    "promotional content checker",
    "content optimization",
    "creator tools",
  ],

  authors: [
    {
      name: "Creatoriva",
    },
  ],

  creator: "Creatoriva",

  publisher: "Creatoriva",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Creatoriva | Content Checker & Creator Tools",
    description:
      "Review captions, scripts, titles, and promotional content for potential content risks before publishing.",
    siteName: "Creatoriva",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Creatoriva | Content Checker & Creator Tools",
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