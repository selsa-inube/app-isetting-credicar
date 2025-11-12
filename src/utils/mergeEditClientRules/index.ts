/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const mergeEditClientRules = (
  existingRules: IRuleDecisionExtended[] = [],
  newRules: IRuleDecisionExtended[] = [],
): IRuleDecisionExtended[] => {
  if (!newRules || newRules.length === 0) {
    return existingRules;
  }

  const newRulesGrouped = newRules.reduce(
    (newRule, rule) => {
      const key = rule.ruleName;
      if (!newRule[key as any]) {
        newRule[key as any] = [];
      }
      newRule[key as any].push(rule);
      return newRule;
    },
    {} as Record<string, IRuleDecisionExtended[]>,
  );

  const newRuleNames = Object.keys(newRulesGrouped);

  const filteredExisting = existingRules.filter(
    (rule) => !newRuleNames.includes(rule.ruleName ?? ""),
  );

  const existingToMerge = existingRules.filter((rule) =>
    newRuleNames.includes(rule.ruleName ?? ""),
  );

  const mergedRules = newRuleNames
    .map((ruleName) => {
      const newRulesForName = newRulesGrouped[ruleName];
      const existingRuleForName = existingToMerge.find(
        (rule) => rule.ruleName === ruleName,
      );

      if (!existingRuleForName) {
        return newRulesForName;
      }

      const mergedDecisionsByRule = newRulesForName.map((newRule) => {
        const newDecisions = newRule.decisionsByRule || [];

        return {
          ...newRule,
          decisionsByRule: newDecisions.map((newDecision) => {
            const existingDecision = existingRuleForName.decisionsByRule?.find(
              (d) => d.decisionId === newDecision.decisionId,
            );

            if (!existingDecision) {
              return newDecision;
            }

            const existingConditionGroups =
              existingDecision.conditionGroups || [];
            const newConditionGroups = newDecision.conditionGroups || [];

            const newConditionValues = new Set<string>();
            newConditionGroups.forEach((group) => {
              group.conditionsThatEstablishesTheDecision?.forEach(
                (condition) => {
                  if (condition.value) {
                    newConditionValues.add(condition.value);
                  }
                },
              );
            });

            const preservedConditionGroups = existingConditionGroups.filter(
              (group) => {
                return !group.conditionsThatEstablishesTheDecision?.some(
                  (condition) => newConditionValues.has(condition.value),
                );
              },
            );

            return {
              ...newDecision,
              conditionGroups: [
                ...preservedConditionGroups,
                ...newConditionGroups,
              ],
            };
          }),
        };
      });

      return mergedDecisionsByRule;
    })
    .flat();

  return [...filteredExisting, ...mergedRules];
};

export { mergeEditClientRules };
