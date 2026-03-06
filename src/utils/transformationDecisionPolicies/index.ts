/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValueDataType } from "@isettingkit/input";
import { EValueHowToSetUp } from "@isettingkit/business-rules";
import { groupKeys } from "@config/generalCreditPolicies/groupKeys";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";
import { IValue } from "@ptypes/decisions/IValue";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { ICondition } from "@ptypes/creditLines/ICondition";
import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";
import { IDecisionsByRule } from "@ptypes/generalCredPolicies/IDecisionsByRule";
import { normalizeConditionTraduction } from "../normalizeConditionTraduction";
import { geti18nValueDecision } from "../geti18nValueDecision";
import { isRangeObject } from "../formatValueOfCondition";
import { normalizeConditionValue } from "../normalizeConditionValue";

const transformConditionGroup = (
  group: any,
  conditionArray: IConditionTraduction[],
  groupKey: string,
): Record<string, any[]> => {
  const transformedConditions = (
    group.conditionsThatEstablishesTheDecision ?? []
  ).map((c: any) => {
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
      labelName: normalized?.label ?? c.labelName,
      descriptionUse: c.conditionName,
      conditionDataType:
        normalized?.conditionDataType?.toLowerCase() ??
        c.conditionDataType?.toLowerCase() ??
        ValueDataType.ALPHABETICAL,
      value: normalizedValue,
      howToSetTheCondition: isRangeObject(c.value)
        ? EValueHowToSetUp.RANGE
        : EValueHowToSetUp.EQUAL,
      listOfPossibleValues: normalized?.listPossibleValues ?? ([] as IValue),
      hidden: false,
      i18nValue: geti18nValueDecision(
        c.value,
        normalized?.listPossibleValues?.list as any,
      ) as any,
    };
  });

  return { [groupKey]: transformedConditions };
};

const transformSingleDecision = (
  dec: IRuleDecisionExtended,
  conditionArray: IConditionTraduction[],
): IRuleDecisionExtended => {
  const conditionsThatEstablishesTheDecision: Record<string, ICondition[]> = {};

  if (dec.conditionGroups && dec.conditionGroups.length > 0) {
    dec.conditionGroups.forEach((group: IConditionGroups, index: number) => {
      const groupKey = groupKeys[index] ?? `group-alternate-${index + 1}`;
      const transformed = transformConditionGroup(
        group,
        conditionArray,
        groupKey,
      );
      Object.assign(conditionsThatEstablishesTheDecision, transformed);
    });
  }

  return conditionsThatEstablishesTheDecision;
};

const transformationDecisionPolicies = (
  decisions: IRuleDecisionExtended,
  conditionArray: IConditionTraduction[],
): IDecisionsByRule => {
  const ruleName = decisions?.ruleName ?? "";

  const transformedDecision = transformSingleDecision(
    decisions,
    conditionArray,
  );

  return {
    ruleName,
    decisionsByRule: [transformedDecision],
  };
};

export { transformationDecisionPolicies, transformSingleDecision };
