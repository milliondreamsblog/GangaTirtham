/**
 * Roman numerals for the eight journey stages — presentation formatting only,
 * kept out of lib/journey.ts (narrative taxonomy). Shared journey ownership:
 * used by the place StageBadge + Descent Gauge AND the Library ToC arc, so the
 * numeral is formatted in exactly one place.
 */
const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"] as const;

export function toRoman(n: number): string {
  return ROMAN[n] ?? String(n);
}
