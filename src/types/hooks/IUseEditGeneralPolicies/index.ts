import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IUseEditGeneralPolicies {
  contributionsData?: IRuleDecisionExtended[];
  incomeData?: IRuleDecisionExtended[];
  scoreModelsData?: IRuleDecisionExtended[];
  minimumIncomeData?: IRuleDecisionExtended[];
  methodsData?: IRuleDecisionExtended[];
  additionalDebtorsData?: IRuleDecisionExtended[];
  realGuaranteesData?: IRuleDecisionExtended[];
  basicNotificFormatData?: IRuleDecisionExtended[];
  basicNotificationRecData?: IRuleDecisionExtended[];
  creditBureausConsultReqData?: IRuleDecisionExtended[];
  inquiryValidityPeriodData?: IRuleDecisionExtended[];
  lineCreditPayrollAdvanceData?: IRuleDecisionExtended[];
  lineCreditPayrollSpecialAdvanceData?: IRuleDecisionExtended[];
  maximumNotifDocSizeData?: IRuleDecisionExtended[];
  minCredBureauRiskScoreData?: IRuleDecisionExtended[];
  notifChannelData?: IRuleDecisionExtended[];
  riskScoreApiUrlData?: IRuleDecisionExtended[];
}

export type { IUseEditGeneralPolicies };
