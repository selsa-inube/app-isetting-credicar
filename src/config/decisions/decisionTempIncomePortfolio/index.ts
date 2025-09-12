import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { enviroment } from "@config/environment";
import { IDecisionData } from "@ptypes/decisions/IDecision";
import { dataTranslations } from "@utils/dataTranslations";

const decisionIncomePortfolioConfig = ({
  ruleName,
  descriptionUse,
  howToSetTheDecision,
  decisionDataType,
  conditionsThatEstablishesTheDecision,
  listOfPossibleValues,
  i18n,
}: IDecisionData) => {
  if (descriptionUse && decisionDataType) {
    const decisionData = decisionDataType.toLocaleUpperCase();

    const decisionTemplate: IRuleDecision = {
      ruleName: ruleName,
      labelName: String(
        i18n?.[enviroment.VITE_LANGUAGE as keyof typeof i18n] ??
          "Número de veces los ingresos",
      ),
      descriptionUse: String(
        i18n?.[enviroment.VITE_LANGUAGE as keyof typeof i18n] ??
          "Número de veces los ingresos",
      ),
      decisionDataType:
        ValueDataType[decisionData as keyof typeof ValueDataType],
      howToSetTheDecision: howToSetTheDecision,
      value: "",
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
            condition.i18n?.[enviroment.VITE_LANGUAGE as keyof typeof i18n] ??
              condition.descriptionUse,
          ),
          descriptionUse: String(
            condition.i18n?.[enviroment.VITE_LANGUAGE as keyof typeof i18n] ??
              condition.descriptionUse,
          ),
          conditionDataType: condition.conditionDataType,
          value: condition.value,
          listOfPossibleValues: condition.listOfPossibleValues,
          howToSetTheCondition: condition.howToSetTheCondition,
        }));
    }

    return decisionTemplate;
  }
};

export { decisionIncomePortfolioConfig };
