import type { WPPost } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type Props = { post: WPPost };

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostTemplate({ post }: Props) {
  const primaryCategory = post.categories.nodes[0];

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {primaryCategory && (
        <Link
          href={`/category/${primaryCategory.slug}/`}
          className="text-sm font-semibold uppercase tracking-widest text-blue-600"
        >
          {primaryCategory.name}
        </Link>
      )}

      <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900">
        {post.title}
      </h1>

      <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
        <span>{post.author.node.name}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>

      {post.featuredImage && (
        <div className="relative mt-8 w-full aspect-video overflow-hidden rounded-lg">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="wp-content mt-10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags.nodes.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.nodes.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}/`}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
