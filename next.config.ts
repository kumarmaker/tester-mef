import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.massivefoundation.org",
        pathname: "/**",
      },
      // Legacy: media URLs that still reference the apex domain resolve via
      // the Netlify /wp-content/uploads/* proxy (see public/_redirects)
      {
        protocol: "https",
        hostname: "massivefoundation.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
