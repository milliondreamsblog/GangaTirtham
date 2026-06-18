import { PlateImage } from "@/components/media/PlateImage";
import { resolveLocale, type Locale } from "@/lib/i18n";
import type { WitnessData } from "@/lib/types";

/**
 * THE WITNESS — the one emotional peak. A named, consented human voice, present
 * in the first person. Consent-gated: no consent (or withdrawn) → no peak; `anon`
 * keeps the words but withholds name and portrait. The writer is never more
 * visible than the person. See CONTENT_DOCTRINE.md.
 */
export function WitnessPeak({
  witnesses,
  km,
  locale,
}: {
  witnesses?: WitnessData[];
  km: number;
  locale: Locale;
}) {
  const witness = witnesses?.find(
    (w) => w.consent?.obtained && w.consent?.scope !== "withdrawn",
  );
  if (!witness) return null;

  const quote = resolveLocale(witness.quote, locale);
  if (!quote) return null;

  const isAnon = witness.consent?.scope === "anon";
  const showPortrait = !isAnon && Boolean(witness.portrait);

  return (
    <section
      className="relative py-20 md:py-28"
      style={{ background: "var(--color-alabaster)" }}
    >
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-6 md:px-12 lg:grid-cols-12 lg:gap-16 lg:px-24">
        {showPortrait && (
          <div className="lg:col-span-5">
            <PlateImage
              image={witness.portrait}
              km={km}
              locale={locale}
              aspect="4/5"
              sizes="(max-width: 905px) 100vw, 40vw"
            />
          </div>
        )}

        <div className={showPortrait ? "lg:col-span-7" : "lg:col-span-9 lg:col-start-2"}>
          <p className="t-label text-slate-light">{locale === "hi" ? "साक्षी" : "The witness"}</p>

          <blockquote className="mt-6">
            <p className="font-display max-w-[26ch] text-2xl leading-snug text-ink md:text-3xl">
              “{quote}”
            </p>
            <footer className="t-label mt-7 text-slate">
              {isAnon ? (
                <span>{locale === "hi" ? "नाम सुरक्षित" : "name withheld"}</span>
              ) : (
                <span className="text-ink">{witness.name}</span>
              )}
              {witness.work && <span className="text-slate-light"> · {witness.work}</span>}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
