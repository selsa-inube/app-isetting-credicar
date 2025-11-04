import { IDecisionsByRule } from "@ptypes/context/creditLinesConstruction/IDecisionsByRule";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const decisionsUpdateEqual = (
  dec1: IRuleDecisionExtended,
  dec2: IRuleDecisionExtended,
) => {
  if (dec1.ruleName !== dec2.ruleName && dec1.decisionId !== dec2.decisionId) {
    return false;
  }

  const getConditions = (decision: IRuleDecisionExtended) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: any[] = [];

    decision.decisionsByRule?.forEach((decisionGroup: IDecisionsByRule) => {
      decisionGroup.conditionGroups?.forEach((group) => {
        if (group.conditionsThatEstablishesTheDecision) {
          conditions.push(...group.conditionsThatEstablishesTheDecision);
        }
      });
    });

    return conditions;
  };

  const conditions1 = getConditions(dec1);
  const conditions2 = getConditions(dec2);

  return (
    JSON.stringify(conditions1.sort()) === JSON.stringify(conditions2.sort())
  );
};

export { decisionsUpdateEqual };
