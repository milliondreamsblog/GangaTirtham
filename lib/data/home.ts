import "server-only";

import type { BookData, LocaleValue, PlaceNavRef, SankalpData, WitnessData } from "@/lib/types";

import { getFeaturedBook } from "./books";
import { getCollection } from "./collection";
import { getPlace } from "./places";
import { getSankalp } from "./sankalp";

export interface HomeWitness {
  witness: WitnessData;
  placeTitle?: LocaleValue;
  placeSlug?: string;
  km: number;
}

export interface HomeData {
  book: BookData | null;
  witness: HomeWitness | null;
  descent: PlaceNavRef[];
  sankalp: SankalpData | null;
}

/**
 * Everything the homepage needs, in one parallel fetch. The §3 emotional beat
 * uses the Kashi witness temporarily (per the M4 brief) until a source-region
 * witness is consented. Price/edition come from the featured book document.
 */
export async function getHomeData(): Promise<HomeData> {
  const [book, kashi, reaches, sankalp] = await Promise.all([
    getFeaturedBook(),
    getPlace("varanasi"),
    getCollection(),
    getSankalp(),
  ]);

  const consented = kashi?.witnesses?.find(
    (w) => w.consent?.obtained && w.consent?.scope !== "withdrawn",
  );
  const witness: HomeWitness | null =
    consented && kashi
      ? { witness: consented, placeTitle: kashi.title, placeSlug: kashi.slug, km: kashi.km }
      : null;

  const descent = reaches
    .flatMap((r) => r.places)
    .sort((a, b) => (a.km ?? 0) - (b.km ?? 0));

  return { book, witness, descent, sankalp };
}
