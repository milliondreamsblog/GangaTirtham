import type { PlaceData } from "@/lib/types";

import { block } from "./blocks";

/**
 * Reference content — rendered through the production components when Sanity is
 * not yet connected (isSanityConfigured === false). Varanasi / Kashi is the
 * canonical exemplar (CONTENT_DOCTRINE.md). The witness here is an illustrative,
 * representative figure for the template — in production the EiC supplies a real,
 * consented person. Images are omitted on purpose: they degrade to the locked
 * graded plates, which is how the build proceeds before the shoots land.
 */

export const varanasi: PlaceData = {
  _id: "place.varanasi",
  title: { en: "Kashi", hi: "काशी" },
  slug: "varanasi",
  dek: {
    en: "In the city of light, people do not come to the river to look at it. They come to end beside it, and they call the ending a homecoming.",
    hi: "प्रकाश की नगरी में लोग नदी को देखने नहीं आते। वे उसके किनारे अंत के लिए आते हैं, और उस अंत को घर-वापसी कहते हैं।",
  },
  distinctTruth: "Where dying is the point — told without a flame.",
  km: 1384,
  totalKm: 2525,
  journeyStage: 5, // Reckoning · km 1384 → kmToStage
  coordinates: { lat: 25.3109, lng: 83.0107 },
  altitude: 80,
  reach: { name: { en: "Middle Ganga", hi: "मध्य गंगा" }, slug: "middle", segment: "middle" },  heroImage: {
    mode: "live",
    alt: {
      en: "A widow's hands folding a white shroud at first light on the ghat steps, the river behind out of focus.",
      hi: "घाट की सीढ़ियों पर पहली रोशनी में सफ़ेद कफ़न तह करती एक विधवा के हाथ।",
    },
    caption: { en: "First light · Manikarnika · the shroud, not the pyre", hi: "प्रातः प्रकाश · मणिकर्णिका" },
  },
  essay: {
    en: [
      block(
        "Before dawn the ghat is not a spectacle. It is a workplace. A man rinses a brass pot in the shallows and sets it to dry on a stone worn into a saddle by two hundred years of the same gesture. A boatman bails last night's rain from his hull with a cut plastic jug. Somewhere up the steps a kettle starts.",
      ),
      block(
        "This is Kashi, which the maps call Varanasi — the oldest answer the river gives to the oldest question. People come here to die. Not metaphorically. They arrive by train and by bus with a small bag and a son, and they take a room and they wait, because to die in Kashi, the city teaches, is to be released from the long arithmetic of return.",
      ),
      block(
        "Off Godowlia, behind a door that does not announce itself, a guesthouse has kept rooms for the dying since 1908. It has a name that means, plainly, the profit of Kashi. There is no fee. There is a register, a lamp, and a rule: you may stay while you are dying, and not a day longer. Most stay a fortnight. Some are sent home, recovered, faintly embarrassed, alive.",
      ),
      block(
        "Tourists photograph the fire. That is the easy image, and it is the wrong one. The fire is the last ten minutes of a thing that took eighty years. The truer image is upstream of it — the laundered shroud drying on a line, the barber who shaves the chief mourner's head, the woman who has sat with strangers in their final hour for longer than she can now count.",
      ),
      block(
        "The river here is wide and brown and unsentimental. It receives the city the way it has always received it: the marigolds and the ash, the soap and the prayer, the catch of the net and the body of the bull. It does not distinguish. That refusal to distinguish is, in Kashi, the whole of the comfort. The river will not flatter you and it will not refuse you.",
      ),
      block(
        "By the time the light is full the ghat has changed register again — the wrestlers, the postcard sellers, the boys who dive for coins. The dying happens quietly, behind the bright forecourt of the morning, the way it happens everywhere. Only here it is not hidden. Here it has an address, and a river, and a name that means coming home.",
      ),
    ],
  },
  archiveLayer: {
    en: [
      block(
        "Kashi is among the longest continuously inhabited cities on earth; the riverfront crescent of stone ghats took its present form largely in the eighteenth century, rebuilt by Maratha and Rajput patrons over far older steps. The city's name for itself — the City of Light — predates every empire that has tried to rename it.",
      ),
      block(
        "Its scholarship outlived its temples. For centuries the lanes behind the water held a manuscript culture and a school of music — the Banaras gharana — that treated sound, like the river, as something kept rather than owned.",
      ),
    ],
  },
  witnesses: [
    {
      name: "Shanti Devi",
      work: "Caretaker, a liberation guesthouse for the dying",
      quote: {
        en: "I have sat with people in their last hour for thirty years. Here they are not afraid. They believe they have reached home, and the river is the door. My work is only to keep the room clean and the lamp lit, so that no one arrives at the door in the dark.",
        hi: "तीस वर्षों से मैं लोगों के अंतिम क्षणों में उनके पास बैठी हूँ। यहाँ वे डरते नहीं। उन्हें विश्वास है कि वे घर पहुँच गए हैं, और नदी द्वार है।",
      },
      consent: { obtained: true, scope: "full" },
    },
  ],
  wings: ["art"],
  relatedArt: [
    { _type: "art", title: { en: "The Banaras Gharana", hi: "बनारस घराना" }, slug: "banaras-gharana" },
  ],
  relatedEnvironment: [
    {
      _type: "environmentalIssue",
      title: { en: "A thinning reach", hi: "घटती धारा" },
      slug: "thinning-reach",
      register: "obituary",
    },
  ],
  appearsInBooks: [
    {
      plate: "XII",
      page: 184,
      note: "“The river will not flatter you and it will not refuse you.”",
      book: {
        title: { en: "Gangatirtham", hi: "गंगातीर्थम्" },
        slug: "gangatirtham-vol-i",
        sku: "GT-VOL-I",
        priceINR: 6800,
        edition: "First · No. 0147",
      },
    },
  ],
  depthTier: "flagship",
  state: "published",
  enStatus: "final",
  hiStatus: "fallback",
  seo: { noindex: false },
};

