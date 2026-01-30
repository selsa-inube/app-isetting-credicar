import { ECreditLines } from "@enum/creditLines";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";

const updateLineCreditInRules = (
  data: ILinesConstructionData,
  newAbbreviatedName: string,
): ILinesConstructionData => {
  if (!data?.rules || !newAbbreviatedName) {
    return data;
  }

  const updatedRules = data.rules.map((rule) => {
    const isLineOfCreditRule =
      rule.ruleName === ECreditLines.CREDIT_LINE_RULE ||
      rule.ruleName === ECreditLines.CLIENT_SUPPORT_RULE;

    return {
      ...rule,
      decisionsByRule: rule.decisionsByRule?.map((decision) => ({
        ...decision,
        ...(isLineOfCreditRule && { value: newAbbreviatedName }),
        conditionGroups: decision.conditionGroups?.map((group) => ({
          ...group,
          conditionsThatEstablishesTheDecision:
            group.conditionsThatEstablishesTheDecision?.map((condition) =>
              condition.conditionName === ECreditLines.CREDIT_LINE_RULE
                ? { ...condition, value: newAbbreviatedName }
                : condition,
            ),
        })),
      })),
    };
  });

  return {
    ...data,
    rules: updatedRules,
  };
};

export { updateLineCreditInRules };
