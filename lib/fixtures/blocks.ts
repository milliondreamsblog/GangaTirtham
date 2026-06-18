import type { PortableTextBlock } from "@portabletext/types";

let counter = 0;
const key = () => `fx${(counter++).toString(36)}`;

/** Build a Portable Text block for the reference fixtures (deterministic keys). */
export function block(
  text: string,
  style: "normal" | "h2" | "h3" | "blockquote" = "normal",
): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  } as unknown as PortableTextBlock;
}
