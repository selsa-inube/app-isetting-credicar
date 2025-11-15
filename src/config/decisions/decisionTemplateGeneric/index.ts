import { ValueDataType } from "@isettingkit/input";
import { ECreditLines } from "@enum/creditLines";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const decisionTemplateConfig = (
  {
    ruleName,
    decisionDataType,
    conditionsThatEstablishesTheDecision,
    i18n,
    descriptionUse,
    howToSetTheDecision,
    listOfPossibleValues,
  }: IRuleDecisionExtended,
  language: string,
) => {
  if (
    descriptionUse &&
    decisionDataType &&
    conditionsThatEstablishesTheDecision
  ) {
    const decisionData = decisionDataType.toLocaleUpperCase();

    const localLabel = String(
      i18n?.[language as keyof typeof i18n] ?? descriptionUse,
    );

    const buildGroup = (ConditionGroupId: string) => ({
      ConditionGroupId,
      conditionsThatEstablishesTheDecision:
        conditionsThatEstablishesTheDecision.map((condition) => ({
          conditionName: condition.conditionName,
          labelName: String(
            condition.i18n?.[language as keyof typeof condition.i18n] ??
              condition.descriptionUse,
          ),
          descriptionUse: String(
            condition.i18n?.[language as keyof typeof condition.i18n] ??
              condition.descriptionUse,
          ),
          conditionDataType: condition.conditionDataType.toLocaleLowerCase(),
          value: "",
          listOfPossibleValues: condition.listOfPossibleValues
            ? condition.listOfPossibleValues
            : [],
          howToSetTheCondition: condition.howToSetTheCondition,
          hidden:
            condition.conditionName === ECreditLines.CREDIT_LINE_RULE
              ? true
              : false,
        })),
    });

    console.log("🐔🐸", { listOfPossibleValues }, buildGroup("group-primary"));

    return {
      ruleName,
      labelName: localLabel,
      descriptionUse: localLabel,
      decisionDataType:
        ValueDataType[decisionData as keyof typeof ValueDataType],
      howToSetTheDecision,
      value: "",
      effectiveFrom: "",
      validUntil: "",
      listOfPossibleValues: listOfPossibleValues ? listOfPossibleValues : [],
      conditionGroups: [
        buildGroup("group-primary"),
        buildGroup("additional-group-1"),
        buildGroup("additional-group-2"),
      ],
    };
  }
  return undefined;
};

export { decisionTemplateConfig };
