# Gangatirtham — Design System ("Tirtha")

> The visual language. Values are **locked** (post-critique v1.1). The canonical source of truth in code is `app/globals.css` (`@theme` + tokens); this documents intent and rules. **Do not change typography, spacing, or palette.**

## Principles

- **Sacred Modernism, warmed.** Architectural restraint (Swiss golden-section grid, monumental negative space, inscriptional type) carries the sacred through *proportion and silence*, never ornament. Anti-cliché by construction.
- **The blend: 50% Sacred Modernism / 25% Living Pilgrimage / 25% River Archive.** Restraint is the base; warmth (light, the human hand, voice, material) is delivered through **content and surface**, never by softening the grid.
- **Encounter, not exhibit.** Second-person + named first-person. The visitor is a pilgrim at the water's edge, not a curator behind glass.
- **Warmth only via** material, light, sound, the human hand, typographic voice, first-person editorial. **Never** hue, ornament, or religious iconography.

## Colour tokens

Warm-biased, museum-grade. **Bone is never `#FFF`; Ink is never `#000`.**

| Token | Hex | Use |
|---|---|---|
| Bone | `#F4F1EA` | page ground |
| Alabaster | `#FBF9F4` | raised surfaces / plinth cards |
| Reading | `#F6F2E9` | long-form essay ground |
| Ink | `#14110D` | text (16.7:1 on Bone) |
| Slate | `#4A4540` | captions/metadata (8.4:1) |
| Slate-light | `#6B645B` | tertiary (5.17:1 on Bone) |
| Slate-reading | `#635C53` | tertiary on Reading ground |
| Stone | `#D8D2C6` | 1px hairlines |
| Stone-deep | `#C2BAA9` | dividers |
| Vermilion | `#9B3B2E` | error/destructive (icon + text) |
| **Dark mode** | | |
| Basalt | `#1A1714` | dark field (never `#000`) |
| Stone-night | `#241F1A` | dark raised |
| Moonstone | `#EDE8DE` | dark text (14.6:1) |
| on-dark-muted | `#A39C90` | dark secondary |
| on-dark-faint | `#94896F` | dark tertiary (contrast-fixed; ≥4.5:1) |

### Reserved metals (scarcity is the point)
- **Foil Gold** `#A97C2F` — **book only**. Rendered as gradient `#8A641F → #C9A24E → #8A641F`, **1px keyline / foil edge, never a fill**. Solid fallback color always present (gradient text gated behind `@supports`).
- **Lamp Gold** `#E8B85C` — **Sankalp only**. Inscriptional, **never a glow/bloom/gradient**.

### The Temperature ramp (the one chromatic event per screen)
Source → ocean, driven by `--river-t` (derived from km):

| Stop | Hex | |
|---|---|---|
| 0% Source | `#3E6E82` Glacial | cold pole |
| 18% | `#6E94A0` Meltwater | |
| 40% Confluence | `#9A8E78` River-silt | pivot |
| 68% | `#B5823E` Sandbar | (corrected for ≥3:1 non-text) |
| 100% Ocean | `#B5772E` Delta amber | warm pole |

- **Non-text** accent (marker, dot, keyline) = the ramp hue.
- **Text** accent (links, active) = the **darkened, AA-safe** ramp (`#2A4D62 → #7E5320 → #9A5F1F`). AA correction is by **lowering OKLCH lightness, never raising chroma** (prevents saffron drift).
- Always dual-encoded (a km/place label accompanies the hue — never hue alone).

### Focus (surface-aware, tokenized)
`--color-focus-light` = Ink `#14110D` (load-bearing on light) · `--color-focus-dark` = `#7FC4E0` (load-bearing on dark) · `--color-focus-halo` = `#7FC4E0` (decorative only). Never bind a focus ring to cyan alone.

## Typography

| Token | Stack | Use |
|---|---|---|
| `--font-display` | GT Sectra → **Fraunces** (variable) → Georgia | inscriptional display |
| `--font-sans` | Söhne → **Inter** → system | text / UI |
| `--font-mono` | Söhne Mono → **JetBrains Mono** | catalogue apparatus (km, plate №, coords) |
| `--font-deva` | **Tiro Devanagari Hindi** → Noto Serif Devanagari | Devanagari (the soul face; Noto is fallback only) |

