/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICondition } from "@ptypes/creditLines/ICondition";
import { IRuleMeta } from "@ptypes/decisions/IRuleMeta";
import { IConditionMeta } from "@ptypes/decisions/IConditionMeta";
import { IMeta } from "@ptypes/decisions/IMeta";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { parseIfJSON } from "../parseIfJSON";
import { formatDateDecision } from "../date/formatDateDecision";

const validateObject = (payload: any) => {
  if (typeof payload !== "object") {
    return payload.decisionsByRule?.[0];
  }
  return payload;
};

const transformationDecisions = (
  payload: IRuleDecisionExtended,
  meta?: IMeta,
): IRuleDecisionExtended[] => {
  const ruleName = payload.ruleName;

  console.log({ payload });

  const ruleMeta: IRuleMeta = meta?.ruleDict?.[ruleName || ""] ?? {};
  const {
    labelName: ruleLabelName = ruleName,
    descriptionUse: ruleDescriptionUse = ruleName,
    decisionDataType = validateObject(payload).ruleDataType
      ? validateObject(payload).ruleDataType
      : "Alphabetical",
    howToSetTheDecision = validateObject(payload).howToSetTheDecision
      ? validateObject(payload).howToSetTheDecision
      : "EqualTo",
  } = ruleMeta;

  return payload.decisionsByRule
    ? payload.decisionsByRule?.map((decision, index) => {
        const groupedConditions: Record<string, ICondition[]> = {};
        decision.conditionGroups?.forEach((group) => {
          const groupId = group.conditionGroupId ?? `Group-${index + 1}`;
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
        const validUntil = formatDateDecision(decision.validUntil ?? "");

        const out: any = {
          ruleName,
          labelName: ruleLabelName,
          descriptionUse: ruleDescriptionUse,
          decisionDataType,
          howToSetTheDecision,
          value: parseIfJSON(decision.value ?? ""),
          effectiveFrom,
          validUntil,
          conditionsThatEstablishesTheDecision: groupedConditions,
          decisionId: validateObject(payload).decisionId
            ? validateObject(payload).decisionId
            : `Decisión ${index + 1}`,
        };
        return out;
      })
    : [];
};

export { transformationDecisions };
