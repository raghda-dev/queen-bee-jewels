//next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // You can change this if needed
          },
        ],
      },
    ];
  },
  // Add other config options here if needed
};

export default nextConfig;
