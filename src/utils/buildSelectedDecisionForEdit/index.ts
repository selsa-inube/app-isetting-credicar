import {
  getConditionsByGroupNew,
  groupsRecordToArrayNew,
  normalizeDecisionToNewShape,
} from "@isettingkit/business-rules";
import { IRuleDecision } from "@isettingkit/input";
import { normalizeCondition } from "../decisions/normalizeCondition";
import { asArray } from "../asArray";

/* eslint-disable @typescript-eslint/no-explicit-any */
const buildSelectedDecisionForEdit = (
  decision: IRuleDecision,
  templateForBusinessRules: IRuleDecision,
): IRuleDecision => {
  const normalized = normalizeDecisionToNewShape(decision);

  const baseGroups = (getConditionsByGroupNew(normalized) || {}) as Record<
    string,
    unknown
  >;

  const tplGroups = (getConditionsByGroupNew(templateForBusinessRules) ||
    {}) as Record<string, unknown>;

  const tplKeys = Object.keys(tplGroups);
  const baseKeys = Object.keys(baseGroups);

  const mergedGroupsRecord: Record<string, any[]> = {};

  tplKeys.forEach((tplKey, index) => {
    const baseKey = baseKeys[index];

    const tplList = asArray(tplGroups[tplKey]);
    const baseList = asArray(baseKey ? baseGroups[baseKey] : []);

    const byName = new Map<string, any>();

    tplList.forEach((tplCond: any) => {
      if (!tplCond?.conditionName) return;
      byName.set(tplCond.conditionName, normalizeCondition(tplCond));
    });

    baseList.forEach((baseCond: any) => {
      const name = baseCond?.conditionName;
      if (!name) return;

      const existing = byName.get(name);

      const merged = normalizeCondition({
        ...existing,
        ...baseCond,
        value: baseCond?.value !== undefined ? baseCond.value : existing?.value,
        listOfPossibleValues:
          baseCond?.listOfPossibleValues ?? existing?.listOfPossibleValues,
      });

      byName.set(name, merged);
    });

    mergedGroupsRecord[tplKey] = Array.from(byName.values());
  });

  if (baseKeys.length > tplKeys.length) {
    for (let i = tplKeys.length; i < baseKeys.length; i += 1) {
      const bKey = baseKeys[i];
      mergedGroupsRecord[bKey] = asArray(baseGroups[bKey]).map((c: any) =>
        normalizeCondition(c),
      );
    }
  }

  const finalGroupKeys = Object.keys(mergedGroupsRecord);
  let limitedGroupsRecord = mergedGroupsRecord;

  if (finalGroupKeys.length > 4) {
    const allowedKeys = finalGroupKeys.slice(0, 4);
    limitedGroupsRecord = allowedKeys.reduce<Record<string, any[]>>(
      (acc, key) => {
        acc[key] = mergedGroupsRecord[key];
        return acc;
      },
      {},
    );
  }

  const out: IRuleDecision = {
    ...normalized,
    conditionGroups: groupsRecordToArrayNew(limitedGroupsRecord) as any,
  };

  delete (out as any).conditionsThatEstablishesTheDecision;

  return out;
};

export { buildSelectedDecisionForEdit };
