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
  console.log("data mapEvaluateRuleByBusinessEntities", data);
  return [
    {
      decisionsByRule: data.map((item) => ({
        ...item,
        labelName: item.ruleName,
        conditionGroups: item.conditionGroups?.map((group) => ({
          ...group,
          conditionsThatEstablishesTheDecision:
            group.conditionsThatEstablishesTheDecision?.map((condition) => ({
              ...condition,
              labelName: condition.conditionName,
            })),
        })),
      })),
    },
  ];
};

export {
  mapEvaluateRuleByBusinessEntityToApi,
  mapEvaluateRuleByBusinessEntities,
};
