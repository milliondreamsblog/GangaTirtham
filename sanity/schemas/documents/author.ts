import { defineField, defineType } from "sanity";

/**
 * author — the team and contributors (EiC, managing editor, writers,
 * photographers, translators, fact-checkers). Used for bylines and ownership.
 * "The writer is never more visible than the person."
 */
export const author = defineType({
  name: "author",
  title: "Author / contributor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Editor-in-Chief", value: "eic" },
          { title: "Managing Editor", value: "me" },
          { title: "Writer", value: "writer" },
          { title: "Photographer", value: "photographer" },
          { title: "Translator", value: "translator" },
          { title: "Fact-checker", value: "fact-checker" },
          { title: "Contributor", value: "contributor" },
        ],
      },
    }),
    defineField({ name: "bio", title: "Bio", type: "localeText" }),
    defineField({ name: "portrait", title: "Portrait", type: "gtImage" }),
    defineField({ name: "website", title: "Website", type: "url" }),
  ],
  preview: {
    select: { title: "name", role: "role", media: "portrait" },
    prepare({ title, role, media }) {
      return { title: title || "Author", subtitle: role, media };
    },
  },
});
