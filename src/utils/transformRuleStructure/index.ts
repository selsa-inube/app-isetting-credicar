import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseValue = (value: any) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(error);
    return value;
  }
};

const transformRuleStructure = (inputArray: IRuleDecisionExtended[]) => {
  return inputArray.map((rule) => {
    const conditionGroups = [];

    if (rule.conditionsThatEstablishesTheDecision) {
      for (const [
        groupId,
        conditionsThatEstablishesTheDecision,
      ] of Object.entries(rule.conditionsThatEstablishesTheDecision)) {
        const conditionsArray = Array.isArray(
          conditionsThatEstablishesTheDecision,
        )
          ? conditionsThatEstablishesTheDecision
          : [conditionsThatEstablishesTheDecision];
        const simplifiedConditions = conditionsArray.map((cond) => {
          return {
            conditionDataType: cond.conditionDataType,
            howToSetTheCondition: cond.howToSetTheCondition,
            conditionName: cond.conditionName,
            value: cond.value,
          };
        });

        conditionGroups.push({
          conditionGroupId: groupId,
          conditionsThatEstablishesTheDecision: simplifiedConditions,
        });
      }
    }
    return {
      decisionsByRule: [
        {
          decisionId: rule.decisionId,
          ruleName: rule.ruleName,
          ruleDataType: rule.decisionDataType,
          value: parseValue(rule.value),
          howToSetTheDecision: rule.howToSetTheDecision,
          effectiveFrom: rule.effectiveFrom,
          typeDecision: "Permanent",
          conditionGroups: conditionGroups,
        },
      ],
      ruleName: rule.ruleName,
    };
  });
};

export { transformRuleStructure };
