import { IConditionsTheDecision } from "../IConditionsTheDecision";

interface IConditionGroups {
  conditionsThatEstablishesTheDecision: IConditionsTheDecision[];
  ConditionGroupId?: string;
  transactionOperation?: string;
}

export type { IConditionGroups };
