import Link from "next/link";

import { WING_FRAMING, WING_LABELS, WINGS } from "@/lib/face";
import type { Locale } from "@/lib/i18n";

/**
 * Block 6 — FACE GANGA (secondary). The cultural "why" that justifies the book:
 * one quiet curatorial row of four wings, never four competing doors.
 */
const COPY: Record<Locale, { kicker: string; title: string; cta: string }> = {
  en: {
    kicker: "FACE Ganga · the why, threaded through the archive",
    title: "Festivals · Art · Craft · Environment.",
    cta: "Enter FACE Ganga →",
  },
  hi: {
    kicker: "फेस गंगा · क्यों, अभिलेख में पिरोया",
    title: "उत्सव · कला · शिल्प · पर्यावरण।",
    cta: "फेस गंगा में प्रवेश →",
  },
};

export function HomeFace({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  return (
    <section className="relative border-t border-stone py-16 md:py-20">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12 lg:px-24">
        <p className="t-label text-slate-light">{c.kicker}</p>

        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {WINGS.map((wing) => (
            <li key={wing}>
              <Link href={`/${locale}/face-ganga`} className="klink block">
                <span className="font-display text-2xl text-ink">{WING_LABELS[wing][locale]}</span>
                <span className="t-body mt-2 block text-slate-light">{WING_FRAMING[wing][locale]}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link href={`/${locale}/face-ganga`} className="t-label klink text-slate">
            {c.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
