import { ITab } from "@inubekit/inubekit";
import { ICardData } from "@ptypes/home/ICardData";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IModalData } from "../IModalData";

interface IGeneralCreditPoliciesUI {
  withoutPolicies: boolean;
  smallScreen: boolean;
  loadingRequest: boolean;
  policiesTabs: ITab[];
  descriptionOptions: ICardData;
  smallScreenTab: boolean;
  showPoliciesTab: boolean;
  showrequestTab: boolean;
  isSelected: string;
  loadingPolicies: boolean;
  showAddPolicies?: boolean;
  showDecision: boolean;
  modalData: IModalData;
  onTabChange: (id: string) => void;
  handleOpenModal: () => void;
  onRequestsEmpty: () => void;
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

export type { IGeneralCreditPoliciesUI };