**Devanagari is first-class, set above/equal to Latin.** Loaded via `next/font` self-hosted + subset (`devanagari` + `latin`).

### Scale (fluid, golden-section; **do not alter**)
`overture 118 · h1 73 · h2 45 · h3 28 · lede 21 · body 19 · body-sm 17 · caption 14 · label 12 · micro 11` (px max). Mid-sizes (caption/label/micro) are fixed; display tokens scale most. Tracking: tight on display (−0.02em), positive on labels (+0.08em, Latin only — **never letterspace Devanagari**).

## Spacing · radius · grid

- **Spacing:** `0 · 4 · 8 · 12 · 16 · 26 · 42 · 68 · 110 · 160`. 8px-snapped rhythm low; golden-section (×1.618) high.
- **Radius:** `0` default (lapidary) · `2px` working max · `4px` rare (acquisition slip, plate frames) · `full` for round instruments only (marker dot). **No pills, ever.**
- **Grid:** 4 (mobile) → 8 (md) → 12 (lg). Content frame `1180px`; full-bleed canvas `1440px`. **Text measure ≤ 66ch.** Gutters 16→24; margins 20→40→72→96. Breakpoints `sm 600 · md 905 · lg 1240 · xl 1440`.
- **Elevation:** structure is 1px Stone hairlines, not shadow. One ambient plinth shadow (`0 12px 32px rgba(20,17,13,.06)`); foil/overlay reserved.

## Motion

- **One persistent motion maximum** (the descent marker easing, then resting). Everything else is a one-shot reveal or a 1:1 response to input.
- Durations: `micro 200 · ui 240 · reveal 480 · marker 600 · wall 900 · overture 60–90s`. Easings: `ink cubic-bezier(.2,0,0,1) · door (.22,1,.36,1) · ui (.4,0,.2,1) · marker (.65,0,.35,1)`.
- No spring/bounce/overshoot. Audio + overture **opt-in, silent/static by default**. `prefers-reduced-motion` collapses everything; **no meaning is ever motion- or audio-dependent.** No `filter:blur` animation on mobile.

## Signature motif

**The Shirorekha-Waterline** — one 1px line that is simultaneously the river's source→ocean datum **and** the Devanagari head-stroke the place-name hangs from, carrying at one point the single temperature tick. The brand fingerprint; scales from favicon to a foil book-keyline; survives grayscale/reduced-motion (the tick carries its mono temperature number).

## The three signature moments

1. **The Descent Gauge** — the Waterline as a scroll-linked river-position instrument: the marker travels source→ocean, the accent warms, a readout names `km · place`. *The river's length, felt.*
2. **The Offering Released** — keeping a Sankalp lamp floats a single gold light down the Waterline and off-screen (a diya on the current), then settles in the field and **persists across visits** ("your lamp still burns"). *The river's ritual, made personal.*
3. **The River Draws Itself** — on load, the hero Waterline inscribes as one continuous source→ocean stroke (`pathLength` dash) and the place-name settles onto it. *The river's form + language, unified.*

All three are CSS + a few lines of vanilla JS, compositor-only, reduced-motion-safe, no assets.

## Component language

Gallery fixtures, not app chrome: inscriptional underline-CTAs (no filled pills), plinth cards (2px radius), underline-only inputs, the **museum object-label** as the atomic component (name primary, mono apparatus demoted), the persistent Waterline marker. Foil only on the book; Lamp Gold only on Sankalp.

## Accessibility

WCAG **AA** minimum; meaning never carried by hue alone; `:focus-visible` on every interactive element (surface-aware); `lang="hi"` on all Devanagari runs; consent-gated imagery; the silent/static/reduced-motion default must already be beautiful and complete.

## PR canaries (block the merge if violated)

- Bone ≠ `#FFF`; Ink ≠ `#000`.
- Hero Hindi name uses the Tiro soul face, never Noto/default.
- Lamp is inscriptional — no glow.
- Exactly **one** temperature event visible per screen.
- Exactly **one** persistent motion.
- Foil = 1px keyline only, never a fill. Gradient text always has a solid fallback.
- Typography, spacing, palette unchanged from this document.
