import { ICondition } from "@ptypes/creditLines/ICondition";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";

const transformationDecisions = (decisions: IRules) => {
  return decisions.decisionsByRule.map((decision, index) => {
    const groupedConditions: Record<string, ICondition[]> = {};

    decision.conditionGroups.forEach((group) => {
      groupedConditions[group.ConditionGroupId] =
        group.conditionsThatEstablishesTheDecision.map((condition) => ({
          conditionName: condition.conditionName,
          value: condition.value,
        }));
    });

    return {
      ruleName: decisions.ruleName,
      descriptionUse: decisions.ruleName,
      label: decisions.ruleName,
      value: String(decision.value),
      effectiveFrom: decision.effectiveFrom,
      validUntil: decision.validUntil ?? "",
      conditionsThatEstablishesTheDecision: groupedConditions,
      decisionId: `Decisión ${index + 1}`,
    };
  });
};

export { transformationDecisions };
