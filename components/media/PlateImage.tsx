import Image from "next/image";

import { plateTone } from "@/lib/temperature";
import type { GtImageData } from "@/lib/types";
import { resolveLocale, type Locale } from "@/lib/i18n";

/**
 * A graded plate. With a real Sanity asset it renders next/image (AVIF, explicit
 * dimensions, no CLS). Without one it degrades to the locked `.plate-*` gradient
 * — how the build proceeds before the shoots land. Identifiable-subject consent
 * is an editorial gate (CONTENT_DOCTRINE.md), not enforced here.
 */
export function PlateImage({
  image,
  km,
  locale,
  aspect = "4/5",
  priority = false,
  sizes = "(max-width: 905px) 100vw, 40vw",
  className = "",
  showCaption = false,
}: {
  image?: GtImageData;
  km: number;
  locale: Locale;
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  showCaption?: boolean;
}) {
  const tone = plateTone(km, image?.mode);
  const alt = resolveLocale(image?.alt, locale);
  const caption = resolveLocale(image?.caption, locale);
  const hasAsset = Boolean(image?.asset?.url);

  return (
    <figure
      className={`plate plate-${tone} ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {hasAsset && image?.asset ? (
        <Image
          src={image.asset.url}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          placeholder={image.asset.lqip ? "blur" : undefined}
          blurDataURL={image.asset.lqip}
          style={{ objectFit: "cover" }}
        />
      ) : null}

      {image?.mode === "archive" && (
        <figcaption className="t-micro absolute left-3 top-3" style={{ color: "#EDE8DE" }}>
          ▣ {locale === "hi" ? "अभिलेख" : "in documentation"}
        </figcaption>
      )}

      {showCaption && caption && (
        <figcaption
          className="t-micro absolute left-4 bottom-4"
          style={{ color: "#F4F1EA", textShadow: "0 1px 10px rgba(0,0,0,.5)" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
