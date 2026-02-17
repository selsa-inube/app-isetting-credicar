import { ECreditLines } from "@enum/creditLines";
import { IValue } from "@ptypes/decisions/IValue";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";

const getConditionsTraduction = (
  data: IRuleDecisionExtended | undefined | null,
  language: string,
) => {
  const conditionTraduction: IConditionTraduction[] = [];

  if (
    data &&
    data.conditionsThatEstablishesTheDecision &&
    Array.isArray(data.conditionsThatEstablishesTheDecision)
  ) {
    data.conditionsThatEstablishesTheDecision.forEach((cond) => {
      conditionTraduction.push({
        condition: cond.conditionName,
        conditionDataType: cond.conditionDataType,
        howToSetTheCondition: cond.howToSetTheCondition,
        listPossibleValues: cond.listOfPossibleValues as IValue,
        label:
          cond.i18n?.[language as keyof typeof cond.i18n] ?? cond.conditionName,
      });
    });
  }

  const dataType = data?.decisionDataType;
  const ruleNameTraduction =
    data?.i18n?.[language as keyof typeof data.i18n] ??
    data?.descriptionUse ??
    "";

  const conditionCreditLine = conditionTraduction.find(
    (condition) => condition.condition === ECreditLines.CREDIT_LINE_RULE,
  )?.condition;

  const listValuesDecision = data?.listOfPossibleValues;

  return {
    conditionTraduction,
    ruleNameTraduction,
    conditionCreditLine,
    listValuesDecision,
    dataType,
  };
};

export { getConditionsTraduction };
