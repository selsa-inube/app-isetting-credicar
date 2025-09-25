import { formatDate } from "@utils/date/formatDate";
import { transformKeysToLowerFirst } from "@utils/transformKeysToLowerFirst";
import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";
import { IDecisionData } from "@ptypes/decisions/IDecision";

const mapEvaluateRuleByBusinessEntityToApi = (
  ruleData: IEvaluateRuleRequest,
): IEvaluateRuleRequest => {
  return {
    ruleName: String(ruleData.ruleName),
    conditions: Object(ruleData.conditions),
  };
};

const mapEvaluateRuleByBusinessEntities = (
  data: IDecisionData[] | undefined,
  language: string,
) => {
  if (!data) return [];
  return data.map((item, index) => ({
    ...item,
    id: item.decisionId,
    businessRuleId: item.decisionId,
    decisionId: `Decisión ${index + 1}`,
    labelName: String(
      item.i18n?.[language as keyof typeof item.i18n] ?? item.descriptionUse,
    ),
    effectiveFrom: item.effectiveFrom
      ? formatDate(new Date(item.effectiveFrom))
      : undefined,
    validUntil: item.validUntil
      ? formatDate(new Date(item.validUntil))
      : undefined,
    conditionsThatEstablishesTheDecision:
      item.conditionsThatEstablishesTheDecision?.map((condition) => ({
        ...condition,
        labelName: String(
          condition.i18n?.[language as keyof typeof condition.i18n] ??
            condition.descriptionUse,
        ),
        value: transformKeysToLowerFirst(condition.value),
      })),
  }));
};

export {
  mapEvaluateRuleByBusinessEntityToApi,
  mapEvaluateRuleByBusinessEntities,
};
