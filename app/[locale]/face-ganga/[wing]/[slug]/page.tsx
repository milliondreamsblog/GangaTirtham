import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PlateImage } from "@/components/media/PlateImage";
import { PortableText } from "@/components/portable/PortableText";
import { PlaceTile } from "@/components/sections/PlaceTile";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFaceEntity, getFaceSlugs } from "@/lib/data/face";
import { isFaceWing, WING_LABELS } from "@/lib/face";
import { isLocale, locales, resolveLocale, type Locale } from "@/lib/i18n";
import { faceEntityJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getFaceSlugs();
  return locales.flatMap((locale) => slugs.map(({ wing, slug }) => ({ locale, wing, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; wing: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, wing, slug } = await params;
  if (!isLocale(locale) || !isFaceWing(wing)) return {};
  const entity = await getFaceEntity(wing, slug);
  if (!entity) return { title: "Not found", robots: { index: false, follow: true } };
  const typed = locale as Locale;
  return buildMetadata({
    title: resolveLocale(entity.title, typed),
    description: resolveLocale(entity.summary, typed),
    path: `/face-ganga/${wing}/${slug}`,
    locale: typed,
    type: "article",
    ogImage: entity.heroImage?.asset?.url,
  });
}

export default async function FaceEntityPage({
  params,
}: {
  params: Promise<{ locale: string; wing: string; slug: string }>;
}) {
  const { locale, wing, slug } = await params;
  if (!isLocale(locale) || !isFaceWing(wing)) notFound();
  const typed = locale as Locale;

  const entity = await getFaceEntity(wing, slug);
  if (!entity) notFound();

  const title = resolveLocale(entity.title, typed);
  const summary = resolveLocale(entity.summary, typed);
  const body = entity.body?.[typed] ?? entity.body?.en;
  const km = entity.km ?? 0;

  return (
    <main>
      <JsonLd data={faceEntityJsonLd(entity, typed)} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1320px] px-6 pt-6 md:px-12 lg:px-24">
        <ol className="t-micro flex flex-wrap items-center gap-x-2 text-slate-light">
          <li>
            <Link href={`/${typed}`} className="klink">
              {typed === "hi" ? "मुख" : "Home"}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href={`/${typed}/face-ganga`} className="klink">
              FACE Ganga
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>{WING_LABELS[wing][typed]}</li>
          <li aria-hidden="true">›</li>
          <li className="text-ink">{title}</li>
        </ol>
      </nav>

      {/* arrival */}
      <section className="mx-auto grid max-w-[1320px] items-center gap-8 px-6 py-12 md:px-12 lg:grid-cols-12 lg:gap-14 lg:px-24 lg:py-16">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <p className="t-label text-slate-light">
            {`FACE Ganga · ${WING_LABELS[wing][typed]}`}
            {entity.register === "obituary" ? ` · ${typed === "hi" ? "श्रद्धांजलि" : "obituary"}` : ""}
          </p>
          <h1 className="mt-5 text-ink">
            {entity.title?.hi && (
              <span lang="hi" className="font-deva block text-3xl leading-none md:text-4xl">
                {entity.title.hi}
              </span>
            )}
            <span className="t-h1 font-display mt-2 block">{title}</span>
          </h1>
          {summary && <p className="t-lede mt-6 max-w-[46ch] text-slate">{summary}</p>}
          {entity.artist?.name && entity.artist.name !== "—" && (
            <p className="t-label mt-6 text-slate-light">
              {typed === "hi" ? "कलाकार" : "Artist"} · <span className="text-ink">{entity.artist.name}</span>
            </p>
          )}
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <PlateImage
            image={entity.heroImage}
            km={km}
            locale={typed}
            aspect="4/5"
            priority
            sizes="(max-width: 905px) 100vw, 40vw"
            className="h-[48vh] w-full sm:h-[54vh] lg:h-[64vh]"
            showCaption
          />
        </div>
      </section>

      {/* the telling */}
      {body && (
        <section className="py-12 md:py-16" style={{ background: "var(--color-reading)" }}>
          <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
            <div className="max-w-[66ch]">
              <PortableText value={body} km={km} locale={typed} />
            </div>
          </div>
        </section>
      )}

      {/* where it lives on the river */}
      {entity.relatedPlaces && entity.relatedPlaces.length > 0 && (
        <section className="border-t border-stone py-16 md:py-20">
          <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
            <p className="t-label text-slate-light">
              {typed === "hi" ? "नदी पर यह जहाँ बसता है" : "Where this lives on the river"}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
              {entity.relatedPlaces.map((place) => (
                <PlaceTile key={place.slug} place={place} locale={typed} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
