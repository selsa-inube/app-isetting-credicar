/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroup } from "@isettingkit/business-rules";
import { IRuleDecision } from "@isettingkit/input";
import { IRulePayload } from "@ptypes/creditLines/IRulePayload";

const asArray = (v: unknown): unknown[] =>
  Array.isArray(v)
    ? v
    : v && typeof v === "object"
      ? Object.values(v as Record<string, unknown>)
      : [];

const toValueString = (v: unknown): string => {
  if (v == null) return "";

  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);

  if (Array.isArray(v)) return v.map(toValueString).join(",");

  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    const minRaw = o.min ?? o.from ?? o.start ?? null;
    const maxRaw = o.max ?? o.to ?? o.end ?? null;

    if (minRaw != null || maxRaw != null) {
      const minStr =
        typeof minRaw === "string" || typeof minRaw === "number"
          ? String(minRaw)
          : "";
      const maxStr =
        typeof maxRaw === "string" || typeof maxRaw === "number"
          ? String(maxRaw)
          : "";
      return `${minStr};${maxStr}`;
    }

    try {
      return JSON.stringify(v);
    } catch {
      return "";
    }
  }

  return "";
};

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
    const groups = (getConditionsByGroup(d) || {}) as Record<string, unknown>;

    const conditionGroups = Object.entries(groups).map(
      ([groupKey, rawList]) => {
        const items = asArray(rawList).filter((c) => !(c as any)?.hidden);

        const conditionsThatEstablishesTheDecision = items.map((c: any) => ({
          conditionName: c?.conditionName ?? "",
          value: toValueString(c?.value),
        }));

        return {
          ConditionGroupId: groupKey,
          conditionsThatEstablishesTheDecision,
        };
      },
    );

    return {
      conditionGroups,
      effectiveFrom: pickDate(d, "startDate", "effectiveFrom", "validFrom"),
      validUntil: pickDate(d, "endDate", "validUntil", "expiresAt"),
      value: toValueString(d.value),
    } as any;
  });

  return { ruleName: inferredRuleName, decisionsByRule };
};

export { mapDecisionsToRulePayload };
