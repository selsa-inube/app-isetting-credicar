import { ITabConfig } from "@ptypes/payrollAgreement/requestInProgTab/ITabConfig";

interface IEditPoliciesTabsConfig {
  decisionsGeneral: ITabConfig;
  contributionsPortfolio: ITabConfig;
  incomePortfolio: ITabConfig;
  scoreModels: ITabConfig;
}

export type { IEditPoliciesTabsConfig };
