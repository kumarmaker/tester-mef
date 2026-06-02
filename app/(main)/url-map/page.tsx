import Link from "next/link";
import { wpQuery } from "@/lib/graphql";

const SITEMAP_QUERY = `
  query SiteMap {
    pages(first: 100, where: { status: PUBLISH }) {
      nodes { title uri }
    }
    posts(first: 100, where: { status: PUBLISH }) {
      nodes {
        title
        uri
        categories { nodes { name slug } }
      }
    }
    categories(first: 50, where: { hideEmpty: true }) {
      nodes { name slug uri count }
    }
  }
`;

type PageNode = { title: string; uri: string };
type PostNode = { title: string; uri: string; categories: { nodes: { name: string; slug: string }[] } };
type CategoryNode = { name: string; slug: string; uri: string; count: number };

type SiteMapData = {
  pages: { nodes: PageNode[] };
  posts: { nodes: PostNode[] };
  categories: { nodes: CategoryNode[] };
};

// Pages that belong to a named section
const SECTION_MAP: Record<string, string[]> = {
  "Core": ["/", "/blogs-articles/", "/deep-dive/", "/events/", "/projects/", "/innovations/", "/fellowship/", "/what-we-do/", "/engage-with-us/"],
  "Projects": ["/livable-cities/", "/human-animal-conflict/", "/nature-restoration/", "/education/", "/city-waste-projects/", "/air-pollution/", "/heat-island-effect/", "/walkability-index/"],
  "Events": ["/climate-thursday/", "/climate-thursday-mixer/", "/about-5th-apcap-joint-forum/", "/massive-earth-summit-apac-edition/", "/world-environment-day-summit/", "/national-workshop-unlocking-finance/"],
  "SAFFAL Program": ["/saffal/", "/saffal-demo/", "/saffal-contact/", "/saffal-wb/", "/saffal-lka/", "/saffal-np/", "/saffal-tn/", "/saffal-bh/", "/saffal-hi/"],
  "Reports": ["/climate-101-state-of-ev-charging/", "/state-of-ev-charging-2/", "/state-of-ev-charging-3/", "/state-of-ev-charging-report/", "/help-delhi-breathe-cleaner-air/", "/what-is-choking-delhis-air/"],
  "Careers": ["/careers/", "/careers/open-positions/", "/careers/program-community-manager/"],
  "Utility": ["/privacy-policy/", "/terms-conditions/", "/community-confirmation/", "/influencer-registration/", "/researcher-registration/", "/svs/", "/test/"],
};

export default async function UrlMapPage() {
  const data = await wpQuery<SiteMapData>(SITEMAP_QUERY);

  const { pages, posts, categories } = data;

  // Group posts by category
  const postsByCategory: Record<string, PostNode[]> = {};
  for (const post of posts.nodes) {
    const cat = post.categories.nodes[0]?.slug ?? "uncategorized";
    if (!postsByCategory[cat]) postsByCategory[cat] = [];
    postsByCategory[cat].push(post);
  }

  // Build a uri→title lookup for pages
  const pageMap: Record<string, string> = {};
  for (const p of pages.nodes) pageMap[p.uri] = p.title;

  const totalUrls = pages.nodes.length + posts.nodes.length + categories.nodes.length;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500 mb-3"
            style={{ fontFamily: "var(--font-oswald)" }}>
            Site Architecture
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold uppercase text-white mb-4"
            style={{ fontFamily: "var(--font-oswald)" }}>
            URL Map
          </h1>
          <p className="text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>
            {totalUrls} URLs indexed across {categories.nodes.length} blog categories,{" "}
            {pages.nodes.length} pages, and {posts.nodes.length} posts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Col 1+2 — Pages by section */}
          <div className="lg:col-span-2 space-y-8">
            <SectionHeading>Static Pages</SectionHeading>

            {Object.entries(SECTION_MAP).map(([section, uris]) => {
              const sectionPages = uris
                .map((uri) => ({ uri, title: pageMap[uri] ?? uri }))
                .filter((p) => p.title);
              if (!sectionPages.length) return null;
              return (
                <div key={section}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3"
                    style={{ fontFamily: "var(--font-oswald)" }}>
                    {section}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {sectionPages.map((p) => (
                      <UrlRow key={p.uri} uri={p.uri} title={p.title} />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Any pages not in SECTION_MAP */}
            {(() => {
              const mapped = new Set(Object.values(SECTION_MAP).flat());
              const rest = pages.nodes.filter((p) => !mapped.has(p.uri));
              if (!rest.length) return null;
              return (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3"
                    style={{ fontFamily: "var(--font-oswald)" }}>
                    Other Pages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {rest.map((p) => <UrlRow key={p.uri} uri={p.uri} title={p.title} />)}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Col 3 — Blog categories summary */}
          <div className="space-y-8">
            <SectionHeading>Blog Categories</SectionHeading>
            <div className="space-y-2">
              {categories.nodes
                .sort((a, b) => b.count - a.count)
                .map((cat) => (
                  <Link
                    key={cat.slug}
                    href={cat.uri}
                    className="flex items-center justify-between px-4 py-3 rounded bg-gray-900 hover:bg-gray-800 transition-colors group"
                  >
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors capitalize"
                      style={{ fontFamily: "var(--font-inter)" }}>
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-500 tabular-nums">{cat.count} posts</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Blog posts by category */}
        <div className="mt-16 space-y-10">
          <SectionHeading>Blog Posts · {posts.nodes.length} total</SectionHeading>

          {categories.nodes
            .sort((a, b) => b.count - a.count)
            .map((cat) => {
              const catPosts = postsByCategory[cat.slug] ?? [];
              if (!catPosts.length) return null;
              return (
                <div key={cat.slug}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3 flex items-center gap-3"
                    style={{ fontFamily: "var(--font-oswald)" }}>
                    <Link href={cat.uri} className="hover:text-red-400 transition-colors">
                      {cat.name}
                    </Link>
                    <span className="text-gray-600 font-normal normal-case tracking-normal">
                      {catPosts.length} posts
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                    {catPosts.map((p) => (
                      <UrlRow key={p.uri} uri={p.uri} title={p.title} />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold uppercase text-white border-b border-gray-800 pb-3"
      style={{ fontFamily: "var(--font-oswald)" }}>
      {children}
    </h2>
  );
}

function UrlRow({ uri, title }: { uri: string; title: string }) {
  return (
    <Link
      href={uri}
      className="flex items-start gap-2 px-3 py-2 rounded hover:bg-gray-900 transition-colors group"
    >
      <span className="text-gray-600 text-xs mt-0.5 shrink-0 font-mono">↗</span>
      <div className="min-w-0">
        <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate"
          style={{ fontFamily: "var(--font-inter)" }}>
          {title}
        </p>
        <p className="text-xs text-gray-600 font-mono truncate">{uri}</p>
      </div>
    </Link>
  );
}
