/**
 * Canonical production origin. Used by metadataBase, sitemap, robots,
 * and anything else that must emit absolute URLs.
 *
 * Override with NEXT_PUBLIC_SITE_URL only if the canonical domain changes.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://massivefoundation.org";

/**
 * Explicit opt-in kill switch for search indexing. Production AND the
 * tester project both run on Vercel, so platform detection cannot tell
 * them apart. Instead: set NOINDEX_SITE=true in the TESTER project's
 * Vercel env (never in production). Fail-safe: forgetting the flag means
 * the tester gets indexed (minor), never production getting deindexed.
 */
export const IS_PREVIEW_DEPLOY = process.env.NOINDEX_SITE === "true";
