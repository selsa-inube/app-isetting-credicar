/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValueDataType } from "@isettingkit/input";
import { EValueHowToSetUp } from "@isettingkit/business-rules";
import { ICondition } from "@ptypes/creditLines/ICondition";
import { IRuleMeta } from "@ptypes/decisions/IRuleMeta";
import { IConditionMeta } from "@ptypes/decisions/IConditionMeta";
import { IMeta } from "@ptypes/decisions/IMeta";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionTraduction } from "@ptypes/IConditionTraduction";
import { formatDateDecision } from "../date/formatDateDecision";
import { normalizeConditionTraduction } from "../normalizeConditionTraduction";

const generateUUID = (): string => {
  return `decision-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const transformationDecisions = (
  payload: IRuleDecisionExtended,
  conditionArray: IConditionTraduction[],
  ruleNameTraduction: string,
  meta?: IMeta,
): IRuleDecisionExtended[] => {
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
                howToSetTheCondition:
                  condMeta.howToSetTheCondition ??
                  c.howToSetTheCondition ??
                  EValueHowToSetUp.EQUAL,
                TimeUnit: condMeta.TimeUnit ?? c.TimeUnit ?? "",
                timeUnit: condMeta.timeUnit ?? c.timeUnit ?? "",
                listOfPossibleValues: condMeta.listOfPossibleValues ?? [],
              };
            });
        });

        const effectiveFrom = formatDateDecision(decision.effectiveFrom);
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
