/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICondition } from "@ptypes/creditLines/ICondition";
import { IRuleMeta } from "@ptypes/decisions/IRuleMeta";
import { IConditionMeta } from "@ptypes/decisions/IConditionMeta";
import { IMeta } from "@ptypes/decisions/IMeta";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { formatDateDecision } from "../date/formatDateDecision";

const generateUUID = (): string => {
  return `decision-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const transformationDecisions = (
  payload: IRuleDecisionExtended,
  meta?: IMeta,
): IRuleDecisionExtended[] => {
  const ruleName = payload.ruleName;
  const ruleMeta: IRuleMeta = meta?.ruleDict?.[ruleName || ""] ?? {};
  const decisionByRuleArray = payload.decisionsByRule?.[0];
  const {
    labelName: ruleLabelName = ruleName,
    descriptionUse: ruleDescriptionUse = ruleName,
    decisionDataType = decisionByRuleArray?.ruleDataType
      ? decisionByRuleArray?.ruleDataType
      : "Alphabetical",
    howToSetTheDecision = decisionByRuleArray?.howToSetTheDecision
      ? decisionByRuleArray?.howToSetTheDecision
      : "EqualTo",
  } = ruleMeta;

  return payload.decisionsByRule
    ? payload.decisionsByRule?.map((decision) => {
        const groupedConditions: Record<string, ICondition[]> = {};
        decision.conditionGroups?.forEach((group, index) => {
          const groupId = group.ConditionGroupId ?? `Group-${index + 1}`;
          groupedConditions[groupId as string] =
            group.conditionsThatEstablishesTheDecision.map((c) => {
              const condMeta: IConditionMeta =
                meta?.conditionDict?.[c.conditionName] ?? {};
              return {
                conditionName: c.conditionName,
                labelName: condMeta.labelName ?? c.conditionName,
                descriptionUse: condMeta.descriptionUse ?? c.conditionName,
                conditionDataType: condMeta.conditionDataType ?? "Alphabetical",
                value: c.value,
                howToSetTheCondition:
                  condMeta.howToSetTheCondition ?? "EqualTo",
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
