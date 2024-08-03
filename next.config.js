/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: `/api/naver/:path*`,
  //       destination: "https://openapi.naver.com/:path*",
  //     },
  //   ];
  // },
  images: {
    domains: ["s3.ap-northeast-2.amazonaws.com"],
  },
};
module.exports = withPWA(nextConfig);
