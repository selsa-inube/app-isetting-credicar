import { ValueDataType, ValueHowToSetUp } from "@isettingkit/input";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const decisionTemplateGenPolicies = (
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
  labelName: string,
  businessUnit?: string,
) => {
  if (descriptionUse && decisionDataType) {
    const decisionData = decisionDataType.toLocaleUpperCase();

    const buildGroup = (ConditionGroupId: string) => ({
      ConditionGroupId,
      conditionsThatEstablishesTheDecision:
        conditionsThatEstablishesTheDecision?.map((condition) => ({
          placeholder:
            condition.listOfPossibleValues?.list &&
            condition.listOfPossibleValues.list?.length > 0
              ? "Selecciona una opción"
              : "",
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
          listOfPossibleValues:
            Object.values(condition.listOfPossibleValues || []).length > 0
              ? condition.listOfPossibleValues
              : undefined,
          listOfPossibleValuesHidden: condition.listOfPossibleValues,
          howToSetTheCondition: condition.listOfPossibleValues
            ? ValueHowToSetUp.LIST_OF_VALUES
            : (condition.howToSetTheCondition ?? ValueHowToSetUp.EQUAL),
          hidden: condition.conditionName === "BusinessUnit" ? true : false,
        })),
    });

    const decisionTemplate = {
      ruleName: ruleName,
      placeholder:
        listOfPossibleValues?.list && listOfPossibleValues.list?.length > 0
          ? "Selecciona una opción"
          : "",
      labelName: String(
        i18n?.[language as keyof typeof i18n] ?? labelName ?? descriptionUse,
      ),
      descriptionUse: String(
        i18n?.[language as keyof typeof i18n] ?? labelName ?? descriptionUse,
      ),
      decisionDataType:
        ValueDataType[decisionData as keyof typeof ValueDataType],
      howToSetTheDecision: howToSetTheDecision,
      value: "",
      effectiveFrom: "",
      validUntil: "",
      listOfPossibleValues: listOfPossibleValues,
      conditionGroups: [
        buildGroup("group-primary"),
        buildGroup("additional-group-1"),
        buildGroup("additional-group-2"),
      ],
    };

    return decisionTemplate;
  }
};

export { decisionTemplateGenPolicies };
