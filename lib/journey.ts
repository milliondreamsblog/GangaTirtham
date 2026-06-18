import type { Locale } from "@/lib/i18n";
import type { FaceWing } from "@/lib/types";

/**
 * The Biography of a River — the 8-stage narrative spine. Not a river; a life.
 * This is the canonical taxonomy (single source of truth) consumed by BOTH the
 * frontend (the homepage Journey section) and the Sanity schema (`journeyStage`
 * field options + the km→stage derivation). Pure module — no server-only/React.
 *
 * `journeyStage` is to EMOTIONAL architecture what `riverPosition.km` is to
 * CHROMATIC architecture: one derived-but-confirmable axis carried by every
 * content type, so the whole product is organised by feeling, not by content
 * type. Karuna is exactly ONE beat (stage 7); the arc ends in release (stage 8).
 */

export interface JourneyStageCopy {
  title: string;
  summary: string; // ≤15 words — the river is the protagonist
  emotional: string;
  placeAnchor: string;
  bookConnection: string;
  faceConnection: string;
}

export interface JourneyStage {
  n: number;
  key: string;
  kmAnchor: number;
  placeSlug: string; // the chapter's place page slug
  faceWing: FaceWing;
  bookChapter: number;
  copy: Record<Locale, JourneyStageCopy>;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    n: 1,
    key: "birth",
    kmAnchor: 0,
    placeSlug: "gaumukh",
    faceWing: "environment",
    bookChapter: 1,
    copy: {
      en: {
        title: "Birth",
        summary: "She wakes in the glacier already knowing she will end — and begins anyway.",
        emotional: "Wonder, shadowed by mortality",
        placeAnchor: "Gaumukh",
        bookConnection: "Vol. I · Chapter 1",
        faceConnection: "Environment",
      },
      hi: {
        title: "जन्म",
        summary: "वह हिमनद में जागती है, अपने अंत को जानते हुए — और फिर भी आरम्भ करती है।",
        emotional: "विस्मय, मृत्यु की छाया में",
        placeAnchor: "गौमुख",
        bookConnection: "खण्ड I · अध्याय 1",
        faceConnection: "पर्यावरण",
      },
    },
  },
  {
    n: 2,
    key: "naming",
    kmAnchor: 230,
    placeSlug: "devprayag",
    faceWing: "art",
    bookChapter: 2,
    copy: {
      en: {
        title: "Naming",
        summary: "Where two waters meet she is given a name and becomes herself: Ganga.",
        emotional: "Quiet recognition",
        placeAnchor: "Devprayag",
        bookConnection: "Vol. I · Chapter 2",
        faceConnection: "Art",
      },
      hi: {
        title: "नामकरण",
        summary: "जहाँ दो धाराएँ मिलती हैं, उसे नाम मिलता है और वह बनती है — गंगा।",
        emotional: "मौन पहचान",
        placeAnchor: "देवप्रयाग",
        bookConnection: "खण्ड I · अध्याय 2",
        faceConnection: "कला",
      },
    },
  },
  {
    n: 3,
    key: "testing",
    kmAnchor: 320,
    placeSlug: "haridwar",
    faceWing: "festivals",
    bookChapter: 3,
    copy: {
      en: {
        title: "Testing",
        summary: "The first hands worship her and use her in the very same gesture.",
        emotional: "Clear-eyed love",
        placeAnchor: "Haridwar",
        bookConnection: "Vol. I · Chapter 3",
        faceConnection: "Festivals",
      },
      hi: {
        title: "परीक्षा",
        summary: "पहले हाथ उसी एक क्षण में उसकी पूजा भी करते हैं और उसका उपयोग भी।",
        emotional: "स्पष्ट-दृष्टि प्रेम",
        placeAnchor: "हरिद्वार",
        bookConnection: "खण्ड I · अध्याय 3",
        faceConnection: "उत्सव",
      },
    },
  },
  {
    n: 4,
    key: "gathering",
    kmAnchor: 1230,
    placeSlug: "prayagraj",
    faceWing: "festivals",
    bookChapter: 4,
    copy: {
      en: {
        title: "Gathering",
        summary: "The largest crowd on earth comes to her; she meets it as one face.",
        emotional: "Vast belonging",
        placeAnchor: "Prayagraj",
        bookConnection: "Vol. I · Chapter 4",
        faceConnection: "Festivals",
      },
      hi: {
        title: "सम्मिलन",
        summary: "पृथ्वी की सबसे बड़ी भीड़ उसके पास आती है; वह उसे एक चेहरे में मिलती है।",
        emotional: "विराट अपनापन",
        placeAnchor: "प्रयागराज",
        bookConnection: "खण्ड I · अध्याय 4",
        faceConnection: "उत्सव",
      },
    },
  },
  {
    n: 5,
    key: "reckoning",
    kmAnchor: 1384,
    placeSlug: "varanasi",
    faceWing: "art",
    bookChapter: 5,
    copy: {
      en: {
        title: "Reckoning",
        summary: "At her still centre, dying is the point — and she holds it without breaking.",
        emotional: "Grave peace",
        placeAnchor: "Kashi",
        bookConnection: "Vol. I · Chapter 5",
        faceConnection: "Art",
      },
      hi: {
        title: "लेखा-जोखा",
        summary: "उसके स्थिर केंद्र पर मृत्यु ही अर्थ है — और वह बिना टूटे उसे धारण करती है।",
        emotional: "गंभीर शांति",
        placeAnchor: "काशी",
        bookConnection: "खण्ड I · अध्याय 5",
        faceConnection: "कला",
      },
    },
  },
  {
    n: 6,
    key: "working-life",
    kmAnchor: 1700,
    placeSlug: "patna",
    faceWing: "craft",
    bookChapter: 6,
    copy: {
      en: {
        title: "Working Life",
        summary: "She rises the next morning and simply works, carrying a country that never thanks her.",
        emotional: "Unworshipped dignity",
        placeAnchor: "Patna",
        bookConnection: "Vol. I · Chapter 6",
        faceConnection: "Craft",
      },
      hi: {
        title: "कर्म-जीवन",
        summary: "वह अगली सुबह उठती है और बस काम करती है, एक देश को ढोती जो कभी धन्यवाद नहीं देता।",
        emotional: "अपूजित गरिमा",
        placeAnchor: "पटना",
        bookConnection: "खण्ड I · अध्याय 6",
        faceConnection: "शिल्प",
      },
    },
  },
  {
    n: 7,
    key: "wound",
    kmAnchor: 2200,
    placeSlug: "farakka",
    faceWing: "environment",
    bookChapter: 7,
    copy: {
      en: {
        title: "Wound",
        summary: "Here we put her in chains; the river that was a river begins to thin.",
        emotional: "Grief, held",
        placeAnchor: "Farakka",
        bookConnection: "Vol. I · Chapter 7",
        faceConnection: "Environment",
      },
      hi: {
        title: "घाव",
        summary: "यहाँ हम उसे ज़ंजीरों में बाँधते हैं; जो नदी थी वह क्षीण होने लगती है।",
        emotional: "शोक, संयत",
        placeAnchor: "फरक्का",
        bookConnection: "खण्ड I · अध्याय 7",
        faceConnection: "पर्यावरण",
      },
    },
  },
  {
    n: 8,
    key: "return",
    kmAnchor: 2525,
    placeSlug: "ganga-sagar",
    faceWing: "festivals",
    bookChapter: 8,
    copy: {
      en: {
        title: "Return",
        summary: "She widens past being a river at all — given back to the sea and sky.",
        emotional: "Release, homecoming",
        placeAnchor: "Ganga Sagar",
        bookConnection: "Vol. I · Chapter 8",
        faceConnection: "Festivals",
      },
      hi: {
        title: "वापसी",
        summary: "वह नदी होने से भी आगे फैल जाती है — सागर और आकाश को लौटा दी जाती है।",
        emotional: "मुक्ति, घर-वापसी",
        placeAnchor: "गंगा सागर",
        bookConnection: "खण्ड I · अध्याय 8",
        faceConnection: "उत्सव",
      },
    },
  },
];

