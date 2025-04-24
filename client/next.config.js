// //next.config.ts



// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
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






















// import type { NextConfig } from "next";


// const nextConfig: NextConfig = {
//   webpack(config, { isServer }) {
//     // Custom Webpack config for handling SVG files
//     if (!isServer) {
//       config.module.rules.push({
//         test: /\.svg$/,
//         use: ['@svgr/webpack'],
//       });
//     }
//     return config;
//   },

//   async headers() {
//     return [
//       {
//         source: '/:path*',
//         headers: [
//           {
//             key: 'Referrer-Policy',
//             value: 'strict-origin-when-cross-origin', // You can change this if needed
//           },
//         ],
//       },
//     ];
//   },
  
//   // You can add other config options here if needed
// };

// export default nextConfig;
