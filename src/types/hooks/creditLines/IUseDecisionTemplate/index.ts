import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IUseDecisionTemplate {
  templateKey: string;
  ruleData: IRuleDecisionExtended;
  lineTypeDecision: string;
}

export type { IUseDecisionTemplate };
