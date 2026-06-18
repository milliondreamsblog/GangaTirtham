import type { SankalpData } from "@/lib/types";

import { block } from "./blocks";

/**
 * The primary Sankalp campaign — content only. NEVER "Donate." Intention-first;
 * the amount is framed as what it sustains; 80G at confirmation. The transaction
 * (Razorpay + Postgres ledger) is M6.
 */
export const keepALamp: SankalpData = {
  _id: "sankalp.keep-a-lamp",
  title: { en: "Keep a lamp on the river", hi: "नदी पर एक दीप जलाएँ" },
  slug: "keep-a-lamp",
  intention: {
    en: "Set an intention. Dedicate it to a name. Keep it lit — a standing lamp relights every dawn aarti, and every Ganga Dussehra.",
    hi: "एक संकल्प लें। उसे किसी नाम को समर्पित करें। उसे जलाए रखें — एक अखंड दीप हर प्रातः आरती और हर गंगा दशहरा को पुनः प्रज्वलित होता है।",
  },
  story: {
    en: [
      block(
        "This documentation exists because people keep it. Each place we report — the witness found, the consent secured, the plate made where the light was real — is sustained by an offering, not a budget. You are not giving to a cause. You are keeping a lamp on a river that has carried far more than it has ever asked.",
      ),
    ],
  },
  tiers: [
    {
      amount: 1100,
      label: { en: "A lamp", hi: "एक दीप" },
      sustains: { en: "One witness interview — sourced, recorded, transcribed, and consented in the person's own language.", hi: "एक साक्षी-वार्ता — उसी की भाषा में सहमति के साथ।" },
      recurring: false,
    },
    {
      amount: 5100,
      label: { en: "A standing lamp", hi: "अखंड दीप" },
      sustains: { en: "A place documented to standard depth — a reported scene and a named voice — relit at every dawn aarti.", hi: "मानक गहराई तक एक स्थान का दस्तावेज़ीकरण।" },
      recurring: true,
    },
    {
      amount: 21000,
      label: { en: "A reach", hi: "एक खंड" },
      sustains: { en: "A flagship encounter at full depth — the witness, the essay, and the commissioned shoot.", hi: "पूर्ण गहराई पर एक प्रमुख मिलन।" },
      recurring: false,
    },
  ],
  lampsKept: 3412,
  targetPlace: { title: { en: "Kashi", hi: "काशी" }, slug: "varanasi" },
  seo: { noindex: false },
};
