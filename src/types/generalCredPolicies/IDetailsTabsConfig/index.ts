import { ITabConfig } from "@ptypes/ITabConfig";

interface IDetailsTabsConfig {
  generalDecision?: ITabConfig;
  contributionQuota?: ITabConfig;
  contribQuotaIncluded?: ITabConfig;
  contribQuotaUpdated?: ITabConfig;
  contribQuotaRemoved?: ITabConfig;
  incomeQuota?: ITabConfig;
  incomeQuotaIncluded?: ITabConfig;
  incomeQuotaUpdated?: ITabConfig;
  incomeQuotaRemoved?: ITabConfig;
  scoreModels?: ITabConfig;
  scoreModelsIncluded?: ITabConfig;
  scoreModelsUpdated?: ITabConfig;
  scoreModelsRemoved?: ITabConfig;
  minimumIncome?: ITabConfig;
  minimumIncomeIncluded?: ITabConfig;
  minimumIncomeUpdated?: ITabConfig;
  minimumIncomeRemoved?: ITabConfig;
  basicNotifFormat?: ITabConfig;
  basicNotifFormatIncluded?: ITabConfig;
  basicNotifFormatUpdated?: ITabConfig;
  basicNotifFormatRemoved?: ITabConfig;
  basicNotifRecipient?: ITabConfig;
  basicNotifRecipientIncluded?: ITabConfig;
  basicNotifRecipientUpdated?: ITabConfig;
  basicNotifRecipientRemoved?: ITabConfig;
  minCredBureauRiskScore?: ITabConfig;
  minCredBureauRiskScoreIncluded?: ITabConfig;
  minCredBureauRiskScoreUpdated?: ITabConfig;
  minCredBureauRiskScoreRemoved?: ITabConfig;
  notificationChannel?: ITabConfig;
  notificationChannelIncluded?: ITabConfig;
  notificationChannelUpdated?: ITabConfig;
  notificationChannelRemoved?: ITabConfig;
  riskScoreApiUrl?: ITabConfig;
  riskScoreApiUrlIncluded?: ITabConfig;
  riskScoreApiUrlUpdated?: ITabConfig;
  riskScoreApiUrlRemoved?: ITabConfig;
}

export type { IDetailsTabsConfig };
