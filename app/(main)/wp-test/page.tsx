import { wpQuery } from "@/lib/graphql";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WP Test",
  description: "Internal development page.",
  robots: { index: false, follow: false },
};

const HANDSHAKE_QUERY = `
  query HandshakeTest {
    generalSettings {
      title
      url
    }
    posts(first: 3) {
      nodes {
        title
        slug
        date
        categories {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

type HandshakeData = {
  generalSettings: { title: string; url: string };
  posts: {
    nodes: {
      title: string;
      slug: string;
      date: string;
      categories: { nodes: { slug: string }[] };
    }[];
  };
};

export default async function WpTestPage() {
  let data: HandshakeData | null = null;
  let error: string | null = null;

  try {
    data = await wpQuery<HandshakeData>(HANDSHAKE_QUERY);
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <main className="p-8 font-mono">
      <h1 className="text-2xl font-bold mb-6">WPGraphQL Handshake Test</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-800 p-4 rounded mb-6">
          <strong>Connection failed:</strong> {error}
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded">
            Handshake successful
          </div>

          <section>
            <h2 className="text-lg font-semibold mb-2">Site Info</h2>
            <p>Title: {data.generalSettings.title}</p>
            <p>URL: {data.generalSettings.url}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">
              Latest Posts (permalink preview)
            </h2>
            <ul className="space-y-2">
              {data.posts.nodes.map((post) => {
                const category = post.categories.nodes[0]?.slug ?? "uncategorized";
                const permalink = `/${category}/${post.slug}/`;
                return (
                  <li key={post.slug} className="border p-3 rounded">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-gray-500">
                      WP permalink: {permalink}
                    </p>
                    <p className="text-xs text-gray-400">{post.date}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}
