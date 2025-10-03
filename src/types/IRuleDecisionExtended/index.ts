import { IRuleDecision } from "@isettingkit/input";
import { ILanguage } from "../i18n";
import { IConditionGroups } from "../context/creditLinesConstruction/IConditionGroups";

interface IRuleDecisionExtended extends IRuleDecision {
  i18n?: ILanguage;
  language?: string;
  conditionGroups?: IConditionGroups[];
  evaluationStatistics?: {
    conditionsEvaluated: string[];
    totalConditionsConfigurated: number;
    totalConditionsEvaluated: number;
  };
}

export type { IRuleDecisionExtended };
