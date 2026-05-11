import type { WPArchive, PostCard } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type Props = { archive: WPArchive };

function PostCard({ post }: { post: PostCard }) {
  const categorySlug = post.categories.nodes[0]?.slug ?? "uncategorized";
  const href = `/${categorySlug}/${post.slug}/`;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {post.featuredImage ? (
        <div className="relative aspect-video w-full">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-gray-100" />
      )}
      <div className="flex flex-1 flex-col p-4">
        <Link href={href}>
          <h2 className="text-base font-semibold leading-snug text-gray-900 hover:underline">
            {post.title}
          </h2>
        </Link>
        <div
          className="mt-2 line-clamp-3 text-sm text-gray-500"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        <p className="mt-auto pt-3 text-xs text-gray-400">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </article>
  );
}

export default function CategoryTemplate({ archive }: Props) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          {archive.__typename === "Tag" ? "Tag" : "Category"}
        </p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">{archive.name}</h1>
        {archive.description && (
          <p className="mt-2 text-gray-500">{archive.description}</p>
        )}
      </header>

      {archive.posts.nodes.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {archive.posts.nodes.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
