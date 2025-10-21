import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const mapEvaluateRuleByBusinessEntityToApi = (
  ruleData: IEvaluateRuleRequest,
): IEvaluateRuleRequest => {
  return {
    ruleName: String(ruleData.ruleName),
    conditions: Object(ruleData.conditions),
  };
};

const mapEvaluateRuleByBusinessEntities = (data: IRuleDecisionExtended[]) => {
  if (!data) return [];
  return data.map((item) => ({
    ...item,
  }));
};

export {
  mapEvaluateRuleByBusinessEntityToApi,
  mapEvaluateRuleByBusinessEntities,
};
