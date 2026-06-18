import type { PlaceNavRef, ReachGroup } from "@/lib/types";

import { FIXTURE_PLACES } from "./places";

/** The five reaches, source→ocean — the navigable spine of the collection. */
const REACHES: Omit<ReachGroup, "places">[] = [
  { name: { en: "The Source", hi: "उद्गम" }, slug: "source", segment: "source", order: 1, blurb: { en: "Gaumukh to the first confluence — the glacial reach." } },
  { name: { en: "The Upper Ganga", hi: "ऊपरी गंगा" }, slug: "upper", segment: "upper", order: 2, blurb: { en: "Devprayag to the plains — meltwater." } },
  { name: { en: "The Middle Ganga", hi: "मध्य गंगा" }, slug: "middle", segment: "middle", order: 3, blurb: { en: "The great plains — silt, and the largest gatherings on earth." } },
  { name: { en: "The Lower Ganga", hi: "निचली गंगा" }, slug: "lower", segment: "lower", order: 4, blurb: { en: "The working river, turning toward the delta." } },
  { name: { en: "The Delta", hi: "मुहाना" }, slug: "delta", segment: "delta", order: 5, blurb: { en: "The Sundarbans to the open sea — amber." } },
];

const toNavRef = (p: (typeof FIXTURE_PLACES)[number]): PlaceNavRef => ({
  title: p.title,
  slug: p.slug,
  km: p.km,
  reach: p.reach,
  tier: p.depthTier,
});

export function getCollectionFixture(): ReachGroup[] {
  return REACHES.map((reach) => ({
    ...reach,
    places: FIXTURE_PLACES.filter((p) => p.reach?.segment === reach.segment)
      .sort((a, b) => a.km - b.km)
      .map(toNavRef),
  }));
}
