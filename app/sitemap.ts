import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap is generated at build time from the same data/ JSON that
 * builds the pages — db → json → html + sitemap in one pass.
 *
 * Excluded on purpose: /wp-test, /url-map, /tester (dev pages, also
 * disallowed in robots), /api/*, and WP-driven blog posts ([...slug])
 * which are enumerated by the CMS, not by this repo.
 */

const STATIC_ROUTES = [
  "",
  "/get-involved",
  "/get-involved/for-students",
  "/programmes",
  "/research",
  "/research/bess-sector-report",
  "/sectors",
  "/partners",
  "/policy",
  "/events",
  "/events-summits",
  "/innovations",
  "/education",
  "/donate",
  "/blogs-articles",
  "/livable-cities",
  "/nature-restoration",
  "/human-animal-conflict",
  "/projects/agriguru",
  "/projects/mvtfd",
];

/** data/<dir> JSON files → /<urlBase>/<slug> entries */
const SLUG_FAMILIES: { dir: string; urlBase: string }[] = [
  { dir: "programmes", urlBase: "/programmes" },
  { dir: "research", urlBase: "/research" },
  { dir: "sectors", urlBase: "/sectors" },
  { dir: "partners", urlBase: "/partners" },
  { dir: "policy", urlBase: "/policy" },
  { dir: "events", urlBase: "/events-summits" },
];

function slugsFor(dir: string): string[] {
  const full = path.join(process.cwd(), "data", dir);
  try {
    return fs
      .readdirSync(full)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const slugEntries: MetadataRoute.Sitemap = SLUG_FAMILIES.flatMap(
    ({ dir, urlBase }) =>
      slugsFor(dir)
        .map((slug) => ({
          url: `${SITE_URL}${urlBase}/${slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }))
        // research/bess-sector-report is already in STATIC_ROUTES; avoid dupes
        .filter((e) => !staticEntries.some((s) => s.url === e.url))
  );

  return [...staticEntries, ...slugEntries];
}
