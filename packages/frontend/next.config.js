/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.qlogo.cn'
      },
      {
        protocol: 'https',
        hostname: '**.multiavatar.com'
      }
    ],
    deviceSizes: [100, 500, 1100]
  }
}

module.exports = nextConfig
