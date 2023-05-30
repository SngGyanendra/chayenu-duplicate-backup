/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'components'),
    ],
  },
  images: {
    domains: ['localhost'],
  },
  async redirects() {
    return [
      {
        source: '/military',
        destination: '/subscribe?is_military_only=true',
        permanent: false,
      },
      {
        source: '/product-category/military',
        destination: '/subscribe?is_military_only=true',
        permanent: false,
      },
      {
        source: '/student',
        destination: '/subscribe?student_only=true',
        permanent: false,
      },
      {
        source: '/product-tag/student',
        destination: '/subscribe?student_only=true',
        permanent: false,
      },
      {
        source: '/product/:slug',
        destination: '/subscribe',
        permanent: false,
      },
      {
        source: '/product-category/:slug',
        destination: '/subscribe',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
