import {
  getConditionsByGroupNew,
  groupsRecordToArrayNew,
} from "@isettingkit/business-rules";
import { IRuleDecision } from "@isettingkit/input";
import { asArray } from "../asArray";

/* eslint-disable @typescript-eslint/no-explicit-any */
const nameToGroupOccurrences = (d: IRuleDecision) => {
  const occ = new Map<string, string[]>();
  const cgArray: any[] = Array.isArray((d as any)?.conditionGroups)
    ? ((d as any).conditionGroups as any[])
    : (groupsRecordToArrayNew(
        (getConditionsByGroupNew(d) ?? {}) as any,
      ) as any[]);

  for (const groupEntry of cgArray) {
    const groupId =
      groupEntry?.ConditionGroupId ?? groupEntry?.groupId ?? "group-primary";

    const list = asArray(
      groupEntry?.conditionsThatEstablishesTheDecision ??
        groupEntry?.conditions ??
        (getConditionsByGroupNew(d) as any)?.[groupId],
    );

    for (const c of list) {
      if (!c?.conditionName) continue;
      const current = occ.get(c.conditionName) ?? [];
      current.push(groupId);
      occ.set(c.conditionName, current);
    }
  }

  return occ;
};

export { nameToGroupOccurrences };
