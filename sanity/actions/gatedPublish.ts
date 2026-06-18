import type { DocumentActionComponent } from "sanity";

import { evaluatePublishGate } from "../lib/gate";

/**
 * Wrap the default publish action with the encounter gate. When the gate fails,
 * publish is disabled and the tooltip names every blocking reason. When it
 * passes, the original action (including its own "no changes" disabling) is
 * returned untouched. See sanity/lib/gate.ts.
 */
export function createGatedPublishAction(
  originalPublishAction: DocumentActionComponent,
): DocumentActionComponent {
  const GatedPublishAction: DocumentActionComponent = (props) => {
    const original = originalPublishAction(props);
    if (!original) return original;

    const doc = props.draft || props.published;
    const gate = evaluatePublishGate(doc);

    if (!gate.ok) {
      return {
        ...original,
        disabled: true,
        title: `Publish blocked — ${gate.reasons.join(" · ")}`,
      };
    }

    return original;
  };

  // Preserve the action's identity so Sanity keeps it in the publish slot.
  GatedPublishAction.action = originalPublishAction.action;
  return GatedPublishAction;
}
