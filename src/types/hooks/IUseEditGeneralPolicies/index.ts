import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";

interface IUseEditGeneralPolicies {
  contributionsData?: IRules[];
  incomeData?: IRules[];
  scoreModelsData?: IRules[];
  methodsData?: IRules[];
  additionalDebtorsData?: IRules[];
  realGuaranteesData?: IRules[];
}

export type { IUseEditGeneralPolicies };
