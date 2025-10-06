/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
import { asArray } from "../asArray";
import { getConditionsByGroup } from "@isettingkit/business-rules";
import { normalizeCondition } from "../normalizeCondition";

const ensureArrayGroupsDeep = (decision: IRuleDecision): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(decision ?? {}));
  const groups: Record<string, unknown> = getConditionsByGroup(cloned) ?? {};
  const normalizedGroups = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [
      g,
      asArray(list).map(normalizeCondition),
    ]),
  );
  (cloned as any).conditionsThatEstablishesTheDecision =
    normalizedGroups as any;
  return cloned;
};

export { ensureArrayGroupsDeep };
