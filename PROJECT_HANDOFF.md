# Gangatirtham — Project Handoff

> **Start here.** This is the canonical orientation document for the repository. Strategy and design are **locked**. We are in the **build phase**. Do not reopen strategy; build to these decisions.

## Documentation map

| Doc | Read it for |
|---|---|
| **PROJECT_HANDOFF.md** (this file) | What the project is, goals, brand, core concepts, the non-negotiables |
| **ARCHITECTURE.md** | Stack, rendering, the Sanity data model + transactional boundary, SEO, performance |
| **DESIGN_SYSTEM.md** | The "Tirtha" system — tokens, type, the Waterline, the Temperature engine, motion, the 3 moments |
| **CONTENT_DOCTRINE.md** | How place pages are written, the witness/consent/photography/fact-check/translation workflows |
| **BUILD_ROADMAP.md** | Milestones, the critical path to launch, the open build decisions |

---

## What Gangatirtham is

Gangatirtham is **not a book website**. It is a **digital cultural archive centred on the river Ganga**. The first publication is the book *Gangatirtham*; the archive is the long-term product.

### Goals (in priority order)
1. Sell the book
2. Showcase the FACE GANGA initiative
3. Accept Sankalp contributions
4. Document the sacred places along the Ganga (75 → 100+)
5. Build a long-term cultural archive

### Brand positioning
**Is:** a premium cultural archive · an editorial storytelling platform · a modern sacred experience · museum-quality presentation.
**Is not:** an NGO · tourism · a temple website · a government portal · ecommerce-first.
**Reference feeling:** Aman · National Geographic · an editorial magazine · a cultural archive.

---

## Core concepts

### FACE GANGA
The cultural initiative, four wings: **F**estivals · **A**rt · **C**raft · **E**nvironmental Issues. Threaded through the archive as the "why," surfaced as four curatorial wings — never four competing doors. Environment is framed as **stewardship/continuity**, never crisis.

### Sankalp
The contribution model. **Never use "Donate."** Approved language: **Sankalp · Keep a Lamp · Support the Journey · Keep a standing lamp** (recurring). Framed as participation/offering, never charity. A "standing lamp" relights every dawn aarti and Ganga Dussehra. 80G receipt issued at confirmation, never in the invitation.

### The Waterline
The signature design element. A single 1px line that is **simultaneously** the river's source→ocean datum **and** the Devanagari *shirorekha* (head-stroke) from which place-names hang. Felt throughout the site; carries the one chromatic event per screen (the temperature tick).

### The Temperature System
The river warms visually as it descends. Driven by `riverPosition.km` (derived, never hand-assigned):
- **Gaumukh (source, km 0)** → cool glacial `#3E6E82`
- **Middle Ganga** → neutral silt `#9A8E78`
- **Delta / Ganga Sagar (km 2,525)** → warm amber `#B5772E`

---

## Information architecture

```
Home · Places · Book · FACE GANGA · Sankalp · About
```

### Homepage sections (in order)
1. Hero (the Opening Spread)
2. Story of the River
3. 75 Sacred Places (the descent)
4. FACE GANGA
5. Book
6. Sankalp
7. Footer

The homepage is a **front-door + hub**, designed as a source→ocean descent — *not* the main entry point. Most traffic lands on place pages from search/share.

---

## The non-negotiables (do not break in build)

- **Encounter, not explainer.** Every place page creates an encounter: a named witness, place, memory, specificity, **one** emotional peak. Canonical example: **Varanasi / Kashi**. See CONTENT_DOCTRINE.md.
- **Editorial rules:** witnesses over experts · labour over symbolism · specificity over adjectives · encounter over explanation · *the writer is never more visible than the person.*
- **Design canaries:** Bone is never `#FFF` · Ink is never `#000` · the hero Hindi name uses the Devanagari **soul face** (Tiro), never a default · the lamp is **inscriptional, never glowing** · **one chromatic event per screen** · **one persistent motion** · the silent/static/reduced-motion default must already move you.
- **Consent is mandatory** for any identifiable person (witness or image) before publish — a hard gate.
- **Performance is a gate, not a goal:** Lighthouse 95+ · LCP < 2.5s on 4G · < 1MB initial.

---

## Current phase

**BUILD.** Strategy frozen. Focus: Sanity implementation · Next.js implementation · component architecture · content population · launch readiness. See BUILD_ROADMAP.md.

## Glossary

- **Tirtha** — the design system codename (also: a sacred ford/crossing).
- **Reach** — a named river segment (Source/Upper/Middle/Lower/Delta) grouping places.
- **Depth tier** — `stub` | `standard` | `flagship`; how much editorial depth a place carries.
- **The Vessel** — the book, presented as a publication-of-record (museum-acquisition register), never a SKU.
- **Witness** — the named, consented human voice at the centre of a place page; the emotional peak.
- **LIVE / ARCHIVE** — the two photography modes (warm documentary encounter / monochrome deep-time record).
