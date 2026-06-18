import type { SchemaTypeDefinition } from "sanity";

// ── Reusable objects (the shared "Entry" spine) ──
import { blockContent } from "./objects/blockContent";
import { bookAppearance } from "./objects/bookAppearance";
import { consent } from "./objects/consent";
import { editorialOps } from "./objects/editorialOps";
import { festivalInstance } from "./objects/festivalInstance";
import { gtImage } from "./objects/gtImage";
import { localePortableText } from "./objects/localePortableText";
import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { riverPosition } from "./objects/riverPosition";
import { seo } from "./objects/seo";
import { specRow } from "./objects/specRow";
import { sustainTier } from "./objects/sustainTier";

// ── Documents ──
import { art } from "./documents/art";
import { author } from "./documents/author";
import { book } from "./documents/book";
import { collection } from "./documents/collection";
import { craft } from "./documents/craft";
import { environmentalIssue } from "./documents/environmentalIssue";
import { festival } from "./documents/festival";
import { place } from "./documents/place";
import { reach } from "./documents/reach";
import { river } from "./documents/river";
import { sankalpCampaign } from "./documents/sankalpCampaign";
import { siteSettings } from "./documents/siteSettings";
import { witness } from "./documents/witness";

const objects: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  blockContent,
  localePortableText,
  gtImage,
  seo,
  riverPosition,
  bookAppearance,
  specRow,
  festivalInstance,
  sustainTier,
  consent,
  editorialOps,
];

const documents: SchemaTypeDefinition[] = [
  river,
  reach,
  place,
  book,
  collection,
  festival,
  art,
  craft,
  environmentalIssue,
  author,
  witness,
  sankalpCampaign,
  siteSettings,
];

export const schemaTypes: SchemaTypeDefinition[] = [...objects, ...documents];
