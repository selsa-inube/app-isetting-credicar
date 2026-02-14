import { IDecisionsGeneralEntry } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralEntry";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

interface IUseNewDecisions {
  formValues: IDecisionsGeneralEntry;
  initialGeneralData: IDecisionsGeneralEntry;
  decisionData: IRuleDecisionExtended[];
  prevContributionsRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  prevIncomesRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  prevScoreModelsRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  prevMinimumIncomeRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  prevBasicNotificFormatRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  prevBasicNotificationRecRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  prevMinCredBureauRiskScoreRef: React.MutableRefObject<
    IRuleDecisionExtended[]
  >;
  prevNotifChannelRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  prevRiskScoreApiUrlRef: React.MutableRefObject<IRuleDecisionExtended[]>;
  user: string;
  contributionsData?: IRuleDecisionExtended[];
  minimumIncomeData?: IRuleDecisionExtended[];
  methodsData?: IRuleDecisionExtended[];
  additionalDebtorsData?: IRuleDecisionExtended[];
  realGuaranteesData?: IRuleDecisionExtended[];
  incomeData?: IRuleDecisionExtended[];
  scoreModelsData?: IRuleDecisionExtended[];
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

export type { IUseNewDecisions };
