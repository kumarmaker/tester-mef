const WP_BASE  = process.env.NEXT_PUBLIC_WP_BASE_URL  ?? "http://localhost/mfound-local";
const WP_LIVE  = process.env.NEXT_PUBLIC_WP_LIVE_URL  ?? "";

// Strip protocol so we match both http:// and https:// variants from WPGraphQL
const BASE_BARE = WP_BASE.replace(/^https?:\/\//, "");
const LIVE_BARE = WP_LIVE.replace(/^https?:\/\//, "");

export function resolveMedia(url: string): string {
  if (!WP_LIVE || !url) return url;
  const bare = url.replace(/^https?:\/\//, "");
  if (bare.startsWith(BASE_BARE)) {
    return "https://" + bare.replace(BASE_BARE, LIVE_BARE);
  }
  return url;
}
