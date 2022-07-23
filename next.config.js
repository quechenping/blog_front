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
      { source: "/blog/:slug", destination: `http://127.0.0.1:8000/:slug` },
    ];
  },
});
