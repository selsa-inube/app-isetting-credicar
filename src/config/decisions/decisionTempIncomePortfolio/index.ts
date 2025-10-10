import { ValueDataType } from "@isettingkit/input";
import { dataTranslations } from "@utils/dataTranslations";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const decisionIncomePortfolioConfig = (
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
  if (
    descriptionUse &&
    decisionDataType &&
    conditionsThatEstablishesTheDecision
  ) {
    const decisionData = decisionDataType.toLocaleUpperCase();

    const decisionTemplate = {
      ruleName: ruleName,
      labelName: String(
        i18n?.[language as keyof typeof i18n] ?? "Número de veces los ingresos",
      ),
      descriptionUse: String(
        i18n?.[language as keyof typeof i18n] ?? "Número de veces los ingresos",
      ),
      decisionDataType:
        ValueDataType[decisionData as keyof typeof ValueDataType],
      howToSetTheDecision: howToSetTheDecision,
      value: "",
      effectiveFrom: "",
      validUntil: "",
      listOfPossibleValues: listOfPossibleValues,
      conditionsThatEstablishesTheDecision: {
        "group-primary": conditionsThatEstablishesTheDecision.map(
          (condition) => ({
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
            value: condition.value,
            listOfPossibleValues: condition.listOfPossibleValues,
            howToSetTheCondition: condition.howToSetTheCondition,
          }),
        ),
      },
    };

    return decisionTemplate;
  }
};

export { decisionIncomePortfolioConfig };
