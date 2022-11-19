/** @type {import('next').NextConfig} */
console.log(process.env.API_URL_TO_REWRITE)
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  rewrites: () => process.env.API_URL_TO_REWRITE ? [
    {
      source: '/api/:path*',
      destination: `${process.env.API_URL_TO_REWRITE}/:path*`
    }
  ] : []
};

module.exports = nextConfig;
