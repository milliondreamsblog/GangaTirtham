import { LampField } from "@/components/sankalp/LampField";
import { resolveLocale, type Locale } from "@/lib/i18n";
import type { SankalpData } from "@/lib/types";

/**
 * Block 7 — Sankalp (present, not dominant). The warm pole / dusk. Lamp Gold is
 * its alone (inscriptional, never a glow); sits after the book and the archive
 * so the contribution reads as "sustain the documentation", never the primary
 * ask. NEVER says "Donate." Carries id="home-sankalp" so the mobile Order sticky
 * suppresses over it.
 */
const COPY: Record<Locale, { kicker: string; deva: string; title: string; keep: string; standing: string; count: string; note: string }> = {
  en: {
    kicker: "This documentation exists because patrons keep it",
    deva: "एक दीप जलाएँ।",
    title: "Keep a lamp on the river.",
    keep: "Keep a lamp →",
    standing: "Keep a standing lamp →",
    count: "lamps kept along the river",
    note: "An offering that sustains the documentation of the next places · 80G receipt at confirmation",
  },
  hi: {
    kicker: "यह दस्तावेज़ीकरण संरक्षकों के कारण है",
    deva: "एक दीप जलाएँ।",
    title: "नदी पर एक दीप जलाएँ।",
    keep: "एक दीप जलाएँ →",
    standing: "एक अखंड दीप जलाएँ →",
    count: "दीप नदी पर जलते हैं",
    note: "एक भेंट जो अगले स्थानों के दस्तावेज़ीकरण को संभालती है · 80G रसीद पुष्टि पर",
  },
};

export function HomeSankalp({ sankalp, locale }: { sankalp: SankalpData | null; locale: Locale }) {
  const c = COPY[locale];
  const intention = resolveLocale(sankalp?.intention, locale);

  return (
    <section
      id="home-sankalp"
      className="relative py-24 md:py-32"
      style={{ background: "radial-gradient(130% 95% at 50% 0%, #2b211a 0%, #1a1410 72%)" }}
    >
      <div className="mx-auto max-w-[1320px] px-6 text-center md:px-12 lg:px-24">
        <p className="t-label" style={{ color: "#caa86f" }}>
          {c.kicker}
        </p>
        <p lang="hi" className="font-deva mt-7 text-3xl md:text-4xl" style={{ color: "#EDE8DE" }}>
          {c.deva}
        </p>
        <h2 className="t-h2 font-display mt-2" style={{ color: "#F4F1EA" }}>
          {c.title}
        </h2>
        {intention && (
          <p className="t-lede mx-auto mt-6 max-w-[46ch]" style={{ color: "#cfc7ba" }}>
            {intention}
          </p>
        )}

        <LampField
          initialCount={sankalp?.lampsKept ?? 0}
          keepLabel={c.keep}
          standingLabel={c.standing}
          countLabel={c.count}
        />

        <p className="t-micro mt-9" style={{ color: "#6f675c" }}>
          {c.note}
        </p>
      </div>
    </section>
  );
}
