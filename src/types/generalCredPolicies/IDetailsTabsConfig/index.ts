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
  basicNotifFormat?: ITabConfig;
  basicNotifFormatIncluded?: ITabConfig;
  basicNotifFormatRemoved?: ITabConfig;
  basicNotifRecipient?: ITabConfig;
  basicNotifRecipientIncluded?: ITabConfig;
  basicNotifRecipientRemoved?: ITabConfig;
  minCredBureauRiskScore?: ITabConfig;
  minCredBureauRiskScoreIncluded?: ITabConfig;
  minCredBureauRiskScoreRemoved?: ITabConfig;
  notificationChannel?: ITabConfig;
  notificationChannelIncluded?: ITabConfig;
  notificationChannelRemoved?: ITabConfig;
  riskScoreApiUrl?: ITabConfig;
  riskScoreApiUrlIncluded?: ITabConfig;
  riskScoreApiUrlRemoved?: ITabConfig;
}

export type { IDetailsTabsConfig };
