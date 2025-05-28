import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { dataTranslations } from "@utils/dataTranslations";

const decisionIncomePortfolioConfig = ({
  ruleName,
  labelName,
  howToSetTheDecision,
  decisionDataType,
  conditionsThatEstablishesTheDecision,
  listOfPossibleValues,
}: IRuleDecision) => {
  if (labelName && decisionDataType) {
    const decisionData = decisionDataType.toLocaleUpperCase();

    const decisionTemplate: IRuleDecision = {
      ruleName: ruleName,
      labelName: "Número de veces los ingresos",
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
          labelName:
            dataTranslations[condition.labelName] ?? condition.labelName,
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