export const prayagraj: PlaceData = {
  _id: "place.prayagraj",
  title: { en: "Prayagraj · Sangam", hi: "प्रयागराज" },
  slug: "prayagraj",
  dek: {
    en: "Where two visible rivers and one invisible one meet — and, every twelfth year, the largest gathering of human beings on earth.",
    hi: "जहाँ दो दृश्य नदियाँ और एक अदृश्य नदी मिलती हैं।",
  },
  distinctTruth: "The largest crowd on earth, told through one person.",
  km: 1230,
  totalKm: 2525,
  journeyStage: 4, // Gathering · km 1230 → kmToStage
  coordinates: { lat: 25.4225, lng: 81.8849 },
  reach: { name: { en: "Middle Ganga", hi: "मध्य गंगा" }, slug: "middle", segment: "middle" },  heroImage: {
    mode: "live",
    alt: { en: "A pilgrim's feet at the waterline of the confluence at dawn.", hi: "संगम के जल पर एक तीर्थयात्री के पैर।" },
    caption: { en: "The confluence · Sangam", hi: "संगम" },
  },
  essay: {
    en: [
      block(
        "The confluence is a colour change before it is anything else — the green Yamuna meeting the pale Ganga along a seam you can see from the bridge. The third river, the Saraswati, is said to join here unseen, and the unseen one is the reason the crowds come.",
      ),
      block(
        "Every twelfth year the sandbanks become a temporary city of millions, lit and lettered and gone within weeks. It is easy to write the number and miss the person. The truer scale is one widow, who has saved for six years to stand for one minute where the waters braid.",
      ),
    ],
  },
  wings: ["festivals"],
  depthTier: "standard",
  state: "published",
  enStatus: "final",
  hiStatus: "fallback",
  seo: { noindex: false },
};

export const patna: PlaceData = {
  _id: "place.patna",
  title: { en: "Patna", hi: "पटना" },
  slug: "patna",
  dek: {
    en: "The working Ganga — the river nobody stops to worship, doing the quiet labour of a country.",
    hi: "कामकाजी गंगा — वह नदी जिसकी कोई पूजा नहीं करता।",
  },
  distinctTruth: "The river nobody worships.",
  km: 1700,
  totalKm: 2525,
  journeyStage: 6, // Working Life · km 1700 → kmToStage
  reach: { name: { en: "Lower Ganga", hi: "निचली गंगा" }, slug: "lower", segment: "lower" },  wings: ["craft"],
  depthTier: "stub",
  state: "published",
  enStatus: "draft",
  hiStatus: "missing",
  seo: { noindex: true },
};

// Two minimal stubs — added to exercise the journey rails and the VI/VII split
// (not content production): Bhagalpur carries a primary + secondary stage, Farakka
// is the Wound. noindex stubs, just enough metadata to navigate.
export const bhagalpur: PlaceData = {
  _id: "place.bhagalpur",
  title: { en: "Bhagalpur", hi: "भागलपुर" },
  slug: "bhagalpur",
  dek: {
    en: "The silk city on the working river — where the looms outlive the current.",
    hi: "कामकाजी नदी की रेशम नगरी — जहाँ करघे धारा से अधिक टिकते हैं।",
  },
  distinctTruth: "The makers' river — craft before worship.",
  km: 1950,
  totalKm: 2525,
  journeyStage: 6, // Working Life (primary — leads with the silk truth)
  journeyStageSecondary: 7, // the Wound (the dolphin — subordinate, never co-equal)
  reach: { name: { en: "Lower Ganga", hi: "निचली गंगा" }, slug: "lower", segment: "lower" },  wings: ["craft"],
  depthTier: "stub",
  state: "published",
  enStatus: "draft",
  hiStatus: "missing",
  seo: { noindex: true },
};

export const farakka: PlaceData = {
  _id: "place.farakka",
  title: { en: "Farakka", hi: "फरक्का" },
  slug: "farakka",
  dek: {
    en: "The barrage where the river is divided, and the water that reaches the sea begins to thin.",
    hi: "वह बाँध जहाँ नदी बाँटी जाती है, और सागर तक पहुँचता जल क्षीण होने लगता है।",
  },
  distinctTruth: "Where we put her in chains.",
  km: 2200,
  totalKm: 2525,
  journeyStage: 7, // the Wound (the single grief beat)
  reach: { name: { en: "Lower Ganga", hi: "निचली गंगा" }, slug: "lower", segment: "lower" },  wings: ["environment"],
  depthTier: "stub",
  state: "published",
  enStatus: "draft",
  hiStatus: "missing",
  seo: { noindex: true },
};

export const FIXTURE_PLACES: PlaceData[] = [prayagraj, varanasi, patna, bhagalpur, farakka];
