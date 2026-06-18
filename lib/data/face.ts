import "server-only";

import { isSanityConfigured } from "@/lib/env";
import { FIXTURE_FACE } from "@/lib/fixtures/face";
import { WING_TO_TYPE } from "@/lib/face";
import { FACE_ENTITY_QUERY, FACE_LIST_QUERY, FACE_SLUGS_QUERY } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { FaceEntityData, FaceListItem, FaceWing } from "@/lib/types";

const toListItem = (e: FaceEntityData): FaceListItem => ({
  _type: e._type,
  wing: e.wing,
  title: e.title,
  slug: e.slug,
  summary: e.summary,
  register: e.register,
  journeyStage: e.journeyStage, // carry explicit stage so the obituary stays Stage VII
  heroImage: e.heroImage,
  km: e.km,
});

export async function getFaceEntities(): Promise<FaceListItem[]> {
  if (!isSanityConfigured) return FIXTURE_FACE.map(toListItem);
  return sanityFetch<FaceListItem[]>({
    query: FACE_LIST_QUERY,
    tags: ["festival", "art", "craft", "environmentalIssue"],
  });
}

export async function getFaceEntity(wing: FaceWing, slug: string): Promise<FaceEntityData | null> {
  if (!isSanityConfigured) {
    return FIXTURE_FACE.find((e) => e.wing === wing && e.slug === slug) ?? null;
  }
  return sanityFetch<FaceEntityData | null>({
    query: FACE_ENTITY_QUERY,
    params: { type: WING_TO_TYPE[wing], slug },
    tags: [WING_TO_TYPE[wing], `face:${slug}`],
  });
}

export async function getFaceSlugs(): Promise<{ wing: FaceWing; slug: string }[]> {
  if (!isSanityConfigured) {
    return FIXTURE_FACE.filter((e) => e.slug).map((e) => ({ wing: e.wing, slug: e.slug as string }));
  }
  return sanityFetch<{ wing: FaceWing; slug: string }[]>({
    query: FACE_SLUGS_QUERY,
    tags: ["festival", "art", "craft", "environmentalIssue"],
  });
}
