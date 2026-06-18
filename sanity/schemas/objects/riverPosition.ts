import { defineField, defineType } from "sanity";

/**
 * The river position — a place's coordinate on the descent. `km` is the SINGLE
 * source of truth: it drives the source→ocean ordering AND the temperature.
 * No per-place colour is ever stored. See ARCHITECTURE.md ("The temperature engine").
 */
export const riverPosition = defineType({
  name: "riverPosition",
  title: "River position",
  type: "object",
  fields: [
    defineField({
      name: "river",
      title: "River",
      type: "reference",
      to: [{ type: "river" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "km",
      title: "River km (source → ocean)",
      type: "number",
      description:
        "Distance downstream from the source. Drives ordering + temperature. Setting this is the only colour input a place has.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "geopoint",
    }),
    defineField({
      name: "altitude",
      title: "Altitude (m)",
      type: "number",
    }),
  ],
});
