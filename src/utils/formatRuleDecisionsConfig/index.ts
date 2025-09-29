import { ICondition, IRuleDecision } from "@isettingkit/input";
import { formatDateDecision } from "../date/formatDateDecision";

const toFlatConditions = (v: unknown): ICondition[] => {
  if (!v) return [];
  if (Array.isArray(v)) return v as ICondition[];
  if (typeof v === "object") {
    return Object.values(v as Record<string, unknown>).flatMap((x) =>
      Array.isArray(x) ? (x as ICondition[]) : [],
    );
  }
  return [];
};

const formatRuleDecisionsConfig = (rule: IRuleDecision[]) =>
  rule.map((decision) => {
    const decisionsByRule: Partial<IRuleDecision> = {
      effectiveFrom:
        decision.effectiveFrom &&
        formatDateDecision(String(decision.effectiveFrom)),
      value: decision.value,
    };

    if (decision.validUntil) {
      decisionsByRule.validUntil = formatDateDecision(
        String(decision.validUntil),
      );
    }

    const flatConditions = toFlatConditions(
      decision.conditionsThatEstablishesTheDecision,
    );

    if (flatConditions.length > 0) {
      decisionsByRule.conditionsThatEstablishesTheDecision = flatConditions
        .filter((condition) => condition.value !== undefined)
        .map((condition) => ({
          conditionName: condition.conditionName,
          value: condition.value,
        })) as ICondition[];
    }

    return { ruleName: decision.ruleName, decisionsByRule: [decisionsByRule] };
  });

export { formatRuleDecisionsConfig };
