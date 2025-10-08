import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";

const normalizeEvaluateRuleData = (
  data: IRules[] | undefined,
  conditionRule?: string,
): IRules[] | undefined =>
  data?.map((item) => ({
    ...item,
    decisionsByRule: item.decisionsByRule.map((decision) => ({
      ...decision,
      conditionGroups: decision.conditionGroups?.map((condition) => ({
        ...condition,
        conditionsThatEstablishesTheDecision:
          condition.conditionsThatEstablishesTheDecision?.map((condition) => ({
            ...condition,
            hidden:
              conditionRule && condition.conditionName === conditionRule
                ? true
                : false,
          })),
      })),
    })),
  }));

export { normalizeEvaluateRuleData };
