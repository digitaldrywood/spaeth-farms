import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/spaeth-farms',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
