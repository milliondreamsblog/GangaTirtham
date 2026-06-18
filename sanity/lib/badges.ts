import type { DocumentBadgeComponent, DocumentBadgeDescription } from "sanity";

import { evaluatePublishGate } from "./gate";

/**
 * Document badges — state · depthTier · consent · fact-check · HI · publish-gate.
 * A glanceable production read on every editorial document. See ARCHITECTURE.md
 * ("Studio configuration").
 */

type Tone = DocumentBadgeDescription["color"];

const doc = (props: Parameters<DocumentBadgeComponent>[0]) => props.draft || props.published;

export const stateBadge: DocumentBadgeComponent = (props) => {
  const state = (doc(props) as any)?.editorialOps?.state;
  if (!state) return null;
  const color: Tone =
    state === "published"
      ? "success"
      : state === "ready"
        ? "primary"
        : state === "archived" || state === "needs-update"
          ? "warning"
          : undefined;
  return { label: state, color, title: `Editorial state: ${state}` };
};

export const depthTierBadge: DocumentBadgeComponent = (props) => {
  const tier = (doc(props) as any)?.editorialOps?.depthTier;
  if (!tier) return null;
  const color: Tone = tier === "flagship" ? "primary" : tier === "standard" ? undefined : "warning";
  return { label: tier, color, title: `Depth tier: ${tier}` };
};

export const factCheckBadge: DocumentBadgeComponent = (props) => {
  const status = (doc(props) as any)?.editorialOps?.factCheck?.status;
  if (!status || status === "pending") return null;
  const color: Tone = status === "passed" ? "success" : status === "failed" ? "danger" : undefined;
  return { label: `fact ${status}`, color, title: `Fact-check: ${status}` };
};

export const hiBadge: DocumentBadgeComponent = (props) => {
  const hi = (doc(props) as any)?.editorialOps?.i18n?.hi;
  if (!hi || hi === "missing") return null;
  const color: Tone = hi === "final" ? "success" : hi === "fallback" ? "warning" : undefined;
  return { label: `HI ${hi === "final" ? "✓" : hi}`, color, title: `Hindi: ${hi}` };
};

export const consentBadge: DocumentBadgeComponent = (props) => {
  const d = doc(props) as any;
  const c = d?.consent;
  if (!c) return null;
  if (c.scope === "withdrawn") return { label: "consent withdrawn", color: "danger" };
  if (!c.obtained) return { label: "⚠ no consent", color: "danger" };
  return { label: `consent · ${c.scope ?? "?"}`, color: "success" };
};

/** A single decisive badge: can this publish right now? */
export const publishGateBadge: DocumentBadgeComponent = (props) => {
  const d = doc(props) as any;
  // Only meaningful for documents that carry the production spine or consent.
  if (!d?.editorialOps && !d?.consent) return null;
  const gate = evaluatePublishGate(d);
  if (gate.ok) return { label: "publishable", color: "success", title: "Passes the publish gate" };
  return { label: "gated", color: "warning", title: `Blocked — ${gate.reasons.join(" · ")}` };
};

export const editorialBadges: DocumentBadgeComponent[] = [
  publishGateBadge,
  stateBadge,
  depthTierBadge,
  factCheckBadge,
  hiBadge,
];
