import { IRuleDecision } from "@isettingkit/input";

interface IUseEditGenCredPolicies {
  referenceData?: IRuleDecision[];
  contributionsData?: IRuleDecision[];
  incomeData?: IRuleDecision[];
  scoreModelsData?: IRuleDecision[];
  methodsData?: IRuleDecision[];
  additionalDebtorsData?: IRuleDecision[];
  sourcesIncomeData?: IRuleDecision[];
  financialObligData?: IRuleDecision[];
  realGuaranteesData?: IRuleDecision[];
}

export type { IUseEditGenCredPolicies };
