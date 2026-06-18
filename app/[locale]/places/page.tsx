import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/chrome/PageHeader";
import { PlaceTile } from "@/components/sections/PlaceTile";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCollection } from "@/lib/data/collection";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { collectionJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const revalidate = 3600;

const COPY: Record<Locale, { kicker: string; deva: string; title: string; lede: string; forthcoming: string }> = {
  en: {
    kicker: "The descent · seventy-five sacred places",
    deva: "गंगा जैसे क्रम रखती है, वैसे ही।",
    title: "Source to ocean.",
    lede: "Each place keeps its own hour and its own temperature on the river. The collection is ordered as the river orders it — but the river is felt everywhere and required nowhere. Enter at any bend.",
    forthcoming: "These places are forthcoming — the spine is live; the reach deepens next.",
  },
  hi: {
    kicker: "अवतरण · पचहत्तर तीर्थ-स्थान",
    deva: "गंगा जैसे क्रम रखती है, वैसे ही।",
    title: "स्रोत से सागर तक।",
    lede: "हर स्थान नदी पर अपना समय और अपना तापमान रखता है। संग्रह उसी क्रम में है जिस क्रम में नदी बहती है — पर नदी हर कहीं अनुभव होती है, कहीं अनिवार्य नहीं।",
    forthcoming: "ये स्थान आगामी हैं — रीढ़ सक्रिय है; अगला खंड गहराता है।",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = COPY[locale as Locale];
  return buildMetadata({ title: c.title, description: c.lede, path: "/places", locale: locale as Locale });
}

export default async function CollectionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const c = COPY[typed];

  const reaches = await getCollection();

  return (
    <main>
      <JsonLd data={collectionJsonLd(reaches, typed)} />

      <PageHeader kicker={c.kicker} deva={c.deva} title={c.title} lede={c.lede} />

      {/* the source→ocean Waterline datum */}
      <div className="mx-auto max-w-[1320px] px-6 pt-6 pb-4 md:px-12 lg:px-24">
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg,#3E6E82,#6E94A0 25%,#9A8E78 50%,#B5823E 75%,#B5772E)" }}
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

      <div className="mx-auto max-w-[1320px] px-6 pb-24 md:px-12 lg:px-24">
        {reaches.map((reach) => (
          <section key={reach.slug} className="mt-16 border-t border-stone pt-10 first:mt-8 first:border-t-0">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="t-h3 font-display text-ink">
                {reach.name?.hi && (
                  <span lang="hi" className="font-deva mr-3">
                    {reach.name.hi}
                  </span>
                )}
                {resolveLocale(reach.name, typed)}
              </h2>
              <span className="t-micro text-slate-light">
                {reach.places.length}{" "}
                {typed === "hi" ? "स्थान" : reach.places.length === 1 ? "place" : "places"}
              </span>
            </div>
            {resolveLocale(reach.blurb, typed) && (
              <p className="t-body mt-3 max-w-[56ch] text-slate-light">{resolveLocale(reach.blurb, typed)}</p>
            )}

            {reach.places.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
                {reach.places.map((place) => (
                  <PlaceTile key={place.slug} place={place} locale={typed} />
                ))}
              </div>
            ) : (
              <p className="t-body mt-6 italic text-slate-light">{c.forthcoming}</p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
