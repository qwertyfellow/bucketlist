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
    ]
  },
  experimental: {
    ppr: true
  }
};

export default nextConfig;
