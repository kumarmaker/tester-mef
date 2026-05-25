export type WPPage = {
  __typename: "Page";
  title: string;
  content: string;
  databaseId: number;
  slug: string;
};

export type PostCard = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  categories: { nodes: { name: string; slug: string }[] };
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
  author?: { node: { name: string } };
};

export type WPPost = {
  __typename: "Post";
  title: string;
  content: string;
  databaseId: number;
  slug: string;
  date: string;
  excerpt: string;
  categories: { nodes: { name: string; slug: string }[] };
  tags: { nodes: { name: string; slug: string }[] };
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
  author: { node: { name: string } };
};

export type WPArchive = {
  __typename: "Category" | "Tag";
  name: string;
  slug: string;
  description?: string;
  databaseId: number;
  posts: { nodes: PostCard[] };
};

export type WPNode = WPPage | WPPost | WPArchive;
