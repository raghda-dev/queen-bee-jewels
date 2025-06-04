
/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< Updated upstream
  images: {
    domains: ['cdn.shopify.com'],
  },

=======
    images: {
    domains: ['cdn.shopify.com'],
  },
>>>>>>> Stashed changes
  webpack(config, { isServer }) {
    if (!isServer) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
    }
    return config;
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
