/**
 * The Temperature engine. The river warms visually as it descends. A place's
 * ONLY colour input is `riverPosition.km` — no per-place colour is ever stored.
 * Adding a place is setting one number.
 *
 * The server renders `--river-t` + a hex fallback; CSS `color-mix(in oklch, …)`
 * overrides under `@supports`. The hex values below are the sRGB fallbacks.
 * See ARCHITECTURE.md ("The temperature engine") and DESIGN_SYSTEM.md.
 */

export const TOTAL_KM = 2525;

type Stop = { at: number; hex: string };

// Non-text accent — the ramp hue (marker, dot, keyline).
const ACCENT_STOPS: Stop[] = [
  { at: 0.0, hex: "#3E6E82" }, // source · glacial (cold pole)
  { at: 0.18, hex: "#6E94A0" }, // meltwater
  { at: 0.4, hex: "#9A8E78" }, // confluence · river-silt (pivot)
  { at: 0.68, hex: "#B5823E" }, // sandbar
  { at: 1.0, hex: "#B5772E" }, // ocean · delta amber (warm pole)
];

// Text-use accent — the darkened, AA-safe ramp (links, active). AA correction is
// by LOWERING OKLCH lightness, never raising chroma (prevents saffron drift).
const READABLE_STOPS: Stop[] = [
  { at: 0.0, hex: "#2A4D62" },
  { at: 0.5, hex: "#7E5320" },
  { at: 1.0, hex: "#9A5F1F" },
];

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const to = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

/** Piecewise-linear interpolation across a ramp, returning a hex string. */
function sampleRamp(stops: Stop[], t: number): string {
  const x = clamp01(t);
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (x >= a.at && x <= b.at) {
      const span = b.at - a.at || 1;
      const local = (x - a.at) / span;
      const [ar, ag, ab] = hexToRgb(a.hex);
      const [br, bg, bb] = hexToRgb(b.hex);
      return rgbToHex(
        ar + (br - ar) * local,
        ag + (bg - ag) * local,
        ab + (bb - ab) * local,
      );
    }
  }
  return stops[stops.length - 1].hex;
}

export type RiverTemperature = {
  /** Normalised position 0 (source) → 1 (ocean). */
  t: number;
  /** Non-text accent hex (the ramp hue). */
  accent: string;
  /** Darkened, AA-safe accent hex for text. */
  accentReadable: string;
};

export function riverTemperature(
  km: number,
  totalKm: number = TOTAL_KM,
): RiverTemperature {
  const t = clamp01(km / totalKm);
  return {
    t,
    accent: sampleRamp(ACCENT_STOPS, t),
    accentReadable: sampleRamp(READABLE_STOPS, t),
  };
}

/**
 * The graded-plate tone for a position on the river — the gradient stand-in for
 * a photograph before the shoots land (matches the `.plate-*` classes in
 * globals.css). `archive` mode overrides to the monochrome deep-time plate.
 */
export function plateTone(
  km: number,
  mode?: "live" | "archive",
  totalKm: number = TOTAL_KM,
): "glacial" | "meltwater" | "silt" | "warm" | "archive" {
  if (mode === "archive") return "archive";
  const t = clamp01(km / totalKm);
  if (t < 0.18) return "glacial";
  if (t < 0.4) return "meltwater";
  if (t < 0.68) return "silt";
  return "warm";
}

/**
 * CSS custom properties for a server-rendered place. Spread onto a style object;
 * the client enhancement (color-mix under @supports) layers over this.
 */
export function temperatureStyle(km: number, totalKm: number = TOTAL_KM) {
  const { t, accent, accentReadable } = riverTemperature(km, totalKm);
  return {
    "--river-t": t.toFixed(4),
    "--accent": accent,
    "--accent-readable": accentReadable,
  } as React.CSSProperties;
}
