import type { StructureResolver } from "sanity/structure";

import { DEPTH_TIERS, EDITORIAL_TYPES, FACE_WINGS, STATES } from "./schemas/lib/editorial";

/**
 * The Production Board desk. Grouped by state (kanban), plus ⚡ Needs action, by
 * reach, by depth tier, by FACE wing, by sprint, and an orderable Source→Ocean
 * place list. Below the board: the archive for normal editing + the singleton.
 * See ARCHITECTURE.md ("Studio configuration").
 */

const editorialTypes = [...EDITORIAL_TYPES];

// States that represent work in flight and want an editor's eyes.
const NEEDS_ACTION_STATES = ["edit", "fact-check", "translation", "ready", "needs-update"];

const downstream = [{ field: "riverPosition.km", direction: "asc" as const }];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Gangatirtham")
    .items([
      // ───────────────────────── Production Board ─────────────────────────
      S.listItem()
        .title("⚑ Production Board")
        .id("production-board")
        .child(
          S.list()
            .title("Production Board")
            .items([
              S.listItem()
                .title("By stage")
                .id("by-stage")
                .child(
                  S.list()
                    .title("By stage")
                    .items(
                      STATES.map((s) =>
                        S.listItem()
                          .title(s.title)
                          .id(`stage-${s.value}`)
                          .child(
                            S.documentList()
                              .title(s.title)
                              .filter('_type in $types && editorialOps.state == $state')
                              .params({ types: editorialTypes, state: s.value })
                              .defaultOrdering(downstream),
                          ),
                      ),
                    ),
                ),

              S.listItem()
                .title("⚡ Needs action")
                .id("needs-action")
                .child(
                  S.documentList()
                    .title("Needs action")
                    .filter('_type in $types && editorialOps.state in $states')
                    .params({ types: editorialTypes, states: NEEDS_ACTION_STATES })
                    .defaultOrdering(downstream),
                ),

              S.divider(),

              S.listItem()
                .title("By reach")
                .id("by-reach")
                .child(
                  S.documentTypeList("reach")
                    .title("By reach")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                    .child((reachId) =>
                      S.documentList()
                        .title("Places")
                        .schemaType("place")
                        .filter('_type == "place" && reach._ref == $reachId')
                        .params({ reachId })
                        .defaultOrdering(downstream),
                    ),
                ),

              S.listItem()
                .title("By depth tier")
                .id("by-depth-tier")
                .child(
                  S.list()
                    .title("By depth tier")
                    .items(
                      DEPTH_TIERS.map((t) =>
                        S.listItem()
                          .title(t.title)
                          .id(`tier-${t.value}`)
                          .child(
                            S.documentList()
                              .title(t.title)
                              .schemaType("place")
                              .filter('_type == "place" && editorialOps.depthTier == $tier')
                              .params({ tier: t.value })
                              .defaultOrdering(downstream),
                          ),
                      ),
                    ),
                ),

              S.listItem()
                .title("By FACE wing")
                .id("by-face-wing")
                .child(
                  S.list()
                    .title("By FACE wing")
                    .items(
                      FACE_WINGS.map((w) =>
                        S.listItem()
                          .title(w.title)
                          .id(`wing-${w.value}`)
                          .child(
                            S.documentList()
                              .title(w.title)
                              .schemaType("place")
                              .filter('_type == "place" && $wing in wings')
                              .params({ wing: w.value })
                              .defaultOrdering(downstream),
                          ),
                      ),
                    ),
                ),

              S.listItem()
                .title("By sprint")
                .id("by-sprint")
                .child(
                  S.documentList()
                    .title("By sprint")
                    .filter('_type in $types && defined(editorialOps.sprint)')
                    .params({ types: editorialTypes })
                    .defaultOrdering([{ field: "editorialOps.sprint", direction: "asc" }]),
                ),

              S.divider(),

              S.listItem()
                .title("Source → Ocean (orderable)")
                .id("source-to-ocean")
                .child(
                  S.documentList()
                    .title("Source → Ocean")
                    .schemaType("place")
                    .filter('_type == "place"')
                    .defaultOrdering(downstream),
                ),
            ]),
        ),

      S.divider(),

      // ───────────────────────── The archive ─────────────────────────
      S.documentTypeListItem("place").title("Places"),
      S.documentTypeListItem("book").title("Books"),
      S.documentTypeListItem("collection").title("Collections"),

      S.listItem()
        .title("FACE Ganga")
        .id("face-ganga")
        .child(
          S.list()
            .title("FACE Ganga")
            .items([
              S.documentTypeListItem("festival").title("Festivals"),
              S.documentTypeListItem("art").title("Art"),
              S.documentTypeListItem("craft").title("Craft"),
              S.documentTypeListItem("environmentalIssue").title("Environment"),
            ]),
        ),

      S.documentTypeListItem("sankalpCampaign").title("Sankalp campaigns"),

      S.listItem()
        .title("People")
        .id("people")
        .child(
          S.list()
            .title("People")
            .items([
              S.documentTypeListItem("witness").title("Witnesses"),
              S.documentTypeListItem("author").title("Authors & contributors"),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("River & reaches")
        .id("river-and-reaches")
        .child(
          S.list()
            .title("River & reaches")
            .items([
              S.documentTypeListItem("river").title("River"),
              S.documentTypeListItem("reach").title("Reaches"),
            ]),
        ),

      S.divider(),

      // Singleton — Site settings.
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);

/** Types the desk manages explicitly (so default lists don't duplicate them). */
export const MANAGED_TYPES = [
  ...editorialTypes,
  "river",
  "reach",
  "witness",
  "author",
  "siteSettings",
];
