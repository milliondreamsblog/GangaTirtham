import {
  PortableText as PortableTextRenderer,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { PlateImage } from "@/components/media/PlateImage";
import type { GtImageData } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

/**
 * The editorial Portable Text renderer — maps blocks to the locked type scale.
 * Inline plates carry the same graded-plate fallback as the hero.
 */
function buildComponents(km: number, locale: Locale): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => <p className="t-body mt-6 max-w-[66ch] text-slate">{children}</p>,
      h2: ({ children }) => (
        <h2 className="t-h2 font-display mt-16 max-w-[24ch] text-ink">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="t-h3 font-display mt-12 text-ink">{children}</h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="font-display t-h3 mt-10 max-w-[42ch] border-l border-stone-deep pl-5 italic text-ink">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="t-body mt-6 max-w-[66ch] list-disc space-y-2 pl-6 text-slate">{children}</ul>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-medium text-ink">{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      link: ({ children, value }) => (
        <a href={value?.href} className="klink text-ink" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
    types: {
      gtImage: ({ value }: { value: GtImageData }) => (
        <div className="mt-10">
          <PlateImage image={value} km={km} locale={locale} aspect="3/2" showCaption />
        </div>
      ),
    },
  };
}

export function PortableText({
  value,
  km,
  locale,
}: {
  value: PortableTextBlock[];
  km: number;
  locale: Locale;
}) {
  return <PortableTextRenderer value={value} components={buildComponents(km, locale)} />;
}
