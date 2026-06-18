import "server-only";

import { isSanityConfigured } from "@/lib/env";
import { getCollectionFixture } from "@/lib/fixtures/collection";
import { COLLECTION_QUERY } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { ReachGroup } from "@/lib/types";

/** The source→ocean spine: reaches with their places, ordered by km. */
export async function getCollection(): Promise<ReachGroup[]> {
  if (!isSanityConfigured) return getCollectionFixture();
  return sanityFetch<ReachGroup[]>({ query: COLLECTION_QUERY, tags: ["place", "reach"] });
}
