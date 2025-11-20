/* eslint-disable @typescript-eslint/no-explicit-any */
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
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      enumValues: (cond as any).enumValues,
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

  const enumValuesDecision = data.enumValues;

  return {
    conditionTraduction,
    ruleNameTraduction,
    conditionCreditLine,
    listValuesDecision,
    enumValuesDecision,
  };
};

export { getConditionsTraduction };
