/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['s4.anilist.co'],
  },
  headers: [
    {
      key: 'x-frame-options',
      value: 'ALLOW-FROM=chrome://new-tab-page',
    },
  ],
};

module.exports = nextConfig;
