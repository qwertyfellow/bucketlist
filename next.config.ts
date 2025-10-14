import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "*",
      },
    ],
    unoptimized: true
  },
  experimental: {
    ppr: 'incremental',
    serverActions: {
      bodySizeLimit: "30MB"
    }
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
