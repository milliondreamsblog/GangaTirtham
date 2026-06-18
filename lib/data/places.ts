import "server-only";

import { isSanityConfigured } from "@/lib/env";
import { getFixtureNavigation, getFixturePlace, getFixtureSlugs } from "@/lib/fixtures";
import { STAGE_COUNT, resolveStage, stageKmBounds } from "@/lib/journey";
import { PLACE_NAV_QUERY, PLACE_QUERY, PLACE_SLUGS_QUERY } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { PlaceData, PlaceNavigation } from "@/lib/types";

const SENTINEL_KM = 1_000_000; // finite stand-in for an open-ended (stage-8) upper bound

/**
 * Place data access. Reads from Sanity when configured; otherwise serves the
 * Varanasi reference fixtures through the same shapes, so the production
 * components render before the CMS is wired. See lib/fixtures.
 */

export async function getPlace(slug: string): Promise<PlaceData | null> {
  if (!isSanityConfigured) return getFixturePlace(slug);
  return sanityFetch<PlaceData | null>({
    query: PLACE_QUERY,
    params: { slug },
    tags: ["place", `place:${slug}`],
  });
}

export async function getPlaceSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return getFixtureSlugs();
  return sanityFetch<string[]>({ query: PLACE_SLUGS_QUERY, tags: ["place"] });
}

export async function getPlaceNavigation(place: PlaceData): Promise<PlaceNavigation> {
  if (!isSanityConfigured) return getFixtureNavigation(place);

  // Resolve stage the universal way, then hand the query the km bounds it needs.
  const stage = resolveStage(place.journeyStage, place.km);
  const nextStage = stage + 1;
  const here = stageKmBounds(stage);
  const next =
    nextStage <= STAGE_COUNT
      ? stageKmBounds(nextStage)
      : { startKm: SENTINEL_KM, endKm: SENTINEL_KM };
  const fin = (x: number) => (Number.isFinite(x) ? x : SENTINEL_KM);

  return sanityFetch<PlaceNavigation>({
    query: PLACE_NAV_QUERY,
    params: {
      km: place.km,
      slug: place.slug ?? "",
      stage,
      startKm: fin(here.startKm),
      endKm: fin(here.endKm),
      nextStage,
      nextStartKm: fin(next.startKm),
      nextEndKm: fin(next.endKm),
    },
    tags: ["place"],
  });
}
