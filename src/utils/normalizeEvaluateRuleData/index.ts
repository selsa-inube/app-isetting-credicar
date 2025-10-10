import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const normalizeEvaluateRuleData = (
  data: IRuleDecisionExtended[] | undefined,
  conditionRule?: string,
): IRuleDecisionExtended[] | undefined => {
  return data?.map((item) => ({
    ...item,
    conditionsThatEstablishesTheDecision:
      item.conditionsThatEstablishesTheDecision?.map((condition) => ({
        ...condition,
        hidden:
          conditionRule && condition.conditionName === conditionRule
            ? true
            : false,
      })),
  }));
};

export { normalizeEvaluateRuleData };
