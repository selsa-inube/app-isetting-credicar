import { IDecisionData } from "@ptypes/decisions/IDecision";

const mapEnumeratorsRulesApiToEntities = (
  enumerators: IDecisionData[],
): IDecisionData[] => {
  const enumeratorEntry: IDecisionData[] = enumerators.map((enumerator) => ({
    conditionsThatEstablishesTheDecision: Object(
      enumerator.conditionThatEstablishesTheDecision,
    ),
    decisionDataType: enumerator.decisionDataType,
    descriptionUse: String(enumerator.descriptionUse),
    howToSetTheDecision: enumerator.howToSetTheDecision,
    ruleName: String(enumerator.ruleName),
    listOfPossibleValues: enumerator.listOfPossibleValues,
    i18n: Object(enumerator.i18n),
  }));

  return enumeratorEntry;
};

export { mapEnumeratorsRulesApiToEntities };
