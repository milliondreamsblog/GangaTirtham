import { CHECKLIST_KEYS } from "../schemas/lib/editorial";

/**
 * The publish gate, as a pure function so the document action AND the badges
 * agree. Mirrors CONTENT_DOCTRINE.md ("Publication workflow") + ARCHITECTURE.md:
 *
 *   ready · encounter checklist 5/5 · i18n.en === 'final' ·
 *   factCheck.status === 'passed' · sensitivity read · consent green · hero final
 *
 * Stubs are the documented exception: they publish `forthcoming`/noindex and
 * bypass the 5/5 editorial gate (but still may not be withdrawn). Consent
 * withdrawal is always a hard block.
 */

type AnyDoc = Record<string, any> | null | undefined;

export type GateResult = { ok: boolean; reasons: string[] };

/** Consent green — applies to any document carrying a consent object (e.g. witness). */
export function evaluateConsent(doc: AnyDoc): GateResult {
  const reasons: string[] = [];
  const c = doc?.consent;
  if (c && (c.obtained || c.scope)) {
    if (c.scope === "withdrawn") reasons.push("consent withdrawn");
    else if (!c.obtained) reasons.push("consent not obtained");
  }
  return { ok: reasons.length === 0, reasons };
}

export function evaluatePublishGate(doc: AnyDoc): GateResult {
  const reasons: string[] = [];

  // Consent gate first (witness, or any doc with an embedded consent).
  reasons.push(...evaluateConsent(doc).reasons);

  const ops = doc?.editorialOps;
  if (ops) {
    const isPlace = doc?._type === "place";
    const tier = ops.depthTier;

    if (isPlace && tier === "stub") {
      // Forthcoming publish — allowed once the spine is real (past reporting).
      if (ops.state === "idea" || ops.state === "reporting") {
        reasons.push("stub must be drafted before it can publish as forthcoming");
      }
    } else {
      if (ops.state !== "ready") reasons.push('state must be "ready"');
      if (ops.i18n?.en !== "final") reasons.push("EN must be final");
      if (ops.factCheck?.status !== "passed") reasons.push("fact-check not passed");
      if (!ops.factCheck?.sensitivityRead) reasons.push("sensitivity read not passed");

      if (isPlace) {
        const checklist = ops.checklist || {};
        const passed = CHECKLIST_KEYS.filter((k) => checklist[k]).length;
        if (passed < CHECKLIST_KEYS.length) {
          reasons.push(`encounter checklist ${passed}/${CHECKLIST_KEYS.length}`);
        }
        if (ops.visualState !== "final") reasons.push("hero/visual not final");
      }
    }
  }

  return { ok: reasons.length === 0, reasons };
}
