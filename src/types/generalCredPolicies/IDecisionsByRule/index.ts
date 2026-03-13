import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IDecisionsByRule {
  ruleName: string;
  decisionsByRule: IRuleDecisionExtended[];
}

export type { IDecisionsByRule };
