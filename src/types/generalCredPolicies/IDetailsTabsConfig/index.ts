import { ITabConfig } from "@ptypes/ITabConfig";

interface IDetailsTabsConfig {
  generalDecision?: ITabConfig;
  contributionQuota?: ITabConfig;
  contribQuotaIncluded?: ITabConfig;
  contribQuotaRemoved?: ITabConfig;
  incomeQuota?: ITabConfig;
  incomeQuotaIncluded?: ITabConfig;
  incomeQuotaRemoved?: ITabConfig;
  scoreModels?: ITabConfig;
  scoreModelsIncluded?: ITabConfig;
  scoreModelsRemoved?: ITabConfig;
  minimumIncome?: ITabConfig;
  minimumIncomeIncluded?: ITabConfig;
  minimumIncomeRemoved?: ITabConfig;
}

export type { IDetailsTabsConfig };
