import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IEditGeneralPolicies {
  contributionsData?: IRuleDecisionExtended[];
  incomeData?: IRuleDecisionExtended[];
  scoreModelsData?: IRuleDecisionExtended[];
  methodsData?: IRuleDecisionExtended[];
  additionalDebtorsData?: IRuleDecisionExtended[];
  realGuaranteesData?: IRuleDecisionExtended[];
  minimumIncomeData?: IRuleDecisionExtended[];
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

export type { IEditGeneralPolicies };
