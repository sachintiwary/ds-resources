import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["prisma", "@prisma/client"],
  },
};

export default nextConfig;
