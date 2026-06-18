import type { Locale } from "@/lib/i18n";
import type { FaceRef, FaceWing } from "@/lib/types";

/** Single source of truth for the four FACE wings. */
export const WINGS: FaceWing[] = ["festivals", "art", "craft", "environment"];

export const WING_TO_TYPE: Record<FaceWing, FaceRef["_type"]> = {
  festivals: "festival",
  art: "art",
  craft: "craft",
  environment: "environmentalIssue",
};

export const TYPE_TO_WING: Record<FaceRef["_type"], FaceWing> = {
  festival: "festivals",
  art: "art",
  craft: "craft",
  environmentalIssue: "environment",
};

export const WING_LABELS: Record<FaceWing, Record<Locale, string>> = {
  festivals: { en: "Festivals", hi: "उत्सव" },
  art: { en: "Art", hi: "कला" },
  craft: { en: "Craft", hi: "शिल्प" },
  environment: { en: "Environment", hi: "पर्यावरण" },
};

/** The one-line framing of each wing (never four competing doors). */
export const WING_FRAMING: Record<FaceWing, Record<Locale, string>> = {
  festivals: { en: "Preparation and aftermath — the periphery, never the spectacle.", hi: "तैयारी और उपरांत — परिधि, तमाशा नहीं।" },
  art: { en: "The living culture — music and manuscript, kept hand to hand.", hi: "जीवित संस्कृति — संगीत और पाण्डुलिपि।" },
  craft: { en: "The maker's hand — process over product.", hi: "कारीगर का हाथ — उत्पाद नहीं, प्रक्रिया।" },
  environment: { en: "Stewardship and continuity — or, where earned, the obituary.", hi: "संरक्षण और निरंतरता — या, जहाँ अर्जित, श्रद्धांजलि।" },
};

export function isFaceWing(value: string): value is FaceWing {
  return (WINGS as string[]).includes(value);
}
