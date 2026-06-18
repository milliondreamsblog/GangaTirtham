import { resolveLocale, type Locale } from "@/lib/i18n";
import type { LocaleValue } from "@/lib/types";

/**
 * The museum object-label — the atomic component. Name primary (Devanagari soul
 * face above Latin), mono apparatus demoted (km · reach · temperature · coords).
 * The temperature tick is dual-encoded: the accent dot is always accompanied by
 * the km/place label, never hue alone. See DESIGN_SYSTEM.md.
 */
export function ObjectLabel({
  title,
  locale,
  km,
  reachName,
  coordinates,
  size = "lg",
}: {
  title?: LocaleValue;
  locale: Locale;
  km: number;
  reachName?: LocaleValue;
  coordinates?: { lat: number; lng: number } | null;
  size?: "sm" | "lg";
}) {
  const hi = title?.hi;
  const en = title?.en;
  const reach = resolveLocale(reachName, locale);
  const coords = coordinates
    ? `${coordinates.lat.toFixed(3)}°N · ${coordinates.lng.toFixed(3)}°E`
    : null;

  return (
    <div>
      {hi && (
        <p
          lang="hi"
          className={`font-deva leading-none text-ink ${size === "lg" ? "text-3xl md:text-4xl" : "text-xl"}`}
        >
          {hi}
        </p>
      )}
      {en && (
        <p className={`font-display text-ink ${size === "lg" ? "t-h3 mt-2" : "mt-1 text-lg"}`}>
          {en}
        </p>
      )}

      {/* apparatus rail — demoted mono, with the single temperature tick */}
      <div className="label-row mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block h-[7px] w-[7px] shrink-0 rounded-full"
            style={{ background: "var(--accent)" }}
            aria-hidden="true"
          />
          km&nbsp;{km.toLocaleString("en-IN")}
        </span>
        {reach && <span>{reach}</span>}
        {coords && <span className="hidden sm:inline">{coords}</span>}
      </div>
    </div>
  );
}
