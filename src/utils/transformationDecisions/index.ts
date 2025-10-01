/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRulePayload } from "@ptypes/creditLines/IRulePayload";
import { ICondition } from "@ptypes/creditLines/ICondition";
import { IRuleDecision } from "@isettingkit/input";
import { IRuleMeta } from "@ptypes/decisions/IRuleMeta";
import { IConditionMeta } from "@ptypes/decisions/IConditionMeta";
import { IMeta } from "@ptypes/decisions/IMeta";

const asDateOnly = (iso?: string | null): string =>
  iso ? new Date(iso).toISOString().slice(0, 10) : "";

const transformationDecisions = (
  payload: IRulePayload,
  meta?: IMeta,
): IRuleDecision[] => {
  const ruleName = payload.ruleName;

  const ruleMeta: IRuleMeta = meta?.ruleDict?.[ruleName] ?? {};
  const {
    labelName: ruleLabelName = ruleName,
    descriptionUse: ruleDescriptionUse = ruleName,
    decisionDataType = "alphabetical",
    howToSetTheDecision = "EqualTo",
  } = ruleMeta;

  return payload.decisionsByRule.map((decision, index) => {
    const groupedConditions: Record<string, ICondition[]> = {};

    decision.conditionGroups.forEach((group) => {
      const groupId = group.ConditionGroupId;
      groupedConditions[groupId] =
        group.conditionsThatEstablishesTheDecision.map((c) => {
          const condMeta: IConditionMeta =
            meta?.conditionDict?.[c.conditionName] ?? {};
          return {
            conditionName: c.conditionName,
            labelName: condMeta.labelName ?? c.conditionName,
            descriptionUse: condMeta.descriptionUse ?? c.conditionName,
            conditionDataType: condMeta.conditionDataType ?? "Alphabetical",
            value: c.value,
            howToSetTheCondition: condMeta.howToSetTheCondition ?? "EqualTo",
            listOfPossibleValues: condMeta.listOfPossibleValues ?? [],
          };
        });
    });

    const effectiveFrom = asDateOnly(decision.effectiveFrom);
    const validUntil = asDateOnly(decision.validUntil ?? "");

    const out: any = {
      ruleName,
      labelName: ruleLabelName,
      descriptionUse: ruleDescriptionUse,
      decisionDataType,
      howToSetTheDecision,
      value: String(decision.value ?? ""),
      effectiveFrom,
      validUntil,
      conditionsThatEstablishesTheDecision: groupedConditions,
      decisionId: `Decisión ${index + 1}`,
    };

    return out;
  });
};

export { transformationDecisions };
