import Link from "next/link";

import { resolveLocale, type Locale } from "@/lib/i18n";
import type { BookAppearanceData } from "@/lib/types";

/**
 * "This place lives in the book." The reader→buyer conversion — placed after the
 * peak, never in the hero or chrome. Foil is the book's alone, rendered as a 1px
 * keyline, never a fill. See PROJECT_HANDOFF.md ("The Vessel").
 */
export function BookDeepLink({
  appearances,
  locale,
}: {
  appearances?: BookAppearanceData[];
  locale: Locale;
}) {
  const appearance = appearances?.find((a) => a.book?.slug);
  const book = appearance?.book;
  if (!book) return null;

  const title = resolveLocale(book.title, locale);
  const titleHi = book.title?.hi;
  const href = `/${locale}/library/${book.slug}`;
  const apparatus = [
    appearance?.plate ? `${locale === "hi" ? "पट्ट" : "Plate"} ${appearance.plate}` : null,
    appearance?.page ? `p. ${appearance.page}` : null,
    book.edition,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* the object — a foil-keyline spine (no asset needed) */}
          <div className="order-2 flex justify-center lg:order-1 lg:col-span-4">
            <div className="book flex h-[300px] w-[210px] flex-col items-center justify-end p-6 md:h-[340px] md:w-[240px]">
              <div className="foil-rule-v absolute top-8 bottom-8 left-6" aria-hidden="true" />
              {titleHi && (
                <p lang="hi" className="foil-text font-deva text-2xl">
                  {titleHi}
                </p>
              )}
              <p className="foil-text t-label mt-2">{(title || "GANGATIRTHAM").toUpperCase()}</p>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-8">
            <p className="t-label text-slate-light">
              {locale === "hi" ? "यह स्थान पुस्तक में बसता है" : "This place lives in the book"}
            </p>

            {appearance?.note && (
              <p className="font-display mt-6 max-w-[40ch] text-2xl italic leading-snug text-ink">
                {appearance.note}
              </p>
            )}

            <p className="label-row mt-6">{apparatus}</p>

            <div className="mt-9 flex flex-wrap items-end gap-x-12 gap-y-5">
              <Link href={href} className="inline-flex flex-col">
                <span className="font-display text-xl text-ink">
                  {locale === "hi" ? "प्रकाशन प्राप्त करें" : "Acquire the publication"}
                </span>
                <span className="foil-rule mt-1.5 w-full" aria-hidden="true" />
              </Link>
              {book.priceINR && (
                <span className="t-micro text-slate-light">
                  {locale === "hi" ? "एक संस्करण, मुद्रण नहीं" : "An edition, not a print run"} · ₹
                  {book.priceINR.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
