import { client } from "./client";

/**
 * Server-side fetch for content. Tag-based revalidation: a Sanity publish webhook
 * hits /api/revalidate → revalidateTag (M5). Time-based revalidate is the safety
 * net. Never call from a client component. See ARCHITECTURE.md ("Rendering map").
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate, tags },
  });
}
