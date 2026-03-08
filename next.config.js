/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    qualities: [75, 90, 100],
  },
};

module.exports = nextConfig;
