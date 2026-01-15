/* eslint-disable @typescript-eslint/no-explicit-any */
import { IValue, ValueDataType } from "@isettingkit/input";
import { EValueHowToSetUp } from "@isettingkit/business-rules";
import { ECreditLines } from "@enum/creditLines";
import { ICondition } from "@ptypes/creditLines/ICondition";
import { IRuleMeta } from "@ptypes/decisions/IRuleMeta";
import { IConditionMeta } from "@ptypes/decisions/IConditionMeta";
import { IMeta } from "@ptypes/decisions/IMeta";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";
import { formatDateDecision } from "../date/formatDateDecision";
import { normalizeConditionTraduction } from "../normalizeConditionTraduction";
import { isRangeObject } from "../formatValueOfCondition";
import { getGroupName } from "../getGroupName";
import { geti18nValueDecision } from "../geti18nValueDecision";

const generateUUID = (): string => {
  return `decision-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const transformationDecisions = (
  payload: IRuleDecisionExtended,
  conditionArray: IConditionTraduction[],
  ruleNameTraduction: string,
  listValuesDecision?: IValue,
  dataType?: string,

  meta?: IMeta,
): IRuleDecisionExtended[] => {
  const ruleName = payload.ruleName;
  const ruleMeta: IRuleMeta = meta?.ruleDict?.[ruleName || ""] ?? {};
  const decisionByRuleArray = payload.decisionsByRule?.[0];
  const {
    labelName: ruleLabelName = ruleNameTraduction,
    descriptionUse: ruleDescriptionUse = ruleName,
    decisionDataType = dataType?.toLocaleLowerCase(),
    howToSetTheDecision = isRangeObject(decisionByRuleArray?.value)
      ? EValueHowToSetUp.RANGE
      : listValuesDecision?.list && listValuesDecision.list.length > 0
        ? EValueHowToSetUp.LIST_OF_VALUES
        : EValueHowToSetUp.EQUAL,
  } = ruleMeta;

  return payload.decisionsByRule
    ? payload.decisionsByRule?.map((decision) => {
        const groupedConditions: Record<string, ICondition[]> = {};

        decision.conditionGroups?.forEach((group, index) => {
          const groupId = group.conditionGroupId ?? getGroupName(index);

          const filteredConditions = group.conditionsThatEstablishesTheDecision
            .filter((c) => {
              if (c.conditionName === ECreditLines.CREDIT_LINE_RULE) {
                return false;
              }
              return Object.values(c.value).length > 0 ? true : false;
            })
            .map((c) => {
              const condMeta: IConditionMeta =
                meta?.conditionDict?.[c.conditionName] ?? {};
              const normalized = normalizeConditionTraduction(
                conditionArray,
                c.conditionName,
              );

              return {
                conditionName: c.conditionName,
                labelName: normalized?.label ?? c.conditionName,
                descriptionUse: condMeta.descriptionUse ?? c.conditionName,
                conditionDataType:
                  c.conditionDataType?.toLocaleLowerCase() ??
                  normalized?.conditionDataType?.toLowerCase() ??
                  ValueDataType.ALPHABETICAL,
                value: c.value,
                howToSetTheCondition: isRangeObject(c.value)
                  ? EValueHowToSetUp.RANGE
                  : EValueHowToSetUp.EQUAL,
                TimeUnit: condMeta.TimeUnit ?? c.TimeUnit ?? "",
                timeUnit: condMeta.timeUnit ?? c.timeUnit ?? "",
                listOfPossibleValues: normalized?.listPossibleValues ?? [],
                hidden: false,
              };
            });

          if (filteredConditions.length > 0) {
            groupedConditions[groupId] = filteredConditions;
          }
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
          i18nValue: geti18nValueDecision(
            decision.value,
            listValuesDecision?.list as any,
          ),
          listOfPossibleValues: listValuesDecision ?? [],
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
