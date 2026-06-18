import type { FaceEntityData } from "@/lib/types";

import { block } from "./blocks";

/**
 * FACE GANGA entities — four wings threaded through the archive. Festivals =
 * periphery, not spectacle. Art = the living culture. Craft = the maker's hand.
 * Environment = stewardship, or where earned, the obituary register.
 */

export const banarasGharana: FaceEntityData = {
  _id: "art.banaras-gharana",
  _type: "art",
  wing: "art",
  title: { en: "The Banaras Gharana", hi: "बनारस घराना" },
  slug: "banaras-gharana",
  body: {
    en: [
      block(
        "In the lanes behind the water, a school of music has treated sound the way the city treats the river — as something kept rather than owned. The Banaras gharana is not a building. It is a lineage of tabla and thumri carried hand to hand, teacher to student, for longer than most nations have had names.",
      ),
      block(
        "Its players will tell you the river is in the rhythm — the slow build of a tide, the catch and release of a current. To document it is to record the living culture, not to frame a performance.",
      ),
    ],
  },
  artist: { name: "—", role: "contributor" },
  relatedPlaces: [
    { title: { en: "Kashi", hi: "काशी" }, slug: "varanasi", km: 1384, reach: { segment: "middle" } },
  ],
  km: 1384,
  seo: { noindex: false },
};

export const thinningReach: FaceEntityData = {
  _id: "env.thinning-reach",
  _type: "environmentalIssue",
  wing: "environment",
  register: "obituary",
  title: { en: "A thinning reach", hi: "घटती धारा" },
  slug: "thinning-reach",
  summary: {
    en: "What the river is losing — held in the obituary register. Gravity, never NGO shock; specificity, never a dead-fish hero.",
    hi: "नदी जो खो रही है — श्रद्धांजलि के स्वर में।",
  },
  body: {
    en: [
      block(
        "Some reaches are not warming with the descent; they are simply thinning. The catch a boatman could once name in a single haul has collapsed to a list he counts on one hand. The dolphin that worked these waters by sound is going blind in water it can no longer read.",
      ),
      block(
        "We document this the way one writes an obituary — with restraint and a real number, never a guilt diptych. The loss is the record; the record is the resistance.",
      ),
    ],
  },
  relatedPlaces: [
    { title: { en: "Patna", hi: "पटना" }, slug: "patna", km: 1700, reach: { segment: "lower" } },
  ],
  km: 1700,
  seo: { noindex: false },
};

export const gangaDussehra: FaceEntityData = {
  _id: "festival.ganga-dussehra",
  _type: "festival",
  wing: "festivals",
  title: { en: "Ganga Dussehra", hi: "गंगा दशहरा" },
  slug: "ganga-dussehra",
  body: {
    en: [
      block(
        "We photograph the preparation and the aftermath, never the peak spectacle. The day before, a family folds ten thousand wicks by lamplight. The morning after, a sweeper returns the ghat to stone. The festival is in the labour around it, not the drone shot above it.",
      ),
    ],
  },
  relatedPlaces: [
    { title: { en: "Prayagraj · Sangam", hi: "प्रयागराज" }, slug: "prayagraj", km: 1230, reach: { segment: "middle" } },
  ],
  km: 1230,
  seo: { noindex: false },
};

export const bhagalpurSilk: FaceEntityData = {
  _id: "craft.bhagalpur-silk",
  _type: "craft",
  wing: "craft",
  title: { en: "Bhagalpur silk", hi: "भागलपुर रेशम" },
  slug: "bhagalpur-silk",
  body: {
    en: [
      block(
        "The river is spun here. We follow the maker's hand — the reeling, the dyeing in river water, the loom's slow arithmetic — and we keep the process, not the product. The cloth is the by-product of a gesture that has not changed in generations.",
      ),
    ],
  },
  relatedPlaces: [
    { title: { en: "Patna", hi: "पटना" }, slug: "patna", km: 1700, reach: { segment: "lower" } },
  ],
  km: 1700,
  seo: { noindex: false },
};

export const FIXTURE_FACE: FaceEntityData[] = [
  bhagalpurSilk,
  banarasGharana,
  gangaDussehra,
  thinningReach,
];
