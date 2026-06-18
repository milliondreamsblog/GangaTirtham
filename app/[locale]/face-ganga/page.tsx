import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/chrome/PageHeader";
import { toRoman } from "@/components/journey/roman";
import { stageA11yLabel } from "@/components/journey/stageA11y";
import { PlateImage } from "@/components/media/PlateImage";
import { getFaceEntities } from "@/lib/data/face";
import { WING_FRAMING, WING_LABELS, WINGS } from "@/lib/face";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { getJourneyStage, resolveStage } from "@/lib/journey";
import { buildMetadata } from "@/lib/metadata";
import type { FaceWing } from "@/lib/types";

export const revalidate = 3600;

const COPY: Record<Locale, { kicker: string; deva: string; title: string; lede: string }> = {
  en: {
    kicker: "FACE Ganga · the why, threaded through the archive",
    deva: "उत्सव · कला · शिल्प · पर्यावरण",
    title: "Four wings, not four doors.",
    lede: "Festivals, Art, Craft, Environmental issues — the living culture of the river, carried through the places rather than displayed beside them. Environment is framed as stewardship and continuity, never crisis.",
  },
  hi: {
    kicker: "फेस गंगा · क्यों, अभिलेख में पिरोया हुआ",
    deva: "उत्सव · कला · शिल्प · पर्यावरण",
    title: "चार पंख, चार द्वार नहीं।",
    lede: "उत्सव, कला, शिल्प, पर्यावरण — नदी की जीवित संस्कृति, स्थानों के माध्यम से वहन की गई, उनके पास प्रदर्शित नहीं। पर्यावरण संरक्षण और निरंतरता के रूप में, संकट नहीं।",
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
  return buildMetadata({ title: "FACE Ganga", description: c.lede, path: "/face-ganga", locale: locale as Locale });
}

export default async function FaceHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const c = COPY[typed];

  const entities = await getFaceEntities();

  return (
    <main>
      <PageHeader kicker={c.kicker} deva={c.deva} title={c.title} lede={c.lede} />

      <div className="mx-auto max-w-[1320px] px-6 pt-10 pb-24 md:px-12 lg:px-24">
        {WINGS.map((wing: FaceWing) => {
          // Wing stays the primary grouping; within it, order source→ocean by the
          // river's life stage (then km) so the wing reads as a run of stages.
          const items = entities
            .filter((e) => e.wing === wing)
            .sort(
              (a, b) =>
                resolveStage(a.journeyStage, a.km) - resolveStage(b.journeyStage, b.km) ||
                (a.km ?? 0) - (b.km ?? 0),
            );
          return (
            <section key={wing} className="mt-16 border-t border-stone pt-10 first:mt-8 first:border-t-0">
              <div className="max-w-[60ch]">
                <h2 className="t-h3 font-display text-ink">{WING_LABELS[wing][typed]}</h2>
                <p className="t-body mt-2 text-slate-light">{WING_FRAMING[wing][typed]}</p>
              </div>

              {items.length > 0 ? (
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
                  {items.map((item) => {
                    const stageN = resolveStage(item.journeyStage, item.km);
                    const stage = getJourneyStage(stageN);
                    return (
                    <Link key={item.slug} href={`/${typed}/face-ganga/${wing}/${item.slug}`} className="tile group block">
                      <PlateImage
                        image={item.heroImage}
                        km={item.km ?? 0}
                        locale={typed}
                        aspect="4/5"
                        sizes="(max-width: 905px) 50vw, 22vw"
                      />
                      <div className="mt-4">
                        {/* stage eyebrow — monochrome, secondary to the wing; shared journey vocab */}
                        {stage && (
                          <p className="label-row mb-1" style={{ textTransform: "none" }}>
                            <span aria-hidden="true">{toRoman(stageN)} · {stage.copy[typed].title}</span>
                            <span className="sr-only">{stageA11yLabel(stageN, typed)}</span>
                          </p>
                        )}
                        <p className="font-display text-lg text-ink">
                          {item.title?.hi && (
                            <span lang="hi" className="font-deva mr-2">
                              {item.title.hi}
                            </span>
                          )}
                          {resolveLocale(item.title, typed)}
                        </p>
                        <p className="t-micro mt-1 text-slate-light">
                          {WING_LABELS[wing][typed]}
                          {item.register === "obituary" ? ` · ${typed === "hi" ? "श्रद्धांजलि" : "obituary"}` : ""}
                        </p>
                      </div>
                    </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="t-body mt-6 italic text-slate-light">
                  {typed === "hi" ? "आगामी।" : "Forthcoming."}
                </p>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
