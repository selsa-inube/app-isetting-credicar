/* eslint-disable @typescript-eslint/no-explicit-any */
import { IValue, ValueDataType } from "@isettingkit/input";
import { EValueHowToSetUp } from "@isettingkit/business-rules";
import { ECreditLines } from "@enum/creditLines";
import { EUseCase } from "@enum/useCase";
import { ICondition } from "@ptypes/creditLines/ICondition";
import { IRuleMeta } from "@ptypes/decisions/IRuleMeta";
import { IConditionMeta } from "@ptypes/decisions/IConditionMeta";
import { IMeta } from "@ptypes/decisions/IMeta";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";
import { IEnumerators } from "@ptypes/IEnumerators";
import { formatDateDecision } from "../date/formatDateDecision";
import { normalizeConditionTraduction } from "../normalizeConditionTraduction";
import { isRangeObject } from "../formatValueOfCondition";

const generateUUID = (): string => {
  return `decision-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const transformationDecisions = (
  payload: IRuleDecisionExtended,
  conditionArray: IConditionTraduction[],
  ruleNameTraduction: string,
  listValuesDecision?: IValue,
  enumValuesDecision?: IEnumerators[],
  useCaseConfiguration?: string,
  meta?: IMeta,
): IRuleDecisionExtended[] => {
  const useCaseValidate =
    useCaseConfiguration === EUseCase.ADD ||
    useCaseConfiguration === EUseCase.DETAILS;

  const ruleName = payload.ruleName;
  const ruleMeta: IRuleMeta = meta?.ruleDict?.[ruleName || ""] ?? {};
  const decisionByRuleArray = payload.decisionsByRule?.[0];
  const {
    labelName: ruleLabelName = ruleNameTraduction,
    descriptionUse: ruleDescriptionUse = ruleName,
    decisionDataType = decisionByRuleArray?.ruleDataType?.toLocaleLowerCase() ??
      decisionByRuleArray?.decisionDataType?.toLocaleLowerCase() ??
      ValueDataType.ALPHABETICAL,
    howToSetTheDecision = decisionByRuleArray?.howToSetTheDecision
      ? decisionByRuleArray?.howToSetTheDecision
      : isRangeObject(decisionByRuleArray?.value)
        ? EValueHowToSetUp.RANGE
        : Array.isArray(decisionByRuleArray?.value)
          ? EValueHowToSetUp.LIST_OF_VALUES
          : EValueHowToSetUp.EQUAL,
  } = ruleMeta;

  return payload.decisionsByRule
    ? payload.decisionsByRule?.map((decision) => {
        const groupedConditions: Record<string, ICondition[]> = {};
        decision.conditionGroups?.forEach((group, index) => {
          const groupId = group.conditionGroupId ?? `Group-${index + 1}`;
          groupedConditions[groupId as string] =
            group.conditionsThatEstablishesTheDecision.map((c) => {
              const condMeta: IConditionMeta =
                meta?.conditionDict?.[c.conditionName] ?? {};
              return {
                conditionName: c.conditionName,
                labelName: normalizeConditionTraduction(
                  conditionArray,
                  c.conditionName,
                )?.label,
                descriptionUse: condMeta.descriptionUse ?? c.conditionName,
                conditionDataType:
                  condMeta.conditionDataType?.toLocaleLowerCase() ??
                  c.conditionDataType?.toLocaleLowerCase() ??
                  ValueDataType.ALPHABETICAL,
                value: c.value,
                howToSetTheCondition: !useCaseValidate
                  ? c.howToSetTheCondition
                  : (c.howToSetTheCondition ?? isRangeObject(c.value))
                    ? EValueHowToSetUp.RANGE
                    : Array.isArray(c.value)
                      ? EValueHowToSetUp.LIST_OF_VALUES
                      : EValueHowToSetUp.EQUAL,
                TimeUnit: condMeta.TimeUnit ?? c.TimeUnit ?? "",
                timeUnit: condMeta.timeUnit ?? c.timeUnit ?? "",
                listOfPossibleValues:
                  normalizeConditionTraduction(conditionArray, c.conditionName)
                    ?.listPossibleValues ?? [],
                enumValues:
                  normalizeConditionTraduction(conditionArray, c.conditionName)
                    ?.enumValues ?? [],
                hidden:
                  c.conditionName === ECreditLines.CREDIT_LINE_RULE
                    ? true
                    : false,
              };
            });
        });

        const effectiveFrom = formatDateDecision(
          decision.effectiveFrom ?? String(new Date()),
        );
        const validUntil = decision.validUntil
          ? formatDateDecision(decision.validUntil ?? "")
          : undefined;

        const out: any = {
          ruleName,
          labelName: ruleLabelName,
          descriptionUse: ruleDescriptionUse,
          decisionDataType,
          ruleDataType: decisionByRuleArray?.ruleDataType,
          howToSetTheDecision,
          value: decision.value,
          effectiveFrom,
          listOfPossibleValues: listValuesDecision ?? [],
          enumValues: enumValuesDecision,
          conditionsThatEstablishesTheDecision: groupedConditions,
          decisionId: decisionByRuleArray?.decisionId || generateUUID(),
        };
        if (decision.validUntil) {
          out.validUntil = validUntil;
        }
        return out;
      })
    : [];
};

export { transformationDecisions };
