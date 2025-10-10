import { IValue } from "@isettingkit/input";
import { IConditionGroups } from "../IConditionGroups";

interface IDecisionsByRule {
  effectiveFrom: string;
  validUntil?: string;
  value: string | string[] | number | IValue | undefined;
  transactionOperation?: string;
  conditionGroups?: IConditionGroups[];
  decisionId?: string;
  ruleName?: string;
  ruleDataType?: string;
  howToSetTheDecision?: string;
  decisionDataType?: string;
}

export type { IDecisionsByRule };
