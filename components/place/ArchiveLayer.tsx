import { PortableText } from "@/components/portable/PortableText";
import type { Locale } from "@/lib/i18n";
import type { LocalePortableText } from "@/lib/types";

/**
 * The record deepens — the ARCHIVE layer (monochrome deep-time record,
 * scholarship). LIVE opens the page; ARCHIVE deepens it. Placed after the asks,
 * for the reader who stays. See CONTENT_DOCTRINE.md.
 */
export function ArchiveLayer({
  archiveLayer,
  km,
  locale,
}: {
  archiveLayer?: LocalePortableText;
  km: number;
  locale: Locale;
}) {
  const blocks = archiveLayer?.[locale] ?? archiveLayer?.en ?? archiveLayer?.hi;
  if (!blocks || blocks.length === 0) return null;

  return (
    <section className="relative border-t border-stone py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
        <p className="t-label text-slate-light">
          {locale === "hi" ? "अभिलेख · विवरण गहराता है" : "The record deepens · the archive"}
        </p>
        <div className="mt-6 max-w-[66ch] text-slate-light [&_p]:text-slate-light">
          <PortableText value={blocks} km={km} locale={locale} />
        </div>
      </div>
    </section>
  );
}
