import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'www.awxcdn.com',
      },
    ],
  },
};

export default nextConfig;
