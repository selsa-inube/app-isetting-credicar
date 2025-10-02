import { IConditionsTheDecision } from "../IConditionsTheDecision";

interface IConditionGroups {
  ConditionGroupId?: string;
  conditionsThatEstablishesTheDecision: IConditionsTheDecision[];
}

export type { IConditionGroups };
