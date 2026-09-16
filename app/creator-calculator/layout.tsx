import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Creator Calculator – Engagement, RPM, CPM & Growth Calculator | Creatoriva",
  description:
    "Calculate creator metrics including engagement rate, CTR, watch time, RPM, CPM, estimated revenue, and follower growth with Creatoriva's free creator calculator.",
  alternates: {
    canonical: "/creator-calculator",
  },
};

export default function CreatorCalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}