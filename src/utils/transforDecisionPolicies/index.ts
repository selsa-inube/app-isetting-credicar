/* eslint-disable @typescript-eslint/no-explicit-any */
import { EValueHowToSetUp } from "@isettingkit/business-rules";
import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { IValue } from "@ptypes/decisions/IValue";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";
import { isRangeObject } from "../formatValueOfCondition";
import { geti18nValueDecision } from "../geti18nValueDecision";
import { normalizeConditionTraduction } from "../normalizeConditionTraduction";
import { normalizeConditionValue } from "../normalizeConditionValue";
import { transformSingleDecision } from "../transformationDecisionPolicies";

const transformDecisions = (
  prev: IRuleDecision[],
  ruleNameTraduction: string,
  dataType: string | undefined,
  listValuesDecision: IValue | undefined,
  conditionTraduction: IConditionTraduction[],
) => {
  return prev.map((dec) => ({
    ...dec,
    labelName: ruleNameTraduction ?? dec.labelName,
    decisionDataType: dataType?.toLocaleLowerCase(),
    i18nValue: geti18nValueDecision(dec.value, listValuesDecision?.list as any),
    conditionsThatEstablishesTheDecision: transformSingleDecision(
      dec,
      conditionTraduction,
    ),
    conditionGroups:
      dec.conditionGroups?.map((group) => ({
        ...group,
        conditionsThatEstablishesTheDecision:
          group.conditionsThatEstablishesTheDecision?.map((c) => {
            const normalized = normalizeConditionTraduction(
              conditionTraduction,
              c.conditionName,
            );

            const normalizedValue = normalizeConditionValue(
              conditionTraduction,
              c.conditionName,
              c.value,
            );

            return {
              ...c,
              labelName: normalized?.label as string,
              value: normalizedValue,
              i18nValue: geti18nValueDecision(
                c.value,
                normalized?.listPossibleValues?.list as any,
              ),
              conditionDataType:
                c.conditionDataType?.toLocaleLowerCase() ??
                normalized?.conditionDataType?.toLowerCase() ??
                ValueDataType.ALPHABETICAL,
              howToSetTheCondition: isRangeObject(c.value)
                ? EValueHowToSetUp.RANGE
                : EValueHowToSetUp.EQUAL,
            };
          }) ?? [],
      })) ?? [],
  }));
};

export { transformDecisions };
