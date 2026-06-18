import "server-only";

import { isSanityConfigured } from "@/lib/env";
import { keepALamp } from "@/lib/fixtures/sankalp";
import { SANKALP_QUERY } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { SankalpData } from "@/lib/types";

/** The primary Sankalp campaign — content only; the transaction is M6. */
export async function getSankalp(): Promise<SankalpData | null> {
  if (!isSanityConfigured) return keepALamp;
  return sanityFetch<SankalpData | null>({ query: SANKALP_QUERY, tags: ["sankalpCampaign"] });
}
