import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { IDecisionData } from "@ptypes/decisions/IDecision";
import { dataTranslations } from "@utils/dataTranslations";

const decisionScoreModelsConfig = (
  {
    ruleName,
    descriptionUse,
    howToSetTheDecision,
    decisionDataType,
    conditionsThatEstablishesTheDecision,
    listOfPossibleValues,
    i18n,
  }: IDecisionData,
  language: string,
  nameRule?: string,
  businessUnit?: string,
) => {
  if (descriptionUse && decisionDataType) {
    const decisionData = decisionDataType.toLocaleUpperCase();

    const decisionTemplate: IRuleDecision = {
      ruleName: ruleName,
      labelName: String(
        i18n?.[language as keyof typeof i18n] ?? "Modelo de score",
      ),
      descriptionUse: String(
        i18n?.[language as keyof typeof i18n] ?? "Modelo de score",
      ),
      decisionDataType:
        ValueDataType[decisionData as keyof typeof ValueDataType],
      howToSetTheDecision: howToSetTheDecision,
      value: nameRule,
      effectiveFrom: "",
      validUntil: "",
      listOfPossibleValues: listOfPossibleValues,
    };

    if (
      conditionsThatEstablishesTheDecision &&
      conditionsThatEstablishesTheDecision?.length > 0
    ) {
      decisionTemplate.conditionsThatEstablishesTheDecision =
        conditionsThatEstablishesTheDecision.map((condition) => ({
          conditionName:
            dataTranslations[condition.conditionName] ??
            condition.conditionName,
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
          listOfPossibleValues: condition.listOfPossibleValues,
          howToSetTheCondition: condition.howToSetTheCondition,
          hidden: condition.conditionName === "BusinessUnit" ? true : false,
        }));
    }

    return decisionTemplate;
  }
};

export { decisionScoreModelsConfig };
