import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://106.52.62.34:3000/api/:path*", // 你的原始后端
      },
    ];
  },
};

export default nextConfig;
