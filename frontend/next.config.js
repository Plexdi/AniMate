/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hips.hearstapps.com'
      },
      {
        protocol: 'https',
        hostname: 'c4.wallpaperflare.com'
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com'
      }
    ]
  },
}

module.exports = nextConfig