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
      // the /wp-content/uploads/* rewrite below
      {
        protocol: "https",
        hostname: "massivefoundation.org",
        pathname: "/**",
      },
    ],
  },
  // Platform-agnostic replacement for the old Netlify public/_redirects
  // proxy (Vercel ignores that file). Legacy WP media URLs indexed by
  // Google / linked externally keep resolving after the domain cutover.
  async rewrites() {
    return [
      {
        source: "/wp-content/uploads/:path*",
        destination: "https://cms.massivefoundation.org/wp-content/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
