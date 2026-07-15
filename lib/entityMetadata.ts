import fs from "fs";
import path from "path";
import type { Metadata } from "next";

/**
 * Build page metadata for an entity page from its data/<dir>/<slug>.json.
 * Every entity family shares the hero.name / hero.description shape.
 * Falls back gracefully so a malformed file can never break the build.
 */
export function entityMetadata(dir: string, slug: string): Metadata {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "data", dir, `${slug}.json`),
      "utf-8"
    );
    const data = JSON.parse(raw);
    const name: string | undefined = data?.hero?.name;
    const description: string | undefined = data?.hero?.description ?? undefined;
    return { title: name ?? slug, description };
  } catch {
    return { title: slug };
  }
}
