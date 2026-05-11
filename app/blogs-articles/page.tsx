import { wpQuery } from "@/lib/graphql";
import { BLOG_LISTING_QUERY } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

const PER_PAGE = 12;

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

type Props = {
  searchParams: Promise<{ after?: string }>;
};

export default async function BlogsArticlesPage({ searchParams }: Props) {
  const { after } = await searchParams;

  const data = await wpQuery<BlogData>(BLOG_LISTING_QUERY, {
    first: PER_PAGE,
    after: after ?? null,
  });

  const { nodes: posts, pageInfo } = data.posts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Blogs &amp; Articles</h1>
        <p className="mt-2 text-gray-500">
          Latest updates, stories and insights from Massive Earth Foundation
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const category = post.categories.nodes[0];
          const href = `/${category?.slug ?? "uncategorized"}/${post.slug}/`;

          return (
            <article
              key={post.slug}
              className="flex flex-col rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {post.featuredImage ? (
                <div className="relative aspect-video w-full">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-gray-100" />
              )}

              <div className="flex flex-col flex-1 p-5">
                {category && (
                  <Link
                    href={`/category/${category.slug}/`}
                    className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2"
                  >
                    {category.name}
                  </Link>
                )}

                <Link href={href}>
                  <h2 className="text-base font-bold text-gray-900 leading-snug hover:text-emerald-700 transition-colors">
                    {post.title}
                  </h2>
                </Link>

                <div
                  className="mt-2 text-sm text-gray-500 line-clamp-3 flex-1"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />

                <div className="mt-4 flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3">
                  <span>{post.author.node.name}</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {pageInfo.hasNextPage && (
        <div className="mt-12 text-center">
          <Link
            href={`/blogs-articles?after=${pageInfo.endCursor}`}
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Load more →
          </Link>
        </div>
      )}
    </div>
  );
}
