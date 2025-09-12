import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all hosts over https
      },
      {
        protocol: 'http',
        hostname: '**', // allow all hosts over http
      },
    ],
  }
};

export default nextConfig;
