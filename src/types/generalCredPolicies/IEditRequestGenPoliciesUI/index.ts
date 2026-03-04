import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IEditRequestGenPoliciesUI {
  option: string;
  id: string;
  requestNumber: string;
  smallScreen: boolean;
  loading: boolean;
  hasError: boolean;
  data: Record<string, unknown[]> | undefined;
  contributionsData?: IRuleDecisionExtended[];
  minimumIncomeData?: IRuleDecisionExtended[];
  incomeData?: IRuleDecisionExtended[];
  scoreModelsData?: IRuleDecisionExtended[];
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

export type { IEditRequestGenPoliciesUI };
