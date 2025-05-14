import type { NextConfig } from "next";

const nextConfig = {
  transpilePackages: ['framer-motion', 'react-leaflet'],
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig;

export default nextConfig;
