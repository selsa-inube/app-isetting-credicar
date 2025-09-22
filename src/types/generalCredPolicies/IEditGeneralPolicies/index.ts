import { IRuleDecision } from "@isettingkit/input";

interface IEditGeneralPolicies {
  contributionsData?: IRuleDecision[];
  incomeData?: IRuleDecision[];
  scoreModelsData?: IRuleDecision[];
  methodsData?: IRuleDecision[];
  additionalDebtorsData?: IRuleDecision[];
  realGuaranteesData?: IRuleDecision[];
}

export type { IEditGeneralPolicies };
