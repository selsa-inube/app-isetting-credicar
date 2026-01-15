import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";

interface IUseGetConfiguredDecisions {
  businessUnits: string;
  ruleData: IEvaluateRuleRequest;
  token: string;
  useCase?: string;
  rule?: string;
}

export type { IUseGetConfiguredDecisions };
