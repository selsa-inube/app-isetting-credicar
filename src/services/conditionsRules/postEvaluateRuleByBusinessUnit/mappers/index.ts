import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";

const mapEvaluateRuleByBusinessEntityToApi = (
  ruleData: IEvaluateRuleRequest,
): IEvaluateRuleRequest => {
  return {
    ruleName: String(ruleData.ruleName),
    conditions: Object(ruleData.conditions),
  };
};

const mapEvaluateRuleByBusinessEntities = (data: IRules[]) => {
  if (!data) return [];
  return data.map((item) => ({
    ...item,
  }));
};

export {
  mapEvaluateRuleByBusinessEntityToApi,
  mapEvaluateRuleByBusinessEntities,
};
