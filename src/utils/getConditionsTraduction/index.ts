import { ECreditLines } from "@enum/creditLines";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";

const getConditionsTraduction = (
  data: IRuleDecisionExtended,
  language: string,
) => {
  const conditionTraduction: IConditionTraduction[] = [];
  data.conditionsThatEstablishesTheDecision?.forEach((cond) => {
    conditionTraduction.push({
      condition: cond.conditionName,
      conditionDataType: cond.conditionDataType,
      howToSetTheCondition: cond.howToSetTheCondition,
      listPossibleValues: {
        list: cond.listOfPossibleValues as unknown as string[],
      },
      label:
        cond.i18n?.[language as keyof typeof cond.i18n] ?? cond.conditionName,
    });
  });

  const ruleNameTraduction =
    data.i18n?.[language as keyof typeof data.i18n] ?? data.descriptionUse;

  const conditionCreditLine = conditionTraduction.find(
    (condition) => condition.condition === ECreditLines.CREDIT_LINE_RULE,
  )?.condition;

  const listValuesDecision = { list: data.listOfPossibleValues };

  return {
    conditionTraduction,
    ruleNameTraduction,
    conditionCreditLine,
    listValuesDecision,
  };
};

export { getConditionsTraduction };
