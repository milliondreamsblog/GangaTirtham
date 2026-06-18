# Gangatirtham — Build Roadmap

> Execution plan for the **build phase**. Strategy and design are locked (see the other docs). This is the path from spec to a live site.

## Definition of launch (v1 "done")

Live on Vercel:
- **Homepage** (the 7 sections + the 3 signature moments).
- **3 anchor places at flagship depth** — Gaumukh, Varanasi, Ganga Sagar.
- **The remaining 72 places as honest `noindex` stubs** (the source→ocean spine is navigable).
- **Book (Vol I)**, **Sankalp**, **FACE hub**, **About**.
- Bilingual-capable (EN final; HI graceful-fallback acceptable at launch).
- **Lighthouse 95+ · LCP < 2.5s on 4G**; JSON-LD + hreflang + sitemap; the encounter doctrine satisfied on the 3 anchors.
- Sankalp + book purchase: **live or fast-follow** (see Open Decisions).

## Milestones (critical path)

The build track and the editorial/photography track run **in parallel from day one.**

```
BUILD TRACK
M0 Scaffold        Next 15 + TS + Tailwind v4 + embedded Sanity Studio + Vercel        ~2d
M1 Sanity + Studio schema files + production layer + Production Board desk
                   + gated publish action + seed (Ganga, reaches)                       ~4d
M2 App shell       globals.css/tokens + layout + next/font + i18n middleware
                   + sanity client + global JSON-LD                                      ~3d
M3 PLACE TEMPLATE  the gold-standard page + place components + 3 moments    ★ keystone   ~5d
M4 Homepage        7 sections wired to data + moments                                    ~3d
M5 Secondary       Book · Sankalp · Places index · FACE · About · /api/og · sitemap      ~5d
M6 Transactional   Neon + Razorpay (sankalp ledger + book order + 80G)     (goals 1 & 3) ~4d
M7 Hardening       Lighthouse/axe/SEO · analytics · Sentry · domain · launch             ~4d

EDITORIAL TRACK (parallel)
river → reaches → 75 stubs → 3 anchor flagships → Book Vol I → Sankalp campaign
  + the 3 anchor shoots (long pole) + HI transcreation (or fallback)
```

**M3 is the keystone** — it is where most traffic lands and the template every other place inherits. Build it to the Varanasi standard first.

## First sprint (week 1)

1. **M0** — scaffold the repo; embedded Studio at `/studio`; deploy a hello-world to Vercel.
2. **M1** — commit all Sanity schema files + the `editorialOps`/`consent` production layer; build the **gated publish action** and the **Production Board** desk; seed `river: Ganga` + the 5 reaches.
3. **M2** — port `globals.css` (tokens/moments/fixes — design unchanged), wire `next/font`, the i18n middleware, the sanity client + `HOME_QUERY`, and global `Organization`+`WebSite` JSON-LD.

Outcome: a real, deployable shell with a working bilingual CMS by end of week one.

## What already exists (from design phase — ready to commit)

- Full Sanity content schema + production layer.
- Next.js architecture: rendering map, i18n routing, `next/font` setup, Tailwind v4 config, the temperature engine, sanity client/fetch/queries, metadata/hreflang, JSON-LD, the revalidate webhook, middleware.
- `globals.css` (tokens + the 3 moments + P0/P1 fixes).
- The section components (Hero, Places, Book, Sankalp, Footer), the moments (RiverLine, DescentGauge, LampField), PlateImage, Localized, Masthead/MobileNav.
- The **Varanasi page written** (the content gold standard).
- Reference prototype at `prototype/index.html`.

## What remains to build

- **Sanity:** wire the Studio project (config, desk, gated action, badges, validation, scheduled-publish + image plugins); seed data.
- **Next.js:** the full `places/[slug]` template (Witness peak, book deep-link, `Place`/`Article` JSON-LD, `generateStaticParams`, ISR); `/places` index; `/library/[book]`; `/sankalp`; FACE + About; `/api/og`; `sitemap.xml`/`robots`; error/404.
- **Components:** `ObjectLabel`, `WitnessPeak`, `BookDeepLink`, `ArchiveLayer`, `LateralRails`/prev-next, the **PortableText renderer**, breadcrumb; shadcn for the sankalp form + mobile-nav dialog.
- **Transactional:** Neon + Drizzle schema (Orders, Donations, Subscriptions, Patrons, Lamp ledger, WebhookEvents, Redirects); Razorpay (UPI + Subscriptions + GST + 80G) with idempotent webhooks.
- **Content:** create river, reaches, 75 stubs, the 3 anchor flagships (witness + essay + images + consent), Book Vol I, FACE seeds, the sankalp campaign, authors/witnesses.
- **Launch:** Lighthouse/axe verification, analytics (Vercel + PostHog), Sentry, domain/DNS, env, the revalidate webhook hooked to Sanity.

## Open build decisions (recommended defaults — proceeding on these unless overridden)

1. **Studio location** — **embedded** `/studio` route (one repo, one deploy; simplest for a small team). ✅ default.
2. **Transactional timing** — **fast-follow** (launch the archive + book "reserve/notify" + sankalp "coming soon"; wire Razorpay + Neon ~10 days later). Pull M6 forward only if selling the book at launch is non-negotiable.

## Risks / long poles

- **Photography for the 3 anchors** is the long pole (shoots + grading take real time). Build proceeds with the graded-gradient placeholders; **launch needs the real anchor imagery** — it is 70% of the emotional payload. Start the shoots now (anchors first: Gaumukh, Varanasi, Ganga Sagar).
- **Consent** for witnesses/images is a hard publish gate — secure it during reporting, not after.
- **Devanagari + variable font weight** is the perf watch-item — subset hard, stay within the ≤180KB above-fold budget.
- **HI translation** can lag at launch (fallback is acceptable); don't let it block shipping the archive.

## Launch checklist (pre-flight)

- [ ] Lighthouse ≥ 95 (perf/a11y/best-practices/SEO) on homepage + a place page, throttled 4G.
- [ ] `axe` clean; keyboard + screen-reader pass; `lang="hi"` on Devanagari; focus-visible everywhere.
- [ ] LCP < 2.5s; initial < 1MB; fonts ≤ 180KB; hero `priority`, no CLS.
- [ ] JSON-LD validates (Place, Article, Breadcrumb, Book/Offer, Organization, WebSite).
- [ ] hreflang `en`/`hi`/`x-default` + canonical on every page; sitemap split by type; stubs `noindex`.
- [ ] The 3 anchors pass the encounter checklist 5/5; consent on file for all witnesses/identifiable images.
- [ ] Revalidate webhook live (Sanity → `/api/revalidate`); slug→301 redirect table in place.
- [ ] OG cards render; "Walk with the river" capture works; (if live) Razorpay sankalp + book order + 80G receipt tested end-to-end with idempotent webhooks.
- [ ] PR canaries hold (DESIGN_SYSTEM.md): Bone≠#FFF, Ink≠#000, Hindi soul face, lamp inscriptional, one chromatic event, one motion.
