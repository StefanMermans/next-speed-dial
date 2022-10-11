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
        source: '/',
        headers: [
          {
            key: 'x-frame-options',
            value: 'ALLOW-FROM=chrome://new-tab-page',
          },
          {
            key: 'test-header',
            value: 'Test-value',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
