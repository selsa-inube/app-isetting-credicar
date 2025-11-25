import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { normalizeValueCondition } from "../normalizeValueCondition";

const changeValueCondition = (data: IRules[], language: string) => {
  return data.map((rule) => {
    return {
      ...rule,
      decisionsByRule: rule.decisionsByRule?.map((decision) => {
        const updatedDecision = {
          ...decision,
          value:
            normalizeValueCondition(
              decision.enumValues ?? [],
              language,
              decision.value,
            )?.code ?? decision.value,
        };

        updatedDecision.conditionGroups = decision.conditionGroups?.map(
          (group) => ({
            ...group,
            conditionsThatEstablishesTheDecision:
              group.conditionsThatEstablishesTheDecision.map((condition) => ({
                ...condition,
                value:
                  normalizeValueCondition(
                    condition.enumValues ?? [],
                    language,
                    condition.value,
                  )?.code ?? condition.value,
              })),
          }),
        );

        return updatedDecision;
      }),
    };
  });
};

export { changeValueCondition };
