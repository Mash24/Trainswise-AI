/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'source.unsplash.com',
      'images.pexels.com',
      'cdn.pixabay.com',
      'img.freepik.com',
      'media.istockphoto.com',
      'randomuser.me',
      'upload.wikimedia.org', // For media bar logos
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: '**.freepik.com',
      },
      {
        protocol: 'https',
        hostname: '**.istockphoto.com',
      },
    ],
  },
  // ... existing config
};

module.exports = nextConfig; 