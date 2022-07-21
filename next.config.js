/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  httpAgentOptions: {
    keepAlive: false,
  },
};

module.exports = nextConfig;
