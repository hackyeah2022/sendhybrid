/** @type {import('next').NextConfig} */
console.log(process.env.API_URL_TO_REWRITE);
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  rewrites: () =>
    process.env.API_URL_TO_REWRITE
      ? [
          {
            source: '/api/:path*',
            destination: `${process.env.API_URL_TO_REWRITE}/:path*`,
          },
        ]
      : [],
};

module.exports = nextConfig;
