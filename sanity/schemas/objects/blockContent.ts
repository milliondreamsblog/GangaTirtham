import { defineArrayMember, defineType } from "sanity";

/**
 * Editorial long-form. The PortableText renderer (M3) maps these to the type
 * scale. Deliberately restrained — encounter prose, not a CMS kitchen sink.
 */
export const blockContent = defineType({
  name: "blockContent",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Body", value: "normal" },
        { title: "Lede", value: "h3" },
        { title: "Section", value: "h2" },
        { title: "Pull quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Italic", value: "em" },
          { title: "Strong", value: "strong" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { name: "href", type: "url", title: "URL" },
            ],
          },
        ],
      },
    }),
    // Inline plates carry the provenance & ethics ledger.
    defineArrayMember({ type: "gtImage" }),
  ],
});
