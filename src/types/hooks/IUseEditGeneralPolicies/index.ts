import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IUseEditGeneralPolicies {
  contributionsData?: IRuleDecisionExtended[];
  incomeData?: IRuleDecisionExtended[];
  scoreModelsData?: IRuleDecisionExtended[];
  minimumIncomeData?: IRuleDecisionExtended[];
  methodsData?: IRuleDecisionExtended[];
  additionalDebtorsData?: IRuleDecisionExtended[];
  realGuaranteesData?: IRuleDecisionExtended[];
}

export type { IUseEditGeneralPolicies };
