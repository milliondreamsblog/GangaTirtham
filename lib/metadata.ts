import type { Metadata } from "next";

import { siteUrl } from "@/lib/env";
import { locales, resolveLocale, type Locale } from "@/lib/i18n";
import type { PlaceData } from "@/lib/types";

/**
 * Localized canonical + hreflang alternates for a path. `path` is locale-less
 * (e.g. "/places/varanasi"). x-default points at English. See ARCHITECTURE.md.
 */
export function localizedAlternates(path: string, locale: Locale): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${siteUrl}/${l}${path}`;
  languages["x-default"] = `${siteUrl}/en${path}`;

  return {
    canonical: `${siteUrl}/${locale}${path}`,
    languages,
  };
}

/**
 * Generic page metadata — title/description, hreflang alternates, robots,
 * OpenGraph. Used by the secondary pages (library, sankalp, FACE, about).
 */
export function buildMetadata({
  title,
  description,
  path,
  locale,
  noindex = false,
  ogImage,
  type = "website",
}: {
  title: string;
  description?: string;
  path: string;
  locale: Locale;
  noindex?: boolean;
  ogImage?: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(path, locale),
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type,
      title,
      description,
      url: `${siteUrl}/${locale}${path}`,
      siteName: "Gangatirtham",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Metadata for a place page — title/description, hreflang, robots, OpenGraph. */
export function buildPlaceMetadata(place: PlaceData, locale: Locale): Metadata {
  const path = `/places/${place.slug}`;
  const name = resolveLocale(place.title, locale);
  const title = resolveLocale(place.seo?.metaTitle, locale) || name;
  const description = resolveLocale(place.seo?.metaDescription, locale) || resolveLocale(place.dek, locale);

  // Depth-tier SEO: stubs/forthcoming → noindex,follow until standard depth.
  const noindex = place.depthTier === "stub" || place.seo?.noindex === true;

  const ogImage = place.heroImage?.asset?.url;

  return {
    title,
    description,
    alternates: localizedAlternates(path, locale),
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${siteUrl}/${locale}${path}`,
      siteName: "Gangatirtham",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
