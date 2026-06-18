import Link from "next/link";

import { resolveLocale, type Locale } from "@/lib/i18n";
import { riverTemperature } from "@/lib/temperature";
import type { PlaceNavRef } from "@/lib/types";

/**
 * Source→Ocean lateral navigation — the prev/next rails by river km. Upstream is
 * toward the ice; downstream toward the sea. Each rail carries its neighbour's
 * own temperature tick (dual-encoded with the km label). See the place blueprint.
 */
function Rail({
  place,
  direction,
  locale,
}: {
  place: PlaceNavRef;
  direction: "up" | "down";
  locale: Locale;
}) {
  const name = resolveLocale(place.title, locale);
  const nameHi = place.title?.hi;
  const accent = riverTemperature(place.km ?? 0).accent;
  const labelUp = locale === "hi" ? "हिमस्रोत की ओर" : "Toward the source";
  const labelDown = locale === "hi" ? "सागर की ओर" : "Toward the sea";

  return (
    <Link
      href={`/${locale}/places/${place.slug}`}
      className={`group flex flex-col gap-2 ${direction === "down" ? "items-end text-right" : "items-start"}`}
    >
      <span className="t-micro text-slate-light">
        {direction === "up" ? `← ${labelUp}` : `${labelDown} →`}
      </span>
      <span className="inline-flex items-center gap-2">
        {direction === "up" && (
          <span
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{ background: accent }}
            aria-hidden="true"
          />
        )}
        <span className="font-display klink text-xl text-ink">
          {nameHi ? (
            <>
              <span lang="hi" className="font-deva">
                {nameHi}
              </span>{" "}
            </>
          ) : null}
          {name}
        </span>
        {direction === "down" && (
          <span
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{ background: accent }}
            aria-hidden="true"
          />
        )}
      </span>
      <span className="t-micro text-slate-light">km {(place.km ?? 0).toLocaleString("en-IN")}</span>
    </Link>
  );
}

export function SourceOceanNav({
  prev,
  next,
  locale,
}: {
  prev: PlaceNavRef | null;
  next: PlaceNavRef | null;
  locale: Locale;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label={locale === "hi" ? "स्रोत से सागर तक नौसंचालन" : "Source to ocean navigation"}
      className="relative border-t border-stone py-12"
    >
      <div className="mx-auto flex max-w-[1320px] items-start justify-between gap-8 px-6 md:px-12 lg:px-24">
        <div className="min-w-0">{prev && <Rail place={prev} direction="up" locale={locale} />}</div>
        <div className="min-w-0">{next && <Rail place={next} direction="down" locale={locale} />}</div>
      </div>
    </nav>
  );
}
