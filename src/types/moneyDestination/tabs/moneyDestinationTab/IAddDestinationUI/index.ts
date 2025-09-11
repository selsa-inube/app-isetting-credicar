import { IAssistedStep } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { IRuleDecision } from "@isettingkit/input";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { IGeneralInformationEntry } from "../forms/IGeneralInformationEntry";

interface IAddDestinationUI {
  creditLineDecisions: IRuleDecision[];
  currentStep: number;
  generalInformationRef: React.RefObject<FormikProps<IGeneralInformationEntry> | null>;
  initialGeneralInformationValues: IGeneralInformationEntry;
  isCurrentFormValid: boolean;
  requestSteps: IRequestSteps[];
  showModal: boolean;
  showRequestProcessModal: boolean;
  steps: IAssistedStep[];
  saveMoneyDestination: ISaveDataResponse;
  loading: boolean;
  showPendingReqModal: boolean;
  showAttentionModal: boolean;
  smallScreen: boolean;
  modalData: IModalData;
  showDecision: boolean;
  onOpenModal: () => void;
  onFinishForm: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onToggleModal: () => void;
  setCreditLineDecisions: (decisions: IRuleDecision[]) => void;
  setCurrentStep: (step: number) => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseRequestStatus: () => void;
  onCloseProcess: () => void;
  onClosePendingReqModal: () => void;
  setShowAttentionModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IAddDestinationUI };
