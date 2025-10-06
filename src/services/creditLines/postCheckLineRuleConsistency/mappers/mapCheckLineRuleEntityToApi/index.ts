import { ICheckedRuleLine } from "@ptypes/creditLines/ICheckedRuleLine";

const mapCheckLineRuleEntityToApi = (data: ICheckedRuleLine) => {
  return {
    rules: data.rules.map((decision) => ({
      decisionsByRule: decision.decisionsByRule,
      ruleName: decision.ruleName,
    })),
  };
};

export { mapCheckLineRuleEntityToApi };
