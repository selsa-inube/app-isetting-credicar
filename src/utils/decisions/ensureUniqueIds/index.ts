/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
import { nextDecisionLabel } from "../nextDecisionLabel";

const ensureUniqueIds = (list: IRuleDecision[]) => {
  const used = new Set<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return list.map((d, _i) => {
    let id = String((d as any).decisionId ?? "");
    if (!id || used.has(id)) {
      id = nextDecisionLabel(used);
    }
    used.add(id);
    return {
      ...d,
      _originalDecisionId: (d as any).decisionId,
      decisionId: id,
    } as any;
  });
};

export { ensureUniqueIds };
