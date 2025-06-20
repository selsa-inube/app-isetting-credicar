import { IAssistedStep } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { IRuleDecision } from "@isettingkit/input";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IGeneralInformationEntry } from "../forms/IGeneralInformationEntry";

interface IAddDestinationUI {
  creditLineDecisions: IRuleDecision[];
  currentStep: number;
  generalInformationRef: React.RefObject<FormikProps<IGeneralInformationEntry>>;
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
