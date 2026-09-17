import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tiktok-checker",
        destination: "/",
        permanent: true,
      },
      {
        source: "/youtube-checker",
        destination: "/",
        permanent: true,
      },
      {
        source: "/instagram-checker",
        destination: "/",
        permanent: true,
      },
      {
        source: "/facebook-checker",
        destination: "/",
        permanent: true,
      },
      {
        source: "/x-checker",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;