import { ValueDataType, ValueHowToSetUp } from "@isettingkit/input";
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
              listOfPossibleValues: {
                list: condition.listOfPossibleValues?.list?.map(
                  (item) => (item as unknown as { label: string }).label,
                ),
              },
              listOfPossibleValuesHidden: condition.listOfPossibleValues,
              howToSetTheCondition: condition.listOfPossibleValues
                ? ValueHowToSetUp.LIST_OF_VALUES
                : (condition.howToSetTheCondition ?? ValueHowToSetUp.EQUAL),
            })),
        },
      ],
    };

    return decisionTemplate;
  }
};

export { decisionIncomePortfolioConfig };
