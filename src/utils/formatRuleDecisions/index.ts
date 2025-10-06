import { IRuleDecision } from "@isettingkit/input";
import { formatDateDecision } from "../date/formatDateDecision";
import { translationToEnum } from "../translationToEnum";
import { IDecisionsByRule } from "@ptypes/context/creditLinesConstruction/IDecisionsByRule";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";

const formatRuleDecisions = (
  rule: IRuleDecision[],
  dateEffectiveFrom: string,
) =>
  rule.map((decision) => {
    const decisionsByRule: IDecisionsByRule = {
      effectiveFrom: dateEffectiveFrom && formatDateDecision(dateEffectiveFrom),
      value: decision.value,
    };

    if (decision.conditionsThatEstablishesTheDecision) {
      const conditionsThatEstablishesTheDecision =
        decision.conditionsThatEstablishesTheDecision
          .filter((condition) => condition.value !== undefined)
          .map((condition) => ({
            conditionName:
              translationToEnum[condition.conditionName] ??
              condition.conditionName,
            value: condition.value,
          })) as IConditionsTheDecision[];

      decisionsByRule.conditionGroups = [
        {
          conditionsThatEstablishesTheDecision,
        },
      ];
    }

    return {
      ruleName: decision.ruleName,
      decisionsByRule: [decisionsByRule],
    };
  });

export { formatRuleDecisions };
