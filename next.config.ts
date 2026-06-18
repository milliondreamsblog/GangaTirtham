import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // RSC by default (App Router). Content is SSG + ISR; the Studio route is dynamic.
  reactStrictMode: true,
  images: {
    // Sanity image CDN serves AVIF/WebP via auto=format; the custom loader hands
    // it transform params directly (no double-optimization). See lib/sanity/imageLoader.
    loader: "custom",
    loaderFile: "./lib/sanity/imageLoader.ts",
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // The embedded Studio bundles `sanity` (large). Keep it out of the RSC server graph.
  experimental: {
    // next-sanity ships ESM; ensure styled-components transpiles cleanly for the Studio.
  },
  typescript: {
    // Type errors must block the build. (We typecheck in CI too.)
    ignoreBuildErrors: false,
  },
  eslint: {
    // ESLint is not wired in M0; do not block the build on it.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
