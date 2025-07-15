import { IDecision } from "@ptypes/decisions/IDecision";

const mapEnumeratorsRulesApiToEntity = (enumerator: IDecision): IDecision => {
  const enumeratorEntry: IDecision = {
    conditionsThatEstablishesTheDecision: Object(
      enumerator.conditionThatEstablishesTheDecision,
    ),
    decisionDataType: enumerator.decisionDataType,
    descriptionUse: String(enumerator.descriptionUse),
    howToSetTheDecision: enumerator.howToSetTheDecision,
    labelName: String(enumerator.labelName),
    ruleName: String(enumerator.ruleName),
    listOfPossibleValues: String(enumerator.listOfPossibleValues),
  };

  return enumeratorEntry;
};

export { mapEnumeratorsRulesApiToEntity };
