/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroupNew } from "@isettingkit/business-rules";
import { IRuleDecision } from "@isettingkit/input";
import { IRulePayload } from "@ptypes/creditLines/IRulePayload";

const asArray = (v: unknown): unknown[] =>
  Array.isArray(v)
    ? v
    : v && typeof v === "object"
      ? Object.values(v as Record<string, unknown>)
      : [];

const pickDate = (d: IRuleDecision, ...candidates: any[]): string => {
  for (const k of candidates) {
    const v = (d as Record<string, unknown>)?.[k];
    if (typeof v === "string" && v.trim()) return v;
    if (v instanceof Date) return v.toISOString();
  }
  return "";
};

const mapDecisionsToRulePayload = (params: {
  decisions: any[];
  ruleName?: string;
}): IRulePayload => {
  const { decisions, ruleName } = params;

  const inferredRuleName =
    ruleName ||
    (decisions[0] as IRuleDecision)?.ruleName ||
    decisions[0]?.businessRuleName ||
    (decisions[0] as IRuleDecision)?.businessRuleId ||
    "UnknownRule";

  const decisionsByRule = decisions.map((d) => {
    const groups = (getConditionsByGroupNew(d) || {}) as Record<
      string,
      unknown
    >;

    const conditionGroups = Object.entries(groups).map(
      ([groupKey, rawList]) => {
        const items = asArray(rawList).filter((c) => !(c as any)?.hidden);

        const conditionsThatEstablishesTheDecision = items.map((c: any) => ({
          conditionName: c?.conditionName ?? "",
          value: c?.value,
        }));

        return {
          conditionGroupId: groupKey,
          conditionsThatEstablishesTheDecision,
        };
      },
    );

    return {
      conditionGroups,
      effectiveFrom: pickDate(d, "startDate", "effectiveFrom", "validFrom"),
      validUntil: pickDate(d, "endDate", "validUntil", "expiresAt"),
      value: d.value,
    } as any;
  });

  return { ruleName: inferredRuleName, decisionsByRule };
};

export { mapDecisionsToRulePayload };
