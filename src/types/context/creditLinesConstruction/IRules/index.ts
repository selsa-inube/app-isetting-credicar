import { IDecisionsByRule } from "../IDecisionsByRule";

interface IRules {
  ruleName: string;
  decisionsByRule: IDecisionsByRule[];
  modifyJustification?: string;
}

export type { IRules };
