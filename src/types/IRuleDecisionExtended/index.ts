import { IRuleDecision } from "@isettingkit/input";
import { ILanguage } from "../i18n";
import { IConditionGroups } from "../context/creditLinesConstruction/IConditionGroups";
import { IDecisionsByRule } from "../context/creditLinesConstruction/IDecisionsByRule";
import { IEvaluationStatistics } from "../decisions/IEvaluationStatistics";
import { IEnumerators } from "../IEnumerators";

interface IRuleDecisionExtended extends IRuleDecision {
  i18n?: ILanguage;
  language?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conditionGroups?: IConditionGroups[] | any;
  decisionsByRule?: IDecisionsByRule[];
  enumValues?: IEnumerators[];
  evaluationStatistics?: IEvaluationStatistics;
  parameterizedConditions?: string[];
  modifyJustification?: string;
}

export type { IRuleDecisionExtended };
