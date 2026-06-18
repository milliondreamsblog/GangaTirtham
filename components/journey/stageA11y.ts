import { getJourneyStage } from "@/lib/journey";
import type { Locale } from "@/lib/i18n";

/**
 * The normalized, assistive-tech-only phrase for a journey stage —
 * "Stage Five: Reckoning" / "चरण पाँच: लेखा-जोखा". Spells the stage number (it
 * never announces the visual Roman numeral) and pulls the title from canonical
 * journey metadata. Shared journey ownership: the place StageBadge + Descent
 * Gauge AND the Library ToC arc, so the spoken stage form lives in one place.
 */

const STAGE_WORD: Record<Locale, string> = { en: "Stage", hi: "चरण" };

const CARDINAL: Record<Locale, readonly string[]> = {
  en: ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"],
  hi: ["", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ"],
};

export function stageA11yLabel(stage: number, locale: Locale): string {
  const s = getJourneyStage(stage);
  if (!s) return "";
  const ordinal = CARDINAL[locale][stage] ?? String(stage);
  return `${STAGE_WORD[locale]} ${ordinal}: ${s.copy[locale].title}`;
}
