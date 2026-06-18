import { resolveStage } from "@/lib/journey";
import type { PlaceData, PlaceNavigation, PlaceNavRef } from "@/lib/types";

import { FIXTURE_PLACES } from "./places";

/** Offline reference data — used only when Sanity is not configured. */

const toNavRef = (p: PlaceData): PlaceNavRef => ({
  title: p.title,
  slug: p.slug,
  km: p.km,
  reach: p.reach,
  tier: p.depthTier,
  journeyStage: p.journeyStage,
});

export function getFixturePlace(slug: string): PlaceData | null {
  return FIXTURE_PLACES.find((p) => p.slug === slug) ?? null;
}

export function getFixtureSlugs(): string[] {
  return FIXTURE_PLACES.map((p) => p.slug).filter((s): s is string => Boolean(s));
}

export function getFixtureNavigation(place: PlaceData): PlaceNavigation {
  const sorted = [...FIXTURE_PLACES].sort((a, b) => a.km - b.km);
  const below = sorted.filter((p) => p.km < place.km);
  const above = sorted.filter((p) => p.km > place.km);
  const prev = below.length ? below[below.length - 1] : null;
  const next = above.length ? above[0] : null;

  // Narrative rails — resolved the universal way (journeyStage ?? kmToStage),
  // mirroring PLACE_NAV_QUERY. sameStage pulls inbound split places (secondary).
  const stage = resolveStage(place.journeyStage, place.km);
  const sameStage = sorted.filter(
    (p) =>
      p.slug !== place.slug &&
      (resolveStage(p.journeyStage, p.km) === stage || p.journeyStageSecondary === stage),
  );
  const nextStage = sorted.filter(
    (p) => p.slug !== place.slug && resolveStage(p.journeyStage, p.km) === stage + 1,
  );

  return {
    prev: prev ? toNavRef(prev) : null,
    next: next ? toNavRef(next) : null,
    sameStage: sameStage.slice(0, 6).map(toNavRef),
    nextStage: nextStage.slice(0, 4).map(toNavRef),
  };
}
