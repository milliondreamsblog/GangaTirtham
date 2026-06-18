import { toRoman } from "@/components/journey/roman";
import { stageA11yLabel } from "@/components/journey/stageA11y";
import { getJourneyStage } from "@/lib/journey";
import type { Locale } from "@/lib/i18n";

/**
 * The Stage Badge — the place's position in the Biography of a River, rendered as
 * demoted archival metadata directly above the place title. Text-only: a
 * temperature-accented Roman numeral + the canonical localized stage title. The
 * place name remains primary; this is apparatus, not a heading. See RIVER_JOURNEY.md.
 *
 * Stage resolution (km → journeyStage) happens in the caller; this component
 * receives the already-resolved stage number and reads only canonical metadata
 * via getJourneyStage — no stage maps, switches, or hardcoded labels here.
 */

export function StageBadge({ stage, locale }: { stage: number; locale: Locale }) {
  const s = getJourneyStage(stage);
  if (!s) return null;

  const title = s.copy[locale].title; // canonical: copy.en.title / copy.hi.title

  // The numeral is archival metadata (apparatus); the stage title is narrative
  // language, so its authored case is preserved. textTransform is inline because
  // .label-row is unlayered CSS — Tailwind's normal-case cannot override it.
  return (
    <p className="label-row mt-5" style={{ textTransform: "none" }}>
      <span aria-hidden="true">
        <span style={{ color: "var(--accent-readable)" }}>{toRoman(stage)}</span>
        {" · "}
        {title}
      </span>
      {/* AT reads the normalized phrase — "Stage Five: Reckoning" — never the "V". */}
      <span className="sr-only">{stageA11yLabel(stage, locale)}</span>
    </p>
  );
}
