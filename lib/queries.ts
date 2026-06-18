import { groq } from "next-sanity";

/** Image projection — resolves the asset URL + LQIP + dimensions (no CLS). */
const IMAGE = groq`
  alt, caption, mode, credit, source,
  asset->{ "url": url, "lqip": metadata.lqip, "dimensions": metadata.dimensions }
`;

const NAV_REF = groq`
  title, "slug": slug.current, "km": riverPosition.km,
  reach->{ name, "slug": slug.current, segment },
  "tier": editorialOps.depthTier,
  journeyStage
`;

/** The full place projection — the keystone query. */
export const PLACE_QUERY = groq`
  *[_type == "place" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    dek,
    distinctTruth,
    "km": riverPosition.km,
    "totalKm": coalesce(riverPosition.river->totalKm, 2525),
    journeyStage,
    journeyStageSecondary,
    "coordinates": riverPosition.coordinates,
    "altitude": riverPosition.altitude,
    reach->{ name, "slug": slug.current, segment },
    heroImage{ ${IMAGE} },
    gallery[]{ ${IMAGE} },
    essay,
    archiveLayer,
    witnesses[]->{
      name, work, quote,
      "consent": { "obtained": consent.obtained, "scope": consent.scope },
      portrait{ ${IMAGE} }
    },
    wings,
    relatedFestivals[]->{ _type, name, "slug": slug.current },
    relatedArt[]->{ _type, title, "slug": slug.current },
    relatedCraft[]->{ _type, title, "slug": slug.current },
    relatedEnvironment[]->{ _type, title, "slug": slug.current, register },
    appearsInBooks[]{
      plate, page, note,
      book->{ title, "slug": slug.current, sku, priceINR, edition, coverImage{ ${IMAGE} } }
    },
    "depthTier": editorialOps.depthTier,
    "state": editorialOps.state,
    "enStatus": editorialOps.i18n.en,
    "hiStatus": editorialOps.i18n.hi,
    seo
  }
`;

/** All place slugs — for generateStaticParams. */
export const PLACE_SLUGS_QUERY = groq`
  *[_type == "place" && defined(slug.current)].slug.current
`;

/**
 * Lateral navigation. `prev`/`next` are the geography spine (km-adjacent). The
 * stage rails are narrative movement: `sameStage` (linger in this mood) and
 * `nextStage` (cross into the next). Stage membership is resolved the universal
 * way — journeyStage ?? km-range — so no place needs an explicit stage; the
 * current/next stage km bounds are passed in (single source: lib/journey.ts).
 * `sameStage` also pulls inbound split places via journeyStageSecondary.
 */
export const PLACE_NAV_QUERY = groq`
  {
    "prev": *[_type == "place" && defined(slug.current) && riverPosition.km < $km]
      | order(riverPosition.km desc)[0]{ ${NAV_REF} },
    "next": *[_type == "place" && defined(slug.current) && riverPosition.km > $km]
      | order(riverPosition.km asc)[0]{ ${NAV_REF} },
    "sameStage": *[_type == "place" && defined(slug.current) && slug.current != $slug && (
        (riverPosition.km >= $startKm && riverPosition.km < $endKm && !defined(journeyStage))
        || journeyStage == $stage
        || journeyStageSecondary == $stage
      )] | order(riverPosition.km asc)[0...6]{ ${NAV_REF} },
    "nextStage": *[_type == "place" && defined(slug.current) && slug.current != $slug && (
        (riverPosition.km >= $nextStartKm && riverPosition.km < $nextEndKm && !defined(journeyStage))
        || journeyStage == $nextStage
      )] | order(riverPosition.km asc)[0...4]{ ${NAV_REF} }
  }
`;

/* ── M5: collection · library · sankalp · FACE · about ─────────────────────── */

