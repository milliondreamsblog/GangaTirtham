import type { AboutData } from "@/lib/types";

import { block } from "./blocks";

/** The institution — a cultural archive, not an NGO. Roles over bylines. */
export const aboutFixture: AboutData = {
  title: { en: "The institution", hi: "संस्था" },
  mission: {
    en: [
      block(
        "Gangatirtham is a digital cultural archive centred on the river Ganga. It is not a tourism board, not a temple website, not a campaign. It documents the sacred places along the river — seventy-five, and growing toward a hundred — as the river orders them, from the ice of Gaumukh to the open sea at Ganga Sagar.",
      ),
      block(
        "The first publication is a book. The archive is the long work. Both begin from one conviction: that a place is encountered, not explained — through a named person, a real hour, and a single true thing no other place repeats.",
      ),
    ],
  },
  doctrine: {
    en: [
      block("How the river is kept", "h3"),
      block(
        "Every place page is a reported scene with a consented, named witness — labour, memory, or risk, never a holy man for mood. We photograph the periphery, never the postcard: the sweeper, not the aarti; the flame, not the pyre. Grief is earned through restraint, never NGO shock.",
      ),
      block(
        "Consent is mandatory and revocable, secured in the person's own language before anything is published. Every claim is checked against a source by someone other than the writer, and at least one verifiable number or date anchors each account. The Hindi is transcreated, not translated — it reads as authored. Nothing ships until it passes.",
      ),
    ],
  },
  contributors: [],
  seo: { noindex: false },
};
