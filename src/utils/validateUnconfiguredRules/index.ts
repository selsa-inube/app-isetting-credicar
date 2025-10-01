import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";

const validateUnconfiguredRules = (
  data: IRules[],
  validRules: string[],
  optionsAllRules: { rule: string; label: string }[],
) => {
  if (!data || data.length === 0) return validRules;

  const existingRuleNames = new Set(data.map((item) => item.ruleName));

  const missingRules = validRules.filter(
    (rule) => !existingRuleNames.has(rule),
  );

  if (missingRules.length === 0) return [];

  const transformation = missingRules
    .map((missingRule) => {
      const foundRule = optionsAllRules.find(
        (option) => option.rule === missingRule,
      );
      return foundRule?.label;
    })
    .filter((label): label is string => label !== undefined);

  return transformation;
};

export { validateUnconfiguredRules };
