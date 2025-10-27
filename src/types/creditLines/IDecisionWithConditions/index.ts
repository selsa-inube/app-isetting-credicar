import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";
import { IValue } from "@ptypes/decisions/IValue";

interface IDecisionWithConditions {
  effectiveFrom: string | Date | undefined;
  value: string | number | string[] | IValue | undefined;
  transactionOperation?: string;
  conditionGroups?: IConditionGroups[];
  decisionId?: string;
}

export type { IDecisionWithConditions };
