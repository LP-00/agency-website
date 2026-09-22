import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 768, 1440],
    imageSizes: [96, 192],
  },
  poweredByHeader: false,
  devIndicators: false,
};

export default nextConfig;