/** Total stages. */
export const STAGE_COUNT = JOURNEY_STAGES.length;

/**
 * The km cut-points between the 8 stages — the SINGLE source of threshold values,
 * read by BOTH kmToStage and stageKmBounds (no duplicated boundaries). Each cut
 * sits at the midpoint between two anchor places. 7 cut-points → 8 stages.
 */
const STAGE_BOUNDARIES = [
  115, //  Birth (Gaumukh 0)            | Naming
  275, //  Naming (Devprayag 230)       | Testing
  775, //  Testing (Haridwar 320)       | Gathering
  1307, // Gathering (Prayagraj 1,230)  | Reckoning
  1542, // Reckoning (Kashi 1,384)      | Working Life
  2075, // Working Life (Patna 1,700 / Bhagalpur 1,950) | Wound
  2325, // Wound (Farakka 2,200)        | Return
] as const;

/**
 * Derive the journey stage from river km — monotonic, source→ocean. One chain:
 * km drives stage drives temperature (emotion can never reorder the locked descent).
 */
export function kmToStage(km: number): number {
  for (let i = 0; i < STAGE_BOUNDARIES.length; i++) {
    if (km < STAGE_BOUNDARIES[i]) return i + 1;
  }
  return 8;
}

/**
 * The universal stage-resolution rule, in ONE place: an explicit `journeyStage`
 * wins; otherwise stage is derived from km. The single implementation shared by
 * the place hero, the navigation rails, and the fixtures — so stage resolves
 * identically everywhere.
 */
export function resolveStage(journeyStage?: number, km?: number): number {
  return journeyStage ?? kmToStage(km ?? 0);
}

/**
 * The [startKm, endKm) span of a stage (1–8), from the same STAGE_BOUNDARIES as
 * kmToStage. Stage 8 is open-ended (endKm = Infinity). Used to assemble the
 * same-stage / next-stage rails without re-deriving any threshold.
 */
export function stageKmBounds(n: number): { startKm: number; endKm: number } {
  return {
    startKm: n <= 1 ? 0 : STAGE_BOUNDARIES[n - 2],
    endKm: n >= STAGE_COUNT ? Number.POSITIVE_INFINITY : STAGE_BOUNDARIES[n - 1],
  };
}

/** The obituary register (karuna) is permitted at exactly one stage. */
export const OBITUARY_STAGE = 7;

/**
 * Canonical accessor — the stage object for a stage number (1–8), or undefined.
 * The single lookup into JOURNEY_STAGES; callers never index the array directly.
 */
export function getJourneyStage(n: number): JourneyStage | undefined {
  return JOURNEY_STAGES.find((s) => s.n === n);
}
