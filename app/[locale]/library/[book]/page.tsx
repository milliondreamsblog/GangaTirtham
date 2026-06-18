import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { toRoman } from "@/components/journey/roman";
import { stageA11yLabel } from "@/components/journey/stageA11y";
import { BookObject } from "@/components/library/BookObject";
import { PortableText } from "@/components/portable/PortableText";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBook, getBookSlugs } from "@/lib/data/books";
import { isLocale, locales, resolveLocale, type Locale } from "@/lib/i18n";
import { getJourneyStage } from "@/lib/journey";
import { bookJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { CONTACT_EMAIL } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getBookSlugs();
  return locales.flatMap((locale) => slugs.map((book) => ({ locale, book })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; book: string }>;
}): Promise<Metadata> {
  const { locale, book: slug } = await params;
  if (!isLocale(locale)) return {};
  const book = await getBook(slug);
  if (!book) return { title: "Not found", robots: { index: false, follow: true } };
  const typed = locale as Locale;
  return buildMetadata({
    title: resolveLocale(book.title, typed),
    description: resolveLocale(book.subtitle, typed),
    path: `/library/${slug}`,
    locale: typed,
    ogImage: book.coverImage?.asset?.url,
  });
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string; book: string }>;
}) {
  const { locale, book: slug } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;

  const book = await getBook(slug);
  if (!book) notFound();

  const title = resolveLocale(book.title, typed);
  const description = book.description?.[typed] ?? book.description?.en;
  const reserveSubject = encodeURIComponent(`Reserve · ${title} (${book.edition ?? ""})`.trim());
  const reserveHref = `mailto:${CONTACT_EMAIL}?subject=${reserveSubject}`;

  return (
    <main>
      <JsonLd data={bookJsonLd(book, typed)} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1320px] px-6 pt-6 md:px-12 lg:px-24">
        <ol className="t-micro flex flex-wrap items-center gap-x-2 text-slate-light">
          <li>
            <Link href={`/${typed}`} className="klink">
              {typed === "hi" ? "मुख" : "Home"}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href={`/${typed}/library`} className="klink">
              {typed === "hi" ? "पात्र" : "The Library"}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-ink">{title}</li>
        </ol>
      </nav>

      {/* the Vessel */}
      <section className="mx-auto max-w-[1320px] px-6 py-12 md:px-12 lg:px-24 lg:py-16">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="order-2 flex justify-center lg:order-1 lg:col-span-5">
            <BookObject title={book.title} coverImage={book.coverImage} locale={typed} size="lg" />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <p className="t-label text-slate-light">
              {typed === "hi" ? "पात्र · रिकॉर्ड का प्रकाशन" : "The Vessel · a publication of record"}
            </p>
            {book.title?.hi && (
              <p lang="hi" className="font-deva mt-6 text-3xl text-ink md:text-4xl">
                {book.title.hi}
              </p>
            )}
            <h1 className="t-h2 font-display mt-1 text-ink">{title}</h1>
            {book.subtitle && (
              <p className="t-lede mt-4 text-slate">{resolveLocale(book.subtitle, typed)}</p>
            )}

            {description && (
              <div className="mt-7 max-w-[52ch]">
                <PortableText value={description} km={2525} locale={typed} />
              </div>
            )}

            {book.specs && book.specs.length > 0 && (
              <dl className="label-row mt-9 grid max-w-[44ch] grid-cols-2 gap-x-10 gap-y-4">
                {book.specs.map((spec, i) => (
                  <div key={i}>
                    <dt className="text-slate-light">{resolveLocale(spec.label, typed)}</dt>
                    <dd className="mt-1 text-ink">{resolveLocale(spec.value, typed)}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-5">
              <a href={reserveHref} className="inline-flex flex-col">
                <span className="font-display text-xl text-ink">
                  {typed === "hi" ? "एक प्रति आरक्षित करें" : "Reserve a copy"}
                </span>
                <span className="foil-rule mt-1.5 w-full" aria-hidden="true" />
              </a>
              {book.priceINR && (
                <span className="t-micro text-slate-light">
                  {typed === "hi" ? "एक संस्करण, मुद्रण नहीं" : "An edition, not a print run"} · ₹
                  {book.priceINR.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <p className="t-micro mt-4 text-slate-light">
              {typed === "hi"
                ? "अधिग्रहण आरक्षण द्वारा · पूर्ण भुगतान शीघ्र खुलता है"
                : "Acquisition by reservation · full checkout opens shortly"}
            </p>
          </div>
        </div>
      </section>

      {/* table of contents — deep-links into the river */}
      {book.tableOfContents && book.tableOfContents.length > 0 && (
        <section className="border-t border-stone py-16 md:py-20">
          <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
            <p className="t-label text-slate-light">
              {typed === "hi" ? "विषय-सूची · नदी में प्रवेश" : "Table of plates · enter the river"}
            </p>
            <ul className="mt-8 divide-y divide-stone">
              {book.tableOfContents.map((entry, i) => {
                const stage = entry.journeyStage ? getJourneyStage(entry.journeyStage) : undefined;
                return (
                <li key={i} className="py-6">
                  {/* the stage eyebrow — the ToC reads as the 8-stage arc, frontispiece
                      → horizon. Archival metadata, monochrome numeral (no temperature
                      accent on the book); stage title sourced only from getJourneyStage. */}
                  {stage && entry.journeyStage && (
                    <p className="label-row mb-2 text-slate-light" style={{ textTransform: "none" }}>
                      <span aria-hidden="true">
                        {toRoman(entry.journeyStage)} · {stage.copy[typed].title}
                      </span>
                      <span className="sr-only">{stageA11yLabel(entry.journeyStage, typed)}</span>
                    </p>
                  )}
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="font-display text-xl text-ink">{resolveLocale(entry.title, typed)}</h2>
                    <span className="label-row">
                      {[entry.plate ? `${typed === "hi" ? "पट्ट" : "Plate"} ${entry.plate}` : null, entry.page ? `p. ${entry.page}` : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </div>
                  {entry.places && entry.places.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                      {entry.places.map((place) => (
                        <Link
                          key={place.slug}
                          href={`/${typed}/places/${place.slug}`}
                          className="klink t-body text-slate"
                        >
                          {place.title?.hi && (
                            <span lang="hi" className="font-deva mr-1">
                              {place.title.hi}
                            </span>
                          )}
                          {resolveLocale(place.title, typed)}
                          {typeof place.km === "number" && (
                            <span className="t-micro text-slate-light"> · km {place.km.toLocaleString("en-IN")}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
