/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['s4.anilist.co'],
  },
  async headers() {
    return [
      {
        key: 'X-Frame-Options',
        value: 'ALLOW-FROM=chrome://new-tab-page',
      },
    ];
  },
};

module.exports = nextConfig;
