/**
 * Seed data — the spine. One river (Ganga) and its five reaches, Source → Delta.
 * Deterministic _ids make the seed idempotent (createOrReplace). Places, books,
 * FACE seeds, and the sankalp campaign come later (editorial track). km bounds
 * follow CONTENT_DOCTRINE.md's flagship anchors.
 */

export type SeedDoc = Record<string, unknown> & { _id: string; _type: string };

export const RIVER_ID = "river.ganga";

const ref = (id: string) => ({ _type: "reference", _ref: id });
const ls = (hi: string, en: string) => ({ _type: "localeString", hi, en });
const lt = (hi: string, en: string) => ({ _type: "localeText", hi, en });
const slug = (current: string) => ({ _type: "slug", current });

export const riverGanga: SeedDoc = {
  _id: RIVER_ID,
  _type: "river",
  name: ls("गंगा", "Ganga"),
  slug: slug("ganga"),
  totalKm: 2525,
  sourceName: ls("गौमुख", "Gaumukh"),
  mouthName: ls("गंगा सागर", "Ganga Sagar"),
};

export const reaches: SeedDoc[] = [
  {
    _id: "reach.source",
    _type: "reach",
    name: ls("उद्गम", "The Source"),
    slug: slug("source"),
    river: ref(RIVER_ID),
    segment: "source",
    order: 1,
    startKm: 0,
    endKm: 250,
    description: lt(
      "हिमनद खंड — गौमुख से प्रथम संगमों तक। नदी का शीत-ध्रुव।",
      "The glacial reach — from the ice of Gaumukh to the first confluences. The cold pole of the river, where it is born and named.",
    ),
  },
  {
    _id: "reach.upper",
    _type: "reach",
    name: ls("ऊपरी गंगा", "Upper Ganga"),
    slug: slug("upper"),
    river: ref(RIVER_ID),
    segment: "upper",
    order: 2,
    startKm: 250,
    endKm: 800,
    description: lt(
      "जहाँ नदी पर्वत छोड़कर मैदान में उतरती है — ऋषिकेश, हरिद्वार।",
      "Where the river leaves the mountains and meets the plain — Rishikesh, Haridwar. The meltwater warms toward silt.",
    ),
  },
  {
    _id: "reach.middle",
    _type: "reach",
    name: ls("मध्य गंगा", "Middle Ganga"),
    slug: slug("middle"),
    river: ref(RIVER_ID),
    segment: "middle",
    order: 3,
    startKm: 800,
    endKm: 1600,
    description: lt(
      "महान संगम और दीप-नगरी — प्रयागराज, काशी। नदी का हृदय।",
      "The great confluence and the lamp-city — Prayagraj, Kashi. The pivot of the river, where silt becomes warmth.",
    ),
  },
  {
    _id: "reach.lower",
    _type: "reach",
    name: ls("निचली गंगा", "Lower Ganga"),
    slug: slug("lower"),
    river: ref(RIVER_ID),
    segment: "lower",
    order: 4,
    startKm: 1600,
    endKm: 2300,
    description: lt(
      "कामकाजी नदी — पटना, भागलपुर, फरक्का। चौड़ी, श्रमशील।",
      "The working river — Patna, Bhagalpur, Farakka. Wide and labouring, the Ganga few stop to worship.",
    ),
  },
  {
    _id: "reach.delta",
    _type: "reach",
    name: ls("मुहाना", "The Delta"),
    slug: slug("delta"),
    river: ref(RIVER_ID),
    segment: "delta",
    order: 5,
    startKm: 2300,
    endKm: 2525,
    description: lt(
      "जहाँ नदी नदी होना छोड़ देती है — सुंदरबन, गंगा सागर। उष्ण-ध्रुव।",
      "Where the river stops being a river — the Sundarbans, Ganga Sagar. The warm pole, where the water returns to the sea and the sky.",
    ),
  },
];

export const seedDocs: SeedDoc[] = [riverGanga, ...reaches];
