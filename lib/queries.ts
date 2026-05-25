export const RELATED_POSTS_QUERY = `
  query RelatedPosts($categoryName: String!, $notIn: [ID]) {
    posts(first: 3, where: { categoryName: $categoryName, notIn: $notIn, status: PUBLISH }) {
      nodes {
        title
        slug
        excerpt
        date
        categories { nodes { name slug } }
        featuredImage { node { sourceUrl altText } }
        author { node { name } }
      }
    }
  }
`;

export const BLOG_LISTING_QUERY = `
  query BlogListing($first: Int!, $after: String, $search: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH, search: $search }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        slug
        excerpt
        date
        featuredImage { node { sourceUrl altText } }
        categories { nodes { name slug } }
        author { node { name } }
      }
    }
  }
`;

export const NODE_BY_URI_QUERY = `
  query NodeByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Page {
        title
        content
        databaseId
        slug
      }
      ... on Post {
        title
        content
        databaseId
        slug
        date
        excerpt
        categories { nodes { name slug } }
        tags { nodes { name slug } }
        featuredImage { node { sourceUrl altText } }
        author { node { name } }
      }
      ... on Category {
        name
        slug
        description
        databaseId
        posts(first: 12) {
          nodes {
            title
            slug
            excerpt
            date
            categories { nodes { name slug } }
            featuredImage { node { sourceUrl altText } }
          }
        }
      }
      ... on Tag {
        name
        slug
        databaseId
        posts(first: 12) {
          nodes {
            title
            slug
            excerpt
            date
            categories { nodes { name slug } }
            featuredImage { node { sourceUrl altText } }
          }
        }
      }
    }
  }
`;
