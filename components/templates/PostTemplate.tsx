import type { WPPost, PostCard } from "@/lib/types";
import { resolveMedia } from "@/lib/media";
import { wpQuery } from "@/lib/graphql";
import { RELATED_POSTS_QUERY } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";

type Props = { post: WPPost };

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export default async function PostTemplate({ post }: Props) {
  const primaryCategory = post.categories.nodes[0];

  // Fetch 3 related posts from same category, excluding this post
  let relatedPosts: PostCard[] = [];
  if (primaryCategory) {
    const related = await wpQuery<{ posts: { nodes: PostCard[] } }>(
      RELATED_POSTS_QUERY,
      { categoryName: primaryCategory.slug, notIn: [post.databaseId] }
    );
    relatedPosts = related.posts.nodes;
  }
  const canonicalUrl = primaryCategory
    ? `https://massivefoundation.org/${primaryCategory.slug}/${post.slug}/`
    : `https://massivefoundation.org/${post.slug}/`;

  return (
    <>
    <article className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

        {/* Row 1 — Three dots + rule */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#e50000]" />
            <span className="w-3 h-3 rounded-full bg-[#e50000]" />
            <span className="w-3 h-3 rounded-full bg-[#e50000]" />
          </div>
          <hr className="flex-1 border-t border-gray-900/20" />
        </div>

        {/* Row 2 — Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {post.title}
        </h1>

        {/* Row 3 — Date/Author + Share buttons */}
        <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
          <p
            className="text-sm text-gray-500"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="mx-2 text-gray-300">|</span>
            <span>{post.author.node.name}</span>
          </p>

          <ShareButtons url={canonicalUrl} title={post.title} />
        </div>

        {/* Row 4 — Featured image */}
        {post.featuredImage && (
          <div className="relative mt-8 w-full aspect-video overflow-hidden">
            <Image
              src={resolveMedia(post.featuredImage.node.sourceUrl)}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article content */}
        <div
          className="wp-content mt-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />


      </div>
    </article>

    {/* Read More */}
    {relatedPosts.length > 0 && (
      <section className="border-t border-gray-100 bg-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Section header */}
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold uppercase text-gray-900"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Read More
            </h2>
            {primaryCategory && (
              <Link
                href={`/category/${primaryCategory.slug}/`}
                className="text-sm font-semibold uppercase tracking-widest text-gray-900 border border-gray-900 px-5 py-2 hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                View More →
              </Link>
            )}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((related) => {
              const cat = related.categories.nodes[0];
              const href = cat ? `/${cat.slug}/${related.slug}/` : `/${related.slug}/`;
              return (
                <Link key={related.slug} href={href} className="group flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-gray-100 mb-3">
                    {related.featuredImage ? (
                      <Image
                        src={resolveMedia(related.featuredImage.node.sourceUrl)}
                        alt={related.featuredImage.node.altText || related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {related.title}
                  </h3>

                  {/* Author | Date */}
                  <p
                    className="mt-1.5 text-xs text-gray-500"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {related.author?.node?.name}
                    <span className="mx-1.5 text-gray-300">|</span>
                    {new Date(related.date).toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric",
                    })}
                  </p>

                  {/* Excerpt */}
                  <div
                    className="mt-2 text-sm text-gray-500 line-clamp-3 leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}
                    dangerouslySetInnerHTML={{ __html: related.excerpt }}
                  />
                </Link>
              );
            })}
          </div>

        </div>
      </section>
    )}
    </>
  );
}
