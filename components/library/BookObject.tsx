import { PlateImage } from "@/components/media/PlateImage";
import type { Locale } from "@/lib/i18n";
import type { GtImageData, LocaleValue } from "@/lib/types";

/**
 * The book as an object — a foil-keyline spine (no asset needed) or the real
 * cover plate. Foil is the book's alone: 1px keyline, never a fill.
 */
export function BookObject({
  title,
  coverImage,
  locale,
  size = "lg",
}: {
  title?: LocaleValue;
  coverImage?: GtImageData;
  locale: Locale;
  size?: "sm" | "lg";
}) {
  if (coverImage?.asset?.url) {
    return (
      <PlateImage
        image={coverImage}
        km={2525}
        locale={locale}
        aspect="3/4"
        sizes={size === "lg" ? "(max-width: 905px) 70vw, 28vw" : "(max-width: 905px) 40vw, 16vw"}
      />
    );
  }

  const dims =
    size === "lg" ? "h-[320px] w-[224px] md:h-[408px] md:w-[290px]" : "h-[228px] w-[160px]";

  return (
    <div className={`book relative flex ${dims} flex-col items-center justify-end p-6`}>
      <div className="foil-rule-v absolute top-8 bottom-8 left-6" aria-hidden="true" />
      {title?.hi && (
        <p lang="hi" className="foil-text font-deva text-2xl md:text-3xl">
          {title.hi}
        </p>
      )}
      <p className="foil-text t-label mt-2">
        {(title?.en || "GANGATIRTHAM").toUpperCase()}
      </p>
    </div>
  );
}
