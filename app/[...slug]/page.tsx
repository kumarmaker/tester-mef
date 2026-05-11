import { notFound } from "next/navigation";
import { wpQuery } from "@/lib/graphql";
import { NODE_BY_URI_QUERY } from "@/lib/queries";
import type { WPNode } from "@/lib/types";
import PageTemplate from "@/components/templates/PageTemplate";
import PostTemplate from "@/components/templates/PostTemplate";
import CategoryTemplate from "@/components/templates/CategoryTemplate";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const uri = `/${slug.join("/")}/`;

  const data = await wpQuery<{ nodeByUri: WPNode | null }>(NODE_BY_URI_QUERY, {
    uri,
  });

  const node = data.nodeByUri;
  if (!node) notFound();

  switch (node.__typename) {
    case "Page":
      return <PageTemplate page={node} />;
    case "Post":
      return <PostTemplate post={node} />;
    case "Category":
    case "Tag":
      return <CategoryTemplate archive={node} />;
    default:
      notFound();
  }
}
