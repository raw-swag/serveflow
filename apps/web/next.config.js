/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@serveflow/shared-types', '@serveflow/validation', '@serveflow/ui-kit'],
};

module.exports = nextConfig;
