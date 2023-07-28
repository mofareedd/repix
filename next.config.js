/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["uploadthing.com", "replicate.delivery"],
  },
};

module.exports = nextConfig;
