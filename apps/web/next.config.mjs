/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@an-nhien/shared"],
  images: {
    unoptimized: true
  }
};

export default nextConfig;

