import { ECreditLines } from "@enum/creditLines";
import { IValue } from "@ptypes/decisions/IValue";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";
import { IConditionExtended } from "@ptypes/decisions/IConditionExtended";

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
      const condExtended = cond as IConditionExtended;
      conditionTraduction.push({
        condition: condExtended.conditionName,
        conditionDataType: condExtended.conditionDataType,
        howToSetTheCondition: condExtended.howToSetTheCondition,
        listPossibleValues: condExtended.listOfPossibleValues as IValue,
        label:
          condExtended.i18n?.[language as keyof typeof cond.i18n] ??
          cond.conditionName,
        timeUnit: condExtended.timeUnit,
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

  const ruletimeUnit = data?.timeUnit;

  const listValuesDecision = data?.listOfPossibleValues;

  return {
    conditionTraduction,
    ruleNameTraduction,
    conditionCreditLine,
    listValuesDecision,
    ruletimeUnit,
    dataType,
  };
};

export { getConditionsTraduction };
