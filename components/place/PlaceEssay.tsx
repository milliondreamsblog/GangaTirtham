import { PortableText } from "@/components/portable/PortableText";
import type { Locale } from "@/lib/i18n";
import type { LocalePortableText } from "@/lib/types";

/**
 * The place told — the essay, on the reading ground. Partial-translation
 * fallback: a HI page with no HI essay shows the EN-complete text (the chrome
 * stays localized). See CONTENT_DOCTRINE.md.
 */
export function PlaceEssay({
  essay,
  km,
  locale,
}: {
  essay?: LocalePortableText;
  km: number;
  locale: Locale;
}) {
  const blocks = essay?.[locale] ?? essay?.en ?? essay?.hi;
  if (!blocks || blocks.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24" style={{ background: "var(--color-reading)" }}>
      <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
        <div className="max-w-[66ch]">
          <PortableText value={blocks} km={km} locale={locale} />
        </div>
      </div>
    </section>
  );
}
