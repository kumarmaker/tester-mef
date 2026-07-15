import { wpQuery } from "@/lib/graphql";
import { BLOG_LISTING_QUERY } from "@/lib/queries";
import InfinitePostsGrid from "@/components/InfinitePostsGrid";
import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles & Essays",
  description: "Articles, essays, and insights on climate change and the technology that solves it.",
};

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
  categories: { nodes: { name: string; slug: string }[] };
  author: { node: { name: string } };
};

type BlogData = {
  posts: {
    pageInfo: { hasNextPage: boolean; endCursor: string };
    nodes: Post[];
  };
};

export default async function BlogsArticlesPage() {
  const data = await wpQuery<BlogData>(BLOG_LISTING_QUERY, { first: 12, after: null });
  const { nodes: posts, pageInfo } = data.posts;

  return (
    <div className="bg-white min-h-screen">

      {/* Banner */}
      <section
        className="relative flex items-center justify-center min-h-[50vh]"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, #0d1b3e 0%, #050d1a 60%, #000 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        {/* Text */}
        <div className="relative z-10 text-center px-4 sm:px-6 py-20">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase text-white leading-tight"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Articles &amp; Essays
          </h1>
          <p
            className="mt-5 mx-auto max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Compilation of news, insights, articles, essays, and opinions on
            everything related to climate change and the technology which solves it.
          </p>
        </div>
      </section>

      {/* Posts — infinite scroll */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <InfinitePostsGrid
          initialPosts={posts}
          initialCursor={pageInfo.endCursor ?? null}
          hasNextPage={pageInfo.hasNextPage}
        />
      </section>

    </div>
  );
}
