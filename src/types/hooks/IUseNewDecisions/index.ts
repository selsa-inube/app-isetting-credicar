import { IDecisionsGeneralEntry } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralEntry";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";

interface IUseNewDecisions {
  formValues: IDecisionsGeneralEntry;
  initialGeneralData: IDecisionsGeneralEntry;
  prevContributionsRef: React.MutableRefObject<IRules[]>;
  prevIncomesRef: React.MutableRefObject<IRules[]>;
  prevScoreModelsRef: React.MutableRefObject<IRules[]>;
  user: string;
  contributionsData?: IRules[];
  incomeData?: IRules[];
  scoreModelsData?: IRules[];
  normalizedContributions?: IRules[];
  normalizedIncome?: IRules[];
  normalizedScoreModels?: IRules[];
}

export type { IUseNewDecisions };
