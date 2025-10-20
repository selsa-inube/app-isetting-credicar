import { IRuleDecisionExtended } from "@src/types/IRuleDecisionExtended";

interface IUseEditGeneralPolicies {
  contributionsData?: IRuleDecisionExtended[];
  incomeData?: IRuleDecisionExtended[];
  scoreModelsData?: IRuleDecisionExtended[];
  methodsData?: IRuleDecisionExtended[];
  additionalDebtorsData?: IRuleDecisionExtended[];
  realGuaranteesData?: IRuleDecisionExtended[];
}

export type { IUseEditGeneralPolicies };
