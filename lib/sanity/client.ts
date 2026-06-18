import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/lib/env";

/**
 * The read client for content (place/essay/book/collection/FACE/home).
 * Rendering is SSG + ISR: `useCdn: false` so server fetches can be tagged and
 * revalidated via the Sanity publish webhook (`revalidateTag`). See ARCHITECTURE.md.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
