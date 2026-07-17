import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow JSX in .jsx files within components/sections (copied from Vite project)
  // These are Client Components and work as-is
  
  // Allow external image hosts used in blog/job pages
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "binjwaitsolutions.com" },
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "dh8ut0pnb37w5.cloudfront.net" },
    ],
  },

  typescript: {
    // Allow build to complete while JSX files are being progressively migrated
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
