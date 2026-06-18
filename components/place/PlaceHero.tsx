import { PlateImage } from "@/components/media/PlateImage";
import { StageBadge } from "@/components/place/StageBadge";
import { toRoman } from "@/components/journey/roman";
import { stageA11yLabel } from "@/components/journey/stageA11y";
import { OBITUARY_STAGE, getJourneyStage, resolveStage } from "@/lib/journey";
import { resolveLocale, type Locale } from "@/lib/i18n";
import type { PlaceData } from "@/lib/types";

// The accessible unit word for the gauge readout — AT spells it; the visual abbreviates "km".
const KM_WORD: Record<Locale, string> = { en: "kilometres", hi: "किलोमीटर" };

/**
 * Arrival — the encounter and the answer share the first screen (search visitors
 * arrive cold). Editorial folio: name + answer left, the LIVE hero plate (LCP)
 * right, the source→ocean Waterline datum beneath with this place's single
 * temperature tick. See the place-page blueprint (CONTENT_DOCTRINE.md).
 */
export function PlaceHero({ place, locale, t }: { place: PlaceData; locale: Locale; t: number }) {
  const hi = place.title?.hi;
  const en = place.title?.en;
  const dek = resolveLocale(place.dek, locale);
  const reach = resolveLocale(place.reach?.name, locale);
  const markerLeft = `${(t * 100).toFixed(2)}%`;
  // The emotional axis (Biography of a River) — derived from km, editor-confirmable.
  const stageN = resolveStage(place.journeyStage, place.km);
  // The one grief beat — keyed off the PRIMARY resolved stage, so a split place
  // (Bhagalpur: primary 6, secondary 7) never triggers it. Farakka owns the Wound.
  const isWound = stageN === OBITUARY_STAGE;
  const stageTitle = getJourneyStage(stageN)?.copy[locale].title;
  const placeName = resolveLocale(place.title, locale);
  // The gauge's normalized AT announcement — "1,384 kilometres. Stage Five: Reckoning. Kashi."
  const gaugeLabel = `${place.km.toLocaleString("en-IN")} ${KM_WORD[locale]}. ${stageA11yLabel(stageN, locale)}. ${placeName}.`;

  return (
    <section className="relative">
      <div className="mx-auto grid max-w-[1320px] items-center gap-8 px-6 pt-8 pb-10 md:px-12 lg:grid-cols-12 lg:gap-14 lg:px-24 lg:pt-12 lg:pb-16">
        {/* text — owns the left, order after the plate on mobile so the image is the fold */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <p className="t-label text-slate-light">
            {reach}
            {reach ? " · " : ""}km&nbsp;{place.km.toLocaleString("en-IN")}
          </p>

          <StageBadge stage={stageN} locale={locale} />

          <h1 className="mt-3 text-ink">
            {hi && (
              <span lang="hi" className="font-deva block text-4xl leading-none md:text-5xl">
                {hi}
              </span>
            )}
            {en && <span className="t-h1 font-display mt-2 block">{en}</span>}
          </h1>

          {dek && <p className="t-lede mt-7 max-w-[46ch] text-slate">{dek}</p>}

          {place.distinctTruth && (
            <p className="font-display mt-8 max-w-[40ch] text-xl italic leading-snug text-ink">
              {place.distinctTruth}
            </p>
          )}
        </div>

        {/* the LIVE plate — the LCP image */}
        <div className="order-1 lg:order-2 lg:col-span-5">
          <PlateImage
            image={place.heroImage}
            km={place.km}
            locale={locale}
            aspect="4/5"
            priority
            sizes="(max-width: 905px) 100vw, 40vw"
            className="h-[54vh] w-full sm:h-[58vh] lg:h-[78vh]"
            showCaption
          />
        </div>
      </div>

      {/* the source→ocean Waterline datum, marked at this place */}
      <div className="mx-auto max-w-[1320px] px-6 pb-12 md:px-12 lg:px-24 lg:pb-16">
        <div className="relative">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg,#3E6E82,#6E94A0 25%,#9A8E78 50%,#B5823E 75%,#B5772E)",
            }}
          />
          {/* Stage VII: the severed line (static — the wound's primary signal) */}
          {isWound && (
            <span className="wound-break" style={{ left: markerLeft }} aria-hidden="true" />
          )}
          <span
            className={`absolute -top-[4px] h-[9px] w-[9px] -translate-x-1/2 rounded-full${isWound ? " wound-marker" : ""}`}
            style={{ left: markerLeft, background: "var(--accent)", boxShadow: "0 0 0 4px #F4F1EA" }}
            aria-hidden="true"
          />
          <div className="t-micro mt-3 flex justify-between text-slate-light">
            <span>
              km 0 ·{" "}
              <span lang="hi" className="font-deva">
                गौमुख
              </span>
            </span>
            <span className="text-right">
              km 2525 ·{" "}
              <span lang="hi" className="font-deva">
                सागर
              </span>
            </span>
          </div>

          {/* The Descent Gauge readout — river position → life stage → current
              chapter. An instrument, not navigation: accent only on the marker
              (above) and the Roman numeral; authored case preserved. Exposed to
              AT as a single labelled instrument (role=img) that announces the
              normalized form — never the visual Roman numeral. */}
          <div className="mt-5 text-center" role="img" aria-label={gaugeLabel}>
            <p className="label-row" style={{ textTransform: "none" }}>
              {place.km.toLocaleString("en-IN")} km
            </p>
            <p className="label-row mt-1" style={{ textTransform: "none" }}>
              <span style={{ color: "var(--accent-readable)" }}>{toRoman(stageN)}</span>
              {" · "}
              {stageTitle}
            </p>
            <p className="label-row mt-1" style={{ textTransform: "none" }}>
              {placeName}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
