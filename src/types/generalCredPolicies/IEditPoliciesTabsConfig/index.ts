import { ITabConfig } from "@ptypes/ITabConfig";

interface IEditPoliciesTabsConfig {
  decisionsGeneral: ITabConfig;
  contributionsPortfolio: ITabConfig;
  incomePortfolio: ITabConfig;
  scoreModels: ITabConfig;
  minimumIncomePercentage: ITabConfig;
}

export type { IEditPoliciesTabsConfig };
