import { IDecisionsGeneralEntry } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralEntry";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IUseNewDecisions {
  formValues: IDecisionsGeneralEntry;
  initialGeneralData: IDecisionsGeneralEntry;
  prevContributionsRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  prevIncomesRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  prevScoreModelsRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  prevMinimumIncomeRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  user: string;
  contributionsData?: IRuleDecisionExtended[];
  minimumIncomeData?: IRuleDecisionExtended[];
  methodsData?: IRuleDecisionExtended[];
  additionalDebtorsData?: IRuleDecisionExtended[];
  realGuaranteesData?: IRuleDecisionExtended[];
  incomeData?: IRuleDecisionExtended[];
  scoreModelsData?: IRuleDecisionExtended[];
  normalizedContributions?: IRuleDecisionExtended[];
  normalizedIncome?: IRuleDecisionExtended[];
  normalizedScoreModels?: IRuleDecisionExtended[];
  normalizedMinimumIncome?: IRuleDecisionExtended[];
}

export type { IUseNewDecisions };
