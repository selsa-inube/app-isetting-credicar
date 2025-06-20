import { IConditionsEvaluateRule } from "../IConditionsEvaluateRule";

interface IEvaluateRuleRequest {
  ruleName: string;
  conditions?: IConditionsEvaluateRule[];
}

export type { IEvaluateRuleRequest };
