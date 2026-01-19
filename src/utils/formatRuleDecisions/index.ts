import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";
import { formatDateDecision } from "../date/formatDateDecision";
import { normalizedCodeList } from "../normalizedCodeList";

const formatRuleDecisions = (
  rule: IRuleDecisionExtended[],
  dateEffectiveFrom: string,
) =>
  rule.map((decision) => {
    const decisionsByRule: Partial<IRuleDecisionExtended> = {
      effectiveFrom: dateEffectiveFrom && formatDateDecision(dateEffectiveFrom),
      value: decision.value,
      conditionGroups:
        decision.conditionGroups && decision.conditionGroups.length > 0
          ? decision.conditionGroups.map((conditionGroup: IConditionGroups) => {
              const conditionsThatEstablishesTheDecision =
                (conditionGroup.conditionsThatEstablishesTheDecision
                  ?.filter((condition) => condition.value !== undefined)
                  .map((condition) => ({
                    conditionName: condition.conditionName,
                    value:
                      condition.listOfPossibleValues?.list &&
                      condition.listOfPossibleValues?.list?.length > 0
                        ? normalizedCodeList(
                            condition.value,
                            condition.listOfPossibleValuesHidden?.list,
                          )
                        : condition.value,
                  })) as IConditionsTheDecision[]) || [];

              return {
                conditionsThatEstablishesTheDecision,
              };
            })
          : undefined,
    };

    if (decision.validUntil) {
      decisionsByRule.validUntil =
        decision.validUntil && formatDateDecision(String(decision.validUntil));
    }

    return { ruleName: decision.ruleName, decisionsByRule: [decisionsByRule] };
  });

export { formatRuleDecisions };
