import Link from "next/link";

import { BookObject } from "@/components/library/BookObject";
import { PlateImage } from "@/components/media/PlateImage";
import { resolveLocale, type Locale } from "@/lib/i18n";
import type { BookData } from "@/lib/types";

/**
 * Block 2 — The River Issue hero. River leads (col-7, the LCP + the screen's ONE
 * chromatic event: the glacial cold pole). The book is the SECOND fixation
 * (col-5, foil-keyline object). Primary "Order the Book" (foil underline, never a
 * pill) + secondary "Read Kashi". NO price, NO Waterline tick on this screen.
 */
const COPY: Record<Locale, { name: string; tagline: string; vessel: string; dek: string; order: string; read: string; edition: string }> = {
  en: {
    name: "Gangatirtham",
    tagline: "A book about the river Ganga — Vol. I of a documented descent, from the ice of Gaumukh to the open sea.",
    vessel: "The Vessel · Vol. I",
    dek: "गंगातीर्थम् — एक नदी, हाथ में।",
    order: "Order the Book",
    read: "Read Kashi →",
    edition: "An edition, not a print run",
  },
  hi: {
    name: "गंगातीर्थम्",
    tagline: "गंगा नदी पर एक पुस्तक — एक प्रलेखित अवतरण का खण्ड I, गौमुख की बर्फ़ से खुले सागर तक।",
    vessel: "पात्र · खण्ड I",
    dek: "गंगातीर्थम् — एक नदी, हाथ में।",
    order: "पुस्तक मँगाएँ",
    read: "काशी पढ़ें →",
    edition: "एक संस्करण, मुद्रण नहीं",
  },
};

export function HomeHero({ book, locale }: { book: BookData | null; locale: Locale }) {
  const c = COPY[locale];
  const bookHref = book?.slug ? `/${locale}/library/${book.slug}` : `/${locale}/library`;

  return (
    <section className="relative">
      <div className="mx-auto grid max-w-[1320px] items-center gap-8 px-6 pt-8 pb-12 md:px-12 lg:grid-cols-12 lg:gap-14 lg:px-24 lg:pt-10 lg:pb-16">
        {/* RIVER — col-7, the leading fixation + LCP + the one chromatic event */}
        <div className="relative order-1 lg:col-span-7">
          <PlateImage
            image={undefined}
            km={0}
            locale={locale}
            aspect="4/5"
            priority
            sizes="(max-width: 905px) 100vw, 58vw"
            className="h-[58vh] w-full sm:h-[64vh] lg:h-[78vh]"
          />
          {/* the name, set on the river's darkened reading edge */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <h1>
              <span
                lang="hi"
                className="font-deva block text-4xl leading-none md:text-6xl"
                style={{ color: "#F4F1EA", textShadow: "0 1px 18px rgba(20,17,13,.55)" }}
              >
                गंगातीर्थम्
              </span>
              <span
                className="t-h3 font-display mt-2 block"
                style={{ color: "#F4F1EA", textShadow: "0 1px 14px rgba(20,17,13,.5)" }}
              >
                {c.name}
              </span>
            </h1>
            <p
              className="t-micro mt-4"
              style={{ color: "#F4F1EA", textShadow: "0 1px 10px rgba(0,0,0,.5)" }}
            >
              {locale === "hi" ? "प्रथम स्पर्श · गौमुख · 3,892 मी" : "First touch · Gaumukh · 3,892 m"}
            </p>
          </div>
        </div>

        {/* BOOK — col-5, the second, quieter fixation */}
        <div className="order-2 lg:col-span-5">
          <p className="t-label text-slate-light">{c.vessel}</p>

          <div className="mt-5 flex items-end gap-6">
            <BookObject title={book?.title} coverImage={book?.coverImage} locale={locale} size="lg" />
            <p lang="hi" className="font-deva hidden max-w-[10ch] text-xl text-slate lg:block">
              {c.dek}
            </p>
          </div>

          <p className="t-lede mt-7 max-w-[42ch] text-slate">{c.tagline}</p>

          <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-4">
            <Link href={bookHref} className="inline-flex flex-col">
              <span className="font-display text-xl text-ink">{c.order}</span>
              <span className="foil-rule mt-1.5 w-full" aria-hidden="true" />
            </Link>
            <Link href={`/${locale}/places/varanasi`} className="t-label klink text-slate">
              {c.read}
            </Link>
          </div>
          <p className="t-micro mt-4 text-slate-light">{c.edition}</p>
        </div>
      </div>
    </section>
  );
}
