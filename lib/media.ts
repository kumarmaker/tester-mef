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

// Rewrite absolute WP links in content HTML to root-relative paths so readers
// stay on this site (the catch-all route serves every WP URL). Matches href
// only — img/src URLs keep pointing at the CMS, where the files live.
const LINK_HOSTS = [WP_BASE, "https://massivefoundation.org"];

export function resolveContentLinks(html: string): string {
  if (!html) return html;
  return LINK_HOSTS.reduce((out, host) => {
    const escaped = host.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return out
      .replace(new RegExp(`href="${escaped}"`, "g"), `href="/"`)
      .replace(new RegExp(`href="${escaped}/`, "g"), `href="/`);
  }, html);
}
