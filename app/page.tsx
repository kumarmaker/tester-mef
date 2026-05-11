import { notFound } from "next/navigation";
import { wpQuery } from "@/lib/graphql";
import { NODE_BY_URI_QUERY } from "@/lib/queries";
import type { WPNode } from "@/lib/types";
import PageTemplate from "@/components/templates/PageTemplate";

export default async function HomePage() {
  const data = await wpQuery<{ nodeByUri: WPNode | null }>(NODE_BY_URI_QUERY, {
    uri: "/",
  });

  const node = data.nodeByUri;
  if (!node || node.__typename !== "Page") notFound();

  return <PageTemplate page={node} />;
}
