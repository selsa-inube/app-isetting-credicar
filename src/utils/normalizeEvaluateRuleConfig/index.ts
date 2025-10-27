import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDateDecision } from "../date/formatDateDecision";

const normalizeEvaluateRuleConfig = (
  data: IRuleDecisionExtended[] | undefined,
) =>
  data?.map((item) => ({
    decisionsByRule: item.decisionsByRule?.map((decision) => ({
      decisionId: decision.decisionId,
      ruleName: decision.ruleName,
      ruleDataType: decision.ruleDataType,
      value: decision.value,
      howToSetTheDecision: decision.howToSetTheDecision,
      effectiveFrom:
        decision.effectiveFrom && formatDateDecision(decision.effectiveFrom),
      validUntil:
        decision.validUntil && formatDateDecision(decision.validUntil),
      conditionGroups: decision.conditionGroups?.map((condition) => ({
        conditionGroupId: condition.conditionGroupId,
        conditionsThatEstablishesTheDecision:
          condition.conditionsThatEstablishesTheDecision?.map((cond) => ({
            conditionDataType: cond.conditionDataType,
            conditionName: cond.conditionName,
            howToSetTheCondition: cond.howToSetTheCondition,
            value: cond.value,
            timeUnit: cond.timeUnit,
          })),
      })),
    })),
    ruleName: item.ruleName,
  }));

export { normalizeEvaluateRuleConfig };
