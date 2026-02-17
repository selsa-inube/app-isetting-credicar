/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { EValueHowToSetUp } from "@isettingkit/business-rules";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";
import { IValue } from "@ptypes/decisions/IValue";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { normalizeConditionTraduction } from "../normalizeConditionTraduction";
import { isRangeObject } from "../formatValueOfCondition";
import { geti18nValueDecision } from "../geti18nValueDecision";
import { normalizeConditionValue } from "../normalizeConditionValue";

const transformationDecisionPolicies = (
  decision: IRuleDecision[],
  conditionArray: IConditionTraduction[],
  ruleNameTraduction: string,
  listValuesDecision: IValue | undefined,
): IRuleDecisionExtended[] => {
  return decision.map((dec) => ({
    ...dec,
    labelName: ruleNameTraduction,
    i18nValue: geti18nValueDecision(dec.value, listValuesDecision?.list as any),
    conditionGroups:
      dec.conditionGroups?.map((group) => ({
        ...group,
        conditionsThatEstablishesTheDecision:
          group.conditionsThatEstablishesTheDecision?.map((c) => {
            const normalized = normalizeConditionTraduction(
              conditionArray,
              c.conditionName,
            );
            const normalizedValue = normalizeConditionValue(
              conditionArray,
              c.conditionName,
              c.value,
            );

            return {
              ...c,
              labelName: normalized?.label as string,
              descriptionUse: c.conditionName,
              conditionDataType:
                normalized?.conditionDataType?.toLowerCase() ??
                c.conditionDataType?.toLocaleLowerCase() ??
                ValueDataType.ALPHABETICAL,
              value: normalizedValue,
              howToSetTheCondition: isRangeObject(c.value)
                ? EValueHowToSetUp.RANGE
                : EValueHowToSetUp.EQUAL,
              listOfPossibleValues:
                normalized?.listPossibleValues ?? ([] as IValue),
              hidden: false,
              i18n: geti18nValueDecision(
                c.value,
                normalized?.listPossibleValues?.list as any,
              ) as any,
            };
          }) ?? [],
      })) ?? [],
  }));
};

export { transformationDecisionPolicies };
