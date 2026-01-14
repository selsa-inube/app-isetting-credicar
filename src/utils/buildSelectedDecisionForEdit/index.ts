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

  const mergedGroupsRecord: Record<string, any[]> = Object.fromEntries(
    Object.entries(baseGroups).map(([groupKey, list]) => [
      groupKey,
      asArray(list).map((c: any) => normalizeCondition(c)),
    ]),
  );

  const ensureGroup = (groupKey: string) => {
    if (!mergedGroupsRecord[groupKey]) {
      mergedGroupsRecord[groupKey] = [];
    }
    return mergedGroupsRecord[groupKey];
  };

  const findIndex = (groupKey: string, name: string) =>
    (mergedGroupsRecord[groupKey] || []).findIndex(
      (c: any) => c?.conditionName === name,
    );

  Object.entries(tplGroups).forEach(([groupKey, tplList]) => {
    const tplArray = asArray(tplList);
    const groupList = ensureGroup(groupKey);

    tplArray.forEach((tplCond: any) => {
      const name = tplCond?.conditionName;
      if (!name) return;

      const existingIndex = findIndex(groupKey, name);

      if (existingIndex >= 0) {
        const existing = groupList[existingIndex];

        groupList[existingIndex] = normalizeCondition({
          ...tplCond,
          ...existing,
          value: existing?.value ?? tplCond.value,
          listOfPossibleValues:
            existing?.listOfPossibleValues ?? tplCond.listOfPossibleValues,
        });
      } else {
        groupList.push(
          normalizeCondition({
            ...tplCond,
          }),
        );
      }
    });
  });

  const groupKeys = Object.keys(mergedGroupsRecord);
  let limitedGroupsRecord = mergedGroupsRecord;

  if (groupKeys.length > 4) {
    const orderedKeys = groupKeys.includes("group-primary")
      ? ["group-primary", ...groupKeys.filter((k) => k !== "group-primary")]
      : groupKeys;

    const allowedKeys = orderedKeys.slice(0, 4);

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
