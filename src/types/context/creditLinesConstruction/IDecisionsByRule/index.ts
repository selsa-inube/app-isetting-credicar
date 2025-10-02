import { IConditionGroups } from "../IConditionGroups";

interface IDecisionsByRule {
  effectiveFrom: string;
  validUntil?: string;
  value: string;
  conditionGroups?: IConditionGroups[];
}

export type { IDecisionsByRule };
