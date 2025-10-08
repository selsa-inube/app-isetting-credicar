import { IEvaluationStatistics } from "@ptypes/decisions/IEvaluationStatistics";
import { IConditionsTheDecision } from "../IConditionsTheDecision";

interface IConditionGroups {
  conditionsThatEstablishesTheDecision: IConditionsTheDecision[];
  ConditionGroupId?: string;
  conditionGroupId?: string;
  transactionOperation?: string;
  evaluationStatistics?: IEvaluationStatistics;
}

export type { IConditionGroups };
