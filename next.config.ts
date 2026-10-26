import type { NextConfig } from "next";

// The site is fully static, so export plain HTML to out/ for any static host.
// Static export has no image-optimization server, so images are served as-is.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
