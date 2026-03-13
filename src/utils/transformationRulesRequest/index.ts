import { EValueHowToSetUp } from "@isettingkit/business-rules";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { isRangeObject } from "../formatValueOfCondition";

const transformationRulesRequest = (rules: IRuleDecisionExtended[]) => {
  if (!rules || rules.length === 0) return {};

  return rules.reduce(
    (rule, { ruleName, decisionsByRule }) => {
      const decisions =
        decisionsByRule?.map((decision) => ({
          ...decision,
          howToSetTheDecision: isRangeObject(decision?.value)
            ? EValueHowToSetUp.RANGE
            : EValueHowToSetUp.EQUAL,
          conditionGroups: decision?.conditionGroups?.map((group) => ({
            ...group,

            conditionsThatEstablishesTheDecision:
              group.conditionsThatEstablishesTheDecision?.map((condition) => ({
                ...condition,

                howToSetTheCondition: isRangeObject(condition.value)
                  ? EValueHowToSetUp.RANGE
                  : EValueHowToSetUp.EQUAL,
              })),
          })),
        })) ?? [];

      if (!rule[ruleName as string]) {
        rule[ruleName as string] = [...decisions];
      } else {
        rule[ruleName as string].push(...decisions);
      }

      return rule;
    },
    {} as Record<string, unknown[]>,
  );
};

export { transformationRulesRequest };
