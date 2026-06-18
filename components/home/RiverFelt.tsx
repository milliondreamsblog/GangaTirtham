import Link from "next/link";

import { resolveLocale, type Locale } from "@/lib/i18n";
import type { HomeWitness } from "@/lib/data/home";

/**
 * Block 3 — The River, Felt. The emotional centerpiece, held a beat before any
 * deeper sell: a named, consented witness fragment (against a Stone hairline,
 * never foil) + the source→ocean Waterline datum, which carries THIS screen's
 * single temperature tick (dual-encoded with the km label). The tick lives here,
 * NOT in the hero — so neither screen ships two chromatic events.
 */
const COPY: Record<Locale, { kicker: string; here: string; read: string }> = {
  en: { kicker: "The river, felt", here: "you are here", read: "Read the encounter →" },
  hi: { kicker: "नदी, अनुभव में", here: "आप यहाँ", read: "मिलन पढ़ें →" },
};

export function RiverFelt({ witness, locale }: { witness: HomeWitness | null; locale: Locale }) {
  const c = COPY[locale];
  const quote = resolveLocale(witness?.witness.quote, locale);
  const km = witness?.km ?? 1384;
  const markerLeft = `${((km / 2525) * 100).toFixed(2)}%`;
  const placeName = resolveLocale(witness?.placeTitle, locale);

  return (
    <section className="relative border-t border-stone py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
        <p className="t-label text-slate-light">{c.kicker}</p>

        {quote && (
          <blockquote className="mt-8 max-w-[42ch] border-l border-stone-deep pl-6">
            <p className="font-display text-2xl leading-snug text-ink md:text-3xl">“{quote}”</p>
            <footer className="t-label mt-6 text-slate">
              <span className="text-ink">{witness?.witness.name}</span>
              {witness?.witness.work && <span className="text-slate-light"> · {witness.witness.work}</span>}
              {placeName && <span className="text-slate-light"> · {placeName}</span>}
            </footer>
          </blockquote>
        )}

        {/* the source→ocean Waterline datum — this screen's one chromatic event */}
        <div className="relative mt-16">
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg,#3E6E82,#6E94A0 25%,#9A8E78 50%,#B5823E 75%,#B5772E)" }}
          />
          <span
            className="absolute -top-[4px] h-[9px] w-[9px] -translate-x-1/2 rounded-full"
            style={{ left: markerLeft, background: "var(--accent, #9A8E78)", boxShadow: "0 0 0 4px #F4F1EA" }}
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
                गंगा सागर
              </span>
            </span>
          </div>
        </div>

        {witness?.placeSlug && (
          <Link
            href={`/${locale}/places/${witness.placeSlug}`}
            className="klink mt-8 inline-block font-display text-lg text-ink"
          >
            {c.read}
          </Link>
        )}
      </div>
    </section>
  );
}