// The source→ocean spine: every reach, its places ordered by km.
export const COLLECTION_QUERY = groq`
  *[_type == "reach" && defined(slug.current)] | order(order asc){
    name, "slug": slug.current, segment, order, "blurb": description,
    "places": *[_type == "place" && references(^._id) && defined(slug.current)]
      | order(riverPosition.km asc){ ${NAV_REF} }
  }
`;

// Library
export const BOOKS_LIST_QUERY = groq`
  *[_type == "book" && defined(slug.current)] | order(edition asc){
    title, subtitle, "slug": slug.current, edition, priceINR, coverImage{ ${IMAGE} }
  }
`;

export const BOOK_SLUGS_QUERY = groq`*[_type == "book" && defined(slug.current)].slug.current`;

const BOOK_PROJECTION = groq`
  _id, title, subtitle, "slug": slug.current, sku, edition, format, priceINR,
  description,
  coverImage{ ${IMAGE} },
  specs[]{ label, value },
  tableOfContents[]{
    title, journeyStage, plate, page,
    places[]->{ title, "slug": slug.current, "km": riverPosition.km }
  },
  contributors[]->{ name, role, "slug": slug.current },
  seo
`;

export const BOOK_QUERY = groq`*[_type == "book" && slug.current == $slug][0]{ ${BOOK_PROJECTION} }`;

// The featured book for the homepage — the first edition (price/edition CMS-driven).
export const FEATURED_BOOK_QUERY = groq`
  *[_type == "book" && defined(slug.current)] | order(edition asc)[0]{ ${BOOK_PROJECTION} }
`;

// Sankalp — the primary campaign (content only; the transaction is M6).
export const SANKALP_QUERY = groq`
  *[_type == "sankalpCampaign" && defined(slug.current)] | order(_createdAt asc)[0]{
    _id, title, "slug": slug.current, intention, story,
    tiers[]{ amount, label, sustains, recurring },
    goalAmountINR,
    image{ ${IMAGE} },
    targetPlace->{ title, "slug": slug.current },
    seo
  }
`;

// FACE — wing derived from _type; title from title|name; body from the type's field.
const FACE_TYPES = `["festival","art","craft","environmentalIssue"]`;
const FACE_WING = groq`select(
  _type == "festival" => "festivals",
  _type == "art" => "art",
  _type == "craft" => "craft",
  _type == "environmentalIssue" => "environment"
)`;

export const FACE_LIST_QUERY = groq`
  *[_type in ${FACE_TYPES} && defined(slug.current)]{
    _type, "slug": slug.current,
    "title": coalesce(title, name),
    "wing": ${FACE_WING},
    "summary": summary,
    register,
    "heroImage": images[0]{ ${IMAGE} },
    "km": relatedPlaces[0]->riverPosition.km,
    journeyStage
  } | order(wing asc)
`;

export const FACE_SLUGS_QUERY = groq`
  *[_type in ${FACE_TYPES} && defined(slug.current)]{
    "slug": slug.current, "wing": ${FACE_WING}
  }
`;

export const FACE_ENTITY_QUERY = groq`
  *[_type == $type && slug.current == $slug][0]{
    _id, _type, "slug": slug.current,
    "title": coalesce(title, name),
    "wing": ${FACE_WING},
    "summary": summary,
    register,
    journeyStage,
    "body": coalesce(body, description, process),
    "heroImage": images[0]{ ${IMAGE} },
    "km": relatedPlaces[0]->riverPosition.km,
    artist->{ name, role, "slug": slug.current },
    relatedPlaces[]->{ ${NAV_REF} },
    seo
  }
`;

// About — the institution + its contributors.
export const ABOUT_QUERY = groq`
  {
    "settings": *[_type == "siteSettings"][0]{
      "title": aboutTitle, mission, doctrine
    },
    "contributors": *[_type == "author" && defined(name)] | order(role asc){
      _id, name, role, "slug": slug.current, bio, portrait{ ${IMAGE} }
    }
  }
`;
