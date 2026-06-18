import { defineField } from "sanity";

import { JOURNEY_STAGES, OBITUARY_STAGE } from "../../../lib/journey";

/**
 * The `journeyStage` axis for the schema — options + a reusable field factory +
 * the Karuna Guard. Canonical stage list lives in lib/journey.ts (shared with
 * the frontend), so the spine never forks. See RIVER_JOURNEY.md.
 */

export const JOURNEY_STAGE_OPTIONS = JOURNEY_STAGES.map((s) => ({
  title: `${s.n} · ${s.copy.en.title}`,
  value: s.n,
}));

export { OBITUARY_STAGE };

export function journeyStageField(opts: {
  name?: string;
  title?: string;
  group?: string;
  description?: string;
} = {}) {
  return defineField({
    name: opts.name ?? "journeyStage",
    title: opts.title ?? "Journey stage",
    type: "number",
    group: opts.group,
    description:
      opts.description ??
      "The river's emotional state here — one of the 8 (the Biography of a River). Derived from km; confirm. Stage 7 (The Wound) is the only obituary stage.",
    options: { list: JOURNEY_STAGE_OPTIONS },
    validation: (rule) => rule.min(1).max(8),
  });
}
