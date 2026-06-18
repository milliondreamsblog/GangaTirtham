import Link from "next/link";

import { BookObject } from "@/components/library/BookObject";
import { resolveLocale, type Locale } from "@/lib/i18n";
import type { BookData } from "@/lib/types";

/**
 * Block 4 — What the Vessel Holds. The conversion deepener and the ONLY place a
 * price appears (CMS-driven: edition + ₹ come straight from the book document).
 * The museum-acquisition register is how "never a SKU" is performed; "Order the
 * Book" repeats here at peak intent as a foil underline, never a buy-pill.
 */
const COPY: Record<Locale, { kicker: string; lead: string; order: string; full: string; edition: string }> = {
  en: {
    kicker: "The Vessel · a publication of the Ganga Collection",
    lead: "The website opens the river. The book keeps her.",
    order: "Order the Book",
    full: "See the full edition →",
    edition: "an edition, not a print run",
  },
  hi: {
    kicker: "पात्र · गंगा संग्रह का एक प्रकाशन",
    lead: "वेबसाइट नदी को खोलती है। पुस्तक उसे संचित करती है।",
    order: "पुस्तक मँगाएँ",
    full: "पूर्ण संस्करण देखें →",
    edition: "एक संस्करण, मुद्रण नहीं",
  },
};

export function VesselRegister({ book, locale }: { book: BookData | null; locale: Locale }) {
  if (!book) return null;
  const c = COPY[locale];
  const href = `/${locale}/library/${book.slug}`;

  return (
    <section className="relative border-t border-stone py-16 md:py-24" style={{ background: "var(--color-alabaster)" }}>
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-6 md:px-12 lg:grid-cols-12 lg:gap-20 lg:px-24">
        <div className="order-2 flex justify-center lg:order-1 lg:col-span-5">
          <BookObject title={book.title} coverImage={book.coverImage} locale={locale} size="lg" />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <p className="t-label text-slate-light">{c.kicker}</p>
          {book.title?.hi && (
            <p lang="hi" className="font-deva mt-6 text-3xl text-ink md:text-4xl">
              {book.title.hi}
            </p>
          )}
          <h2 className="t-h2 font-display mt-1 text-ink">{resolveLocale(book.title, locale)}</h2>
          <p className="t-lede mt-5 max-w-[46ch] text-slate">{c.lead}</p>

          {book.specs && book.specs.length > 0 && (
            <dl className="label-row mt-9 grid max-w-[44ch] grid-cols-2 gap-x-10 gap-y-4">
              {book.specs.map((spec, i) => (
                <div key={i}>
                  <dt className="text-slate-light">{resolveLocale(spec.label, locale)}</dt>
                  <dd className="mt-1 text-ink">{resolveLocale(spec.value, locale)}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-5">
            <Link href={href} className="inline-flex flex-col">
              <span className="font-display text-xl text-ink">{c.order}</span>
              <span className="foil-rule mt-1.5 w-full" aria-hidden="true" />
            </Link>
            <Link href={href} className="t-label klink text-slate">
              {c.full}
            </Link>
          </div>

          {/* the ONE price on the whole homepage — CMS-driven */}
          {(book.priceINR || book.edition) && (
            <p className="t-micro mt-5 text-slate-light">
              {book.edition ? `${book.edition} · ` : ""}
              {c.edition}
              {book.priceINR ? ` · ₹${book.priceINR.toLocaleString("en-IN")}` : ""}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
