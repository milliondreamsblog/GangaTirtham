import Link from "next/link";

import { PlateImage } from "@/components/media/PlateImage";
import { ObjectLabel } from "@/components/place/ObjectLabel";
import type { Locale } from "@/lib/i18n";
import type { PlaceNavRef } from "@/lib/types";

/** A place card — graded plate (km tone) + object-label. The atomic tile of the
 *  collection and the related rails. Stubs are marked honestly. */
export function PlaceTile({
  place,
  locale,
  sizes = "(max-width: 905px) 50vw, 22vw",
}: {
  place: PlaceNavRef;
  locale: Locale;
  sizes?: string;
}) {
  return (
    <Link href={`/${locale}/places/${place.slug}`} className="tile group block">
      <div className="relative">
        <PlateImage image={undefined} km={place.km ?? 0} locale={locale} aspect="4/5" sizes={sizes} />
        {place.tier === "stub" && (
          <span className="t-micro absolute left-3 top-3 text-slate-light">
            {locale === "hi" ? "दस्तावेज़ में" : "in documentation"}
          </span>
        )}
      </div>
      <div className="mt-4">
        <ObjectLabel
          title={place.title}
          locale={locale}
          km={place.km ?? 0}
          reachName={place.reach?.name}
          size="sm"
        />
      </div>
    </Link>
  );
}
