/**
 * Renders a JSON-LD script tag. Server component — zero client JS.
 * Pass any object built by lib/schema.ts.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
