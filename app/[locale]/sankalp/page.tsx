import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { toRoman } from "@/components/journey/roman";
import { stageA11yLabel } from "@/components/journey/stageA11y";
import { PortableText } from "@/components/portable/PortableText";
import { LampField } from "@/components/sankalp/LampField";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSankalp } from "@/lib/data/sankalp";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { getJourneyStage, resolveStage } from "@/lib/journey";
import { sankalpJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const revalidate = 3600;

const COPY: Record<
  Locale,
  {
    kicker: string;
    deva: string;
    title: string;
    keep: string;
    standing: string;
    count: string;
    note: string;
    sustains: string;
    register: string;
  }
> = {
  en: {
    kicker: "A thinning river · this documentation exists because patrons keep it",
    deva: "एक दीप जलाएँ।",
    title: "Keep a lamp on the river.",
    keep: "Keep a lamp →",
    standing: "Keep a standing lamp →",
    count: "lamps kept along the river",
    note: "An offering that sustains the documentation of the next places · 80G receipt issued at confirmation",
    sustains: "What it sustains",
    register: "Set an intention. Dedicate it to a name. The amount is named by what it keeps, never by what it costs.",
  },
  hi: {
    kicker: "एक घटती नदी · यह दस्तावेज़ीकरण संरक्षकों के कारण है",
    deva: "एक दीप जलाएँ।",
    title: "नदी पर एक दीप जलाएँ।",
    keep: "एक दीप जलाएँ →",
    standing: "एक अखंड दीप जलाएँ →",
    count: "दीप नदी पर जलते हैं",
    note: "एक भेंट जो अगले स्थानों के दस्तावेज़ीकरण को संभालती है · 80G रसीद पुष्टि पर",
    sustains: "यह क्या संभालता है",
    register: "एक संकल्प लें। उसे किसी नाम को समर्पित करें। राशि उससे नामित होती है जो वह संभालती है।",
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
  return buildMetadata({ title: c.title, description: c.register, path: "/sankalp", locale: locale as Locale });
}

export default async function SankalpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const c = COPY[typed];

  const sankalp = await getSankalp();
  const intention = resolveLocale(sankalp?.intention, typed) || c.register;
  const tiers = sankalp?.tiers ?? [];
  const story = sankalp?.story?.[typed] ?? sankalp?.story?.en;
  // Which part of her life this lamp keeps — campaign stage, else inherited from
  // the target place (the schema's intended behaviour). Reuses resolveStage.
  const stageInput = sankalp?.journeyStage ?? sankalp?.targetPlace?.journeyStage;
  const stageKm = sankalp?.targetPlace?.km;
  const stageN =
    stageInput != null || stageKm != null ? resolveStage(stageInput, stageKm) : null;
  const stage = stageN != null ? getJourneyStage(stageN) : undefined;

  return (
    <main>
      <JsonLd data={sankalp ? sankalpJsonLd(sankalp, typed) : []} />

      {/* the warm pole / dusk — Lamp Gold, inscriptional, never a glow */}
      <section
        id="keep"
        className="relative py-24 md:py-32 lg:py-40"
        style={{ background: "radial-gradient(130% 95% at 50% 0%, #2b211a 0%, #1a1410 72%)" }}
      >
        <div className="mx-auto max-w-[1320px] px-6 text-center md:px-12 lg:px-24">
          <p className="t-label" style={{ color: "#caa86f" }}>
            {c.kicker}
          </p>
          <p lang="hi" className="font-deva mt-7 text-3xl md:text-4xl" style={{ color: "#EDE8DE" }}>
            {c.deva}
          </p>
          <h1 className="t-h2 font-display mt-2" style={{ color: "#F4F1EA" }}>
            {c.title}
          </h1>
          <p className="t-lede mx-auto mt-7 max-w-[48ch]" style={{ color: "#cfc7ba" }}>
            {intention}
          </p>

          {/* the quietest journey manifestation — which part of her life this lamp keeps.
              Monochrome, on-dark-muted (never lamp gold); the lamp stays primary. */}
          {stage && stageN != null && (
            <p
              className="label-row mt-5"
              style={{ textTransform: "none", color: "var(--color-on-dark-muted)" }}
            >
              <span aria-hidden="true">{toRoman(stageN)} · {stage.copy[typed].title}</span>
              <span className="sr-only">{stageA11yLabel(stageN, typed)}</span>
            </p>
          )}

          <LampField
            initialCount={sankalp?.lampsKept ?? 0}
            keepLabel={c.keep}
            standingLabel={c.standing}
            countLabel={c.count}
          />

          <p className="t-micro mt-9" style={{ color: "#6f675c" }}>
            {c.note}
          </p>
        </div>
      </section>

      {/* the register — amount named by what it keeps */}
      {tiers.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
            <p className="t-label text-slate-light">{c.sustains}</p>
            <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-3">
              {tiers.map((tier, i) => (
                <div key={i} className="border-t border-stone-deep pt-6">
                  <div className="flex items-baseline justify-between">
                    <h2 className="font-display text-xl text-ink">{resolveLocale(tier.label, typed)}</h2>
                    {tier.amount && (
                      <span className="label-row text-ink">₹{tier.amount.toLocaleString("en-IN")}</span>
                    )}
                  </div>
                  {tier.recurring && (
                    <span className="t-micro mt-2 inline-block text-slate-light">
                      {typed === "hi" ? "आवर्ती · अखंड" : "recurring · standing"}
                    </span>
                  )}
                  <p className="t-body mt-3 text-slate">{resolveLocale(tier.sustains, typed)}</p>
                  <a href="#keep" className="klink mt-5 inline-block font-display text-lg text-ink">
                    {typed === "hi" ? "यह दीप जलाएँ →" : "Keep this lamp →"}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* the story + what it sustains */}
      {(story || sankalp?.targetPlace) && (
        <section className="border-t border-stone py-16 md:py-24" style={{ background: "var(--color-reading)" }}>
          <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
            {story && (
              <div className="max-w-[66ch]">
                <PortableText value={story} km={2525} locale={typed} />
              </div>
            )}
            {sankalp?.targetPlace?.slug && (
              <Link
                href={`/${typed}/places/${sankalp.targetPlace.slug}`}
                className="klink mt-8 inline-block font-display text-lg text-ink"
              >
                {typed === "hi" ? "यह भेंट जिसका दस्तावेज़ीकरण संभालती है" : "This offering sustains the documentation of"}{" "}
                {resolveLocale(sankalp.targetPlace.title, typed)} →
              </Link>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
