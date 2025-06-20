import { IRuleDecision } from "@isettingkit/input";

const normalizeEvaluateRuleData = (
  data: IRuleDecision[] | undefined,
  conditionRule?: string,
): IRuleDecision[] | undefined =>
  data?.map((item) => ({
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

export { normalizeEvaluateRuleData };
