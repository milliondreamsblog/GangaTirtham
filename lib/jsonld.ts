import { siteUrl } from "@/lib/env";
import { resolveLocale, type Locale } from "@/lib/i18n";
import type { BookData, FaceEntityData, PlaceData, ReachGroup, SankalpData } from "@/lib/types";

/** Shared BreadcrumbList builder. */
export function breadcrumbJsonLd(items: { name: string; item: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };
}

const home = (locale: Locale) => ({
  name: locale === "hi" ? "मुख" : "Home",
  item: `${siteUrl}/${locale}`,
});

/**
 * JSON-LD for a place page: Place/TouristAttraction (+ geo), BreadcrumbList,
 * Article (standard/flagship only — no thin content), and ImageGallery when
 * there are real plates. See ARCHITECTURE.md ("SEO architecture").
 */
export function placeJsonLd(place: PlaceData, locale: Locale): object[] {
  const url = `${siteUrl}/${locale}/places/${place.slug}`;
  const name = resolveLocale(place.title, locale);
  const description = resolveLocale(place.dek, locale);
  const reachName = resolveLocale(place.reach?.name, locale);
  const heroUrl = place.heroImage?.asset?.url;
  const galleryUrls = (place.gallery ?? [])
    .map((g) => g.asset?.url)
    .filter((u): u is string => Boolean(u));

  const graphs: object[] = [];

  // Place / TouristAttraction
  graphs.push({
    "@context": "https://schema.org",
    "@type": ["Place", "TouristAttraction"],
    name,
    description,
    url,
    ...(place.coordinates
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: place.coordinates.lat,
            longitude: place.coordinates.lng,
          },
        }
      : {}),
    containedInPlace: { "@type": "BodyOfWater", name: "Ganga" },
    ...(heroUrl ? { image: heroUrl } : {}),
  });

  // BreadcrumbList — Home › Collection › Reach › Place
  const crumbs = [
    { name: locale === "hi" ? "मुख" : "Home", item: `${siteUrl}/${locale}` },
    { name: locale === "hi" ? "संग्रह" : "The Collection", item: `${siteUrl}/${locale}/places` },
    ...(reachName ? [{ name: reachName, item: `${siteUrl}/${locale}/places` }] : []),
    { name, item: url },
  ];
  graphs.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  });

  // Article — only for real editorial depth (not stubs)
  if (place.depthTier !== "stub") {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: name,
      description,
      inLanguage: locale,
      about: { "@type": "Place", name },
      ...(heroUrl ? { image: heroUrl } : {}),
      author: { "@type": "Organization", name: "Gangatirtham" },
      publisher: {
        "@type": "Organization",
        name: "Gangatirtham",
        url: siteUrl,
      },
    });
  }

  // ImageGallery — only when there are real plates
  if (galleryUrls.length > 0) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name,
      url,
      image: galleryUrls,
    });
  }

  return graphs;
}

/** /places — the collection as a CollectionPage + ItemList of reaches. */
export function collectionJsonLd(reaches: ReachGroup[], locale: Locale): object[] {
  const url = `${siteUrl}/${locale}/places`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: locale === "hi" ? "संग्रह — स्रोत से सागर तक" : "The Collection — source to ocean",
      url,
      hasPart: reaches.flatMap((r) =>
        r.places.map((p) => ({
          "@type": "Place",
          name: resolveLocale(p.title, locale),
          url: `${siteUrl}/${locale}/places/${p.slug}`,
        })),
      ),
    },
    breadcrumbJsonLd([home(locale), { name: locale === "hi" ? "संग्रह" : "The Collection", item: url }]),
  ];
}

/** /library/[book] — Book + Offer (INR). Offer is metadata; checkout is M6. */
export function bookJsonLd(book: BookData, locale: Locale): object[] {
  const url = `${siteUrl}/${locale}/library/${book.slug}`;
  const name = resolveLocale(book.title, locale);
  const coverUrl = book.coverImage?.asset?.url;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Book",
      name,
      bookFormat: "https://schema.org/Hardcover",
      inLanguage: ["hi", "en"],
      url,
      ...(coverUrl ? { image: coverUrl } : {}),
      publisher: { "@type": "Organization", name: "Gangatirtham" },
      ...(book.priceINR
        ? {
            offers: {
              "@type": "Offer",
              price: book.priceINR,
              priceCurrency: "INR",
              availability: "https://schema.org/PreOrder",
              url,
              ...(book.sku ? { sku: book.sku } : {}),
            },
          }
        : {}),
    },
    breadcrumbJsonLd([
      home(locale),
      { name: locale === "hi" ? "पात्र" : "The Library", item: `${siteUrl}/${locale}/library` },
      { name, item: url },
    ]),
  ];
}

/** /face-ganga/[wing]/[slug] — Article about the place(s) it threads. */
export function faceEntityJsonLd(entity: FaceEntityData, locale: Locale): object[] {
  const url = `${siteUrl}/${locale}/face-ganga/${entity.wing}/${entity.slug}`;
  const name = resolveLocale(entity.title, locale);
  const imageUrl = entity.heroImage?.asset?.url;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: name,
      description: resolveLocale(entity.summary, locale),
      inLanguage: locale,
      url,
      ...(imageUrl ? { image: imageUrl } : {}),
      author: { "@type": "Organization", name: "Gangatirtham" },
      publisher: { "@type": "Organization", name: "Gangatirtham" },
    },
    breadcrumbJsonLd([
      home(locale),
      { name: "FACE Ganga", item: `${siteUrl}/${locale}/face-ganga` },
      { name, item: url },
    ]),
  ];
}

/** /sankalp — a WebPage. No Offer/DonateAction (intention, not charity; no money rail yet). */
export function sankalpJsonLd(sankalp: SankalpData, locale: Locale): object[] {
  const url = `${siteUrl}/${locale}/sankalp`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: resolveLocale(sankalp.title, locale),
      description: resolveLocale(sankalp.intention, locale),
      url,
      isPartOf: { "@type": "WebSite", name: "Gangatirtham", url: siteUrl },
    },
    breadcrumbJsonLd([home(locale), { name: "Sankalp", item: url }]),
  ];
}

/** Homepage — Organization + WebSite (SearchAction) + the featured Book/Offer. */
export function homeJsonLd(book: BookData | null, locale: Locale): object[] {
  const graphs: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Gangatirtham",
      url: siteUrl,
      description:
        "A digital cultural archive centred on the river Ganga, and the book Gangatirtham — a documented descent from the ice of Gaumukh to the open sea.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Gangatirtham",
      url: siteUrl,
      inLanguage: ["hi", "en"],
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/${locale}/places?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  if (book) graphs.push(...bookJsonLd(book, locale));
  return graphs;
}

/** /about — AboutPage + Organization. */
export function aboutJsonLd(locale: Locale, title: string): object[] {
  const url = `${siteUrl}/${locale}/about`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: title,
      url,
      about: {
        "@type": "Organization",
        name: "Gangatirtham",
        url: siteUrl,
        description:
          "A digital cultural archive centred on the river Ganga — documenting the sacred places source to ocean.",
      },
    },
    breadcrumbJsonLd([home(locale), { name: locale === "hi" ? "परिचय" : "About", item: url }]),
  ];
}
