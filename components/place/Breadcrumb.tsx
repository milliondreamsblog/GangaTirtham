import Link from "next/link";

import { resolveLocale, type Locale } from "@/lib/i18n";
import type { LocaleValue } from "@/lib/types";

/** Home › Collection › Reach › Place. Mirrors the BreadcrumbList JSON-LD. */
export function Breadcrumb({
  locale,
  reachName,
  placeName,
}: {
  locale: Locale;
  reachName?: LocaleValue;
  placeName?: LocaleValue;
}) {
  const collection = locale === "hi" ? "संग्रह" : "The Collection";
  const reach = resolveLocale(reachName, locale);
  const place = resolveLocale(placeName, locale);

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-[1320px] px-6 pt-6 md:px-12 lg:px-24">
      <ol className="t-micro flex flex-wrap items-center gap-x-2 text-slate-light">
        <li>
          <Link href={`/${locale}`} className="klink">
            {locale === "hi" ? "मुख" : "Home"}
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li>
          <Link href={`/${locale}/places`} className="klink">
            {collection}
          </Link>
        </li>
        {reach && (
          <>
            <li aria-hidden="true">›</li>
            <li>{reach}</li>
          </>
        )}
        <li aria-hidden="true">›</li>
        <li className="text-ink">{place}</li>
      </ol>
    </nav>
  );
}
