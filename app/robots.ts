import type { MetadataRoute } from "next";
import { SITE_URL, IS_PREVIEW_DEPLOY } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview/test deployments (Vercel tester project): block everything.
  if (IS_PREVIEW_DEPLOY) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/wp-test", "/url-map", "/tester"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
