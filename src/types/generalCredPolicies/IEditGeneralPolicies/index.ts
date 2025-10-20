import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IEditGeneralPolicies {
  contributionsData?: IRuleDecisionExtended[];
  incomeData?: IRuleDecisionExtended[];
  scoreModelsData?: IRuleDecisionExtended[];
  methodsData?: IRuleDecisionExtended[];
  additionalDebtorsData?: IRuleDecisionExtended[];
  realGuaranteesData?: IRuleDecisionExtended[];
}

export type { IEditGeneralPolicies };
