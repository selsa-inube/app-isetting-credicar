import { IDecisionsByRule } from "../IDecisionsByRule";

interface IRules {
  ruleName: string;
  decisionsByRule: IDecisionsByRule[];
}

export type { IRules };
