import {
  getConditionsByGroupNew,
  groupsRecordToArrayNew,
} from "@isettingkit/business-rules";
import { IRuleDecision } from "@isettingkit/input";
import { asArray } from "../asArray";
import { normalizeCondition } from "../decisions/normalizeCondition";
import { getNextDay } from "../getNextDay";
import { getEffectiveFromDay } from "../getEffectiveFromDay";

const ensureArrayGroupsDeep = (
  decision: IRuleDecision,
  editDecision?: boolean,
  initialDecision?: IRuleDecision,
  idInitial?: string,
  optionPolicies?: boolean,
): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(decision ?? {}));
  const groups: Record<string, unknown> = getConditionsByGroupNew(cloned) ?? {};
  const normalizedGroups = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [
      g,
      asArray(list).map(normalizeCondition),
    ]),
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const out: IRuleDecision = {
    ...cloned,
    decisionId: editDecision && idInitial ? idInitial : cloned.decisionId,
    effectiveFrom: editDecision
      ? optionPolicies
        ? getEffectiveFromDay(cloned.effectiveFrom as string)
        : getNextDay(cloned.effectiveFrom as string, initialDecision)
      : cloned.effectiveFrom,
    conditionGroups: groupsRecordToArrayNew(
      normalizedGroups as Record<string, any[]>,
    ) as any,
  };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  delete (out as any).conditionsThatEstablishesTheDecision;
  return out;
};

export { ensureArrayGroupsDeep };
