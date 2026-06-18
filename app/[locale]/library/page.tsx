import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/chrome/PageHeader";
import { BookObject } from "@/components/library/BookObject";
import { getBooks } from "@/lib/data/books";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const revalidate = 3600;

const COPY: Record<Locale, { kicker: string; deva: string; title: string; lede: string; empty: string }> = {
  en: {
    kicker: "The Vessel · a publication of the Ganga Collection",
    deva: "एक नदी, हाथ में।",
    title: "The river, made to hold.",
    lede: "The website opens the river; the book keeps her. Each volume is issued as an edition, not a print run — numbered, sewn, and entered into a register.",
    empty: "The first volume is in preparation.",
  },
  hi: {
    kicker: "पात्र · गंगा संग्रह का एक प्रकाशन",
    deva: "एक नदी, हाथ में।",
    title: "नदी, धारण के लिए।",
    lede: "वेबसाइट नदी को खोलती है; पुस्तक उसे संचित करती है। हर खण्ड एक संस्करण के रूप में जारी होता है, मुद्रण नहीं — अंकित, सिला हुआ, और पंजी में दर्ज।",
    empty: "पहला खण्ड तैयारी में है।",
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
  return buildMetadata({ title: c.title, description: c.lede, path: "/library", locale: locale as Locale });
}

export default async function LibraryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const c = COPY[typed];

  const books = await getBooks();

  return (
    <main>
      <PageHeader kicker={c.kicker} deva={c.deva} title={c.title} lede={c.lede} />

      <div className="mx-auto max-w-[1320px] px-6 pt-10 pb-24 md:px-12 lg:px-24">
        {books.length === 0 ? (
          <p className="t-lede italic text-slate-light">{c.empty}</p>
        ) : (
          <ul className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <li key={book.slug}>
                <Link href={`/${typed}/library/${book.slug}`} className="tile group block">
                  <div className="flex justify-center">
                    <BookObject title={book.title} coverImage={book.coverImage} locale={typed} size="sm" />
                  </div>
                  <div className="mt-6">
                    <h2 className="font-display text-xl text-ink">
                      {book.title?.hi && (
                        <span lang="hi" className="font-deva mr-2">
                          {book.title.hi}
                        </span>
                      )}
                      {resolveLocale(book.title, typed)}
                    </h2>
                    {book.subtitle && (
                      <p className="t-body mt-1 text-slate-light">{resolveLocale(book.subtitle, typed)}</p>
                    )}
                    <p className="label-row mt-3">
                      {[book.edition, book.priceINR ? `₹${book.priceINR.toLocaleString("en-IN")}` : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
