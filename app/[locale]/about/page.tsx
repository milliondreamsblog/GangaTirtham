import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/chrome/PageHeader";
import { PortableText } from "@/components/portable/PortableText";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAbout } from "@/lib/data/about";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { aboutJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const revalidate = 3600;

const ROLE_LABELS: Record<string, Record<Locale, string>> = {
  eic: { en: "Editor-in-Chief", hi: "प्रधान संपादक" },
  me: { en: "Managing Editor", hi: "प्रबंध संपादक" },
  writer: { en: "Writers", hi: "लेखक" },
  photographer: { en: "Photographers", hi: "छायाकार" },
  translator: { en: "Translators", hi: "अनुवादक" },
  "fact-checker": { en: "Fact-checkers", hi: "तथ्य-परीक्षक" },
  contributor: { en: "Contributors", hi: "योगदानकर्ता" },
};

// The masthead-of-roles — the institution foregrounds roles over personal
// bylines ("the writer is never more visible than the person").
const MASTHEAD_ROLES = ["eic", "me", "writer", "photographer", "translator", "fact-checker"];

const COPY: Record<Locale, { kicker: string; deva: string; title: string; lede: string; masthead: string; colophon: string }> = {
  en: {
    kicker: "About · the institution",
    deva: "नदी खुली, और नदी संचित।",
    title: "A cultural archive, not a campaign.",
    lede: "Gangatirtham documents the sacred places along the Ganga — as the river orders them, source to ocean — and keeps them, in a book and in a continuing archive.",
    masthead: "Who keeps the river",
    colophon: "Edited by the Editor-in-Chief · reported by the writers · photographed by the contributors · checked, consented, and transcreated before anything is published.",
  },
  hi: {
    kicker: "परिचय · संस्था",
    deva: "नदी खुली, और नदी संचित।",
    title: "एक सांस्कृतिक अभिलेख, अभियान नहीं।",
    lede: "गंगातीर्थम् गंगा के तीर्थ-स्थानों का दस्तावेज़ीकरण करता है — जैसे नदी उन्हें क्रम देती है, स्रोत से सागर तक — और उन्हें एक पुस्तक में और एक सतत अभिलेख में संचित करता है।",
    masthead: "नदी को कौन संभालता है",
    colophon: "प्रधान संपादक द्वारा संपादित · लेखकों द्वारा रिपोर्ट · योगदानकर्ताओं द्वारा चित्रित · प्रकाशन से पूर्व परीक्षित, सहमत और पुनर्रचित।",
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
  return buildMetadata({ title: c.title, description: c.lede, path: "/about", locale: locale as Locale });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const c = COPY[typed];

  const about = await getAbout();
  const title = resolveLocale(about.title, typed) || c.title;
  const mission = about.mission?.[typed] ?? about.mission?.en;
  const doctrine = about.doctrine?.[typed] ?? about.doctrine?.en;
  const contributors = about.contributors ?? [];

  return (
    <main>
      <JsonLd data={aboutJsonLd(typed, title)} />

      <PageHeader kicker={c.kicker} deva={c.deva} title={title} lede={c.lede} />

      {mission && (
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
            <div className="max-w-[66ch]">
              <PortableText value={mission} km={0} locale={typed} />
            </div>
          </div>
        </section>
      )}

      {doctrine && (
        <section className="border-t border-stone py-14 md:py-20" style={{ background: "var(--color-reading)" }}>
          <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
            <div className="max-w-[66ch]">
              <PortableText value={doctrine} km={0} locale={typed} />
            </div>
          </div>
        </section>
      )}

      {/* the masthead of roles */}
      <section className="border-t border-stone py-16 md:py-20">
        <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
          <p className="t-label text-slate-light">{c.masthead}</p>

          {contributors.length > 0 ? (
            <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {contributors.map((person) => (
                <li key={person._id}>
                  <p className="font-display text-lg text-ink">{person.name}</p>
                  <p className="t-micro mt-1 text-slate-light">
                    {person.role ? ROLE_LABELS[person.role]?.[typed] ?? person.role : ""}
                  </p>
                  {person.bio && <p className="t-body mt-2 text-slate-light">{resolveLocale(person.bio, typed)}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {MASTHEAD_ROLES.map((role) => (
                <li key={role} className="font-display text-xl text-ink">
                  {ROLE_LABELS[role][typed]}
                </li>
              ))}
            </ul>
          )}

          <p className="t-body mt-10 max-w-[60ch] text-slate-light">{c.colophon}</p>
        </div>
      </section>
    </main>
  );
}
