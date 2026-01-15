import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IDecisionsByRule } from "@ptypes/context/creditLinesConstruction/IDecisionsByRule";
import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";
import { formatDateDecision } from "../date/formatDateDecision";
import { capitalizeText } from "../capitalizeText";

const transformRuleStructure = (inputArray: IRuleDecisionExtended[]) => {
  const groupedByRule = inputArray.reduce(
    (acc, rule) => {
      const conditionGroups = rule.conditionGroups
        ? rule.conditionGroups.map((item: IConditionGroups) => ({
            conditionGroupId: item.conditionGroupId ?? item.ConditionGroupId,
            conditionsThatEstablishesTheDecision:
              item.conditionsThatEstablishesTheDecision?.map((condition) => ({
                conditionDataType: capitalizeText(
                  condition.conditionDataType as string,
                ),
                conditionName: condition.conditionName,
                howToSetTheCondition: condition.howToSetTheCondition,
                value: condition.value,
              })),
          }))
        : [];

      const validUntil = rule.validUntil
        ? formatDateDecision(rule.validUntil as string)
        : undefined;

      const decision: IDecisionsByRule = {
        decisionId: rule.decisionId,
        ruleName: rule.ruleName,
        ruleDataType: rule.ruleDataType,
        value: rule.value,
        howToSetTheDecision: rule.howToSetTheDecision,
        effectiveFrom: rule.effectiveFrom
          ? formatDateDecision(rule.effectiveFrom as string)
          : formatDateDecision(String(new Date())),
        validUntil: validUntil,
        conditionGroups: conditionGroups,
      };

      if (!acc[rule.ruleName as string]) {
        acc[rule.ruleName as string] = [];
      }
      acc[rule.ruleName as string].push(decision);

      return acc;
    },
    {} as Record<string, IDecisionsByRule[]>,
  );

  return Object.entries(groupedByRule).map(([ruleName, decisions]) => ({
    decisionsByRule: decisions,
    ruleName: ruleName,
  }));
};

export { transformRuleStructure };
