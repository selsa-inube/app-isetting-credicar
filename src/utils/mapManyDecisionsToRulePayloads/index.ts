/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
import { mapDecisionsToRulePayload } from "../mapDecisionsToRulePayload";
import { IRulePayload } from "@ptypes/creditLines/IRulePayload";

const mapManyDecisionsToRulePayloads = (
  decisions: IRuleDecision[],
): IRulePayload[] => {
  const byRule = new Map<string, IRuleDecision[]>();

  for (const d of decisions) {
    const key =
      (d as any)?.ruleName ||
      (d as any)?.businessRuleName ||
      (d as any)?.businessRuleId ||
      "UnknownRule";
    const list = byRule.get(key) ?? [];
    list.push(d);
    byRule.set(key, list);
  }

  return Array.from(byRule.entries()).map(([ruleName, list]) =>
    mapDecisionsToRulePayload({ ruleName, decisions: list }),
  );
};

export { mapManyDecisionsToRulePayloads };
