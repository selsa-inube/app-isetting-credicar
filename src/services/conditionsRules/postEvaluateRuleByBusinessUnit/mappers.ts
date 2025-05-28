import { IRuleDecision } from "@isettingkit/input";
import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";
import { formatDate } from "@utils/date/formatDate";
import { dataTranslations } from "@utils/dataTranslations";

const mapEvaluateRuleByBusinessEntityToApi = (
  ruleData: IEvaluateRuleRequest,
): IEvaluateRuleRequest => {
  return {
    ruleName: String(ruleData.ruleName),
    conditions: Object(ruleData.conditions),
  };
};

const mapEvaluateRuleByBusinessEntities = (
  data: IRuleDecision[] | undefined,
) => {
  if (!data) return [];
  return data.map((item, index) => ({
    ...item,
    id: item.decisionId,
    businessRuleId: item.decisionId,
    decisionId: `Decisión ${index + 1}`,
    labelName:
      item.labelName && dataTranslations[item.labelName]
        ? dataTranslations[item.labelName]
        : item.labelName,
    effectiveFrom: item.effectiveFrom
      ? formatDate(new Date(item.effectiveFrom))
      : undefined,
    validUntil: item.validUntil
      ? formatDate(new Date(item.validUntil))
      : undefined,
    conditionThatEstablishesTheDecision:
      item.conditionsThatEstablishesTheDecision?.map((condition) => ({
        ...condition,
        labelName:
          condition.labelName && dataTranslations[condition.labelName]
            ? dataTranslations[condition.labelName]
            : condition.labelName,
      })),
  }));
};

export {
  mapEvaluateRuleByBusinessEntityToApi,
  mapEvaluateRuleByBusinessEntities,
};
