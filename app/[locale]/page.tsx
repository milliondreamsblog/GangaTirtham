import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomeFace } from "@/components/home/HomeFace";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeJourney } from "@/components/home/HomeJourney";
import { HomeSankalp } from "@/components/home/HomeSankalp";
import { IssueLine } from "@/components/home/IssueLine";
import { RiverFelt } from "@/components/home/RiverFelt";
import { VesselRegister } from "@/components/home/VesselRegister";
import { MobileStickyCta } from "@/components/place/MobileStickyCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomeData } from "@/lib/data/home";
import { isLocale, type Locale } from "@/lib/i18n";
import { homeJsonLd } from "@/lib/jsonld";
import { localizedAlternates } from "@/lib/metadata";

export const revalidate = 3600;

const META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Gangatirtham — a book about the river Ganga",
    description:
      "Gangatirtham is a book about the river Ganga — Vol. I of a documented descent from the ice of Gaumukh to the open sea. Order the edition, or read the encounter at Kashi.",
  },
  hi: {
    title: "गंगातीर्थम् — गंगा नदी पर एक पुस्तक",
    description:
      "गंगातीर्थम् गंगा नदी पर एक पुस्तक है — गौमुख की बर्फ़ से खुले सागर तक एक प्रलेखित अवतरण का खण्ड I। संस्करण मँगाएँ, या काशी का मिलन पढ़ें।",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const typed = locale as Locale;
  const m = META[typed];
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: localizedAlternates("", typed),
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      title: m.title,
      description: m.description,
      siteName: "Gangatirtham",
      locale: typed === "hi" ? "hi_IN" : "en_IN",
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;

  const { book, witness, descent, sankalp } = await getHomeData();
  const orderHref = book?.slug ? `/${typed}/library/${book.slug}` : `/${typed}/library`;
  const liveSlugs = descent.map((p) => p.slug).filter((s): s is string => Boolean(s));

  return (
    <>
      <JsonLd data={homeJsonLd(book, typed)} />

      {/* 1 · Issue-line (the masthead lives in the layout) */}
      <IssueLine locale={typed} />

      <main>
        {/* 2 · Hero — river leads (7), book is the second fixation (5) */}
        <HomeHero book={book} locale={typed} />

        {/* The River — felt: the emotional centerpiece + the Waterline tick */}
        <RiverFelt witness={witness} locale={typed} />

        {/* The Book — the acquisition register + the one price */}
        <VesselRegister book={book} locale={typed} />

        {/* The Journey — the Biography of a River (replaces the old 75-Places grid) */}
        <HomeJourney locale={typed} liveSlugs={liveSlugs} />

        {/* FACE Ganga — now contextualised by the 8 stages */}
        <HomeFace locale={typed} />

        {/* Sankalp — "which part of the river's life would you keep alive?" */}
        <HomeSankalp sankalp={sankalp} locale={typed} />
      </main>

      {/* mobile: Order one tap away after the hero, suppressed over Sankalp */}
      <MobileStickyCta
        label={typed === "hi" ? "पुस्तक मँगाएँ" : "Order the Book"}
        href={orderHref}
        suppressOverId="home-sankalp"
      />
    </>
  );
}
