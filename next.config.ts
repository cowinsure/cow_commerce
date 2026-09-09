import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'dev-backend.insurecow.com',
      },
      {
        protocol: 'https',
        hostname: "amzn-s3-agricore-master.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
