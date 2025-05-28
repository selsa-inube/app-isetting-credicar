import { IRuleDecision } from "@isettingkit/input";

interface IEditGeneralPolicies {
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

export type { IEditGeneralPolicies };
