import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/mfound-local/**",
      },
      {
        protocol: "https",
        hostname: "massivefoundation.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
