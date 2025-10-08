import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";
import { IConfigDecisions } from "@ptypes/decisions/IConfigDecisions";

const mapEvaluateRuleByBusinessEntityToApi = (
  ruleData: IEvaluateRuleRequest,
): IEvaluateRuleRequest => {
  return {
    ruleName: String(ruleData.ruleName),
    conditions: Object(ruleData.conditions),
  };
};

const mapEvaluateRuleByBusinessEntities = (data: IConfigDecisions[]) => {
  if (!data) return [];
  return [
    {
      decisionsByRule: data.map((item) => ({
        ...item,
      })),
    },
  ];
};

export {
  mapEvaluateRuleByBusinessEntityToApi,
  mapEvaluateRuleByBusinessEntities,
};
