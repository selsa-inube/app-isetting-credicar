import { IValue } from "@isettingkit/input";
import { IConditionGroups } from "../IConditionGroups";

interface IDecisionsByRule {
  effectiveFrom: string;
  validUntil?: string;
  value: string | string[] | number | IValue | undefined;
  conditionGroups?: IConditionGroups[];
}

export type { IDecisionsByRule };
