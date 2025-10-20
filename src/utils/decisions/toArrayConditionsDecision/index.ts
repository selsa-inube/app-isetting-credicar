/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroupNew } from "@isettingkit/business-rules";
import { IRuleDecision } from "@isettingkit/input";
import { asArray } from "../asArray";

const toArrayConditionsDecision = (d: IRuleDecision): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(d ?? {}));
  const groups: Record<string, unknown> = getConditionsByGroupNew(cloned) ?? {};
  const flat = Object.values(groups).flatMap(asArray);
  (cloned as any).conditionsThatEstablishesTheDecision = flat;
  return cloned;
};

export { toArrayConditionsDecision };
