import {
  getConditionsByGroupNew,
  groupsRecordToArrayNew,
} from "@isettingkit/business-rules";
import { IRuleDecision } from "@isettingkit/input";
import { asArray } from "../asArray";
import { normalizeCondition } from "../decisions/normalizeCondition";
import { getNextDay } from "../getNextDay";

const ensureArrayGroupsDeep = (
  decision: IRuleDecision,
  editDecision?: boolean,
  initialDecision?: IRuleDecision,
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
    effectiveFrom: editDecision
      ? getNextDay(cloned.effectiveFrom as string, initialDecision)
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
