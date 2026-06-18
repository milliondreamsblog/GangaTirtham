import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "@/lib/env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a Sanity CDN image URL. Always pair with explicit width/height at the
 * call site (no CLS) and AVIF via `next/image`. See ARCHITECTURE.md perf budget.
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
