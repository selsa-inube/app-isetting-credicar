/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroup } from "@isettingkit/business-rules";
import { asArray } from "../asArray";
import { IRuleDecision } from "@isettingkit/input";

const nameToGroupMapOf = (d: IRuleDecision) => {
  const groups = (getConditionsByGroup(d) || {}) as Record<string, unknown>;
  const map = new Map<string, string>();
  Object.entries(groups).forEach(([group, list]) => {
    asArray(list).forEach((c: any) => {
      if (c?.conditionName) map.set(c.conditionName, group);
    });
  });
  return map;
};

export { nameToGroupMapOf };