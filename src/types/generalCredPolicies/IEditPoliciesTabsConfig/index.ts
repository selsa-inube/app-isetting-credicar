import { ITabConfig } from "@ptypes/ITabConfig";

interface IEditPoliciesTabsConfig {
  decisionsGeneral: ITabConfig;
  contributionsPortfolio: ITabConfig;
  incomePortfolio: ITabConfig;
  scoreModels: ITabConfig;
  minimumIncomePercentage: ITabConfig;
  basicNotificationFormat: ITabConfig;
  basicNotificationRecipient: ITabConfig;
  minimumCreditBureauRiskScore: ITabConfig;
  notificationChannel: ITabConfig;
  riskScoreApiUrl: ITabConfig;
}

export type { IEditPoliciesTabsConfig };
