import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader for the Sanity image CDN. The CDN serves AVIF/WebP via
 * `auto=format` and resizes via `w`, so we hand it the canonical asset URL plus
 * transform params — no double-optimization through Next. Wired in next.config.
 */
export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps): string {
  // Non-Sanity / relative srcs pass through untouched.
  if (!src.startsWith("https://cdn.sanity.io/")) return src;

  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}
