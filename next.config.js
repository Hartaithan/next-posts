/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.imgur.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
