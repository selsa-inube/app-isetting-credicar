import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";

interface IEditGeneralPolicies {
  contributionsData?: IRules[];
  incomeData?: IRules[];
  scoreModelsData?: IRules[];
  methodsData?: IRules[];
  additionalDebtorsData?: IRules[];
  realGuaranteesData?: IRules[];
}

export type { IEditGeneralPolicies };
