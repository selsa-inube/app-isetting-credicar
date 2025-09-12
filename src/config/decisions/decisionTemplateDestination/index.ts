import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { enviroment } from "@config/environment";
import { IDecisionData } from "@ptypes/decisions/IDecision";

const decisionTemplateConfig = (
  {
    ruleName,
    howToSetTheDecision,
    decisionDataType,
    conditionsThatEstablishesTheDecision,
    listOfPossibleValues,
    i18n,
    descriptionUse,
  }: IDecisionData,
  nameMoneyDestination: string,
) => {
  if (descriptionUse && decisionDataType) {
    const decisionData = decisionDataType.toLocaleUpperCase();

    const decisionTemplate: IRuleDecision = {
      ruleName: ruleName,
      labelName: String(
        i18n?.[enviroment.VITE_LANGUAGE as keyof typeof i18n] ?? descriptionUse,
      ),
      descriptionUse: String(
        i18n?.[enviroment.VITE_LANGUAGE as keyof typeof i18n] ?? descriptionUse,
      ),
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
          labelName: String(
            condition.i18n?.[enviroment.VITE_LANGUAGE as keyof typeof i18n] ??
              condition.descriptionUse,
          ),
          descriptionUse: String(
            condition.i18n?.[enviroment.VITE_LANGUAGE as keyof typeof i18n] ??
              condition.descriptionUse,
          ),
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
