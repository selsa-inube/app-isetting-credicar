import { ValueDataType, ValueHowToSetUp } from "@isettingkit/input";
import { ECreditLines } from "@enum/creditLines";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const decisionTemplateConfig = (
  {
    ruleName,
    decisionDataType,
    conditionsThatEstablishesTheDecision,
    i18n,
    descriptionUse,
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
        i18n?.[language as keyof typeof i18n] ?? descriptionUse,
      ),
      descriptionUse: String(
        i18n?.[language as keyof typeof i18n] ?? descriptionUse,
      ),
      decisionDataType:
        ValueDataType[decisionData as keyof typeof ValueDataType],
      howToSetTheDecision: ValueHowToSetUp.EQUAL,
      value: "",
      effectiveFrom: "",
      validUntil: "",
      conditionsThatEstablishesTheDecision: {
        "group-primary": conditionsThatEstablishesTheDecision.map(
          (condition) => ({
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
            howToSetTheCondition: ValueHowToSetUp.EQUAL,
            hidden:
              condition.conditionName === ECreditLines.CREDIT_LINE_RULE
                ? true
                : false,
          }),
        ),
      },
    };
    return decisionTemplate;
  }
};

export { decisionTemplateConfig };
