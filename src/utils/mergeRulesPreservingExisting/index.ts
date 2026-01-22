import { IRuleDecision } from "@isettingkit/input";

const mergeRulesPreservingExisting = (
  existingRules: IRuleDecision[] = [],
  newRules: IRuleDecision[] = [],
): IRuleDecision[] => {
  if (!newRules || newRules.length === 0) {
    return existingRules;
  }
  const existingRuleNames = new Set(
    existingRules.map((rule) => rule.ruleName).filter(Boolean),
  );

  const rulesToAdd = newRules.filter(
    (rule) => !existingRuleNames.has(rule.ruleName ?? ""),
  );

  return [...existingRules, ...rulesToAdd];
};

export { mergeRulesPreservingExisting };
