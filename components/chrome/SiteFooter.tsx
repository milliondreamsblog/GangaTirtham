import Link from "next/link";

import type { Locale } from "@/lib/i18n";

const STRINGS: Record<
  Locale,
  {
    blurb: string;
    walk: string;
    emailPlaceholder: string;
    collection: string;
    face: string;
    institution: string;
    book: string;
    sankalp: string;
    colophon: string;
  }
> = {
  en: {
    blurb: "The river open, and the river kept — a continuing documentation, published as each place is completed.",
    walk: "Walk with the river →",
    emailPlaceholder: "your email",
    collection: "The Collection",
    face: "FACE Ganga",
    institution: "The Institution",
    book: "The Vessel",
    sankalp: "Sankalp",
    colophon: "Edited by the Editor-in-Chief · photographed by the contributors",
  },
  hi: {
    blurb: "नदी खुली, और नदी संचित — एक सतत दस्तावेज़ीकरण, हर स्थान के पूर्ण होते ही प्रकाशित।",
    walk: "नदी के साथ चलें →",
    emailPlaceholder: "आपका ईमेल",
    collection: "संग्रह",
    face: "फेस गंगा",
    institution: "संस्था",
    book: "पात्र",
    sankalp: "संकल्प",
    colophon: "प्रधान संपादक द्वारा संपादित · योगदानकर्ताओं द्वारा चित्रित",
  },
};

/** The colophon footer — the standing index. Email capture is wired in M5. */
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = STRINGS[locale] ?? STRINGS.en;
  const base = `/${locale}`;

  return (
    <footer className="relative pt-20 pb-10" style={{ background: "#1A1714", color: "#EDE8DE" }}>
      <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p lang="hi" className="font-deva text-2xl" style={{ color: "#F4F1EA" }}>
              गंगातीर्थम् ✦
            </p>
            <p className="t-body mt-4 max-w-[34ch]" style={{ color: "#a39c90" }}>
              {t.blurb}
            </p>
            <form className="mt-7 flex max-w-[32ch] items-center gap-3 border-b pb-2" style={{ borderColor: "#3a332c" }}>
              <label htmlFor="footer-email" className="sr-only">
                {t.emailPlaceholder}
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder={t.emailPlaceholder}
                className="t-body flex-1 bg-transparent outline-none"
                style={{ color: "#EDE8DE" }}
              />
              <button type="submit" className="t-label klink" style={{ color: "#E0A458" }}>
                {t.walk}
              </button>
            </form>
          </div>

          <nav className="lg:col-span-2 lg:col-start-7">
            <p className="t-label" style={{ color: "#6f675c" }}>
              {t.collection}
            </p>
            <ul className="t-body mt-4 space-y-2.5" style={{ color: "#cfc7ba" }}>
              <li>
                <Link href={`${base}/places`} className="klink">
                  {STRINGS[locale].collection}
                </Link>
              </li>
              <li>
                <Link href={`${base}/places`} className="klink">
                  {locale === "hi" ? "सभी 75 स्थान" : "All 75 places"}
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-2">
            <p className="t-label" style={{ color: "#6f675c" }}>
              {t.face}
            </p>
            <ul className="t-body mt-4 space-y-2.5" style={{ color: "#cfc7ba" }}>
              <li>
                <Link href={`${base}/face-ganga`} className="klink">
                  {locale === "hi" ? "उत्सव" : "Festivals"}
                </Link>
              </li>
              <li>
                <Link href={`${base}/face-ganga`} className="klink">
                  {locale === "hi" ? "कला" : "Art"}
                </Link>
              </li>
              <li>
                <Link href={`${base}/face-ganga`} className="klink">
                  {locale === "hi" ? "शिल्प" : "Craft"}
                </Link>
              </li>
              <li>
                <Link href={`${base}/face-ganga`} className="klink">
                  {locale === "hi" ? "पर्यावरण" : "Environment"}
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-2">
            <p className="t-label" style={{ color: "#6f675c" }}>
              {t.institution}
            </p>
            <ul className="t-body mt-4 space-y-2.5" style={{ color: "#cfc7ba" }}>
              <li>
                <Link href={`${base}/library`} className="klink">
                  {STRINGS[locale].book}
                </Link>
              </li>
              <li>
                <Link href={`${base}/sankalp`} className="klink">
                  {STRINGS[locale].sankalp}
                </Link>
              </li>
              <li>
                <Link href={`${base}/about`} className="klink">
                  {locale === "hi" ? "परिचय" : "About"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className="t-micro mt-16 flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between"
          style={{ borderTop: "1px solid #2a2520", color: "#8a8378" }}
        >
          <span>{t.colophon}</span>
          <span>80G&nbsp;·&nbsp;GST&nbsp;·&nbsp;UPI&nbsp;·&nbsp;Razorpay</span>
          <span>
            EN&nbsp;·&nbsp;<span lang="hi">हि</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
