import { IRuleDecision } from "@isettingkit/input";

const revertModalDisplayData = (
  dataDecision: IRuleDecision,
  originalDecision: IRuleDecision,
) => {
  const conditionToRestore = {
    ruleName: dataDecision.ruleName,
    decisionDataType: dataDecision.decisionDataType,
    value: dataDecision.value,
    howToSetTheDecision: dataDecision.howToSetTheDecision,
    listOfPossibleValues: dataDecision.listOfPossibleValues,
    switchPlaces: true,
  };

  return {
    ...originalDecision,
    conditions: dataDecision.conditionsThatEstablishesTheDecision?.map(
      (condition) => (condition.hidden ? conditionToRestore : condition),
    ),
  };
};

export { revertModalDisplayData };
