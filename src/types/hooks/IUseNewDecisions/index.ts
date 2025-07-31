import { IRuleDecision } from "@isettingkit/input";
import { IDecisionsGeneralEntry } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralEntry";

interface IUseNewDecisions {
  formValues: IDecisionsGeneralEntry;
  initialGeneralData: IDecisionsGeneralEntry;
  prevContributionsRef: React.MutableRefObject<IRuleDecision[]>;
  prevIncomesRef: React.MutableRefObject<IRuleDecision[]>;
  prevScoreModelsRef: React.MutableRefObject<IRuleDecision[]>;
  user: string;
  contributionsData?: IRuleDecision[];
  incomeData?: IRuleDecision[];
  scoreModelsData?: IRuleDecision[];
  normalizedContributions?: IRuleDecision[];
  normalizedIncome?: IRuleDecision[];
  normalizedScoreModels?: IRuleDecision[];
}

export type { IUseNewDecisions };
