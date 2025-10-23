import { ValueDataType, ValueHowToSetUp } from "@isettingkit/input";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const decisionScoreModelsConfig = (
  {
    ruleName,
    descriptionUse,
    howToSetTheDecision,
    decisionDataType,
    conditionsThatEstablishesTheDecision,
    listOfPossibleValues,
    value,
    i18n,
  }: IRuleDecisionExtended,
  language: string,
  businessUnit?: string,
) => {
  if (
    !descriptionUse ||
    !decisionDataType ||
    !conditionsThatEstablishesTheDecision
  ) {
    return;
  }
  const decisionData = decisionDataType.toLocaleUpperCase();
  const decisionTemplate = {
    ruleName: ruleName,
    labelName: String(
      i18n?.[language as keyof typeof i18n] ?? "Modelo de score",
    ),
    descriptionUse: String(
      i18n?.[language as keyof typeof i18n] ?? "Modelo de score",
    ),
    decisionDataType: ValueDataType[decisionData as keyof typeof ValueDataType],
    howToSetTheDecision: howToSetTheDecision,
    value: value,
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
            value:
              condition.conditionName === "BusinessUnit"
                ? businessUnit
                : condition.value,
            howToSetTheCondition: ValueHowToSetUp.EQUAL,
            hidden: condition.conditionName === "BusinessUnit" ? true : false,
          })),
      },
    ],
  };
  return decisionTemplate;
};

export { decisionScoreModelsConfig };
