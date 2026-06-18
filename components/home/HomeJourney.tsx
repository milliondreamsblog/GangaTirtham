import Link from "next/link";

import { JOURNEY_STAGES } from "@/lib/journey";
import type { Locale } from "@/lib/i18n";

import { JourneyCard } from "./JourneyCard";

/**
 * The Journey — "The Biography of a River." The narrative engine, in the spot the
 * old 75-Places grid held. Eight emotional states, source→ocean, each a chapter
 * of one life. The single source→ocean Waterline strip is the section's ONE
 * chromatic event; the cards use tonal graded plates. See RIVER_JOURNEY.md.
 */
const COPY: Record<Locale, { kicker: string; title: string; line: string; all: string }> = {
  en: {
    kicker: "The central narrative · the river is the protagonist",
    title: "The Biography of a River.",
    line: "Not a river — a life. Eight states, from the ice to the open sea. Travel with her; the places are her chapters.",
    all: "Explore all seventy-five places →",
  },
  hi: {
    kicker: "केंद्रीय आख्यान · नदी ही नायक है",
    title: "एक नदी की जीवनी।",
    line: "नदी नहीं — एक जीवन। आठ अवस्थाएँ, बर्फ़ से खुले सागर तक। उसके साथ चलें; स्थान उसके अध्याय हैं।",
    all: "सभी पचहत्तर स्थान देखें →",
  },
};

export function HomeJourney({ locale, liveSlugs }: { locale: Locale; liveSlugs: string[] }) {
  const c = COPY[locale];
  const live = new Set(liveSlugs);

  return (
    <section className="relative border-t border-stone py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
        <div className="max-w-[60ch]">
          <p className="t-label text-slate-light">{c.kicker}</p>
          <h2 className="t-h2 font-display mt-4 text-ink">{c.title}</h2>
          <p className="t-lede mt-5 text-slate">{c.line}</p>
        </div>

        {/* the source→ocean Waterline — the section's single chromatic event */}
        <div className="relative mt-12">
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg,#3E6E82,#6E94A0 25%,#9A8E78 50%,#B5823E 75%,#B5772E)" }}
          />
          <div className="t-micro mt-3 flex justify-between text-slate-light">
            <span>
              01 ·{" "}
              <span lang="hi" className="font-deva">
                जन्म
              </span>{" "}
              · {locale === "hi" ? "बर्फ़" : "the ice"}
            </span>
            <span className="text-right">
              08 ·{" "}
              <span lang="hi" className="font-deva">
                वापसी
              </span>{" "}
              · {locale === "hi" ? "सागर" : "the sea"}
            </span>
          </div>
        </div>

        {/* the eight chapters */}
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY_STAGES.map((stage) => (
            <JourneyCard
              key={stage.n}
              stage={stage}
              locale={locale}
              placeLive={live.has(stage.placeSlug)}
            />
          ))}
        </div>

        <div className="mt-12">
          <Link href={`/${locale}/places`} className="t-label klink text-slate">
            {c.all}
          </Link>
        </div>
      </div>
    </section>
  );
}
