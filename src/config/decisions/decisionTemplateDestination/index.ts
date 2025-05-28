import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { dataTranslations } from "@utils/dataTranslations";

const decisionTemplateConfig = (
  {
    ruleName,
    labelName,
    howToSetTheDecision,
    decisionDataType,
    conditionsThatEstablishesTheDecision,
    listOfPossibleValues,
  }: IRuleDecision,
  nameMoneyDestination: string,
) => {
  if (labelName && decisionDataType) {
    const decisionData = decisionDataType.toLocaleUpperCase();

    const decisionTemplate: IRuleDecision = {
      ruleName: ruleName,
      labelName: dataTranslations[labelName],
      decisionDataType:
        ValueDataType[decisionData as keyof typeof ValueDataType],
      howToSetTheDecision: howToSetTheDecision,
      value: "",
      effectiveFrom: "",
      validUntil: "",
      listOfPossibleValues: listOfPossibleValues,
      conditionsThatEstablishesTheDecision:
        conditionsThatEstablishesTheDecision?.map((condition) => ({
          conditionName: condition.conditionName,
          labelName:
            dataTranslations[condition.labelName] ?? condition.labelName,
          conditionDataType: condition.conditionDataType,
          value:
            condition.conditionName === "MoneyDestination"
              ? nameMoneyDestination
              : condition.value,
          listOfPossibleValues: condition.listOfPossibleValues,
          howToSetTheCondition: condition.howToSetTheCondition,
          hidden: condition.conditionName === "MoneyDestination",
        })),
    };

    return decisionTemplate;
  }
};

export { decisionTemplateConfig };
