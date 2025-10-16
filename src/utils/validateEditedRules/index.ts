import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";

const validateEditedRules = (
  data: ILinesConstructionData,
  optionsAllRules: { rule: string; label: string }[],
) => {
  const seenRuleNames = new Set<string>();

  const transformation = data.rules
    ?.filter((rule) => {
      if (seenRuleNames.has(rule.ruleName ?? "")) {
        return false;
      }
      seenRuleNames.add(rule.ruleName ?? "");
      return true;
    })
    .map((rule) => {
      const foundRule = optionsAllRules.find(
        (option) => option.rule === rule.ruleName,
      );
      return {
        ruleName: {
          es: foundRule?.label,
          en: foundRule?.label,
        },
        errorMessage: {
          es: "",
          en: "",
        },
      };
    });
  return transformation ?? [];
};

export { validateEditedRules };
