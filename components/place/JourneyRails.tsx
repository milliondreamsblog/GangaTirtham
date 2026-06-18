import { PlaceTile } from "@/components/sections/PlaceTile";
import type { Locale } from "@/lib/i18n";
import type { PlaceNavRef } from "@/lib/types";

/**
 * The journey rails — narrative movement, not geography. "Remain in this chapter
 * of her life" lingers among same-stage places; "The river moves on" crosses into
 * the next. No stage vocabulary, no subtitles, no chrome: the place cards do the
 * work, and each next place's own badge/gauge reveals the new mood on arrival.
 * An empty rail is omitted silently (no empty-state copy). Stage membership is
 * resolved upstream (journeyStage ?? km). See RIVER_JOURNEY.md.
 */
const COPY: Record<Locale, { same: string; next: string }> = {
  en: {
    same: "Remain in this chapter of her life",
    next: "The river moves on",
  },
  hi: {
    same: "उसके जीवन के इसी अध्याय में ठहरें",
    next: "नदी आगे बहती है",
  },
};

function Rail({
  heading,
  places,
  locale,
}: {
  heading: string;
  places: PlaceNavRef[];
  locale: Locale;
}) {
  if (places.length === 0) return null;
  return (
    <section className="relative border-t border-stone py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
        <h2 className="t-h3 font-display text-ink">{heading}</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {places.map((p) => (
            <PlaceTile key={p.slug} place={p} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function JourneyRails({
  sameStage,
  nextStage,
  locale,
}: {
  sameStage: PlaceNavRef[];
  nextStage: PlaceNavRef[];
  locale: Locale;
}) {
  const c = COPY[locale];
  return (
    <>
      <Rail heading={c.same} places={sameStage} locale={locale} />
      <Rail heading={c.next} places={nextStage} locale={locale} />
    </>
  );
}
