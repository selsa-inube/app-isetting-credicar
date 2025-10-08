import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";

const extractDecisionValues = (
  decisions: IRuleDecisionExtended[],
): {
  decisionValues: string[];
  conditionValues: string[];
} => {
  const decisionValues: string[] = [];
  const conditionValues: string[] = [];

  decisions.forEach((decision) => {
    if (decision.value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      decisionValues.push(decision.value as any);
    }

    if (decision.conditionGroups) {
      decision.conditionGroups?.forEach((group: IConditionGroups) => {
        group.conditionsThatEstablishesTheDecision?.forEach(
          (condition: IConditionsTheDecision) => {
            if (condition.value) {
              conditionValues.push(condition.value);
            }
          },
        );
      });
    }
  });

  return { decisionValues, conditionValues };
};

export { extractDecisionValues };
