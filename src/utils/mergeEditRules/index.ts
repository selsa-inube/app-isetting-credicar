/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
const mergeEditRules = (
  existingRules: IRuleDecision[] = [],
  newRules: IRuleDecision[] = [],
): IRuleDecision[] => {
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
    {} as Record<string, IRuleDecision[]>,
  );

  const newRuleNames = Object.keys(newRulesGrouped);
  const filteredExisting = existingRules.filter(
    (rule) => !newRuleNames.includes(rule.ruleName ?? ""),
  );

  const mergedNewRules = Object.values(newRulesGrouped).flat();
  return [...filteredExisting, ...mergedNewRules];
};

export { mergeEditRules };
