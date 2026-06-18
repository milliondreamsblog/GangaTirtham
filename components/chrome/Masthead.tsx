import Link from "next/link";

import type { Locale } from "@/lib/i18n";

import { LocaleSwitch } from "./LocaleSwitch";

const STRINGS: Record<Locale, { collection: string; face: string; book: string; sankalp: string }> = {
  en: { collection: "The Collection", face: "FACE Ganga", book: "The Vessel", sankalp: "Sankalp" },
  hi: { collection: "संग्रह", face: "फेस गंगा", book: "पात्र", sankalp: "संकल्प" },
};

/** The masthead — inscriptional wordmark + the four wings + locale switch. */
export function Masthead({ locale }: { locale: Locale }) {
  const t = STRINGS[locale] ?? STRINGS.en;
  const base = `/${locale}`;

  return (
    <header className="relative z-30 border-b border-stone">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6 md:px-12 lg:px-24">
        <Link href={base} className="t-label tracking-[0.2em] text-ink">
          <span lang="hi" className="font-deva">
            गंगातीर्थम्
          </span>{" "}
          · GANGATIRTHAM
        </Link>

        <nav className="t-label hidden items-center gap-9 text-slate md:flex">
          <Link href={`${base}/places`} className="klink">
            {t.collection}
          </Link>
          <Link href={`${base}/face-ganga`} className="klink">
            {t.face}
          </Link>
          <Link href={`${base}/library`} className="klink">
            {t.book}
          </Link>
          <Link href={`${base}/sankalp`} className="klink">
            {t.sankalp}
          </Link>
        </nav>

        <LocaleSwitch active={locale} />
      </div>
    </header>
  );
}
