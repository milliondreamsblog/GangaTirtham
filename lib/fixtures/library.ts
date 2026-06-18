import type { BookData } from "@/lib/types";

import { block } from "./blocks";

/** The Vessel — Volume I. A publication-of-record, never a SKU. */
export const gangatirthamVolI: BookData = {
  _id: "book.vol-i",
  title: { en: "Gangatirtham", hi: "गंगातीर्थम्" },
  subtitle: { en: "A river, in the hand · Volume I", hi: "एक नदी, हाथ में · खण्ड I" },
  slug: "gangatirtham-vol-i",
  sku: "GT-VOL-I",
  edition: "First · No. 0147",
  format: "245 × 310 mm",
  priceINR: 6800,
  description: {
    en: [
      block(
        "The website opens the river. The book keeps her. Everything the archive walks you through — every hour, every place, every name — is held, still, between these covers: the reported scenes, the named voices, the plates made where the light was real.",
      ),
      block(
        "It is issued as an edition, not a print run — each copy numbered, Smyth-sewn, and signed into a register. The endpaper is the river itself, drawn once in gold foil from Gaumukh to the sea.",
      ),
    ],
  },
  specs: [
    { label: { en: "Edition" }, value: { en: "First · No. 0147" } },
    { label: { en: "Format" }, value: { en: "245 × 310 mm" } },
    { label: { en: "Printing" }, value: { en: "Letterpress + offset plates" } },
    { label: { en: "Binding" }, value: { en: "Smyth-sewn, cloth over board" } },
    { label: { en: "Paper" }, value: { en: "Handmade rag, Khadi tooth" } },
    { label: { en: "Endpaper" }, value: { en: "Gold-foil river map" } },
  ],
  // The ToC IS the 8-stage arc, frontispiece → horizon. journeyStage is explicit
  // per chapter (a chapter can span places, so it is never km-derived). Place
  // deep-links point only to anchor places that exist; the rest are forthcoming.
  tableOfContents: [
    {
      title: { en: "The Glacier's Mouth", hi: "हिमनद का मुख" },
      journeyStage: 1,
      plate: "II",
      page: 14,
    },
    {
      title: { en: "Where Two Waters Meet", hi: "जहाँ दो धाराएँ मिलती हैं" },
      journeyStage: 2,
      plate: "V",
      page: 38,
    },
    {
      title: { en: "The First Hands", hi: "पहले हाथ" },
      journeyStage: 3,
      plate: "IX",
      page: 66,
    },
    {
      title: { en: "The Great Confluence", hi: "महासंगम" },
      journeyStage: 4,
      plate: "XII",
      page: 110,
      places: [{ title: { en: "Prayagraj · Sangam", hi: "प्रयागराज" }, slug: "prayagraj", km: 1230 }],
    },
    {
      title: { en: "The City of Light", hi: "प्रकाश की नगरी" },
      journeyStage: 5,
      plate: "XVI",
      page: 152,
      places: [{ title: { en: "Kashi", hi: "काशी" }, slug: "varanasi", km: 1384 }],
    },
    {
      title: { en: "The Working River", hi: "कामकाजी नदी" },
      journeyStage: 6,
      plate: "XXI",
      page: 196,
      places: [
        { title: { en: "Patna", hi: "पटना" }, slug: "patna", km: 1700 },
        { title: { en: "Bhagalpur", hi: "भागलपुर" }, slug: "bhagalpur", km: 1950 },
      ],
    },
    {
      title: { en: "The Chained River", hi: "बँधी हुई नदी" },
      journeyStage: 7,
      plate: "XXV",
      page: 240,
      places: [{ title: { en: "Farakka", hi: "फरक्का" }, slug: "farakka", km: 2200 }],
    },
    {
      title: { en: "Given to the Sea", hi: "सागर को अर्पित" },
      journeyStage: 8,
      plate: "XXX",
      page: 286,
    },
  ],
  seo: { noindex: false },
};

export const FIXTURE_BOOKS: BookData[] = [gangatirthamVolI];
