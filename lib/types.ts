import type { PortableTextBlock } from "@portabletext/types";

import type { LocaleValue } from "@/lib/i18n";

/** The projected shapes returned by the GROQ queries in lib/queries.ts. */

export type { LocaleValue };

export type LocalePortableText = Partial<Record<"hi" | "en", PortableTextBlock[]>>;

export interface ImageAsset {
  url: string;
  lqip?: string;
  dimensions?: { width: number; height: number; aspectRatio: number };
}

export interface GtImageData {
  alt?: LocaleValue;
  caption?: LocaleValue;
  mode?: "live" | "archive";
  credit?: string;
  source?: string;
  asset?: ImageAsset | null;
}

export interface WitnessData {
  name: string;
  work?: string;
  quote?: LocaleValue;
  portrait?: GtImageData;
  consent?: { obtained?: boolean; scope?: string };
}

export interface ReachRef {
  name?: LocaleValue;
  slug?: string;
  segment?: "source" | "upper" | "middle" | "lower" | "delta";
}

export interface FaceRef {
  _type: "festival" | "art" | "craft" | "environmentalIssue";
  title?: LocaleValue;
  name?: LocaleValue;
  slug?: string;
  register?: "stewardship" | "obituary";
}

export interface BookAppearanceData {
  plate?: string;
  page?: number;
  note?: string;
  book?: {
    title?: LocaleValue;
    slug?: string;
    sku?: string;
    priceINR?: number;
    edition?: string;
    coverImage?: GtImageData;
  };
}

export interface PlaceNavRef {
  title?: LocaleValue;
  slug?: string;
  km?: number;
  reach?: ReachRef;
  tier?: "stub" | "standard" | "flagship";
  journeyStage?: number;
}

export interface PlaceSeo {
  metaTitle?: LocaleValue;
  metaDescription?: LocaleValue;
  noindex?: boolean;
}

export interface PlaceData {
  _id: string;
  title?: LocaleValue;
  slug?: string;
  dek?: LocaleValue;
  distinctTruth?: string;
  km: number;
  totalKm: number;
  journeyStage?: number;
  journeyStageSecondary?: number;
  coordinates?: { lat: number; lng: number } | null;
  altitude?: number;
  reach?: ReachRef;
  heroImage?: GtImageData;
  gallery?: GtImageData[];
  essay?: LocalePortableText;
  archiveLayer?: LocalePortableText;
  witnesses?: WitnessData[];
  wings?: string[];
  relatedFestivals?: FaceRef[];
  relatedArt?: FaceRef[];
  relatedCraft?: FaceRef[];
  relatedEnvironment?: FaceRef[];
  appearsInBooks?: BookAppearanceData[];
  depthTier?: "stub" | "standard" | "flagship";
  state?: string;
  enStatus?: string;
  hiStatus?: string;
  seo?: PlaceSeo;
}

export interface PlaceNavigation {
  prev: PlaceNavRef | null;
  next: PlaceNavRef | null;
  sameStage: PlaceNavRef[];
  nextStage: PlaceNavRef[];
}

/* ── M5: library · sankalp · FACE · about · collection ─────────────────────── */

export interface AuthorRef {
  name?: string;
  role?: string;
  slug?: string;
}

export interface AuthorData {
  _id: string;
  name: string;
  role?: string;
  slug?: string;
  bio?: LocaleValue;
  portrait?: GtImageData;
}

export interface SpecRowData {
  label?: LocaleValue;
  value?: LocaleValue;
}

export interface BookTocItem {
  title?: LocaleValue;
  journeyStage?: number;
  plate?: string;
  page?: number;
  places?: { title?: LocaleValue; slug?: string; km?: number }[];
}

export interface BookListItem {
  title?: LocaleValue;
  subtitle?: LocaleValue;
  slug?: string;
  edition?: string;
  priceINR?: number;
  coverImage?: GtImageData;
}

export interface BookData extends BookListItem {
  _id: string;
  sku?: string;
  format?: string;
  description?: LocalePortableText;
  specs?: SpecRowData[];
  tableOfContents?: BookTocItem[];
  contributors?: AuthorRef[];
  seo?: PlaceSeo;
}

export interface SustainTierData {
  amount?: number;
  label?: LocaleValue;
  sustains?: LocaleValue;
  recurring?: boolean;
}

export interface SankalpData {
  _id: string;
  title?: LocaleValue;
  slug?: string;
  journeyStage?: number;
  intention?: LocaleValue;
  story?: LocalePortableText;
  tiers?: SustainTierData[];
  goalAmountINR?: number;
  lampsKept?: number;
  image?: GtImageData;
  targetPlace?: { title?: LocaleValue; slug?: string; km?: number; journeyStage?: number };
  seo?: PlaceSeo;
}

export type FaceWing = "festivals" | "art" | "craft" | "environment";

export interface FaceListItem {
  _type: FaceRef["_type"];
  wing: FaceWing;
  title?: LocaleValue;
  slug?: string;
  summary?: LocaleValue;
  register?: "stewardship" | "obituary";
  journeyStage?: number;
  heroImage?: GtImageData;
  km?: number;
}

export interface FaceEntityData extends FaceListItem {
  _id: string;
  body?: LocalePortableText;
  artist?: AuthorRef;
  relatedPlaces?: PlaceNavRef[];
  seo?: PlaceSeo;
}

export interface ReachGroup {
  name?: LocaleValue;
  slug?: string;
  segment?: "source" | "upper" | "middle" | "lower" | "delta";
  order?: number;
  blurb?: LocaleValue;
  places: PlaceNavRef[];
}

export interface AboutData {
  title?: LocaleValue;
  mission?: LocalePortableText;
  doctrine?: LocalePortableText;
  contributors?: AuthorData[];
  seo?: PlaceSeo;
}
