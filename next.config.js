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
      {
        source: '/faq/:slug',
        destination: '/faq',
        permanent: false,
      },
      {
        source: '/shaimos',
        destination: 'https://old.chayenu.org/shaimos',
        permanent: false,
      },
      {
        source: '/specialorders',
        destination: 'https://www.chshippingcenter.com/chayenu/special-order-chayenu/',
        permanent: false,
      }, 
      {
        source: '/chayus',
        destination: 'https://old.chayenu.org/weekly-digest',
        permanent: false,
      },
      {
        source: '/schools',
        destination: 'https://www.chshippingcenter.com/chayenu/schools/',
        permanent: false,
      },
      {
        source: '/camps',
        destination: 'https://www.chshippingcenter.com/chayenu/camps/',
        permanent: false,
      },
      {
        source:'/weekly-digest',
        destination: 'https://old.chayenu.org/weekly-digest',
        permanent: false,
      }
    ];
  },
};

module.exports = nextConfig;
