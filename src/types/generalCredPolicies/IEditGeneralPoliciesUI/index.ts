import { FormikProps } from "formik";
import { ITab } from "@inubekit/inubekit";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { IDecisionsGeneralEntry } from "../forms/IDecisionsGeneralEntry";
import { IModalData } from "../IModalData";
import { IRuleState } from "../IRuleState";
import { IRuleDecision } from "@isettingkit/input";

interface IEditGeneralPoliciesUI {
  filteredTabsConfig: ITab[];
  isSelected: string;
  requestSteps: IRequestSteps[];
  loading: boolean;
  showPendingReqModal: boolean;
  showDateModal: boolean;
  showRequestProcessModal: boolean;
  saveGeneralPolicies: ISaveDataResponse;
  smallScreen: boolean;
  formValues: IDecisionsGeneralEntry;
  initialDecisionsData: IDecisionsGeneralEntry;
  decisionsGeneralReference: React.RefObject<FormikProps<IDecisionsGeneralEntry> | null>;
  showDecisionsGeneral: boolean;
  showIncomePort: boolean;
  showContributions: boolean;
  showScoreModels: boolean;
  showMinimumIncome: boolean;
  showBasicNotificFormat: boolean;
  showBasicNotifRecipient: boolean;
  showMinCreditBureauRiskScore: boolean;
  showNotificationChannel: boolean;
  showRiskScoreApiUrl: boolean;
  showGoBackModal: boolean;
  isRequestStatusModal: boolean;
  modalData: IModalData;
  showDecision: boolean;
  rulesData: IRuleState;
  disabledButton: boolean;
  handleToggleDateModal: () => void;
  onEditedModal: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDecisionData: React.Dispatch<React.SetStateAction<IRuleDecision[] | any>>;
  setShowReciprocity: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFactor: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleDateModal: () => void;
  onTabChange: (id: string) => void;
  onReset: () => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseRequestStatus: () => void;
  onClosePendingReqModal: () => void;
  onCloseProcess: () => void;
}

export type { IEditGeneralPoliciesUI };
