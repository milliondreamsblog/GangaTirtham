import Link from "next/link";

import { TYPE_TO_WING, WING_LABELS } from "@/lib/face";
import { resolveLocale, type Locale } from "@/lib/i18n";
import type { FaceRef, FaceWing, PlaceData } from "@/lib/types";

/**
 * FACE GANGA connections — four wings threaded through the archive, never four
 * competing doors. A place carries a wing without becoming a brochure for it.
 * Environment is stewardship/continuity (or, where earned, the obituary register).
 */
export function FaceConnections({ place, locale }: { place: PlaceData; locale: Locale }) {
  const refs: FaceRef[] = [
    ...(place.relatedFestivals ?? []),
    ...(place.relatedArt ?? []),
    ...(place.relatedCraft ?? []),
    ...(place.relatedEnvironment ?? []),
  ].filter((r) => r?.slug);

  const wings = place.wings ?? [];
  if (wings.length === 0 && refs.length === 0) return null;

  return (
    <section className="relative py-16 md:py-20 border-t border-stone">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
        <p className="t-label text-slate-light">
          {locale === "hi" ? "फेस गंगा · यह स्थान धारण करता है" : "FACE Ganga · this place carries"}
        </p>

        {wings.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {wings.map((wing) => (
              <span key={wing} className="font-display text-2xl text-ink md:text-3xl">
                {WING_LABELS[wing as FaceWing]?.[locale] ?? wing}
              </span>
            ))}
          </div>
        )}

        {refs.length > 0 && (
          <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {refs.map((ref) => {
              const wing = TYPE_TO_WING[ref._type];
              const label = resolveLocale(ref.title ?? ref.name, locale);
              const wingLabel = WING_LABELS[wing]?.[locale] ?? wing;
              return (
                <li key={`${ref._type}-${ref.slug}`}>
                  <Link href={`/${locale}/face-ganga/${wing}/${ref.slug}`} className="block">
                    <span className="t-micro text-slate-light">
                      {wingLabel}
                      {ref.register === "obituary" ? ` · ${locale === "hi" ? "श्रद्धांजलि" : "obituary"}` : ""}
                    </span>
                    <span className="klink mt-1 block font-display text-lg text-ink">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
