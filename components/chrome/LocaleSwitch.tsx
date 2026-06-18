"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/lib/i18n";

/** Path-preserving locale switch (EN · हि). Swaps only the leading segment. */
export function LocaleSwitch({ active }: { active: Locale }) {
  const pathname = usePathname() || `/${active}`;
  const rest = pathname.replace(/^\/(hi|en)(?=\/|$)/, "") || "";

  return (
    <div className="t-label text-slate-light">
      {locales.map((locale, i) => {
        const href = `/${locale}${rest}`;
        const isActive = locale === active;
        return (
          <span key={locale}>
            {i > 0 && <span aria-hidden="true">&nbsp;·&nbsp;</span>}
            <Link
              href={href}
              hrefLang={locale}
              aria-current={isActive ? "true" : undefined}
              className={isActive ? "text-ink" : "klink text-stone-deep"}
            >
              <span lang={locale}>{locale === "hi" ? "हि" : "EN"}</span>
            </Link>
          </span>
        );
      })}
    </div>
  );
}
