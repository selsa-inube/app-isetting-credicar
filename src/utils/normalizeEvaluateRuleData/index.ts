import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const normalizeEvaluateRuleData = (
  data: IRuleDecisionExtended[] | undefined,
  conditionRule?: string,
) =>
  data?.map((item) => ({
    ...item,
    decisionsByRule: item.decisionsByRule?.map((decision) => ({
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
