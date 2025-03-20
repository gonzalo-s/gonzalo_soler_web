import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'www.awxcdn.com',
      },
      {
        hostname: 'i.postimg.cc',
      },
    ],
  },
};

export default nextConfig;
