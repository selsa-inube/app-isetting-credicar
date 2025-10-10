import { IEvaluateRuleRequest } from "@ptypes/decisions/IEvaluateRuleRequest";

interface IUseGetConfiguredDecisions {
  businessUnits: string;
  ruleData: IEvaluateRuleRequest;
  useCase?: string;
  rule?: string;
}

export type { IUseGetConfiguredDecisions };
