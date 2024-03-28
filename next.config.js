module.exports = {
  async rewrites() {
    return [
      {
        source: "/profile/:userName",
        destination: "/membership/profile/:userName",
      },
      {
        source: "/login",
        destination: "/membership/login",
      },
      {
        source: "/logout",
        destination: "/membership/logout",
      }
    ];
  },
  poweredByHeader: false, 
  reactStrictMode: true,
  images: {
    domains: [],
  }
};