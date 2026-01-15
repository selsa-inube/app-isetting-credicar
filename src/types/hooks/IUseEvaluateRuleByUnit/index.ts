import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";

interface IUseEvaluateRuleByUnit {
  businessUnits: string;
  rulesData: IEvaluateRuleRequest;
  language: string;
  token: string;
}

export type { IUseEvaluateRuleByUnit };
