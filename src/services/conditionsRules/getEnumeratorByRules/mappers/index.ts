import { IDecisionData } from "@ptypes/decisions/IDecision";

const mapEnumeratorsRulesApiToEntity = (
  enumerator: IDecisionData,
): IDecisionData => {
  const enumeratorEntry: IDecisionData = {
    conditionsThatEstablishesTheDecision: Object(
      enumerator.conditionThatEstablishesTheDecision,
    ),
    decisionDataType: enumerator.decisionDataType,
    descriptionUse: String(enumerator.descriptionUse),
    howToSetTheDecision: enumerator.howToSetTheDecision,
    ruleName: String(enumerator.ruleName),
    listOfPossibleValues: enumerator.listOfPossibleValues,
    i18n: Object(enumerator.i18n),
  };

  return enumeratorEntry;
};

export { mapEnumeratorsRulesApiToEntity };
