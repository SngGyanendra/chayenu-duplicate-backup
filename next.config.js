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
      },
      {
        source: '/shluchim',
        destination: '/subscribe?is_shluchim_only=true',
        permanent: false,
      },
      {
        source: '/chumash',
        destination: 'chayenu-section/chumash',
        permanent: false,
      },
      {
        source: '/tehillim',
        destination: '/chayenu-section/tehillim',
        permanent: false,
      },
      {
        source: '/tanya',
        destination: '/chayenu-section/tanya',
        permanent: false,
      },
      {
        source: '/RambamTracks',
        destination: '/chayenu-section/rambam',
        permanent: false,
      },
      {
        source: '/3',
        destination: 'https://old.chayenu.org/chayenu3/',
        permanent: false,
      },
      {
        source: '/app',
        destination: 'https://old.chayenu.org/app/',
        permanent: false,
      },
      {
        source: '/the-three-tracks',
        destination: '/chayenu-section/rambam',
        permanent: false,
      },
      {
        source: '/LLY',
        destination: 'https://old.chayenu.org/LLY/',
        permanent: false,
      },
      {
        source: '/chayus-archives',
        destination: 'https://old.chayenu.org/chayus-archives/',
        permanent: false,
      },
      {
        source: '/ChofAv',
        destination: 'http://chayenu.givingfuel.com/20-av',
        permanent: false,
      },
      {
        source: '/dedicate',
        destination: 'https://chayenu.givingfuel.com/partner',
        permanent: false,
      },
      {
        source: '/partner',
        destination: 'https://chayenu.givingfuel.com/partner',
        permanent: false,
      },
      {
        source: '/3/dedicate',
        destination: 'https://chayenu.givingfuel.com/chayenu3',
        permanent: false,
      },
      {
        source: '/rambam-sefer-hamitzvos',
        destination: '/chayenu-section/sefer-hamitzvos',
        permanent: false,
      },
      {
        source: '/sefer-hamitzvos',
        destination: '/chayenu-section/sefer-hamitzvos',
        permanent: false,
      },
      {
        source: '/chumash',
        destination: '/chayenu-section/chumash',
        permanent: false,
      },
      {
        source: '/bereishis-5784',
        destination: '/uploads/bereishis-5784',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
