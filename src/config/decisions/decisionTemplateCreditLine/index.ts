import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { enviroment } from "@config/environment";
import { IDecisionData } from "@ptypes/decisions/IDecision";

const decisionTemplateConfig = ({
  ruleName,
  decisionDataType,
  conditionsThatEstablishesTheDecision,
  i18n,
  descriptionUse,
}: IDecisionData) => {
  if (
    descriptionUse &&
    decisionDataType &&
    conditionsThatEstablishesTheDecision
  ) {
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
      howToSetTheDecision: ValueHowToSetUp.EQUAL,
      value: "",
      effectiveFrom: "",
      validUntil: "",
      conditionsThatEstablishesTheDecision:
        conditionsThatEstablishesTheDecision.map((condition) => ({
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
          value: "",
          howToSetTheCondition: ValueHowToSetUp.EQUAL,
        })),
    };

    return decisionTemplate;
  }
};

export { decisionTemplateConfig };
