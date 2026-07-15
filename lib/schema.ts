import { SITE_URL } from "@/lib/site";

/**
 * JSON-LD builders. Everything derives from the same data/ JSON that
 * builds the pages — db → json → html + metadata + schema in one pass.
 * Only emit facts that exist; never invent values (dates, locations)
 * that aren't in the data.
 */

export const ORG_ID = `${SITE_URL}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": ORG_ID,
    name: "Massive Earth Foundation",
    url: SITE_URL,
    logo: `${SITE_URL}/images/mef_plain_logo_horz.png`,
    description:
      "Solving Climate Change With Investments, Innovation, & Technology",
    sameAs: [
      "https://www.linkedin.com/company/massive-foundation/",
      "https://x.com/earth_massive",
      "https://www.instagram.com/massivefoundation/",
      "https://www.facebook.com/massiveearthfoundation/",
      "https://www.youtube.com/@massiveearth8804",
    ],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Massive Earth Foundation",
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(
  items: { label: string; href?: string }[]
) {
  const trail = [{ label: "Home", href: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

/** Research report pages */
export function reportSchema(opts: {
  name: string;
  description?: string;
  slug: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Report",
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    url: `${SITE_URL}/research/${opts.slug}`,
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** "5 Jun 2025" → "2025-06-05" (undefined if unparseable — never guess).
 *  Uses local date components — toISOString() would shift the day when
 *  the build machine's timezone is ahead of UTC (e.g. IST). */
export function toISODate(human?: string | null): string | undefined {
  if (!human) return undefined;
  const t = Date.parse(human);
  if (Number.isNaN(t)) return undefined;
  const d = new Date(t);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** Event pages — emits only facts present in the data */
export function eventSchema(opts: {
  name: string;
  slug: string;
  date?: string | null;
  location?: string | null;
  description?: string | null;
}) {
  const startDate = toISODate(opts.date);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: opts.name,
    url: `${SITE_URL}/events-summits/${opts.slug}`,
    ...(startDate ? { startDate } : {}),
    ...(opts.location
      ? { location: { "@type": "Place", name: opts.location } }
      : {}),
    ...(opts.description ? { description: opts.description } : {}),
    organizer: { "@id": ORG_ID },
    eventStatus: "https://schema.org/EventScheduled",
  };
}
