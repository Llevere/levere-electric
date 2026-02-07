import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lsx1noiu2kmtzxqs.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
