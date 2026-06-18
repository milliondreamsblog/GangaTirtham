/**
 * Renders one or more JSON-LD graphs as a script tag. Server component; the JSON
 * is built in lib/jsonld.ts and validated against schema.org types in CI (M7).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const graphs = Array.isArray(data) ? data : [data];
  return (
    <>
      {graphs.map((graph, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}
