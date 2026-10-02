import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep next dev's generated files separate from next build's output.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  images: {
    remotePatterns: [
      {
        hostname: 'www.awxcdn.com',
      },
      {
        hostname: 'i.postimg.cc',
      },
      {
        hostname: 'fakeimg.pl',
      },
    ],
  },
};

export default nextConfig;
