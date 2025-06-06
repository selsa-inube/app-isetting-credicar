import { IRuleDecision } from "@isettingkit/input";

interface IUseNewDecisions {
  prevContributionsRef: React.MutableRefObject<IRuleDecision[]>;
  prevIncomesRef: React.MutableRefObject<IRuleDecision[]>;
  prevScoreModelsRef: React.MutableRefObject<IRuleDecision[]>;
  contributionsData?: IRuleDecision[];
  incomeData?: IRuleDecision[];
  scoreModelsData?: IRuleDecision[];
  normalizedContributions?: IRuleDecision[];
  normalizedIncome?: IRuleDecision[];
  normalizedScoreModels?: IRuleDecision[];
}

export type { IUseNewDecisions };
