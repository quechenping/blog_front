const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  distDir: "dist",
  eslint: {
    dirs: ["src"],
  },
  async rewrites() {
    return [
      { source: "/blog/:slug", destination: `${process.env.API_HOST}/:slug` },
    ];
  },
});
