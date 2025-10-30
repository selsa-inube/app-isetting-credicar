import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IUseDecisionTemplate {
  templateKey: string;
  ruleData: IRuleDecisionExtended;
  lineTypeDecision: string;
  useCaseConfiguration: string;
  ruleLoadding: boolean;
  loadingModify: boolean;
}

export type { IUseDecisionTemplate };
