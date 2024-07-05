module.exports = {
  output: 'export',
  distDir: 'dist',
  poweredByHeader: false, 
  reactStrictMode: true,
  images: {
    domains: [],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};