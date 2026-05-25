const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_URL!;

export async function wpQuery<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      `GraphQL endpoint returned non-JSON (${res.status}). ` +
      `Check WP_GRAPHQL_URL="${WP_GRAPHQL_URL}" and ensure WPGraphQL is active.`
    );
  }

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}
