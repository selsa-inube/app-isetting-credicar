import { IAssistedStep } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { IModalData } from "@ptypes/generalCredPolicies/IModalData";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IGeneralInformationEntry } from "../forms/IGeneralInformationEntry";

interface IAddDestinationUI {
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
  smallScreen: boolean;
  modalData: IModalData;
  showDecision: boolean;
  creditLineValues: IServerDomain[];
  showDecisionModal: boolean;
  setShowDecisionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCreditLineValues: React.Dispatch<React.SetStateAction<IServerDomain[]>>;
  onOpenModal: () => void;
  onFinishForm: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onToggleModal: () => void;
  setCurrentStep: (step: number) => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseRequestStatus: () => void;
  onCloseProcess: () => void;
  onClosePendingReqModal: () => void;
}

export type { IAddDestinationUI };
