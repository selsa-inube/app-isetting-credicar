import { ValueDataType, ValueHowToSetUp } from "@isettingkit/input";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const decisionMinimumIncomePercentage = (
  {
    ruleName,
    descriptionUse,
    howToSetTheDecision,
    decisionDataType,
    conditionsThatEstablishesTheDecision,
    listOfPossibleValues,
    i18n,
  }: IRuleDecisionExtended,
  language: string,
) => {
  if (descriptionUse && decisionDataType) {
    const decisionData = decisionDataType.toLocaleUpperCase();

    const decisionTemplate = {
      ruleName: ruleName,
      labelName: String(
        i18n?.[language as keyof typeof i18n] ?? descriptionUse,
      ),
      descriptionUse: String(
        i18n?.[language as keyof typeof i18n] ?? descriptionUse,
      ),
      decisionDataType:
        ValueDataType[decisionData as keyof typeof ValueDataType],
      howToSetTheDecision: howToSetTheDecision,
      value: "",
      effectiveFrom: "",
      validUntil: "",
      listOfPossibleValues: listOfPossibleValues,
      conditionGroups: [
        {
          conditionGroupId: "",
          conditionsThatEstablishesTheDecision:
            conditionsThatEstablishesTheDecision?.map((condition) => ({
              conditionName: condition.conditionName,
              labelName: String(
                condition.i18n?.[language as keyof typeof i18n] ??
                  condition.descriptionUse,
              ),
              descriptionUse: String(
                condition.i18n?.[language as keyof typeof i18n] ??
                  condition.descriptionUse,
              ),
              conditionDataType: condition.conditionDataType,
              value: "",
              howToSetTheCondition: ValueHowToSetUp.EQUAL,
            })),
        },
      ],
    };

    return decisionTemplate;
  }
};

export { decisionMinimumIncomePercentage };
