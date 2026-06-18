import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArchiveLayer } from "@/components/place/ArchiveLayer";
import { BookDeepLink } from "@/components/place/BookDeepLink";
import { Breadcrumb } from "@/components/place/Breadcrumb";
import { FaceConnections } from "@/components/place/FaceConnections";
import { JourneyRails } from "@/components/place/JourneyRails";
import { MobileStickyCta } from "@/components/place/MobileStickyCta";
import { PlaceEssay } from "@/components/place/PlaceEssay";
import { PlaceHero } from "@/components/place/PlaceHero";
import { SourceOceanNav } from "@/components/place/SourceOceanNav";
import { WitnessPeak } from "@/components/place/WitnessPeak";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPlace, getPlaceNavigation, getPlaceSlugs } from "@/lib/data/places";
import { isLocale, locales, resolveLocale, type Locale } from "@/lib/i18n";
import { placeJsonLd } from "@/lib/jsonld";
import { buildPlaceMetadata } from "@/lib/metadata";
import { riverTemperature, temperatureStyle } from "@/lib/temperature";

// Content → SSG + ISR with tag-based revalidation. See ARCHITECTURE.md.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPlaceSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const place = await getPlace(slug);
  if (!place) return { title: "Not found", robots: { index: false, follow: true } };
  return buildPlaceMetadata(place, locale as Locale);
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  const place = await getPlace(slug);
  if (!place) notFound();

  const nav = await getPlaceNavigation(place);
  const { t } = riverTemperature(place.km, place.totalKm);

  // The mobile sticky CTA is context-aware: the book if this place is in one,
  // otherwise the next place downstream.
  const bookSlug = place.appearsInBooks?.find((a) => a.book?.slug)?.book?.slug;
  const sticky = bookSlug
    ? {
        label: typedLocale === "hi" ? "प्रकाशन प्राप्त करें" : "Acquire the publication",
        href: `/${typedLocale}/library/${bookSlug}`,
      }
    : nav.next
      ? {
          label: `${typedLocale === "hi" ? "आगे" : "Continue"} · ${resolveLocale(nav.next.title, typedLocale)}`,
          href: `/${typedLocale}/places/${nav.next.slug}`,
        }
      : null;

  return (
    <div style={temperatureStyle(place.km, place.totalKm)}>
      <JsonLd data={placeJsonLd(place, typedLocale)} />

      <Breadcrumb locale={typedLocale} reachName={place.reach?.name} placeName={place.title} />

      <main>
        <PlaceHero place={place} locale={typedLocale} t={t} />
        <PlaceEssay essay={place.essay} km={place.km} locale={typedLocale} />
        <WitnessPeak witnesses={place.witnesses} km={place.km} locale={typedLocale} />
        <BookDeepLink appearances={place.appearsInBooks} locale={typedLocale} />
        <FaceConnections place={place} locale={typedLocale} />
        <ArchiveLayer archiveLayer={place.archiveLayer} km={place.km} locale={typedLocale} />
        <SourceOceanNav prev={nav.prev} next={nav.next} locale={typedLocale} />
        <JourneyRails sameStage={nav.sameStage} nextStage={nav.nextStage} locale={typedLocale} />
      </main>

      {sticky && <MobileStickyCta label={sticky.label} href={sticky.href} />}
    </div>
  );
}
