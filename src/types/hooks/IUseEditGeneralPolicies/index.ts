import { IRuleDecision } from "@isettingkit/input";

interface IUseEditGeneralPolicies {
  contributionsData?: IRuleDecision[];
  incomeData?: IRuleDecision[];
  scoreModelsData?: IRuleDecision[];
  methodsData?: IRuleDecision[];
  additionalDebtorsData?: IRuleDecision[];
  realGuaranteesData?: IRuleDecision[];
}

export type { IUseEditGeneralPolicies };
